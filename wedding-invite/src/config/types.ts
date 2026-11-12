/**
 * Type definitions for everything that can be customised in wedding.config.ts.
 * Keeping the shape typed means a typo in the config fails the build instead
 * of silently breaking a section.
 */

export interface Person {
  firstName: string;
  lastName: string;
  /** Shown under the name in the contact card, e.g. "The Bride". */
  role: string;
  email: string;
  /** International format, e.g. "+254 700 000 001". Used for tel: and WhatsApp links. */
  phone: string;
  /** Pre-filled text when a guest opens a WhatsApp chat. */
  whatsappMessage?: string;
}

export interface Venue {
  name: string;
  address: string;
  /** Free text sent to Google Maps. Falls back to "name, address". */
  mapsQuery?: string;
  /** Optional photo in /public; an illustration is shown when omitted. */
  image?: string;
}

export type TimelineIcon = 'rings' | 'camera' | 'glass' | 'dinner' | 'cake' | 'music' | 'car';

export interface TimelineItem {
  time: string;
  title: string;
  description?: string;
  icon: TimelineIcon;
}

export type StoryScene = 'meeting' | 'journey' | 'proposal';

export interface StoryChapter {
  id: string;
  eyebrow: string; // small caption, e.g. "March 2019"
  title: string;
  text: string[]; // paragraphs
  /** Which built-in SVG illustration to show. */
  scene: StoryScene;
  /** Optional image in /public that replaces the SVG (e.g. a Canva export). */
  image?: string;
  imageAlt?: string;
}

/**
 * How a payment logo is rendered:
 *  - 'simple-icon': official brand mark bundled with the `simple-icons` package
 *  - 'image':       an official logo file you drop into /public/logos
 *  - 'bank':        neutral bank illustration (no single brand)
 * Image logos fall back to a styled wordmark if the file is missing.
 */
export type LogoSource =
  | { kind: 'simple-icon'; slug: 'wise' | 'revolut' | 'airtel' }
  | { kind: 'image'; src: string; wordmark: string; color: string }
  | { kind: 'bank' };

export interface GiftDetail {
  label: string;
  value: string;
  /** Show a copy button next to this value. */
  copyable?: boolean;
}

export interface GiftMethod {
  id: string;
  name: string;
  logo: LogoSource;
  /** Short line under the logo, e.g. "Kenya · mobile money". */
  tagline: string;
  details: GiftDetail[];
  /** Optional payment link (Wise / Revolut pay links, etc.). */
  link?: { label: string; url: string };
}

export interface WeddingConfig {
  initials: { groom: string; bride: string };
  groom: Person;
  bride: Person;
  /** ISO date-time with timezone offset — drives the countdown. */
  dateISO: string;
  dateDisplay: string;
  city: string;
  welcome: { eyebrow: string; message: string };
  ceremony: Venue & { time: string };
  reception: Venue & { time: string };
  timeline: TimelineItem[];
  story: { intro: string; chapters: StoryChapter[] };
  gifts: { intro: string; note: string; methods: GiftMethod[] };
  rsvp: { deadlineDisplay: string; maxGuestsPerInvite: number };
  gallery: { hashtag: string; maxUploadMB: number; maxFilesPerUpload: number };
  music: { /** Optional mp3 in /public/audio. A soft generated melody plays if empty. */ src?: string; title: string };
  closing: { message: string; signature: string };
}
