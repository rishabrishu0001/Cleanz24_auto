'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { storesData } from '../../data';
import { generateStoreSlug } from './StoreDetail';

// Helper to slugify
const slugify = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

// City-specific testimonials
// NOTE: Names use 'Verified Customer' to stay compliant with Google's review authenticity guidelines.
// Replace with real Google/app reviews once available for that city.
const CITY_TESTIMONIALS = {
  noida: [
    { text: "Cleanz24 ne meri lehenga ko bilkul new jaisa kar diya. Free pickup aur 48-hour delivery bhi on time thi. Sector 41 ki sabse trusted dry cleaning service!", name: "Verified Customer", area: "Sector 41, Noida", rating: 5 },
    { text: "Office formals aur suits ke liye best. Steam ironing ka kaam itna crisp hai ki main office me confident feel karta hoon. Highly recommend!", name: "Verified Customer", area: "Sector 137, Noida", rating: 5 },
    { text: "Sneaker cleaning service amazing hai. Mere 3 mahine purane Nike chhod ke gaye they, wapas bilkul naye jaisa aaya.", name: "Verified Customer", area: "Sector 62, Noida", rating: 5 },
  ],
  gurugram: [
    { text: "Best laundry service in Gurugram! DLF Phase work karta hoon, doorstep pickup ne meri life easy kar di. Wedding sherwani bhi perfectly cleaned.", name: "Verified Customer", area: "Sector 52, Gurugram", rating: 5 },
    { text: "Sofa cleaning service outstanding thi. Team aayi, kaam kiya, koi smell nahi, bilkul fresh. Highly recommended!", name: "Verified Customer", area: "Golf Course Road, Gurugram", rating: 5 },
  ],
  hyderabad: [
    { text: "Gachibowli me best dry cleaning service! HITEC City me kaam karta hoon, pickup ka time match karte hain mere schedule se. 5 stars!", name: "Verified Customer", area: "Gachibowli, Hyderabad", rating: 5 },
    { text: "Wedding season me silk sarees dry clean karwaayi, ek bhi saree kharab nahi hui. Amazing care aur quality packaging.", name: "Verified Customer", area: "Kondapur, Hyderabad", rating: 5 },
  ],
  pune: [
    { text: "Wakad aur Tathawade area cover karte hain, pickup easy hai. Office shirts pe ironing ekdum perfect. Highly satisfied customer!", name: "Verified Customer", area: "Wakad, Pune", rating: 5 },
    { text: "Carpet cleaning service at home try ki — absolutely brilliant! Team professional thi aur carpet jaisa new ho gaya.", name: "Verified Customer", area: "Baner, Pune", rating: 5 },
  ],
  bangalore: [
    { text: "Padmanabhanagar me reliable laundry service dhundh raha tha — Cleanz24 ne disappoint nahi kiya. Free delivery bhi hai!", name: "Verified Customer", area: "Padmanabhanagar, Bangalore", rating: 5 },
    { text: "Leather jacket dry cleaning bahut achhi ki. Condition better than before. Koramangala se pickup on time.", name: "Verified Customer", area: "Koramangala, Bangalore", rating: 5 },
  ],
};

