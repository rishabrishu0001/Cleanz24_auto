import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { storesData } from '../../data';
import SEOMeta from '../../components/SEOMeta';

// Helper to slugify
const slugify = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

// Local data dictionary for major cities to enhance customization
const CITY_LANDMARKS = {
  noida: ['Sector 18 Market', 'DLF Mall of India', 'Noida Golf Course', 'Botanical Garden Metro Station', 'Okhla Bird Sanctuary'],
  'greater-noida': ['Pari Chowk', 'Grand Venice Mall', 'Gautam Buddha University', 'India Expo Mart', 'Yamuna Expressway'],
  'greater-noida-west': ['Gaur City Mall', 'Ek Murti Chowk', 'Char Murti', 'Gaur City Sports City', 'Yatharth Hospital'],
  'noida-extension': ['Nirala Aspire Plaza', 'Panchsheel Greens', 'Cherry County', 'Supertech Eco Village', 'Gaur City'],
  gurugram: ['Cyber City', 'Kingdom of Dreams', 'Ambience Mall', 'IFFCO Chowk', 'Sector 29 Market'],
  delhi: ['Connaught Place', 'India Gate', 'Red Fort', 'South Extension', 'Rajouri Garden'],
  mumbai: ['Gateway of India', 'Marine Drive', 'Bandra-Worli Sea Link', 'Juhu Beach', 'Chhatrapati Shivaji Terminal'],
  pune: ['Shaniwar Wada', 'Koregaon Park', 'Viman Nagar', 'Fergusson College Road', 'Aundh'],
  bangalore: ['MG Road', 'Lalbagh Botanical Garden', 'Indiranagar', 'Koramangala', 'Phoenix Marketcity'],
  hyderabad: ['Charminar', 'Golconda Fort', 'Gachibowli Stadium', 'HITEC City', 'Inorbit Mall'],
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
  pune: ['Koregaon Park', 'Kothrud', 'Hinjewadi', 'Viman Nagar', 'Hadapsar', 'Baner', 'Kalyani Nagar', 'Aundh'],
  bangalore: ['HSR Layout', 'Jayanagar', 'Indiranagar', 'Koramangala', 'Whitefield', 'Varthur', 'Padmanabhanagar', 'Malleshwaram'],
  hyderabad: ['Gachibowli', 'Kondapur', 'Narsingi', 'Beeramguda', 'Vanasthalipuram', 'Gopanpally', 'Madhapur', 'Jubilee Hills'],
  dehradun: ['Rajpur Road', 'Jakhan', 'Dalanwala', 'Indira Nagar', 'Premnagar', 'Vasant Vihar', 'Chakrata Road'],
};

