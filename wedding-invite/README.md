# H & D — Wedding Invitation Website

An animated digital wedding invitation built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion**, with a real photo gallery and RSVP backend on **Supabase**.

Guests open a lace envelope sealed with wax, then scroll through: welcome → countdown → our love story → the day's programme → horse-and-carriage transition → venues & directions → gifts → RSVP → photo gallery (with QR codes) → contact → thank-you.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the build locally
npm run typecheck
```

Without Supabase keys the site runs in **demo mode**: the gallery and RSVP work, but data stays in the visitor's own browser, and a small banner says so. Connect Supabase (below) before sharing the link.

---

## 1. Personal details — `src/config/wedding.config.ts`

All names, dates, venues, story text, payment details, contacts and the programme live in this one file. Every invented value is marked `⟨PLACEHOLDER⟩`. Search for that word and replace each one.

| What | Where in the config |
|---|---|
| Names, phone numbers, emails, WhatsApp message | `groom`, `bride` |
| Date (drives the countdown — keep the timezone offset) | `dateISO`, `dateDisplay` |
| Ceremony / reception venues | `ceremony`, `reception` (add `image: 'images/venue.jpg'` for a photo) |
| Timeline of the day | `timeline` |
| Love story chapters | `story.chapters` |
| M-Pesa, Airtel Money, Wise, Revolut, bank details | `gifts.methods` |
| RSVP deadline / max guests | `rsvp` |
| Hashtag, upload limits | `gallery` |
| Background music | `music.src` (e.g. `audio/song.mp3` in `/public/audio`). If empty, a soft music-box melody is generated in the browser. Music never plays until a guest taps the button. |

Colours and fonts: `tailwind.config.js` (palette tokens `lavender`, `lilac`, `plum`, `ivory`, `gold`).

---

## 2. Backend — photo gallery & RSVPs (Supabase, free tier)

1. Create a project at <https://supabase.com>.
2. Open **SQL Editor → New query**, paste the contents of [`supabase/setup.sql`](supabase/setup.sql) and click **Run**. This creates:
   - a public storage bucket `wedding-photos` (images only, 25 MB max)
   - a `photos` table, with live updates switched on so new photos appear for everyone viewing the gallery
   - an `rsvps` table that guests can write to but not read
3. Copy `.env.example` to `.env` and fill in the values from **Project Settings → API**:
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   VITE_SITE_URL=https://your-live-site.example   # important for printed QR codes
   ```
4. Rebuild and deploy. The demo banner disappears once the keys are present.

**Reading RSVPs:** Supabase dashboard → Table editor → `rsvps` (Export → CSV).
**Moderating photos:** delete the row in Table editor → `photos` (and optionally the file in Storage → `wedding-photos`).

Before upload, photos are resized in the browser to 2000 px JPEG, so uploads are quick on mobile data. Guests don't need an account. Uploads are restricted by row-level-security policies: insert-only, `uploads/` folder only, and length limits on names and captions.

---

## 3. Gallery links & QR codes

| Page | Link |
|---|---|
| View photos | `https://your-site/#/gallery` |
| Upload photos | `https://your-site/#/gallery/upload` |

- The "Wedding Photos" section, the gallery page and the upload page all show a QR card with **View / Upload** tabs and a **Download QR** button (a 1024 px PNG, ready to print on table cards).
- The QR codes and buttons use the same link builder (`src/utils/links.ts`), so they always point to the same place.
- Set `VITE_SITE_URL` before printing. Without it, the QR code encodes whatever address the page is open on (e.g. `localhost` during development).
- Routes use `#/…` hash URLs, so they work on any static host with no rewrite rules.

---

## 4. Deploying

The build output in `dist/` is a static site and works on Netlify, Vercel, Cloudflare Pages, GitHub Pages or any web server.

- **Netlify / Vercel / Cloudflare Pages:** build command `npm run build`, output folder `dist`. Add the `VITE_…` variables in the host's environment settings.
- Asset paths are relative (`base: './'`), so the site also works from a sub-folder.

---

## 5. Logos & illustrations

**Payment logos**: `src/components/gifts/PaymentLogo.tsx`
- Wise, Revolut and Airtel use the official brand marks from the [`simple-icons`](https://simpleicons.org) package (CC0 data; the trademarks belong to their owners and are shown only to identify each payment method).
- **M-Pesa** isn't in that package. Download the official M-PESA logo from Safaricom's brand resources and save it as `public/logos/mpesa.svg` (or `.png`, and update `logo.src` in the config). Until then, a green "M-PESA" text badge is shown.
- Bank transfer uses a neutral bank icon.

**Love story illustrations**: `src/components/story/`
- `Characters.tsx` holds the couple as reusable SVG characters: one head design each, plus a shared palette and outfits. Every scene uses the same parts, so the couple looks identical throughout. Edit skin, hair or outfit colours once in `PALETTE` and every scene updates.
- `Scenes.tsx` has the three scenes: meeting in a bookshop café, walking under jacarandas, and the sunset proposal.
- **To use raster artwork instead** (e.g. anime renders exported from Canva or drawn by an artist), save the images at 4:3 as `public/images/story/meeting.jpg` etc., and add `image: 'images/story/meeting.jpg'` to that chapter in the config. The SVG is replaced automatically.

---

## Project structure

```
src/
├─ config/
│  ├─ wedding.config.ts   ← all personal details (edit me)
│  ├─ types.ts            ← typed shape of the config
│  └─ env.ts              ← reads VITE_* variables, demo-mode switch
├─ services/              ← the only code that talks to storage
│  ├─ supabaseClient.ts   ← single shared client (null in demo mode)
│  ├─ galleryService.ts   ← list / upload / live-subscribe photos (Supabase or IndexedDB)
│  ├─ rsvpService.ts      ← submit RSVPs
│  └─ localDb.ts          ← IndexedDB helper for demo mode
├─ hooks/                 ← useCountdown, useGallery, useAmbientMusic
├─ utils/                 ← links (maps, WhatsApp, QR targets), image compression,
│                            calendar (.ics / Google), dates, clipboard, logger
├─ components/
│  ├─ envelope/           ← Envelope (lace flaps, opening sequence), WaxSeal
│  ├─ sections/           ← one file per page section
│  ├─ story/              ← couple characters + scenes
│  ├─ gifts/              ← PaymentLogo, GiftCard
│  ├─ gallery/            ← PhotoGrid, Lightbox, UploadForm, GalleryQR
│  ├─ decor/              ← florals, lace edges, petals, sparkles
│  └─ common/             ← icons, Reveal, SectionHeading, nav, music, carriage…
├─ pages/                 ← InvitationPage, GalleryPage, UploadPage
├─ styles/                ← Tailwind layers + self-hosted fonts
└─ App.tsx                ← routes (/, /gallery, /gallery/upload)
supabase/setup.sql        ← one-time backend setup
```

## Debugging tips

- Every service logs with a prefix. Filter the browser console by `[wedding:` (`[wedding:gallery]`, `[wedding:rsvp]`, `[wedding:audio]`).
- Upload errors show per photo ("Failed — retry"). The console has the Supabase error, which usually means the policies in `setup.sql` weren't run or the bucket name differs from `VITE_SUPABASE_BUCKET`.
- Want to see the envelope again? It shows once per browser tab session. Open a new tab, or run `sessionStorage.clear()` in the console.
- Accessibility: the site follows the OS "reduce motion" setting (petals, carriage and flap animations are switched off), and all controls are real buttons and links with labels.
