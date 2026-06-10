import { assetUrl } from '../assetUrl';
import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  SITE_SERVICES,
  SITE_URL,
} from '../seo';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  email: SITE_EMAIL,
  image: new URL(assetUrl('logo.png'), SITE_URL).href,
  areaServed: {
    '@type': 'State',
    name: 'New Jersey',
    containedInPlace: {
      '@type': 'Country',
      name: 'United States',
    },
  },
  serviceType: SITE_SERVICES,
  knowsAbout: [
    'Drone inspection',
    'Aerial photography',
    'Thermal imaging',
    'Construction site monitoring',
    'Infrastructure inspection',
  ],
  slogan: 'Precision Aerial Inspections',
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
