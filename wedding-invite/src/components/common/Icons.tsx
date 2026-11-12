/**
 * Line icons in one place (stroke = currentColor, so they inherit text colour).
 * Timeline icons are keyed by the `TimelineIcon` names used in the config.
 */
import type { SVGProps } from 'react';
import type { TimelineIcon } from '@/config/types';

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4,
  strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, ...p,
});

export const RingsIcon = (p: P) => (<svg {...base(p)}><circle cx="9" cy="14" r="5.5" /><circle cx="15" cy="14" r="5.5" /><path d="M7.5 6.5 9 4.5h6l1.5 2-4.5 2z" /></svg>);
export const CameraIcon = (p: P) => (<svg {...base(p)}><path d="M3 8.5A1.5 1.5 0 0 1 4.5 7H7l1.5-2h7L17 7h2.5A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z" /><circle cx="12" cy="13" r="3.5" /></svg>);
export const GlassIcon = (p: P) => (<svg {...base(p)}><path d="M6 3h5l-.5 6a2 2 0 0 1-4 0zM13 3h5l-.5 6a2 2 0 0 1-4 0zM8.5 11v8M15.5 11v8M6.5 21h4M13.5 21h4" /></svg>);
export const DinnerIcon = (p: P) => (<svg {...base(p)}><circle cx="12" cy="13" r="6" /><circle cx="12" cy="13" r="3.5" /><path d="M3 4v5a1.5 1.5 0 0 0 1.5 1.5V20M4.5 4v4M21 4c-1.5 1-2 3-2 6h2v10" /></svg>);
export const CakeIcon = (p: P) => (<svg {...base(p)}><path d="M4 20h16M5 20v-6h14v6M7 14v-4h10v4M12 10V7M12 4.5a1 1 0 0 1 0 2" /><path d="M5 17c2 1 3-1 5 0s3 1 4 0 3-1 5 0" /></svg>);
export const MusicIcon = (p: P) => (<svg {...base(p)}><path d="M9 18V5l11-2v13" /><circle cx="6.5" cy="18" r="2.5" /><circle cx="17.5" cy="16" r="2.5" /></svg>);
export const CarIcon = (p: P) => (<svg {...base(p)}><path d="M4 16v-3l2-5h12l2 5v3zM4 16v2h3v-2M17 16v2h3v-2" /><circle cx="8" cy="13.5" r=".8" /><circle cx="16" cy="13.5" r=".8" /></svg>);

export const timelineIcons: Record<TimelineIcon, (p: P) => JSX.Element> = {
  rings: RingsIcon, camera: CameraIcon, glass: GlassIcon, dinner: DinnerIcon, cake: CakeIcon, music: MusicIcon, car: CarIcon,
};

export const PinIcon = (p: P) => (<svg {...base(p)}><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const ClockIcon = (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const CopyIcon = (p: P) => (<svg {...base(p)}><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8" /></svg>);
export const CheckIcon = (p: P) => (<svg {...base(p)}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>);
export const PhoneIcon = (p: P) => (<svg {...base(p)}><path d="M5 3.5h3.5l1.5 4.5-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2 4.5 1.5V19a1.5 1.5 0 0 1-1.5 1.5A16.5 16.5 0 0 1 3.5 5 1.5 1.5 0 0 1 5 3.5z" /></svg>);
export const MailIcon = (p: P) => (<svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" /></svg>);
export const UploadIcon = (p: P) => (<svg {...base(p)}><path d="M12 16V4M7 9l5-5 5 5M4 16v3a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19v-3" /></svg>);
export const ImagesIcon = (p: P) => (<svg {...base(p)}><rect x="3" y="5" width="15" height="13" rx="2" /><path d="M21 8v11a2 2 0 0 1-2 2H7M3 15l4-4 4 4 2-2 5 5" /><circle cx="13" cy="9" r="1.5" /></svg>);
export const ExternalIcon = (p: P) => (<svg {...base(p)}><path d="M14 4h6v6M20 4l-9 9M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" /></svg>);
export const DownloadIcon = (p: P) => (<svg {...base(p)}><path d="M12 4v12M7 11l5 5 5-5M4 20h16" /></svg>);
export const CloseIcon = (p: P) => (<svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const ChevronIcon = (p: P) => (<svg {...base(p)}><path d="m9 6 6 6-6 6" /></svg>);
export const HeartIcon = (p: P) => (<svg {...base(p)}><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 3c0 5.4-7.5 10-7.5 10z" /></svg>);
export const SoundOnIcon = (p: P) => (<svg {...base(p)}><path d="M4 9.5v5h3.5L12 18V6L7.5 9.5zM15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" /></svg>);
export const SoundOffIcon = (p: P) => (<svg {...base(p)}><path d="M4 9.5v5h3.5L12 18V6L7.5 9.5zM16 9.5l5 5M21 9.5l-5 5" /></svg>);
export const BankIcon = (p: P) => (<svg {...base(p)}><path d="M3 9.5 12 4l9 5.5M4.5 10v8M9 10v8M15 10v8M19.5 10v8M3 20.5h18" /></svg>);
export const QrIcon = (p: P) => (<svg {...base(p)}><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2" /></svg>);

/** Official WhatsApp glyph (from simple-icons, CC0). */
export const WhatsAppIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);