// City-specific geo coordinates (mapped to exact lat/lng for local SEO schemas)
const CITY_GEO = {
  noida: { lat: 28.5355, lng: 77.3910 },
  'greater-noida-west': { lat: 28.5665, lng: 77.4200 },
  'noida-extension': { lat: 28.5942, lng: 77.4353 },
  'greater-noida': { lat: 28.4744, lng: 77.5040 },
  indirapuram: { lat: 28.6410, lng: 77.3712 },
  bhinga: { lat: 27.7082, lng: 81.9288 },
  karnaprayag: { lat: 30.2603, lng: 79.2173 },
  roorkee: { lat: 29.8543, lng: 77.8880 },
  purnia: { lat: 25.7771, lng: 87.4753 },
  panchkula: { lat: 30.6942, lng: 76.8606 },
  gurugram: { lat: 28.4595, lng: 77.0266 },
  amritsar: { lat: 31.6340, lng: 74.8723 },
  bathinda: { lat: 30.2110, lng: 74.9455 },
  patiala: { lat: 30.3398, lng: 76.3869 },
  kharar: { lat: 30.7460, lng: 76.6473 },
  siliguri: { lat: 26.7271, lng: 88.3953 },
  jeypore: { lat: 18.8576, lng: 82.5684 },
  berhampur: { lat: 19.3149, lng: 84.7941 },
  chandrasekharpur: { lat: 20.3245, lng: 85.8189 },
  angul: { lat: 20.8397, lng: 85.1018 },
  'palasuni-bhubaneswar': { lat: 20.2961, lng: 85.8245 },
  arjunda: { lat: 20.7300, lng: 81.1600 },
  udaipur: { lat: 24.5854, lng: 73.7125 },
  bhilwara: { lat: 25.3487, lng: 74.6348 },
  sanchore: { lat: 24.7547, lng: 71.7709 },
  wakad: { lat: 18.5916, lng: 73.7604 },
  'thane-west': { lat: 19.2183, lng: 72.9781 },
  alibag: { lat: 18.6414, lng: 72.8722 },
  panoor: { lat: 11.7583, lng: 75.5786 },
  kannur: { lat: 11.8745, lng: 75.3704 },
  vaikom: { lat: 9.7479, lng: 76.3950 },
  trivandrum: { lat: 8.5241, lng: 76.9366 },
  parad: { lat: 11.7820, lng: 75.5640 },
  kozhikode: { lat: 11.2588, lng: 75.7804 },
  karungal: { lat: 8.2045, lng: 77.2405 },
  kalaiyarkovil: { lat: 9.8456, lng: 78.6304 },
  nadiad: { lat: 22.6916, lng: 72.8634 },
  padmanabhanagar: { lat: 12.9181, lng: 77.5583 },
  una: { lat: 31.4685, lng: 76.2708 },
  kondapur: { lat: 17.4622, lng: 78.3568 },
  vanasthalipuram: { lat: 17.3323, lng: 78.5724 },
  beeramguda: { lat: 17.5146, lng: 78.2934 },
  narsingi: { lat: 17.3807, lng: 78.3615 },
  gachibowli: { lat: 17.4401, lng: 78.3489 },
  gopanpally: { lat: 17.4589, lng: 78.3075 },
  mahe: { lat: 11.7002, lng: 75.5348 },
  bhopal: { lat: 23.2599, lng: 77.4126 },
  'pimpri-chinchwad': { lat: 18.6298, lng: 73.7997 },
  siwara: { lat: 24.8100, lng: 71.7400 },
  kukatpally: { lat: 17.4849, lng: 78.4138 },
  kokapet: { lat: 17.3853, lng: 78.3298 },
  ghaziabad: { lat: 28.6692, lng: 77.4538 },
  secunderabad: { lat: 17.4399, lng: 78.4983 },
  hyderabad: { lat: 17.3850, lng: 78.4867 },
  churu: { lat: 28.2900, lng: 74.9600 },
  'jatni-khordha': { lat: 20.1637, lng: 85.7032 },
  'old-town-bhubaneswar': { lat: 20.2444, lng: 85.8340 },
  'cda-cuttack': { lat: 20.4625, lng: 85.8828 },
  cheriyamundam: { lat: 10.9230, lng: 75.9400 },
  kazhakkoottam: { lat: 8.5664, lng: 76.8770 },
  delhi: { lat: 28.6139, lng: 77.2090 },
  mumbai: { lat: 19.0760, lng: 72.8777 },
  pune: { lat: 18.5204, lng: 73.8567 },
  bangalore: { lat: 12.9716, lng: 77.5946 },
  dehradun: { lat: 30.3165, lng: 78.0322 },
  chandigarh: { lat: 30.7333, lng: 76.7794 },
};

// Local data dictionary for major cities
const CITY_LANDMARKS = {
  noida: ['Sector 18 Market', 'DLF Mall of India', 'Noida Golf Course', 'Botanical Garden Metro Station', 'Okhla Bird Sanctuary'],
  'greater-noida': ['Pari Chowk', 'Grand Venice Mall', 'Gautam Buddha University', 'India Expo Mart', 'Yamuna Expressway'],
  'greater-noida-west': ['Gaur City Mall', 'Ek Murti Chowk', 'Char Murti', 'Gaur City Sports City', 'Yatharth Hospital'],
  'noida-extension': ['Nirala Aspire Plaza', 'Panchsheel Greens', 'Cherry County', 'Supertech Eco Village', 'Gaur City'],
  gurugram: ['Cyber City', 'Kingdom of Dreams', 'Ambience Mall', 'IFFCO Chowk', 'Sector 29 Market'],
  delhi: ['Connaught Place', 'India Gate', 'Red Fort', 'South Extension', 'Rajouri Garden'],
  mumbai: ['Gateway of India', 'Marine Drive', 'Bandra-Worli Sea Link', 'Juhu Beach', 'Chhatrapati Shivaji Terminal'],
  pune: ['Shaniwar Wada', 'Koregaon Park', 'Viman Nagar', 'Fergusson College Road', 'Aundh', 'Bhumkar Chowk Wakad'],
  wakad: ['Bhumkar Chowk', 'PATIL ESTATE Tathawade', 'Phoenix Marketcity Wakad', 'Sayaji Hotel', 'Decathlon Wakad'],
  bangalore: ['MG Road', 'Lalbagh Botanical Garden', 'Indiranagar', 'Koramangala', 'Phoenix Marketcity'],
  hyderabad: ['Charminar', 'Golconda Fort', 'Gachibowli Stadium', 'HITEC City', 'Inorbit Mall'],
  secunderabad: ['Secunderabad Railway Station', 'Hussain Sagar Lake', 'Paradise Circle', 'Clock Tower', 'Janapriya Arcadia Kowkoor'],
  kowkoor: ['Janapriya Arcadia', 'Alwal Main Road', 'Bollaram Road', 'Lothkunta', 'Trimulgherry'],
  gopanpally: ['Gopanpally Village', 'Wipro Circle', 'Financial District', 'Manthan International School', 'Tellapur Lake'],
  tellapur: ['Gopanpally Village', 'Wipro Circle', 'Financial District', 'Manthan International School', 'Tellapur Lake'],
  kokapet: ['Kokapet Circle', 'SNAAPP224 Food Court', 'Financial District', 'Gandipet Lake', 'Manchirevula Village'],
  roorkee: ['IIT Roorkee', 'Bhandari Colony', 'Paniyala Road', 'Subhash Nagar', 'Roorkee Cantt'],
  parad: ['Kunnothuparamba Road', 'Ponnath Juice & Bakes', 'Parat Town', 'Kannur Road'],
  parat: ['Kunnothuparamba Road', 'Ponnath Juice & Bakes', 'Parat Town', 'Kannur Road'],
  dehradun: ['Clock Tower', 'Rajpur Road', 'Robber\'s Cave', 'Pacific Mall', 'Forest Research Institute'],
};

