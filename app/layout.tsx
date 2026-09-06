import type { Metadata, Viewport } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

/* Fraunces carries the display voice. SOFT and WONK are what give it the
   organic, slightly hand-cut feel the headings rely on, so both axes have to
   be requested explicitly - next/font only ships `wght` by default. */
const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['SOFT', 'WONK', 'opsz'],
  weight: 'variable',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--f-fraunces',
});

/* Plus Jakarta Sans - the typeface drawn for the city this shop is in. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--f-jakarta',
});

const SITE = 'https://nuattime.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'Nuat Time — Thai Reflexology in Pantai Indah Kapuk',
  description:
    'Thai reflexology, oil massage and traditional Thai massage in Golf Island, Pantai Indah Kapuk. Open every day, 09:00 to 21:00.',
  icons: { icon: '/assets/NuatTime.png' },
  openGraph: {
    title: 'Nuat Time — Thai Reflexology in Pantai Indah Kapuk',
    description:
      'Thai reflexology, oil massage and traditional Thai massage in Golf Island, PIK. Open every day, 09:00 to 21:00.',
    images: ['/assets/NuatTime.png'],
    type: 'website',
    locale: 'en_ID',
  },
};

export const viewport: Viewport = {
  themeColor: '#F3EFEC',
  width: 'device-width',
  initialScale: 1,
};

/* Runs before first paint. Browsers restore the previous scroll position on
   refresh, which drops you past the entrance with the doors already open.
   We take that over and place the page ourselves in <Motion />.

   Nothing here may touch the DOM: this runs before React hydrates, so any
   attribute it changes would no longer match the server-rendered HTML. */
const SCROLL_SETUP = `if('scrollRestoration' in history)history.scrollRestoration='manual';`;

/* Section headings start masked and are revealed by <Motion />. Without
   JavaScript nothing would ever reveal them, so they are shown outright. */
const NO_JS_REVEAL = `.reveal{overflow:visible;padding-bottom:0;margin-bottom:0}.reveal>span{transform:none}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCROLL_SETUP }} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: NO_JS_REVEAL }} />
        </noscript>
      </head>
      <body>
        {children}
        {/* Its script is served by Vercel's edge, so locally it would only
            404 in the console. Rendered on the deployed site alone. */}
        {process.env.NODE_ENV === 'production' && process.env.VERCEL ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
