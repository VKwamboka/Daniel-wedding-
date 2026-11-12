/**
 * Guest photo uploader: drag & drop or tap to pick (camera on phones),
 * previews, per-file status, and 2-at-a-time uploads through galleryService.
 */
import { useCallback, useEffect, useRef, useState, type DragEvent, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { wedding } from '@/config/wedding.config';
import { galleryService } from '@/services/galleryService';
import { ACCEPTED_IMAGE_TYPES } from '@/utils/image';
import { routes } from '@/utils/links';
import { CheckIcon, CloseIcon, UploadIcon } from '@/components/common/Icons';

type ItemStatus = 'ready' | 'uploading' | 'done' | 'error';
interface Item { id: string; file: File; preview: string; status: ItemStatus; error?: string }

const NAME_KEY = 'wedding:uploaderName'; // remember the guest's name on this device
const CONCURRENCY = 2;

const safeGet = (k: string) => { try { return localStorage.getItem(k) ?? ''; } catch { return ''; } };
const safeSet = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } };

export function UploadForm() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState(() => safeGet(NAME_KEY));
  const [caption, setCaption] = useState('');
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { maxUploadMB, maxFilesPerUpload } = wedding.gallery;

  // Free preview URLs when leaving the page
  useEffect(() => () => items.forEach((i) => URL.revokeObjectURL(i.preview)), []); // eslint-disable-line react-hooks/exhaustive-deps

  const addFiles = useCallback((list: FileList | File[]) => {
    const files = Array.from(list);
    const rejected: string[] = [];
    const accepted = files.filter((f) => {
      const isImage = f.type.startsWith('image/') || ACCEPTED_IMAGE_TYPES.includes(f.type);
      if (!isImage) rejected.push(`${f.name} isn’t an image`);
      else if (f.size > maxUploadMB * 1024 * 1024) rejected.push(`${f.name} is larger than ${maxUploadMB} MB`);
      return isImage && f.size <= maxUploadMB * 1024 * 1024;
    });
    setItems((prev) => {
      const room = Math.max(0, maxFilesPerUpload - prev.filter((p) => p.status !== 'done').length);
      if (accepted.length > room) rejected.push(`Only ${maxFilesPerUpload} photos at a time — the rest were skipped`);
      const next = accepted.slice(0, room).map((file) => ({
        id: crypto.randomUUID(), file, preview: URL.createObjectURL(file), status: 'ready' as const,
      }));
      return [...prev.filter((p) => p.status !== 'done'), ...next];
    });
    setNotice(rejected.join('. '));
  }, [maxUploadMB, maxFilesPerUpload]);

  const remove = (id: string) =>
    setItems((prev) => {
      const it = prev.find((p) => p.id === id);
      if (it) URL.revokeObjectURL(it.preview);
      return prev.filter((p) => p.id !== id);
    });

  const setStatus = (id: string, status: ItemStatus, error?: string) =>
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, status, error } : p)));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const queue = items.filter((i) => i.status === 'ready' || i.status === 'error');
    if (!queue.length) return;
    setBusy(true);
    setNotice('');
    safeSet(NAME_KEY, name.trim());

    // Simple worker pool: N uploads in flight at once.
    let cursor = 0;
    const worker = async () => {
      while (cursor < queue.length) {
        const item = queue[cursor++];
        setStatus(item.id, 'uploading');
        try {
          await galleryService.upload({ file: item.file, uploaderName: name, caption });
          setStatus(item.id, 'done');
        } catch (err) {
          setStatus(item.id, 'error', (err as Error).message);
        }
      }
    };
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    setBusy(false);
    setCaption('');
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };

  const doneCount = items.filter((i) => i.status === 'done').length;
  const pending = items.filter((i) => i.status === 'ready' || i.status === 'error').length;
  const allDone = items.length > 0 && doneCount === items.length;

  return (
    <form onSubmit={onSubmit} className="frame mx-auto max-w-2xl">
      <div className="relative z-10 space-y-6">
        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`rounded-3xl border-2 border-dashed p-8 text-center transition ${dragging ? 'border-lilac-deep bg-lavender-100' : 'border-lavender-300 bg-white/60'}`}
        >
          <UploadIcon className="mx-auto h-10 w-10 text-lilac-deep" />
          <p className="mt-3 font-serif text-2xl text-plum-800">Add your photos</p>
          <p className="mt-1 font-sans text-sm text-plum-500">Drag them here, or choose from your phone or computer</p>
          <button type="button" className="btn-primary mt-5" onClick={() => inputRef.current?.click()}>
            Choose photos
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            aria-label="Choose photos to upload"
            onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ''; }}
          />
          <p className="mt-4 font-sans text-[0.7rem] text-plum-500/80">Up to {maxFilesPerUpload} photos at a time · {maxUploadMB} MB each · JPG, PNG, WEBP, HEIC</p>
        </div>

        {notice && <p role="alert" className="font-sans text-sm text-plum-700">{notice}</p>}

        {/* Previews */}
        {items.length > 0 && (
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4" aria-label="Selected photos">
            {items.map((it) => (
              <li key={it.id} className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-lavender-200">
                <img src={it.preview} alt={it.file.name} className="h-full w-full object-cover" />
                {it.status === 'uploading' && (
                  <span className="absolute inset-0 flex items-center justify-center bg-plum-900/40">
                    <span className="h-7 w-7 animate-spin rounded-full border-2 border-ivory border-t-transparent" aria-label="Uploading" />
                  </span>
                )}
                {it.status === 'done' && (
                  <span className="absolute inset-0 flex items-center justify-center bg-plum-700/50 text-ivory"><CheckIcon className="h-8 w-8" aria-label="Uploaded" /></span>
                )}
                {it.status === 'error' && (
                  <span className="absolute inset-x-0 bottom-0 bg-red-700/85 px-1 py-0.5 text-center font-sans text-[0.6rem] text-white" title={it.error}>Failed — retry</span>
                )}
                {(it.status === 'ready' || it.status === 'error') && !busy && (
                  <button type="button" onClick={() => remove(it.id)} className="absolute right-1 top-1 rounded-full bg-ivory/90 p-1 text-plum-700" aria-label={`Remove ${it.file.name}`}>
                    <CloseIcon className="h-3.5 w-3.5" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="uploader" className="label">Your name</label>
            <input id="uploader" className="field" maxLength={80} value={name} onChange={(e) => setName(e.target.value)} placeholder="optional" autoComplete="name" />
          </div>
          <div>
            <label htmlFor="caption" className="label">Caption</label>
            <input id="caption" className="field" maxLength={280} value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="optional" />
          </div>
        </div>

        <div aria-live="polite" className="text-center font-sans text-sm text-plum-700">
          {busy && `Uploading… ${doneCount} of ${items.length} done`}
          {!busy && allDone && `All ${doneCount} photo${doneCount === 1 ? '' : 's'} shared — thank you! 💜`}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button type="submit" className="btn-primary" disabled={busy || pending === 0}>
            {busy ? 'Uploading…' : pending > 0 ? `Upload ${pending} photo${pending === 1 ? '' : 's'}` : 'Upload photos'}
          </button>
          <Link to={routes.gallery} className="btn-outline">View gallery</Link>
        </div>
      </div>
    </form>
  );
}
