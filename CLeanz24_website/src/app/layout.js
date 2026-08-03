import React, { Suspense } from 'react';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';
import { Rajdhani, DM_Sans, Poppins, Oswald, Inter, Rethink_Sans } from 'next/font/google';
import ClientRouterBridge from '../components/ClientRouterBridge';
import '../index.css';
import '../App.css';
import '../styles/store-cards.css';
import '../styles/store-search.css';

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const rethinkSans = Rethink_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rethink-sans',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://cleanz24.com'),
  title: {
    default: 'Cleanz24 — Premium Laundry & Dry Clean Studio & Car Spa Studio',
    template: '%s | Cleanz24',
  },
  description: "Cleanz24 is India's leading Premium Laundry & Dry Clean Studio network with 100+ locations across 17+ states. We offer professional garment dry cleaning, steam press, shoe spa, and master car detailing services.",
  keywords: [
    'laundry franchise India',
    'dry cleaning studio',
    'shoe cleaning',
    'steam ironing',
    'premium laundry',
    'Cleanz24',
    'car spa studio',
    'ceramic coating',
    'PPF',
    'laundry near me',
  ],
  authors: [{ name: 'Cleanz24' }],
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico?v=2',
    shortcut: '/favicon.ico?v=2',
    apple: '/favicon.png?v=2',
  },
  openGraph: {
    type: 'website',
    title: 'Cleanz24 — Premium Laundry & Dry Clean Studio & Car Spa Studio',
    description: "Cleanz24 is India's leading Premium Laundry & Dry Clean Studio and Car Spa Studio network. In Laundry industry we have 100+ Franchise operational across multiple cities and States across India. We also offer premium Car Spa services including foam wash, ceramic coating, PPF and car detailing.",
    siteName: 'Cleanz24',
    locale: 'en_IN',
    images: [
      {
        url: 'https://cleanz24.com/logo_laundry.jpg',
        width: 1200,
        height: 630,
        alt: 'Cleanz24 — Premium Laundry & Dry Clean Studio & Car Spa Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cleanz24 — Premium Laundry & Dry Clean Studio & Car Spa Studio',
    description: "Cleanz24 is India's leading Premium Laundry & Dry Clean Studio and Car Spa Studio network.",
    images: ['https://cleanz24.com/logo_laundry.jpg'],
  },
  verification: {
    google: 'AIg5ewR8Y48basP_naVzIgwxZ8p9-HTEW23ePDnbjP4',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Cleanz24',
  description: "Cleanz24 is India's leading Premium Laundry & Dry Clean Studio and Car Spa Studio network. In Laundry industry we have 100+ Franchise operational across multiple cities and States across India.",
  url: 'https://cleanz24.com',
  telephone: '+919138004800',
  email: 'happy2helpu@cleanz24.com',
  numberOfEmployees: '500+',
  areaServed: 'India',
  foundingLocation: 'India',
  sameAs: [
    'https://www.instagram.com/cleanz24india/',
    'https://www.facebook.com/share/1D2QDyaHBG/?mibextid=wwXIfr',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${dmSans.variable} ${poppins.variable} ${oswald.variable} ${inter.variable} ${rethinkSans.variable}`}>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextTopLoader
          color="#0066FF"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #0066FF,0 0 5px #0066FF"
        />
        <Suspense fallback={null}>
          <ClientRouterBridge>
            {children}
          </ClientRouterBridge>
        </Suspense>

        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17624629793"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'AW-17624629793');
            gtag('config', 'AW-803039882');
          `}
        </Script>

        {/* Bootstrap Bundle JS */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
        {/* Lottie Player Web Component */}
        <Script
          src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
