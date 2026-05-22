export const testimonialsData = [
  {
    text: "My car was covered in thick mud after a weekend trip. The Cleanz24 team performed their Deep Clean Detailing Wash. The engine bay looks brand new, the interiors are spotless, and the active foam didn't leave a single water spot!",
    name: "Aman Malhotra",
    role: "Hyundai i20 Owner",
    image: "https://i.pravatar.cc/150?img=11"
  },
  {
    text: "The Ceramic Shield Wash is incredible. The hydrophobic wax coating they spray at the end makes rainwater slide right off. My car stayed clean for two weeks despite dusty weather.",
    name: "Vikramjit Singh",
    role: "Kia Seltos Owner",
    image: "https://i.pravatar.cc/150?img=33"
  },
  {
    text: "Excellent service! I booked their Premium Wash & Vacuum. They picked up the car from my office and delivered it back sparkling clean inside and out. The dashboard polish smell is very premium.",
    name: "Ananya Sen",
    role: "Honda City Owner",
    image: "https://i.pravatar.cc/150?img=47"
  }
];

export const featuresData = [
  { icon: '🧼', title: 'Dense Snow Foam', desc: 'pH-neutral active foam encapsulating grit and road grime to ensure a completely scratch-free wash.' },
  { icon: '🌪️', title: 'High-Pressure Rinse', desc: 'Powerful 150-bar pressure jets targeting wheel wells, underbody dirt, and tight gaps safely.' },
  { icon: '✨', title: 'Ceramic Spray Seal', desc: 'SiO2-infused wax barrier application that repels water, dust, and delivers a glossy glass reflections.' },
  { icon: '🔑', title: 'Doorstep Valet Transit', desc: 'Fully insured, secure chauffeur pickup and delivery operations so you do not have to leave your home.' }
];

export const servicesData = [
  { 
    icon: '💦', 
    title: 'Foam & Pressure Wash', 
    desc: 'Our standard wash package. High-pressure pre-rinse, dense snow foam bath, micro-fiber hand wash agitation, and complete air-blow drying with tire dressing.' 
  },
  { 
    icon: '✨', 
    title: 'Deep Clean Detailing Wash', 
    desc: 'Complete interior and exterior overhaul. Includes underbody washing, engine bay dressing, interior steam cleaning, full vacuuming, and console sanitization.' 
  },
  { 
    icon: '💎', 
    title: 'Ceramic Wax Protective Wash', 
    desc: 'Ultimate washing combined with premium paint protection. Clay-bar paint prep followed by advanced spray-on ceramic liquid sealant for lasting water beading and shine.' 
  }
];

export const processStepsData = [
  { num: '01', title: 'High-Pressure Rinse', desc: 'Initial high-pressure water spray to loosen and dislodge mud, sand, and heavy surface debris safely.' },
  { num: '02', title: 'Active Snow Foam Bath', desc: 'Blanketing the vehicle in thick, pH-neutral active foam to dissolve road film and trap dust particles.' },
  { num: '03', title: 'Two-Bucket Mitt Wash', desc: 'Detailed hand agitation cleaning using premium lambskin mitts and separate grit-guard buckets to prevent swirls.' },
  { num: '04', title: 'Underbody & Wheel Wash', desc: 'Thorough cleaning of alloy rims, wheel arches, brake calipers, and a dedicated high-pressure under-chassis wash.' },
  { num: '05', title: 'Interior Deep Vacuum', desc: 'Full cabin and boot vacuuming, carpet brushing, dashboard detailing, and deep glass cleaning.' },
  { num: '06', title: 'Microfiber Dry & Seal', desc: 'Blow-drying panel gaps, hand drying with plush microfibers, and applying tire dressing and paint wax sealant.' }
];

export const faqsData = [
  { 
    q: "Do you use hard water for washing the cars?", 
    a: "No, we use soft water with balanced TDS levels along with pH-neutral shampoos to prevent hard-water scaling and ensure no drying water-spots are left on your paint." 
  },
  { 
    q: "What is the difference between a standard foam wash and a Ceramic Wax Wash?", 
    a: "A standard wash cleans the dirt off the paint. A Ceramic Wax Wash adds a clay-bar detailing treatment to remove bonded iron particles, followed by an SiO2 ceramic sealant that repels water and keeps the car glossy for months." 
  },
  { 
    q: "How does the doorstep pickup and delivery work?", 
    a: "When you schedule a slot, a professional, insured Cleanz24 driver picks up your car, takes it to the nearest high-tech wash bay, performs the service, and delivers it back to your doorstep." 
  },
  { 
    q: "Is engine washing safe for my car's electronics?", 
    a: "Yes. Our technicians protect sensitive electronic components, use low-moisture cleaning methods followed by high-pressure air drying, and finish with a non-sticky protective dressing." 
  }
];

export const storesData = [
  {
    id: 1,
    name: "Cleanz24 Store Yelahanka New Town Bangalore",
    address: "1219, Ground Floor, Sector B, 8th Cross, Bangalore, Karnataka",
    rating: 4.8,
    reviews: 142
  },
  {
    id: 2,
    name: "Cleanz24 Store Attibele Bangalore",
    address: "No 752/486, First Floor, Sri Chowdeshwari Complex, Anekal Road, Bangalore, Karnataka",
    rating: 4.9,
    reviews: 98
  },
  {
    id: 3,
    name: "Cleanz24 Store Pulikeshi Nagar Bangalore",
    address: "Shop No 41/2, Frazer Town, Promenade Road, Bangalore, Karnataka",
    rating: 4.7,
    reviews: 125
  }
];

