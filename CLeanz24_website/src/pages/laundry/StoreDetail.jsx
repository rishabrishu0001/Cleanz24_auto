import React, { useState, useEffect } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { storesData } from '../../data';
import SEOMeta from '../../components/SEOMeta';

// ── Store-specific image imports ──────────────────────────────────
import ibNagarStorefront from '../../assets/cleanz24_ibnagar_storefront.jpeg';
import ibNagarDryCleaning from '../../assets/cleanz24_ibnagar_drycleaning_machines.jpeg';
import ibNagarExterior from '../../assets/cleanz24_ibnagar_store_exterior.jpeg';
import ibNagarReception from '../../assets/cleanz24_ibnagar_reception.jpeg';
import ibNagarMachines from '../../assets/cleanz24_ibnagar_machines_interior.jpeg';
import ibNagarStoreWide from '../../assets/cleanz24_ibnagar_store_wide.jpeg';
import ibNagarInteriorBranding from '../../assets/cleanz24_ibnagar_interior_branding.jpeg';
import ibNagarBanner from '../../assets/cleanz24_ibnagar_banner.jpeg';

// Churu
import churuStorefront from '../../assets/cleanz24_churu_storefront.jpeg';
import churuMachines from '../../assets/cleanz24_churu_machines.jpeg';
import churuDeliveryBag from '../../assets/cleanz24_churu_delivery_bag.jpeg';
import churuIroningStation from '../../assets/cleanz24_churu_ironing_station.jpeg';

// Siliguri
import siliguriSignboard from '../../assets/cleanz24_siliguri_signboard.jpeg';
import siliguriInterior from '../../assets/cleanz24_siliguri_interior.jpeg';
import siliguriMachines from '../../assets/cleanz24_siliguri_machines.jpeg';
import siliguriGarmentRack from '../../assets/cleanz24_siliguri_garment_rack.jpeg';
import siliguriPackaging from '../../assets/cleanz24_siliguri_packaging.jpeg';

// Padmanabhanagar Bengaluru
import padmanabhanagarEntrance from '../../assets/cleanz24_padmanabhanagar_entrance.jpeg';
import padmanabhanagarSignboard from '../../assets/cleanz24_padmanabhanagar_signboard.jpeg';
import padmanabhanagarStandee from '../../assets/cleanz24_padmanabhanagar_standee.jpeg';
import padmanabhanagarReception from '../../assets/cleanz24_padmanabhanagar_reception.jpeg';
import padmanabhanagarInterior from '../../assets/cleanz24_padmanabhanagar_interior.jpeg';
import padmanabhanagarComputerDesk from '../../assets/cleanz24_padmanabhanagar_computer_desk.jpeg';
import padmanabhanagarGlassView from '../../assets/cleanz24_padmanabhanagar_glass_view.jpeg';
import padmanabhanagarMachinesRack from '../../assets/cleanz24_padmanabhanagar_machines_rack.jpeg';
import padmanabhanagarWallPoster from '../../assets/cleanz24_padmanabhanagar_wall_poster.jpeg';
import padmanabhanagarGlassEntrance from '../../assets/cleanz24_padmanabhanagar_glass_entrance.jpeg';

// Kharar Punjab
import khararWardrobe from '../../assets/cleanz24_kharar_wardrobe.jpeg';
import khararFootwear from '../../assets/cleanz24_kharar_footwear.jpeg';
import khararInterior from '../../assets/cleanz24_kharar_interior.jpeg';
import khararBlanketsStorage from '../../assets/cleanz24_kharar_blankets_storage.jpeg';
import khararMachines from '../../assets/cleanz24_kharar_machines.jpeg';
import khararFacade from '../../assets/cleanz24_kharar_facade.jpeg';
import khararDetergentBay from '../../assets/cleanz24_kharar_detergent_bay.jpeg';

// Thampanoor Trivandrum
import thampanoorStorefront from '../../assets/cleanz24_thampanoor_storefront.jpeg';
import thampanoorFabcareSpeedqueen from '../../assets/cleanz24_thampanoor_fabcare_speedqueen.jpeg';
import thampanoorLgMachines from '../../assets/cleanz24_thampanoor_lg_machines.jpeg';
import thampanoorIroningPress from '../../assets/cleanz24_thampanoor_ironing_press.jpeg';
import thampanoorStorage from '../../assets/cleanz24_thampanoor_storage.jpeg';

// Kowkoor Secunderabad
import kowkoorStorefront from '../../assets/cleanz24_kowkoor_storefront.jpeg';
import kowkoorReception from '../../assets/cleanz24_kowkoor_reception.jpeg';
import kowkoorLgMachines from '../../assets/cleanz24_kowkoor_lg_machines.jpeg';
import kowkoorSteamPress from '../../assets/cleanz24_kowkoor_steam_press.jpeg';
import kowkoorDetergentsShelf from '../../assets/cleanz24_kowkoor_detergents_shelf.jpeg';

// Kokapet Hyderabad
import kokapetStorefront from '../../assets/cleanz24_kokapet_storefront.jpeg';
import kokapetReception from '../../assets/cleanz24_kokapet_reception.jpeg';
import kokapetIroningTable from '../../assets/cleanz24_kokapet_ironing_table.jpeg';
import kokapetWallPoster from '../../assets/cleanz24_kokapet_wall_poster.jpeg';

// Nirala Aspire Noida Extension
import niralaAspireStorefront from '../../assets/cleanz24_nirala_aspire_storefront.jpeg';
import niralaAspireReception from '../../assets/cleanz24_nirala_aspire_reception.jpeg';
import niralaAspireInterior from '../../assets/cleanz24_nirala_aspire_interior.jpeg';
import niralaAspireSteamIroning from '../../assets/cleanz24_nirala_aspire_steam_ironing.jpeg';
import niralaAspireCounter from '../../assets/cleanz24_nirala_aspire_counter.jpeg';
import niralaAspireExpressBanner from '../../assets/cleanz24_nirala_aspire_express_banner.jpeg';
import niralaAspireLoungeShelving from '../../assets/cleanz24_nirala_aspire_lounge_shelving.jpeg';

