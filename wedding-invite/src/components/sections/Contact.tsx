/** Contact cards for the bride and groom: call, email and WhatsApp. */
import { wedding } from '@/config/wedding.config';
import type { Person } from '@/config/types';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { MailIcon, PhoneIcon, WhatsAppIcon } from '@/components/common/Icons';
import { mailtoLink, telLink, whatsappLink } from '@/utils/links';
import { coupleNames } from '@/config/wedding.config';

function ContactCard({ person, delay }: { person: Person; delay: number }) {
  const initial = person.firstName.charAt(0);
  return (
    <Reveal delay={delay} className="card p-8 text-center">
      <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-lavender-100 ring-1 ring-lavender-300">
        <span className="script text-4xl text-plum-700">{initial}</span>
      </span>
      <p className="eyebrow mt-4">{person.role}</p>
      <h3 className="mt-1 font-serif text-3xl text-plum-800">{person.firstName} {person.lastName}</h3>

      <ul className="mt-5 space-y-2 font-sans text-sm text-plum-700">
        <li>
          <a href={telLink(person.phone)} className="inline-flex items-center gap-2 hover:text-lilac-deep">
            <PhoneIcon className="h-4 w-4 text-lilac-deep" /> {person.phone}
          </a>
        </li>
        <li>
          <a href={mailtoLink(person.email, `${coupleNames} wedding`)} className="inline-flex items-center gap-2 break-all hover:text-lilac-deep">
            <MailIcon className="h-4 w-4 text-lilac-deep" /> {person.email}
          </a>
        </li>
      </ul>

      <a
        href={whatsappLink(person.phone, person.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn mt-6 w-full bg-[#25D366] text-white shadow-card hover:bg-[#1EBE5A]"
        aria-label={`Chat with ${person.firstName} on WhatsApp`}
      >
        <WhatsAppIcon className="h-4 w-4" /> WhatsApp {person.firstName}
      </a>
    </Reveal>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section band-lavender" aria-labelledby="contact-title">
      <div className="container-narrow">
        <SectionHeading id="contact-title" eyebrow="Questions?" title="Get in Touch" script="we’d love to hear from you" />
        <div className="grid gap-6 sm:grid-cols-2">
          <ContactCard person={wedding.bride} delay={0} />
          <ContactCard person={wedding.groom} delay={0.12} />
        </div>
      </div>
    </section>
  );
}
