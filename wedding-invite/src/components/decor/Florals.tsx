/**
 * Hand-drawn SVG florals (lilac clusters, leaves, dividers).
 * All decorative → aria-hidden. Colours come from the Tailwind palette.
 */
import { memo } from 'react';

const PETALS = ['#E3D5F1', '#CDB6E4', '#C3A0CF', '#B394D3'];
const LEAF = '#B9C2AE';

/** One tiny four-petal lilac floret. */
const Floret = ({ x, y, r, c, rot = 0 }: { x: number; y: number; r: number; c: string; rot?: number }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {[0, 90, 180, 270].map((a) => (
      <ellipse key={a} cx={0} cy={-r * 0.55} rx={r * 0.42} ry={r * 0.62} fill={c} transform={`rotate(${a})`} />
    ))}
    <circle r={r * 0.18} fill="#FBF8F2" />
  </g>
);

/** Deterministic pseudo-random so SSR/CSR and re-renders match. */
const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

/** A cone-shaped lilac bloom on a curved stem. */
export const LilacSprig = memo(function LilacSprig({ className = '', seed = 1 }: { className?: string; seed?: number }) {
  const florets = Array.from({ length: 34 }, (_, i) => {
    const t = i / 34; // 0 at tip → 1 at base
    const spread = 6 + t * 26;
    return {
      x: 60 + (rand(seed + i) - 0.5) * spread * 2,
      y: 18 + t * 92 + (rand(seed + i * 3) - 0.5) * 8,
      r: 5 + t * 3 + rand(seed + i * 7) * 2,
      c: PETALS[Math.floor(rand(seed + i * 5) * PETALS.length)],
      rot: rand(seed + i * 11) * 90,
    };
  });
  return (
    <svg viewBox="0 0 120 200" className={className} aria-hidden="true">
      <path d="M60 110 C 58 140, 66 165, 54 198" stroke={LEAF} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M58 150 C 34 140, 22 150, 14 168 C 34 170, 50 164, 58 150 Z" fill={LEAF} opacity="0.85" />
      <path d="M61 168 C 84 156, 98 162, 108 178 C 88 182, 70 178, 61 168 Z" fill={LEAF} opacity="0.7" />
      {florets.reverse().map((f, i) => <Floret key={i} {...f} />)}
    </svg>
  );
});

/** Corner bouquet: three sprigs fanned out. Position with Tailwind classes. */
export function FloralCorner({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div className={`pointer-events-none absolute ${className}`} style={flip ? { transform: 'scaleX(-1)' } : undefined} aria-hidden="true">
      <div className="relative h-40 w-40 sm:h-56 sm:w-56">
        <LilacSprig seed={3} className="absolute left-0 top-0 h-full origin-bottom -rotate-[38deg] opacity-90" />
        <LilacSprig seed={7} className="absolute left-10 top-2 h-[88%] origin-bottom -rotate-[8deg]" />
        <LilacSprig seed={11} className="absolute left-16 top-10 h-[70%] origin-bottom rotate-[22deg] opacity-80" />
      </div>
    </div>
  );
}

/** Elegant horizontal divider: hairlines + tiny floret + dots. */
export function FloralDivider({ className = '', light = false }: { className?: string; light?: boolean }) {
  const stroke = light ? 'rgba(251,248,242,.6)' : 'rgba(155,114,174,.55)';
  return (
    <svg viewBox="0 0 240 24" className={`mx-auto h-6 w-56 ${className}`} aria-hidden="true">
      <path d="M8 12 H96 M144 12 H232" stroke={stroke} strokeWidth="0.8" />
      <circle cx="100" cy="12" r="1.6" fill={stroke} />
      <circle cx="140" cy="12" r="1.6" fill={stroke} />
      <Floret x={120} y={12} r={9} c={light ? '#E3D5F1' : '#C3A0CF'} />
      <Floret x={108} y={9} r={4} c={light ? '#CDB6E4' : '#E3D5F1'} rot={30} />
      <Floret x={132} y={15} r={4} c={light ? '#CDB6E4' : '#E3D5F1'} rot={60} />
    </svg>
  );
}

/**
 * Scalloped lace trim with pearl dots — sits on the edge of plum bands,
 * echoing the lace envelope. `position` decides which way the scallops face.
 */
export function LaceEdge({ position = 'top', color = '#FBF8F2' }: { position?: 'top' | 'bottom'; color?: string }) {
  const id = `lace-${position}`;
  return (
    <svg
      className={`pointer-events-none absolute left-0 h-10 w-full ${position === 'top' ? 'top-0' : 'bottom-0 rotate-180'}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width="48" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 0 H48 V14 C48 30, 24 34, 24 22 C24 34, 0 30, 0 14 Z" fill={color} />
          <path d="M4 14 C6 26, 20 28, 22 20" stroke="#E3D5F1" strokeWidth="0.8" fill="none" />
          <path d="M44 14 C42 26, 28 28, 26 20" stroke="#E3D5F1" strokeWidth="0.8" fill="none" />
          <circle cx="24" cy="30" r="2.2" fill={color} />
          <circle cx="12" cy="9" r="1.1" fill="#CDB6E4" />
          <circle cx="36" cy="9" r="1.1" fill="#CDB6E4" />
        </pattern>
      </defs>
      <rect width="100%" height="40" fill={`url(#${id})`} />
    </svg>
  );
}
