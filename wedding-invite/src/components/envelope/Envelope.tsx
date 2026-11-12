/**
 * Full-screen lace envelope (opening experience).
 *
 * Sequence after the seal is tapped:
 *   0.0s  seal pops & fades
 *   0.35s top/bottom flaps fold away, side flaps follow, petals burst
 *   1.4s  invitation card rises
 *   ~4s   overlay fades out (or immediately when the guest taps "Enter")
 *
 * Flaps are drawn as SVG at the real viewport size so the scalloped lace
 * edges never stretch, whatever the screen shape.
 */
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { wedding, coupleNames } from '@/config/wedding.config';
import { PetalBurst } from '@/components/decor/Petals';
import { FloralDivider } from '@/components/decor/Florals';
import { WaxSeal } from './WaxSeal';

type Phase = 'sealed' | 'opening' | 'revealed';
type Side = 'top' | 'bottom' | 'left' | 'right';

/** Track viewport size (flaps are drawn in real pixels). */
function useViewport() {
  const get = () => ({ w: window.innerWidth, h: window.innerHeight });
  const [vp, setVp] = useState(get);
  useEffect(() => {
    const on = () => setVp(get());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return vp;
}

/** Points of a flap triangle: two outer corners + the tip near the centre. */
function flapPoints(side: Side, w: number, h: number): [number, number][] {
  const cx = w / 2;
  const cy = h / 2;
  switch (side) {
    case 'top': return [[0, 0], [w, 0], [cx, cy + 14]];
    case 'bottom': return [[w, h], [0, h], [cx, cy - 14]];
    case 'left': return [[0, h], [0, 0], [cx - 10, cy]];
    case 'right': return [[w, 0], [w, h], [cx + 10, cy]];
  }
}

/** Build a scalloped edge from point a to b (bumps bulge to the right of travel direction). */
function scallopPath(a: [number, number], b: [number, number], size = 22) {
  const [x1, y1] = a;
  const [x2, y2] = b;
  const len = Math.hypot(x2 - x1, y2 - y1);
  const n = Math.max(3, Math.round(len / size));
  const ux = (x2 - x1) / len;
  const uy = (y2 - y1) / len;
  const nx = -uy; // normal
  const ny = ux;
  const step = len / n;
  let d = '';
  for (let i = 0; i < n; i++) {
    const ex = x1 + ux * step * (i + 1);
    const ey = y1 + uy * step * (i + 1);
    const mx = x1 + ux * step * (i + 0.5) + nx * step * 0.55;
    const my = y1 + uy * step * (i + 0.5) + ny * step * 0.55;
    d += ` Q ${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
  }
  return d;
}

/** Pearls placed along an edge, slightly inside the flap. */
function pearls(a: [number, number], b: [number, number], inset: number, gap = 34) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const n = Math.floor(len / gap);
  const ux = (b[0] - a[0]) / len;
  const uy = (b[1] - a[1]) / len;
  return Array.from({ length: n - 1 }, (_, i) => ({
    x: a[0] + ux * gap * (i + 1) + uy * inset,
    y: a[1] + uy * gap * (i + 1) - ux * inset,
  }));
}

function Flap({ side, w, h, open, delay }: { side: Side; w: number; h: number; open: boolean; delay: number }) {
  const [p0, p1, tip] = flapPoints(side, w, h);
  // Outline: corner → corner (straight), then scalloped edges corner → tip → corner.
  const d = `M ${p0[0]} ${p0[1]} L ${p1[0]} ${p1[1]}${scallopPath(p1, tip)}${scallopPath(tip, p0)} Z`;
  const beads = [...pearls(p1, tip, -16), ...pearls(tip, p0, -16)];
  const lacePearls = [...pearls(p1, tip, -34, 48), ...pearls(tip, p0, -34, 48)];

  const origin = { top: 'top', bottom: 'bottom', left: 'left', right: 'right' }[side];
  const closed = { rotateX: 0, rotateY: 0 };
  const opened =
    side === 'top' ? { rotateX: 165 } :
    side === 'bottom' ? { rotateX: -165 } :
    side === 'left' ? { rotateY: -165 } : { rotateY: 165 };

  return (
    <motion.div
      className="absolute inset-0"
      style={{ transformOrigin: origin, backfaceVisibility: 'hidden', zIndex: side === 'top' ? 4 : side === 'bottom' ? 3 : 2 }}
      initial={closed}
      animate={open ? { ...opened, opacity: 0 } : closed}
      transition={{ duration: 1.1, delay, ease: [0.65, 0, 0.35, 1], opacity: { delay: delay + 0.75, duration: 0.3 } }}
    >
      <svg width={w} height={h} className="absolute inset-0 drop-shadow-[0_6px_14px_rgba(90,46,99,0.22)]">
        <path d={d} fill={`url(#flap-${side === 'top' || side === 'bottom' ? 'tb' : 'lr'})`} />
        <path d={d} fill="url(#lace)" />
        <path d={d} fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeOpacity="0.9" />
        {beads.map((b, i) => <circle key={i} cx={b.x} cy={b.y} r="2.6" fill="url(#pearl)" />)}
        {lacePearls.map((b, i) => <circle key={`l${i}`} cx={b.x} cy={b.y} r="1.6" fill="#FFFFFF" opacity="0.8" />)}
      </svg>
    </motion.div>
  );
}

/** Shared SVG gradients & lace pattern (rendered once). */
function EnvelopeDefs() {
  return (
    <svg width="0" height="0" className="absolute">
      <defs>
        <linearGradient id="flap-tb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EDE2F6" />
          <stop offset="100%" stopColor="#E0D0EE" />
        </linearGradient>
        <linearGradient id="flap-lr" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E6D9F2" />
          <stop offset="100%" stopColor="#D8C6EA" />
        </linearGradient>
        <radialGradient id="pearl" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#EFE6F7" />
          <stop offset="100%" stopColor="#C9B3DC" />
        </radialGradient>
        {/* Lace: tiny florets, leaves and dots on a tulle-like grid */}
        <pattern id="lace" width="60" height="60" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="0.8">
            <path d="M0 30 Q 15 22 30 30 T 60 30" />
            <path d="M30 0 Q 22 15 30 30 T 30 60" strokeOpacity="0.3" />
            <circle cx="30" cy="30" r="5" />
            <path d="M30 25 v-4 M30 35 v4 M25 30 h-4 M35 30 h4" />
          </g>
          <g fill="#FFFFFF" fillOpacity="0.55">
            <ellipse cx="12" cy="12" rx="2.5" ry="5" transform="rotate(-35 12 12)" />
            <ellipse cx="48" cy="48" rx="2.5" ry="5" transform="rotate(145 48 48)" />
            <circle cx="48" cy="12" r="1.4" />
            <circle cx="12" cy="48" r="1.4" />
          </g>
        </pattern>
      </defs>
    </svg>
  );
}

export function Envelope({ onDone }: { onDone: () => void }) {
  const { w, h } = useViewport();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('sealed');
  const [visible, setVisible] = useState(true);

  const open = () => {
    setPhase('opening');
    window.setTimeout(() => setPhase('revealed'), reduce ? 50 : 1400);
  };

  // Auto-continue a few seconds after the card appears.
  useEffect(() => {
    if (phase !== 'revealed') return;
    const t = window.setTimeout(() => setVisible(false), 3200);
    return () => window.clearTimeout(t);
  }, [phase]);

  // Lock page scroll while the envelope covers the screen.
  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  const flapOrder = useMemo(() => (['left', 'right', 'bottom', 'top'] as Side[]), []);
  const flapDelay: Record<Side, number> = { top: 0.35, bottom: 0.45, left: 0.6, right: 0.6 };

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="envelope"
          className="fixed inset-0 z-50 overflow-hidden"
          style={{ perspective: 1600, background: 'radial-gradient(ellipse at center, #F8F4FC 0%, #EADFF4 70%, #DCCBEB 100%)' }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9 }}
          role="dialog"
          aria-label="Wedding invitation envelope"
        >
          <EnvelopeDefs />

          {/* Inner card, revealed as the flaps open */}
          <motion.div
            className="absolute inset-0 z-[1] flex items-center justify-center px-6"
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={phase === 'revealed' ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="frame w-full max-w-md text-center">
              <div className="relative z-10">
                <p className="eyebrow">You are invited to the wedding of</p>
                <h1 className="script mt-5 text-6xl leading-tight text-plum-700 sm:text-7xl">
                  {wedding.groom.firstName}
                  <span className="block font-serif text-2xl italic text-lilac-deep">&amp;</span>
                  {wedding.bride.firstName}
                </h1>
                <FloralDivider className="mt-4" />
                <p className="mt-4 font-serif text-xl text-plum-800">{wedding.dateDisplay}</p>
                <p className="mt-1 font-sans text-xs uppercase tracking-[0.25em] text-plum-500">{wedding.city}</p>
                <button type="button" className="btn-primary mt-8" onClick={() => setVisible(false)}>
                  Enter
                </button>
              </div>
            </div>
          </motion.div>

          {/* Flaps */}
          {phase !== 'revealed' &&
            flapOrder.map((side) => (
              <Flap key={side} side={side} w={w} h={h} open={phase === 'opening'} delay={reduce ? 0 : flapDelay[side]} />
            ))}

          {/* Seal & title, centred on the flap tips */}
          {phase !== 'revealed' && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
              <motion.p
                className="script absolute top-[14%] text-center text-4xl text-plum-700/80 sm:text-5xl"
                animate={phase === 'opening' ? { opacity: 0, y: -20 } : { opacity: 1 }}
              >
                {coupleNames}
              </motion.p>
              <WaxSeal onOpen={open} breaking={phase === 'opening'} />
            </div>
          )}

          {phase === 'opening' && !reduce && <PetalBurst />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
