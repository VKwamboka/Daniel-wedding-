/** /#/gallery — everyone's photos, live-updating, with lightbox. */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { wedding } from '@/config/wedding.config';
import { routes } from '@/utils/links';
import { useGallery } from '@/hooks/useGallery';
import { PageShell } from '@/components/common/PageShell';
import { DemoBanner } from '@/components/common/DemoBanner';
import { PhotoGrid } from '@/components/gallery/PhotoGrid';
import { Lightbox } from '@/components/gallery/Lightbox';
import { GalleryQR } from '@/components/gallery/GalleryQR';
import { ImagesIcon, UploadIcon } from '@/components/common/Icons';

export default function GalleryPage() {
  const { photos, loading, hasMore, error, loadMore, refresh } = useGallery();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <PageShell eyebrow={wedding.gallery.hashtag} title="Wedding Gallery" script="memories, shared by you">
      <div className="container-wide">
        <DemoBanner what="photos" />
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <Link to={routes.upload} className="btn-primary"><UploadIcon className="h-4 w-4" /> Upload photos</Link>
          <button type="button" onClick={refresh} className="btn-outline" disabled={loading}>Refresh</button>
        </div>

        {error && (
          <div role="alert" className="mx-auto mb-8 max-w-md rounded-2xl bg-ivory p-4 text-center font-sans text-sm text-plum-700 shadow-card">
            {error} <button type="button" className="ml-2 underline" onClick={refresh}>Try again</button>
          </div>
        )}

        {!loading && !error && photos.length === 0 ? (
          <div className="card mx-auto max-w-md p-10 text-center">
            <ImagesIcon className="mx-auto h-10 w-10 text-lilac-deep" />
            <p className="mt-3 font-serif text-2xl text-plum-800">No photos yet</p>
            <p className="mt-1 font-sans text-sm text-plum-500">Be the first to share a moment!</p>
            <Link to={routes.upload} className="btn-primary mt-6">Upload the first photo</Link>
          </div>
        ) : (
          <PhotoGrid photos={photos} loading={loading} onOpen={setOpen} />
        )}

        {hasMore && photos.length > 0 && !loading && (
          <div className="mt-8 text-center">
            <button type="button" className="btn-outline" onClick={loadMore}>Load more</button>
          </div>
        )}

        <div className="mt-20">
          <GalleryQR />
        </div>
      </div>
      <Lightbox photos={photos} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </PageShell>
  );
}