// Gurugram Sector 52
import gurugramSec52Facade from '../../assets/cleanz24_gurugram_sec52_facade.jpeg';
import gurugramSec52Reception from '../../assets/cleanz24_gurugram_sec52_reception.jpeg';
import gurugramSec52MachinesInterior from '../../assets/cleanz24_gurugram_sec52_machines_interior.jpeg';
import gurugramSec52DeskWorkstation from '../../assets/cleanz24_gurugram_sec52_desk_workstation.jpeg';
import gurugramSec52ShelvingHall from '../../assets/cleanz24_gurugram_sec52_shelving_hall.jpeg';

// Swarn Nagari Greater Noida (Swarn Plaza)
import swarnNagariPlazaFacade from '../../assets/cleanz24_swarn_nagari_plaza_facade.jpeg';
import swarnNagariPanoramaInterior from '../../assets/cleanz24_swarn_nagari_panorama_interior.jpeg';
import swarnNagariReceptionDesk from '../../assets/cleanz24_swarn_nagari_reception_desk.jpeg';
import swarnNagariDisplayShelves from '../../assets/cleanz24_swarn_nagari_display_shelves.jpeg';
import swarnNagariCounterBanner from '../../assets/cleanz24_swarn_nagari_counter_banner.jpeg';

// Noida Sector 41
import noidaSec41Facade from '../../assets/cleanz24_noida_sec41_facade.jpeg';
import noidaSec41Entrance from '../../assets/cleanz24_noida_sec41_entrance.jpeg';
import noidaSec41SteamIroning from '../../assets/cleanz24_noida_sec41_steam_ironing.jpeg';
import noidaSec41Counter from '../../assets/cleanz24_noida_sec41_counter.jpeg';
import noidaSec41Staff from '../../assets/cleanz24_noida_sec41_staff.jpeg';
import noidaSec41Machines from '../../assets/cleanz24_noida_sec41_machines.jpeg';
import noidaSec41Reception from '../../assets/cleanz24_noida_sec41_reception.jpeg';
import noidaSec41Shelving from '../../assets/cleanz24_noida_sec41_shelving.jpeg';
import noidaSec41Interior from '../../assets/cleanz24_noida_sec41_interior.jpeg';

// Wakad Pune
import wakadPuneSignboard from '../../assets/cleanz24_wakad_pune_signboard.jpg';
import wakadPuneStorefrontEntrance from '../../assets/cleanz24_wakad_pune_storefront_entrance.jpg';
import wakadPuneDeliveryCounter from '../../assets/cleanz24_wakad_pune_delivery_counter.jpg';
import wakadPuneLgMachines from '../../assets/cleanz24_wakad_pune_lg_machines.jpg';
import wakadPuneReceptionDesk from '../../assets/cleanz24_wakad_pune_reception_desk.jpg';

// Map of store id -> image arrays (add more stores here as images are added)
const STORE_IMAGES = {
  36: [
    wakadPuneSignboard,
    wakadPuneStorefrontEntrance,
    wakadPuneDeliveryCounter,
    wakadPuneLgMachines,
    wakadPuneReceptionDesk,
  ],
  1: [
    noidaSec41Facade,
    noidaSec41Entrance,
    noidaSec41SteamIroning,
    noidaSec41Counter,
    noidaSec41Staff,
    noidaSec41Machines,
    noidaSec41Reception,
    noidaSec41Shelving,
    noidaSec41Interior,
  ],
  6: [
    swarnNagariPlazaFacade,
    swarnNagariPanoramaInterior,
    swarnNagariReceptionDesk,
    swarnNagariDisplayShelves,
    swarnNagariCounterBanner,
  ],
  15: [
    gurugramSec52Facade,
    gurugramSec52Reception,
    gurugramSec52DeskWorkstation,
    gurugramSec52ShelvingHall,
    gurugramSec52MachinesInterior,
  ],
  5: [
    niralaAspireStorefront,
    niralaAspireExpressBanner,
    niralaAspireReception,
    niralaAspireInterior,
    niralaAspireLoungeShelving,
    niralaAspireSteamIroning,
    niralaAspireCounter,
  ],
  66: [
    kokapetStorefront,
    kokapetReception,
    kokapetIroningTable,
    kokapetWallPoster,
  ],
  68: [
    kowkoorStorefront,
    kowkoorReception,
    kowkoorLgMachines,
    kowkoorSteamPress,
    kowkoorDetergentsShelf,
  ],
  42: [
    thampanoorStorefront,
    thampanoorFabcareSpeedqueen,
    thampanoorLgMachines,
    thampanoorIroningPress,
    thampanoorStorage,
  ],
  19: [
    khararFacade,
    khararInterior,
    khararMachines,
    khararWardrobe,
    khararBlanketsStorage,
    khararDetergentBay,
    khararFootwear,
  ],
  52: [
    padmanabhanagarStandee,
    padmanabhanagarSignboard,
    padmanabhanagarEntrance,
    padmanabhanagarGlassEntrance,
    padmanabhanagarComputerDesk,
    padmanabhanagarReception,
    padmanabhanagarGlassView,
    padmanabhanagarMachinesRack,
    padmanabhanagarWallPoster,
    padmanabhanagarInterior,
  ],
  69: [
    ibNagarStorefront,
    ibNagarStoreWide,
    ibNagarDryCleaning,
    ibNagarExterior,
    ibNagarReception,
    ibNagarInteriorBranding,
    ibNagarMachines,
    ibNagarBanner,
  ],
  70: [
    churuStorefront,
    churuMachines,
    churuDeliveryBag,
    churuIroningStation,
  ],
  20: [
    siliguriSignboard,
    siliguriInterior,
    siliguriMachines,
    siliguriGarmentRack,
    siliguriPackaging,
  ],
};

