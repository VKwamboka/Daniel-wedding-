/** C. Wedding programme: ceremony & reception summary + timeline of the day. */
import { motion } from 'framer-motion';
import { wedding } from '@/config/wedding.config';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { ClockIcon, PinIcon, timelineIcons } from '@/components/common/Icons';

export function Programme() {
  const events = [
    { label: 'Ceremony', ...wedding.ceremony },
    { label: 'Reception', ...wedding.reception },
  ];
  return (
    <section id="programme" className="section band-lavender" aria-labelledby="programme-title">
      <div className="container-wide">
        <SectionHeading id="programme-title" eyebrow={wedding.dateDisplay} title="The Day" script="our wedding programme" />

        <div className="mx-auto mb-16 grid max-w-3xl gap-5 sm:grid-cols-2">
          {events.map((e, i) => (
            <Reveal key={e.label} delay={i * 0.1} className="card p-7 text-center">
              <p className="eyebrow">{e.label}</p>
              <h3 className="mt-2 font-serif text-2xl text-plum-800">{e.name}</h3>
              <p className="mt-3 flex items-center justify-center gap-2 font-sans text-sm text-plum-700"><ClockIcon className="h-4 w-4 text-lilac-deep" />{e.time}</p>
              <p className="mt-1 flex items-center justify-center gap-2 font-sans text-sm text-plum-700"><PinIcon className="h-4 w-4 text-lilac-deep" />{e.address}</p>
            </Reveal>
          ))}
        </div>

        {/* Timeline — single column on mobile, alternating on desktop */}
        <ol className="relative mx-auto max-w-3xl">
          <div className="absolute bottom-4 left-6 top-4 w-px bg-lilac/50 sm:left-1/2" aria-hidden="true" />
          {wedding.timeline.map((item, i) => {
            const Icon = timelineIcons[item.icon];
            const right = i % 2 === 1;
            return (
              <motion.li
                key={item.title}
                className="relative mb-8 flex items-center gap-5 pl-0 sm:mb-10 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: 0.05 * i }}
              >
                <div className={`hidden sm:block ${right ? '' : 'text-right'}`}>
                  {!right && <TimelineText {...item} align="right" />}
                  {right && <p className="font-serif text-2xl italic text-lilac-deep">{item.time}</p>}
                </div>
                <motion.span
                  className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-lavender-300 bg-ivory text-plum-700 shadow-card"
                  whileInView={{ rotate: [0, -10, 10, 0] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + 0.05 * i }}
                >
                  <Icon className="h-6 w-6" />
                </motion.span>
                <div className="hidden sm:block">
                  {right && <TimelineText {...item} align="left" />}
                  {!right && <p className="font-serif text-2xl italic text-lilac-deep">{item.time}</p>}
                </div>
                {/* mobile */}
                <div className="sm:hidden">
                  <p className="font-serif text-lg italic text-lilac-deep">{item.time}</p>
                  <TimelineText {...item} align="left" />
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function TimelineText({ title, description, align }: { title: string; description?: string; align: 'left' | 'right' }) {
  return (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
      <h3 className="font-serif text-xl text-plum-800">{title}</h3>
      {description && <p className="font-sans text-sm text-plum-500">{description}</p>}
    </div>
  );
}
