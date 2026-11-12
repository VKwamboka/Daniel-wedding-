/**
 * QR codes for the gallery. Guests scan → land directly on the view or upload
 * page (the envelope is skipped on those routes).
 * Links come from `absoluteRouteUrl`, the same builder the buttons use, so the
 * QR code and the links can't point to different places.
 * Tip: set VITE_SITE_URL before printing QR codes on paper.
 */
import { useRef, useState } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { absoluteRouteUrl, routes } from '@/utils/links';
import { coupleNames } from '@/config/wedding.config';
import { CopyButton } from '@/components/common/CopyButton';
import { DownloadIcon } from '@/components/common/Icons';

type Target = 'gallery' | 'upload';

const TARGETS: Record<Target, { label: string; route: string; caption: string }> = {
  gallery: { label: 'View photos', route: routes.gallery, caption: 'Scan to see the wedding photos' },
  upload: { label: 'Upload photos', route: routes.upload, caption: 'Scan to share your photos' },
};

export function GalleryQR({ initial = 'gallery' }: { initial?: Target }) {
  const [target, setTarget] = useState<Target>(initial);
  const canvasWrap = useRef<HTMLDivElement>(null);
  const url = absoluteRouteUrl(TARGETS[target].route);

  const downloadPng = () => {
    const canvas = canvasWrap.current?.querySelector('canvas');
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `${coupleNames.replace(/\W+/g, '-').toLowerCase()}-${target}-qr.png`;
    a.click();
  };

  return (
    <div className="card mx-auto w-full max-w-sm p-6 text-center">
      <div className="mb-5 inline-flex rounded-full bg-lavender-100 p-1" role="tablist" aria-label="QR code destination">
        {(Object.keys(TARGETS) as Target[]).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={target === t}
            type="button"
            onClick={() => setTarget(t)}
            className={`rounded-full px-4 py-1.5 font-sans text-[0.65rem] uppercase tracking-[0.2em] transition ${target === t ? 'bg-plum-700 text-ivory' : 'text-plum-700'}`}
          >
            {TARGETS[t].label}
          </button>
        ))}
      </div>

      <div className="mx-auto w-fit rounded-3xl bg-white p-4 ring-1 ring-lavender-200">
        <QRCodeSVG value={url} size={188} level="M" fgColor="#45224D" bgColor="#FFFFFF" marginSize={1} title={`QR code: ${url}`} />
      </div>
      {/* High-res canvas copy for the PNG download (hidden) */}
      <div ref={canvasWrap} className="hidden" aria-hidden="true">
        <QRCodeCanvas value={url} size={1024} level="M" fgColor="#45224D" bgColor="#FFFFFF" marginSize={2} />
      </div>

      <p className="mt-4 font-serif text-lg text-plum-800">{TARGETS[target].caption}</p>
      <div className="mt-2 flex items-center justify-center gap-1">
        <a href={url} className="max-w-[16rem] truncate font-sans text-xs text-lilac-deep underline underline-offset-4">{url}</a>
        <CopyButton value={url} label="link" />
      </div>
      <button type="button" onClick={downloadPng} className="btn-outline mt-4">
        <DownloadIcon className="h-4 w-4" /> Download QR
      </button>
    </div>
  );
}
