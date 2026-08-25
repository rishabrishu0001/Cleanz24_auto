/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['mongoose'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cleanz24.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/laundry', destination: '/best-laundry-drycleaning', permanent: true },
      { source: '/best-laundry-drycleaning/noida', destination: '/best-laundry-drycleaning/service-in-noida', permanent: true },
      { source: '/laundry/franchise', destination: '/best-laundry-drycleaning/franchise-opportunities-in-india', permanent: true },
      { source: '/laundry/franchise/:path*', destination: '/best-laundry-drycleaning/franchise-opportunities/:path*', permanent: true },
      { source: '/laundry/:path*', destination: '/best-laundry-drycleaning/:path*', permanent: true },
      { source: '/best-laundry-dryclean', destination: '/best-laundry-drycleaning', permanent: true },
      { source: '/best-laundry-dryclean/:path*', destination: '/best-laundry-drycleaning/:path*', permanent: true },
      { source: '/stores', destination: '/best-laundry-drycleaning/stores', permanent: true },
      { source: '/franchise', destination: '/best-laundry-drycleaning/franchise-opportunities-in-india', permanent: true },
      { source: '/franchise-opportunities', destination: '/best-laundry-drycleaning/franchise-opportunities-in-india', permanent: true },
      { source: '/franchise-opportunities-in-india', destination: '/best-laundry-drycleaning/franchise-opportunities-in-india', permanent: true },
      { source: '/best-laundry-franchise', destination: '/best-laundry-drycleaning/franchise-opportunities-in-india', permanent: true },
      { source: '/laundry-franchise', destination: '/best-laundry-drycleaning/franchise-opportunities-in-india', permanent: true },
      { source: '/best-laundry-drycleaning/franchise-opportunities', destination: '/best-laundry-drycleaning/franchise-opportunities-in-india', permanent: true },
      { source: '/car-spa-franchise', destination: '/car-spa/franchise', permanent: true },
      { source: '/shoe-cleaning', destination: '/best-laundry-drycleaning/services/shoe-handbag-spa', permanent: true },
      { source: '/shoe-spa', destination: '/best-laundry-drycleaning/services/shoe-handbag-spa', permanent: true },
      { source: '/sneaker-cleaning', destination: '/best-laundry-drycleaning/services/shoe-handbag-spa', permanent: true },
      { source: '/bag-cleaning', destination: '/best-laundry-drycleaning/services/shoe-handbag-spa', permanent: true },
      { source: '/leather-care', destination: '/best-laundry-drycleaning/services/shoe-handbag-spa', permanent: true },
      { source: '/leather-cleaning', destination: '/best-laundry-drycleaning/services/shoe-handbag-spa', permanent: true },
      { source: '/steam-ironing', destination: '/best-laundry-drycleaning/services/steam-ironing', permanent: true },
      { source: '/steam-press', destination: '/best-laundry-drycleaning/services/steam-ironing', permanent: true },
      { source: '/ironing', destination: '/best-laundry-drycleaning/services/steam-ironing', permanent: true },
      { source: '/wash-and-iron', destination: '/best-laundry-drycleaning/services/steam-ironing', permanent: true },
      { source: '/dry-cleaning', destination: '/best-laundry-drycleaning/services/eco-friendly-dry-cleaning', permanent: true },
      { source: '/drycleaning', destination: '/best-laundry-drycleaning/services/eco-friendly-dry-cleaning', permanent: true },
      { source: '/dry-cleaner', destination: '/best-laundry-drycleaning/services/eco-friendly-dry-cleaning', permanent: true },
      { source: '/suit-cleaning', destination: '/best-laundry-drycleaning/services/eco-friendly-dry-cleaning', permanent: true },
      { source: '/saree-cleaning', destination: '/best-laundry-drycleaning/services/eco-friendly-dry-cleaning', permanent: true },
      { source: '/carpet-cleaning', destination: '/best-laundry-drycleaning/services/home-furnishing-cleaning', permanent: true },
      { source: '/curtain-cleaning', destination: '/best-laundry-drycleaning/services/home-furnishing-cleaning', permanent: true },
      { source: '/sofa-cleaning', destination: '/best-laundry-drycleaning/services/home-furnishing-cleaning', permanent: true },
      { source: '/blanket-cleaning', destination: '/best-laundry-drycleaning/services/home-furnishing-cleaning', permanent: true },
      { source: '/wash-and-fold', destination: '/best-laundry-drycleaning/services/premium-laundry', permanent: true },
      { source: '/commercial-cleaning', destination: '/best-laundry-drycleaning/services/commercial-laundry', permanent: true },
      { source: '/contact-us', destination: '/best-laundry-drycleaning/contact-us', permanent: true },
      { source: '/contact', destination: '/best-laundry-drycleaning/contact-us', permanent: true },
      { source: '/services', destination: '/best-laundry-drycleaning/services', permanent: true },
      { source: '/laundry-services', destination: '/best-laundry-drycleaning/services', permanent: true },
      { source: '/best-laundry-and-dry-cleaning', destination: '/best-laundry-drycleaning/services', permanent: true },
      { source: '/carspa', destination: '/car-spa', permanent: true },
      { source: '/car-spa-services', destination: '/car-spa/services', permanent: true },
      { source: '/car-spa-book', destination: '/car-spa/book', permanent: true },
      { source: '/book', destination: '/car-spa/book', permanent: true },
      { source: '/blog', destination: '/best-laundry-drycleaning/blog', permanent: true },
      { source: '/about', destination: '/best-laundry-drycleaning/services', permanent: true },
      { source: '/about-us', destination: '/best-laundry-drycleaning/services', permanent: true },
      { source: '/privacy-policy', destination: '/best-laundry-drycleaning/privacy-policy', permanent: true },
      { source: '/terms-of-service', destination: '/best-laundry-drycleaning/terms-of-service', permanent: true },

      // ─── Store: Explicit short-slug → canonical-slug 301 redirects ───────────
      // Generated from storesData. Canonical = /store/best-laundry-drycleaning-services-[slug]
      // Short slug (name without prefix) ─── id:1 Sector 41 Noida
      { source: '/best-laundry-drycleaning/store/sector-41-noida', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-sector-41-noida', permanent: true },
      { source: '/best-laundry-drycleaning/store/noida', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-sector-41-noida', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-noida', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-sector-41-noida', permanent: true },
      // id:2 Sector 137 Noida
      { source: '/best-laundry-drycleaning/store/sector-137-noida', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-sector-137-noida', permanent: true },
      // id:4 Patwari Greater Noida West
      { source: '/best-laundry-drycleaning/store/patwari-greater-noida-west', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-patwari-greater-noida-west', permanent: true },
      { source: '/best-laundry-drycleaning/store/greater-noida-west', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-patwari-greater-noida-west', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-greater-noida-west', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-patwari-greater-noida-west', permanent: true },
      // id:5 Nirala Aspire Noida Extension
      { source: '/best-laundry-drycleaning/store/nirala-aspire-noida-extension', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-nirala-aspire-noida-extension', permanent: true },
      { source: '/best-laundry-drycleaning/store/noida-extension', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-nirala-aspire-noida-extension', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-noida-extension', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-nirala-aspire-noida-extension', permanent: true },
      // id:6 Swarn Nagari Greater Noida
      { source: '/best-laundry-drycleaning/store/swarn-nagari-greater-noida', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-swarn-nagari-greater-noida', permanent: true },
      { source: '/best-laundry-drycleaning/store/greater-noida', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-swarn-nagari-greater-noida', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-greater-noida', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-swarn-nagari-greater-noida', permanent: true },
      // id:7 Indirapuram
      { source: '/best-laundry-drycleaning/store/indirapuram', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-indirapuram', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-indirapuram', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-indirapuram', permanent: true },
      // id:8 Bhinga
      { source: '/best-laundry-drycleaning/store/bhinga', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-bhinga', permanent: true },
      // id:10 Karnaprayag
      { source: '/best-laundry-drycleaning/store/karnaprayag', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-karnaprayag', permanent: true },
      // id:11 Roorkee
      { source: '/best-laundry-drycleaning/store/roorkee', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-roorkee', permanent: true },
      // id:12 Purnia
      { source: '/best-laundry-drycleaning/store/purnia', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-purnia', permanent: true },
      // id:13 Sector 10 Panchkula
      { source: '/best-laundry-drycleaning/store/sector-10-panchkula', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-sector-10-panchkula', permanent: true },
      { source: '/best-laundry-drycleaning/store/panchkula', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-sector-10-panchkula', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-panchkula', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-sector-10-panchkula', permanent: true },
      // id:15 Sector 52 Gurugram
      { source: '/best-laundry-drycleaning/store/sector-52-gurugram', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-sector-52-gurugram', permanent: true },
      { source: '/best-laundry-drycleaning/store/gurugram', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-sector-52-gurugram', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-gurugram', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-sector-52-gurugram', permanent: true },
      // id:16 Amritsar
      { source: '/best-laundry-drycleaning/store/amritsar', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-amritsar', permanent: true },
      // id:17 Bathinda
      { source: '/best-laundry-drycleaning/store/bathinda', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-bathinda', permanent: true },
      // id:18 Patiala
      { source: '/best-laundry-drycleaning/store/patiala', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-patiala', permanent: true },
      // id:19 Kharar
      { source: '/best-laundry-drycleaning/store/kharar', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kharar', permanent: true },
      // id:20 Siliguri
      { source: '/best-laundry-drycleaning/store/siliguri', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-siliguri', permanent: true },
      // id:21 Jeypore
      { source: '/best-laundry-drycleaning/store/jeypore', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-jeypore', permanent: true },
      // id:22 Berhampur
      { source: '/best-laundry-drycleaning/store/berhampur', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-berhampur', permanent: true },
      // id:29 Chandrasekharpur Bhubaneswar
      { source: '/best-laundry-drycleaning/store/chandrasekharpur-bhubaneswar', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-chandrasekharpur-bhubaneswar', permanent: true },
      { source: '/best-laundry-drycleaning/store/chandrasekharpur', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-chandrasekharpur-bhubaneswar', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-chandrasekharpur', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-chandrasekharpur-bhubaneswar', permanent: true },
      // id:30 Angul
      { source: '/best-laundry-drycleaning/store/angul', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-angul', permanent: true },
      // id:31 Palasuni Bhubaneswar
      { source: '/best-laundry-drycleaning/store/palasuni-bhubaneswar', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-palasuni-bhubaneswar', permanent: true },
      { source: '/best-laundry-drycleaning/store/palasuni-bhubaneswar', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-palasuni-bhubaneswar', permanent: true },
      // id:32 Arjunda
      { source: '/best-laundry-drycleaning/store/arjunda', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-arjunda', permanent: true },
      // id:33 Udaipur
      { source: '/best-laundry-drycleaning/store/udaipur', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-udaipur', permanent: true },
      // id:34 Bhilwara
      { source: '/best-laundry-drycleaning/store/bhilwara', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-bhilwara', permanent: true },
      // id:35 Sanchore
      { source: '/best-laundry-drycleaning/store/sanchore', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-sanchore', permanent: true },
      // id:36 Wakad Pune
      { source: '/best-laundry-drycleaning/store/wakad-pune', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-wakad-pune', permanent: true },
      { source: '/best-laundry-drycleaning/store/wakad', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-wakad-pune', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-wakad', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-wakad-pune', permanent: true },
      // id:37 Thane West
      { source: '/best-laundry-drycleaning/store/thane-west', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-thane-west', permanent: true },
      { source: '/best-laundry-drycleaning/store/thane-west', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-thane-west', permanent: true },
      // id:38 Alibag
      { source: '/best-laundry-drycleaning/store/alibag', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-alibag', permanent: true },
      // id:39 Panoor
      { source: '/best-laundry-drycleaning/store/panoor', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-panoor', permanent: true },
      // id:40 Kannur
      { source: '/best-laundry-drycleaning/store/kannur', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kannur', permanent: true },
      // id:41 Vaikom
      { source: '/best-laundry-drycleaning/store/vaikom', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-vaikom', permanent: true },
      // id:42 Thampanoor Trivandrum
      { source: '/best-laundry-drycleaning/store/thampanoor-trivandrum', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-thampanoor-trivandrum', permanent: true },
      { source: '/best-laundry-drycleaning/store/trivandrum', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-thampanoor-trivandrum', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-trivandrum', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-thampanoor-trivandrum', permanent: true },
      // id:43 Parad Parat
      { source: '/best-laundry-drycleaning/store/parad-parat', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-parad-parat', permanent: true },
      { source: '/best-laundry-drycleaning/store/parad', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-parad-parat', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-parad', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-parad-parat', permanent: true },
      // id:44 Kozhikode
      { source: '/best-laundry-drycleaning/store/kozhikode', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kozhikode', permanent: true },
      // id:46 Karungal
      { source: '/best-laundry-drycleaning/store/karungal', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-karungal', permanent: true },
      // id:47 Kalaiyarkovil
      { source: '/best-laundry-drycleaning/store/kalaiyarkovil', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kalaiyarkovil', permanent: true },
      // id:48 Nadiad
      { source: '/best-laundry-drycleaning/store/nadiad', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-nadiad', permanent: true },
      // id:52 Padmanabhanagar Bengaluru
      { source: '/best-laundry-drycleaning/store/padmanabhanagar-bengaluru', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-padmanabhanagar-bengaluru', permanent: true },
      { source: '/best-laundry-drycleaning/store/padmanabhanagar', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-padmanabhanagar-bengaluru', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-padmanabhanagar', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-padmanabhanagar-bengaluru', permanent: true },
      // id:53 Una
      { source: '/best-laundry-drycleaning/store/una', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-una', permanent: true },
      // id:54 Kondapur Hyderabad
      { source: '/best-laundry-drycleaning/store/kondapur-hyderabad', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kondapur-hyderabad', permanent: true },
      { source: '/best-laundry-drycleaning/store/kondapur', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kondapur-hyderabad', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kondapur', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kondapur-hyderabad', permanent: true },
      // id:55 Vanasthalipuram Hyderabad (store name slug)
      { source: '/best-laundry-drycleaning/store/vanasthalipuram-hyderabad', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-vanasthalipuram-hyderabad', permanent: true },
      { source: '/best-laundry-drycleaning/store/vanasthalipuram', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-vanasthalipuram-hyderabad', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-vanasthalipuram', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-vanasthalipuram-hyderabad', permanent: true },
      // id:56 Beeramguda Sangareddy
      { source: '/best-laundry-drycleaning/store/beeramguda-sangareddy', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-beeramguda-sangareddy', permanent: true },
      { source: '/best-laundry-drycleaning/store/beeramguda', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-beeramguda-sangareddy', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-beeramguda', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-beeramguda-sangareddy', permanent: true },
      // id:57 Narsingi Hyderabad
      { source: '/best-laundry-drycleaning/store/narsingi-hyderabad', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-narsingi-hyderabad', permanent: true },
      { source: '/best-laundry-drycleaning/store/narsingi', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-narsingi-hyderabad', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-narsingi', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-narsingi-hyderabad', permanent: true },
      // id:58 Gachibowli Hyderabad
      { source: '/best-laundry-drycleaning/store/gachibowli-hyderabad', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-gachibowli-hyderabad', permanent: true },
      { source: '/best-laundry-drycleaning/store/gachibowli', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-gachibowli-hyderabad', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-gachibowli', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-gachibowli-hyderabad', permanent: true },
      // id:59 Gopanpally Tellapur Hyderabad
      { source: '/best-laundry-drycleaning/store/gopanpally-tellapur-hyderabad', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-gopanpally-tellapur-hyderabad', permanent: true },
      { source: '/best-laundry-drycleaning/store/gopanpally', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-gopanpally-tellapur-hyderabad', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-gopanpally', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-gopanpally-tellapur-hyderabad', permanent: true },
      // id:60 Mahe Puducherry
      { source: '/best-laundry-drycleaning/store/mahe-puducherry', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-mahe-puducherry', permanent: true },
      { source: '/best-laundry-drycleaning/store/mahe', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-mahe-puducherry', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-mahe', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-mahe-puducherry', permanent: true },
      // id:61 Bhopal
      { source: '/best-laundry-drycleaning/store/bhopal', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-bhopal', permanent: true },
      // id:63 Main Market Siwara
      { source: '/best-laundry-drycleaning/store/main-market-siwara', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-main-market-siwara', permanent: true },
      { source: '/best-laundry-drycleaning/store/siwara', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-main-market-siwara', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-siwara', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-main-market-siwara', permanent: true },
      // id:65 Kukatpally Hyderabad
      { source: '/best-laundry-drycleaning/store/kukatpally-hyderabad', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kukatpally-hyderabad', permanent: true },
      { source: '/best-laundry-drycleaning/store/kukatpally', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kukatpally-hyderabad', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kukatpally', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kukatpally-hyderabad', permanent: true },
      // id:66 Kokapet Hyderabad
      { source: '/best-laundry-drycleaning/store/kokapet-hyderabad', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kokapet-hyderabad', permanent: true },
      { source: '/best-laundry-drycleaning/store/kokapet', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kokapet-hyderabad', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kokapet', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kokapet-hyderabad', permanent: true },
      // id:67 Vaishali Ghaziabad
      { source: '/best-laundry-drycleaning/store/vaishali-ghaziabad', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-vaishali-ghaziabad', permanent: true },
      { source: '/best-laundry-drycleaning/store/ghaziabad', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-vaishali-ghaziabad', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-ghaziabad', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-vaishali-ghaziabad', permanent: true },
      // id:68 Kowkoor Secunderabad
      { source: '/best-laundry-drycleaning/store/kowkoor-secunderabad', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kowkoor-secunderabad', permanent: true },
      { source: '/best-laundry-drycleaning/store/secunderabad', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kowkoor-secunderabad', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-secunderabad', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kowkoor-secunderabad', permanent: true },
      // id:69 Vanasthalipuram Hyderabad (different store, city=Hyderabad)
      { source: '/best-laundry-drycleaning/store/vanasthalipuram-hyderabad-2', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-vanasthalipuram-hyderabad-2', permanent: true },
      { source: '/best-laundry-drycleaning/store/hyderabad', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-vanasthalipuram-hyderabad-2', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-hyderabad', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-vanasthalipuram-hyderabad-2', permanent: true },
      // id:70 Churu
      { source: '/best-laundry-drycleaning/store/churu', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-churu', permanent: true },
      // id:72 Jatni Khordha
      { source: '/best-laundry-drycleaning/store/jatni-khordha', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-jatni-khordha', permanent: true },
      { source: '/best-laundry-drycleaning/store/jatni-khordha', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-jatni-khordha', permanent: true },
      // id:73 Old Town Bhubaneswar
      { source: '/best-laundry-drycleaning/store/old-town-bhubaneswar', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-old-town-bhubaneswar', permanent: true },
      { source: '/best-laundry-drycleaning/store/old-town-bhubaneswar', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-old-town-bhubaneswar', permanent: true },
      // id:74 CDA Cuttack
      { source: '/best-laundry-drycleaning/store/cda-cuttack', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-cda-cuttack', permanent: true },
      { source: '/best-laundry-drycleaning/store/cda-cuttack', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-cda-cuttack', permanent: true },
      // id:75 Kurukkol Malappuram (city=Cheriyamundam)
      { source: '/best-laundry-drycleaning/store/kurukkol-malappuram', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kurukkol-malappuram', permanent: true },
      { source: '/best-laundry-drycleaning/store/cheriyamundam', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kurukkol-malappuram', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-cheriyamundam', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kurukkol-malappuram', permanent: true },
      // id:76 Kazhakkoottam Trivandrum
      { source: '/best-laundry-drycleaning/store/kazhakkoottam-trivandrum', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kazhakkoottam-trivandrum', permanent: true },
      { source: '/best-laundry-drycleaning/store/kazhakkoottam', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kazhakkoottam-trivandrum', permanent: true },
      { source: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kazhakkoottam', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-kazhakkoottam-trivandrum', permanent: true },
      // id:77 Sector 3 Udaipur (different from id:33, same city)
      { source: '/best-laundry-drycleaning/store/sector-3-udaipur', destination: '/best-laundry-drycleaning/store/best-laundry-drycleaning-services-sector-3-udaipur', permanent: true },
    ];

  },
};

export default nextConfig;