// ── Slug generator ────────────────────────────────────────────────
export const generateStoreSlug = (name) => {
  const cleanLoc = name
    .replace(/^Cleanz24\s*-\s*/i, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  return `best-laundry-drycleaning-services-${cleanLoc}`;
};

const getShortSlug = (name) =>
  name
    .replace(/^Cleanz24\s*-\s*/i, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const storeLocation = (name) => name.replace(/^Cleanz24\s*-\s*/i, '').trim();
const extractPincode = (address) => { const m = address.match(/\b\d{6}\b/); return m ? m[0] : ''; };

// ── Dynamic SEO & Schema ──────────────────────────────────────────
const buildMetaTitle = (s) => `Laundry & Dry Cleaning in ${storeLocation(s.name)} | Cleanz24`;
const buildMetaDesc = (s) =>
  `Cleanz24 ${storeLocation(s.name)} offers wash & fold, dry cleaning and steam ironing with doorstep pickup & delivery. Eco-friendly process. Book online today. Located at ${s.city}, ${s.state}.`;
const buildKeywords = (s) => {
  const loc = storeLocation(s.name);
  return [
    `laundry service ${loc}`, `dry cleaning ${loc}`, `laundry near me ${s.city}`,
    `laundry pickup and delivery ${s.city}`, `Cleanz24 ${s.city}`, `wash and fold ${s.city}`,
    `dry clean ${s.city}`, `steam ironing ${s.city}`, `Cleanz24 ${loc}`,
    `laundry ${s.state}`, `stain removal ${s.city}`, `curtain dry cleaning ${s.city}`,
    `shoe cleaning ${s.city}`, `carpet dry cleaning ${s.city}`,
  ].join(', ');
};

const buildSchema = (s, slug) => [
  {
    '@context': 'https://schema.org', '@type': 'DryCleaningOrLaundry',
    '@id': `https://cleanz24.com/laundry/store/${slug}`,
    name: s.name,
    description: `Professional laundry and dry cleaning in ${s.city}. Services: wash & fold, dry cleaning, steam ironing, stain removal, doorstep pickup & delivery.`,
    url: `https://cleanz24.com/laundry/store/${slug}`,
    telephone: '+919138004800', email: 'happy2helpu@cleanz24.com',
    priceRange: '₹₹', paymentAccepted: 'Cash, UPI, Credit Card, Debit Card',
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.address.split(',').slice(0, -3).join(',').trim(),
      addressLocality: s.city, addressRegion: s.state,
      postalCode: extractPincode(s.address), addressCountry: 'IN',
    },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: s.rating, reviewCount: s.reviews, bestRating: 5 },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '09:00', closes: '21:00' },
    ],
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.name+' '+s.address)}`,
    sameAs: ['https://www.instagram.com/cleanz24india/', 'https://www.facebook.com/share/1D2QDyaHBG/'],
  },
  {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: `Does Cleanz24 offer doorstep pickup in ${storeLocation(s.name)}?`, acceptedAnswer: { '@type': 'Answer', text: `Yes. Book through the Cleanz24 app or WhatsApp and your laundry is collected from your door in ${s.city}, cleaned, and delivered back with real-time tracking.` } },
      { '@type': 'Question', name: `What services are available at Cleanz24 ${storeLocation(s.name)}?`, acceptedAnswer: { '@type': 'Answer', text: `Wash & fold, dry cleaning, steam ironing, stain removal, curtain cleaning, carpet cleaning and shoe laundry — all at ${s.address}.` } },
      { '@type': 'Question', name: `Where is Cleanz24 ${storeLocation(s.name)} located?`, acceptedAnswer: { '@type': 'Answer', text: s.address } },
      { '@type': 'Question', name: `How do I book a laundry pickup in ${s.city}?`, acceptedAnswer: { '@type': 'Answer', text: `Book online on the Cleanz24 app or website, or WhatsApp us at +91 91380 04800 to choose a pickup slot.` } },
      { '@type': 'Question', name: `Is Cleanz24 eco-friendly?`, acceptedAnswer: { '@type': 'Answer', text: `Yes — Cleanz24 uses German eco-friendly detergents and Woolmark certified machinery designed to reduce water and energy consumption.` } },
    ],
  },
];

// ── Service Data ──────────────────────────────────────────────────
const EXPERT_SERVICES = [
  { icon: '🧺', title: 'Laundry', desc: 'Wash & Fold | Wash & Steam Iron', tag: 'Everyday Care' },
  { icon: '👔', title: 'Dry Cleaning', desc: 'Designer Wear, Heavy Ethnic Wear & Woollens', tag: 'Delicate Care' },
  { icon: '👟', title: 'Shoe Cleaning', desc: 'Shoe Cleaning, Restoration & Protection', tag: 'Footwear Care' },
  { icon: '🧥', title: 'Leather Cleaning', desc: 'Shoes, Handbags, Jackets, Wallets & Belts', tag: 'Leather Care' },
  { icon: '🛁', title: 'Curtain Cleaning', desc: 'Silk, Cotton, Velvet, Chenille & Black Out Curtains', tag: 'Home Linen' },
  { icon: '🛋️', title: 'Carpet Cleaning', desc: 'Persian, Silk, Turkish & Wool Carpets', tag: 'Home Decor' },
];

const QUALITY_FEATURES = [
  {
    icon: '⚙️',
    title: 'Hohenstein Certified Machinery',
    desc: 'Advanced wash cycles designed to prevent color bleeding and fabric shrinkage.'
  },
  {
    icon: '🧶',
    title: 'Woolmark Certified Machinery',
    desc: 'Specialized wool care program for ultra-delicate woolens and cashmere.'
  },
  {
    icon: '✨',
    title: 'Hygiene in Focus',
    desc: '100% separate wash cycle for each customer with antibacterial sanitization.'
  },
  {
    icon: '🧴',
    title: 'German Eco-Friendly Detergents',
    desc: 'Non-toxic, biodegradable solutions that are tough on stains and soft on clothes.'
  }
];

const CUSTOMER_REVIEWS = (loc, city) => [
  { name: 'Peter Reuner', date: '2024-11-10', rating: 5, text: `Exceptional service at Cleanz24 ${loc}! They restored my delicate white shirt and suit to brand-new condition. Best dry cleaners in ${city}.` },
  { name: 'Momal Kumari', date: '2024-10-15', rating: 5, text: `Got carpet dry cleaning done from Cleanz24 ${loc}. The results are incredible! Soft, fresh, and completely stain-free.` },
  { name: 'Punit Verma', date: '2024-09-28', rating: 5, text: `Super professional staff and rapid turnaround. The steam ironing is crisp and doorstep pickup was right on time.` },
  { name: 'Neha Khatri', date: '2024-08-12', rating: 5, text: `Best canvas and leather shoe cleaning in ${city}! Sent my favorite sneakers and they came back looking fresh out of the box.` },
  { name: 'Anil Rana', date: '2024-07-04', rating: 5, text: `I have been using Cleanz24 for over a year now. Reliable, eco-friendly, and very affordable pricing for dry cleaning!` }
];

const FAQ_DATA = (s) => [
  {
    q: `Does Cleanz24 offer doorstep pickup and delivery in ${storeLocation(s.name)}?`,
    a: `Yes! Book a free pickup through the Cleanz24 website or WhatsApp, and our rider will collect your laundry directly from your doorstep in ${s.city}.`
  },
  {
    q: `What laundry and dry cleaning services are available at ${storeLocation(s.name)}?`,
    a: `We offer Wash & Fold, Wash & Steam Iron, Premium Dry Cleaning, Shoe Restoration, Leather Care, Curtain & Carpet Cleaning at ${s.address}.`
  },
  {
    q: `Where exactly is the Cleanz24 ${storeLocation(s.name)} store located?`,
    a: s.address
  },
  {
    q: `How long does standard laundry or dry cleaning take?`,
    a: `Regular laundry & dry cleaning takes 24–48 hours. We also offer 24-hour Express Delivery for urgent orders.`
  },
  {
    q: `Is Cleanz24 eco-friendly and safe for clothes?`,
    a: `Yes! We use German eco-friendly cleaning solutions and Woolmark certified machinery to ensure zero color bleeding or fabric damage.`
  }
];

// ── Helper UI Components ──────────────────────────────────────────
const StarRow = ({ rating }) => (
  <span style={{ display: 'inline-flex', gap: '2px', color: '#F59E0B' }}>
    {[1, 2, 3, 4, 5].map((st) => (
      <span key={st}>{st <= Math.round(rating) ? '★' : '☆'}</span>
    ))}
  </span>
);

const GoogleLogo = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
  </svg>
);

const RealWhatsAppIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zm5.83 14.09c-.25.7-.1.97-.24 1.45-.33 1.15-1.35 1.77-2.38 1.95-1.12.19-2.3-.22-3.32-.73-2.18-1.09-3.9-2.81-4.99-4.99-.51-1.02-.92-2.2-.73-3.32.18-1.03.8-2.05 1.95-2.38.48-.14.75.01 1.45-.24.28.56.84 1.68 1.12 2.24.14.28.01.56-.14.84-.28.56-.84 1.12-.56 1.4.56 1.12 1.4 1.96 2.52 2.52.28.28.84-.28 1.4-.56.28-.14.56-.28.84-.14.56.28 1.68.84 2.24 1.12.25.14.39.42.24.71z" />
  </svg>
);

const RealPhoneIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.45 2 2 0 0 1 3.59 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
  </svg>
);

const RealTruckIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <rect x="1" y="3" width="15" height="13" rx="2" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const RealMapPinIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function StoreDetail() {
  const { storeSlug } = useParams();
  const { isDarkMode } = useOutletContext() || {};
  const [openFaq, setOpenFaq] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const store = storesData.find(
    (s) => generateStoreSlug(s.name) === storeSlug || getShortSlug(s.name) === storeSlug
  );

  const theme = {
    bg: isDarkMode ? '#070F1E' : '#FFFFFF',
    bgAlt: isDarkMode ? '#0D1F35' : '#F8FAFC',
    card: isDarkMode ? '#132845' : '#FFFFFF',
    border: isDarkMode ? '#1E3A5F' : '#E2E8F0',
    text: isDarkMode ? '#F1F5F9' : '#1E293B',
    muted: isDarkMode ? '#94A3B8' : '#64748B',
    primary: '#2563EB',
    primaryGrad: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
    accentGreen: '#16A34A',
    accentOrange: '#EA580C',
    accentPurple: '#7C3AED',
  };

  if (!store) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme.bg, padding: '40px 20px' }}>
        <SEOMeta title="Store Not Found | Cleanz24" description="Store details not found." />
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📍</div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: theme.text, marginBottom: '12px' }}>Store Not Found</h1>
          <p style={{ color: theme.muted, marginBottom: '24px' }}>We couldn't find the requested store location.</p>
          <Link to="/laundry/stores" style={{ background: theme.primary, color: '#fff', textDecoration: 'none', borderRadius: '30px', padding: '12px 28px', fontWeight: 700 }}>
            View All Stores
          </Link>
        </div>
      </div>
    );
  }

  const slug = generateStoreSlug(store.name);
  const loc = storeLocation(store.name);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + ' ' + store.address)}`;
  const waMsg = encodeURIComponent(`Hi Cleanz24! I want to book laundry pickup from your ${store.name} store in ${store.city}.`);
  const reviews = CUSTOMER_REVIEWS(loc, store.city);
  const faqs = FAQ_DATA(store);
  const areasServed = store.areasServed || [...new Set([store.city, ...(store.tags || []).filter(t => !['Delhi NCR', 'Delhi', 'NCR'].includes(t))])];
  const storeImages = STORE_IMAGES[store.id] || [];

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, color: theme.text, fontFamily: "'Inter', sans-serif" }}>
      <SEOMeta
        title={buildMetaTitle(store)}
        description={buildMetaDesc(store)}
        keywords={buildKeywords(store)}
        canonical={`https://cleanz24.com/laundry/store/${slug}`}
        schema={buildSchema(store, slug)}
      />

      {/* ── STICKY BOTTOM BAR (MOBILE) ── */}
      <div className="d-md-none" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999, background: theme.card, borderTop: `1px solid ${theme.border}`, padding: '10px 16px', display: 'flex', gap: '8px', boxShadow: '0 -4px 20px rgba(0,0,0,0.15)' }}>
        <a href={`https://wa.me/919138004800?text=${waMsg}`} target="_blank" rel="noreferrer" style={{ flex: 1, background: '#25D366', color: '#fff', textAlign: 'center', padding: '10px', borderRadius: '10px', fontWeight: 700, fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <RealWhatsAppIcon size={18} color="#fff" />
          <span>WhatsApp</span>
        </a>
        <a href="tel:+919138004800" style={{ flex: 1, background: theme.primary, color: '#fff', textAlign: 'center', padding: '10px', borderRadius: '10px', fontWeight: 700, fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <RealPhoneIcon size={16} color="#fff" />
          <span>Call Store</span>
        </a>
        <a href={mapsUrl} target="_blank" rel="noreferrer" style={{ background: theme.bgAlt, color: theme.text, border: `1px solid ${theme.border}`, padding: '10px 14px', borderRadius: '10px', fontWeight: 700, fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <RealMapPinIcon size={16} color={theme.primary} />
          <span>Map</span>
        </a>
      </div>

      {/* ── SECTION 1: HERO BANNER (TumbleDry Style) ── */}
      <section style={{ background: theme.primaryGrad, color: '#fff', padding: '48px 20px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div style={{ fontSize: '13px', opacity: 0.8, marginBottom: '24px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Link to="/laundry" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link> › 
            <Link to="/laundry/stores" style={{ color: '#fff', textDecoration: 'none' }}>Stores</Link> › 
            <span style={{ fontWeight: 700 }}>{loc}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'center' }}>
            <div>
              <span style={{ background: 'rgba(255,255,255,0.15)', color: '#FFD700', padding: '6px 16px', borderRadius: '30px', fontSize: '13px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '16px' }}>
                ⭐ India's No. 1 Premium Laundry Studio
              </span>
              <h1 style={{ fontSize: 'clamp(26px, 4.5vw, 42px)', fontWeight: 900, lineHeight: 1.25, marginBottom: '16px', fontFamily: "'Poppins', sans-serif" }}>
                Cleanz24 Dry Clean &amp; Laundry Store
                <span style={{ display: 'block', color: '#93C5FD', fontSize: '0.85em', marginTop: '6px' }}>NOW AT {loc}</span>
              </h1>
              <p style={{ fontSize: '17px', opacity: 0.9, marginBottom: '24px', fontWeight: 500 }}>
                <strong>100+ Franchise Outlets</strong> across multiple cities in India
              </p>
              
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href={`https://wa.me/919138004800?text=${waMsg}`} target="_blank" rel="noreferrer" style={{ background: '#25D366', color: '#fff', padding: '12px 24px', borderRadius: '30px', fontWeight: 800, textDecoration: 'none', boxShadow: '0 4px 15px rgba(37,211,102,0.3)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <RealWhatsAppIcon size={20} color="#fff" /> Book via WhatsApp
                </a>
                <a href="tel:+919138004800" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '12px 24px', borderRadius: '30px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <RealPhoneIcon size={18} color="#fff" /> Call Store
                </a>
              </div>
            </div>

            {/* Quick Hero Card */}
            <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '28px' }}>
              <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8, marginBottom: '8px' }}>📍 Store Location</div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>{store.name}</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.6, opacity: 0.9, marginBottom: '20px' }}>{store.address}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px' }}>
                <div>
                  <div style={{ fontSize: '11px', opacity: 0.7, textTransform: 'uppercase' }}>Working Hours</div>
                  <div style={{ fontWeight: 700, fontSize: '14px', marginTop: '2px' }}>9:00 AM – 9:00 PM</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', opacity: 0.7, textTransform: 'uppercase' }}>Rating</div>
                  <div style={{ fontWeight: 800, fontSize: '14px', color: '#FCD34D', marginTop: '2px' }}>{store.rating} ★ ({store.reviews} reviews)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: STORE TIMETABLE & ACTION BUTTONS ── */}
      <section style={{ padding: '40px 20px', background: theme.bgAlt, borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            
            {/* Left Col: Details */}
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: theme.text, marginBottom: '8px' }}>
                Cleanz24 {loc}, {store.city}
              </h2>
              <p style={{ color: theme.muted, fontSize: '14px', marginBottom: '20px' }}>
                {store.address}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
                <div style={{ background: theme.card, padding: '14px', borderRadius: '12px', border: `1px solid ${theme.border}`, textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>📞</div>
                  <div style={{ fontSize: '11px', color: theme.muted }}>Phone</div>
                  <div style={{ fontWeight: 700, fontSize: '13px', marginTop: '2px' }}>+91 91380 04800</div>
                </div>
                <div style={{ background: theme.card, padding: '14px', borderRadius: '12px', border: `1px solid ${theme.border}`, textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>⏰</div>
                  <div style={{ fontSize: '11px', color: theme.muted }}>Timings</div>
                  <div style={{ fontWeight: 700, fontSize: '13px', marginTop: '2px' }}>9:00 AM - 9:00 PM</div>
                </div>
                <div style={{ background: theme.card, padding: '14px', borderRadius: '12px', border: `1px solid ${theme.border}`, textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>🗓️</div>
                  <div style={{ fontSize: '11px', color: theme.muted }}>Availability</div>
                  <div style={{ fontWeight: 700, fontSize: '13px', marginTop: '2px', color: theme.accentGreen }}>Open All Days</div>
                </div>
                <div style={{ background: theme.card, padding: '14px', borderRadius: '12px', border: `1px solid ${theme.border}`, textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>👥</div>
                  <div style={{ fontSize: '11px', color: theme.muted }}>Network</div>
                  <div style={{ fontWeight: 700, fontSize: '13px', marginTop: '2px' }}>100+ Outlets</div>
                </div>
              </div>
            </div>

            {/* Right Col: Rating & 4 Main Buttons */}
            <div style={{ background: theme.card, borderRadius: '16px', padding: '24px', border: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: `1px solid ${theme.border}`, paddingBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: theme.muted, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <GoogleLogo size={18} /> Google Rating
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <span style={{ fontSize: '24px', fontWeight: 900, color: theme.text }}>{store.rating}</span>
                    <StarRow rating={store.rating} />
                    <span style={{ color: theme.muted, fontSize: '13px' }}>({store.reviews} reviews)</span>
                  </div>
                </div>
                <a href={mapsUrl} target="_blank" rel="noreferrer" style={{ background: theme.bgAlt, color: theme.primary, border: `1px solid ${theme.border}`, padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, textDecoration: 'none' }}>
                  ✍️ Write Review
                </a>
              </div>

              {/* 4 Call-to-action buttons (Redesigned with SVG icons) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <motion.a
                  href={`https://wa.me/919138004800?text=${waMsg}`}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    color: '#ffffff',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '14px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.28)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <RealWhatsAppIcon size={20} color="#ffffff" />
                  <span>WhatsApp</span>
                </motion.a>

                <motion.a
                  href="tel:+919138004800"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                    color: '#ffffff',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '14px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.28)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <RealPhoneIcon size={18} color="#ffffff" />
                  <span>Call Now</span>
                </motion.a>

                <motion.a
                  href={`https://wa.me/919138004800?text=${waMsg}`}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)',
                    color: '#ffffff',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '14px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(234, 88, 12, 0.28)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <RealTruckIcon size={19} color="#ffffff" />
                  <span>Free Pickup</span>
                </motion.a>

                <motion.a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: theme.bgAlt,
                    color: theme.text,
                    border: `1.5px solid ${theme.border}`,
                    padding: '14px 16px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '14px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <RealMapPinIcon size={18} color={theme.primary} />
                  <span>Directions</span>
                </motion.a>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ── SECTION 2b: STORE PHOTO GALLERY (only when images exist) ── */}
      {storeImages.length > 0 && (
        <section style={{ padding: '36px 20px', background: theme.bg, borderBottom: `1px solid ${theme.border}` }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 900, color: theme.text, fontFamily: "'Poppins', sans-serif" }}>
                📸 Store Photos
              </h2>
              <div style={{ width: '40px', height: '3px', background: theme.primary, margin: '6px auto 0', borderRadius: '2px' }} />
            </div>

            {/* Compact Photo Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
              {storeImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => { setActiveImg(idx); setLightbox(true); }}
                  style={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    height: '175px',
                    border: `1.5px solid ${theme.border}`,
                    boxShadow: isDarkMode ? '0 2px 12px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.07)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    position: 'relative',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = isDarkMode ? '0 6px 24px rgba(0,0,0,0.5)' : '0 6px 20px rgba(0,0,0,0.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = isDarkMode ? '0 2px 12px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.07)'; }}
                >
                  <img
                    src={img}
                    alt={`${store.name} - Photo ${idx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  {/* Zoom hint overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.15)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0)'}
                  >
                    <span style={{ fontSize: '22px', opacity: 0, transition: 'opacity 0.2s' }}>🔍</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'right', marginTop: '8px', fontSize: '12px', color: theme.muted }}>
              Click any photo to enlarge
            </div>
          </div>

          {/* Lightbox Modal */}
          {lightbox && (
            <div
              onClick={() => setLightbox(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: 'rgba(0,0,0,0.92)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '20px',
              }}
            >
              <button onClick={e => { e.stopPropagation(); setActiveImg(i => (i - 1 + storeImages.length) % storeImages.length); }} style={{ position: 'absolute', left: '16px', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: '28px', borderRadius: '50%', width: '52px', height: '52px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
              <img
                src={storeImages[activeImg]}
                alt="Store photo"
                onClick={e => e.stopPropagation()}
                style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: '14px', boxShadow: '0 20px 80px rgba(0,0,0,0.8)', objectFit: 'contain' }}
              />
              <button onClick={e => { e.stopPropagation(); setActiveImg(i => (i + 1) % storeImages.length); }} style={{ position: 'absolute', right: '16px', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: '28px', borderRadius: '50%', width: '52px', height: '52px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
              <button onClick={() => setLightbox(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: '20px', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              <div style={{ position: 'absolute', bottom: '24px', color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>{activeImg + 1} / {storeImages.length}</div>
            </div>
          )}
        </section>
      )}


      {/* ── SECTION 3: OUR EXPERT SERVICES ── */}
      <section style={{ padding: '60px 20px', background: theme.bg }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: theme.text, fontFamily: "'Poppins', sans-serif" }}>
              OUR EXPERT SERVICES
            </h2>
            <div style={{ width: '60px', height: '4px', background: theme.primary, margin: '8px auto 16px', borderRadius: '2px' }} />
            <p style={{ color: theme.muted, fontSize: '15px', maxWidth: '600px', margin: '0 auto' }}>
              Cleanz24 store in {loc}, {store.city} is your one-stop shop for all your laundry, dry cleaning, footwear and home care needs.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {EXPERT_SERVICES.map((svc, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                style={{ background: theme.card, borderRadius: '16px', padding: '24px', border: `1px solid ${theme.border}`, boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.2)' : '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', gap: '16px', alignItems: 'flex-start' }}
              >
                <div style={{ fontSize: '36px', background: theme.bgAlt, padding: '12px', borderRadius: '14px', flexShrink: 0 }}>
                  {svc.icon}
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: theme.primary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{svc.tag}</span>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: theme.text, marginTop: '2px', marginBottom: '6px' }}>{svc.title}</h3>
                  <p style={{ fontSize: '13px', color: theme.muted, margin: 0, lineHeight: 1.5 }}>{svc.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action strip under services */}
          <div style={{ textAlign: 'center', marginTop: '36px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/919138004800?text=${waMsg}`} target="_blank" rel="noreferrer" style={{ background: '#25D366', color: '#fff', padding: '12px 28px', borderRadius: '30px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              💬 Chat On WhatsApp
            </a>
            <a href="tel:+919138004800" style={{ background: theme.primary, color: '#fff', padding: '12px 28px', borderRadius: '30px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              🚚 Schedule Free Pickup
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: IMPECCABLE QUALITY, EVERYTIME! ── */}
      <section style={{ padding: '60px 20px', background: theme.bgAlt, borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '36px', alignItems: 'center' }}>
            
            {/* 4 Feature Boxes */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {QUALITY_FEATURES.map((feat, i) => (
                <div key={i} style={{ background: theme.card, padding: '20px', borderRadius: '16px', border: `1px solid ${theme.border}` }}>
                  <div style={{ fontSize: '28px', marginBottom: '10px' }}>{feat.icon}</div>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: theme.text, marginBottom: '6px' }}>{feat.title}</h4>
                  <p style={{ fontSize: '12px', color: theme.muted, margin: 0, lineHeight: 1.5 }}>{feat.desc}</p>
                </div>
              ))}
            </div>

            {/* Right Quality Narrative */}
            <div>
              <span style={{ color: theme.primary, fontWeight: 800, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>Global Standards</span>
              <h2 style={{ fontSize: '26px', fontWeight: 900, color: theme.text, margin: '8px 0 16px', fontFamily: "'Poppins', sans-serif" }}>
                IMPECCABLE QUALITY, EVERYTIME!
              </h2>
              <p style={{ color: theme.muted, fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
                Cleanz24 {loc}, {store.city} store is equipped with world-class laundry machinery and German eco-friendly cleaning solutions to deliver fresh, hygienic, and sparkling clothes with zero shrinkage or color loss!
              </p>
              <a href={`https://wa.me/919138004800?text=${waMsg}`} target="_blank" rel="noreferrer" style={{ background: theme.primary, color: '#fff', padding: '12px 28px', borderRadius: '30px', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
                Book Doorstep Pickup
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 5: CUSTOMER REVIEWS & RATINGS ── */}
      <section style={{ padding: '60px 20px', background: theme.bg }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: theme.text, fontFamily: "'Poppins', sans-serif" }}>
              CUSTOMER REVIEWS &amp; RATINGS
            </h2>
            <div style={{ width: '60px', height: '4px', background: theme.primary, margin: '8px auto 16px', borderRadius: '2px' }} />
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: theme.bgAlt, padding: '8px 20px', borderRadius: '30px', border: `1px solid ${theme.border}` }}>
              <GoogleLogo size={20} />
              <span style={{ fontSize: '18px', fontWeight: 800 }}>{store.rating}</span>
              <StarRow rating={store.rating} />
              <span style={{ color: theme.muted, fontSize: '13px' }}>Google Verified Reviews</span>
            </div>
          </div>

          {/* Review Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {reviews.map((rev, i) => (
              <div key={i} style={{ background: theme.card, borderRadius: '16px', padding: '24px', border: `1px solid ${theme.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ fontWeight: 800, fontSize: '15px', color: theme.text, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <GoogleLogo size={14} /> {rev.name}
                  </div>
                  <StarRow rating={rev.rating} />
                </div>
                <p style={{ fontSize: '13px', color: theme.muted, lineHeight: 1.6, marginBottom: '12px' }}>"{rev.text}"</p>
                <div style={{ fontSize: '11px', color: theme.muted, opacity: 0.7 }}>Posted on: {rev.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: REGULAR VS EXPRESS DELIVERY COMPARISON ── */}
      <section style={{ padding: '60px 20px', background: theme.bgAlt, borderTop: `1px solid ${theme.border}` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: theme.text, fontFamily: "'Poppins', sans-serif" }}>
              BEST LAUNDRY &amp; DRY CLEAN SERVICE WITH FREE HOME DELIVERY
            </h2>
            <p style={{ color: theme.muted, fontSize: '14px', marginTop: '8px' }}>
              Cleanz24 {loc} provides free doorstep pickup &amp; delivery at your preferred slot.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
            {/* Regular Delivery */}
            <div style={{ background: theme.card, borderRadius: '16px', padding: '28px', border: `1px solid ${theme.border}`, textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📦</div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: theme.text, marginBottom: '8px' }}>Regular Delivery</h3>
              <div style={{ fontSize: '24px', fontWeight: 900, color: theme.primary, marginBottom: '16px' }}>24 - 48 Hours</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', fontSize: '13px', color: theme.muted, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li>✅ Free Doorstep Pickup &amp; Delivery</li>
                <li>✅ 100% Separate Wash Cycle</li>
                <li>✅ Eco-Friendly German Detergents</li>
                <li>✅ Steam Iron &amp; Protective Hanger Packing</li>
              </ul>
            </div>

            {/* Express Delivery */}
            <div style={{ background: theme.card, borderRadius: '16px', padding: '28px', border: `2px solid ${theme.primary}`, textAlign: 'center', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: theme.primary, color: '#fff', fontSize: '11px', fontWeight: 800, padding: '4px 16px', borderRadius: '20px', textTransform: 'uppercase' }}>
                ⚡ Super Fast
              </span>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🚀</div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: theme.text, marginBottom: '8px' }}>Express Delivery</h3>
              <div style={{ fontSize: '24px', fontWeight: 900, color: theme.accentOrange, marginBottom: '16px' }}>Same Day / 24 Hours</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', fontSize: '13px', color: theme.muted, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li>⚡ Priority Processing &amp; Fast Wash</li>
                <li>✅ Free Doorstep Pickup &amp; Express Delivery</li>
                <li>✅ Sanitized &amp; Premium Steam Press</li>
                <li>✅ Real-Time SMS &amp; WhatsApp Tracking</li>
              </ul>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <a href={`https://wa.me/919138004800?text=${waMsg}`} target="_blank" rel="noreferrer" style={{ background: theme.primary, color: '#fff', padding: '14px 36px', borderRadius: '30px', fontWeight: 800, textDecoration: 'none', display: 'inline-block' }}>
              Book Pickup Now
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: FREQUENTLY ASKED QUESTIONS (FAQ) ── */}
      <section style={{ padding: '60px 20px', background: theme.bg }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: theme.text, fontFamily: "'Poppins', sans-serif" }}>
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <div style={{ width: '60px', height: '4px', background: theme.primary, margin: '8px auto 16px', borderRadius: '2px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '12px', overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', padding: '18px 20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: theme.text, fontWeight: 700, fontSize: '15px' }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '18px', color: theme.primary }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 20px 18px', color: theme.muted, fontSize: '14px', lineHeight: 1.6, borderTop: `1px solid ${theme.border}`, paddingTop: '12px' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: CLEANZ24 STORES NEAR YOU ── */}
      <StoresNearYouSection currentStoreSlug={slug} isDarkMode={isDarkMode} theme={theme} />

      {/* ── SECTION 9: LOCALITY & CITY LINKS ── */}
      <section style={{ padding: '40px 20px', background: theme.bgAlt, borderTop: `1px solid ${theme.border}` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: theme.text, marginBottom: '14px' }}>
            📍 Nearby Localities Served in {store.city}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {areasServed.map((area, i) => (
              <span key={i} style={{ background: theme.card, border: `1px solid ${theme.border}`, padding: '6px 14px', borderRadius: '20px', fontSize: '12px', color: theme.muted, fontWeight: 600 }}>
                {area}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '14px', fontWeight: 700, paddingTop: '12px', borderTop: `1px solid ${theme.border}` }}>
            <Link to="/laundry/stores" style={{ color: theme.primary, textDecoration: 'none' }}>← View All Cleanz24 Stores</Link>
            <span style={{ color: theme.border }}>|</span>
            <Link to={`/laundry/${store.city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} style={{ color: theme.primary, textDecoration: 'none' }}>All Stores in {store.city} →</Link>
            <span style={{ color: theme.border }}>|</span>
            <Link to="/laundry/franchise" style={{ color: theme.primary, textDecoration: 'none' }}>Franchise Opportunities →</Link>
          </div>
        </div>
      </section>

    </div>
  );
}

// ── CLEANZ24 STORES NEAR YOU SUB-COMPONENT ────────────────────────
function StoresNearYouSection({ currentStoreSlug, isDarkMode, theme }) {
  const [search, setSearch] = useState('');

  const filteredStores = storesData.filter((s) => {
    const slug = generateStoreSlug(s.name);
    if (slug === currentStoreSlug) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q) ||
      s.state.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q)
    );
  }).slice(0, 3); // Display 3 nearby stores

  return (
    <section style={{ padding: '60px 20px', background: theme.bg, borderTop: `1px solid ${theme.border}` }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ color: theme.primary, fontWeight: 800, fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
            FIND STORES
          </div>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 900, color: theme.text, fontFamily: "'Poppins', sans-serif" }}>
            CLEANZ24 <span style={{ color: '#16A34A' }}>STORES NEAR YOU</span>
          </h2>
          <p style={{ color: theme.muted, fontSize: '14px', maxWidth: '600px', margin: '8px auto 0', lineHeight: 1.6 }}>
            Search by city, state, or locality to discover nearby stores, contact numbers, and get instant directions.
          </p>

          {/* Search Bar */}
          <div style={{ maxWidth: '520px', margin: '24px auto 0', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#EA580C', fontSize: '16px' }}>
              📍
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type your city, area or state..."
              style={{
                width: '100%',
                padding: '14px 20px 14px 46px',
                borderRadius: '30px',
                border: `1.5px solid ${theme.primary}`,
                background: theme.card,
                color: theme.text,
                fontSize: '14px',
                outline: 'none',
                boxShadow: '0 4px 16px rgba(37,99,235,0.08)',
              }}
            />
          </div>
        </div>

        {/* Store Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '36px' }}>
          {filteredStores.map((st) => {
            const stSlug = generateStoreSlug(st.name);
            const stMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(st.name + ' ' + st.address)}`;
            const stWaMsg = encodeURIComponent(`Hi Cleanz24! I want to inquire about laundry services at your ${st.name} store.`);

            return (
              <div
                key={st.id}
                style={{
                  background: theme.card,
                  borderRadius: '20px',
                  padding: '24px',
                  border: `1px solid ${theme.border}`,
                  boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                }}
              >
                <div>
                  {/* Store Name & Location Badge */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ color: '#EA580C', fontSize: '18px', marginTop: '2px' }}>📍</span>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 800, color: theme.text, margin: 0 }}>{st.name}</h3>
                      <span style={{ display: 'inline-block', background: 'rgba(37,99,235,0.08)', color: theme.primary, borderRadius: '12px', padding: '2px 10px', fontSize: '11px', fontWeight: 700, marginTop: '4px' }}>
                        {st.city}, {st.state}
                      </span>
                    </div>
                  </div>

                  {/* Address */}
                  <p style={{ fontSize: '13px', color: theme.muted, lineHeight: 1.5, marginBottom: '16px', minHeight: '40px' }}>
                    {st.address}
                  </p>

                  {/* Rating */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${theme.border}`, paddingTop: '12px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: theme.muted }}>
                      <GoogleLogo size={16} />
                      <span>Google Rating</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 800, fontSize: '13px', color: theme.text }}>{st.rating}</span>
                      <StarRow rating={st.rating} />
                      <span style={{ fontSize: '11px', color: theme.muted }}>({st.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* 4 Action Buttons Inside Card */}
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                    <a
                      href={stMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        background: theme.bgAlt,
                        color: theme.text,
                        border: `1px solid ${theme.border}`,
                        textAlign: 'center',
                        padding: '9px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '12px',
                        textDecoration: 'none',
                      }}
                    >
                      Directions
                    </a>
                    <a
                      href={`https://wa.me/919138004800?text=${stWaMsg}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        background: theme.primary,
                        color: '#fff',
                        textAlign: 'center',
                        padding: '9px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '12px',
                        textDecoration: 'none',
                      }}
                    >
                      Schedule Pickup
                    </a>
                    <a
                      href="tel:+919138004800"
                      style={{
                        background: theme.bgAlt,
                        color: theme.text,
                        border: `1px solid ${theme.border}`,
                        textAlign: 'center',
                        padding: '9px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '12px',
                        textDecoration: 'none',
                      }}
                    >
                      Call
                    </a>
                    <a
                      href={`https://wa.me/919138004800?text=${stWaMsg}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        background: '#10B981',
                        color: '#fff',
                        textAlign: 'center',
                        padding: '9px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '12px',
                        textDecoration: 'none',
                      }}
                    >
                      WhatsApp
                    </a>
                  </div>

                  {/* View Store Page Link */}
                  <Link
                    to={`/laundry/store/${stSlug}`}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      background: 'rgba(37,99,235,0.06)',
                      color: theme.primary,
                      borderRadius: '8px',
                      padding: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      marginTop: '6px',
                    }}
                  >
                    🏪 View Store Page →
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

        {/* View All Stores Pill Button */}
        <div style={{ textAlign: 'center' }}>
          <Link
            to="/laundry/stores"
            style={{
              background: '#10B981',
              color: '#ffffff',
              padding: '12px 36px',
              borderRadius: '30px',
              fontWeight: 800,
              fontSize: '14px',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 4px 16px rgba(16,185,129,0.3)',
            }}
          >
            View All Stores
          </Link>
        </div>

      </div>
    </section>
  );
}
