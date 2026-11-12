/** "/" — envelope opening, then the scrolling invitation. */
import { useState } from 'react';
import { Envelope } from '@/components/envelope/Envelope';
import { FloatingNav } from '@/components/common/FloatingNav';
import { MusicToggle } from '@/components/common/MusicToggle';
import { CarriageTransition } from '@/components/common/Carriage';
import { Welcome } from '@/components/sections/Welcome';
import { Countdown } from '@/components/sections/Countdown';
import { LoveStory } from '@/components/sections/LoveStory';
import { Programme } from '@/components/sections/Programme';
import { Venue } from '@/components/sections/Venue';
import { Gifts } from '@/components/sections/Gifts';
import { Rsvp } from '@/components/sections/Rsvp';
import { PhotosSection } from '@/components/sections/PhotosSection';
import { Contact } from '@/components/sections/Contact';
import { Closing } from '@/components/sections/Closing';

// Only show the envelope once per browser session (returning from the gallery skips it).
const SEEN_KEY = 'wedding:envelopeOpened';
const seen = () => { try { return sessionStorage.getItem(SEEN_KEY) === '1'; } catch { return false; } };

export default function InvitationPage() {
  const [opened, setOpened] = useState(seen);

  const onOpened = () => {
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* storage unavailable */ }
    setOpened(true);
  };

  return (
    <>
      {!opened && <Envelope onDone={onOpened} />}
      <FloatingNav />
      <MusicToggle />
      <main>
        <Welcome />
        <Countdown />
        <LoveStory />
        <Programme />
        <CarriageTransition />
        <Venue />
        <Gifts />
        <Rsvp />
        <PhotosSection />
        <Contact />
        <Closing />
      </main>
    </>
  );
}
