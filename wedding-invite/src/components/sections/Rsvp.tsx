/** F. RSVP form → rsvpService (Supabase table, or browser in demo mode). */
import { AnimatePresence, motion } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { wedding } from '@/config/wedding.config';
import { submitRsvp } from '@/services/rsvpService';
import { SectionHeading } from '@/components/common/SectionHeading';
import { LaceEdge } from '@/components/decor/Florals';
import { Sparkles } from '@/components/decor/Sparkles';
import { DemoBanner } from '@/components/common/DemoBanner';
import { HeartIcon } from '@/components/common/Icons';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Rsvp() {
  const [attending, setAttending] = useState<boolean | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [name, setName] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (attending === null) {
      setError('Please let us know if you can attend.');
      return;
    }
    const f = new FormData(e.currentTarget);
    setStatus('sending');
    setError('');
    try {
      await submitRsvp({
        fullName: String(f.get('fullName') ?? ''),
        email: String(f.get('email') ?? ''),
        phone: String(f.get('phone') ?? ''),
        attending,
        guestCount: Number(f.get('guestCount') ?? 1),
        dietary: String(f.get('dietary') ?? ''),
        message: String(f.get('message') ?? ''),
      });
      setName(String(f.get('fullName') ?? '').split(' ')[0]);
      setStatus('sent');
    } catch (err) {
      setError((err as Error).message);
      setStatus('error');
    }
  };

  return (
    <section id="rsvp" className="section band-plum" aria-labelledby="rsvp-title">
      <LaceEdge position="top" />
      <LaceEdge position="bottom" />
      <Sparkles count={12} />
      <div className="container-narrow relative z-10">
        <SectionHeading id="rsvp-title" eyebrow={`Kindly reply by ${wedding.rsvp.deadlineDisplay}`} title="RSVP" script="will you celebrate with us?" light />
        <div className="[&_[role=note]]:bg-ivory/95"><DemoBanner what="RSVPs" /></div>

        <AnimatePresence mode="wait">
          {status === 'sent' ? (
            <motion.div key="thanks" className="frame mx-auto max-w-lg text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} role="status">
              <div className="relative z-10">
                <HeartIcon className="mx-auto h-10 w-10 text-lilac-deep" />
                <h3 className="script mt-3 text-5xl text-plum-700">Thank you{name ? `, ${name}` : ''}!</h3>
                <p className="body-text mt-4">
                  {attending ? 'Your RSVP is in — we can’t wait to celebrate with you!' : 'We’ll miss you dearly, and we’re grateful you let us know.'}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={onSubmit} className="frame mx-auto max-w-lg" exit={{ opacity: 0, y: -10 }} noValidate={false}>
              <div className="relative z-10 space-y-5">
                <div>
                  <label htmlFor="fullName" className="label">Full name *</label>
                  <input id="fullName" name="fullName" required maxLength={120} autoComplete="name" className="field" placeholder="Your name" />
                </div>

                <fieldset>
                  <legend className="label">Will you attend? *</legend>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ v: true, l: 'Joyfully accept' }, { v: false, l: 'Regretfully decline' }].map((o) => (
                      <label key={o.l} className={`cursor-pointer rounded-xl border px-3 py-3 text-center font-serif text-lg transition ${attending === o.v ? 'border-plum-700 bg-plum-700 text-ivory' : 'border-lavender-300 bg-white/80 text-plum-800 hover:border-lilac-deep'}`}>
                        <input type="radio" name="attending" className="sr-only" checked={attending === o.v} onChange={() => { setAttending(o.v); setError(''); }} />
                        {o.l}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <AnimatePresence>
                  {attending && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-5 overflow-hidden">
                      <div>
                        <label htmlFor="guestCount" className="label">Number of guests (including you)</label>
                        <select id="guestCount" name="guestCount" className="field" defaultValue="1">
                          {Array.from({ length: wedding.rsvp.maxGuestsPerInvite }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="dietary" className="label">Dietary requirements</label>
                        <input id="dietary" name="dietary" maxLength={500} className="field" placeholder="Vegetarian, allergies… (optional)" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="label">Email</label>
                    <input id="email" name="email" type="email" maxLength={200} autoComplete="email" className="field" placeholder="optional" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="label">Phone</label>
                    <input id="phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className="field" placeholder="optional" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="label">A note for the couple</label>
                  <textarea id="message" name="message" rows={3} maxLength={1000} className="field resize-none" placeholder="optional" />
                </div>

                {error && <p role="alert" className="font-sans text-sm text-red-700">{error}</p>}

                <button type="submit" className="btn-primary w-full" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send RSVP'}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
