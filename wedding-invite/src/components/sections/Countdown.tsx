/** B. Live countdown on a deep plum band with lace edges. */
import { motion } from 'framer-motion';
import { wedding } from '@/config/wedding.config';
import { useCountdown } from '@/hooks/useCountdown';
import { pad2 } from '@/utils/date';
import { downloadIcs, googleCalendarLink } from '@/utils/calendar';
import { LaceEdge } from '@/components/decor/Florals';
import { Sparkles } from '@/components/decor/Sparkles';
import { SectionHeading } from '@/components/common/SectionHeading';

export function Countdown() {
  const t = useCountdown(wedding.dateISO);
  const units = [
    { label: 'Days', value: t.days },
    { label: 'Hours', value: t.hours },
    { label: 'Minutes', value: t.minutes },
    { label: 'Seconds', value: t.seconds },
  ];

  return (
    <section id="countdown" className="section band-plum" aria-labelledby="countdown-title">
      <LaceEdge position="top" />
      <LaceEdge position="bottom" />
      <Sparkles />
      <div className="container-narrow relative z-10 text-center">
        <SectionHeading id="countdown-title" eyebrow="Counting down to" title="Our Big Day" light />
        {t.done ? (
          <p className="script text-5xl text-lavender-100">Today is the day!</p>
        ) : (
          <div className="mx-auto grid max-w-lg grid-cols-4 gap-2 sm:gap-4" role="timer" aria-live="off">
            {units.map((u, i) => (
              <motion.div
                key={u.label}
                className="rounded-2xl border border-ivory/20 bg-ivory/5 px-1 py-4 backdrop-blur-sm sm:py-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.7 }}
              >
                <motion.span key={u.value} initial={{ opacity: 0.4, y: -6 }} animate={{ opacity: 1, y: 0 }} className="block font-serif text-4xl tabular-nums sm:text-5xl">
                  {u.label === 'Days' ? u.value : pad2(u.value)}
                </motion.span>
                <span className="mt-1 block font-sans text-[0.58rem] uppercase tracking-[0.25em] text-lavender-200 sm:text-[0.65rem]">{u.label}</span>
              </motion.div>
            ))}
          </div>
        )}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a className="btn-light" href={googleCalendarLink()} target="_blank" rel="noopener noreferrer">Google Calendar</a>
          <button type="button" className="btn-light" onClick={downloadIcs}>Apple / Outlook (.ics)</button>
        </div>
      </div>
    </section>
  );
}