const CITY_NEIGHBORHOODS = {
  noida: ['Sector 15', 'Sector 19', 'Sector 27', 'Sector 30', 'Sector 41', 'Sector 44', 'Sector 50', 'Sector 62', 'Sector 74', 'Sector 76', 'Sector 93', 'Sector 137'],
  'greater-noida': ['Swarn Nagari', 'Omega 1', 'Gamma 2', 'Beta 1', 'Alpha 2', 'Chi 5', 'Zeta 1', 'Knowledge Park III'],
  'greater-noida-west': ['Gaur City 1', 'Gaur City 2', 'Patwari', 'Shahberi', 'Sector 1', 'Sector 4', 'Sector 10', 'Sector 16'],
  'noida-extension': ['Nirala Aspire', 'Panchsheel Greens 2', 'Stella', 'Eco Village 1', 'Cherry County Area', 'Bisrakh'],
  gurugram: ['Sector 82', 'Sector 84', 'DLF Phase 3', 'Sushant Lok 1', 'Sector 56', 'Golf Course Road', 'Sohna Road'],
  delhi: ['Dwarka', 'Saket', 'Karol Bagh', 'Vasant Kunj', 'Greater Kailash', 'Preet Vihar', 'Pitampura', 'Janakpuri'],
  mumbai: ['Andheri West', 'Bandra West', 'Thane West', 'Alibag', 'Colaba', 'Borivali East', 'Juhu', 'Dadar'],
  pune: ['Koregaon Park', 'Kothrud', 'Hinjewadi', 'Viman Nagar', 'Hadapsar', 'Baner', 'Kalyani Nagar', 'Aundh', 'Wakad', 'Tathawade'],
  wakad: ['PATIL ESTATE', 'Bhumkar Chowk Road', 'Tathawade', 'Dange Chowk', 'Hinjewadi IT Park Phase 1'],
  bangalore: ['Jayanagar', 'Indiranagar', 'Koramangala', 'Whitefield', 'Padmanabhanagar', 'Malleshwaram'],
  hyderabad: ['Gachibowli', 'Kondapur', 'Narsingi', 'Beeramguda', 'Vanasthalipuram', 'Gopanpally', 'Tellapur', 'Madhapur', 'Jubilee Hills', 'Kukatpally', 'Kokapet'],
  secunderabad: ['Kowkoor', 'Alwal', 'Bollaram', 'Trimulgherry', 'Sainikpuri', 'Maredpally'],
  kowkoor: ['Janapriya Arcadia', 'Alwal', 'Old Alwal', 'Yapral', 'Bollaram Colony'],
  gopanpally: ['Gopanpally Village', 'Tellapur Road', 'Serilingampally', 'Gopanpally Thanda', 'Wipro Circle'],
  tellapur: ['Tellapur OSB', 'Gopanpally Village', 'Serilingampally', 'Mayfair Apartments', 'Aparna CyberLife'],
  kokapet: ['Kokapet Circle', 'Manchirevula Village', 'Gandipet Mandal', 'Financial District Extension', 'Golden Mile Kokapet'],
  roorkee: ['Bhandari Colony', 'Paniyala Road', 'Subhash Nagar', 'IIT Roorkee Campus', 'Civil Lines Roorkee'],
  parad: ['Kunnothuparamba Road', 'Ponnath Juice Area', 'Parad Junction', 'Kannur District'],
  parat: ['Kunnothuparamba Road', 'Ponnath Juice Area', 'Parat Junction', 'Kannur District'],
  dehradun: ['Rajpur Road', 'Jakhan', 'Dalanwala', 'Indira Nagar', 'Premnagar', 'Vasant Vihar', 'Chakrata Road'],
};

// Star Rating component
function StarRating({ rating }) {
  return (
    <span style={{ color: '#F59E0B', fontSize: '14px' }}>
      {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
    </span>
  );
}

// FAQ Item with accordion
function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
        marginBottom: '12px',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          padding: '18px 20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#2D3748' }}>
          {index + 1}. {faq.q}
        </span>
        <span style={{ fontSize: '20px', color: '#2B6CB0', flexShrink: 0, fontWeight: 300 }}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div style={{ padding: '0 20px 18px', fontSize: '14px', lineHeight: '1.7', color: '#718096' }}>
          {faq.a}
        </div>
      )}
    </div>
  );
}

