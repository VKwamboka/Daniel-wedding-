/** Wedding photo gallery call-to-action on the invitation page: links + QR. */
import { Link } from 'react-router-dom';
import { wedding } from '@/config/wedding.config';
import { routes } from '@/utils/links';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { ImagesIcon, UploadIcon } from '@/components/common/Icons';
import { GalleryQR } from '@/components/gallery/GalleryQR';

export function PhotosSection() {
  return (
    <section id="photos" className="section" aria-labelledby="photos-title">
      <div className="container-wide">
        <SectionHeading id="photos-title" eyebrow={wedding.gallery.hashtag} title="Wedding Photos" script="capture the moments with us" />
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal className="text-center md:text-left">
            <p className="body-text">
              Every smile, every dance, every happy tear — we’d love to see the day through your eyes.
              Browse everyone’s photos, or add your own straight from your phone. Scan the code at the venue or use the buttons below.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row md:justify-start sm:justify-center">
              <Link to={routes.gallery} className="btn-primary"><ImagesIcon className="h-4 w-4" /> View the gallery</Link>
              <Link to={routes.upload} className="btn-outline"><UploadIcon className="h-4 w-4" /> Upload photos</Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}><GalleryQR /></Reveal>
        </div>
      </div>
    </section>
  );
}
