/** D. Venues: illustration or photo, address, embedded map and directions. */
import { useState } from 'react';
import { wedding } from '@/config/wedding.config';
import type { Venue as VenueType } from '@/config/types';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { ExternalIcon, PinIcon } from '@/components/common/Icons';
import { mapsDirectionsLink, mapsEmbedLink, mapsSearchLink } from '@/utils/links';

/** Line-art chapel / garden pavilion used when no venue photo is provided. */
function VenueIllustration({ kind }: { kind: 'chapel' | 'garden' }) {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden="true">
      <rect width="320" height="180" fill="#F8F4FC" />
      <g fill="none" stroke="#9B72AE" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        {kind === 'chapel' ? (
          <>
            <path d="M110 160 V90 L160 50 L210 90 V160 Z" />
            <path d="M160 50 V22 M150 32 H170" />
            <path d="M145 160 V122 a15 15 0 0 1 30 0 V160" />
            <circle cx="160" cy="84" r="10" />
            <path d="M80 160 V110 L110 92 M240 160 V110 L210 92" />
          </>
        ) : (
          <>
            <path d="M90 160 V96 M230 160 V96 M90 96 C 120 56, 200 56, 230 96" />
            <path d="M120 160 V104 M200 160 V104" />
            <path d="M84 96 H236" />
            {[110, 135, 160, 185, 210].map((x) => <path key={x} d={`M${x} 98 q 4 10 0 18`} />)}
          </>
        )}
        <path d="M20 160 H300" />
      </g>
      {Array.from({ length: 18 }, (_, i) => (
        <circle key={i} cx={30 + i * 15} cy={156 - (i % 3) * 4} r={4} fill={i % 2 ? '#CDB6E4' : '#E3D5F1'} />
      ))}
    </svg>
  );
}

function VenueCard({ label, venue, kind, time }: { label: string; venue: VenueType; kind: 'chapel' | 'garden'; time: string }) {
  const [showMap, setShowMap] = useState(false);
  return (
    <div className="card overflow-hidden">
      <div className="aspect-[16/9] overflow-hidden">
        {showMap ? (
          <iframe title={`Map of ${venue.name}`} src={mapsEmbedLink(venue)} className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        ) : venue.image ? (
          <img src={venue.image} alt={venue.name} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <VenueIllustration kind={kind} />
        )}
      </div>
      <div className="p-7 text-center">
        <p className="eyebrow">{label} · {time}</p>
        <h3 className="mt-2 font-serif text-3xl text-plum-800">{venue.name}</h3>
        <a href={mapsSearchLink(venue)} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 font-sans text-sm text-plum-700 underline decoration-lavender-300 underline-offset-4 hover:text-lilac-deep">
          <PinIcon className="h-4 w-4" /> {venue.address}
        </a>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={mapsDirectionsLink(venue)} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Get directions <ExternalIcon className="h-3.5 w-3.5" />
          </a>
          <button type="button" onClick={() => setShowMap((s) => !s)} className="btn-outline" aria-pressed={showMap}>
            {showMap ? 'Hide map' : 'Show map'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Venue() {
  return (
    <section id="venue" className="section" aria-labelledby="venue-title">
      <div className="container-wide">
        <SectionHeading id="venue-title" eyebrow="Where to find us" title="Venue & Directions" />
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal><VenueCard label="Ceremony" venue={wedding.ceremony} time={wedding.ceremony.time} kind="chapel" /></Reveal>
          <Reveal delay={0.15}><VenueCard label="Reception" venue={wedding.reception} time={wedding.reception.time} kind="garden" /></Reveal>
        </div>
      </div>
    </section>
  );
}
