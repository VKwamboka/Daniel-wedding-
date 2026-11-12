/** "Add to calendar" helpers: Google Calendar link + downloadable .ics file. */
import { wedding, coupleNames } from '@/config/wedding.config';

const toUtcStamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

const eventWindow = () => {
  const start = new Date(wedding.dateISO);
  const end = new Date(start.getTime() + 10 * 3_600_000); // ceremony → end of party
  return { start, end };
};

const title = () => `Wedding of ${coupleNames}`;
const location = () => `${wedding.ceremony.name}, ${wedding.ceremony.address}`;

export const googleCalendarLink = () => {
  const { start, end } = eventWindow();
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: title(),
    dates: `${toUtcStamp(start)}/${toUtcStamp(end)}`,
    details: `Ceremony at ${wedding.ceremony.name} (${wedding.ceremony.time}), reception at ${wedding.reception.name} (${wedding.reception.time}).`,
    location: location(),
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
};

export const downloadIcs = () => {
  const { start, end } = eventWindow();
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//wedding-invitation//EN', 'BEGIN:VEVENT',
    `UID:${toUtcStamp(start)}-wedding@invite`, `DTSTAMP:${toUtcStamp(new Date())}`,
    `DTSTART:${toUtcStamp(start)}`, `DTEND:${toUtcStamp(end)}`,
    `SUMMARY:${title()}`, `LOCATION:${location().replace(/,/g, '\\,')}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: 'wedding.ics' });
  a.click();
  URL.revokeObjectURL(url);
};
