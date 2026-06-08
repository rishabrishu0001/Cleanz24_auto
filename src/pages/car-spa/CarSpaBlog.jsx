import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEOMeta from '../../components/SEOMeta';

// Import local blog images
import carblog1 from '../../assets/carblog1.jpeg';
import carblog2 from '../../assets/carblog2.jpeg';
import carblog4_2 from '../../assets/carblog4 (2).jpeg';
import carblog4_1 from '../../assets/carblog4 (1).jpeg';
import carblog5 from '../../assets/carblog5.jpeg';
import carblog6 from '../../assets/carblog6.jpeg';
import carblog7 from '../../assets/carblog7.jpeg';
import carblog10_2 from '../../assets/carblog10 (2).jpeg';
import carblog10_3 from '../../assets/carblog10 (3).jpeg';
import carblog10_1 from '../../assets/carblog10 (1).jpeg';

/* ─── Blog Data ──────────────────────────────────────────────────────────── */
const ALL_CATEGORIES = ['All', 'Car Care Tips', 'Detailing', 'Membership', 'Services'];

const BLOG_POSTS = [
  {
    id: 1,
    slug: 'best-car-spa-services-delhi',
    title: 'Best Car Spa Services in Delhi – Everything You Need to Know Before You Book',
    excerpt: "Why finding the right car spa in Delhi matters more than you think. Most car owners underestimate the difference between a local roadside wash and a professional detailing studio until they see swirl marks and fading gloss on their premium vehicles...",
    categories: ['Services', 'Car Care Tips'],
    author: 'cleanz24',
    date: 'June 04, 2026',
    dateTime: '2026-06-04',
    image: carblog1,
    readTime: '6 min read',
    content: `
      <h3>Why Professional Detailing is Crucial for Delhi Cars</h3>
      <p>Delhi's unique environment presents significant challenges for car paint. With high levels of dust, vehicular pollution, industrial emissions, and intense UV rays, a regular bucket-and-sponge wash often does more harm than good by dragging dirt particles across the clear coat, creating micro-scratches and swirl marks.</p>
      
      <h3>Key Services to Look for in a Premium Car Spa</h3>
      <ul>
        <li><strong>Three-Bucket Foam Wash:</strong> Ensures dirt is completely lifted off the vehicle without scratching the paint.</li>
        <li><strong>Clay Bar Decontamination:</strong> Pulls out embedded contaminants like metal filings, tree sap, and industrial fallout.</li>
        <li><strong>Interior Deep Cleaning & Sanitization:</strong> Using steam extraction to clean carpets, seats, and dashboards without harsh chemicals.</li>
        <li><strong>Paint Correction:</strong> Machine polishing to remove swirls and restore optical clarity to your vehicle's paintwork.</li>
      </ul>
      
      <h3>How to Choose the Right Studio</h3>
      <p>When selecting a detailing partner, check their lighting systems (adequate LED setup is needed to see paint imperfections), the quality of products used (like Sonax, Koch Chemie, or Meguiar's), and the certifications of their staff. At Cleanz24, our detailing network features ISO-certified studios and master technicians trained in paint-safe washing systems.</p>
    `
  },
  {
    id: 2,
    slug: 'how-ceramic-coating-protects-your-car',
    title: 'Ceramic Coating: The Ultimate Protection for Your Vehicle\'s Paint',
    excerpt: "Learn how nano-ceramic coating acts as a permanent liquid shield on your clear coat, locking in a glassy, mirror-like gloss and providing strong hydrophobic protection against water spots, dirt, and UV damage...",
    categories: ['Detailing', 'Car Care Tips'],
    author: 'cleanz24',
    date: 'May 28, 2026',
    dateTime: '2026-05-28',
    image: carblog2,
    readTime: '8 min read',
    content: `
      <h3>What Exactly is Ceramic Coating?</h3>
      <p>A nano-ceramic coating is a liquid polymer that is applied by hand to the exterior of a vehicle. The coating chemically bonds with the vehicle's factory paint, creating a sacrificial layer of protection that does not wash off or degrade like traditional wax or paint sealants.</p>
      
      <h3>The Science Behind Hydrophobic Properties</h3>
      <p>Ceramic coatings create a hydrophobic (water-repelling) surface where water beads up and rolls off easily, carrying dust and grime with it. This "self-cleaning" effect makes maintaining your car's cleanliness much simpler and prevents hard water spots from etching into your paint.</p>
      
      <h3>Key Benefits of 10H Ceramic Coating</h3>
      <ul>
        <li><strong>UV Protection:</strong> Prevents oxidation and fading caused by harsh sunlight.</li>
        <li><strong>Chemical Stain Resistance:</strong> Shields paint from acidic contaminants like bird droppings and bug splatter.</li>
        <li><strong>Enhanced Showroom Gloss:</strong> Deepens color and reflections for a glassy, wet-look finish.</li>
      </ul>
    `
  },
  {
    id: 3,
    slug: 'car-detailing-vs-car-wash-difference',
    title: 'Car Detailing vs. Car Wash: What\'s the Real Difference?',
    excerpt: "Many car owners assume that a car wash and car detailing are the same thing. However, detailing goes far beyond a surface clean. Here is a comparison of processes, depth of clean, duration, and long-term value...",
    categories: ['Car Care Tips'],
    author: 'cleanz24',
    date: 'May 20, 2026',
    dateTime: '2026-05-20',
    image: carblog4_2,
    readTime: '5 min read',
    content: `
      <h3>The Simple Car Wash: A Surface Clean</h3>
      <p>A standard car wash is designed to remove loose surface dirt and mud from the exterior of your vehicle. It typically takes 15 to 30 minutes and focuses primarily on basic rinsing, soaping, and vacuuming. While helpful for weekly maintenance, it doesn't address deep paint oxidation, stain removal, or interior conditioning.</p>
      
      <h3>Professional Detailing: Restorative & Preservative Care</h3>
      <p>Car detailing is an in-depth, meticulous process that aims to restore the vehicle to its original "showroom new" condition. Detailing involves paint correction, engine bay cleaning, deep interior fabric shampooing, leather conditioning, trim restoration, and applying durable protective coatings. A full detail can take anywhere from 4 hours to multiple days.</p>
      
      <h3>Which One Do You Need?</h3>
      <p>Use a car wash for routine maintenance to keep dust off the car. However, professional detailing is recommended 2 to 3 times a year to preserve paint integrity, prevent rust, maintain upholstery quality, and maximize the resale value of your automobile.</p>
    `
  },
  {
    id: 4,
    slug: 'why-regular-car-spa-extends-vehicle-life',
    title: '5 Reasons Why Regular Professional Car Spa Extends Your Vehicle\'s Life',
    excerpt: "Discover the mechanical and structural benefits of maintaining a clean car. From underbody corrosion protection to interior cabin air filtration, a clean car is a healthier and longer-lasting car...",
    categories: ['Car Care Tips', 'Membership'],
    author: 'cleanz24',
    date: 'May 12, 2026',
    dateTime: '2026-05-12',
    image: carblog4_1,
    readTime: '6 min read',
    content: `
      <h3>More Than Just Aesthetics</h3>
      <p>While a clean, shiny car looks fantastic on the road, the benefits of regular detailing extend deep into the mechanical and structural health of your vehicle. Neglecting the cleanliness of your car can lead to early wear and tear, electrical failures, and structural rust.</p>
      
      <h3>5 Crucial Benefits of Regular Detailing</h3>
      <ol>
        <li><strong>Preventing Rust & Corrosion:</strong> Road salt, moisture, and mud collect under the wheel arches and underbody, eating away at metal components unless periodically flushed.</li>
        <li><strong>Preserving Cabin Air Quality:</strong> Dust, pet dander, and mold grow in dirty upholstery, circulating through the AC vents. Deep sanitization ensures healthy air for passengers.</li>
        <li><strong>Headlight and Visibility Restoration:</strong> Clear, polished glass and lenses ensure maximum headlight projection and safe night driving.</li>
        <li><strong>Protecting Electronic Sensors:</strong> Modern cars are loaded with radar, ultrasonic, and camera sensors. Baked-on dirt can cause sensor errors.</li>
        <li><strong>Maintaining Mechanical Integrity:</strong> Detailing the engine bay removes grime that causes engine overheating and premature belt wear.</li>
      </ol>
    `
  },
  {
    id: 5,
    slug: 'interior-car-cleaning-tips-experts',
    title: 'Interior Car Detailing: Deep Cleaning Tips from the Pros',
    excerpt: "Is your car cabin feeling dusty or smelling stale? Read our comprehensive step-by-step guide to professional interior deep cleaning, leather conditioning, and dashboard restoration...",
    categories: ['Detailing', 'Car Care Tips'],
    author: 'cleanz24',
    date: 'May 05, 2026',
    dateTime: '2026-05-05',
    image: carblog5,
    readTime: '7 min read',
    content: `
      <h3>The Importance of Interior Upkeep</h3>
      <p>We spend the majority of our time looking at the inside of our cars. Yet, the interior cabin is often neglected compared to the exterior paint. Dust gathers in AC vents, leather seats dry out and crack, and cup holders become breeding grounds for bacteria.</p>
      
      <h3>Step-by-Step Interior Protocol</h3>
      <p>Pros follow a specific sequence to clean interiors efficiently without redistributing dust:</p>
      <ul>
        <li><strong>Blow Out:</strong> Use compressed air to blow dirt out of seams, vents, and tight corners before vacuuming.</li>
        <li><strong>Dry Vacuuming:</strong> Deep vacuuming to remove loose dirt from carpets and seat fabric.</li>
        <li><strong>Steam Cleaning:</strong> Hot steam sanitizer is applied to carpets and door panels to dissolve oils and eliminate odors.</li>
        <li><strong>Leather Treatment:</strong> Apply pH-balanced leather cleaner, followed by rich conditioning creams to keep leather soft and supple.</li>
        <li><strong>Glass Finishing:</strong> Clean interior glass with specialized microfiber cloths to prevent streaking and haze.</li>
      </ul>
    `
  },
  {
    id: 6,
    slug: 'best-car-spa-franchise-india-2026',
    title: 'Why Starting a Car Spa Franchise is a Highly Lucrative Business in 2026',
    excerpt: "The automotive service industry in India is growing rapidly. Discover the business economics, demand drivers, and why partnering with Cleanz24 offers a high-return franchise opportunity...",
    categories: ['Services', 'Membership'],
    author: 'cleanz24',
    date: 'April 25, 2026',
    dateTime: '2026-04-25',
    image: carblog6,
    readTime: '8 min read',
    content: `
      <h3>The Boom in India's Automotive Market</h3>
      <p>India is one of the fastest-growing automobile markets in the world, with millions of new cars hitting the roads annually. As car ownership increases, so does the demand for premium automotive care services. Car owners are increasingly willing to pay for professional detailing to protect their investments.</p>
      
      <h3>Why the Franchise Model Works</h3>
      <p>Starting a car spa from scratch involves significant challenges—sourcing specialized equipment, training staff, establishing supplier networks, and building brand trust. A Cleanz24 franchise eliminates these hurdles by providing:
      <ul>
        <li><strong>Established Brand Name:</strong> Instant customer trust and national marketing support.</li>
        <li><strong>Standard Operating Procedures:</strong> Step-by-step guidelines for all washing and detailing tasks.</li>
        <li><strong>Supply Chain access:</strong> Premium chemical supplies and equipment at discounted wholesale rates.</li>
        <li><strong>Comprehensive Training:</strong> Continual skill training for technicians to stay updated on the latest paint protection methods.</li>
      </ul>
      </p>
    `
  },
  {
    id: 7,
    slug: 'how-to-remove-scratches-car-paint',
    title: 'How to Safely Remove Light Scratches from Car Paint at Home',
    excerpt: "Don't panic when you spot a light scratch. Our detailing experts explain how to evaluate scratch depth and safely polish out surface scuffs without damaging your clear coat...",
    categories: ['Car Care Tips', 'Detailing'],
    author: 'cleanz24',
    date: 'April 15, 2026',
    dateTime: '2026-04-15',
    image: carblog7,
    readTime: '6 min read',
    content: `
      <h3>Evaluating Scratch Depth</h3>
      <p>Before attempting scratch removal, perform the fingernail test. Gently run your fingernail across the scratch. If your nail catches in the scratch, it has penetrated the clear coat and reached the base paint primer, which requires professional wet sanding or touch-up paint. If it doesn't catch, it is a light clear-coat scratch that can be polished out at home.</p>
      
      <h3>Tools and Materials Needed</h3>
      <ul>
        <li>Microfiber towels</li>
        <li>Dual-action polish compound (fine or medium cut)</li>
        <li>Dual-action foam polishing pads</li>
        <li>Clay bar and detailer lubricant</li>
        <li>Car wax or sealant</li>
      </ul>
      
      <h3>Step-by-Step Polishing Method</h3>
      <p>1. Wash and dry the scratched area thoroughly. 2. Use a clay bar over the area to remove embedded grit. 3. Apply a small amount of compound to your foam pad or towel. 4. Work in a cross-hatch pattern with light, even pressure. 5. Buff away residue and check results under direct light. 6. Apply wax or ceramic spray to restore clear coat protection.</p>
    `
  },
  {
    id: 8,
    slug: 'car-membership-plan-benefits',
    title: 'Is a Car Spa Membership Worth It? Deciding the Best Care Plan',
    excerpt: "A comparison of pay-per-wash services vs. annual membership subscriptions. Discover the financial discounts, exclusive perks, and convenience that come with a Cleanz24 membership...",
    categories: ['Membership'],
    author: 'cleanz24',
    date: 'April 08, 2026',
    dateTime: '2026-04-08',
    image: carblog10_2,
    readTime: '5 min read',
    content: `
      <h3>Pay-Per-Wash vs. Membership Subscriptions</h3>
      <p>For most car owners, washing the car is a recurring task. Over a year, the cost of individual wash services, interior detailing, and occasional paint correction can add up quickly. A structured membership subscription offers a highly economical alternative.</p>
      
      <h3>Why Cleanz24 Membership is the Smart Choice</h3>
      <p>Our annual plans are designed to provide maximum value, convenience, and protection for your vehicle. Benefits include:</p>
      <ul>
        <li><strong>Massive Cost Savings:</strong> Save up to 40% compared to regular single-service pricing.</li>
        <li><strong>Doorstep Valet Pickup & Drop:</strong> No need to spend your weekend waiting at a studio. We collect and return your car.</li>
        <li><strong>Complimentary Add-Ons:</strong> Get free engine bay cleaning, glass treatment, and cabin sanitization included in your plan.</li>
        <li><strong>Flexible Scheduling:</strong> Book appointments seamlessly through our portal.</li>
      </ul>
    `
  },
  {
    id: 9,
    slug: 'monsoon-car-care-tips-india',
    title: 'Monsoon Ready: Essential Car Care & Protection Tips for Indian Rains',
    excerpt: "Heavy rains, waterlogged roads, and mud create a harsh environment for vehicles. Read our guide to preparing your car for the Indian monsoon season, focusing on safety and paint care...",
    categories: ['Car Care Tips'],
    author: 'cleanz24',
    date: 'March 28, 2026',
    dateTime: '2026-03-28',
    image: carblog10_3,
    readTime: '5 min read',
    content: `
      <h3>The Threats of the Monsoon Season</h3>
      <p>The monsoon season in India brings much-needed relief from the heat, but it is notoriously tough on vehicles. Heavy waterlogging, acidic rain residues, mud, and humidity can accelerate rust, damage paint finish, and cause electrical short circuits.</p>
      
      <h3>Crucial Prep Steps</h3>
      <ul>
        <li><strong>Check Windshield Wiper Blades:</strong> Replace streaking or squeaking wipers to ensure maximum visibility during heavy downpours.</li>
        <li><strong>Apply Hydrophobic Glass Treatment:</strong> Ensures rain beads up and slides off the windshield instantly, improving visibility.</li>
        <li><strong>Underbody Anti-Rust Coating:</strong> Protects chassis metals from dirty water splashing from flooded roads.</li>
        <li><strong>Keep the Interior Dry:</strong> Damp interiors lead to mildew, mold, and unpleasant odors. Use rubber mats and wipe down any wet surfaces immediately.</li>
      </ul>
    `
  },
  {
    id: 10,
    slug: 'best-car-wax-vs-polish-guide',
    title: 'Car Wax vs. Car Polish: Which One Does Your Vehicle Need?',
    excerpt: "Waxing and polishing are often confused, but they serve completely opposite functions. Polish cuts and levels the paint, while wax coats and protects it. Read our full comparison guide...",
    categories: ['Car Care Tips', 'Detailing'],
    author: 'cleanz24',
    date: 'March 18, 2026',
    dateTime: '2026-03-18',
    image: carblog10_1,
    readTime: '6 min read',
    content: `
      <h3>Car Polish: Corrective & Abrasive</h3>
      <p>Car polish is designed to remove paint defects such as swirl marks, oxidation, fine scratches, and water spots. It contains micro-abrasives that shave down a microscopic layer of clear coat, leveling the paint surface to restore smooth reflections. Polishing does not offer protection; it must be followed by a sealant or wax.</p>
      
      <h3>Car Wax: Protective & Enhancing</h3>
      <p>Car wax is a protective layer applied on top of the clear coat. It fills in tiny imperfections and acts as a sacrificial barrier against UV rays, acid rain, bird droppings, and road dust. Wax creates a rich, warm glow and makes washing the car much easier. It wears off over 1-3 months and needs periodic reapplication.</p>
      
      <h3>The Ideal Detailing Sequence</h3>
      <p>For the ultimate finish, always <strong>Polish first</strong> to correct paint defects, then <strong>Wax or Seal second</strong> to lock in the gloss and protect the paint.</p>
    `
  }
];

