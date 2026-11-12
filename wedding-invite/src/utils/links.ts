/**
 * Builders for every outbound / internal link on the site, kept in one place
 * so links and QR codes can never drift apart.
 */
import { env } from '@/config/env';
import type { Venue } from '@/config/types';

/** Digits only — the format wa.me and tel: expect ("+254 700 000 001" → "254700000001"). */
export const phoneDigits = (phone: string) => phone.replace(/[^\d]/g, '');

export const telLink = (phone: string) => `tel:+${phoneDigits(phone)}`;

export const mailtoLink = (email: string, subject?: string) =>
  `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

/** Official WhatsApp click-to-chat link (https://faq.whatsapp.com/5913398998672934). */
export const whatsappLink = (phone: string, message?: string) =>
  `https://wa.me/${phoneDigits(phone)}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

export const mapsSearchLink = (venue: Venue) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapsQuery ?? `${venue.name}, ${venue.address}`)}`;

export const mapsDirectionsLink = (venue: Venue) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venue.mapsQuery ?? `${venue.name}, ${venue.address}`)}`;

/** Keyless Google Maps embed URL for an <iframe>. */
export const mapsEmbedLink = (venue: Venue) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(venue.mapsQuery ?? `${venue.name}, ${venue.address}`)}&z=15&output=embed`;

/**
 * Base address of the site. Uses VITE_SITE_URL when set (recommended for
 * production so QR codes printed on paper always point to the live site),
 * otherwise the address the page is currently served from.
 */
export const siteBaseUrl = (): string => {
  if (env.siteUrl) return env.siteUrl;
  const { origin, pathname } = window.location;
  return `${origin}${pathname.replace(/index\.html$/, '').replace(/\/+$/, '')}`;
};

/** App routes. The site uses hash routing so it works on any static host without rewrite rules. */
export const routes = {
  home: '/',
  gallery: '/gallery',
  upload: '/gallery/upload',
} as const;

/** Absolute, shareable URL for an app route (used for QR codes & copy-link buttons). */
export const absoluteRouteUrl = (route: string) => `${siteBaseUrl()}/#${route}`;
