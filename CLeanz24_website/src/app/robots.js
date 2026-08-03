export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/car-spa/admin', '/api/'],
    },
    sitemap: 'https://cleanz24.com/sitemap.xml',
  };
}
