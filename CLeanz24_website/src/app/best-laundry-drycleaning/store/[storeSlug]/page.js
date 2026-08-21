import React, { Suspense } from 'react';
import StoreDetail from '../../../../views/laundry/StoreDetail';
import { storesData } from '../../../../data';

const generateStoreSlug = (name) => {
  const cleanLoc = name
    .replace(/^Cleanz24\s*-\s*/i, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  return `best-laundry-drycleaning-services-${cleanLoc}`;
};

const getShortSlug = (name) =>
  name
    .replace(/^Cleanz24\s*-\s*/i, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const findStoreBySlug = (slug) => {
  if (!slug) return null;
  return storesData.find((s) => {
    if (!s || !s.name) return false;
    const fullSlug = generateStoreSlug(s.name);
    const shortSlug = getShortSlug(s.name);
    const citySlug = s.city ? s.city.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-') : '';
    const cityFullSlug = citySlug ? `best-laundry-drycleaning-services-${citySlug}` : '';
    return slug === fullSlug || slug === shortSlug || slug === citySlug || slug === cityFullSlug;
  });
};

export async function generateStaticParams() {
  const list = Array.isArray(storesData) ? storesData : [];
  const paramsList = [];
  for (const s of list) {
    if (s && s.name) {
      paramsList.push({ storeSlug: generateStoreSlug(s.name) });
      paramsList.push({ storeSlug: getShortSlug(s.name) });
      if (s.city) {
        const citySlug = s.city.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
        paramsList.push({ storeSlug: `best-laundry-drycleaning-services-${citySlug}` });
        paramsList.push({ storeSlug: citySlug });
      }
    }
  }
  return paramsList;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const storeSlug = resolvedParams?.storeSlug || '';
  const store = findStoreBySlug(storeSlug);

  if (!store) {
    return {
      title: 'Store Details | Cleanz24 Laundry Studio',
      description: 'Locate Cleanz24 Laundry & Dry Cleaning studio address, timing, and contact details.',
      robots: 'index, follow',
    };
  }

  const title = `${store.name} — Best Dry Cleaning & Laundry in ${store.city || 'India'} | Cleanz24`;
  const description = `Visit ${store.name} at ${store.address || store.city}. Contact: ${store.phone || '+91-9138004800'}. Premium eco-friendly dry cleaning, steam press, and free doorstep pickup in ${store.city}.`;
  const keywords = [
    store.name,
    `laundry in ${store.city}`,
    `dry cleaning in ${store.city}`,
    `Cleanz24 ${store.city}`,
    `laundry pickup ${store.city}`,
  ];
  const url = `https://www.cleanz24.com/best-laundry-drycleaning/store/${storeSlug}`;

  return {
    title,
    description,
    keywords,
    robots: 'index, follow',
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Cleanz24',
      locale: 'en_IN',
      images: [
        {
          url: store.image || 'https://cleanz24.com/assets/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${store.name} Outlet`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [store.image || 'https://cleanz24.com/assets/og-image.jpg'],
    },
  };
}

export default async function StoreDetailPage({ params }) {
  const resolvedParams = await params;
  const storeSlug = resolvedParams?.storeSlug || '';
  const store = findStoreBySlug(storeSlug);

  const url = `https://cleanz24.com/best-laundry-drycleaning/store/${storeSlug}`;
  const storeName = store ? store.name : 'Cleanz24 Studio';
  const cityName = store ? (store.city || 'India') : 'India';

  const localBusinessSchema = store
    ? {
        '@context': 'https://schema.org',
        '@type': 'DryCleaningOrLaundry',
        name: store.name,
        description: `Official Cleanz24 Premium Laundry & Dry Cleaning outlet in ${store.city}. Address: ${store.address}.`,
        url: url,
        telephone: store.phone || '+919138004800',
        email: store.email || 'happy2helpu@cleanz24.com',
        priceRange: '₹₹',
        image: store.image || 'https://cleanz24.com/assets/og-image.jpg',
        address: {
          '@type': 'PostalAddress',
          streetAddress: store.address || '',
          addressLocality: store.city || '',
          addressRegion: store.state || '',
          addressCountry: 'IN',
        },
        geo: store.lat && store.lng ? {
          '@type': 'GeoCoordinates',
          latitude: store.lat,
          longitude: store.lng,
        } : undefined,
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: store.timings ? store.timings.split('-')[0] || '09:00' : '09:00',
            closes: store.timings ? store.timings.split('-')[1] || '21:00' : '21:00',
          },
        ],
      }
    : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cleanz24.com/best-laundry-drycleaning',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Stores',
        item: 'https://cleanz24.com/best-laundry-drycleaning/stores',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: storeName,
        item: url,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What are the operating hours for ${storeName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${storeName} is open 7 days a week from 9:00 AM to 9:00 PM for walk-ins and doorstep pickup services.`,
        },
      },
      {
        '@type': 'Question',
        name: `How can I contact ${storeName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `You can reach ${storeName} at ${store?.phone || '+91 9138004800'} or via WhatsApp for quick booking.`,
        },
      },
    ],
  };

  return (
    <>
      {localBusinessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
        <StoreDetail storeSlug={storeSlug} />
      </Suspense>
    </>
  );
}
