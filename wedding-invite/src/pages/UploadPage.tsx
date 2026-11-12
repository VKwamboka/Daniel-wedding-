/** /#/gallery/upload — guests add photos. */
import { wedding } from '@/config/wedding.config';
import { PageShell } from '@/components/common/PageShell';
import { DemoBanner } from '@/components/common/DemoBanner';
import { UploadForm } from '@/components/gallery/UploadForm';
import { GalleryQR } from '@/components/gallery/GalleryQR';

export default function UploadPage() {
  return (
    <PageShell eyebrow={wedding.gallery.hashtag} title="Share Your Photos" script="thank you for capturing our day">
      <DemoBanner what="photos" />
      <UploadForm />
      <div className="mt-16"><GalleryQR initial="upload" /></div>
    </PageShell>
  );
}
