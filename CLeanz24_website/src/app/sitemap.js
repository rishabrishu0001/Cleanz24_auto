import { storesData } from '../data';
import { BLOG_POSTS } from '../views/laundry/Blog';
import { FRANCHISE_CITIES } from '../data/franchiseCities';

export default async function sitemap() {
  const baseUrl = 'https://cleanz24.com';

  const staticRoutes = [
    '',
    '/laundry',
    '/laundry/services',
    '/laundry/stores',
    '/laundry/franchise',
    '/laundry/blog',
    '/laundry/locations',
    '/laundry/contact-us',
    '/laundry/privacy-policy',
    '/laundry/terms-of-service',
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
    priority: route === '' || route === '/laundry' ? 1.0 : 0.8,
  }));

  const blogRoutes = (Array.isArray(BLOG_POSTS) ? BLOG_POSTS : []).map((post) => ({
    url: `${baseUrl}/laundry/blog/${post.slug}`,
    lastModified: post.dateTime || new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const storeRoutes = (Array.isArray(storesData) ? storesData : []).map((store) => {
    const slug = store.slug || store.storeSlug || (store.name && store.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
    return {
      url: `${baseUrl}/laundry/store/${slug}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  const cityRoutes = (Array.isArray(FRANCHISE_CITIES) ? FRANCHISE_CITIES : []).map((city) => ({
    url: `${baseUrl}/laundry/franchise/${city.slug}`,
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
          url: `${baseUrl}/laundry/franchise/${city.slug}/${s}`,
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
      const slug = store.slug || store.storeSlug || (store.name && store.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
      for (const s of storeServicesList) {
        storeServiceRoutes.push({
          url: `${baseUrl}/laundry/store/${slug}/${s}`,
          lastModified: new Date().toISOString().split('T')[0],
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    }
  }

  return [...staticRoutes, ...blogRoutes, ...storeRoutes, ...cityRoutes, ...cityServiceRoutes, ...storeServiceRoutes];
}
