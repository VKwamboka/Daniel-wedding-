import type { WeddingConfig } from './types';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  WEDDING CONFIGURATION — the only file you need to edit for personal details.
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything marked  ⟨PLACEHOLDER⟩  is invented sample data. Replace it with
 *  the couple's real details before sharing the site.
 */
export const wedding: WeddingConfig = {
  initials: { groom: 'H', bride: 'D' },

  groom: {
    firstName: 'Henry', // ⟨PLACEHOLDER⟩
    lastName: 'Otieno', // ⟨PLACEHOLDER⟩
    role: 'The Groom',
    email: 'groom@example.com', // ⟨PLACEHOLDER⟩
    phone: '+254 700 000 001', // ⟨PLACEHOLDER⟩
    whatsappMessage: "Hi Henry! I'm writing about your wedding 💜",
  },

  bride: {
    firstName: 'Diana', // ⟨PLACEHOLDER⟩
    lastName: 'Wanjiru', // ⟨PLACEHOLDER⟩
    role: 'The Bride',
    email: 'bride@example.com', // ⟨PLACEHOLDER⟩
    phone: '+254 700 000 002', // ⟨PLACEHOLDER⟩
    whatsappMessage: "Hi Diana! I'm writing about your wedding 💜",
  },

  // ⟨PLACEHOLDER⟩ date — keep the +03:00 (Nairobi) offset so the countdown is right everywhere.
  dateISO: '2027-08-14T14:00:00+03:00',
  dateDisplay: 'Saturday, 14 August 2027',
  city: 'Nairobi, Kenya',

  welcome: {
    eyebrow: 'Together with their families',
    message:
      'With joyful hearts, we invite you to share in the beginning of our forever. Your love has shaped our story — we would be honoured to have you beside us as we say “I do”.',
  },

  ceremony: {
    name: 'Lavender Grove Chapel', // ⟨PLACEHOLDER⟩
    address: 'Karen Road, Karen, Nairobi', // ⟨PLACEHOLDER⟩
    time: '2:00 PM',
  },

  reception: {
    name: 'The Lilac Gardens', // ⟨PLACEHOLDER⟩
    address: 'Langata Road, Karen, Nairobi', // ⟨PLACEHOLDER⟩
    time: '5:30 PM',
  },

  timeline: [
    { time: '1:30 PM', title: 'Guests arrive', description: 'Find your seat and settle in', icon: 'car' },
    { time: '2:00 PM', title: 'Ceremony', description: 'We say “I do”', icon: 'rings' },
    { time: '3:30 PM', title: 'Photos & garden drinks', description: 'Mingle among the flowers', icon: 'camera' },
    { time: '5:30 PM', title: 'Reception', description: 'Toasts and a warm welcome', icon: 'glass' },
    { time: '6:30 PM', title: 'Dinner', description: 'A feast to share', icon: 'dinner' },
    { time: '8:00 PM', title: 'Cake cutting', description: 'Something sweet', icon: 'cake' },
    { time: '8:30 PM', title: 'Dancing', description: 'Until the stars come out', icon: 'music' },
  ],

  story: {
    intro: 'Every love story is beautiful, but ours is our favourite.',
    // ⟨PLACEHOLDER⟩ story — rewrite with the couple's real memories.
    chapters: [
      {
        id: 'meeting',
        eyebrow: 'How we met · 2019',
        title: 'The same book, the same moment',
        text: [
          'It was a rainy Saturday in a little bookshop café in Westlands. Diana reached for the last copy of her favourite novel — and so did Henry.',
          'He offered it to her. She offered to share. One cup of chai turned into three, and by the time the rain stopped, neither of them wanted to leave.',
        ],
        scene: 'meeting',
        imageAlt: 'The couple meeting in a bookshop café, both reaching for the same book',
      },
      {
        id: 'journey',
        eyebrow: 'Our journey · 2019 – 2026',
        title: 'Walks under the jacarandas',
        text: [
          'Sunday walks under purple jacaranda trees became our ritual. We learned each other’s favourite songs, survived long-distance months, and cheered each other through new jobs and big dreams.',
          'Through every season, we kept choosing each other — and home became wherever we were together.',
        ],
        scene: 'journey',
        imageAlt: 'The couple walking hand in hand under blooming jacaranda trees',
      },
      {
        id: 'proposal',
        eyebrow: 'The proposal · December 2026',
        title: 'A hilltop, a sunset, a question',
        text: [
          'On a quiet hill above Lake Naivasha, under string lights and a sky turning lilac, Henry knelt with a small velvet box.',
          'Diana said yes before he could finish the question. Now we can’t wait to begin our next chapter — with you.',
        ],
        scene: 'proposal',
        imageAlt: 'Henry kneeling with a ring as Diana covers her mouth in joyful surprise at sunset',
      },
    ],
  },

  gifts: {
    intro: 'Your presence is the greatest gift of all.',
    note: 'If you would like to bless us as we begin our life together, a contribution towards our new home would be received with gratitude. Choose whichever option is easiest for you.',
    // ⟨PLACEHOLDER⟩ payment details — replace every value below.
    methods: [
      {
        id: 'mpesa',
        name: 'M-Pesa',
        // Drop the official M-PESA logo (from Safaricom's brand resources) at /public/logos/mpesa.svg
        logo: { kind: 'image', src: 'logos/mpesa.svg', wordmark: 'M-PESA', color: '#4CAF50' },
        tagline: 'Kenya · mobile money',
        details: [
          { label: 'Send Money to', value: '+254 700 000 002', copyable: true },
          { label: 'Name', value: 'Diana Wanjiru' },
          { label: 'Paybill (optional)', value: '000000 · Acc: WEDDING', copyable: true },
        ],
      },
      {
        id: 'airtel',
        name: 'Airtel Money',
        logo: { kind: 'simple-icon', slug: 'airtel' },
        tagline: 'Kenya · mobile money',
        details: [
          { label: 'Send Money to', value: '+254 730 000 001', copyable: true },
          { label: 'Name', value: 'Henry Otieno' },
        ],
      },
      {
        id: 'wise',
        name: 'Wise',
        logo: { kind: 'simple-icon', slug: 'wise' },
        tagline: 'International transfers',
        details: [
          { label: 'Wise email', value: 'bride@example.com', copyable: true },
          { label: 'Wisetag', value: '@dianaw000', copyable: true },
        ],
        link: { label: 'Pay with Wise', url: 'https://wise.com/pay/me/dianaw000' },
      },
      {
        id: 'revolut',
        name: 'Revolut',
        logo: { kind: 'simple-icon', slug: 'revolut' },
        tagline: 'Instant in-app transfers',
        details: [{ label: 'Revtag', value: '@henryo000', copyable: true }],
        link: { label: 'Pay with Revolut', url: 'https://revolut.me/henryo000' },
      },
      {
        id: 'bank',
        name: 'Bank Transfer',
        logo: { kind: 'bank' },
        tagline: 'Local & international',
        details: [
          { label: 'Bank', value: 'Example Bank Kenya' },
          { label: 'Account name', value: 'Henry Otieno & Diana Wanjiru' },
          { label: 'Account no.', value: '0000 0000 0000', copyable: true },
          { label: 'Branch', value: 'Karen' },
          { label: 'SWIFT / BIC', value: 'XXXXKENA', copyable: true },
        ],
      },
    ],
  },

  rsvp: { deadlineDisplay: '1 July 2027', maxGuestsPerInvite: 4 },

  gallery: { hashtag: '#HenryAndDiana2027', maxUploadMB: 25, maxFilesPerUpload: 20 },

  music: { src: '', title: 'Soft music box melody' },

  closing: {
    message:
      'Thank you for being part of our story. We can’t wait to celebrate, laugh, and dance with you.',
    signature: 'With all our love',
  },
};

/** Convenience helpers derived from the config. */
export const coupleNames = `${wedding.groom.firstName} & ${wedding.bride.firstName}`;
