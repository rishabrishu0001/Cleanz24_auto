import React from 'react';
import BestFranchisePillarArticle from '../../../../components/franchise/BestFranchisePillarArticle';
import { FRANCHISE_PILLAR_METADATA } from '../../../../data/franchisePillarArticle';

export const metadata = {
  title: FRANCHISE_PILLAR_METADATA.seoTitle,
  description: FRANCHISE_PILLAR_METADATA.metaDescription,
  alternates: {
    canonical: FRANCHISE_PILLAR_METADATA.canonicalUrl,
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    type: 'article',
    title: FRANCHISE_PILLAR_METADATA.seoTitle,
    description: FRANCHISE_PILLAR_METADATA.metaDescription,
    url: FRANCHISE_PILLAR_METADATA.canonicalUrl,
    siteName: 'Cleanz24',
    locale: 'en_IN',
    publishedTime: FRANCHISE_PILLAR_METADATA.publishedDate,
    modifiedTime: FRANCHISE_PILLAR_METADATA.modifiedDate,
    authors: [FRANCHISE_PILLAR_METADATA.author.name],
    images: [
      {
        url: 'https://www.cleanz24.com/logo_laundry.jpg',
        width: 1200,
        height: 630,
        alt: FRANCHISE_PILLAR_METADATA.h1,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: FRANCHISE_PILLAR_METADATA.seoTitle,
    description: FRANCHISE_PILLAR_METADATA.metaDescription,
    images: ['https://www.cleanz24.com/logo_laundry.jpg'],
  },
};

export default function BestFranchisePillarPage() {
  return <BestFranchisePillarArticle />;
}
