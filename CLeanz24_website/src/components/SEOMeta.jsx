import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEOMeta - Reusable component for page-specific SEO tags
 * 
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.keywords - Meta keywords
 * @param {string} props.canonical - Canonical URL
 * @param {string} [props.ogTitle] - Open Graph title (defaults to title)
 * @param {string} [props.ogDescription] - Open Graph description (defaults to description)
 * @param {string} [props.ogImage] - Open Graph image
 * @param {string} [props.ogUrl] - Open Graph URL (defaults to canonical)
 * @param {string} [props.ogType] - Open Graph type (defaults to 'website')
 * @param {Object} [props.schema] - Optional JSON-LD schema markup object
 */
export default function SEOMeta({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = '/og-image.jpg', // Default fallback image if none provided
  ogUrl,
  ogType = 'website',
  schema
}) {
  const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : '');
  const displayTitle = title ? `${title} | Cleanz24` : 'Cleanz24 — Premium Laundry & Car Spa';

  return (
    <Helmet>
      {/* Basic Title and Meta */}
      <title>{displayTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical Link */}
      {currentUrl && <link rel="canonical" href={currentUrl} />}

      {/* Open Graph Tags */}
      <meta property="og:title" content={ogTitle || displayTitle} />
      {description && <meta property="og:description" content={ogDescription || description} />}
      <meta property="og:type" content={ogType} />
      {currentUrl && <meta property="og:url" content={ogUrl || currentUrl} />}
      {ogImage && <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${typeof window !== 'undefined' ? window.location.origin : ''}${ogImage}`} />}
      <meta property="og:site_name" content="Cleanz24" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || displayTitle} />
      {description && <meta name="twitter:description" content={ogDescription || description} />}
      {ogImage && <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${typeof window !== 'undefined' ? window.location.origin : ''}${ogImage}`} />}

      {/* Dynamic JSON-LD Schema Markup */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
