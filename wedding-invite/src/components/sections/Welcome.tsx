/** A. Welcome & couple introduction (hero). */
import { motion } from 'framer-motion';
import { wedding } from '@/config/wedding.config';
import { FloralCorner, FloralDivider } from '@/components/decor/Florals';
import { PetalField } from '@/components/decor/Petals';

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] },
});

export function Welcome() {
  return (
    <section id="welcome" className="section band-lavender flex min-h-[100svh] items-center justify-center" aria-labelledby="welcome-title">
      <PetalField count={12} />
      <FloralCorner className="-left-6 -top-4" />
      <FloralCorner className="-right-6 -top-4" flip />
      <FloralCorner className="-bottom-10 -left-8 rotate-180 opacity-70" flip />
      <FloralCorner className="-bottom-10 -right-8 rotate-180 opacity-70" />

      <div className="frame relative z-10 w-full max-w-xl text-center">
        <div className="relative z-10">
          <motion.p className="eyebrow" {...fade(0.1)}>{wedding.welcome.eyebrow}</motion.p>
          <motion.h1 id="welcome-title" className="script mt-6 text-6xl leading-[1.05] text-plum-700 sm:text-8xl" {...fade(0.3)}>
            {wedding.groom.firstName}
            <span className="my-1 block font-serif text-3xl italic text-lilac-deep">and</span>
            {wedding.bride.firstName}
          </motion.h1>
          <motion.div {...fade(0.5)}>
            <FloralDivider className="mt-6" />
            <p className="mt-5 font-serif text-2xl text-plum-800">{wedding.dateDisplay}</p>
            <p className="mt-1 font-sans text-xs uppercase tracking-[0.3em] text-plum-500">{wedding.city}</p>
          </motion.div>
          <motion.p className="body-text mx-auto mt-7 max-w-md text-balance italic" {...fade(0.7)}>
            {wedding.welcome.message}
          </motion.p>
        </div>
      </div>

      <motion.a
        href="#countdown"
        onClick={(e) => { e.preventDefault(); document.getElementById('countdown')?.scrollIntoView({ behavior: 'smooth' }); }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-sans text-[0.6rem] uppercase tracking-[0.4em] text-plum-500"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scroll ↓
      </motion.a>
    </section>
  );
}
