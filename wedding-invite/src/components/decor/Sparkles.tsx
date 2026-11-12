/** Small twinkling stars for the plum bands and closing section. */
import { motion, useReducedMotion } from 'framer-motion';

export function Sparkles({ count = 18, color = '#FBF8F2' }: { count?: number; color?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 10 10"
          className="absolute"
          style={{ left: `${(i * 53) % 100}%`, top: `${(i * 29) % 100}%`, width: 6 + (i % 3) * 3 }}
          animate={reduce ? undefined : { opacity: [0.1, 0.9, 0.1], scale: [0.7, 1.1, 0.7] }}
          transition={{ duration: 2.4 + (i % 4), delay: (i % 6) * 0.5, repeat: Infinity }}
        >
          <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill={color} />
        </motion.svg>
      ))}
    </div>
  );
}
