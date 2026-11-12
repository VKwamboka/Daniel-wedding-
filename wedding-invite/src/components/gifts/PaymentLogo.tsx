/**
 * Payment brand logo inside a round badge.
 *  • simple-icon → official brand mark from the `simple-icons` package (CC0 data;
 *    trademarks remain with their owners — used here only to identify the payment method)
 *  • image       → official logo file from /public/logos, with a wordmark fallback
 *                  if the file hasn't been added yet
 *  • bank        → neutral bank icon
 */
import { useState } from 'react';
import { siAirtel, siRevolut, siWise } from 'simple-icons';
import type { LogoSource } from '@/config/types';
import { BankIcon } from '@/components/common/Icons';

// Brand colour pairings, following each brand's own usage (badge bg / glyph colour).
const SIMPLE_ICONS = {
  wise: { icon: siWise, bg: '#9FE870', fg: '#163300' },
  revolut: { icon: siRevolut, bg: '#FFFFFF', fg: '#191C1F' },
  airtel: { icon: siAirtel, bg: '#FFFFFF', fg: `#${siAirtel.hex}` },
} as const;

const badge = 'flex h-16 w-16 items-center justify-center rounded-full shadow-[0_6px_18px_-6px_rgba(90,46,99,.35)] ring-1 ring-lavender-200';

export function PaymentLogo({ logo, name }: { logo: LogoSource; name: string }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (logo.kind === 'simple-icon') {
    const { icon, bg, fg } = SIMPLE_ICONS[logo.slug];
    return (
      <span className={badge} style={{ background: bg }}>
        <svg viewBox="0 0 24 24" className="h-8 w-8" role="img" aria-label={`${name} logo`}>
          <path d={icon.path} fill={fg} />
        </svg>
      </span>
    );
  }

  if (logo.kind === 'image') {
    return (
      <span className={`${badge} overflow-hidden bg-white`}>
        {!imgFailed ? (
          <img src={logo.src} alt={`${name} logo`} className="h-10 w-12 object-contain" onError={() => setImgFailed(true)} />
        ) : (
          // Fallback until the official logo file is added to /public/logos
          <span className="font-sans text-[0.7rem] font-bold tracking-tight" style={{ color: logo.color }} aria-label={`${name} logo`}>
            {logo.wordmark}
          </span>
        )}
      </span>
    );
  }

  return (
    <span className={`${badge} bg-plum-700 text-ivory`}>
      <BankIcon className="h-8 w-8" aria-label="Bank logo" />
    </span>
  );
}
