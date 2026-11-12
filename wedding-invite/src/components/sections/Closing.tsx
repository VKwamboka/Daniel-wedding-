/** G. Closing — thank-you message with falling petals and twinkles. */
import { motion } from 'framer-motion';
import { wedding } from '@/config/wedding.config';
import { FloralCorner, FloralDivider, LilacSprig } from '@/components/decor/Florals';
import { PetalField } from '@/components/decor/Petals';
import { Sparkles } from '@/components/decor/Sparkles';

export function Closing() {
  return (
    <section className="section relative min-h-[80svh] pb-28" aria-labelledby="closing-title">
      <PetalField count={18} />
      <Sparkles count={14} color="#C3A0CF" />
      <FloralCorner className="-bottom-6 -left-6 opacity-80" />
      <FloralCorner className="-bottom-6 -right-6 opacity-80" flip />
      <div className="container-narrow relative z-10 text-center">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}>
          <LilacSprig className="mx-auto h-28" seed={5} />
        </motion.div>
        <motion.h2 id="closing-title" className="script mt-4 text-6xl text-plum-700 sm:text-7xl" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          Thank you
        </motion.h2>
        <FloralDivider className="mt-4" />
        <p className="body-text mx-auto mt-6 max-w-lg text-balance">{wedding.closing.message}</p>
        <p className="mt-10 font-serif italic text-plum-500">{wedding.closing.signature},</p>
        <p className="script mt-2 text-5xl text-plum-700">
          {wedding.groom.firstName} &amp; {wedding.bride.firstName}
        </p>
        <p className="mt-8 font-sans text-xs uppercase tracking-[0.3em] text-lilac-deep">{wedding.gallery.hashtag}</p>
      </div>
    </section>
  );
}
