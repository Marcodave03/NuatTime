/* ==========================================================================
   Nuat Time - site content

   Everything a shop owner would realistically need to change lives here:
   prices, hours, the phone number, the treatment blurbs. Edit this file and
   the whole site follows. No component needs touching.
   ========================================================================== */

export const shop = {
  name: 'Nuat Time',
  tagline: 'Thai reflexology in Pantai Indah Kapuk',
  openedOn: '11 December 2023',
  hours: { open: '09:00', close: '21:00', lastBooking: '20:00' },

  phoneDisplay: '0851-8688-8510',
  whatsapp: 'https://wa.me/6285186888510',
  phoneHref: 'tel:+6285186888510',
  maps: 'https://maps.app.goo.gl/HDFvqCjEjEKQF6EN8',

  address: {
    line1: 'Ruko Golf Island Blok E No. 109–111',
    line2: 'Jl. Pantai Indah Kapuk',
    line3: 'Jakarta Utara 14460',
  },

  social: [
    { name: 'Instagram', href: 'https://www.instagram.com/nuattime/', icon: '/assets/logo/ig.png' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@nuattime', icon: '/assets/logo/tt.png' },
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61552768587786', icon: '/assets/logo/fb.png' },
  ],
} as const;

export const nav = [
  { label: 'About', href: '#welcome' },
  { label: 'Treatments', href: '#treatments' },
  { label: 'Rates', href: '#rates' },
  { label: 'Visit', href: '#visit' },
] as const;

export const tenets = [
  {
    name: 'Royal Orchid',
    note: 'The Thai lineage our therapists are trained in, kept close to how it is taught at home.',
    mark: '/assets/logo (3).svg',
  },
  {
    name: 'Mindfulness',
    note: 'A quiet room, no rush between sessions, and full attention on the person on the bed.',
    mark: '/assets/logo (2).svg',
  },
  {
    name: 'Touch',
    note: 'Pressure read from the body itself, adjusted as we go, never applied to a formula.',
    mark: '/assets/logo (1).svg',
  },
] as const;

export type Treatment = {
  name: string;
  body: string;
  aside?: string;
  figure?: string;
};

export const treatments: Treatment[] = [
  {
    name: 'Full Body Reflexology',
    body: 'Pressure applied along the body to release tension and improve circulation.',
    aside: 'Feet are worked with cream; everywhere else, dry.',
    figure: '/assets/service1.svg',
  },
  {
    name: 'Oil Massage',
    body: 'Warm oil worked into the body to ease tension and draw you down into deep relaxation.',
    figure: '/assets/service2.svg',
  },
  {
    name: 'Thai Massage',
    body: 'Dry massage in the Thai technique — stretching and pressing to loosen stiff muscle and give movement back.',
    figure: '/assets/service3.svg',
  },
  {
    name: 'Kop & Kerik',
    body: 'Traditional cupping and coin therapy, taken on their own or added to any treatment above.',
  },
];

/* Prices in rupiah. Written as plain numbers and formatted at render time so
   the thousands separator can never drift between one row and the next. */
export type Tier = { minutes: number; price: number };

export type Rate = {
  name: string;
  desc: string;
  tiers: Tier[];
};

export const rates: Rate[] = [
  {
    name: 'Full Body Reflexology',
    desc: 'Pressure along the body to release tension and improve circulation.',
    tiers: [
      { minutes: 60, price: 140_000 },
      { minutes: 90, price: 200_000 },
      { minutes: 120, price: 250_000 },
    ],
  },
  {
    name: 'Oil Massage',
    desc: 'Warm oil worked into the body to ease tension and draw you into deep relaxation.',
    tiers: [
      { minutes: 60, price: 200_000 },
      { minutes: 90, price: 250_000 },
      { minutes: 120, price: 300_000 },
    ],
  },
  {
    name: 'Thai Massage',
    desc: 'Stretching and pressing in the Thai technique to loosen stiff muscle.',
    tiers: [
      { minutes: 60, price: 200_000 },
      { minutes: 90, price: 250_000 },
      { minutes: 120, price: 300_000 },
    ],
  },
];

export const rateExtra = {
  name: 'Kop & Kerik',
  desc: 'Traditional cupping and coin therapy. Taken on its own, or added to any treatment above.',
  tier: { minutes: 30, price: 75_000 } as Tier,
};

/* Indonesian formatting: a full stop for thousands. Pinned to id-ID so the
   viewer's own locale cannot turn Rp 140.000 into Rp 140,000. */
const rupiah = new Intl.NumberFormat('id-ID');
export const formatPrice = (value: number) => rupiah.format(value);

export const room = [
  { title: 'Comfortable', note: 'Beds set far enough apart that the room stays yours.', img: '/assets/IMG (1).png' },
  { title: 'Quiet', note: 'Low light, low sound, and no queue moving through.', img: '/assets/IMG (2).png' },
  { title: 'Modern', note: 'Built new in 2023, and kept that way.', img: '/assets/IMG (3).png' },
  { title: 'Secure', note: 'A locker for your things while you are on the bed.', img: '/assets/IMG (4).png' },
] as const;

/* The review captions are screenshots, so they are listed rather than typed. */
export const reviewsRowA = Array.from({ length: 10 }, (_, i) => `/assets/Review/review (${i + 1}).svg`);
export const reviewsRowB = Array.from({ length: 9 }, (_, i) => `/assets/Review/review (${i + 11}).svg`);
