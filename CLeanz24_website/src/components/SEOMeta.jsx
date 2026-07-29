import { useEffect } from 'react';

/**
 * SEOMeta - Reusable component for page-specific SEO tags
 * Uses direct DOM manipulation for React 19 compatibility.
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
 * @param {Object|Array} [props.schema] - Optional JSON-LD schema markup
 */
export default function SEOMeta({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = '/og-image.jpg',
  ogUrl,
  ogType = 'website',
  schema
}) {
  const displayTitle = title ? `${title} | Cleanz24` : 'Cleanz24 — Premium Laundry & Car Spa';
  const rawUrl = canonical || (typeof window !== 'undefined' ? window.location.href : 'https://cleanz24.com/');
  const currentUrl = rawUrl.replace('://www.cleanz24.com', '://cleanz24.com');

  useEffect(() => {
    // Update page title
    document.title = displayTitle;

    // Helper: set or create a <meta> tag
    const setMeta = (selector, attr, value) => {
      if (!value) return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const match = selector.match(/\[(.+?)="(.+?)"\]/);
        if (match) el.setAttribute(match[1], match[2]);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // Helper: set or create a <link> tag
    const setLink = (rel, href) => {
      if (!href) return;
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Standard meta
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[name="keywords"]', 'content', keywords);

    // Canonical
    setLink('canonical', currentUrl);

    // Open Graph
    setMeta('meta[property="og:title"]', 'content', ogTitle || displayTitle);
    setMeta('meta[property="og:description"]', 'content', ogDescription || description);
    setMeta('meta[property="og:type"]', 'content', ogType);
    setMeta('meta[property="og:url"]', 'content', ogUrl || currentUrl);
    setMeta('meta[property="og:site_name"]', 'content', 'Cleanz24');
    if (ogImage) {
      const absImage = ogImage.startsWith('http')
        ? ogImage
        : `${typeof window !== 'undefined' ? window.location.origin : ''}${ogImage}`;
      setMeta('meta[property="og:image"]', 'content', absImage);
    }

    // Twitter Card
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', ogTitle || displayTitle);
    setMeta('meta[name="twitter:description"]', 'content', ogDescription || description);
    if (ogImage) {
      const absImage = ogImage.startsWith('http')
        ? ogImage
        : `${typeof window !== 'undefined' ? window.location.origin : ''}${ogImage}`;
      setMeta('meta[name="twitter:image"]', 'content', absImage);
    }

    // JSON-LD Schema
    if (schema) {
      let schemaEl = document.getElementById('__seometa_schema__');
      if (!schemaEl) {
        schemaEl = document.createElement('script');
        schemaEl.id = '__seometa_schema__';
        schemaEl.type = 'application/ld+json';
        document.head.appendChild(schemaEl);
      }
      schemaEl.textContent = JSON.stringify(schema);
    }
  }, [displayTitle, description, keywords, currentUrl, ogTitle, ogDescription, ogImage, ogUrl, ogType, schema]);

  return null;
}