const POSTS_PER_PAGE = 6;

/* ─── Category Badge ─────────────────────────────────────────────────────── */
function CategoryBadge({ category }) {
  const colorMap = {
    'Car Care Tips': { bg: 'rgba(200, 169, 110, 0.1)', color: '#C8A96E' },
    'Detailing':     { bg: 'rgba(0, 201, 109, 0.1)', color: '#00C96D' },
    'Membership':    { bg: 'rgba(49, 130, 206, 0.1)', color: '#3182CE' },
    'Services':      { bg: 'rgba(229, 62, 62, 0.1)', color: '#E53E3E' },
  };
  const c = colorMap[category] || { bg: 'rgba(255,255,255,0.08)', color: '#A0AEC0' };
  return (
    <span
      style={{
        background: c.bg,
        color: c.color,
        borderRadius: '30px',
        fontSize: '11px',
        fontWeight: 700,
        padding: '4px 12px',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        border: `1px solid ${c.color}25`
      }}
    >
      {category}
    </span>
  );
}

/* ─── Blog Card ──────────────────────────────────────────────────────────── */
function BlogCard({ post }) {
  const [hovered, setHovered] = useState(false);
  const { isDarkMode } = useOutletContext() || { isDarkMode: true };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--card-bg)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: hovered
          ? '0 20px 40px rgba(0,201,109,0.08)'
          : (isDarkMode ? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.05)'),
        border: hovered ? '1px solid rgba(0, 201, 109, 0.3)' : '1px solid var(--glass-border)',
        transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9' }}>
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            display: 'block',
          }}
        />
        {/* Read time badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            background: 'rgba(0,0,0,0.85)',
            color: '#fff',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 600,
            padding: '4px 10px',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          ⏱ {post.readTime}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Category badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
          {post.categories.map((cat) => (
            <CategoryBadge key={cat} category={cat} />
          ))}
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: '18px',
            fontWeight: 700,
            lineHeight: 1.4,
            color: 'var(--text-heading)',
            marginBottom: '12px',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <Link
            to={`/car-spa/blog/${post.slug}`}
            style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#00C96D')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
          >
            {post.title}
          </Link>
        </h2>

        {/* Author + Date meta */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '14px',
            fontSize: '13px',
            color: 'var(--text-muted)',
            flexWrap: 'wrap',
          }}
        >
          <span>By</span>
          <Link
            to="/car-spa/blog"
            style={{ color: '#00C96D', fontWeight: 600, textDecoration: 'none' }}
          >
            {post.author}
          </Link>
          <span style={{ color: '#4A5568' }}>·</span>
          <time dateTime={post.dateTime}>{post.date}</time>
        </div>

        {/* Excerpt */}
        <p
          style={{
            fontSize: '14px',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            flex: 1,
            marginBottom: '20px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.excerpt}
        </p>

        {/* Read More */}
        <div
          style={{
            borderTop: '1px solid var(--glass-border)',
            paddingTop: '16px',
          }}
        >
          <Link
            to={`/car-spa/blog/${post.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#00C96D',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.gap = '10px';
              e.currentTarget.style.textShadow = '0 0 10px rgba(0,201,109,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.gap = '6px';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            Read More
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Sidebar ────────────────────────────────────────────────────────────── */
function BlogSidebar({ activeCategory, onCategoryChange, posts }) {
  const { isDarkMode } = useOutletContext() || { isDarkMode: true };
  const cardStyle = {
    background: 'var(--card-bg)',
    backdropFilter: 'blur(12px)',
    border: '1px solid var(--glass-border)',
    borderRadius: '16px',
    padding: '28px',
    marginBottom: '24px',
    boxShadow: isDarkMode ? '0 8px 24px rgba(0,0,0,0.35)' : '0 8px 24px rgba(0,0,0,0.05)',
  };

  const headingStyle = {
    fontSize: '18px',
    fontWeight: 700,
    color: 'var(--text-heading)',
    marginBottom: '20px',
    fontFamily: "'Poppins', sans-serif",
    borderBottom: '2px solid rgba(0, 201, 109, 0.2)',
    paddingBottom: '8px',
    display: 'inline-block'
  };

  const recentPosts = posts.slice(0, 5);

  const categoryCounts = ALL_CATEGORIES.reduce((acc, cat) => {
    if (cat === 'All') acc[cat] = posts.length;
    else acc[cat] = posts.filter((p) => p.categories.includes(cat)).length;
    return acc;
  }, {});

  return (
    <aside>
      {/* Search */}
      <div style={cardStyle}>
        <h3 style={headingStyle}>Search</h3>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            id="blog-search"
            placeholder="Search car tips..."
            style={{
              width: '100%',
              padding: '12px 16px 12px 44px',
              borderRadius: '10px',
              border: '1px solid var(--glass-border)',
              background: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 201, 109, 0.05)',
              color: 'var(--input-text)',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => e.target.style.borderColor = '#00C96D'}
            onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
          />
          <svg
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#718096' }}
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </div>
      </div>

      {/* Categories */}
      <div style={cardStyle}>
        <h3 style={headingStyle}>Categories</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {ALL_CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => onCategoryChange(cat)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: activeCategory === cat
                    ? 'rgba(0, 201, 109, 0.1)'
                    : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  marginBottom: '4px',
                  color: activeCategory === cat ? '#00C96D' : 'var(--text-muted)',
                  fontWeight: activeCategory === cat ? 700 : 500,
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== cat) e.currentTarget.style.color = 'var(--text-heading)';
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat) e.currentTarget.style.color = 'var(--text-muted)';
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {activeCategory === cat && (
                    <span style={{ color: '#00C96D', fontSize: '10px' }}>●</span>
                  )}
                  {cat}
                </span>
                <span
                  style={{
                    background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                    color: activeCategory === cat ? '#00C96D' : 'var(--text-muted)',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    border: activeCategory === cat ? '1px solid rgba(0, 201, 109, 0.2)' : 'none'
                  }}
                >
                  {categoryCounts[cat] || 0}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div style={cardStyle}>
        <h3 style={headingStyle}>Recent Posts</h3>
        {recentPosts.map((post) => (
          <Link
            key={post.id}
            to={`/car-spa/blog/${post.slug}`}
            style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '16px',
              textDecoration: 'none',
              alignItems: 'flex-start',
            }}
          >
            <img
              src={post.image}
              alt={post.title}
              style={{ width: '72px', height: '50px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
            />
            <div>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-heading)',
                  lineHeight: 1.4,
                  marginBottom: '4px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#00C96D'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
              >
                {post.title}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                <time dateTime={post.dateTime}>{post.date}</time>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div style={cardStyle}>
        <h3 style={headingStyle}>Detailing Services</h3>
        {['Crystal Shield', 'Velvet Touch', 'Pearl Radiance', 'Platinum Revival'].map((service) => (
          <Link
            key={service}
            to="/car-spa/services"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: '1px solid var(--glass-border)',
              textDecoration: 'none',
              color: 'var(--text-muted)',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#00C96D';
              e.currentTarget.style.paddingLeft = '6px';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.paddingLeft = '0px';
            }}
          >
            <span>🛡️ {service}</span>
            <span>➜</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}

/* ─── Hero Banner ────────────────────────────────────────────────────────── */
function BlogHero() {
  const { isDarkMode } = useOutletContext() || { isDarkMode: true };
  return (
    <section
      style={{
        position: 'relative',
        background: isDarkMode
          ? 'linear-gradient(135deg, #020704 0%, #081a10 50%, #000000 100%)'
          : 'linear-gradient(135deg, #F4FBF6 0%, #EAF5EE 100%)',
        borderBottom: '1px solid var(--glass-border)',
        color: 'var(--text-heading)',
        padding: '90px 0 80px',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Decorative patterns */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.8,
          zIndex: 1
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(0, 201, 109, 0.05) 0%, transparent 60%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', fontSize: '13px', color: isDarkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', alignItems: 'center' }}>
            <Link to="/car-spa" style={{ color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', textDecoration: 'none' }}>Car Spa</Link>
            <span>›</span>
            <span style={{ color: '#00C96D', fontWeight: 600 }}>Blog</span>
          </div>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(0, 201, 109, 0.08)',
              border: '1px solid rgba(0, 201, 109, 0.25)',
              borderRadius: '30px',
              fontSize: '12px',
              fontWeight: 700,
              padding: '6px 18px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px',
              color: '#00C96D'
            }}
          >
            🏁 DETAILING INSIGHTS
          </span>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 900,
              lineHeight: 1.2,
              marginBottom: '16px',
              fontFamily: "'Oswald', sans-serif",
              letterSpacing: '1px',
            }}
          >
            CAR CARE, POLISHING &amp;{' '}
            <span style={{ color: '#00C96D' }}>GLOSS INTEL</span>
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--text-muted)',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Professional tips on paint correction, ceramic shields, PPF wraps, and detailing maintenance to preserve your automotive asset.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Pagination ─────────────────────────────────────────────────────────── */
function Pagination({ current, total, onChange }) {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Page navigation"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginTop: '40px',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingLeft: '4px',
      }}
    >
      {current > 1 && (
        <button
          onClick={() => onChange(current - 1)}
          aria-label="Previous Page"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '700',
            padding: '4px 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#00C96D'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          &lt;
        </button>
      )}

      {pages.map((p) => {
        const isActive = p === current;
        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-label={`Page ${p}`}
            aria-current={isActive ? 'page' : undefined}
            style={{
              minWidth: '36px',
              height: '36px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              padding: 0,
              background: isActive ? '#00C96D' : 'transparent',
              color: isActive ? '#fff' : 'var(--text-muted)',
              border: isActive ? 'none' : '1px solid var(--glass-border)'
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.color = '#00C96D';
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.color = 'var(--text-muted)';
            }}
          >
            {p}
          </button>
        );
      })}

      {current < total && (
        <button
          onClick={() => onChange(current + 1)}
          aria-label="Next Page"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '700',
            padding: '4px 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#00C96D'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          &gt;
        </button>
      )}
    </nav>
  );
}

/* ─── Main Blog Page Component ───────────────────────────────────────────── */
export default function CarSpaBlog() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useOutletContext() || { isDarkMode: true };
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. DETAIL VIEW RENDER
  if (slug) {
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
      return (
        <div style={{ background: isDarkMode ? '#0a0a0a' : '#f7fafc', minHeight: '100vh', color: 'var(--text-main)', padding: '100px 20px', textAlign: 'center' }}>
          <h2 className="mb-4" style={{ color: 'var(--text-heading)' }}>Article Not Found</h2>
          <p className="text-muted mb-4">The detailing article you are looking for does not exist or has been relocated.</p>
          <Link to="/car-spa/blog" className="btn btn-outline-success px-4 py-2">Back to Blog</Link>
        </div>
      );
    }

    const detailSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "image": post.image,
      "datePublished": post.dateTime,
      "author": {
        "@type": "Organization",
        "name": "Cleanz24 Detailing"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Cleanz24",
        "logo": {
          "@type": "ImageObject",
          "url": "https://cleanz24.com/logo.png"
        }
      },
      "description": post.excerpt
    };

    return (
      <div style={{ background: 'var(--bg-body)', minHeight: '100vh', color: 'var(--text-main)', transition: 'background 0.3s ease, color 0.3s ease' }}>
        <SEOMeta
          title={post.title}
          description={post.excerpt}
          canonical={`https://cleanz24.com/car-spa/blog/${post.slug}`}
          ogImage={post.image}
          ogType="article"
          schema={detailSchema}
        />
        
        {/* Dynamic Detail Hero */}
        <section
          style={{
            position: 'relative',
            height: '45vh',
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, ${isDarkMode ? 'rgba(5,7,5,1)' : '#f7fafc'} 100%), url(${post.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            display: 'flex',
            alignItems: 'flex-end',
            paddingBottom: '40px'
          }}
        >
          <div className="container px-3">
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {post.categories.map((cat) => (
                <CategoryBadge key={cat} category={cat} />
              ))}
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 900, fontFamily: "'Oswald', sans-serif", textShadow: isDarkMode ? '0 2px 10px rgba(0,0,0,0.8)' : 'none', color: 'var(--text-heading)', maxWidth: '900px' }}>
              {post.title}
            </h1>
            <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '14px', marginTop: '12px' }}>
              <span>By <strong style={{ color: '#00C96D' }}>{post.author}</strong></span>
              <span>•</span>
              <time dateTime={post.dateTime}>{post.date}</time>
              <span>•</span>
              <span>⏱ {post.readTime}</span>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="container py-5 px-3">
          <div className="row">
            <div className="col-lg-8">
              {/* Back Link */}
              <Link
                to="/car-spa/blog"
                style={{
                  color: '#00C96D',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '32px',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              >
                ← Back to Detailing Blog
              </Link>

              {/* Main Article Body */}
              <article 
                className="blog-post-content"
                style={{
                  lineHeight: '1.8',
                  fontSize: '16px',
                  color: 'var(--text-main)'
                }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share & Disclaimer */}
              <div 
                style={{ 
                  marginTop: '48px', 
                  padding: '24px', 
                  borderRadius: '12px', 
                  background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', 
                  border: '1px solid var(--glass-border)',
                  fontSize: '13px',
                  color: 'var(--text-muted)'
                }}
              >
                <p className="mb-0"><strong>Disclaimer:</strong> The opinions and tips expressed in this blog are based on general car detailing best practices. Always test products in an inconspicuous paint area first or consult a Cleanz24 certified master technician for tailored vehicle advice.</p>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="col-lg-4 mt-5 mt-lg-0">
              <BlogSidebar
                activeCategory={activeCategory}
                onCategoryChange={(cat) => {
                  setActiveCategory(cat);
                  navigate('/car-spa/blog');
                }}
                posts={BLOG_POSTS}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. GRID / LIST VIEW RENDER
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      activeCategory === 'All' || post.categories.includes(activeCategory);
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Sync sidebar search with state
  useEffect(() => {
    const input = document.getElementById('blog-search');
    if (!input) return;
    const handler = (e) => setSearchQuery(e.target.value);
    input.addEventListener('input', handler);
    return () => input.removeEventListener('input', handler);
  }, []);

  return (
    <div style={{ background: 'var(--bg-body)', minHeight: '100vh', color: 'var(--text-main)', transition: 'background 0.3s ease, color 0.3s ease' }}>
      <SEOMeta
        title="Car Detailing Tips & Blog"
        description="Read professional advice on car wash, paint polishing, ceramic coating applications, PPF wrap protection, and general automobile grooming in India."
        canonical="https://cleanz24.com/car-spa/blog"
        ogImage="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80"
      />

      {/* Hero */}
      <BlogHero />

      {/* Main Content */}
      <div className="container" style={{ padding: '60px 16px' }}>

        {/* Mobile category pills */}
        <div
          className="d-lg-none"
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '8px',
            marginBottom: '32px',
            paddingBottom: '8px',
            scrollbarWidth: 'none',
          }}
        >
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                flexShrink: 0,
                background: activeCategory === cat ? '#00C96D' : (isDarkMode ? 'rgba(10, 26, 16, 0.65)' : 'var(--card-bg)'),
                color: activeCategory === cat ? '#fff' : 'var(--text-muted)',
                border: activeCategory === cat ? '1px solid #00C96D' : '1px solid var(--glass-border)',
                borderRadius: '20px',
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="row g-0">
          {/* ── Posts Column ── */}
          <div className="col-lg-8 pe-lg-4">
            {/* Results info */}
            <div
              style={{
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
                Showing{' '}
                <strong style={{ color: 'var(--text-heading)' }}>
                  {filteredPosts.length}
                </strong>{' '}
                {filteredPosts.length === 1 ? 'article' : 'articles'}
                {activeCategory !== 'All' && (
                  <>
                    {' '}in{' '}
                    <strong style={{ color: '#00C96D' }}>{activeCategory}</strong>
                  </>
                )}
              </p>
            </div>

            {/* Posts grid */}
            <AnimatePresence mode="wait">
              {paginatedPosts.length > 0 ? (
                <motion.div
                  key={`${activeCategory}-${currentPage}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="row g-4"
                >
                  {paginatedPosts.map((post) => (
                    <div key={post.id} className="col-md-6">
                      <BlogCard post={post} />
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ textAlign: 'center', padding: '80px 20px' }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
                  <h3
                    style={{
                      fontSize: '22px',
                      fontWeight: 700,
                      color: 'var(--text-heading)',
                      fontFamily: "'Oswald', sans-serif",
                    }}
                  >
                    No articles found
                  </h3>
                  <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
                    Try a different category or search term.
                  </p>
                  <button
                    onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                    style={{
                      marginTop: '20px',
                      background: '#00C96D',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '30px',
                      padding: '12px 28px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 0 15px rgba(0,201,109,0.3)',
                    }}
                  >
                    Show All Posts
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            <Pagination
              current={currentPage}
              total={totalPages}
              onChange={(p) => {
                setCurrentPage(p);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
            />
          </div>

          {/* ── Sidebar ── */}
          <div className="col-lg-4 d-none d-lg-block">
            <BlogSidebar
              activeCategory={activeCategory}
              onCategoryChange={(cat) => setActiveCategory(cat)}
              posts={BLOG_POSTS}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