export default function LocationDetail() {
  const { citySlug } = useParams();
  
  // Clean slug of any leading colons
  const cleanSlug = citySlug ? citySlug.replace(/^:/, '').trim() : '';
  
  // Find stores matching city slug
  const matchedStores = storesData.filter((store) => {
    const sCity = slugify(store.city);
    const sTagCity = store.tags && store.tags.some(t => slugify(t) === cleanSlug);
    const sName = slugify(store.name);
    return sCity === cleanSlug || sTagCity || sName.includes(cleanSlug);
  });

  // If no stores match, show a beautiful 404 store locator fallback page
  if (matchedStores.length === 0) {
    return (
      <div style={{ background: '#F7FAFC', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
        <SEOMeta
          title="Store Location Not Found"
          description="The requested Cleanz24 store location was not found. Browse our directory of 61 premium dry cleaning and laundry locations across India."
        />
        <div style={{ maxWidth: '500px', width: '100%', background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #EDF2F7', textAlign: 'center' }}>
          <span style={{ fontSize: '64px', display: 'block', marginBottom: '24px' }}>📍</span>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1A365D', fontFamily: "'Poppins', sans-serif", marginBottom: '16px' }}>
            Store Location Not Found
          </h1>
          <p style={{ color: '#718096', fontSize: '15px', lineHeight: '1.6', marginBottom: '30px' }}>
            We couldn't find a Cleanz24 laundry or dry cleaning store matching <strong>"{cleanSlug}"</strong>. We currently operate 61 premium outlets across India.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link
              to="/locations"
              style={{
                background: '#2B6CB0',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 700,
                borderRadius: '30px',
                padding: '12px 24px',
                fontSize: '15px',
                display: 'block',
                boxShadow: '0 4px 12px rgba(43,108,176,0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              🔍 Browse Store Directory
            </Link>
            <Link
              to="/laundry/stores"
              style={{
                background: '#fff',
                color: '#2B6CB0',
                border: '1px solid #2B6CB0',
                textDecoration: 'none',
                fontWeight: 700,
                borderRadius: '30px',
                padding: '12px 24px',
                fontSize: '15px',
                display: 'block',
                transition: 'all 0.2s ease',
              }}
            >
              📍 Search Nearest Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const primaryStore = matchedStores[0];

  // Helper to get formatted display name from the slug
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
      'thane-west': 'Thane West',
      'hsr-layout': 'HSR Layout'
    };
    if (specialCases[slug]) return specialCases[slug];
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const city = getCityDisplayName(cleanSlug);
  const state = cleanSlug === 'delhi' ? 'Delhi NCR' : primaryStore.state;
  const address = primaryStore.address;
  const phone = primaryStore.phone;
  const rating = primaryStore.rating;
  const reviewsCount = primaryStore.reviews;

  // Retrieve landmarks and neighborhoods
  const landmarks = CITY_LANDMARKS[cleanSlug] || [`the local ${city} City Center`, `the Main Market in ${city}`, `popular transit hubs in ${city}`, `major residential complexes in ${city}`];
  const neighborhoods = CITY_NEIGHBORHOODS[cleanSlug] || [`${city} Sector 1`, `${city} Sector 2`, `${city} Extension`, `Downtown ${city}`, `Green View Society`];

  // Areas We Serve String
  const areasServedStr = neighborhoods.join(', ');

  // 10 Detailed FAQs specific to the city
  const faqs = [
    {
      q: `What is the turnaround time for dry cleaning in ${city}?`,
      a: `At Cleanz24 ${city}, our standard turnaround time for dry cleaning is 48 to 72 hours. However, we also offer an Express Laundry and Dry Cleaning Service where your garments can be cleaned, ironed, and delivered back to your doorstep in as little as 24 hours. Contact our ${city} store to schedule a priority pickup.`
    },
    {
      q: `Are your cleaning solvents safe for delicate fabrics and wedding wear in ${city}?`,
      a: `Absolutely. Cleanz24 is committed to premium care. We use eco-friendly, hypoallergenic solvents imported from Germany, combined with state-of-the-art soft-wash machinery. This process is extremely gentle on delicate garments like silk sarees, designer lehengas, suits, and sherwanis, preserving color and embroidery without any chemical odor.`
    },
    {
      q: `Do you offer free home pickup and delivery in and around ${city}?`,
      a: `Yes, we offer free doorstep pickup and delivery for laundry and dry cleaning services across ${city} and its surrounding neighborhoods. There are no extra charges for our pickup and delivery service, making professional fabric care highly convenient for busy professionals and families.`
    },
    {
      q: `Can you remove tough stains like grease, ink, or wine from clothes?`,
      a: `Our certified spotters at the Cleanz24 ${city} outlet are trained in advanced chemical spotting techniques. We inspect garments individually and treat stains using specialized stain-removal agents. While we boast a very high success rate of stain removal, we recommend sending stained clothes as quickly as possible, as old, set-in stains can be harder to remove.`
    },
    {
      q: `What is the price of shoe cleaning and conditioning in ${city}?`,
      a: `Shoe cleaning at Cleanz24 ${city} is highly affordable and tailored to the material of your footwear. We clean sneakers, suede shoes, leather boots, canvas shoes, and sports shoes. Our process includes deep fabric washing, sole scrubbing, deodorizing, and conditioning. Please check our pricing table or call our local helpline at +91 ${phone} for the latest shoe spa rates.`
    },
    {
      q: `Do you provide sofa and carpet cleaning services at home in ${city}?`,
      a: `Yes! We offer professional sofa cleaning, carpet shampooing, and deep curtain cleaning directly at your home or office in ${city}. Our team comes equipped with high-suction vacuum extractors and sanitizing steam machines to deep-clean, disinfect, and refresh your upholstery and home textiles on-site.`
    },
    {
      q: `How do I book a laundry pickup in ${city}?`,
      a: `Booking a pickup is extremely easy. You can click the "Book Pickup Today" button on our website, call our hotline directly at +91 ${phone}, or send a WhatsApp message to +91 ${phone}. Our logistics assistant will coordinate a convenient time slot to collect your garments from your home.`
    },
    {
      q: `What is the difference between laundry, wet cleaning, and dry cleaning?`,
      a: `Laundry involves washing everyday garments with water and premium detergents in commercial machines. Dry cleaning uses specialized eco-solvents instead of water to lift oils, grease, and dirt from delicate fabrics. Wet cleaning is an advanced eco-friendly alternative to dry cleaning that utilizes computer-controlled machines and biodegradable soaps for maximum fabric protection.`
    },
    {
      q: `Can I get express ironing service only for my office clothes in ${city}?`,
      a: `Yes, Cleanz24 offers a dedicated Steam Ironing (Pressing) service in ${city}. Your garments are professionally ironed on vacuum steam tables to ensure a crisp, wrinkle-free finish without any fabric burn risk, and are delivered back on hangers or neatly folded.`
    },
    {
      q: `How do you handle hygiene during the laundry process?`,
      a: `Hygiene is our highest priority at Cleanz24 ${city}. We never mix your clothes with garments from other households. Every customer's clothes are washed, dried, and ironed in individual cycles. Additionally, our machines are sanitized regularly, and our staff follows strict hygiene and packaging protocols.`
    }
  ];

  // Schema Markup
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LaundryBusiness",
    "name": primaryStore.name || `Cleanz24 ${city}`,
    "image": "https://cleanz24.com/logo.png",
    "@id": `https://cleanz24.com/laundry/${cleanSlug}`,
    "url": `https://cleanz24.com/laundry/${cleanSlug}`,
    "telephone": `+91${phone.replace(/\s+/g, '')}`,
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address,
      "addressLocality": city,
      "addressRegion": state,
      "postalCode": "201301",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.535517,
      "longitude": 77.391029
    },
    "rating": {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "reviewCount": reviewsCount
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "21:00"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  // Compile both schemas into a single array for SEOMeta
  const schemas = [localBusinessSchema, faqSchema];

  return (
    <div style={{ background: '#F7FAFC', minHeight: '100vh', paddingBottom: '0' }}>
      
      {/* Dynamic SEO Meta Injection */}
      <SEOMeta
        title={`Best Laundry & Dry Cleaning Service in ${city} | Cleanz24`}
        description={`Find the best laundry and dry cleaning services in ${city}. Eco-friendly care, sneaker cleaning, sofa cleaning with free home pickup & delivery. Book today!`}
        canonical={`https://cleanz24.com/laundry/${cleanSlug}`}
        schema={schemas}
      />

      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1A365D 0%, #2A4365 50%, #2B6CB0 100%)',
          color: '#fff',
          padding: '100px 20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '30px',
              fontSize: '12px',
              fontWeight: 700,
              padding: '6px 18px',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '20px',
            }}
          >
            ⭐ Rated {rating}/5 by Local Residents
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.2,
              fontFamily: "'Poppins', sans-serif",
              marginBottom: '20px',
            }}
          >
            Best Laundry &amp; Dry Cleaning Service in {city}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              color: 'rgba(255,255,255,0.9)',
              maxWidth: '650px',
              margin: '0 auto 36px',
              lineHeight: 1.6,
            }}
          >
            Premium fabric care, specialized dry cleaning, shoe sanitization, and home upholstery deep cleaning with free doorstep pickup &amp; delivery in {city}.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href={`https://wa.me/${primaryStore.whatsapp || '919266018365'}?text=Hi%20Cleanz24,%20I%20would%20like%20to%20book%20a%20laundry%20pickup%20in%20${city}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#48BB78',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 700,
                borderRadius: '30px',
                padding: '14px 28px',
                fontSize: '15px',
                boxShadow: '0 4px 14px rgba(72,187,120,0.4)',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zm5.83 14.09c-.25.7-.1.97-.24 1.45-.33 1.15-1.35 1.77-2.38 1.95-1.12.19-2.3-.22-3.32-.73-2.18-1.09-3.9-2.81-4.99-4.99-.51-1.02-.92-2.2-.73-3.32.18-1.03.8-2.05 1.95-2.38.48-.14.75.01 1.45-.24.28.56.84 1.68 1.12 2.24.14.28.01.56-.14.84-.28.56-.84 1.12-.56 1.4.56 1.12 1.4 1.96 2.52 2.52.28.28.84-.28 1.4-.56.28-.14.56-.28.84-.14.56.28 1.68.84 2.24 1.12.25.14.39.42.24.71z"/></svg> Book on WhatsApp
            </a>
            <a
              href={`tel:+91${phone.replace(/\s+/g, '')}`}
              style={{
                background: '#fff',
                color: '#2B6CB0',
                textDecoration: 'none',
                fontWeight: 700,
                borderRadius: '30px',
                padding: '14px 28px',
                fontSize: '15px',
                boxShadow: '0 4px 14px rgba(255,255,255,0.15)',
                transition: 'all 0.2s ease',
              }}
            >
              📞 Call: +91 {phone}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-5">
        <div className="container px-3">
          <div className="row">
            
            {/* Left Content Column */}
            <div className="col-lg-8 pe-lg-5">
              
              {/* Unique Local Introduction Section */}
              <div style={{ marginBottom: '50px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1A365D', fontFamily: "'Poppins', sans-serif", marginBottom: '20px' }}>
                  Premium Fabric Care &amp; Wardrobe Maintenance in {city}, {state}
                </h2>
                
                <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#4A5568', marginBottom: '16px' }}>
                  Finding a trusted <strong>laundry near me</strong> or the <strong>best dry cleaner near me</strong> in {city} can be challenging when managing high-end delicate wear, daily office garments, and heavy household furnishings. Cleanz24 addresses this gap as India's premium laundry and dry cleaning network, offering a seamless combination of advanced German technology, eco-safe cleaning solvents, and free doorstep pickup and delivery. Our state-of-the-art facility in {city} is optimized to treat your wardrobe with the ultimate care and precision, keeping your garments looking new and vibrant.
                </p>

                <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#4A5568', marginBottom: '16px' }}>
                  Residents in neighborhoods across {city} like {neighborhoods.slice(0, 3).join(', ')} choose Cleanz24 because of our rigorous laundry protocols. We understand that everyday dust and local humidity can build up on fabrics, dulling their original sheen. Standard local wash shops often use harsh bleaching powders and low-quality detergents, causing premature fading, shrinkage, and fabric wear. At Cleanz24, we treat your garments with biodegradable cleaning agents that are hypoallergenic and completely safe for your skin, protecting even the most delicate skin types.
                </p>

                <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#4A5568', marginBottom: '16px' }}>
                  Our outlet is strategically positioned to serve customers around key local hubs and landmarks like {landmarks.slice(0, 3).join(', ')}. Whether you are a busy working professional in the corporate zones or a family residing in premium apartment towers, our courier partners operate round-the-clock schedules to ensure your laundry fits easily into your dynamic daily routine. We take pride in our rapid pickup turnaround, ensuring your items are cataloged, inspected, cleaned, ironed, and delivered back to your home in perfect condition.
                </p>

                <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#4A5568', marginBottom: '0' }}>
                  From premium shirts, dresses, suits, and silk sarees to heavy curtains, carpets, leather sofas, and designer sneakers, Cleanz24 serves as your single-point local solution. We guarantee complete hygiene: we run separate wash cycles for every individual household to ensure that your clothes never mix with anyone else's. Experience a new standard of laundry convenience in {city} with Cleanz24's expert team today.
                </p>
              </div>

              {/* Upholstery & Specialized Services Grid */}
              <div style={{ marginBottom: '50px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1A365D', fontFamily: "'Poppins', sans-serif", marginBottom: '20px' }}>
                  Professional Laundry &amp; Specialized Services We Provide
                </h2>
                <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#4A5568', marginBottom: '30px' }}>
                  Cleanz24 delivers a complete suite of specialized cleaning services under one roof. Each garment and home textile undergoes a meticulous inspection before clean cycles are chosen:
                </p>

                <div className="row g-4">
                  {/* Service Card 1 */}
                  <div className="col-md-6">
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #EDF2F7', height: '100%' }}>
                      <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#2B6CB0', marginBottom: '12px' }}>👕 Premium Laundry Service</h3>
                      <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#718096', margin: 0 }}>
                        Perfect for everyday shirts, trousers, t-shirts, activewear, and bed linen. Every batch is washed in soft water with premium surfactants, dried in controlled temperatures to avoid shrinking, and delivered neatly folded or ironed.
                      </p>
                    </div>
                  </div>
                  
                  {/* Service Card 2 */}
                  <div className="col-md-6">
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #EDF2F7', height: '100%' }}>
                      <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#2B6CB0', marginBottom: '12px' }}>👔 Advanced Dry Cleaning</h3>
                      <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#718096', margin: 0 }}>
                        Ideal for premium wardrobe items like suits, wedding lehengas, silk sarees, and warm coats. Using hydrocarbon solvents, we remove oils and deep stains without stripping the fabric's natural texture, shape, or colors.
                      </p>
                    </div>
                  </div>

                  {/* Service Card 3 */}
                  <div className="col-md-6">
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #EDF2F7', height: '100%' }}>
                      <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#2B6CB0', marginBottom: '12px' }}>👟 Shoe Cleaning &amp; Restoration</h3>
                      <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#718096', margin: 0 }}>
                        Give your sneakers, boots, and suede shoes a brand new life. Our specialized shoe spa sanitizes, deep-cleans the upper mesh and soles, and applies leather conditionings to restore flexibility and color vibrancy.
                      </p>
                    </div>
                  </div>

                  {/* Service Card 4 */}
                  <div className="col-md-6">
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #EDF2F7', height: '100%' }}>
                      <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#2B6CB0', marginBottom: '12px' }}>🛋️ Sofa Cleaning &amp; Sanitization</h3>
                      <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#718096', margin: 0 }}>
                        Deep clean your living room fabric or leather sofas right at your home. We use extraction shampooing and sanitizing steam to extract hidden allergens, dust mites, sweat stains, and pet hair, keeping your family safe.
                      </p>
                    </div>
                  </div>

                  {/* Service Card 5 */}
                  <div className="col-md-6">
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #EDF2F7', height: '100%' }}>
                      <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#2B6CB0', marginBottom: '12px' }}>🌫️ Curtain Cleaning</h3>
                      <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#718096', margin: 0 }}>
                        Keep your home free from dust and pollen. Our curtain cleaning service removes deep dust layers and stains from heavy drapes, sheer curtains, and blinds, leaving your home windows smelling fresh and clean.
                      </p>
                    </div>
                  </div>

                  {/* Service Card 6 */}
                  <div className="col-md-6">
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #EDF2F7', height: '100%' }}>
                      <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#2B6CB0', marginBottom: '12px' }}>🧶 Carpet &amp; Rug Shampooing</h3>
                      <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#718096', margin: 0 }}>
                        Professional extraction cleaning for imported rugs, wool carpets, and synthetic runners. We lift dust from deep carpet fibers and eliminate persistent odors using antimicrobial solutions.
                      </p>
                    </div>
                  </div>

                  {/* Service Card 7 */}
                  <div className="col-md-6">
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #EDF2F7', height: '100%' }}>
                      <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#2B6CB0', marginBottom: '12px' }}>💨 Steam Ironing (Pressing)</h3>
                      <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#718096', margin: 0 }}>
                        Get crisp, wrinkle-free shirts and trousers for your executive meetings. Our hot steam tables set clean crease lines without causing color shine or fabric burns common in standard hand irons.
                      </p>
                    </div>
                  </div>

                  {/* Service Card 8 */}
                  <div className="col-md-6">
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #EDF2F7', height: '100%' }}>
                      <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#2B6CB0', marginBottom: '12px' }}>🚀 Express Delivery Service</h3>
                      <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#718096', margin: 0 }}>
                        Have an urgent trip or wedding function? Our express service in {city} prioritizes your order in our facility, cleaning and packaging your outfits within 24 hours. Free priority delivery guaranteed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Cleanz24 */}
              <div style={{ marginBottom: '50px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1A365D', fontFamily: "'Poppins', sans-serif", marginBottom: '20px' }}>
                  Why Cleanz24 is the Best Laundry &amp; Dry Cleaning Service in {city}
                </h2>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'flex-start' }}>
                    <span style={{ background: '#EBF8FF', color: '#2B6CB0', borderRadius: '50%', padding: '6px', fontSize: '16px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>🛡️</span>
                    <div>
                      <h4 style={{ fontSize: '17px', fontWeight: 600, color: '#2D3748', margin: '0 0 4px' }}>German Quality Soft-Wash System</h4>
                      <p style={{ fontSize: '15px', color: '#4A5568', margin: 0 }}>We use specialized computer-controlled wash cycles that match specific fabric parameters, ensuring that your silks, cottons, synthetics, and woolens are cleaned with exact detergent dosage and drum rotations.</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'flex-start' }}>
                    <span style={{ background: '#EBF8FF', color: '#2B6CB0', borderRadius: '50%', padding: '6px', fontSize: '16px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>🌿</span>
                    <div>
                      <h4 style={{ fontSize: '17px', fontWeight: 600, color: '#2D3748', margin: '0 0 4px' }}>Eco-Safe Biodegradable Solvents</h4>
                      <p style={{ fontSize: '15px', color: '#4A5568', margin: 0 }}>Unlike traditional laundry services that use toxic chemicals like Perchloroethylene, we clean clothes with biodegradable solvents that protect the fibers, cause zero skin irritation, and are completely safe for children and pets.</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'flex-start' }}>
                    <span style={{ background: '#EBF8FF', color: '#2B6CB0', borderRadius: '50%', padding: '6px', fontSize: '16px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>🚪</span>
                    <div>
                      <h4 style={{ fontSize: '17px', fontWeight: 600, color: '#2D3748', margin: '0 0 4px' }}>Free Doorstep Pickup &amp; Delivery</h4>
                      <p style={{ fontSize: '15px', color: '#4A5568', margin: 0 }}>Stop carrying heavy laundry bags to local shops. Our professional delivery team picks up your clothes directly from your door and returns them crisp, clean, and packaged at no extra delivery charge.</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'flex-start' }}>
                    <span style={{ background: '#EBF8FF', color: '#2B6CB0', borderRadius: '50%', padding: '6px', fontSize: '16px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>🧼</span>
                    <div>
                      <h4 style={{ fontSize: '17px', fontWeight: 600, color: '#2D3748', margin: '0 0 4px' }}>100% Individual Washing Cycle</h4>
                      <p style={{ fontSize: '15px', color: '#4A5568', margin: 0 }}>We follow strict clinical hygiene standards. Your garments are never washed, dried, or ironed together with clothes from other households, preventing skin infections and cross-contamination.</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Local Landmarks & Areas We Serve */}
              <div style={{ marginBottom: '50px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1A365D', fontFamily: "'Poppins', sans-serif", marginBottom: '20px' }}>
                  Serving Landmark Sites and Neighborhoods in {city}
                </h2>
                <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#4A5568', marginBottom: '16px' }}>
                  Cleanz24 has established a deep logistics network across the major landmarks of {city}. Our collection vans regularly cover areas near <strong>{landmarks.join(', ')}</strong>. This strategic mapping ensures that whether you reside in high-density residential gated complexes, work in commercial zones, or attend universities, scheduling a laundry collection takes under an hour.
                </p>
                <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#4A5568', marginBottom: '24px' }}>
                  Our neighborhood coverage includes all major residential zones, providing laundry and dry cleaning to homes throughout:
                </p>
                
                <div style={{ background: '#EDF2F7', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#2D3748', marginBottom: '10px' }}>📍 Primary Service Sectors &amp; Localities:</h4>
                  <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#4A5568', margin: 0, fontStyle: 'italic' }}>
                    {areasServedStr} and neighboring micro-markets.
                  </p>
                </div>
              </div>

              {/* Testimonials */}
              <div style={{ marginBottom: '50px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1A365D', fontFamily: "'Poppins', sans-serif", marginBottom: '30px' }}>
                  What {city} Residents Say About Cleanz24
                </h2>
                
                <div className="row g-4">
                  <div className="col-md-6">
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #2B6CB0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', height: '100%' }}>
                      <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#4A5568', marginBottom: '16px' }}>
                        "Cleanz24 has completely transformed how I manage my weekly laundry. With my busy corporate schedule in {city}, the free doorstep pickup is an absolute lifesaver. My formal shirts are delivered steam-pressed on hangers, and my delicate sarees are spotless!"
                      </p>
                      <h5 style={{ fontSize: '15px', fontWeight: 700, color: '#2D3748', margin: 0 }}>- Rohan Malhotra</h5>
                      <span style={{ fontSize: '12px', color: '#A0AEC0' }}>Resident, {city}</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #2B6CB0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', height: '100%' }}>
                      <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#4A5568', marginBottom: '16px' }}>
                        "I sent my premium designer wedding sherwani and high-end leather sneakers to Cleanz24's store. I was quite nervous, but they did a phenomenal dry cleaning job. The sneakers look brand new, and there was no chemical smell at all."
                      </p>
                      <h5 style={{ fontSize: '15px', fontWeight: 700, color: '#2D3748', margin: 0 }}>- Priya Sharma</h5>
                      <span style={{ fontSize: '12px', color: '#A0AEC0' }}>Resident, {city}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQs Section */}
              <div style={{ marginBottom: '50px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1A365D', fontFamily: "'Poppins', sans-serif", marginBottom: '30px' }}>
                  Frequently Asked Questions (FAQs) in {city}
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {faqs.map((faq, index) => (
                    <div key={index} style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #EDF2F7' }}>
                      <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#2D3748', marginTop: 0, marginBottom: '10px' }}>
                        {index + 1}. {faq.q}
                      </h3>
                      <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#718096', margin: 0 }}>
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Contact/Store Info Column */}
            <div className="col-lg-4 mt-5 mt-lg-0">
              <div
                style={{
                  position: 'sticky',
                  top: '100px',
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '30px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
                  border: '1px solid #EDF2F7',
                }}
              >
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#1A365D',
                    fontFamily: "'Poppins', sans-serif",
                    marginBottom: '20px',
                    borderBottom: '2px solid #EBF8FF',
                    paddingBottom: '12px',
                  }}
                >
                  🏪 Local Outlets in {city}
                </h3>
                
                {matchedStores.map((store) => (
                  <div
                    key={store.id}
                    style={{
                      marginBottom: '24px',
                      paddingBottom: '20px',
                      borderBottom: '1px solid #EDF2F7',
                    }}
                  >
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#2D3748', marginBottom: '8px' }}>
                      {store.name}
                    </h4>
                    <p style={{ fontSize: '13px', color: '#718096', lineHeight: '1.5', marginBottom: '12px' }}>
                      📍 {store.address}
                    </p>
                    <div style={{ fontSize: '13px', color: '#2D3748', marginBottom: '16px' }}>
                      <strong>📞 Phone:</strong> +91 {store.phone}
                      <br />
                      <strong>⭐ Rating:</strong> {store.rating || '4.8'} ({store.reviews || '40'} reviews)
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <a
                        href={`tel:+91${store.phone.replace(/\s+/g, '')}`}
                        style={{
                          background: '#EBF8FF',
                          color: '#2B6CB0',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '8px 14px',
                          fontSize: '12px',
                          fontWeight: 700,
                          textDecoration: 'none',
                        }}
                      >
                        📞 Call Now
                      </a>
                      <a
                        href={`https://wa.me/${store.whatsapp || '919266018365'}?text=Hi%20Cleanz24,%20I%20would%20like%20to%20book%20a%20laundry%20pickup`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: '#E6FFFA',
                          color: '#319795',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '8px 14px',
                          fontSize: '12px',
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zm5.83 14.09c-.25.7-.1.97-.24 1.45-.33 1.15-1.35 1.77-2.38 1.95-1.12.19-2.3-.22-3.32-.73-2.18-1.09-3.9-2.81-4.99-4.99-.51-1.02-.92-2.2-.73-3.32.18-1.03.8-2.05 1.95-2.38.48-.14.75.01 1.45-.24.28.56.84 1.68 1.12 2.24.14.28.01.56-.14.84-.28.56-.84 1.12-.56 1.4.56 1.12 1.4 1.96 2.52 2.52.28.28.84-.28 1.4-.56.28-.14.56-.28.84-.14.56.28 1.68.84 2.24 1.12.25.14.39.42.24.71z"/></svg> WhatsApp
                      </a>
                    </div>
                  </div>
                ))}

                <div style={{ background: '#F7FAFC', padding: '20px', borderRadius: '12px', marginTop: '20px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#2D3748', marginBottom: '8px' }}>💡 Need Support?</h4>
                  <p style={{ fontSize: '12px', color: '#718096', lineHeight: '1.5', margin: 0 }}>
                    Our customer care line is open from 8:00 AM to 9:00 PM, 7 days a week. For bulk corporate orders or commercial laundry setups, call our helpline directly.
                  </p>
                </div>
                
                {/* Central Directory Quicklink */}
                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                  <Link
                    to="/locations"
                    style={{
                      fontSize: '13px',
                      color: '#2B6CB0',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    ← View All 61 Stores across India
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
