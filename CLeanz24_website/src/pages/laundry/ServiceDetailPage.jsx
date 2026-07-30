import React, { useState, useEffect } from 'react';
import { useParams, Link, useOutletContext, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEOMeta from '../../components/SEOMeta';
import { GOOGLE_SHEETS_LAUNDRY_SCRIPT_URL } from '../../config';

import srvLaundryImg from '../../assets/service_laundry.png';
import srvDryImg from '../../assets/service_dry.png';
import srvHomeImg from '../../assets/service_home.png';
import srvIronImg from '../../assets/service_iron.png';
import srvShoeImg from '../../assets/service_shoe.png';

export const SERVICE_DETAILS_DATA = {
  'premium-laundry': {
    slug: 'premium-laundry',
    title: 'Premium Wash & Fold / Wash & Steam Iron Service',
    subtitle: 'Hygienic, Eco-Friendly Everyday Laundry with Free Doorstep Pickup & Delivery',
    category: 'Daily Garment Care',
    icon: srvLaundryImg,
    color: '#3b82f6',
    seoTitle: 'Best Wash & Fold Laundry Service Near Me | Cleanz24 Premium Laundry',
    seoDesc: 'Experience 100% hygienic wash and fold, wash & steam iron laundry service. pH-neutral German detergents, zero garment mixing, soft water wash, and doorstep delivery.',
    seoKeywords: 'wash and fold near me, premium laundry service, hygienic clothes washing, wash and steam iron, soft water laundry service, eco friendly laundry detergent',
    longTailKeywords: [
      'pH-neutral soft water wash & fold near me',
      'zero mixing individual machine cycle laundry',
      'eco-friendly German liquid detergent clothes wash',
      'antibacterial fabric sanitizer laundry pickup',
      'wrinkle-free steam pressed daily laundry service'
    ],
    pricing: [
      { service: 'Wash & Fold (Everyday Wear)', price: '₹99 / kg', turnaround: '24-48 Hours', note: 'Separated by colors & fabric types' },
      { service: 'Wash & Steam Iron', price: '₹149 / kg', turnaround: '24-48 Hours', note: 'Includes 3D vacuum steam pressing' },
      { service: 'Premium Linen & Towel Care', price: '₹129 / kg', turnaround: '48 Hours', note: 'Deep fluffing & eco-softener treatment' },
      { service: 'Baby Wear & Delicate Hygiene Wash', price: '₹169 / kg', turnaround: '24 Hours', note: 'Hypoallergenic organic detergent wash' }
    ],
    whyChoose: [
      { title: '100% Dedicated Machine Cycles', desc: 'We strictly process every customer’s clothes in dedicated, sanitized machine loads. Zero garment mixing guaranteed.' },
      { title: 'pH-Balanced German Detergents', desc: 'Our eco-friendly liquid detergents prevent color fading, fabric thinning, and chemical residue buildup.' },
      { title: 'Reverse Osmosis (RO) Soft Water', desc: 'Washing in soft water protects garment cotton fibers from harsh mineral deposits and stiffness.' },
      { title: 'Breathable Protective Packaging', desc: 'Clean clothes are packed in custom anti-dust, breathable garment wraps to preserve freshness.' }
    ],
    processSteps: [
      { step: '01', title: 'Smart Inspection & Tagging', desc: 'Every garment is scanned, checked for existing spots, color fastness, and care label instructions.' },
      { step: '02', title: 'Color & Fabric Sorting', desc: 'Dark, light, white, and delicate fabrics are separated into dedicated processing cycles.' },
      { step: '03', title: 'Hydro-Soft Wash & Sanitize', desc: 'Washed using temperature-calibrated soft water and bio-degradable fabric conditioners.' },
      { step: '04', title: 'Moisture Control Drying', desc: 'Tumble dried at gentle temperatures to protect stretch elastics and prevent shrinkage.' },
      { step: '05', title: '3D Vacuum Steam Press & Pack', desc: 'Pressed using high-velocity steam irons, neatly folded or hung, and delivered to your doorstep.' }
    ],
    fabricCareGuide: [
      { fabric: '100% Cotton & Linens', treatment: 'Softened water wash at 30°C, pH-neutral detergent, low temp tumble drying to prevent fiber shrinkage.' },
      { fabric: 'Activewear & Synthetics', treatment: 'Cool water wash with anti-odor enzymes, zero fabric softener to maintain sweat-wicking breathability.' },
      { fabric: 'Infant & Baby Wear', treatment: 'Dermatologically tested organic cleansing agents, dual rinse cycle, thermal steam sanitization.' },
      { fabric: 'Casual Denim & Knits', treatment: 'Inside-out gentle washing to retain dye depth, shape-restoring air drying, soft steam finish.' }
    ],
    comparison: [
      { feature: 'Garment Hygiene & Mixing', cleanz24: '100% Dedicated Machine per Customer', local: 'Mixed with multiple customers’ clothes' },
      { feature: 'Water Quality', cleanz24: 'Filtered Softened Water (Zero Mineral Hardness)', local: 'Borewell / Hard municipal water' },
      { feature: 'Detergents Used', cleanz24: 'pH-Neutral Eco-Friendly Liquid Solutions', local: 'Harsh caustic chemical powders' },
      { feature: 'Drying Technology', cleanz24: 'Hygiene Tumble Dryers (Dust-Free)', local: 'Open air drying exposed to dust & pollution' },
      { feature: 'Pickup & Delivery', cleanz24: 'Scheduled Free Doorstep Pickup & Tracked Delivery', local: 'Self-drop off or unreliable local runner' }
    ],
    paaFaqs: [
      {
        q: 'What is the difference between Wash & Fold and Dry Cleaning?',
        a: 'Wash & Fold is a water-based washing process designed for everyday casual wear like t-shirts, jeans, pajamas, and bedsheets using soft water and detergents. Dry Cleaning is a non-aqueous, solvent-based deep cleaning method specifically designed for delicate, non-washable fabrics like silk sarees, woolens, suit blazers, and embellished designer wear.'
      },
      {
        q: 'Are my clothes washed separately from other people’s laundry?',
        a: 'Yes, absolutely. At Cleanz24, we follow a strict zero-mixing policy. Each customer’s order is washed and dried in an individual machine cycle to maintain 100% hygiene and prevent any cross-contamination.'
      },
      {
        q: 'Do you offer free doorstep pickup and delivery for laundry?',
        a: 'Yes, we provide free doorstep pickup and delivery across all our active store operational zones. You can schedule a pickup online or via WhatsApp, and our logistics partner will collect your laundry bag at your preferred time slot.'
      },
      {
        q: 'How do you handle color bleeding or stain removal in laundry?',
        a: 'Our certified garment technicians inspect every item prior to washing. Colors are meticulously sorted, and any stubborn spots (oil, coffee, ink, sweat marks) are pre-treated with fabric-safe enzyme spotters before entering the wash cycle.'
      },
      {
        q: 'What detergents do you use for sensitive skin and baby clothes?',
        a: 'We use premium, dermatologically tested, pH-neutral liquid detergents imported from Germany. They are free from harsh phosphates, optical brighteners, and toxic bleaching agents, making them completely safe for sensitive skin and infant garments.'
      },
      {
        q: 'What is the average turnaround time for premium laundry?',
        a: 'Standard turnaround time for Wash & Fold and Wash & Steam Iron is 24 to 48 hours. Express same-day or 12-hour turnaround services are also available upon request.'
      }
    ],
    articleBody: `
      <h2>Why Professional Premium Laundry Service is Essential for Modern Wardrobes</h2>
      <p>Managing daily household laundry can consume hours of valuable weekly time. More importantly, domestic washing machines often struggle with hard water mineral deposits, improper detergent dosing, and harsh drying line friction that gradually degrades fabric texture, causes color fading, and weakens cotton fibers.</p>

      <p>Cleanz24's Premium Laundry Service reimagines everyday garment care. We combine advanced German laundry technology, Reverse Osmosis (RO) softened water systems, and eco-friendly liquid cleansing agents to deliver a hotel-grade laundry experience directly to your home. Whether it is your daily office shirts, weekend casuals, activewear, or delicate bed linens, every garment receives tailored care designed to extend fabric longevity.</p>

      <h3>The Science of Soft Water Washing & pH-Neutral Detergents</h3>
      <p>Hard water contains high concentrations of calcium and magnesium minerals that bind to cloth fibers during a wash cycle. This creates a stiff, scratchy texture and leaves behind invisible soap scum that dulls vibrant colors. At Cleanz24, our automated water softening plants eliminate mineral hardness completely. Combined with pH-neutral bio-detergents, our wash process gently lifts embedded sweat, dirt, and odor molecules without eroding thread strength.</p>

      <h3>Zero-Mixing Hygiene Protocol: Cleanliness You Can Trust</h3>
      <p>Unlike traditional neighborhood dhobis or commercial laundries that wash clothes from multiple households together in massive vats, Cleanz24 guarantees 100% individual processing. Your laundry load travels through dedicated washing machines, dryers, and steam pressing stations. This strict hygienic separation ensures complete peace of mind for families, infants, and individuals with sensitive skin conditions.</p>
    `
  },

  'eco-friendly-dry-cleaning': {
    slug: 'eco-friendly-dry-cleaning',
    title: 'Eco-Friendly Dry Cleaning Service',
    subtitle: 'Solvent-Based & Organic Wet Cleaning for Suits, Silk Sarees, Lehengas & Designer Outfits',
    category: 'Specialty Garment Care',
    icon: srvDryImg,
    color: '#10b981',
    seoTitle: 'Best Organic Dry Cleaning Service Near Me | Cleanz24 Eco Dry Cleaner',
    seoDesc: 'Gentle, eco-friendly dry cleaning for silk sarees, heavy bridal lehengas, suit blazers, and designer wear. Non-toxic hydrocarbon solvents, zero chemical odor, free doorstep pickup.',
    seoKeywords: 'dry cleaning near me, organic dry cleaner, silk saree dry cleaning cost, suit dry cleaner, designer garment dry cleaning, hydrocarbon dry cleaning service',
    longTailKeywords: [
      'eco friendly hydrocarbon dry cleaning near me',
      'silk saree stain removal dry cleaner price',
      'bridal lehenga heavy embroidery dry cleaning',
      'men suit blazer dry cleaner free doorstep pickup',
      'non-toxic odorless organic wet cleaning service'
    ],
    pricing: [
      { service: 'Men Suit 2-Piece (Blazer + Trouser)', price: '₹349 / set', turnaround: '48 Hours', note: 'Hydrocarbon dry clean & 3D press' },
      { service: 'Silk / Georgette Saree', price: '₹299 / piece', turnaround: '48-72 Hours', note: 'Includes border stain treatment' },
      { service: 'Heavy Bridal Lehenga / Gown', price: '₹799 - ₹1,499', turnaround: '72 Hours', note: 'Hand-spotted & sequence protected' },
      { service: 'Overcoat / Heavy Winter Jacket', price: '₹399 / piece', turnaround: '48 Hours', note: 'Deep fiber conditioning & moth-proofing' }
    ],
    whyChoose: [
      { title: 'Non-Toxic Hydrocarbon Solvents', desc: 'We have replaced toxic PERC chemicals with eco-friendly hydrocarbon and organic wet cleaning solutions.' },
      { title: 'Preserves Embellishments & Trims', desc: 'Delicate sequins, zardozi embroidery, lace, and beadwork are shielded using protective mesh encapsulation.' },
      { title: 'Zero Chemical Odor', desc: 'Garments return smelling completely fresh, clean, and fragrance-free — zero harsh petroleum fumes.' },
      { title: 'Color Depth Protection', desc: 'Solvent cleaning dissolves oil and grease without bleeding dyes or fading rich fabric lusters.' }
    ],
    processSteps: [
      { step: '01', title: 'Fiber & Care Label Diagnostic', desc: 'Expert inspection under specialized lighting to identify fabric weave, dyes, and stain chemistry.' },
      { step: '02', title: 'Specialized Pre-Spotting', desc: 'Manual pre-treatment of collars, cuffs, and stubborn stains using targeted non-acidic spotters.' },
      { step: '03', title: 'Hydrocarbon Solvent Cleaning', desc: 'Gentle closed-loop solvent washing that extracts grease while preserving thread elasticity.' },
      { step: '04', title: 'Gentle Deodorization & Drying', desc: 'Controlled warm air recirculating drying cycles to reclaim solvents and banish chemical odors.' },
      { step: '05', title: 'Hand Finishing & Hanger Packaging', desc: 'Custom hand steam pressing, shoulder pad shaping, and breathable dust cover packaging.' }
    ],
    fabricCareGuide: [
      { fabric: 'Pure Silk & Kanjivaram Sarees', treatment: 'Gentle hydrocarbon solvent dry cleaning, zero water exposure to avoid water rings, steam-restored sheen.' },
      { fabric: 'Wool & Cashmere Suits', treatment: 'Moisture-controlled dry cleaning, lint removal, shoulder contour pressing, moth-repellent herbal treatment.' },
      { fabric: 'Zardozi & Embellished Lehengas', treatment: 'Custom net wrapping, low-mechanical action solvent bath, hand-held spot steam finishing.' },
      { fabric: 'Velvet & Leather Trims', treatment: 'Specialized velvet brush pile restoration, leather conditioning solvents, deep color locking.' }
    ],
    comparison: [
      { feature: 'Chemical Solvent Used', cleanz24: 'Safe Eco-Friendly Hydrocarbon & Organic Wet Clean', local: 'Toxic Perchloroethylene (PERC - banned in EU)' },
      { feature: 'Garment Odor', cleanz24: 'Zero chemical fumes; fresh natural feel', local: 'Strong pungent chemical smell' },
      { feature: 'Fabric Lifespan Impact', cleanz24: 'Extends fiber strength and fabric sheen', local: 'Causes fiber brittleness, yellowing & fading' },
      { feature: 'Stain Treatment', cleanz24: '14-stage chemical spotter bar by trained spotters', local: 'Generic rubbing causing dye damage' },
      { feature: 'Embroidery Protection', cleanz24: 'Encapsulated wash bags & hand-finished steam', local: 'High friction drum tumble causing sequin loss' }
    ],
    paaFaqs: [
      {
        q: 'Why is eco-friendly hydrocarbon dry cleaning better than traditional PERC dry cleaning?',
        a: 'Traditional dry cleaners use Perchloroethylene (PERC), a harsh synthetic solvent linked to health risks, fabric stiffening, and unpleasant chemical odors. Cleanz24 uses advanced hydrocarbon and organic wet cleaning technologies. Hydrocarbon solvents are biodegradable, gentle on delicate silk and wool fibers, completely odorless, and environmentally safe.'
      },
      {
        q: 'Can dry cleaning remove old oil or food stains from silk sarees?',
        a: 'Yes! Our dry cleaning facility is equipped with an advanced 14-agent stain removal bar. Our master stain technicians utilize specialized non-water spotters for grease, oil, makeup, wine, curry, and ink. While fresh stains have a 98% removal rate, even older set-in stains are dramatically lightened without harming the silk luster.'
      },
      {
        q: 'How do you clean heavy bridal lehengas with delicate zardozi work?',
        a: 'Heavy bridal wear receives white-glove treatment. Before cleaning, all delicate tassels, mirrors, and sequence patches are encapsulated in protective cotton mesh wraps. The garment is cleaned in low-rpm gentle hydrocarbon baths, followed by hand finishing with micro-steam wands to ensure zero damage to gold or silver threads.'
      },
      {
        q: 'How often should men dry clean their suits and blazers?',
        a: 'Professional suits and blazers should generally be dry cleaned after every 3 to 5 wears, or immediately after a major event. Frequent water washing damages canvas interlinings, whereas hydrocarbon dry cleaning removes body oils, perspiration, and shoulder dust while preserving suit structure.'
      },
      {
        q: 'Are clothes returned on hangers with protective covers?',
        a: 'Yes. All dry-cleaned suits, gowns, blazers, and sarees are returned on ergonomic shaped hangers wrapped in premium anti-dust, breathable garment bags to protect them from wardrobe dust and humidity.'
      },
      {
        q: 'What is the turnaround time for saree and suit dry cleaning?',
        a: 'Standard dry cleaning turnaround is 48 to 72 hours. For emergency weddings or travel needs, express 24-hour delivery is available.'
      }
    ],
    articleBody: `
      <h2>The Ultimate Guide to Modern Organic & Hydrocarbon Dry Cleaning</h2>
      <p>High-end designer clothing, handloom silk sarees, tailored suits, and winter woolens represent significant personal investments. Standard domestic washing machines rely on water and mechanical agitation, which causes silk fibers to lose their natural sheen, wool coats to shrink, and suit shoulder padding to deform permanently.</p>

      <p>Cleanz24's Eco-Friendly Dry Cleaning service provides world-class garment preservation. By combining non-toxic hydrocarbon solvent technology with specialized organic wet cleaning, we effectively dissolve stubborn oils, perspiration marks, and food stains while keeping delicate fabrics soft, vibrant, and structural intact.</p>

      <h3>Say Goodbye to Toxic PERC Fumes</h3>
      <p>For decades, conventional dry cleaning plants operated with Perchloroethylene (PERC). Beyond its harsh environmental footprint, PERC leaves garments with a chemical petroleum smell and breaks down fabric dyes over time. Cleanz24 pioneered green dry cleaning in India. Our hydrocarbon solvent machines operate in a closed-loop system, ensuring zero chemical fumes, zero toxic runoff, and skin-friendly garments returned to your closet.</p>

      <h3>Preserving Heavy Ethnic & Bridal Wear</h3>
      <p>Silk sarees, dupattas, and heavy designer lehengas adorned with zardozi, gota patti, stone work, and embroidery require master craftsmanship. Our certified spotters inspect every inch of your outfit, applying targeted treatments before executing low-friction solvent baths. After cleaning, our vertical steam pressing restores original pleats and drape alignment effortlessly.</p>
    `
  },

  'steam-ironing': {
    slug: 'steam-ironing',
    title: 'Professional Steam Ironing & Pressing Service',
    subtitle: 'High-Velocity 3D Vacuum Steam Pressing for Crisp, Scorch-Free Garments',
    category: 'Garment Finishing',
    icon: srvIronImg,
    color: '#f59e0b',
    seoTitle: 'Best Steam Ironing & Steam Press Service Near Me | Cleanz24',
    seoDesc: 'Get showroom-finish steam ironing at your doorstep. Vacuum suction ironing tables, zero fabric scorch, crisp collar lines, free pickup and delivery.',
    seoKeywords: 'steam ironing near me, steam press service, professional iron for clothes, clothes press price, steam iron doorstep pickup, wrinkle free steam press',
    longTailKeywords: [
      'vacuum suction steam press service price per shirt',
      'scorch free vertical steam iron for formal suits',
      'doorstep pickup steam pressing service near me',
      'linen shirt and kurta steam iron professional finish',
      'crease resistant vacuum steam pressing subscription'
    ],
    pricing: [
      { service: 'Formal Shirt / T-Shirt Steam Press', price: '₹15 / piece', turnaround: '24 Hours', note: 'Returned on hanger or crisp fold' },
      { service: 'Trouser / Denim Steam Press', price: '₹20 / piece', turnaround: '24 Hours', note: 'Double-crease protection vacuum board' },
      { service: 'Suit Blazer / Coat Steam Press', price: '₹99 / piece', turnaround: '24 Hours', note: 'Shoulder contour steam molding' },
      { service: 'Silk Saree / Heavy Kurta Steam Press', price: '₹79 / piece', turnaround: '24 Hours', note: 'Low temp moisture controlled steam' }
    ],
    whyChoose: [
      { title: 'Vacuum Suction Ironing Tables', desc: 'Our industrial tables pull steam instantly through fabric fibers, preventing moisture dampness and double creases.' },
      { title: 'Zero Scorch & Shine Guarantee', desc: 'Unlike domestic dry irons that leave shiny press marks and scorch delicate synthetics, steam never burns cloth.' },
      { title: '3D Form Finisher Technology', desc: 'Suits, jackets, and dresses are pressed on anatomical inflatable forms to restore natural tailored contours.' },
      { title: 'Hanger or Folded Packaging', desc: 'Choose whether you want your formal shirts hung on custom hangers or neatly wrapped for travel.' }
    ],
    processSteps: [
      { step: '01', title: 'Fabric Sorting & Temp Calibration', desc: 'Cotton, linen, silk, and synthetic items are sorted to match specific boiler steam pressures.' },
      { step: '02', title: 'High-Velocity Steam Injection', desc: 'Dry pressurized steam penetrates deep into fabric weave to relax stubborn fiber wrinkles.' },
      { step: '03', title: 'Vacuum Exhaust Moisture Removal', desc: 'Under-table vacuum suction pulls out all residual steam, setting a razor-sharp, durable crease.' },
      { step: '04', title: 'Detailing & Collar Pressing', desc: 'Specialized sleeve arms and collar presses shape cuffs, lapels, and plackets flawlessly.' },
      { step: '05', title: 'Hanger Mounting & Protective Wrap', desc: 'Mounted on sturdy ergonomic hangers and poly-wrapped to ensure zero wrinkles during transit.' }
    ],
    fabricCareGuide: [
      { fabric: 'Pure Linen Shirts & Pants', treatment: 'High-volume dry steam injection with strong vacuum suction to lock crisp pleats without stiffness.' },
      { fabric: 'Silk & Delicate Rayon', treatment: 'Teflon-coated shoe steam ironing at low temperature, zero direct metal contact to preserve natural sheen.' },
      { fabric: 'Formal Suits & Blazers', treatment: 'Vertical steam wand treatment combined with chest form molding; zero flat table compression.' },
      { fabric: 'Pleated Skirts & Dresses', treatment: 'Hand-pinned crease setting on vacuum board followed by micro-point steam jet pressing.' }
    ],
    comparison: [
      { feature: 'Pressing Method', cleanz24: 'High-Velocity Vacuum Steam Ironing', local: 'Domestic Heavy Charcoal / Electric Dry Iron' },
      { feature: 'Fabric Protection', cleanz24: '100% Scorch-Free & Zero Shiny Marks', local: 'High risk of burn marks, shiny patches & button melting' },
      { feature: 'Moisture Handling', cleanz24: 'Instant Vacuum Suction (Zero Dampness)', local: 'Water spray bottles creating damp mildew odor' },
      { feature: 'Crease Longevity', cleanz24: 'Long-lasting crease setting due to fiber relaxation', local: 'Fades within hours of wearing' },
      { feature: 'Delivery Convenience', cleanz24: 'Delivered in Hangers / Poly-Wrap at Doorstep', local: 'Wrapped in newspaper with string impression lines' }
    ],
    paaFaqs: [
      {
        q: 'Why is professional steam ironing better than traditional dry ironing at home?',
        a: 'Domestic dry irons rely on direct metallic heat pressed against dry fabric. This compresses fibers, creates shiny press marks (especially on dark trousers and suits), and risks scorching delicate synthetics. Professional steam ironing uses micro-moisture dry steam to relax fabric fibers naturally from within. Combined with vacuum suction tables, it sets sharp, long-lasting creases with zero heat damage.'
      },
      {
        q: 'Will steam pressing leave my clothes damp or wet?',
        a: 'No! Cleanz24 utilizes industrial steam press tables equipped with powerful under-board vacuum suction. As steam is injected through the garment to remove wrinkles, the vacuum system instantly evacuates all moisture and heat. Your clothes come off the board 100% dry, crisp, and ready to wear immediately.'
      },
      {
        q: 'Can steam ironing fix shiny patches caused by previous bad ironing?',
        a: 'Yes, in most cases. Shiny patches occur when flat heavy irons crush cotton or wool fibers flat. Our steam wands re-hydrate and fluff crushed fabric fibers, lifting the pile and significantly reducing or eliminating unsightly shiny press marks.'
      },
      {
        q: 'Do you deliver formal shirts on hangers or folded?',
        a: 'We offer both options! During pickup or booking, you can select whether you prefer your formal shirts and blazers delivered on sturdy hangers or folded neatly in protective travel wraps.'
      },
      {
        q: 'What is the price per piece for steam pressing?',
        a: 'Steam ironing starts at just ₹15 per piece for formal shirts and t-shirts, ₹20 for trousers, and ₹99 for suit blazers. Bulk monthly subscription plans are also available for working professionals.'
      },
      {
        q: 'How fast can I get my steam-ironed clothes back?',
        a: 'Our standard turnaround for steam pressing is 24 hours. Express 6-hour and 12-hour turnaround services are also available for urgent office or event needs.'
      }
    ],
    articleBody: `
      <h2>The Art & Technology of Professional Vacuum Steam Pressing</h2>
      <p>First impressions matter, and nothing projects confidence like crisp, impeccably pressed clothing. However, traditional ironing methods—whether using a domestic electric iron or local charcoal iron—often do more harm than good. They crush delicate textile weaves, burn synthetic blends, melt plastic buttons, and leave dark formal trousers disfigured with shiny press lines.</p>

      <p>Cleanz24's Professional Steam Ironing & Pressing Service replaces primitive heating methods with advanced European vacuum steam technology. Our system combines high-pressure dry steam boilers with perforated vacuum ironing boards to deliver flawless, crease-free results for your entire wardrobe.</p>

      <h3>How Vacuum Suction Technology Guarantees Perfection</h3>
      <p>The secret to professional garment finishing lies in temperature control and instant moisture evacuation. When our technician passes a steam iron over a shirt or trouser, high-velocity steam expands the fabric fibers. Simultaneously, the foot-operated vacuum suction beneath the board draws the steam completely through the garment. This instantly cools the fabric, drying it in milliseconds and locking in a sharp, durable crease that holds throughout your busiest workday.</p>

      <h3>Specialized Care for Formal Suits, Linens & Ethnic Wear</h3>
      <p>Different fabrics require distinct steam pressure profiles. Pure linens demand high-volume steam to eliminate deep wrinkles, while delicate silks require Teflon-shielded low-temperature vapor. Suits and blazers are finished on 3D anatomical dress forms, allowing steam to shape chest canvas linings without flattening shoulder contours. Experience the luxury of laundry that looks and feels brand new.</p>
    `
  },

  'shoe-handbag-spa': {
    slug: 'shoe-handbag-spa',
    title: 'Shoe & Handbag Spa Restoration Service',
    subtitle: 'Deep Hand Cleaning, Leather Conditioning & UV Sanitization for Sneakers, Boots & Bags',
    category: 'Footwear & Accessory Spa',
    icon: srvShoeImg,
    color: '#8b5cf6',
    seoTitle: 'Best Shoe Cleaning & Sneaker Spa Service Near Me | Cleanz24',
    seoDesc: 'Professional shoe laundry, sneaker whitening, suede boot cleaning, and leather handbag restoration. Material-safe deep hand washing, UV sanitization & doorstep pickup.',
    seoKeywords: 'shoe cleaning near me, sneaker spa near me, shoe laundry price, leather bag restoration, suede shoe cleaning service, shoe repair and cleaning',
    longTailKeywords: [
      'premium sneaker whitening and sole unyellowing service',
      'suede shoe stain removal and conditioning spa price',
      'luxury leather handbag deep cleaning and color touchup',
      'antibacterial UV sanitization shoe laundry near me',
      'designer sports shoes hand washing and nano waterproofing'
    ],
    pricing: [
      { service: 'Canvas / Mesh Sneaker Cleaning', price: '₹299 / pair', turnaround: '48-72 Hours', note: 'Deep sole scrubbing & lace washing' },
      { service: 'Leather / Suede Premium Shoe Spa', price: '₹399 / pair', turnaround: '72 Hours', note: 'Material-specific conditioning & nap revival' },
      { service: 'Designer Handbag Deep Clean & Polish', price: '₹599 - ₹1,199', turnaround: '72-96 Hours', note: 'Lining cleaning & leather rejuvenation' },
      { service: 'Sole Unyellowing & Nano Waterproofing', price: '₹199 / pair', turnaround: '48 Hours', note: 'UV oxidation treatment & hydrophobic shield' }
    ],
    whyChoose: [
      { title: 'Material-Specific Hand Cleaning', desc: 'We never throw shoes into harsh washing machines. Every shoe is meticulously cleaned by hand using soft bristles.' },
      { title: 'Sole De-Oxidation & Whitening', desc: 'Yellowed rubber soles are treated with specialized solar UV oxidation formulas to restore factory white.' },
      { title: 'Suede & Leather Conditioning', desc: 'Natural oils and suede conditioners are applied to prevent leather cracking and keep nap velvety soft.' },
      { title: 'Antibacterial UV Sanitization', desc: 'Internal shoe linings undergo medical-grade UV light treatment to eliminate 99.9% of odor-causing bacteria.' }
    ],
    processSteps: [
      { step: '01', title: 'Inspection & Material Profiling', desc: 'Detailed analysis of leather, suede, mesh, or nubuck materials, identifying deep stains and sole scuffs.' },
      { step: '02', title: 'Lace & Insole Separation', desc: 'Laces and inner footbeds are removed and washed in separate antibacterial micro-baths.' },
      { step: '03', title: 'Deep Hand Scrubbing', desc: 'Uppers, midsoles, and outsoles are scrubbed using pH-neutral foam cleansers and horsehair brushes.' },
      { step: '04', title: 'Deodorization & UV Light Chamber', desc: 'Placed in closed UV chambers to destroy internal fungi, bacteria, and stubborn foot odors.' },
      { step: '05', title: 'Conditioning & Hydrophobic Shield', desc: 'Finished with leather balms, suede softeners, and optional nano-spray water-repellent coating.' }
    ],
    fabricCareGuide: [
      { fabric: 'White Knit & Mesh Sneakers', treatment: 'Bio-foam extraction cleaning, microfiber towel drying, sole whitening paste application.' },
      { fabric: 'Suede & Nubuck Leather Boots', treatment: 'Waterless foam washing, brass-bristle nap restoration, waterproof barrier application.' },
      { fabric: 'Luxury Leather Handbags', treatment: 'Gentle pH-balanced leather cleanser, corner scuff color touch-up, mink oil conditioning.' },
      { fabric: 'Sports & Running Shoes', treatment: 'Mud extraction, high-pressure midsole groove detailing, thermal air drying at safe 35°C.' }
    ],
    comparison: [
      { feature: 'Washing Method', cleanz24: '100% Hand-Crafted Microfiber & Brush Spa', local: 'Thrown in washing machine (destroys glue & shape)' },
      { feature: 'Cleansing Products', cleanz24: 'Imported Sneaker Care Foams & Suede Balms', local: 'Harsh dishwashing liquid or laundry powder' },
      { feature: 'Odor & Bacteria Treatment', cleanz24: 'Medical UV Chamber Sanitization', local: 'Sun drying which causes leather cracking & sole yellowing' },
      { feature: 'Suede & Leather Care', cleanz24: 'Specialized conditioners & nap brushing', local: 'Water washing causing suede hardening & color bleeding' },
      { feature: 'Protection Finish', cleanz24: 'Nano Hydrophobic Water & Dust Shield Included', local: 'Zero protection' }
    ],
    paaFaqs: [
      {
        q: 'Why should I avoid washing my sneakers in a washing machine at home?',
        a: 'Washing shoes in a domestic washing machine saturates the internal shoe glue, causing outsoles to detach from uppers. The harsh spinning drum also distorts sneaker shape, scuffs leather panels, and hardens suede materials. Cleanz24 performs 100% hand cleaning using material-safe brushes and specialized foam cleansers.'
      },
      {
        q: 'Can you clean yellowed rubber soles on white sneakers?',
        a: 'Yes! Yellowing on midsoles is caused by rubber oxidation due to UV exposure and dirt. Our shoe spa technicians apply specialized de-oxidation creams and place shoes under controlled UV lamps to reverse oxidation, restoring white midsoles back to their original factory brightness.'
      },
      {
        q: 'How do you clean suede and nubuck shoes without ruining the texture?',
        a: 'Suede should never be washed with water. We utilize dry foam cleansers and specialized rubber/brass suede brushes to lift dirt while preserving the natural velvety texture. After cleaning, we apply suede revivers and hydrophobic protection sprays.'
      },
      {
        q: 'What types of handbags do you clean and restore?',
        a: 'We clean and restore all types of luxury leather bags, suede totes, canvas backpacks, clutches, and travel luggage. Services include exterior stain removal, interior lining cleaning, hardware polishing, leather conditioning, and edge paint touch-ups.'
      },
      {
        q: 'How do you eliminate deep shoe odor?',
        a: 'Bad shoe odor is caused by bacterial growth trapped inside inner soles and linings. Every pair processed at Cleanz24 undergoes a 30-minute UV sanitization chamber cycle that kills 99.9% of bacteria and fungi, followed by natural tea-tree deodorization.'
      },
      {
        q: 'What is the turnaround time for shoe and bag spa services?',
        a: 'Due to the multi-stage hand drying and conditioning process, standard turnaround is 48 to 72 hours.'
      }
    ],
    articleBody: `
      <h2>Give Your Favorite Sneakers & Designer Handbags a Second Life</h2>
      <p>Footwear and designer leather bags are central to modern lifestyle aesthetics. However, daily exposure to street dust, mud, rain, and foot perspiration takes a heavy toll. White sneakers turn yellow, suede boots get stained, and leather handbags lose their supple luster.</p>

      <p>Cleanz24's Shoe & Handbag Spa is an elite restoration lab dedicated to footwear and accessory care. Our trained shoe craftsmen combine material science, manual precision, and UV sanitization technology to bring your footwear and bags back to mint condition.</p>

      <h3>Hand-Crafted Cleaning vs. Machine Destruction</h3>
      <p>Tossing premium Nike, Adidas, Jordan, or Gucci sneakers into a washing machine is a recipe for disaster. The mechanical agitation breaks down internal foam cushioning, dissolves midsole adhesives, and shrinks leather uppers. At Cleanz24, we treat every shoe as a unique project. Using specialized horsehair brushes, hog bristles, and pH-neutral foam cleansers, we clean uppers, tongues, insoles, and sole grooves meticulously by hand.</p>

      <h3>Specialized Suede revival & Leather Nourishment</h3>
      <p>Suede and leather require delicate nourishment. Water causes suede fibers to mat down into a hard, stiff crust. Our waterless suede cleaning process uses specialized eraser blocks and nap brushes to lift grime while restoring fluffy suede texture. For leather shoes and handbags, we apply organic mink oil and beeswax conditioners to prevent cracking and lock in rich color depth.</p>
    `
  },

  'home-furnishing-cleaning': {
    slug: 'home-furnishing-cleaning',
    title: 'Home Furnishings, Curtain, Sofa & Carpet Deep Cleaning',
    subtitle: 'High-Pressure Steam Extraction & Sanitization for Curtains, Blankets, Sofas & Carpets',
    category: 'Home Linen & Upholstery Care',
    icon: srvHomeImg,
    color: '#ec4899',
    seoTitle: 'Best Carpet & Sofa Deep Cleaning Service Near Me | Cleanz24',
    seoDesc: 'Deep injection-extraction sofa cleaning, carpet washing, heavy blanket washing, and curtain steam sanitization. Kills 99.9% dust mites and allergens. Free doorstep pickup.',
    seoKeywords: 'sofa cleaning near me, carpet cleaning service, curtain laundry near me, blanket washing price, heavy duvet cleaning, upholstery deep cleaning near me',
    longTailKeywords: [
      'injection extraction deep sofa steam cleaning service price',
      'heavy blanket and double duvet washing doorstep pickup',
      'dust mite allergen removal carpet cleaning service near me',
      'curtain dry cleaning with shrinkage protection guarantee',
      'upholstery shampooing and stain removal for home and office'
    ],
    pricing: [
      { service: 'Double Blanket / Quilt / Duvet Wash', price: '₹249 / piece', turnaround: '48 Hours', note: 'Soft water wash & deep fluff drying' },
      { service: 'Curtain Dry Cleaning / Wash', price: '₹149 / panel', turnaround: '48-72 Hours', note: 'Shrinkage-free steam pressing' },
      { service: '5-Seater Sofa Deep Injection Cleaning', price: '₹999 / set', turnaround: 'On-Site / 48 Hr', note: 'Stain extraction & allergen sanitization' },
      { service: 'Area Carpet / Rug Deep Cleaning', price: '₹25 / sq ft', turnaround: '72 Hours', note: 'Shampoo extraction & pile brushing' }
    ],
    whyChoose: [
      { title: 'Injection-Extraction Steam Wash', desc: 'Our commercial extractors inject eco-shampoo deep into cushion foam and pull out 95% embedded dirt and water.' },
      { title: 'Kills 99.9% Dust Mites & Bacteria', desc: 'High-temperature thermal steam sanitization destroys dust mites, bedbugs, and fungal spores trapped inside furnishings.' },
      { title: 'Zero Shrinkage Guarantee for Curtains', desc: 'Curtains are processed using shrinkage-controlled solvent techniques to preserve precise drop lengths.' },
      { title: 'Pet Stain & Odor Deodorization', desc: 'Enzymatic bio-cleaners break down urine, dander, and organic pet odors permanently.' }
    ],
    processSteps: [
      { step: '01', title: 'High-Power Vacuuming', desc: 'Industrial HEPA dry vacuuming to extract loose dust, pet hair, and surface debris.' },
      { step: '02', title: 'Eco-Shampoo Pre-Spray', desc: 'Application of biodegradable stain-lifting shampoo to dissolve grease, food spills, and sweat marks.' },
      { step: '03', title: 'Agitation & Deep Scrubbing', desc: 'Counter-rotating soft brushes loosen deep-seated dirt from fabric weaves without fraying fibers.' },
      { step: '04', title: 'Injection Extraction Rinsing', desc: 'High-pressure clean water injection paired with dual-stage vacuum suction to remove dirty water completely.' },
      { step: '05', title: 'Thermal Steam Sanitization', desc: 'Final pass with 140°C dry steam to sanitize, deodorize, and accelerate quick drying.' }
    ],
    fabricCareGuide: [
      { fabric: 'Heavy Wool & Silk Carpets', treatment: 'Low-moisture foam extraction, fringe hand detailing, flat room drying to prevent color bleeding.' },
      { fabric: 'Velvet & Fabric Sofa Upholstery', treatment: 'pH-neutral shampooing, pile alignment brushing, rapid vacuum moisture extraction.' },
      { fabric: 'Sheer & Blackout Curtains', treatment: 'Solvent dry cleaning or gentle soft-water wash, vertical steam pressing, zero drop shrinkage.' },
      { fabric: 'Microfiber & Feather Duvets', treatment: 'Large capacity drum washing, anti-clump ball tumble drying to restore maximum loft and warmth.' }
    ],
    comparison: [
      { feature: 'Cleaning Depth', cleanz24: 'Deep Injection-Extraction into Cushion Core (3 inches)', local: 'Surface foam wiping (leaves dirt inside foam)' },
      { feature: 'Drying Time', cleanz24: '95% Water Extracted; Dries in 3-4 Hours', local: 'Soggy for 2 days causing foul damp odor & mildew' },
      { feature: 'Sanitization', cleanz24: '140°C Thermal Steam (Kills 99.9% Mites & Germs)', local: 'Normal cold water wipe' },
      { feature: 'Curtain Care', cleanz24: 'Guaranteed Zero Shrinkage & Pleat Retention', local: 'High shrinkage risk & lost drape shape' },
      { feature: 'Logistics', cleanz24: 'Free Doorstep Pickup/Delivery or On-Site Service', local: 'Self-hauling heavy carpets and blankets' }
    ],
    paaFaqs: [
      {
        q: 'Why is deep sofa and carpet cleaning necessary for indoor air health?',
        a: 'Sofas, carpets, and curtains act as giant indoor air filters, trapping millions of dust mites, dead skin cells, pet dander, pollen, and bacteria deep inside their padding. Over time, walking or sitting on them releases these allergens into the air, triggering asthma, sneezing, and skin allergies. Cleanz24’s deep injection-extraction cleaning removes trapped contaminants from 3 inches deep inside upholstery.'
      },
      {
        q: 'How long does a sofa or carpet take to dry after deep cleaning?',
        a: 'Thanks to our industrial dual-vacuum extraction machines, 95% of the wash water is extracted during the cleaning process. Sofas and carpets dry completely within 3 to 5 hours under normal ceiling fan ventilation.'
      },
      {
        q: 'Will dry cleaning my curtains cause them to shrink in height?',
        a: 'No! Curtains often shrink when washed in home washing machines due to improper water temperatures and spin cycles. At Cleanz24, we inspect fabric composition and utilize specialized dry cleaning or controlled cool-water wash processes with guaranteed zero shrinkage.'
      },
      {
        q: 'Can you remove tough pet urine stains and odors from carpets and sofas?',
        a: 'Yes! Standard detergents only mask pet odors temporarily. Cleanz24 uses specialized enzymatic bio-cleaners that break down uric acid crystals and organic proteins at a molecular level, eliminating pet stains and odors permanently.'
      },
      {
        q: 'How do you wash heavy winter blankets and double duvets?',
        a: 'Heavy double blankets and duvets require large commercial drum capacities (20kg+) that domestic machines cannot handle. We wash them in soft water with antibacterial sanitizers and tumble dry them with fluffing balls to restore original loft, softness, and warmth.'
      },
      {
        q: 'Do you offer on-site sofa cleaning at home?',
        a: 'Yes, we offer both doorstep pickup for movable items (blankets, rugs, curtains) and on-site professional team visits for fixed sofas, mattresses, and wall-to-wall carpeting.'
      }
    ],
    articleBody: `
      <h2>Transform Your Home Environment with Deep Upholstery & Furnishing Cleaning</h2>
      <p>Home furnishings define the comfort and aesthetics of your living space. Yet, items like sofas, heavy curtains, area rugs, and winter duvets are rarely cleaned as frequently as daily clothing. Over months of use, these fabrics absorb body sweat, food crumbs, dust mites, and pet hair, becoming silent hotbeds for indoor pollution.</p>

      <p>Cleanz24's Home Furnishing Deep Cleaning service delivers hospital-grade sanitization for your entire household. Using commercial injection-extraction machinery and high-temperature steam generators, we restore the freshness, color, and hygiene of your heavy home fabrics effortlessly.</p>

      <h3>The Power of Injection-Extraction Technology</h3>
      <p>Surface wiping or basic vacuuming only removes loose surface dust. Our deep cleaning process injects a pressurized stream of eco-friendly shampoo solution deep into sofa cushion foam and carpet backing. The solution encapsulates trapped dirt, grease, and allergens. Simultaneously, a super-charged vacuum nozzle extracts the dirty fluid, leaving your upholstery clean, fresh, and nearly dry to the touch.</p>

      <h3>Allergen Elimination & Thermal Steam Sanitization</h3>
      <p>Dust mites thrive in warm, humid mattress and sofa padding, triggering chronic morning allergies, coughing, and skin irritation. Following deep extraction, our technicians sanitize your furnishings with 140°C dry steam. This thermal shock destroys 99.9% of dust mites, bacteria, and fungal spores without leaving soggy residues behind.</p>
    `
  },

  'commercial-laundry': {
    slug: 'commercial-laundry',
    title: 'Commercial & Corporate B2B Laundry Care',
    subtitle: 'Bulk Laundry, Workwear & Linen Solutions for Hotels, Spas, Salons, Gyms & Offices',
    category: 'Enterprise B2B Laundry',
    icon: srvHomeImg,
    color: '#06b6d4',
    seoTitle: 'Best Commercial Laundry Service & Hotel Linen Laundry | Cleanz24 B2B',
    seoDesc: 'Professional commercial laundry services for hotels, corporate offices, spas, gyms, and restaurants. Dedicated B2B account managers, barcode tracking, and GST invoicing.',
    seoKeywords: 'commercial laundry service, hotel linen laundry, corporate uniform laundry, spa towel laundry, bulk laundry service price, B2B laundry contract',
    longTailKeywords: [
      'commercial hotel linen and towel laundering price per kg',
      'corporate office staff uniform laundry with barcode tracking',
      'spa and salon oil stain towel deep washing service',
      'industrial workwear and boiler suit laundry b2b contract',
      'custom monthly b2b commercial laundry agreement with GST invoice'
    ],
    pricing: [
      { service: 'Hotel Linen & Bedding Laundry', price: 'Custom / kg', turnaround: 'Daily / 24 Hours', note: 'High temperature thermal sanitization' },
      { service: 'Spa & Salon Towel Oil Stain Removal', price: 'Custom / kg', turnaround: '24 Hours', note: 'Degreasing & essential oil deodorization' },
      { service: 'Corporate Workwear & Uniform Wash', price: 'Custom / piece', turnaround: 'Scheduled Pickup', note: 'Individual employee barcode tag tracking' },
      { service: 'Restaurant Tablecloth & Napkin Care', price: 'Custom / piece', turnaround: 'Daily Pickup', note: 'Starch pressing & food stain extraction' }
    ],
    whyChoose: [
      { title: 'Barcode & RFID Garment Tracking', desc: 'Every corporate uniform is tagged with individual barcodes to ensure zero garment loss across employee rosters.' },
      { title: 'Heavy Degreasing for Spas & Salons', desc: 'Specialized bio-degreasers dissolve heavy massage oils, wax, and hair dye stains from spa towels completely.' },
      { title: 'Thermal Disinfection Standard', desc: 'Hot water washing at 75°C satisfies international hospitality and healthcare sanitation compliance.' },
      { title: 'GST Billing & Flexible Monthly Credit', desc: 'Dedicated B2B account management, itemized monthly invoicing, GST compliance, and flexible payment cycles.' }
    ],
    processSteps: [
      { step: '01', title: 'Dedicated B2B Pickup', desc: 'Scheduled daily or bi-weekly doorstep collection by custom commercial logistics vehicles.' },
      { step: '02', title: 'Barcode Scan & Inventory Sorting', desc: 'Commercial inventory logging, sorting by fabric type, soil level, and client department.' },
      { step: '03', title: 'High-Temp Industrial Wash', desc: 'Washed in heavy-duty commercial barrier washers using automated chemical dosing systems.' },
      { step: '04', title: 'Calender Ironing & Folding', desc: 'High-speed flatwork ironer processing for bedsheets and table linens, ensuring razor-flat finish.' },
      { step: '05', title: 'Bundled Hygienic Packing & Delivery', desc: 'Sorted by employee or room number, shrink-wrapped in protective bundles, and delivered.' }
    ],
    fabricCareGuide: [
      { fabric: 'Hotel Bed Sheets & Pillowcases', treatment: '75°C thermal wash, chlorine-free bleaching agent, 300°C roller calendar ironing for crisp hotel bed finish.' },
      { fabric: 'Spa & Salon Bath Towels', treatment: 'Emulsifying degreasing wash, fabric fluffing tumble dry, zero chemical fragrance interference.' },
      { fabric: 'Corporate Staff Uniforms', treatment: 'Stain pre-spotting, color-fast detergent wash, steam pressing, hanger/fold employee packaging.' },
      { fabric: 'Restaurant Dining Linen', treatment: 'Food oil & wine stain extraction, food-safe starching, precision square folding for tables.' }
    ],
    comparison: [
      { feature: 'Garment Tracking', cleanz24: 'Automated Barcode / RFID Tagging System', local: 'Manual paper notes (High risk of missing items)' },
      { feature: 'Sanitization Standards', cleanz24: '75°C Thermal Disinfection (Hospitality Compliant)', local: 'Cold water wash (Bacteria & oil residue remains)' },
      { feature: 'Capacity & Reliability', cleanz24: '5,000+ kg Daily Commercial Capacity', local: 'Small scale setup prone to weather & breakdown delays' },
      { feature: 'Oil Stain Treatment', cleanz24: 'Commercial Degreasing Formulations for Spa Towels', local: 'Towels remain oily and turn yellow after 3 washes' },
      { feature: 'Business Operations', cleanz24: 'GST Invoicing, Monthly Contracts, Account Manager', local: 'Cash-only, unorganized receipts' }
    ],
    paaFaqs: [
      {
        q: 'What industries does Cleanz24 commercial laundry service support?',
        a: 'We provide specialized B2B laundry contracts for boutique hotels, guesthouses, corporate offices, wellness spas, beauty salons, fitness centers, healthcare clinics, industrial factories, and fine dining restaurants.'
      },
      {
        q: 'How do you ensure employee uniforms are never misplaced or mixed up?',
        a: 'Every uniform received under a B2B contract is tagged with a heat-sealed barcode or RFID chip linked to the specific employee name and department. Our automated tracking system scans items at pickup, washing, pressing, and packaging stages, guaranteeing 100% accurate dispatch back to your facility.'
      },
      {
        q: 'Can you remove heavy massage oils and wax stains from spa towels?',
        a: 'Yes! Spa towels frequently retain heavy oils that cause towels to feel greasy, smell rancid, and dis-color. Cleanz24 uses industrial emulsifying degreasers and high-temperature thermal wash cycles that dissolve oil bonds completely, restoring towel absorbency, softness, and white color.'
      },
      {
        q: 'Do you provide daily pickup and delivery for commercial contracts?',
        a: 'Yes, we offer customized logistics schedules, including daily morning/evening pickups or tri-weekly schedules tailored to your operational hours and linen inventory levels.'
      },
      {
        q: 'How is commercial laundry priced?',
        a: 'Commercial laundry is priced either on a per-kilogram basis for bulk linens and towels, or on a per-piece basis for uniforms, suits, and chef coats. We offer customized volume discounts and flexible monthly credit terms for corporate clients.'
      },
      {
        q: 'Do you provide GST invoices for corporate accounting?',
        a: 'Yes, all Cleanz24 commercial contracts include full GST-compliant monthly invoicing, detailed digital delivery dockets, and dedicated account manager support.'
      }
    ],
    articleBody: `
      <h2>Enterprise Laundry & Linen Management Solutions for Businesses</h2>
      <p>In the hospitality, wellness, corporate, and healthcare sectors, pristine linen and immaculate employee attire directly impact brand reputation and customer trust. A stained hotel towel, a discolored spa robe, or a wrinkled corporate uniform sends the wrong message to your clientele.</p>

      <p>Cleanz24's Commercial & Corporate B2B Laundry division provides reliable, high-capacity laundry processing for enterprises of all sizes. Operating state-of-the-art commercial laundry plants with automated chemical dosing systems, flatwork ironers, and barcode tracking, we handle your bulk laundry demands seamlessly.</p>

      <h3>Thermal Sanitization & Hotel-Grade Flatwork Finishing</h3>
      <p>Hotel bed sheets, duvet covers, and pillowcases demand razor-flat pressing and thermal disinfection. Our commercial wash cycles operate at 75°C, effectively destroying pathogens and virus strains. Clean bed linens pass through high-speed rotary flatwork ironers that dry and iron simultaneously at 300°C, producing crisp, glossy hotel bedding that wows your guests.</p>

      <h3>Specialized Degreasing for Spas, Salons & Gyms</h3>
      <p>Massage oils, aromatherapy lotions, wax, and hair dyes pose severe challenges for standard laundries. When left untreated, oil oxidizes inside towel fibers, creating a fire hazard in dryers and emitting rancid odors. Cleanz24’s chemical engineers formulated specialized bio-emulsifiers that strip heavy oils completely, returning spa towels to fluffy, absorbent perfection cycle after cycle.</p>
    `
  }
};

export default function ServiceDetailPage() {
  const { serviceSlug } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useOutletContext() || {};
  const dark = !!isDarkMode;

  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', date: '', time: 'Morning (9 AM - 12 PM)', address: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const service = SERVICE_DETAILS_DATA[serviceSlug] || SERVICE_DETAILS_DATA['premium-laundry'];

  useEffect(() => {
    window.scrollTo(0, 0);
    setSubmitted(false);
    setOpenFaq(null);
  }, [serviceSlug]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      setFormData({ ...formData, [name]: value.replace(/\D/g, '') });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const payload = {
        timestamp: new Date().toISOString().split('T')[0],
        name: formData.name,
        mobile: `'${formData.mobile}`,
        email: formData.email || 'N/A',
        service: `${service.title} (Service Page)`,
        date: formData.date || 'Asap',
        time: formData.time || 'Morning',
        address: formData.address || 'N/A',
        type: 'Service Detail Pickup Request',
        source: `Service Page - ${service.title}`,
        notes: formData.notes || ''
      };

      if (GOOGLE_SHEETS_LAUNDRY_SCRIPT_URL) {
        await fetch(GOOGLE_SHEETS_LAUNDRY_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(payload)
        });
      }
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: dark ? '#0a0f1d' : '#f8fafc', color: dark ? '#e2e8f0' : '#1e293b', minHeight: '100vh' }}>
      <SEOMeta
        title={service.seoTitle}
        description={service.seoDesc}
        keywords={service.seoKeywords}
      />

      {/* ── BREADCRUMB & HERO ── */}
      <section className="pt-5 pb-5 position-relative overflow-hidden" style={{
        background: dark ? `linear-gradient(135deg, #0f172a 0%, ${service.color}22 100%)` : `linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)`,
        borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : '#e2e8f0'}`
      }}>
        <div className="container position-relative z-2 pt-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-3" style={{ fontSize: '0.88rem' }}>
              <li className="breadcrumb-item"><Link to="/" style={{ color: dark ? '#94a3b8' : '#64748b', textDecoration: 'none' }}>Home</Link></li>
              <li className="breadcrumb-item"><Link to="/laundry/services" style={{ color: dark ? '#94a3b8' : '#64748b', textDecoration: 'none' }}>Services</Link></li>
              <li className="breadcrumb-item active" style={{ color: service.color, fontWeight: 600 }}>{service.title}</li>
            </ol>
          </nav>

          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <span className="badge px-3 py-2 rounded-pill mb-3" style={{ background: `${service.color}20`, color: service.color, border: `1px solid ${service.color}40`, fontSize: '0.85rem', fontWeight: 600 }}>
                {service.category}
              </span>
              <h1 className="display-5 fw-bold mb-3" style={{ color: dark ? '#f8fafc' : '#0f172a', lineHeight: 1.2 }}>
                {service.title}
              </h1>
              <p className="lead mb-4" style={{ color: dark ? '#cbd5e1' : '#475569', fontSize: '1.15rem' }}>
                {service.subtitle}
              </p>

              {/* Long-tail keywords tags */}
              <div className="d-flex flex-wrap gap-2 mb-4">
                {service.longTailKeywords.map((kw, i) => (
                  <span key={i} className="badge bg-opacity-10 text-wrap text-start" style={{ background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', color: dark ? '#a5b4fc' : '#475569', border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'}`, fontSize: '0.78rem', fontWeight: 500, padding: '6px 12px', borderRadius: '8px' }}>
                    🔍 {kw}
                  </span>
                ))}
              </div>

              <div className="d-flex flex-wrap gap-3">
                <a href="#book-form" className="btn btn-lg px-4 py-3 fw-bold text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${service.color}, #1d4ed8)`, borderRadius: '12px', textDecoration: 'none' }}>
                  🚀 Schedule Free Pickup Now
                </a>
                <a href="tel:+919876543210" className="btn btn-lg px-4 py-3 fw-bold" style={{ background: 'transparent', border: `2px solid ${service.color}`, color: service.color, borderRadius: '12px', textDecoration: 'none' }}>
                  📞 Call Customer Care
                </a>
              </div>
            </div>

            <div className="col-lg-5 text-center">
              <div className="p-4 rounded-4 shadow-lg position-relative" style={{ background: dark ? 'rgba(30, 41, 59, 0.8)' : '#ffffff', border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`, backdropFilter: 'blur(10px)' }}>
                <img src={service.icon} alt={service.title} className="img-fluid mb-3" style={{ maxHeight: '180px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.15))' }} />
                <div className="p-3 rounded-3" style={{ background: `${service.color}15`, border: `1px dashed ${service.color}` }}>
                  <h6 className="fw-bold mb-1" style={{ color: service.color }}>Doorstep Pickup & Delivery</h6>
                  <p className="small mb-0" style={{ color: dark ? '#94a3b8' : '#64748b' }}>Free pickup on orders above ₹199 | 100% Hygienic Packaging</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT CONTAINER (1000+ Words Structure) ── */}
      <div className="container py-5">
        <div className="row g-4">
          
          {/* LEFT CONTENT COLUMN */}
          <div className="col-lg-8">
            
            {/* SECTION 1: WHY CHOOSE CLEANZ24 */}
            <div className="p-4 rounded-4 mb-4" style={{ background: dark ? '#1e293b' : '#ffffff', border: `1px solid ${dark ? '#334155' : '#e2e8f0'}` }}>
              <h2 className="h3 fw-bold mb-4" style={{ color: dark ? '#f8fafc' : '#0f172a' }}>
                Why Choose Cleanz24 for <span style={{ color: service.color }}>{service.title}</span>?
              </h2>
              <div className="row g-3">
                {service.whyChoose.map((item, idx) => (
                  <div className="col-md-6" key={idx}>
                    <div className="p-3 rounded-3 h-100" style={{ background: dark ? '#0f172a' : '#f8fafc', borderLeft: `4px solid ${service.color}` }}>
                      <h5 className="fw-bold fs-6 mb-2" style={{ color: dark ? '#f1f5f9' : '#1e293b' }}>✨ {item.title}</h5>
                      <p className="small mb-0 text-muted" style={{ lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 2: ARTICLE BODY (DETAILED SEO EXPLANATION) */}
            <div className="p-4 rounded-4 mb-4" style={{ background: dark ? '#1e293b' : '#ffffff', border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`, lineHeight: 1.8 }}>
              <div dangerouslySetInnerHTML={{ __html: service.articleBody }} />
            </div>

            {/* SECTION 3: 5-STEP SCIENTIFIC PROCESS */}
            <div className="p-4 rounded-4 mb-4" style={{ background: dark ? '#1e293b' : '#ffffff', border: `1px solid ${dark ? '#334155' : '#e2e8f0'}` }}>
              <h2 className="h3 fw-bold mb-4" style={{ color: dark ? '#f8fafc' : '#0f172a' }}>
                Our 5-Step Scientific Care Protocol
              </h2>
              <div className="d-flex flex-column gap-3">
                {service.processSteps.map((step, idx) => (
                  <div key={idx} className="d-flex align-items-start gap-3 p-3 rounded-3" style={{ background: dark ? '#0f172a' : '#f8fafc', border: `1px solid ${dark ? '#334155' : '#e2e8f0'}` }}>
                    <span className="badge rounded-circle p-3 fs-5 fw-bold text-white d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', background: service.color, flexShrink: 0 }}>
                      {step.step}
                    </span>
                    <div>
                      <h5 className="fw-bold fs-6 mb-1" style={{ color: dark ? '#f8fafc' : '#0f172a' }}>{step.title}</h5>
                      <p className="small mb-0 text-muted" style={{ lineHeight: 1.6 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 4: FABRIC CARE DIAGNOSTIC GUIDE */}
            <div className="p-4 rounded-4 mb-4" style={{ background: dark ? '#1e293b' : '#ffffff', border: `1px solid ${dark ? '#334155' : '#e2e8f0'}` }}>
              <h2 className="h3 fw-bold mb-4" style={{ color: dark ? '#f8fafc' : '#0f172a' }}>
                Fabric & Material Care Diagnostic Guide
              </h2>
              <div className="table-responsive">
                <table className="table align-middle" style={{ color: dark ? '#cbd5e1' : '#334155' }}>
                  <thead>
                    <tr style={{ background: dark ? '#0f172a' : '#f1f5f9' }}>
                      <th style={{ color: service.color }}>Fabric / Material</th>
                      <th style={{ color: service.color }}>Cleanz24 Specialized Treatment Protocol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.fabricCareGuide.map((fc, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${dark ? '#334155' : '#e2e8f0'}` }}>
                        <td className="fw-bold" style={{ minWidth: '160px' }}>🧵 {fc.fabric}</td>
                        <td className="small" style={{ lineHeight: 1.6 }}>{fc.treatment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 5: PRICING CHART */}
            <div className="p-4 rounded-4 mb-4" style={{ background: dark ? '#1e293b' : '#ffffff', border: `1px solid ${dark ? '#334155' : '#e2e8f0'}` }}>
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h2 className="h3 fw-bold mb-0" style={{ color: dark ? '#f8fafc' : '#0f172a' }}>
                  Transparent Pricing & Turnaround
                </h2>
                <span className="badge bg-success px-3 py-2">No Hidden Charges</span>
              </div>
              <div className="table-responsive">
                <table className="table align-middle" style={{ color: dark ? '#cbd5e1' : '#334155' }}>
                  <thead>
                    <tr style={{ background: dark ? '#0f172a' : '#f1f5f9' }}>
                      <th>Service Name</th>
                      <th>Price</th>
                      <th>Turnaround</th>
                      <th>Inclusions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.pricing.map((pr, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${dark ? '#334155' : '#e2e8f0'}` }}>
                        <td className="fw-semibold">{pr.service}</td>
                        <td className="fw-bold text-success">{pr.price}</td>
                        <td><span className="badge bg-opacity-20 text-primary bg-primary px-2 py-1">{pr.turnaround}</span></td>
                        <td className="small text-muted">{pr.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 6: CLEANZ24 VS LOCAL CLEANERS COMPARISON */}
            <div className="p-4 rounded-4 mb-4" style={{ background: dark ? '#1e293b' : '#ffffff', border: `1px solid ${dark ? '#334155' : '#e2e8f0'}` }}>
              <h2 className="h3 fw-bold mb-4" style={{ color: dark ? '#f8fafc' : '#0f172a' }}>
                Cleanz24 vs Traditional Local Cleaners
              </h2>
              <div className="table-responsive">
                <table className="table align-middle text-center" style={{ color: dark ? '#cbd5e1' : '#334155' }}>
                  <thead>
                    <tr style={{ background: dark ? '#0f172a' : '#f1f5f9' }}>
                      <th className="text-start">Feature</th>
                      <th style={{ color: '#10b981', background: dark ? '#064e3b' : '#d1fae5' }}>Cleanz24 Standard</th>
                      <th style={{ color: '#ef4444', background: dark ? '#451a1a' : '#fee2e2' }}>Local Dhobi / Cleaners</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.comparison.map((cmp, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${dark ? '#334155' : '#e2e8f0'}` }}>
                        <td className="text-start fw-bold small">{cmp.feature}</td>
                        <td className="small fw-semibold text-success" style={{ background: dark ? 'rgba(16, 185, 129, 0.05)' : 'rgba(209, 250, 229, 0.3)' }}>✅ {cmp.cleanz24}</td>
                        <td className="small text-danger" style={{ background: dark ? 'rgba(239, 68, 68, 0.05)' : 'rgba(254, 226, 226, 0.3)' }}>❌ {cmp.local}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 7: PAA (PEOPLE ALSO ASK) FAQ ACCORDION */}
            <div className="p-4 rounded-4 mb-4" style={{ background: dark ? '#1e293b' : '#ffffff', border: `1px solid ${dark ? '#334155' : '#e2e8f0'}` }}>
              <h2 className="h3 fw-bold mb-2" style={{ color: dark ? '#f8fafc' : '#0f172a' }}>
                People Also Ask (PAA) — Frequently Asked Questions
              </h2>
              <p className="text-muted small mb-4">Answers to common customer questions about {service.title.toLowerCase()}.</p>

              <div className="accordion d-flex flex-column gap-3">
                {service.paaFaqs.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={i} className="rounded-3 overflow-hidden" style={{ border: `1px solid ${dark ? '#334155' : '#e2e8f0'}` }}>
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-100 text-start p-3 fw-bold d-flex justify-content-between align-items-center border-0"
                        style={{ background: dark ? (isOpen ? '#0f172a' : '#1e293b') : (isOpen ? '#f1f5f9' : '#ffffff'), color: dark ? '#f8fafc' : '#0f172a', transition: 'all 0.2s' }}
                      >
                        <span>❓ {faq.q}</span>
                        <span className="fs-5">{isOpen ? '−' : '+'}</span>
                      </button>
                      {isOpen && (
                        <div className="p-3 border-top small" style={{ background: dark ? '#0f172a' : '#f8fafc', color: dark ? '#cbd5e1' : '#475569', lineHeight: 1.7 }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT STICKY BOOKING FORM COLUMN */}
          <div className="col-lg-4">
            <div id="book-form" className="p-4 rounded-4 shadow-lg sticky-top" style={{ top: '100px', background: dark ? '#1e293b' : '#ffffff', border: `2px solid ${service.color}` }}>
              <div className="text-center mb-3">
                <span className="badge px-3 py-1 rounded-pill mb-2" style={{ background: service.color, color: '#fff', fontSize: '0.75rem' }}>
                  FREE DOORSTEP PICKUP
                </span>
                <h3 className="h4 fw-bold mb-1" style={{ color: dark ? '#f8fafc' : '#0f172a' }}>
                  Book {service.category}
                </h3>
                <p className="small text-muted mb-0">Fill form below for instant pickup confirmation</p>
              </div>

              {submitted ? (
                <div className="p-4 text-center rounded-3 bg-success bg-opacity-10 text-success border border-success">
                  <span className="fs-1">🎉</span>
                  <h5 className="fw-bold mt-2">Pickup Request Received!</h5>
                  <p className="small mb-3">Our laundry specialist will call you shortly to confirm pickup details.</p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-sm btn-outline-success rounded-pill px-4">
                    Book Another Service
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold" style={{ color: dark ? '#cbd5e1' : '#475569' }}>Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="e.g. Rahul Sharma"
                      className="form-control"
                      style={{ background: dark ? '#0f172a' : '#f8fafc', color: dark ? '#fff' : '#000', borderColor: dark ? '#334155' : '#cbd5e1' }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold" style={{ color: dark ? '#cbd5e1' : '#475569' }}>Mobile Number *</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ background: dark ? '#334155' : '#e2e8f0', color: dark ? '#fff' : '#000' }}>+91</span>
                      <input
                        type="tel"
                        name="mobile"
                        required
                        maxLength="10"
                        value={formData.mobile}
                        onChange={handleFormChange}
                        placeholder="10-digit mobile"
                        className="form-control"
                        style={{ background: dark ? '#0f172a' : '#f8fafc', color: dark ? '#fff' : '#000', borderColor: dark ? '#334155' : '#cbd5e1' }}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold" style={{ color: dark ? '#cbd5e1' : '#475569' }}>Preferred Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleFormChange}
                      className="form-control"
                      style={{ background: dark ? '#0f172a' : '#f8fafc', color: dark ? '#fff' : '#000', borderColor: dark ? '#334155' : '#cbd5e1' }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold" style={{ color: dark ? '#cbd5e1' : '#475569' }}>Pickup Address</label>
                    <textarea
                      name="address"
                      rows="2"
                      value={formData.address}
                      onChange={handleFormChange}
                      placeholder="House / Apartment, Street, City"
                      className="form-control"
                      style={{ background: dark ? '#0f172a' : '#f8fafc', color: dark ? '#fff' : '#000', borderColor: dark ? '#334155' : '#cbd5e1' }}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn w-100 py-3 fw-bold text-white shadow"
                    style={{ background: `linear-gradient(135deg, ${service.color}, #15803d)`, borderRadius: '10px', fontSize: '1rem' }}
                  >
                    {submitting ? 'Submitting Request...' : '📅 Confirm Doorstep Pickup'}
                  </button>

                  <div className="text-center mt-3">
                    <p className="small text-muted mb-0">🔒 100% Privacy Protected | Free Doorstep Pickup</p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
