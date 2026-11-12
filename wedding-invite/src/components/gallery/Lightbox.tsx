/** Full-screen photo viewer with keyboard (←/→/Esc) and swipe-friendly buttons. */
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import type { Photo } from '@/services/galleryService';
import { ChevronIcon, CloseIcon, DownloadIcon } from '@/components/common/Icons';
import { timeAgo } from '@/utils/date';

interface Props {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}

export function Lightbox({ photos, index, onClose, onIndex }: Props) {
  const photo = index === null ? null : photos[index];

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % photos.length);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, photos.length, onClose, onIndex]);

  return (
    <AnimatePresence>
      {photo && index !== null && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-plum-900/95 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={onClose}
        >
          <div className="flex items-center justify-between p-4 text-ivory" onClick={(e) => e.stopPropagation()}>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-lavender-200">
              {index + 1} / {photos.length}
            </p>
            <div className="flex gap-2">
              <a href={photo.url} download target="_blank" rel="noopener noreferrer" className="rounded-full p-2 hover:bg-ivory/10" aria-label="Download photo">
                <DownloadIcon className="h-5 w-5" />
              </a>
              <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-ivory/10" aria-label="Close viewer">
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-2 pb-4 sm:px-16">
            <motion.img
              key={photo.id}
              src={photo.url}
              alt={photo.caption ?? 'Wedding photo'}
              className="max-h-[78svh] max-w-full rounded-lg object-contain shadow-2xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) onIndex((index + 1) % photos.length);
                if (info.offset.x > 60) onIndex((index - 1 + photos.length) % photos.length);
              }}
            />
            {photos.length > 1 && (
              <>
                <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + photos.length) % photos.length); }}
                  className="absolute left-2 hidden rounded-full bg-ivory/10 p-3 text-ivory hover:bg-ivory/20 sm:block">
                  <ChevronIcon className="h-5 w-5 rotate-180" />
                </button>
                <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % photos.length); }}
                  className="absolute right-2 hidden rounded-full bg-ivory/10 p-3 text-ivory hover:bg-ivory/20 sm:block">
                  <ChevronIcon className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {(photo.caption || photo.uploaderName) && (
            <div className="px-6 pb-6 text-center text-ivory" onClick={(e) => e.stopPropagation()}>
              {photo.caption && <p className="font-serif text-xl">{photo.caption}</p>}
              <p className="mt-1 font-sans text-xs text-lavender-200">
                {photo.uploaderName ? `Shared by ${photo.uploaderName} · ` : ''}{timeAgo(photo.createdAt)}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
