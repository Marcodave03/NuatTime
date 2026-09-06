import Nav from '@/components/Nav';
import Motion from '@/components/Motion';
import Gate from '@/components/Gate';
import { Welcome, Tenets } from '@/components/Welcome';
import Treatments from '@/components/Treatments';
import Rates from '@/components/Rates';
import { Offer, Room } from '@/components/Offer';
import { Visit, Reviews } from '@/components/Visit';
import Footer from '@/components/Footer';
import { shop } from '@/lib/content';

/* Google understands this shape directly, so the shop can surface its hours,
   address and phone number in search and Maps without anyone retyping them. */
function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: shop.name,
    description: 'Thai reflexology, oil massage and traditional Thai massage in Pantai Indah Kapuk.',
    telephone: '+6285186888510',
    url: 'https://nuattime.vercel.app',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ruko Golf Island Blok E No. 109-111, Jl. Pantai Indah Kapuk',
      addressLocality: 'Jakarta Utara',
      addressRegion: 'DKI Jakarta',
      postalCode: '14460',
      addressCountry: 'ID',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: shop.hours.open,
      closes: shop.hours.close,
    },
    sameAs: shop.social.map((s) => s.href),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function Page() {
  return (
    <>
      <LocalBusinessSchema />
      <a className="skip-link" href="#welcome">
        Skip to content
      </a>

      <Nav />

      <main>
        <Gate />
        <Welcome />
        <Tenets />
        <Treatments />
        <Rates />
        <Offer />
        <Room />
        <Visit />
        <Reviews />
      </main>

      <Footer />
      <Motion />
    </>
  );
}