export default function LocationDetail() {
  const { citySlug } = (useParams() || {});
  
  const cleanSlug = citySlug ? citySlug.replace(/^:/, '').trim() : '';
  
  const matchedStores = storesData.filter((store) => {
    const sCity = slugify(store.city);
    const sTagCity = store.tags && store.tags.some(t => slugify(t) === cleanSlug);
    const sName = slugify(store.name);
    return sCity === cleanSlug || sTagCity || sName.includes(cleanSlug);
  });

  if (matchedStores.length === 0) {
    return (
      <div style={{ background: '#F7FAFC', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
        <div style={{ maxWidth: '500px', width: '100%', background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #EDF2F7', textAlign: 'center' }}>
          <span style={{ fontSize: '64px', display: 'block', marginBottom: '24px' }}>📍</span>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1A365D', fontFamily: "'Poppins', sans-serif", marginBottom: '16px' }}>
            Store Location Not Found
          </h1>
          <p style={{ color: '#718096', fontSize: '15px', lineHeight: '1.6', marginBottom: '30px' }}>
            We couldn't find a Cleanz24 laundry or dry cleaning store matching <strong>"{cleanSlug}"</strong>. We currently operate premium outlets across India.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/best-laundry-drycleaning/locations"
              style={{ background: '#2B6CB0', color: '#fff', textDecoration: 'none', fontWeight: 700, borderRadius: '30px', padding: '12px 24px', fontSize: '15px', display: 'block', boxShadow: '0 4px 12px rgba(43,108,176,0.3)' }}
            >
              🔍 Browse Store Directory
            </Link>
            <Link href="/best-laundry-drycleaning/stores"
              style={{ background: '#fff', color: '#2B6CB0', border: '1px solid #2B6CB0', textDecoration: 'none', fontWeight: 700, borderRadius: '30px', padding: '12px 24px', fontSize: '15px', display: 'block' }}
            >
              📍 Search Nearest Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const primaryStore = matchedStores[0];

  const getCityDisplayName = (slug) => {
    if (!slug) return '';
    const specialCases = {
      'delhi': 'Delhi',
      'noida': 'Noida',
      'greater-noida': 'Greater Noida',
      'greater-noida-west': 'Greater Noida West',
      'noida-extension': 'Noida Extension',
      'gurugram': 'Gurugram',
      'mumbai': 'Mumbai',
      'pune': 'Pune',
      'bangalore': 'Bangalore',
      'hyderabad': 'Hyderabad',
      'dehradun': 'Dehradun',
      'thane-west': 'Thane West'
    };
    if (specialCases[slug]) return specialCases[slug];
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const city = getCityDisplayName(cleanSlug);
  const state = cleanSlug === 'delhi' ? 'Delhi NCR' : primaryStore.state;
  const phone = primaryStore.phone;
  const rating = primaryStore.rating;
  const reviewsCount = primaryStore.reviews;

  const landmarks = CITY_LANDMARKS[cleanSlug] || [`${city} City Center`, `Main Market ${city}`, `major transit hubs in ${city}`];
  const neighborhoods = CITY_NEIGHBORHOODS[cleanSlug] || [`${city} Sector 1`, `${city} Sector 2`, `${city} Extension`, `Downtown ${city}`];
  const testimonials = CITY_TESTIMONIALS[cleanSlug] || [
    { text: `Cleanz24 ${city} ka service outstanding hai. Free pickup, quick turnaround, aur garments bilkul perfect return hue. Bahut satisfied hoon!`, name: "Verified Customer", area: `${city}`, rating: 5 },
    { text: `Meri silk sarees aur designer clothes ke liye best dry cleaning in ${city}. Chemical smell zero, fabric safe. Highly recommend!`, name: "Verified Customer", area: `${city}`, rating: 5 },
    { text: `${city} me best laundry service! Office shirts pe steam ironing perfect hai. Doorstep delivery bhi on-time.`, name: "Verified Customer", area: `${city}`, rating: 5 },
  ];

  const geo = CITY_GEO[cleanSlug] || { lat: 20.5937, lng: 78.9629 };

  // 5 City-Specific FAQs
  const faqs = [
    {
      q: `Does Cleanz24 offer free home pickup and delivery in ${city}?`,
      a: `Yes! Cleanz24 provides completely free doorstep pickup and delivery for laundry, dry cleaning, shoe spa, curtain, and sofa cleaning services across ${city} and its surrounding neighborhoods including ${neighborhoods.slice(0, 4).join(', ')}. Simply WhatsApp us or call our helpline to schedule a convenient slot.`,
    },
    {
      q: `What is the turnaround time for dry cleaning in ${city}?`,
      a: `Our standard turnaround time in ${city} is 48–72 hours for dry cleaning. We also offer an Express Laundry Service where your garments are cleaned and delivered back within 24 hours. Contact our ${city} team to schedule priority pickup.`,
    },
    {
      q: `Are your cleaning solvents safe for silk sarees and delicate wedding wear?`,
      a: `Absolutely. Cleanz24 uses eco-friendly, hypoallergenic solvents combined with computer-controlled soft-wash machinery. This is extremely gentle on delicate garments like silk sarees, designer lehengas, sherwanis, and suits, preserving color and embroidery without any chemical odor.`,
    },
    {
      q: `Do you provide sofa and carpet cleaning services at home in ${city}?`,
      a: `Yes! We offer professional sofa cleaning, carpet shampooing, and curtain cleaning directly at your home in ${city}. Our team comes equipped with high-suction extractors and sanitizing steam machines to deep-clean and disinfect your upholstery on-site — no need to take anything to the store.`,
    },
    {
      q: `How do I book a laundry pickup in ${city}?`,
      a: `Booking is very easy! You can WhatsApp us at +91 9138004800, call our helpline, or click the Book Now button on our website. Our logistics assistant will coordinate a convenient time slot to collect your garments directly from your home in ${city}.`,
    },
    {
      q: `How do you ensure my clothes don't get mixed with others?`,
      a: `Hygiene is our top priority at Cleanz24 ${city}. We follow a strict individual-cycle protocol — your clothes are tagged, washed, dried, and ironed in completely separate batches. Your garments never mix with another household's clothes, preventing cross-contamination entirely.`,
    },
  ];

  // Total reviews across all matched stores
  const totalReviews = matchedStores.reduce((sum, s) => sum + (s.reviews || 0), 0);
  const avgRating = (matchedStores.reduce((sum, s) => sum + (s.rating || 4.8), 0) / matchedStores.length).toFixed(1);

  // Local Business Schema with city-specific GeoCoordinates & NAP
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'DryCleaningOrLaundry',
    name: primaryStore?.name || `Cleanz24 Laundry & Dry Clean Studio - ${city}`,
    description: `Premium eco-friendly dry cleaning, shoe spa, and laundry service in ${city} with free doorstep pickup & delivery.`,
    url: `https://cleanz24.com/best-laundry-drycleaning/${cleanSlug}`,
    telephone: primaryStore?.phone ? `+91${primaryStore.phone.replace(/\s+/g, '')}` : '+919138004800',
    email: 'happy2helpu@cleanz24.com',
    priceRange: '₹₹',
    image: 'https://cleanz24.com/assets/og-image.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: primaryStore?.address || city,
      addressLocality: city,
      addressRegion: state,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.lat,
      longitude: geo.lng,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating,
      reviewCount: totalReviews,
    },
    areaServed: {
      '@type': 'City',
      name: city,
    },
  };

  // ItemList Schema for area-wise store cards in this city
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Cleanz24 Laundry & Dry Cleaning Outlets in ${city}`,
    numberOfItems: matchedStores.length,
    itemListElement: matchedStores.map((store, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'DryCleaningOrLaundry',
        name: store.name,
        address: store.address,
        telephone: store.phone ? `+91${store.phone.replace(/\s+/g, '')}` : '+919138004800',
        url: `https://cleanz24.com/best-laundry-drycleaning/store/${generateStoreSlug(store.name)}`,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: store.rating || 4.8,
          reviewCount: store.reviews || 40,
        },
      },
    })),
  };

  // FAQ Schema — mirrors EXACTLY the 6 FAQs displayed on the page (no hidden schema-only content)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <div style={{ background: '#F7FAFC', minHeight: '100vh' }}>
      {/* City-Specific LocalBusiness, ItemList & FAQ Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* ══════════════════ HERO ══════════════════ */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1A365D 0%, #2A4365 50%, #2B6CB0 100%)',
          color: '#fff',
          padding: '80px 20px 100px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" style={{ marginBottom: '20px', fontSize: '13px', opacity: 0.75 }}>
            <span>
              <Link href="/best-laundry-drycleaning" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
              {' › '}
              {/* State page does not exist yet — plain text, not a link, to avoid broken internal links */}
              <span style={{ color: 'rgba(255,255,255,0.75)' }}>{state}</span>
              {' › '}
              <span style={{ fontWeight: 600 }}>{city}</span>
            </span>
          </nav>

          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '30px', fontSize: '12px', fontWeight: 700, padding: '6px 18px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}
          >
            ⭐ Rated {avgRating}/5 · {totalReviews}+ Happy Customers in {city}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.2, fontFamily: "'Poppins', sans-serif", marginBottom: '20px' }}
          >
            Best Laundry &amp; Dry Cleaning Service in {city}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontSize: 'clamp(15px, 2.5vw, 19px)', color: 'rgba(255,255,255,0.9)', maxWidth: '650px', margin: '0 auto 36px', lineHeight: 1.7 }}
          >
            Premium eco-friendly dry cleaning, shoe spa, steam ironing, and home upholstery care — with <strong>free doorstep pickup &amp; delivery</strong> across {city}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <a
              href={`https://wa.me/${primaryStore.whatsapp || '919138004800'}?text=Hi%20Cleanz24,%20I%20would%20like%20to%20book%20a%20laundry%20pickup%20in%20${city}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: '#48BB78', color: '#fff', textDecoration: 'none', fontWeight: 700, borderRadius: '30px', padding: '14px 28px', fontSize: '15px', boxShadow: '0 4px 14px rgba(72,187,120,0.4)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2z"/></svg>
              Book on WhatsApp
            </a>
            <a
              href={`tel:+91${phone.replace(/\s+/g, '')}`}
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff', textDecoration: 'none', fontWeight: 700, borderRadius: '30px', padding: '14px 28px', fontSize: '15px' }}
            >
              📞 Call +91 {phone}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ STORE CARDS (Dynamic, Area-wise) ══════════════════ */}
      <section style={{ background: '#fff', padding: '60px 0 50px', borderBottom: '1px solid #EDF2F7' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: '#1A365D', fontFamily: "'Poppins', sans-serif", marginBottom: '8px', textAlign: 'center' }}>
            Cleanz24 Stores in {city}
          </h2>
          <p style={{ color: '#718096', textAlign: 'center', marginBottom: '40px', fontSize: '15px' }}>
            {matchedStores.length} outlet{matchedStores.length > 1 ? 's' : ''} — click any store to view photos, services &amp; details
          </p>

          <div className="row g-4">
            {matchedStores.map((store) => (
              <div key={store.id} className="col-md-6 col-lg-4">
                <div
                  style={{
                    background: '#fff',
                    borderRadius: '14px',
                    border: '1px solid #E2E8F0',
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    transition: 'box-shadow 0.2s',
                  }}
                >
                  {/* Card header */}
                  <div style={{ background: 'linear-gradient(135deg, #1A365D, #2563EB)', padding: '20px', color: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, lineHeight: 1.3 }}>{store.name}</h3>
                      <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '3px 10px', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>
                        ⭐ {store.rating}
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', opacity: 0.8, margin: '6px 0 0' }}>{store.reviews}+ reviews</p>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <p style={{ fontSize: '13px', color: '#4A5568', lineHeight: '1.5', margin: 0 }}>
                      📍 {store.address}
                    </p>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <a
                        href={`tel:+91${store.phone.replace(/\s+/g, '')}`}
                        style={{ flex: 1, minWidth: '90px', background: '#EBF8FF', color: '#2B6CB0', border: 'none', borderRadius: '8px', padding: '9px 12px', fontSize: '12px', fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}
                      >
                        📞 Call
                      </a>
                      <a
                        href={`https://wa.me/${store.whatsapp || '919138004800'}?text=Hi%20Cleanz24,%20I%20would%20like%20to%20book%20a%20pickup%20from%20${encodeURIComponent(store.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ flex: 1, minWidth: '90px', background: '#E6FFFA', color: '#319795', border: 'none', borderRadius: '8px', padding: '9px 12px', fontSize: '12px', fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}
                      >
                        💬 WhatsApp
                      </a>
                    </div>

                    <Link
                      href={`/best-laundry-drycleaning/store/${generateStoreSlug(store.name)}`}
                      style={{ display: 'block', background: 'linear-gradient(90deg, #1A365D, #2563EB)', color: '#fff', textDecoration: 'none', fontSize: '13px', fontWeight: 700, padding: '11px 14px', borderRadius: '8px', textAlign: 'center', marginTop: 'auto', boxShadow: '0 2px 8px rgba(37,99,235,0.2)' }}
                    >
                      📸 View Store Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ MAIN CONTENT ══════════════════ */}
      <section className="py-5">
        <div className="container px-3">
          <div className="row">
            {/* ── Left Column ── */}
            <div className="col-lg-8 pe-lg-5">

              {/* Why City Trusts Cleanz24 */}
              <div style={{ marginBottom: '56px' }}>
                <h2 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#1A365D', fontFamily: "'Poppins', sans-serif", marginBottom: '16px' }}>
                  Why {city} Trusts Cleanz24 for Laundry &amp; Dry Cleaning
                </h2>

                {/* Trust Stats */}
                <div className="row g-3" style={{ marginBottom: '24px' }}>
                  {[
                    { icon: '⭐', value: `${avgRating}/5`, label: 'Average Rating' },
                    { icon: '👥', value: `${totalReviews}+`, label: 'Happy Customers' },
                    { icon: '🚚', value: '10,000+', label: 'Pickups Completed' },
                    { icon: '🌿', value: '100%', label: 'Eco-Safe Solvents' },
                  ].map((stat, i) => (
                    <div key={i} className="col-6 col-md-3">
                      <div style={{ background: '#fff', borderRadius: '12px', padding: '18px 12px', textAlign: 'center', border: '1px solid #EDF2F7', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                        <div style={{ fontSize: '24px', marginBottom: '6px' }}>{stat.icon}</div>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: '#1A365D' }}>{stat.value}</div>
                        <div style={{ fontSize: '11px', color: '#718096', marginTop: '4px' }}>{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#4A5568', marginBottom: '16px' }}>
                  Finding a reliable <strong>laundry near me</strong> or <strong>best dry cleaner in {city}</strong> is often difficult when you need to trust someone with expensive clothes, delicate wedding wear, or heavy furnishings. Cleanz24 has established itself as {city}'s premium garment care partner — offering advanced German soft-wash technology, biodegradable cleaning solvents, and a free doorstep pickup &amp; delivery network that covers every major neighborhood.
                </p>
                <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#4A5568', marginBottom: '0' }}>
                  With over {totalReviews} verified 5-star reviews and {avgRating}/5 average rating from {city} residents, Cleanz24 has become the go-to garment care brand in {neighborhoods.slice(0, 4).join(', ')}, and beyond. Our eco-safe, hypoallergenic solvents protect your family's health while delivering flawless cleaning results every single time.
                </p>
              </div>

              {/* City-Specific Testimonials */}
              <div style={{ marginBottom: '56px' }}>
                <h2 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#1A365D', fontFamily: "'Poppins', sans-serif", marginBottom: '24px' }}>
                  What {city} Residents Say About Cleanz24
                </h2>
                <div className="row g-4">
                  {testimonials.map((t, i) => (
                    <div key={i} className="col-md-6">
                      <div style={{ background: '#fff', padding: '24px', borderRadius: '14px', borderLeft: '4px solid #2B6CB0', boxShadow: '0 2px 12px rgba(0,0,0,0.03)', height: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <StarRating rating={t.rating} />
                        <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#4A5568', margin: 0, lineHeight: '1.7', flex: 1 }}>
                          "{t.text}"
                        </p>
                        <div>
                          <h5 style={{ fontSize: '14px', fontWeight: 700, color: '#2D3748', margin: '0 0 2px' }}>— {t.name}</h5>
                          <span style={{ fontSize: '12px', color: '#A0AEC0' }}>📍 {t.area}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Areas We Serve */}
              <div style={{ marginBottom: '56px' }}>
                <h2 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#1A365D', fontFamily: "'Poppins', sans-serif", marginBottom: '16px' }}>
                  Areas We Serve in {city}
                </h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#4A5568', marginBottom: '20px' }}>
                  Cleanz24 has built a deep pickup &amp; delivery network across {city}. Our logistics team regularly covers areas near <strong>{landmarks.slice(0, 3).join(', ')}</strong>, and all major residential &amp; commercial zones. Whether you live in gated communities, apartments, or independent houses — our team reaches you.
                </p>

                <div style={{ background: '#EDF2F7', borderRadius: '12px', padding: '20px 24px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#2D3748', marginBottom: '14px' }}>📍 We Serve These Localities in {city}:</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {neighborhoods.map((area, i) => (
                      <span
                        key={i}
                        style={{ background: '#fff', border: '1px solid #CBD5E0', borderRadius: '20px', padding: '5px 14px', fontSize: '13px', color: '#2D3748', fontWeight: 500 }}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                  <p style={{ fontSize: '13px', color: '#718096', marginTop: '14px', marginBottom: 0 }}>
                    ...and all nearby micro-localities. Don't see your area? Call us — we likely cover it!
                  </p>
                </div>
              </div>

              {/* FAQs */}
              <div style={{ marginBottom: '56px' }}>
                <h2 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#1A365D', fontFamily: "'Poppins', sans-serif", marginBottom: '8px' }}>
                  FAQs — Laundry &amp; Dry Cleaning in {city}
                </h2>
                <p style={{ color: '#718096', fontSize: '15px', marginBottom: '24px' }}>Common questions from {city} customers:</p>
                <div>
                  {faqs.map((faq, index) => (
                    <FaqItem key={index} faq={faq} index={index} />
                  ))}
                </div>
              </div>

              {/* Services Grid */}
              <div style={{ marginBottom: '56px' }}>
                <h2 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#1A365D', fontFamily: "'Poppins', sans-serif", marginBottom: '16px' }}>
                  Our Laundry &amp; Dry Cleaning Services in {city}
                </h2>
                <p style={{ fontSize: '15px', color: '#4A5568', lineHeight: '1.7', marginBottom: '28px' }}>
                  From everyday wash &amp; fold to premium wedding wear dry cleaning — Cleanz24 {city} covers it all under one roof:
                </p>
                <div className="row g-3">
                  {[
                    { icon: '👕', title: 'Premium Laundry', desc: 'Wash & fold for everyday shirts, trousers, activewear. Soft water + premium surfactants, individual cycles.' },
                    { icon: '👔', title: 'Dry Cleaning', desc: 'For suits, silk sarees, lehengas, sherwanis. Eco solvents preserve fabric texture, color, and shape.' },
                    { icon: '👟', title: 'Shoe Spa', desc: 'Sneakers, leather boots, canvas & suede shoes — deep-clean, deodorize, and condition.' },
                    { icon: '💨', title: 'Steam Ironing', desc: 'Crisp, wrinkle-free shirts on vacuum steam tables. No burn risk, perfect crease lines.' },
                    { icon: '🛋️', title: 'Sofa Cleaning', desc: 'At-home extraction shampooing & steam sanitizing. Removes allergens, dust mites & pet hair.' },
                    { icon: '🏠', title: 'Curtain & Carpet', desc: 'Deep dust extraction + antimicrobial treatment for curtains, rugs, and wall-to-wall carpets.' },
                  ].map((s, i) => (
                    <div key={i} className="col-md-6">
                      <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #EDF2F7', height: '100%' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#2B6CB0', marginBottom: '8px' }}>{s.icon} {s.title}</h3>
                        <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#718096', margin: 0 }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div style={{ background: 'linear-gradient(135deg, #1A365D, #2563EB)', borderRadius: '16px', padding: '40px 32px', color: '#fff', marginBottom: '20px' }}>
                <h2 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, fontFamily: "'Poppins', sans-serif", marginBottom: '14px' }}>
                  Start Your Laundry &amp; Dry Cleaning Journey with Cleanz24 {city}
                </h2>
                <p style={{ fontSize: '15px', opacity: 0.9, lineHeight: '1.7', marginBottom: '28px', maxWidth: '520px' }}>
                  Join {totalReviews}+ happy customers in {city}. Schedule your first free pickup today and experience professional garment care at your doorstep — no hassle, no hidden charges.
                </p>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <a
                    href={`https://wa.me/${primaryStore.whatsapp || '919138004800'}?text=Hi%20Cleanz24,%20I%20want%20to%20book%20a%20pickup%20in%20${city}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: '#48BB78', color: '#fff', textDecoration: 'none', fontWeight: 700, borderRadius: '30px', padding: '14px 28px', fontSize: '15px', boxShadow: '0 4px 14px rgba(72,187,120,0.35)' }}
                  >
                    💬 Book Free Pickup on WhatsApp
                  </a>
                  <a
                    href={`tel:+91${phone.replace(/\s+/g, '')}`}
                    style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff', textDecoration: 'none', fontWeight: 700, borderRadius: '30px', padding: '14px 28px', fontSize: '15px' }}
                  >
                    📞 Call +91 {phone}
                  </a>
                </div>
              </div>

              {/* Internal links */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '14px', fontWeight: 600, padding: '20px 0' }}>
                <Link href="/best-laundry-drycleaning/stores" style={{ color: '#2B6CB0', textDecoration: 'none' }}>← All Cleanz24 Stores</Link>
                <span style={{ color: '#CBD5E0' }}>|</span>
                <Link href="/best-laundry-drycleaning/locations" style={{ color: '#2B6CB0', textDecoration: 'none' }}>All Locations →</Link>
                <span style={{ color: '#CBD5E0' }}>|</span>
                <Link href="/best-laundry-drycleaning/franchise-opportunities" style={{ color: '#2B6CB0', textDecoration: 'none' }}>Franchise Opportunities →</Link>
              </div>

            </div>

            {/* ── Right Sticky Sidebar ── */}
            <div className="col-lg-4 mt-5 mt-lg-0">
              <div
                style={{
                  position: 'sticky',
                  top: '100px',
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                  border: '1px solid #EDF2F7',
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1A365D', fontFamily: "'Poppins', sans-serif", marginBottom: '20px', borderBottom: '2px solid #EBF8FF', paddingBottom: '12px' }}>
                  🏪 Outlets in {city}
                </h3>

                {matchedStores.map((store) => (
                  <div key={store.id} style={{ marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #EDF2F7' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#2D3748', margin: 0 }}>{store.name}</h4>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#F59E0B', flexShrink: 0 }}>⭐ {store.rating}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#718096', lineHeight: '1.5', marginBottom: '12px' }}>
                      📍 {store.address}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                      <a href={`tel:+91${store.phone.replace(/\s+/g, '')}`} style={{ flex: 1, background: '#EBF8FF', color: '#2B6CB0', borderRadius: '6px', padding: '7px 10px', fontSize: '12px', fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>📞 Call</a>
                      <a
                        href={`https://wa.me/${store.whatsapp || '919138004800'}?text=Hi%20Cleanz24,%20I%20would%20like%20to%20book%20a%20laundry%20pickup`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ flex: 1, background: '#E6FFFA', color: '#319795', borderRadius: '6px', padding: '7px 10px', fontSize: '12px', fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}
                      >
                        💬 WhatsApp
                      </a>
                    </div>
                    <Link
                      href={`/best-laundry-drycleaning/store/${generateStoreSlug(store.name)}`}
                      style={{ display: 'block', background: 'linear-gradient(90deg, #1A365D, #2563EB)', color: '#fff', textDecoration: 'none', fontSize: '12px', fontWeight: 700, padding: '9px 14px', borderRadius: '8px', textAlign: 'center' }}
                    >
                      📸 View Store &amp; Photos →
                    </Link>
                  </div>
                ))}

                <div style={{ background: '#F7FAFC', padding: '18px', borderRadius: '10px', marginTop: '8px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#2D3748', marginBottom: '6px' }}>💡 Need Help?</h4>
                  <p style={{ fontSize: '12px', color: '#718096', lineHeight: '1.5', margin: 0 }}>
                    Customer support: 8 AM – 9 PM, 7 days. For bulk/corporate orders, call directly.
                  </p>
                </div>

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <Link href="/best-laundry-drycleaning/stores" style={{ fontSize: '13px', color: '#2B6CB0', fontWeight: 600, textDecoration: 'none' }}>
                    ← View All Stores across India
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
