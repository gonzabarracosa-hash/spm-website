import './globals.css';
import { LanguageProvider } from '../components/LanguageProvider';
import { INSTAGRAM_URL, LINKEDIN_URL, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_TITLE, SITE_URL } from '../lib/site';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | ' + SITE_NAME,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/assets/brand/spm-icon-256.png',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_NAME,
  url: SITE_URL,
  logo: SITE_URL + '/assets/brand/spm-wordmark-color.png',
  image: SITE_URL + '/assets/brand/spm-wordmark-color.png',
  description: SITE_DESCRIPTION,
  areaServed: ['Belgium', 'Germany', 'Netherlands', 'Switzerland', 'European Union'],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BE',
  },
  sameAs: [LINKEDIN_URL, INSTAGRAM_URL],
  knowsAbout: [
    'CAD automation',
    'Autodesk Inventor iLogic',
    'AutoCAD',
    'SolidWorks',
    'Solid Edge',
    'ASME',
    'EN 13480',
    'PED',
    'AI for engineering design',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
