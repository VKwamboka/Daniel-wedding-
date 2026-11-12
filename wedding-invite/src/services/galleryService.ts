/**
 * Gallery service — the only place that knows where photos are stored.
 *
 * Two providers implement the same interface:
 *  • supabaseProvider – real shared storage (Supabase Storage + a `photos` table)
 *  • demoProvider     – browser-only IndexedDB, used when Supabase isn't configured
 *
 * Components call `galleryService.*` and never care which one is active.
 */
import { env, isBackendConfigured } from '@/config/env';
import { supabase } from './supabaseClient';
import { idbGetAll, idbPut } from './localDb';
import { buildPhotoPath, prepareImage } from '@/utils/image';
import { createLogger } from '@/utils/logger';

const log = createLogger('gallery');

export interface Photo {
  id: string;
  url: string;
  uploaderName: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  createdAt: string;
}

export interface UploadInput {
  file: File;
  uploaderName?: string;
  caption?: string;
}

export interface GalleryProvider {
  readonly mode: 'supabase' | 'demo';
  /** Newest first. `offset`/`limit` allow "load more" pagination. */
  list(offset: number, limit: number): Promise<Photo[]>;
  upload(input: UploadInput): Promise<Photo>;
  /** Live updates when someone else uploads. Returns an unsubscribe function. */
  subscribe(onNew: (photo: Photo) => void): () => void;
}

/* ───────────────────────────── Supabase provider ───────────────────────────── */

interface PhotoRow {
  id: string;
  storage_path: string;
  uploader_name: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  created_at: string;
}

const rowToPhoto = (row: PhotoRow): Photo => ({
  id: row.id,
  url: supabase!.storage.from(env.supabaseBucket).getPublicUrl(row.storage_path).data.publicUrl,
  uploaderName: row.uploader_name,
  caption: row.caption,
  width: row.width,
  height: row.height,
  createdAt: row.created_at,
});

const supabaseProvider: GalleryProvider = {
  mode: 'supabase',

  async list(offset, limit) {
    const { data, error } = await supabase!
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    if (error) {
      log.error('list failed', error);
      throw new Error('Could not load photos. Please check your connection and try again.');
    }
    return (data as PhotoRow[]).map(rowToPhoto);
  },

  async upload({ file, uploaderName, caption }) {
    const prepared = await prepareImage(file);
    const path = buildPhotoPath(prepared.ext);

    // 1) Store the file
    const { error: storageError } = await supabase!.storage
      .from(env.supabaseBucket)
      .upload(path, prepared.blob, {
        contentType: prepared.blob.type || 'image/jpeg',
        cacheControl: '31536000',
        upsert: false,
      });
    if (storageError) {
      log.error('storage upload failed', storageError);
      throw new Error(`Upload failed for “${file.name}”. Please try again.`);
    }

    // 2) Record it in the photos table (powers listing, captions and live updates)
    const { data, error } = await supabase!
      .from('photos')
      .insert({
        storage_path: path,
        uploader_name: uploaderName?.trim() || null,
        caption: caption?.trim() || null,
        width: prepared.width || null,
        height: prepared.height || null,
      })
      .select()
      .single();
    if (error) {
      log.error('photo row insert failed (file is stored at ' + path + ')', error);
      throw new Error(`“${file.name}” was uploaded but could not be added to the gallery.`);
    }
    return rowToPhoto(data as PhotoRow);
  },

  subscribe(onNew) {
    const channel = supabase!
      .channel('photos-feed')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'photos' }, (payload) =>
        onNew(rowToPhoto(payload.new as PhotoRow)),
      )
      .subscribe((status) => log.debug('realtime status', status));
    return () => {
      supabase!.removeChannel(channel);
    };
  },
};

/* ─────────────────────────────── Demo provider ─────────────────────────────── */

interface DemoRecord extends Omit<Photo, 'url'> {
  blob: Blob;
}

// Object URLs are cached so re-listing doesn't leak memory.
const urlCache = new Map<string, string>();
const demoToPhoto = ({ blob, ...rest }: DemoRecord): Photo => {
  if (!urlCache.has(rest.id)) urlCache.set(rest.id, URL.createObjectURL(blob));
  return { ...rest, url: urlCache.get(rest.id)! };
};

const demoProvider: GalleryProvider = {
  mode: 'demo',

  async list(offset, limit) {
    const all = await idbGetAll<DemoRecord>('photos');
    all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return all.slice(offset, offset + limit).map(demoToPhoto);
  },

  async upload({ file, uploaderName, caption }) {
    const prepared = await prepareImage(file);
    const record: DemoRecord = {
      id: crypto.randomUUID(),
      blob: prepared.blob,
      uploaderName: uploaderName?.trim() || null,
      caption: caption?.trim() || null,
      width: prepared.width || null,
      height: prepared.height || null,
      createdAt: new Date().toISOString(),
    };
    await idbPut('photos', record);
    return demoToPhoto(record);
  },

  subscribe() {
    return () => undefined;
  },
};

export const galleryService: GalleryProvider = isBackendConfigured ? supabaseProvider : demoProvider;
