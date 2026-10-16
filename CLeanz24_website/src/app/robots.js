export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/car-spa/admin', '/api/', '*/feed*'],
    },
    sitemap: 'https://www.cleanz24.com/sitemap.xml',
  };
}
