/**
 * Embossed wax seal with the couple's initials and a laurel wreath.
 * It's a real <button> so it works with keyboard and screen readers.
 */
import { motion } from 'framer-motion';
import { wedding } from '@/config/wedding.config';

interface Props {
  onOpen: () => void;
  breaking: boolean;
}

// Irregular wax blob outline (drips) around a circle of radius ~46.
const WAX_PATH =
  'M50 2 C62 2 66 6 74 9 C84 12 92 20 95 30 C99 40 98 46 98 52 C98 62 94 70 89 77 C84 85 76 92 66 95 C58 98 54 99 48 98 C38 98 30 95 22 90 C14 84 7 76 4 66 C1 58 2 52 2 46 C3 36 7 26 14 18 C22 9 34 3 50 2 Z';

export function WaxSeal({ onOpen, breaking }: Props) {
  const { groom, bride } = wedding.initials;
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      disabled={breaking}
      aria-label="Open the invitation"
      className="group relative h-28 w-28 rounded-full focus-visible:outline-offset-8 sm:h-32 sm:w-32"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={breaking ? { scale: [1, 1.15, 0], rotate: [0, -8, 20], opacity: [1, 1, 0] } : { scale: [1, 1.03, 1] }}
      transition={breaking ? { duration: 0.7, ease: 'easeIn' } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_10px_14px_rgba(90,46,99,0.35)]">
        <defs>
          <radialGradient id="wax" cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#FDFBFF" />
            <stop offset="45%" stopColor="#EADFF4" />
            <stop offset="100%" stopColor="#C9B3DC" />
          </radialGradient>
          <radialGradient id="wax-inner" cx="60%" cy="70%" r="70%">
            <stop offset="0%" stopColor="#F4EEFA" />
            <stop offset="100%" stopColor="#D9C8E8" />
          </radialGradient>
          <filter id="emboss">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.6" result="b" />
            <feOffset dx="0.6" dy="0.8" result="o" />
            <feComposite in="SourceGraphic" in2="o" operator="over" />
          </filter>
        </defs>
        <path d={WAX_PATH} fill="url(#wax)" />
        <circle cx="50" cy="50" r="36" fill="url(#wax-inner)" stroke="#BFA6D4" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="0.6" />
        {/* laurel wreath */}
        <g fill="none" stroke="#C3A9D8" strokeWidth="0.7" strokeLinecap="round">
          <path d="M30 64 C 24 52, 26 38, 36 28" />
          <path d="M70 64 C 76 52, 74 38, 64 28" />
        </g>
        {Array.from({ length: 6 }, (_, i) => {
          const t = i / 5;
          const y = 62 - t * 32;
          const xL = 29 - Math.sin(t * Math.PI) * 3 + t * 6;
          return (
            <g key={i} fill="#C9B3DC" opacity="0.9">
              <ellipse cx={xL - 1.5} cy={y} rx="1.4" ry="2.8" transform={`rotate(${-40 + t * 30} ${xL - 1.5} ${y})`} />
              <ellipse cx={101.5 - xL} cy={y} rx="1.4" ry="2.8" transform={`rotate(${40 - t * 30} ${101.5 - xL} ${y})`} />
            </g>
          );
        })}
        <text x="50" y="58" textAnchor="middle" fontFamily="Pinyon Script, cursive" fontSize="27" fill="#8F6FA8" filter="url(#emboss)">
          {groom}
          <tspan fontSize="15" dy="-4" dx="1">&amp;</tspan>
          <tspan dy="4" dx="1">{bride}</tspan>
        </text>
      </svg>
      {!breaking && (
        <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap font-sans text-[0.62rem] uppercase tracking-[0.35em] text-plum-700/80">
          Tap to open
        </span>
      )}
    </motion.button>
  );
}
