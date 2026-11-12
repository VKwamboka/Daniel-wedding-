/**
 * Our Love Story — chapters alternate left/right on desktop and stack on
 * mobile, joined by a vertical ribbon with heart markers.
 */
import { motion } from 'framer-motion';
import { wedding } from '@/config/wedding.config';
import { SectionHeading } from '@/components/common/SectionHeading';
import { HeartIcon } from '@/components/common/Icons';
import { FloralCorner } from '@/components/decor/Florals';
import { StoryIllustration } from '@/components/story/Scenes';

export function LoveStory() {
  const { intro, chapters } = wedding.story;
  return (
    <section id="story" className="section" aria-labelledby="story-title">
      <FloralCorner className="-right-10 top-10 opacity-60" flip />
      <div className="container-wide relative">
        <SectionHeading id="story-title" eyebrow="How it all began" title="Our Love Story" script={intro} />

        <div className="relative">
          {/* ribbon */}
          <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-transparent via-lilac to-transparent md:left-1/2" aria-hidden="true" />

          <ol className="space-y-16 md:space-y-24">
            {chapters.map((ch, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={ch.id} className="relative pl-14 md:pl-0">
                  <span className="absolute left-5 top-2 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-lavender-300 bg-ivory text-lilac-deep shadow-card md:left-1/2" aria-hidden="true">
                    <HeartIcon className="h-4 w-4" />
                  </span>
                  <div className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${flip ? 'md:[&>*:first-child]:order-2' : ''}`}>
                    <motion.figure
                      initial={{ opacity: 0, x: flip ? 40 : -40, rotate: flip ? 2 : -2 }}
                      whileInView={{ opacity: 1, x: 0, rotate: flip ? 1 : -1 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      className="relative mx-auto w-full max-w-md"
                    >
                      {/* arched, double-framed illustration */}
                      <div className="rounded-t-[999px] rounded-b-3xl bg-ivory p-2.5 shadow-card ring-1 ring-lavender-300">
                        <div className="aspect-[4/3] overflow-hidden rounded-t-[999px] rounded-b-2xl ring-1 ring-gold-soft/50">
                          <StoryIllustration scene={ch.scene} image={ch.image} alt={ch.imageAlt ?? ch.title} />
                        </div>
                      </div>
                      <figcaption className="sr-only">{ch.imageAlt}</figcaption>
                    </motion.figure>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 1, delay: 0.15 }}
                      className={flip ? 'md:text-right' : ''}
                    >
                      <p className="eyebrow">{ch.eyebrow}</p>
                      <h3 className="mt-3 font-serif text-3xl text-plum-800 sm:text-4xl">{ch.title}</h3>
                      {ch.text.map((p, k) => (
                        <p key={k} className="body-text mt-4">{p}</p>
                      ))}
                    </motion.div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
