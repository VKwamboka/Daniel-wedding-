/** E. Gift information — discreet intro + payment options grid. */
import { wedding } from '@/config/wedding.config';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { GiftCard } from '@/components/gifts/GiftCard';

export function Gifts() {
  const { intro, note, methods } = wedding.gifts;
  return (
    <section id="gifts" className="section band-lavender" aria-labelledby="gifts-title">
      <div className="container-wide">
        <SectionHeading id="gifts-title" eyebrow="With gratitude" title="Wedding Gifts" script={intro} />
        <Reveal className="mx-auto -mt-4 mb-12 max-w-2xl text-center">
          <p className="body-text">{note}</p>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {methods.map((m, i) => <GiftCard key={m.id} method={m} index={i} />)}
        </div>
      </div>
    </section>
  );
}
