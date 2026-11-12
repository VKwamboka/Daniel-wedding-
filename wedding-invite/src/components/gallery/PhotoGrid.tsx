/** Masonry photo grid (CSS columns) with skeletons while loading. */
import { motion } from 'framer-motion';
import type { Photo } from '@/services/galleryService';

interface Props {
  photos: Photo[];
  loading: boolean;
  onOpen: (index: number) => void;
}

export function PhotoGrid({ photos, loading, onOpen }: Props) {
  return (
    <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
      {photos.map((p, i) => (
        <motion.button
          key={p.id}
          type="button"
          onClick={() => onOpen(i)}
          className="group relative block w-full overflow-hidden rounded-2xl bg-lavender-100 shadow-card ring-1 ring-lavender-200 break-inside-avoid"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: Math.min(i, 12) * 0.03 }}
          aria-label={`Open photo ${i + 1}${p.caption ? `: ${p.caption}` : ''}`}
        >
          <img
            src={p.url}
            alt={p.caption ?? 'Wedding photo'}
            loading="lazy"
            decoding="async"
            width={p.width ?? undefined}
            height={p.height ?? undefined}
            className="h-auto w-full transition duration-500 group-hover:scale-[1.03]"
          />
          {p.uploaderName && (
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plum-900/70 to-transparent px-3 pb-2 pt-6 text-left font-sans text-[0.68rem] text-ivory opacity-0 transition group-hover:opacity-100">
              {p.uploaderName}
            </span>
          )}
        </motion.button>
      ))}
      {loading && Array.from({ length: photos.length ? 4 : 8 }, (_, i) => (
        <div key={`s${i}`} className="animate-shimmer w-full rounded-2xl break-inside-avoid" style={{ height: 140 + ((i * 53) % 120) }} aria-hidden="true" />
      ))}
    </div>
  );
}
