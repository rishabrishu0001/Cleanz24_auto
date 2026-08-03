import React, { Suspense } from 'react';
import ServiceDetailPage, { SERVICE_DETAILS_DATA } from '../../../../views/laundry/ServiceDetailPage';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const serviceSlug = resolvedParams?.serviceSlug;
  const service = SERVICE_DETAILS_DATA ? SERVICE_DETAILS_DATA[serviceSlug] : null;

  if (!service) {
    return {
      title: 'Service Details | Cleanz24 Laundry',
      description: 'Professional laundry and dry cleaning services near you with free doorstep pickup & delivery.',
    };
  }

  const title = service.seoTitle || `${service.title} | Cleanz24 Laundry Service`;
  const description = service.seoDesc || service.subtitle || `${service.title} by Cleanz24. Eco-friendly cleaning with doorstep pickup.`;
  const url = `https://cleanz24.com/laundry/services/${serviceSlug}`;

  return {
    title,
    description,
    keywords: service.seoKeywords || ['laundry service', 'dry cleaning', 'Cleanz24'],
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
          url: 'https://cleanz24.com/logo_laundry.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://cleanz24.com/logo_laundry.jpg'],
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
      <ServiceDetailPage serviceSlug={resolvedParams?.serviceSlug} />
    </Suspense>
  );
}
