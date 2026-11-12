/**
 * Falling-petal layer. Pure CSS-transform animation via Framer Motion; disabled
 * automatically for reduced-motion users by <MotionConfig reducedMotion="user">.
 */
import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

const COLORS = ['#E3D5F1', '#CDB6E4', '#C3A0CF', '#F0E8F8', '#FBF8F2'];

export function Petal({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 1 C 16 5, 17 13, 10 19 C 3 13, 4 5, 10 1 Z" fill={color} opacity="0.9" />
      <path d="M10 3 C 11 8, 11 13, 10 17" stroke="rgba(255,255,255,.6)" strokeWidth="0.6" fill="none" />
    </svg>
  );
}

/** Continuous gentle petal fall across the parent (parent must be `relative`). */
export function PetalField({ count = 14, className = '' }: { count?: number; className?: string }) {
  const reduce = useReducedMotion();
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 97) % 100}%`,
        size: 10 + ((i * 7) % 12),
        delay: (i * 1.3) % 10,
        duration: 11 + ((i * 3) % 8),
        drift: ((i % 2 ? 1 : -1) * (30 + (i * 13) % 50)),
        color: COLORS[i % COLORS.length],
      })),
    [count],
  );
  if (reduce) return null;
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {petals.map((p, i) => (
        <motion.div
          key={i}
          className="absolute -top-8"
          style={{ left: p.left }}
          animate={{ y: ['0vh', '110vh'], x: [0, p.drift, 0], rotate: [0, 180, 360] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        >
          <Petal color={p.color} size={p.size} />
        </motion.div>
      ))}
    </div>
  );
}

/** One-shot burst from the centre — used when the envelope opens. */
export function PetalBurst({ count = 40 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + (i % 3) * 0.3;
        const dist = 180 + ((i * 37) % 260);
        return {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist - 80,
          rotate: (i * 47) % 360,
          size: 12 + (i % 4) * 5,
          color: COLORS[i % COLORS.length],
          delay: (i % 8) * 0.03,
        };
      }),
    [count],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center" aria-hidden="true">
      {pieces.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
          animate={{ x: p.x, y: [p.y, p.y + 260], opacity: [0, 1, 1, 0], scale: 1, rotate: p.rotate }}
          transition={{ duration: 2.6, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
        >
          <Petal color={p.color} size={p.size} />
        </motion.div>
      ))}
    </div>
  );
}
