import { storesData } from '../data';
import { BLOG_POSTS } from '../views/laundry/Blog';
import { FRANCHISE_CITIES } from '../data/franchiseCities';

const generateStoreSlug = (name) => {
  const cleanLoc = name
    .replace(/^Cleanz24\s*-\s*/i, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  return `best-laundry-drycleaning-services-${cleanLoc}`;
};

export default async function sitemap() {
  const baseUrl = 'https://www.cleanz24.com';

  const staticRoutes = [
    '',
    '/best-laundry-drycleaning',
    '/best-laundry-drycleaning/services',
    '/best-laundry-drycleaning/stores',
    '/best-laundry-drycleaning/franchise-opportunities-in-india',
    '/best-laundry-drycleaning/blog',
    '/best-laundry-drycleaning/locations',
    '/best-laundry-drycleaning/contact-us',
    '/best-laundry-drycleaning/privacy-policy',
    '/best-laundry-drycleaning/terms-of-service',
    '/car-spa',
    '/car-spa/services',
    '/car-spa/stores',
    '/car-spa/franchise',
    '/car-spa/membership',
    '/car-spa/book',
    '/car-spa/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: route === '' || route === '/best-laundry-drycleaning' || route === '/best-laundry-drycleaning/franchise-opportunities-in-india' ? 1.0 : 0.8,
  }));

  const blogRoutes = (Array.isArray(BLOG_POSTS) ? BLOG_POSTS : []).map((post) => ({
    url: `${baseUrl}/best-laundry-drycleaning/blog/${post.slug}`,
    lastModified: post.dateTime || new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const storeRoutes = (Array.isArray(storesData) ? storesData : []).map((store) => {
    const slug = generateStoreSlug(store.name);
    return {
      url: `${baseUrl}/best-laundry-drycleaning/store/${slug}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  const cityRoutes = (Array.isArray(FRANCHISE_CITIES) ? FRANCHISE_CITIES : []).map((city) => ({
    url: `${baseUrl}/best-laundry-drycleaning/franchise-opportunities/${city.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const cityServiceRoutes = [];
  const servicesList = ['wash-and-fold', 'dry-cleaning', 'steam-ironing', 'shoe-cleaning', 'bag-cleaning', 'sofa-and-carpet'];
  
  if (Array.isArray(FRANCHISE_CITIES)) {
    for (const city of FRANCHISE_CITIES) {
      for (const s of servicesList) {
        cityServiceRoutes.push({
          url: `${baseUrl}/best-laundry-drycleaning/franchise-opportunities/${city.slug}/${s}`,
          lastModified: new Date().toISOString().split('T')[0],
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    }
  }

  const storeServiceRoutes = [];
  const storeServicesList = ['wash-and-fold', 'dry-cleaning', 'shoe-cleaning', 'leather-cleaning', 'curtain-cleaning', 'carpet-cleaning'];
  if (Array.isArray(storesData)) {
    for (const store of storesData) {
      const slug = generateStoreSlug(store.name);
      for (const s of storeServicesList) {
        storeServiceRoutes.push({
          url: `${baseUrl}/best-laundry-drycleaning/store/${slug}/${s}`,
          lastModified: new Date().toISOString().split('T')[0],
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    }
  }

  return [...staticRoutes, ...blogRoutes, ...storeRoutes, ...cityRoutes, ...cityServiceRoutes, ...storeServiceRoutes];
}