export const pricingPackagesData = {
  hatchback: [
    { name: 'Eco Foam Wash', price: '₹399', warranty: 'Standard', layers: 'Exterior Only', services: ['High-Pressure Rinse', 'Snow Foam Bath', 'Microfiber Towel Dry', 'Basic Glass Wipe', 'Tire Dressing'] },
    { name: 'Premium Wash & Vacuum', price: '₹799', warranty: 'Deep Clean', layers: 'Int + Ext', services: ['Exterior Foam Wash', 'Full Underbody Spray', 'Cabin Vacuuming', 'Dashboard Cleaning', 'Air Purifier Spray'] },
    { name: 'Ultra Polish & Wash', price: '₹1,499', warranty: 'Gloss Boost', layers: 'Polished Finish', services: ['Premium Wash & Vacuum', 'Engine Bay Dressing', 'Liquid Hand Wax Coat', 'AC Vent Cleaning', 'Foot Mat Wash'] },
    { name: 'Ceramic Shield Wash', price: '₹2,499', warranty: '3-Month Protect', layers: 'SiO2 Hydrophobic', services: ['Ultra Polish & Wash', 'Clay Bar Treatment', 'Ceramic Spray Sealant', 'Leather Conditioning', 'Rain Repellent (Glass)'] }
  ],
  sedan: [
    { name: 'Eco Foam Wash', price: '₹499', warranty: 'Standard', layers: 'Exterior Only', services: ['High-Pressure Rinse', 'Snow Foam Bath', 'Microfiber Towel Dry', 'Basic Glass Wipe', 'Tire Dressing'] },
    { name: 'Premium Wash & Vacuum', price: '₹999', warranty: 'Deep Clean', layers: 'Int + Ext', services: ['Exterior Foam Wash', 'Full Underbody Spray', 'Cabin Vacuuming', 'Dashboard Cleaning', 'Air Purifier Spray'] },
    { name: 'Ultra Polish & Wash', price: '₹1,799', warranty: 'Gloss Boost', layers: 'Polished Finish', services: ['Premium Wash & Vacuum', 'Engine Bay Dressing', 'Liquid Hand Wax Coat', 'AC Vent Cleaning', 'Foot Mat Wash'] },
    { name: 'Ceramic Shield Wash', price: '₹2,999', warranty: '3-Month Protect', layers: 'SiO2 Hydrophobic', services: ['Ultra Polish & Wash', 'Clay Bar Treatment', 'Ceramic Spray Sealant', 'Leather Conditioning', 'Rain Repellent (Glass)'] }
  ],
  suv: [
    { name: 'Eco Foam Wash', price: '₹599', warranty: 'Standard', layers: 'Exterior Only', services: ['High-Pressure Rinse', 'Snow Foam Bath', 'Microfiber Towel Dry', 'Basic Glass Wipe', 'Tire Dressing'] },
    { name: 'Premium Wash & Vacuum', price: '₹1,199', warranty: 'Deep Clean', layers: 'Int + Ext', services: ['Exterior Foam Wash', 'Full Underbody Spray', 'Cabin Vacuuming', 'Dashboard Cleaning', 'Air Purifier Spray'] },
    { name: 'Ultra Polish & Wash', price: '₹2,199', warranty: 'Gloss Boost', layers: 'Polished Finish', services: ['Premium Wash & Vacuum', 'Engine Bay Dressing', 'Liquid Hand Wax Coat', 'AC Vent Cleaning', 'Foot Mat Wash'] },
    { name: 'Ceramic Shield Wash', price: '₹3,499', warranty: '3-Month Protect', layers: 'SiO2 Hydrophobic', services: ['Ultra Polish & Wash', 'Clay Bar Treatment', 'Ceramic Spray Sealant', 'Leather Conditioning', 'Rain Repellent (Glass)'] }
  ],
  luxury: [
    { name: 'Eco Foam Wash', price: '₹799', warranty: 'Standard', layers: 'Exterior Only', services: ['High-Pressure Rinse', 'Snow Foam Bath', 'Microfiber Towel Dry', 'Basic Glass Wipe', 'Tire Dressing'] },
    { name: 'Premium Wash & Vacuum', price: '₹1,499', warranty: 'Deep Clean', layers: 'Int + Ext', services: ['Exterior Foam Wash', 'Full Underbody Spray', 'Cabin Vacuuming', 'Dashboard Cleaning', 'Air Purifier Spray'] },
    { name: 'Ultra Polish & Wash', price: '₹2,599', warranty: 'Gloss Boost', layers: 'Polished Finish', services: ['Premium Wash & Vacuum', 'Engine Bay Dressing', 'Liquid Hand Wax Coat', 'AC Vent Cleaning', 'Foot Mat Wash'] },
    { name: 'Ceramic Shield Wash', price: '₹3,999', warranty: '3-Month Protect', layers: 'SiO2 Hydrophobic', services: ['Ultra Polish & Wash', 'Clay Bar Treatment', 'Ceramic Spray Sealant', 'Leather Conditioning', 'Rain Repellent (Glass)'] }
  ]
};
