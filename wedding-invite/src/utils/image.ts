/**
 * Client-side image preparation before upload.
 * Phone photos are often 5–12 MB; resizing to ~2000px JPEG keeps uploads fast
 * on mobile data while still looking sharp in the gallery.
 */
import { createLogger } from './logger';

const log = createLogger('gallery');

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

export interface PreparedImage {
  blob: Blob;
  width: number;
  height: number;
  /** Extension matching the blob type, without the dot. */
  ext: string;
}

const loadImage = (file: Blob): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('This file could not be read as an image.'));
    };
    img.src = url;
  });

/**
 * Resize/compress an image. If the browser can't decode it (e.g. HEIC on
 * some desktop browsers) the original file is returned untouched.
 */
export async function prepareImage(file: File, maxSide = 2000, quality = 0.86): Promise<PreparedImage> {
  try {
    const img = await loadImage(file);
    const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
    const width = Math.round(img.naturalWidth * scale);
    const height = Math.round(img.naturalHeight * scale);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas not supported');
    ctx.drawImage(img, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/jpeg', quality));
    if (!blob) throw new Error('Compression failed');

    // Keep the original when compression wouldn't help (small PNG screenshots etc.).
    if (blob.size >= file.size && scale === 1) {
      return { blob: file, width, height, ext: extFromType(file.type) };
    }
    log.debug(`compressed ${file.name}: ${kb(file.size)} → ${kb(blob.size)}`);
    return { blob, width, height, ext: 'jpg' };
  } catch (err) {
    log.warn(`could not process ${file.name}, uploading original`, err);
    return { blob: file, width: 0, height: 0, ext: extFromType(file.type) };
  }
}

const extFromType = (type: string) =>
  ({ 'image/png': 'png', 'image/webp': 'webp', 'image/heic': 'heic', 'image/heif': 'heif' })[type] ?? 'jpg';

const kb = (bytes: number) => `${Math.round(bytes / 1024)} KB`;

/** Safe, unique storage path: uploads/2027-08-14/1755170000000-ab12cd.jpg */
export const buildPhotoPath = (ext: string) => {
  const day = new Date().toISOString().slice(0, 10);
  const rand = Math.random().toString(36).slice(2, 8);
  return `uploads/${day}/${Date.now()}-${rand}.${ext}`;
};
