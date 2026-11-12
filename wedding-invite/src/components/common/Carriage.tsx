/**
 * Decorative transition: a bridal horse and carriage, bells swaying, rides
 * across the screen when this strip scrolls into view. Pure SVG + Framer Motion.
 */
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

const INK = '#5A2E63';
const LILAC = '#C3A0CF';
const GOLD = '#B4955E';

function HorseAndCarriage() {
  return (
    <svg viewBox="0 0 420 160" className="h-24 w-auto sm:h-32" aria-hidden="true">
      {/* ── Carriage ── */}
      <g stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 104 C 20 60, 50 34, 95 32 C 140 34, 168 60, 158 104 Z" fill="#FBF8F2" />
        <path d="M60 42 C 75 28, 115 28, 130 42" />
        <path d="M84 30 L 95 14 L 106 30" stroke={GOLD} />
        <circle cx="95" cy="12" r="3" fill={GOLD} stroke="none" />
        <rect x="70" y="52" width="50" height="32" rx="16" fill="#F0E8F8" />
        <path d="M95 52 V84 M70 68 H120" strokeWidth="1" />
        {/* garland */}
        <path d="M36 92 C 60 104, 130 104, 152 92" stroke={LILAC} strokeWidth="2.4" />
        {[48, 70, 95, 120, 140].map((x) => (<circle key={x} cx={x} cy={98 + (x === 95 ? 4 : 2)} r="3.2" fill={LILAC} stroke="none" />))}
        <path d="M22 108 H166" />
        <path d="M158 100 C 190 100, 200 104, 222 104" />
      </g>
      {/* wheels (spin) */}
      {[{ cx: 52, r: 22 }, { cx: 140, r: 22 }].map((w) => (
        <motion.g key={w.cx} style={{ originX: `${w.cx}px`, originY: '126px' }} animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
          <circle cx={w.cx} cy={126} r={w.r} stroke={INK} strokeWidth="1.6" fill="none" />
          {[0, 45, 90, 135].map((a) => (
            <line key={a} x1={w.cx} y1={126 - w.r} x2={w.cx} y2={126 + w.r} stroke={INK} strokeWidth="0.9" transform={`rotate(${a} ${w.cx} 126)`} />
          ))}
          <circle cx={w.cx} cy={126} r="3" fill={GOLD} />
        </motion.g>
      ))}

      {/* ── Horse ── */}
      <g stroke={INK} strokeWidth="1.6" fill="#FBF8F2" strokeLinecap="round" strokeLinejoin="round">
        {/* tail */}
        <path d="M232 86 C 214 92, 212 116, 222 128 C 222 112, 228 100, 236 94" fill="none" />
        {/* body + neck + head */}
        <path d="M232 84 C 236 70, 262 66, 296 70 C 310 60, 318 40, 330 30 L 334 22 L 340 30 C 350 34, 362 46, 368 54 C 371 58, 368 63, 362 62 L 348 56 C 344 70, 338 82, 334 92 C 330 104, 312 108, 296 106 L 252 106 C 238 106, 228 98, 232 84 Z" />
        {/* mane & plume */}
        <path d="M330 32 C 322 46, 316 56, 306 66" fill="none" stroke={LILAC} strokeWidth="3" />
        <path d="M336 24 C 332 10, 342 2, 350 6 C 342 10, 342 16, 340 24" fill={LILAC} stroke="none" />
        <circle cx="352" cy="46" r="1.6" fill={INK} stroke="none" />
        {/* harness + bells */}
        <path d="M300 72 C 300 88, 306 100, 316 104" fill="none" stroke={GOLD} />
        <path d="M222 104 C 250 96, 280 86, 300 80" fill="none" stroke={GOLD} />
      </g>
      {[ { x: 304, y: 90 }, { x: 312, y: 100 } ].map((b, i) => (
        <motion.g key={i} style={{ originX: `${b.x}px`, originY: `${b.y - 6}px` }} animate={{ rotate: [-14, 14, -14] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}>
          <path d={`M${b.x - 4} ${b.y + 3} C ${b.x - 4} ${b.y - 4}, ${b.x + 4} ${b.y - 4}, ${b.x + 4} ${b.y + 3} Z`} fill={GOLD} />
          <circle cx={b.x} cy={b.y + 4.5} r="1.3" fill={GOLD} />
        </motion.g>
      ))}
      {/* legs (trot) */}
      {[ { x: 252, d: 0 }, { x: 264, d: 0.25 }, { x: 312, d: 0.12 }, { x: 324, d: 0.37 } ].map((l, i) => (
        <motion.path
          key={i}
          d={`M${l.x} 104 L ${l.x + 2} 128 L ${l.x} 146 l 6 0`}
          stroke={INK}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          style={{ originX: `${l.x}px`, originY: '104px' }}
          animate={{ rotate: [-12, 14, -12] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: l.d }}
        />
      ))}
    </svg>
  );
}

export function CarriageTransition() {
  const reduce = useReducedMotion();
  // Watch the visible strip (not the carriage, which starts off-screen) so the ride
  // starts each time the strip scrolls into view.
  const strip = useRef<HTMLDivElement>(null);
  const inView = useInView(strip, { amount: 0.6 });
  return (
    <div ref={strip} className="relative h-32 overflow-hidden sm:h-40" aria-hidden="true">
      <div className="absolute inset-x-0 bottom-6 h-px bg-gradient-to-r from-transparent via-lilac/60 to-transparent" />
      <motion.div
        className="absolute bottom-6 left-0"
        initial={{ x: reduce ? '35vw' : '-60vw' }}
        animate={reduce ? { x: '35vw' } : inView ? { x: '110vw' } : { x: '-60vw' }}
        transition={inView ? { duration: 9, ease: 'linear' } : { duration: 0 }}
      >
        <HorseAndCarriage />
      </motion.div>
    </div>
  );
}
