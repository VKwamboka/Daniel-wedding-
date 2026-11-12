/**
 * Compact menu: a pill button that opens a sheet of section links.
 * Stays out of the way of the invitation design on small screens.
 */
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '@/utils/links';
import { CloseIcon } from './Icons';

const LINKS = [
  { href: '#welcome', label: 'Welcome' },
  { href: '#story', label: 'Our Story' },
  { href: '#programme', label: 'The Day' },
  { href: '#venue', label: 'Venue' },
  { href: '#gifts', label: 'Gifts' },
  { href: '#rsvp', label: 'RSVP' },
  { href: '#photos', label: 'Photos' },
  { href: '#contact', label: 'Contact' },
];

/** Smooth-scroll without changing the hash (the router owns the hash). */
const scrollToId = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

export function FloatingNav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="fixed left-1/2 top-4 z-40 -translate-x-1/2 rounded-full border border-lavender-300 bg-ivory/85 px-5 py-2 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-plum-700 shadow-card backdrop-blur"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        Menu
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center bg-plum-900/30 px-4 pt-16 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.nav
              role="dialog"
              aria-label="Sections"
              className="frame w-full max-w-sm text-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" onClick={() => setOpen(false)} className="absolute right-6 top-6 z-10 text-plum-500" aria-label="Close menu">
                <CloseIcon className="h-5 w-5" />
              </button>
              <ul className="relative z-10 space-y-3">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <button
                      type="button"
                      className="font-serif text-2xl text-plum-800 transition hover:text-lilac-deep"
                      onClick={() => {
                        setOpen(false);
                        window.setTimeout(() => scrollToId(l.href), 250);
                      }}
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
                <li className="pt-3">
                  <Link to={routes.gallery} className="btn-outline">Open photo gallery</Link>
                </li>
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
