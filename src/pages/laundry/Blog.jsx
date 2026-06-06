import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEOMeta from '../../components/SEOMeta';
import { storesData } from '../../data';


// ── Blog Images from assets ───────────────────────────────────────────────
import blog1 from '../../assets/blog1.png';
import blog2 from '../../assets/blog2.png';
import blog3 from '../../assets/blog3.png';
import blog4 from '../../assets/blog4.png';
import blog5 from '../../assets/blog5.png';
import blog6 from '../../assets/blog6.png';
import blog7 from '../../assets/blog7.png';
import blog8 from '../../assets/blog8.png';
import blog9 from '../../assets/blog9.png';
import blog10 from '../../assets/blog10.png';
import blog11 from '../../assets/blog11.png';
import blog12 from '../../assets/blog12.png';
import blog13 from '../../assets/blog13.png';
import blog14 from '../../assets/blog14.png';
import blog15 from '../../assets/blog15.png';
import blog16 from '../../assets/blog16.png';
import blog17 from '../../assets/blog17.png';
import blog18 from '../../assets/blog18.png';
import blog19 from '../../assets/blog19.png';
import blog20 from '../../assets/blog20.png';
import blog21 from '../../assets/blog21.png';
import blog22 from '../../assets/blog22.png';
import blog23 from '../../assets/blog23.jpeg';
import blog24 from '../../assets/blog24.jpeg';
import blog25 from '../../assets/blog25.png';
import blog26 from '../../assets/blog26.png';
import blog27 from '../../assets/blog27.jpeg';
import blog28 from '../../assets/blog28.jpeg';
import blog29 from '../../assets/blog29.jpeg';
import blog30 from '../../assets/blog30.jpeg';
import blog31 from '../../assets/blog31.jpeg';
import blog32 from '../../assets/blog32.jpeg';
import blog33 from '../../assets/blog33.jpeg';
import blog34 from '../../assets/blog34.jpeg';
import blog35 from '../../assets/blog35.jpeg';

/* ─── Blog Data ──────────────────────────────────────────────────────────── */
const ALL_CATEGORIES = ['All', 'Blog', 'All Services', 'Commercial Cleaning', 'Dry Cleaning', 'Franchise & Business'];

const BLOG_POSTS = [
  {
    id: 1,
    slug: 'best-laundry-dry-cleaning-indirapuram',
    title: 'Best Laundry and Dry Cleaning Services Near Me in Indirapuram – Everything You Need to Know Before You Book',
    excerpt:
      "Why Finding the Right Laundry Service in Indirapuram Actually Matters More Than You Think Most people underestimate the importance of choosing the right laundry and dry cleaning service until they hand over an expensive silk saree and get it back with a broken border, or send a suit for pressing and receive it smelling faintly…",
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'May 11, 2026',
    dateTime: '2026-05-11',
    image: blog1,
    readTime: '5 min read',
  },
  {
    id: 2,
    slug: 'best-laundry-franchise-gujarat',
    title: 'Best Laundry Franchise in Gujarat – Start a Profitable Laundry Business with Cleanz24',
    excerpt:
      "Gujarat's fast-paced urban lifestyle has made laundry franchises one of the most promising business opportunities in the state. From busy corporate professionals to students and families, everyone needs clean clothes without the hassle of managing laundry at home — creating a rapidly growing demand for convenient and professional laundry services. If you're considering starting a…",
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'May 11, 2026',
    dateTime: '2026-05-11',
    image: blog2,
    readTime: '7 min read',
  },
  {
    id: 3,
    slug: 'why-laundry-dry-cleaning-best-franchise-2026',
    title: 'Why Laundry and Dry Cleaning Is One of the Best Franchise Businesses in 2026',
    excerpt:
      "Laundry is not discretionary spending. It is not influenced by trends, seasons, or economic cycles in the same way food or retail businesses are. Clothes must be washed regardless of market conditions. Several structural shifts are accelerating the growth of professional laundry services in India: Unlike one-time services, laundry operates on weekly and monthly repeat…",
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'May 11, 2026',
    dateTime: '2026-05-11',
    image: blog3,
    readTime: '7 min read',
  },
  {
    id: 4,
    slug: 'how-to-choose-best-laundry-service-your-city',
    title: 'How to Choose the Best Laundry Service In Your City',
    excerpt:
      "Finding the best laundry service is more than just a matter of convenience — it's about quality, reliability, and trust. With modern lifestyles getting busier, professional laundry services have become essential for saving time and keeping clothes fresh. But how do you identify a service that truly delivers what it promises? Here's a complete guide…",
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'May 7, 2026',
    dateTime: '2026-05-07',
    image: blog4,
    readTime: '4 min read',
  },
  {
    id: 5,
    slug: 'best-laundry-service-ip-extension-east-delhi',
    title: 'Best Laundry Service in IP Extension, East Delhi',
    excerpt:
      "Finding a dependable laundry service in IP Extension can be challenging, especially with so many options available. While most services promise quick delivery and quality cleaning, not all of them deliver what they claim. Whether you're a working professional, a student, or a family in East Delhi, choosing the right laundry service near me can…",
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'May 7, 2026',
    dateTime: '2026-05-07',
    image: blog5,
    readTime: '5 min read',
  },
  {
    id: 6,
    slug: 'best-franchise-business-models-india',
    title: 'Best Franchise Business Models in India',
    excerpt:
      "Understanding the franchise business model has become essential for entrepreneurs who want faster growth with less operational struggle. Whether you're a startup founder planning to expand or someone exploring franchising for the first time, choosing the right model—FOFO, FOCO, COCO, or hybrid—can hugely impact your long-term success. In India, the franchise sector is booming. From…",
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'May 7, 2026',
    dateTime: '2026-05-07',
    image: blog6,
    readTime: '6 min read',
  },
  {
    id: 7,
    slug: 'rise-of-on-demand-laundry-services-india',
    title: 'The Rise of On-Demand Laundry Services in India',
    excerpt:
      "Laundry is one of the most time-consuming household Unwanted tasks. It requires effort, patience, and a significant portion of your day. Imagine coming home after a long day at work or a tiring weekend only to be greeted by a mountain of unwashed clothes. Sounds frustrating, right? Well, that's where on-demand laundry services like Cleanz24 come into play!…",
    categories: ['All Services', 'Blog', 'Commercial Cleaning', 'Dry Cleaning'],
    author: 'cleanz24',
    date: 'April 21, 2026',
    dateTime: '2026-04-21',
    image: blog7,
    readTime: '5 min read',
  },
  {
    id: 8,
    slug: 'best-laundry-franchise-bangalore-2026',
    title: 'Best Laundry Franchise in Bangalore – Start a Profitable Laundry Business with Cleanz24',
    excerpt:
      "Bangalore's bustling urban lifestyle has made laundry franchises one of the most promising business opportunities in the city. From busy IT professionals to students and families, everyone in Bangalore needs clean clothes without the hassle – creating a booming demand for convenient laundry services. If you're considering a laundry franchise in Bangalore, this comprehensive guide will walk you through…",
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'April 21, 2026',
    dateTime: '2026-04-21',
    image: blog8,
    readTime: '6 min read',
  },
  {
    id: 9,
    slug: 'laundry-dry-cleaning-franchise-india-guide-2026',
    title: 'Laundry and Dry Cleaning Franchise in India – Complete Business Opportunity Guide (2026)',
    excerpt:
      "India's laundry industry is quietly transforming into one of the country's largest service sectors. Market estimates place the Indian laundry industry above ₹2.5 lakh crore, yet nearly 95% of the market remains unorganized. This gap between demand and organized services is exactly why laundry and dry cleaning franchises in India are rapidly expanding. Urban professionals, students, hotels,…",
    categories: ['Blog', 'All Services'],
    author: 'cleanz24',
    date: 'April 21, 2026',
    dateTime: '2026-04-21',
    image: blog9,
    readTime: '8 min read',
  },
  {
    id: 10,
    slug: 'best-laundry-franchise-delhi-2026',
    title: 'Best Laundry Franchise in Delhi – Start a Profitable Laundry Business with Cleanz24',
    excerpt:
      "Delhi's fast-paced urban lifestyle has made laundry franchises one of the most promising business opportunities in the city. From busy corporate professionals to students and families, everyone in Delhi needs clean clothes without the hassle of managing laundry at home creating a rapidly growing demand for convenient and professional laundry services. If you're considering starting…",
    categories: ['Blog', 'Commercial Cleaning', 'Dry Cleaning'],
    author: 'cleanz24',
    date: 'April 20, 2026',
    dateTime: '2026-04-20',
    image: blog10,
    readTime: '6 min read',
  },
  {
    id: 11,
    slug: 'best-laundry-franchise-pune',
    title: 'Best Laundry Franchise in Pune – Start a Profitable Laundry Business with Cleanz24',
    excerpt:
      "Pune’s fast-paced urban lifestyle has made laundry franchises one of the most promising business opportunities in the city. From busy corporate professionals to students and families, everyone in Pune needs clean clothes without the hassle of managing laundry at home  creating a rapidly growing demand for convenient and professional laundry services. If you’re considering starting…",
    categories: ['Blog', 'Commercial Cleaning', 'Dry Cleaning'],
    author: 'cleanz24',
    date: 'April 20, 2026',
    dateTime: '2026-04-20',
    image: blog11,
    readTime: '6 min read',
  },
  {
    id: 12,
    slug: 'best-laundry-franchise-mumbai',
    title: 'Best Laundry Franchise in Mumbai – Start a Profitable Laundry Business with Cleanz24',
    excerpt:
      "Mumbai’s fast-paced urban lifestyle has made laundry franchises one of the most promising business opportunities in the state. From busy corporate professionals to students and families, everyone in Mumbai needs clean clothes without the hassle of managing laundry at home — creating a rapidly growing demand for convenient and professional laundry services. If you’re considering…",
    categories: ['Blog', 'Commercial Cleaning', 'Dry Cleaning'],
    author: 'cleanz24',
    date: 'April 20, 2026',
    dateTime: '2026-04-20',
    image: blog12,
    readTime: '6 min read',
  },
  {
    id: 13,
    slug: 'top-10-laundry-dry-cleaning-franchises-india',
    title: 'Top 10 Laundry And Dry Cleaning Franchises in India',
    excerpt:
      "The laundry and dry cleaning industry in India presents a highly lucrative business opportunity, fueled by rapid urbanization, evolving consumer lifestyles, and increasing disposable incomes. With more people seeking professional garment care and time-saving services, the demand for organized laundry solutions continues to grow across metros and tier-2 cities. Investing in a laundry or dry…",
    categories: ['Blog', 'Dry Cleaning'],
    author: 'cleanz24',
    date: 'April 17, 2026',
    dateTime: '2026-04-17',
    image: blog13,
    readTime: '5 min read',
  },
  {
    id: 14,
    slug: 'why-eco-friendly-laundry-services-future-2026',
    title: 'Why Eco-Friendly Laundry Services Are the Future in 2026',
    excerpt:
      "In 2026, consumers are more environmentally conscious than ever. From reducing plastic waste to choosing sustainable fashion, people are making greener choices daily. One area where this shift is clearly emerging is in laundry & dry cleaning near me. As homeowners and businesses seek cleaner, safer, and more sustainable options, eco-friendly laundry services are rapidly becoming the future…",
    categories: ['Blog'],
    author: 'SOMNATH RAUTRAY',
    date: 'March 31, 2026',
    dateTime: '2026-03-31',
    image: blog14,
    readTime: '5 min read',
  },
  {
    id: 15,
    slug: 'commercial-cleaning-services-offices-retail-business-spaces',
    title: 'Commercial Cleaning services for Offices, Retail and Business Spaces',
    excerpt:
      "Commercial cleaning plays an important role in keeping offices, retail stores, and other workplaces organized and presentable. A well-maintained workplace supports employee productivity and creates a positive impression on customers and visitors.",
    categories: ['Blog', 'Commercial Cleaning'],
    author: 'cleanz24',
    date: 'March 25, 2026',
    dateTime: '2026-03-25',
    image: blog15,
    readTime: '4 min read',
  },
  {
    id: 16,
    slug: 'proven-ways-increase-profits-dry-cleaning-franchise-model',
    title: 'Proven Ways to Increase Profits in a Dry-Cleaning Franchise Model',
    excerpt:
      "The demand for professional laundry services is increasing rapidly as urban lifestyles become faster and more convenience driven. Working professionals, students, and families prefer outsourcing laundry to save time and ensure better garment care. This growing shift has created strong opportunities for entrepreneurs in the organized laundry sector. Instead of starting a business from scratch,…",
    categories: ['Blog', 'Commercial Cleaning'],
    author: 'cleanz24',
    date: 'February 15, 2026',
    dateTime: '2026-02-15',
    image: blog16,
    readTime: '5 min read',
  },
  {
    id: 17,
    slug: 'how-to-find-best-laundry-service-bangalore',
    title: 'How to Find the Best Laundry Service in Bangalore: A Complete Guide',
    excerpt:
      "Bangalore is famous for its fast-paced lifestyle, hectic schedules, and long working hours. As the professionals, students, and families keep moving, handling daily chores often feels overwhelming.",
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'February 11, 2026',
    dateTime: '2026-02-11',
    image: blog17,
    readTime: '4 min read',
  },
  {
    id: 18,
    slug: 'what-expect-professional-laundry-service-near-you',
    title: 'What to Expect from a Professional Laundry Service Near You',
    excerpt:
      "Does laundry seem like a never-ending chore in your busy schedule? In today’s modern world, it is often challenging for people to manage time and reduce daily stress.",
    categories: ['Blog', 'Commercial Cleaning', 'Dry Cleaning'],
    author: 'cleanz24',
    date: 'February 6, 2026',
    dateTime: '2026-02-06',
    image: blog18,
    readTime: '5 min read',
  },
  {
    id: 19,
    slug: 'real-investment-behind-dry-cleaning-franchise-explained',
    title: 'The Real Investment Behind a Dry-Cleaning Franchise Explained',
    excerpt:
      "In today’s fast-moving life, professional laundry and dry-cleaning services are no longer a luxury; they are a necessity that eventually influences people’s lifestyles. This is where Cleanz24 plays a crucial role by transforming the whole garment care industry by making the services convenient and easy to use.",
    categories: ['Blog', 'Dry Cleaning'],
    author: 'cleanz24',
    date: 'January 31, 2026',
    dateTime: '2026-01-31',
    image: blog19,
    readTime: '6 min read',
  },
  {
    id: 20,
    slug: 'professional-steam-ironing-finish-premium',
    title: 'Professional Steam Ironing: What Makes the Finish Look Premium',
    excerpt:
      "Perfectly pressed clothes raise your looks efficiently and this is where professional steam ironing plays an important role in providing a premium finish.",
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'January 29, 2026',
    dateTime: '2026-01-29',
    image: blog20,
    readTime: '4 min read',
  },
  {
    id: 21,
    slug: 'how-dry-cleaning-franchise-works-costs-operations-reality',
    title: 'How a Dry-Cleaning Franchise Works: Costs, Operations, and Reality',
    excerpt:
      "In today’s fast-paced lifestyle, professional clothing care has become a practical necessity rather than a luxury. From everyday wear to sensitive fabrics, all need expert care and cleaning solutions that maintain their natural shine. That is where our dry-cleaning service comes in.",
    categories: ['Blog', 'Dry Cleaning'],
    author: 'cleanz24',
    date: 'January 25, 2026',
    dateTime: '2026-01-25',
    image: blog21,
    readTime: '6 min read',
  },
  {
    id: 22,
    slug: 'how-often-should-leather-be-cleaned-expert-care-explained',
    title: 'How Often Should Leather Be Cleaned? Expert Care Explained',
    excerpt:
      "However, sustaining its quality can be difficult. Excess moisture, prolonged exposure to heat, lack of conditioning, scratches, and abrasion can easily damage leather.",
    categories: ['Blog', 'Leather Cleaning'],
    author: 'cleanz24',
    date: 'January 19, 2026',
    dateTime: '2026-01-19',
    image: blog22,
    readTime: '5 min read',
  },
  {
    id: 23,
    slug: 'how-commercial-cleaning-improves-workplace-hygiene-productivity',
    title: 'How Commercial Cleaning Improves Workplace Hygiene and Productivity',
    excerpt:
      "Commercial cleaning plays a vital role in maintaining workplace hygiene and improving employee productivity. Learn how professional cleaning creates healthier, safer, and more efficient work environments.",
    categories: ['Blog', 'Commercial Cleaning'],
    author: 'cleanz24',
    date: 'January 17, 2026',
    dateTime: '2026-01-17',
    image: blog23,
    readTime: '5 min read',
  },
  {
    id: 24,
    slug: 'common-mistakes-people-make-choosing-dry-cleaner',
    title: 'Common Mistakes People Make When Choosing a Dry Cleaner',
    excerpt:
      "In this world where quality speaks louder than words, the care given to your clothes truly matters. Choosing the right and best dry cleaners near me is crucial for your clothes, as they reflect your lifestyle, confidence, and professionalism; a single mistake can irreparably damage your clothes.",
    categories: ['Blog', 'Dry Cleaning'],
    author: 'cleanz24',
    date: 'January 16, 2026',
    dateTime: '2026-01-16',
    image: blog24,
    readTime: '5 min read',
  },
  {
    id: 25,
    slug: 'how-to-remove-curry-stains-haldi-oil-spice',
    title: 'How to Remove Curry Stains (Haldi, Oil & Spice)',
    excerpt:
      "Curry stains are among the toughest household stains in India.Thanks to haldi (turmeric), oil, red chilli, garam masala, and tomato, curry stains are a combination of pigment + grease, which makes them difficult to remove if not treated correctly. The key rule: act fast and avoid heat until the stain is gone. Why Curry Stains…",
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'December 23, 2025',
    dateTime: '2025-12-23',
    image: blog25,
    readTime: '5 min read',
  },
  {
    id: 26,
    slug: 'how-to-wash-wool-silk-linen-premium-fabrics-safely-expert-guide',
    title: 'How to Wash Wool, Silk, Linen & Premium Fabrics Safely: Expert Guide',
    excerpt:
      "Here is How to Wash Wool, Silk, Linen & Premium Fabrics Safely Premium fabrics such as wool, silk, linen, cashmere, pashmina, satin, and fine blends require extra care during washing.Incorrect washing can cause shrinking, stretching, color fading, rough texture, or permanent damage. This expert guide explains fabric-specific washing techniques, detergents to use, drying methods, and…",
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'December 20, 2025',
    dateTime: '2025-12-20',
    image: blog26,
    readTime: '6 min read',
  },
  {
    id: 27,
    slug: 'how-to-wash-dark-clothes-without-fading',
    title: 'How to Wash Dark Clothes Without Fading',
    excerpt:
      "Dark clothes—black jeans, navy shirts, maroon dresses, charcoal trousers—look stylish and sharp when new.But with improper washing, they quickly turn dull, faded, and patchy. The good news? You can keep your dark clothes looking rich and vibrant for years by following the right washing techniques.This guide explains everything: detergents, temperature, washing cycles, drying methods, and…",
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'December 15, 2025',
    dateTime: '2025-12-15',
    image: blog27,
    readTime: '5 min read',
  },
  {
    id: 28,
    slug: 'how-to-prevent-shrinking-of-clothes-during-washing',
    title: 'How to Prevent Shrinking of Clothes During Washing',
    excerpt:
      "Shrinking is one of the most common laundry problems—especially with cotton, wool, linen, and delicate fabrics.Clothes shrink when exposed to heat, friction, and excessive agitation, or when washed incorrectly. The good news? You can easily prevent shrinking by adjusting your washing method, detergent choice, and drying habits.Here’s everything you should do to protect your garments….",
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'December 12, 2025',
    dateTime: '2025-12-12',
    image: blog28,
    readTime: '5 min read',
  },
  {
    id: 29,
    slug: 'how-to-wash-white-clothes-keep-them-bright-complete-guide',
    title: 'How to Wash White Clothes to Keep Them Bright: Complete Guide',
    excerpt:
      "How to Wash White Clothes White clothes look clean, elegant, and fresh—until they start turning dull, grey, or yellow.The truth is, keeping whites bright requires more than just washing them regularly.With the right techniques, detergents, and care habits, you can maintain the original whiteness and brightness of your garments for years. This expert guide covers…",
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'December 12, 2025',
    dateTime: '2025-12-12',
    image: blog29,
    readTime: '5 min read',
  },
  {
    id: 30,
    slug: 'how-to-wash-clothes-properly-complete-beginners-guide',
    title: 'How to Wash Clothes Properly: Complete Beginner’s Guide',
    excerpt:
      "How to Wash Clothes Properly Washing clothes may seem simple—put everything in the machine, add detergent, and press start.But if you want cleaner, fresher, longer-lasting clothes, you need to follow the right process.This beginner’s guide explains exactly how to wash clothes properly, what detergents to use, how to sort laundry, wash temperatures, drying tips, and…",
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'December 11, 2025',
    dateTime: '2025-12-11',
    image: blog30,
    readTime: '6 min read',
  },
  {
    id: 31,
    slug: 'how-to-remove-tough-stains-from-clothes-oil-ink-curry-makeup-sweat',
    title: 'How to Remove Tough Stains from Clothes (Oil, Ink, Curry, Makeup, Sweat): Complete Guide',
    excerpt:
      "How to Remove Tough Stains from Clothes Stains on clothes are unavoidable—whether it’s an oil splash from cooking, ink marks from a pen, curry stains, makeup smudges, or stubborn sweat patches.The good news? Most stains can be removed easily if you know the right technique. This guide explains step-by-step stain removal methods for each type…",
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'December 10, 2025',
    dateTime: '2025-12-10',
    image: blog31,
    readTime: '6 min read',
  },
  {
    id: 32,
    slug: 'laundry-hacks-for-busy-families-conquer-never-ending-laundry-pile',
    title: 'Laundry Hacks for Busy Families: How to Conquer the Never-Ending Laundry Pile',
    excerpt:
      "Laundry can quickly become overwhelming for families, piling up faster than you can tackle it. Between kids’ activities, work schedules, and daily life, managing laundry efficiently can feel impossible. But don’t despair—these practical laundry hacks will help your family keep the chaos under control. 1. Create a Family Laundry Schedule Establishing a regular schedule can…",
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'December 9, 2025',
    dateTime: '2025-12-09',
    image: blog32,
    readTime: '5 min read',
  },
  {
    id: 33,
    slug: 'how-to-iron-clothes-perfectly-expert-tips-wrinkle-free-results',
    title: 'How to Iron Clothes Perfectly: Expert Tips for Wrinkle-Free Results',
    excerpt:
      "Wrinkle-free, neatly pressed clothes instantly elevate your appearance and confidence. Ironing, however, can often feel tedious or intimidating. With the right techniques and expert tips, mastering the art of ironing becomes simple. Here’s your comprehensive guide to achieve professional results right at home. Why Proper Ironing Matters Well-ironed clothing looks more professional, enhances your personal…",
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'December 9, 2025',
    dateTime: '2025-12-09',
    image: blog33,
    readTime: '5 min read',
  },
  {
    id: 34,
    slug: 'choosing-best-laundry-detergent-liquid-vs-powder-eco-friendly',
    title: 'Choosing the Best Laundry Detergent: Liquid vs. Powder and Eco-Friendly Alternatives',
    excerpt:
      "Doing laundry effectively requires selecting the right detergent. With numerous options on the market—liquid, powder, and eco-friendly varieties—making the best choice can significantly impact your laundry results and environmental footprint. Here’s a comprehensive breakdown to help you make an informed decision. Liquid Detergent: Pros and Cons Advantages: Disadvantages: Best for: Powder Detergent: Pros and Cons…",
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'December 8, 2025',
    dateTime: '2025-12-08',
    image: blog34,
    readTime: '6 min read',
  },
  {
    id: 35,
    slug: 'how-to-treat-stubborn-stains-professional-methods-every-fabric-type',
    title: 'How to Treat Stubborn Stains: Professional Methods for Every Fabric Type',
    excerpt:
      "Stubborn stains can be frustrating, especially when they threaten to ruin your favorite clothes or upholstery. Understanding the right treatment methods for different fabric types is crucial for preserving your belongings. Here’s a comprehensive guide on professional methods to effectively remove stubborn stains from various fabrics. 1. Understanding Fabric Types and Stain Basics Different fabrics…",
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'December 8, 2025',
    dateTime: '2025-12-08',
    image: blog35,
    readTime: '6 min read',
  },
];

const blogImages = [
  blog1, blog2, blog3, blog4, blog5, blog6, blog7, blog8, blog9, blog10,
  blog11, blog12, blog13, blog14, blog15, blog16, blog17, blog18, blog19, blog20,
  blog21, blog22, blog23, blog24, blog25, blog26, blog27, blog28, blog29, blog30,
  blog31, blog32, blog33, blog34, blog35
];

const GENERATED_STORE_POSTS = [];
storesData.forEach((store) => {
  const citySlug = store.city.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  // Post 1: Best Laundry Nearby You
  GENERATED_STORE_POSTS.push({
    id: `g-nearby-${store.id}`,
    slug: `best-laundry-nearby-you-${citySlug}-${store.id}`,
    title: `Best Laundry Service Nearby You in ${store.city} - ${store.name}`,
    excerpt: `Looking for the best laundry service nearby you in ${store.city}? Cleanz24 at ${store.address} offers premium eco-friendly washing, dry cleaning, and fabric sanitation.`,
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'June 6, 2026',
    dateTime: '2026-06-06',
    image: blogImages[(store.id * 3) % blogImages.length],
    readTime: '5 min read',
    isGenerated: true,
    storeId: store.id,
    storeType: 'nearby',
    store: store
  });

  // Post 2: Best Laundry & Dry Cleaning Store
  GENERATED_STORE_POSTS.push({
    id: `g-dry-${store.id}`,
    slug: `best-laundry-dry-cleaning-store-in-${citySlug}-${store.id}`,
    title: `Best Laundry & Dry Cleaning Store in ${store.city} - ${store.name}`,
    excerpt: `Discover the best laundry & dry cleaning store in ${store.city}. Cleanz24 at ${store.address} provides professional steam ironing, dry cleaning, and shoe cleaning.`,
    categories: ['Dry Cleaning'],
    author: 'cleanz24',
    date: 'June 6, 2026',
    dateTime: '2026-06-06',
    image: blogImages[(store.id * 3 + 1) % blogImages.length],
    readTime: '6 min read',
    isGenerated: true,
    storeId: store.id,
    storeType: 'dry-cleaning',
    store: store
  });

  // Post 3: Trusted Laundry Store
  GENERATED_STORE_POSTS.push({
    id: `g-trusted-${store.id}`,
    slug: `trusted-laundry-store-in-${citySlug}-${store.id}`,
    title: `Trusted Laundry Store in ${store.city} - ${store.name}`,
    excerpt: `Why Cleanz24 at ${store.address} is the most trusted laundry store in ${store.city}. Read about our certified master cleaners, state-of-the-art washing machines, and eco-safe detergents.`,
    categories: ['Blog'],
    author: 'cleanz24',
    date: 'June 6, 2026',
    dateTime: '2026-06-06',
    image: blogImages[(store.id * 3 + 2) % blogImages.length],
    readTime: '5 min read',
    isGenerated: true,
    storeId: store.id,
    storeType: 'trusted',
    store: store
  });

  // 30 Business & Franchise Profitability Blogs
  const businessTemplates = [
    // 1. Best business near me
    {
      title: `Why Laundry is the Best Business Near Me for Consistent Monthly Profits in ${store.city}`,
      slug: `why-laundry-is-best-business-near-me-for-profits-${citySlug}-${store.id}`,
      excerpt: `Looking for the best business near me to invest in ${store.city}? Learn why a Cleanz24 laundry franchise is the most profitable, recession-proof choice.`,
      type: 'best-business-1',
      readTime: '6 min read'
    },
    {
      title: `How to Start the Best Business Near Me with Low Risk in ${store.city}`,
      slug: `how-to-start-best-business-near-me-low-risk-${citySlug}-${store.id}`,
      excerpt: `Start the best business near me in ${store.city}. Read our guide on launching a low-risk, high-return dry cleaning and laundry franchise.`,
      type: 'best-business-2',
      readTime: '5 min read'
    },
    {
      title: `The Ultimate Guide to Owning the Best Business Near Me - Cleanz24 ${store.city}`,
      slug: `ultimate-guide-owning-best-business-near-me-${citySlug}-${store.id}`,
      excerpt: `Your roadmap to owning the best business near me in ${store.city}. Explore investment, operations, and ROI with Cleanz24.`,
      type: 'best-business-3',
      readTime: '6 min read'
    },
    // 2. Top rated businesses near me
    {
      title: `Why Top Rated Businesses Near Me Are Investing in Dry Cleaning in ${store.city}`,
      slug: `why-top-rated-businesses-near-me-investing-dry-cleaning-${citySlug}-${store.id}`,
      excerpt: `Discover why dry cleaning is the choice for top rated businesses near me in ${store.city}. Learn about our premium services and tech.`,
      type: 'top-rated-1',
      readTime: '5 min read'
    },
    {
      title: `How Cleanz24 Builds Top Rated Businesses Near Me in ${store.city}`,
      slug: `how-cleanz24-builds-top-rated-businesses-near-me-${citySlug}-${store.id}`,
      excerpt: `Learn how Cleanz24 builds top rated businesses near me in ${store.city} using German quality standards and active customer support.`,
      type: 'top-rated-2',
      readTime: '6 min read'
    },
    {
      title: `Secrets Behind the Top Rated Businesses Near Me - ${store.city} Edition`,
      slug: `secrets-behind-top-rated-businesses-near-me-${citySlug}-${store.id}`,
      excerpt: `What makes a brand stand out among the top rated businesses near me in ${store.city}? Uncover the customer retention secrets of laundry.`,
      type: 'top-rated-3',
      readTime: '5 min read'
    },
    // 3. Best service provider near me
    {
      title: `Why a Laundry Franchise is the Best Service Provider Near Me Opportunity in ${store.city}`,
      slug: `why-laundry-franchise-is-best-service-provider-near-me-${citySlug}-${store.id}`,
      excerpt: `Explore why laundry franchises rank as the best service provider near me investment opportunity in ${store.city} today.`,
      type: 'best-provider-1',
      readTime: '6 min read'
    },
    {
      title: `How the Best Service Provider Near Me in ${store.city} Operates`,
      slug: `how-best-service-provider-near-me-operates-${citySlug}-${store.id}`,
      excerpt: `Take a look inside how the best service provider near me in ${store.city} handles garment diagnostics, steam pressing, and logistics.`,
      type: 'best-provider-2',
      readTime: '5 min read'
    },
    {
      title: `Why Customers Choose the Best Service Provider Near Me in ${store.city}`,
      slug: `why-customers-choose-best-service-provider-near-me-${citySlug}-${store.id}`,
      excerpt: `From free doorstep pickup to German detergents, see why we are chosen as the best service provider near me in ${store.city}.`,
      type: 'best-provider-3',
      readTime: '5 min read'
    },
    // 4. Best local businesses in [city]
    {
      title: `Why Laundry and Dry Cleaning are the Best Local Businesses in ${store.city}`,
      slug: `why-laundry-dry-cleaning-best-local-businesses-in-${citySlug}-${store.id}`,
      excerpt: `Check out why laundry and dry cleaning are rated the best local businesses in ${store.city} for daily repeat cash flow.`,
      type: 'best-local-1',
      readTime: '6 min read'
    },
    {
      title: `How to Launch One of the Best Local Businesses in ${store.city}`,
      slug: `how-to-launch-best-local-businesses-in-${citySlug}-${store.id}`,
      excerpt: `Our step-by-step roadmap to launch one of the best local businesses in ${store.city} with Cleanz24 franchise support.`,
      type: 'best-local-2',
      readTime: '6 min read'
    },
    {
      title: `Ranking the Best Local Businesses in ${store.city} for Return on Investment`,
      slug: `ranking-best-local-businesses-in-${citySlug}-${store.id}`,
      excerpt: `See how laundry franchises rank among the best local businesses in ${store.city} for quick ROI and high retention.`,
      type: 'best-local-3',
      readTime: '5 min read'
    },
    // 5. Most recommended businesses near me
    {
      title: `Why Dry Cleaning is Among the Most Recommended Businesses Near Me in ${store.city}`,
      slug: `why-dry-cleaning-most-recommended-businesses-near-me-${citySlug}-${store.id}`,
      excerpt: `Find out why dry cleaning is one of the most recommended businesses near me to invest in ${store.city}.`,
      type: 'most-recommended-1',
      readTime: '6 min read'
    },
    {
      title: `How to Own One of the Most Recommended Businesses Near Me in ${store.city}`,
      slug: `how-to-own-most-recommended-businesses-near-me-${citySlug}-${store.id}`,
      excerpt: `Step into entrepreneurship by owning one of the most recommended businesses near me in ${store.city} with Cleanz24.`,
      type: 'most-recommended-2',
      readTime: '5 min read'
    },
    {
      title: `Why the Most Recommended Businesses Near Me in ${store.city} Are Recession-Proof`,
      slug: `why-most-recommended-businesses-near-me-recession-proof-${citySlug}-${store.id}`,
      excerpt: `Discover why laundry and dry cleaning services are the most recommended businesses near me in ${store.city} for safety in any economy.`,
      type: 'most-recommended-3',
      readTime: '6 min read'
    },
    // 6. Best company for [service] near me
    {
      title: `Why Cleanz24 is the Best Company for Laundry Services Near Me in ${store.city}`,
      slug: `why-cleanz24-is-best-company-for-laundry-near-me-${citySlug}-${store.id}`,
      excerpt: `Looking for the best company for laundry services near me in ${store.city}? See why Cleanz24 is the local industry leader.`,
      type: 'best-company-1',
      readTime: '5 min read'
    },
    {
      title: `How to Franchise with the Best Company for Dry Cleaning Near Me in ${store.city}`,
      slug: `how-to-franchise-with-best-company-for-dry-cleaning-${citySlug}-${store.id}`,
      excerpt: `Partner with the best company for dry cleaning near me in ${store.city} and build a successful business.`,
      type: 'best-company-2',
      readTime: '6 min read'
    },
    {
      title: `What Makes a Brand the Best Company for Clothes Washing Near Me in ${store.city}`,
      slug: `what-makes-brand-best-company-for-clothes-washing-${citySlug}-${store.id}`,
      excerpt: `Find out what factors make Cleanz24 the best company for clothes washing near me in ${store.city}.`,
      type: 'best-company-3',
      readTime: '5 min read'
    },
    // 7. Best [industry] services in [city]
    {
      title: `Why Cleanz24 Offers the Best Laundry Services in ${store.city}`,
      slug: `why-cleanz24-offers-best-laundry-services-in-${citySlug}-${store.id}`,
      excerpt: `Experience the best laundry services in ${store.city}. Learn how our eco-friendly solutions wash out the toughest stains.`,
      type: 'best-industry-1',
      readTime: '6 min read'
    },
    {
      title: `The Future of the Best Garment Care Services in ${store.city}`,
      slug: `future-of-best-garment-care-services-in-${citySlug}-${store.id}`,
      excerpt: `See how on-demand apps are shaping the future of the best garment care services in ${store.city}.`,
      type: 'best-industry-2',
      readTime: '6 min read'
    },
    {
      title: `Choosing the Best Laundry & Pressing Services in ${store.city}`,
      slug: `choosing-best-laundry-pressing-services-in-${citySlug}-${store.id}`,
      excerpt: `Your guide to choosing the best laundry & pressing services in ${store.city} for fabrics, shoes, and home items.`,
      type: 'best-industry-3',
      readTime: '5 min read'
    },
    // 8. Best reviewed businesses near me
    {
      title: `Why Cleanz24 is Among the Best Reviewed Businesses Near Me in ${store.city}`,
      slug: `why-cleanz24-is-best-reviewed-businesses-near-me-${citySlug}-${store.id}`,
      excerpt: `Check out why our Noida Sector 41 and other outlets are the best reviewed businesses near me in ${store.city}.`,
      type: 'best-reviewed-1',
      readTime: '5 min read'
    },
    {
      title: `How Best Reviewed Businesses Near Me Scale Using Customer Satisfaction in ${store.city}`,
      slug: `how-best-reviewed-businesses-near-me-scale-${citySlug}-${store.id}`,
      excerpt: `See how focusing on garment hygiene scales the best reviewed businesses near me in ${store.city}.`,
      type: 'best-reviewed-2',
      readTime: '6 min read'
    },
    {
      title: `Why Best Reviewed Businesses Near Me in ${store.city} Focus on Hygiene and Safety`,
      slug: `why-best-reviewed-businesses-near-me-focus-hygiene-${citySlug}-${store.id}`,
      excerpt: `Learn why safety protocols make dry cleaners the best reviewed businesses near me in ${store.city}.`,
      type: 'best-reviewed-3',
      readTime: '5 min read'
    },
    // 9. Trusted businesses near me
    {
      title: `Why Cleanz24 Outlets are the Most Trusted Businesses Near Me in ${store.city}`,
      slug: `why-cleanz24-outlets-most-trusted-businesses-near-me-${citySlug}-${store.id}`,
      excerpt: `Read why Cleanz24 is the top pick for trusted businesses near me in ${store.city} for premium wardrobe care.`,
      type: 'trusted-business-1',
      readTime: '5 min read'
    },
    {
      title: `How to Build One of the Most Trusted Businesses Near Me in ${store.city}`,
      slug: `how-to-build-most-trusted-businesses-near-me-${citySlug}-${store.id}`,
      excerpt: `Build a highly profitable branch and own one of the most trusted businesses near me in ${store.city}.`,
      type: 'trusted-business-2',
      readTime: '6 min read'
    },
    {
      title: `Why Trusted Businesses Near Me in ${store.city} are Essential for Local Economies`,
      slug: `why-trusted-businesses-near-me-essential-local-economy-${citySlug}-${store.id}`,
      excerpt: `Discover why stable service franchises are the most trusted businesses near me in ${store.city} for local growth.`,
      type: 'trusted-business-3',
      readTime: '5 min read'
    },
    // 10. Best value businesses near me
    {
      title: `Why Cleanz24 is the Leader in Best Value Businesses Near Me in ${store.city}`,
      slug: `why-cleanz24-leader-best-value-businesses-near-me-${citySlug}-${store.id}`,
      excerpt: `Find out why our doorstep model makes us the leader in best value businesses near me in ${store.city}.`,
      type: 'best-value-1',
      readTime: '5 min read'
    },
    {
      title: `How to Invest in Best Value Businesses Near Me with High Returns in ${store.city}`,
      slug: `how-to-invest-best-value-businesses-near-me-${citySlug}-${store.id}`,
      excerpt: `Invest in the best value businesses near me in ${store.city} with a secure cash-on-cash return.`,
      type: 'best-value-2',
      readTime: '6 min read'
    },
    {
      title: `What Makes Laundry Franchises the Best Value Businesses Near Me in ${store.city}`,
      slug: `what-makes-laundry-franchises-best-value-businesses-${citySlug}-${store.id}`,
      excerpt: `See why low operational costs rank laundry as the best value businesses near me in ${store.city}.`,
      type: 'best-value-3',
      readTime: '5 min read'
    }
  ];

  businessTemplates.forEach((t, index) => {
    GENERATED_STORE_POSTS.push({
      id: `g-biz-${store.id}-${index}`,
      slug: t.slug,
      title: t.title,
      excerpt: t.excerpt,
      categories: ['Franchise & Business'],
      author: 'cleanz24',
      date: 'June 6, 2026',
      dateTime: '2026-06-06',
      image: blogImages[(store.id * 7 + index) % blogImages.length],
      readTime: t.readTime || '5 min read',
      isBusinessGenerated: true,
      storeId: store.id,
      storeType: t.type,
      store: store
    });
  });
});

const ALL_BLOG_POSTS = [...BLOG_POSTS, ...GENERATED_STORE_POSTS];

const POSTS_PER_PAGE = 6;

/* ─── Category Badge ─────────────────────────────────────────────────────── */
function CategoryBadge({ category, isDarkMode }) {
  const colorMap = {
    'Blog':               { bg: '#EBF8FF', color: '#2B6CB0', darkBg: '#1a3a5c', darkColor: '#90CDF4' },
    'All Services':       { bg: '#F0FFF4', color: '#276749', darkBg: '#1a3a26', darkColor: '#9AE6B4' },
    'Commercial Cleaning':{ bg: '#FFFAF0', color: '#C05621', darkBg: '#3a2010', darkColor: '#FBD38D' },
    'Dry Cleaning':       { bg: '#FAF5FF', color: '#6B46C1', darkBg: '#2d1b5c', darkColor: '#D6BCFA' },
    'Franchise & Business': { bg: '#E6FFFA', color: '#319795', darkBg: '#1d4044', darkColor: '#4FD1C5' },
  };
  const c = colorMap[category] || { bg: '#EDF2F7', color: '#4A5568', darkBg: '#2d3748', darkColor: '#A0AEC0' };
  return (
    <span
      style={{
        background: isDarkMode ? c.darkBg : c.bg,
        color: isDarkMode ? c.darkColor : c.color,
        borderRadius: '30px',
        fontSize: '11px',
        fontWeight: 700,
        padding: '4px 12px',
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {category}
    </span>
  );
}

/* ─── Blog Card ──────────────────────────────────────────────────────────── */
function BlogCard({ post, isDarkMode }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: isDarkMode ? '#12253f' : '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: hovered
          ? isDarkMode ? '0 20px 50px rgba(0,0,0,0.5)' : '0 20px 50px rgba(43,108,176,0.12)'
          : isDarkMode ? '0 8px 24px rgba(0,0,0,0.3)' : '0 8px 24px rgba(0,0,0,0.05)',
        border: isDarkMode ? '1px solid #1b3252' : '1px solid #EDF2F7',
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
            background: 'rgba(0,0,0,0.65)',
            color: '#fff',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 600,
            padding: '4px 10px',
            backdropFilter: 'blur(4px)',
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
            <CategoryBadge key={cat} category={cat} isDarkMode={isDarkMode} />
          ))}
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: '18px',
            fontWeight: 700,
            lineHeight: 1.4,
            color: isDarkMode ? '#E2E8F0' : '#1A202C',
            marginBottom: '12px',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <Link
            to={`/laundry/blog/${post.slug}`}
            style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#2B6CB0')}
            onMouseLeave={(e) => (e.currentTarget.style.color = isDarkMode ? '#E2E8F0' : '#1A202C')}
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
            color: isDarkMode ? '#718096' : '#A0AEC0',
            flexWrap: 'wrap',
          }}
        >
          <span>By</span>
          <Link
            to="/laundry/blog"
            style={{ color: '#2B6CB0', fontWeight: 600, textDecoration: 'none' }}
          >
            {post.author}
          </Link>
          <span style={{ color: isDarkMode ? '#4A5568' : '#CBD5E0' }}>·</span>
          <time dateTime={post.dateTime}>{post.date}</time>
        </div>

        {/* Excerpt */}
        <p
          style={{
            fontSize: '14px',
            color: isDarkMode ? '#A0AEC0' : '#718096',
            lineHeight: 1.7,
            flex: 1,
            marginBottom: '20px',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.excerpt}
        </p>

        {/* Read More */}
        <div
          style={{
            borderTop: isDarkMode ? '1px solid #1b3252' : '1px solid #EDF2F7',
            paddingTop: '16px',
          }}
        >
          <Link
            to={`/laundry/blog/${post.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#2B6CB0',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'gap 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.gap = '10px')}
            onMouseLeave={(e) => (e.currentTarget.style.gap = '6px')}
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
function BlogSidebar({ isDarkMode, activeCategory, onCategoryChange, posts }) {
  const cardStyle = {
    background: isDarkMode ? '#12253f' : '#ffffff',
    border: isDarkMode ? '1px solid #1b3252' : '1px solid #EDF2F7',
    borderRadius: '16px',
    padding: '28px',
    marginBottom: '24px',
    boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.2)' : '0 4px 20px rgba(0,0,0,0.04)',
  };

  const headingStyle = {
    fontSize: '18px',
    fontWeight: 700,
    color: isDarkMode ? '#E2E8F0' : '#1A202C',
    marginBottom: '16px',
    fontFamily: "'Poppins', sans-serif",
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
            placeholder="Search articles..."
            style={{
              width: '100%',
              padding: '12px 16px 12px 44px',
              borderRadius: '10px',
              border: isDarkMode ? '1px solid #1b3252' : '1px solid #E2E8F0',
              background: isDarkMode ? '#0d1f36' : '#F8FAFC',
              color: isDarkMode ? '#E2E8F0' : '#2D3748',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
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
                    ? isDarkMode ? 'rgba(43,108,176,0.2)' : 'rgba(43,108,176,0.08)'
                    : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  marginBottom: '4px',
                  color: activeCategory === cat ? '#2B6CB0' : isDarkMode ? '#A0AEC0' : '#4A5568',
                  fontWeight: activeCategory === cat ? 700 : 500,
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {activeCategory === cat && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  )}
                  {cat}
                </span>
                <span
                  style={{
                    background: isDarkMode ? '#1b3252' : '#EDF2F7',
                    color: isDarkMode ? '#A0AEC0' : '#718096',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
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
            to={`/laundry/blog/${post.slug}`}
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
                  color: isDarkMode ? '#CBD5E0' : '#2D3748',
                  lineHeight: 1.4,
                  marginBottom: '4px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {post.title}
              </div>
              <div style={{ fontSize: '11px', color: isDarkMode ? '#718096' : '#A0AEC0' }}>
                <time dateTime={post.dateTime}>{post.date}</time>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Our Services */}
      <div style={cardStyle}>
        <h3 style={headingStyle}>Our Services</h3>
        {['Laundry', 'Dry Cleaning', 'Home Cleaning', 'Steam Ironing', 'Shoe Cleaning'].map((service) => (
          <Link
            key={service}
            to="/laundry"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 0',
              borderBottom: isDarkMode ? '1px solid #1b3252' : '1px solid #EDF2F7',
              textDecoration: 'none',
              color: isDarkMode ? '#A0AEC0' : '#4A5568',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#2B6CB0')}
            onMouseLeave={(e) => (e.currentTarget.style.color = isDarkMode ? '#A0AEC0' : '#4A5568')}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2B6CB0" strokeWidth="3">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            {service}
          </Link>
        ))}
      </div>
    </aside>
  );
}

/* ─── Hero Banner ────────────────────────────────────────────────────────── */
function BlogHero({ isDarkMode }) {
  return (
    <section
      style={{
        position: 'relative',
        background: isDarkMode
          ? 'linear-gradient(135deg, #0d1f36 0%, #102A45 100%)'
          : 'linear-gradient(135deg, #1e4e8c 0%, #2B6CB0 50%, #3C8B35 100%)',
        color: '#fff',
        padding: '80px 0 70px',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Decorative circles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            width: `${60 + i * 40}px`,
            height: `${60 + i * 40}px`,
            top: `${10 + i * 10}%`,
            left: i % 2 === 0 ? `${5 + i * 8}%` : `${70 + i * 3}%`,
            pointerEvents: 'none',
          }}
        />
      ))}

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.75)', alignItems: 'center' }}>
            <Link to="/laundry" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <span style={{ color: '#fff', fontWeight: 600 }}>Blog</span>
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
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '30px',
              fontSize: '12px',
              fontWeight: 700,
              padding: '6px 18px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px',
              backdropFilter: 'blur(10px)',
            }}
          >
            📝 Our Blog
          </span>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '16px',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Laundry Tips, News &amp;{' '}
            <span style={{ color: '#9AE6B4' }}>Insights</span>
          </h1>
          <p
            style={{
              fontSize: '17px',
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Expert advice on laundry care, dry cleaning tips, franchise opportunities, and everything in between.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Pagination ─────────────────────────────────────────────────────────── */
function Pagination({ current, total, onChange, isDarkMode }) {
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
            color: isDarkMode ? '#A0AEC0' : '#4A5568',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '700',
            padding: '4px 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#2B6CB0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = isDarkMode ? '#A0AEC0' : '#4A5568';
          }}
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
              background: isActive
                ? (isDarkMode ? '#2B6CB0' : '#1e4e8c')
                : 'transparent',
              color: isActive
                ? '#fff'
                : (isDarkMode ? '#A0AEC0' : '#4A5568'),
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = '#2B6CB0';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = isDarkMode ? '#A0AEC0' : '#4A5568';
              }
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
            color: isDarkMode ? '#A0AEC0' : '#4A5568',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '700',
            padding: '4px 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#2B6CB0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = isDarkMode ? '#A0AEC0' : '#4A5568';
          }}
        >
          &gt;
        </button>
      )}
    </nav>
  );
}

/* ─── Main Blog Page ─────────────────────────────────────────────────────── */
export default function Blog() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useOutletContext() || {};
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  if (slug) {
    const post = ALL_BLOG_POSTS.find((p) => p.slug === slug);
    if (!post) {
      return (
        <div style={{ background: isDarkMode ? '#081426' : '#F7FAFC', minHeight: '100vh', color: isDarkMode ? '#fff' : '#000', padding: '100px 20px', textAlign: 'center' }}>
          <h2 className="mb-4">Article Not Found</h2>
          <p className="text-muted mb-4">The laundry article you are looking for does not exist or has been relocated.</p>
          <Link to="/laundry/blog" className="btn btn-primary px-4 py-2" style={{ backgroundColor: '#2B6CB0', border: 'none', borderRadius: '4px' }}>Back to Blog</Link>
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
        "name": "Cleanz24 Laundry"
      },
      "description": post.excerpt
    };

    return (
      <div style={{ background: isDarkMode ? '#081426' : '#F7FAFC', minHeight: '100vh', color: isDarkMode ? '#fff' : '#000' }}>
        <SEOMeta
          title={post.title}
          description={post.excerpt}
          canonical={`https://cleanz24.com/laundry/blog/${post.slug}`}
          ogImage={post.image}
          ogType="article"
          schema={detailSchema}
        />
        
        {/* Detail Hero Banner */}
        <section
          style={{
            position: 'relative',
            height: '40vh',
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, ${isDarkMode ? '#081426' : '#F7FAFC'} 100%), url(${post.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            display: 'flex',
            alignItems: 'flex-end',
            paddingBottom: '30px'
          }}
        >
          <div className="container px-3">
            <h1 style={{ fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 800, color: isDarkMode ? '#fff' : '#1A202C', textShadow: '0 2px 10px rgba(0,0,0,0.3)', maxWidth: '900px' }}>
              {post.title}
            </h1>
            <div style={{ display: 'flex', gap: '16px', color: isDarkMode ? '#CBD5E0' : '#4A5568', fontSize: '14px', marginTop: '12px' }}>
              <span>By <strong style={{ color: '#2B6CB0' }}>{post.author}</strong></span>
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
            <div className="col-lg-8 text-start">
              <Link
                to="/laundry/blog"
                style={{
                  color: '#2B6CB0',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '32px'
                }}
              >
                ← Back to Laundry Blog
              </Link>

              <article 
                className="blog-post-content"
                style={{
                  lineHeight: '1.8',
                  fontSize: '16px',
                  color: isDarkMode ? '#CBD5E0' : '#4A5568'
                }}
              >
                {post.isBusinessGenerated ? (
                  <>
                    <h3>The Profitability of Laundry & Dry Cleaning Businesses in {post.store.city}</h3>
                    <p>
                      If you are analyzing local market opportunities or searching for the <strong>{post.title}</strong>, understanding the economics behind professional laundry and dry cleaning is key. 
                      The professional garment care industry in India is estimated to be over ₹2.5 Lakh Crore, with more than 95% still running in the unorganized sector. As cities like <strong>{post.store.city}</strong> grow, double-income households, corporate employees, and commercial businesses are increasingly outsourcing their laundry to save time.
                    </p>
                    <p>
                      Unlike other retail franchises, a laundry business is a repeat utility service. Customers require clean garments every single week, creating a predictable, subscription-like cash flow with high customer retention. This makes it one of the most stable, recession-proof business ventures to start.
                    </p>

                    <div style={{
                      background: isDarkMode ? 'rgba(43, 108, 176, 0.15)' : 'rgba(43, 108, 176, 0.05)',
                      borderLeft: '4px solid #2B6CB0',
                      padding: '20px',
                      borderRadius: '8px',
                      margin: '24px 0'
                    }}>
                      <h4 style={{ color: '#2B6CB0', marginTop: 0, fontWeight: 700 }}>📍 Local Business & Franchise Information</h4>
                      <p style={{ margin: '8px 0', fontSize: '15px' }}><strong>Featured Local Outlet:</strong> {post.store.name}</p>
                      <p style={{ margin: '8px 0', fontSize: '15px' }}><strong>Address:</strong> {post.store.address}</p>
                      <p style={{ margin: '8px 0', fontSize: '15px' }}><strong>Franchise Support Line:</strong> {post.store.phone}</p>
                      <p style={{ margin: '8px 0', fontSize: '15px' }}><strong>Google Rating:</strong> {post.store.rating} ★ ({post.store.reviews} Verified Reviews)</p>
                      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
                        <a href={`tel:${post.store.phone.replace(/\s+/g, '')}`} className="btn btn-sm text-white" style={{ backgroundColor: '#2B6CB0', border: 'none', padding: '6px 16px', fontWeight: 600 }}>Call Chauffeur</a>
                        <a href={`https://wa.me/${post.store.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-sm text-white" style={{ backgroundColor: '#28A745', border: 'none', padding: '6px 16px', fontWeight: 600 }}>WhatsApp Booking</a>
                        <Link to="/laundry/franchise" className="btn btn-sm btn-outline-primary" style={{ padding: '6px 16px', fontWeight: 600 }}>Franchise Info</Link>
                      </div>
                    </div>

                    <h3>Why a Laundry Franchise is the Right Investment Choice</h3>
                    <p>
                      Investing in one of the most successful businesses in <strong>{post.store.city}</strong> by partnering with a trusted national brand like Cleanz24 gives you a major head-start:
                    </p>
                    <ul>
                      <li><strong>Low Risk, High Necessity:</strong> Everyone wears clothes, and they must be washed. This demand is completely seasonal-free and recession-proof.</li>
                      <li><strong>High Repeat Customer Rate:</strong> Unlike one-off retail models, laundry operates on regular weekly or monthly cycles. Our customer retention is over 98%.</li>
                      <li><strong>Low Inventory Overhead:</strong> There are no high inventory costs. The garments are supplied entirely by the customer.</li>
                      <li><strong>Cleanz24 Ecosystem:</strong> We provide full end-to-end support including site location auditing, staff hiring, technical training, digital marketing campaigns, and billing CRM.</li>
                    </ul>

                    <h3>How Cleanz24 Maximizes Outlets Profitability</h3>
                    <p>
                      Our business models are structured for high operational efficiency:
                    </p>
                    <ol>
                      <li><strong>Multi-Channel Revenue:</strong> Source orders from both walk-in retail clients and app-based doorstep collection services.</li>
                      <li><strong>High Profit Margins:</strong> Bulk chemical procurement and water-saving machinery keep direct expenses low, yielding healthy margins up to 40%.</li>
                      <li><strong>Quick ROI:</strong> Most of our premium studios reach operational breakeven within 10 to 14 months of launching.</li>
                      <li><strong>National Trust:</strong> Benefit from a brand with 100+ stores nationwide and a rating of 4.8★.</li>
                    </ol>

                    <p>
                      Whether you are looking to invest in a highly profitable franchise or want to experience premium garment care at <strong>{post.store.name}</strong>, Cleanz24 is your perfect partner. Contact us today or visit our store in <strong>{post.store.city}</strong> to get started!
                    </p>
                  </>
                ) : post.isGenerated ? (
                  <>
                    <h3>Looking for Premium Laundry Services in {post.store.city}?</h3>
                    <p>
                      Finding a reliable laundry service can be a daunting task, especially when you want the absolute best care for your premium wear, everyday garments, and household fabrics. 
                      If you reside in or near <strong>{post.store.city}</strong>, look no further than <strong>{post.store.name}</strong>. Located at <em>{post.store.address}</em>, this outlet is part of Cleanz24's premium national network of over 100+ stores.
                    </p>
                    <p>
                      At Cleanz24, we combine state-of-the-art German eco-friendly detergents, professional laundry and dry-cleaning machinery, and highly trained master cleaners to ensure that your clothes look and feel brand new after every single wash.
                    </p>

                    <div style={{
                      background: isDarkMode ? 'rgba(43, 108, 176, 0.15)' : 'rgba(43, 108, 176, 0.05)',
                      borderLeft: '4px solid #2B6CB0',
                      padding: '20px',
                      borderRadius: '8px',
                      margin: '24px 0'
                    }}>
                      <h4 style={{ color: '#2B6CB0', marginTop: 0, fontWeight: 700 }}>📍 Store Details & Contact Information</h4>
                      <p style={{ margin: '8px 0', fontSize: '15px' }}><strong>Address:</strong> {post.store.address}</p>
                      <p style={{ margin: '8px 0', fontSize: '15px' }}><strong>Phone:</strong> {post.store.phone}</p>
                      <p style={{ margin: '8px 0', fontSize: '15px' }}><strong>Google Customer Rating:</strong> {post.store.rating} ★ ({post.store.reviews} Verified Reviews)</p>
                      <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
                        <a href={`tel:${post.store.phone.replace(/\s+/g, '')}`} className="btn btn-sm text-white" style={{ backgroundColor: '#2B6CB0', border: 'none', padding: '6px 16px', fontWeight: 600 }}>Call Store</a>
                        <a href={`https://wa.me/${post.store.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-sm text-white" style={{ backgroundColor: '#28A745', border: 'none', padding: '6px 16px', fontWeight: 600 }}>WhatsApp Us</a>
                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(post.store.name + ' ' + post.store.address)}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-secondary" style={{ padding: '6px 16px', fontWeight: 600 }}>Get Directions</a>
                      </div>
                    </div>

                    <h3>Why Cleanz24 is {post.store.city}'s Most Trusted Laundry & Dry Cleaning Brand</h3>
                    <p>
                      Our laundry and dry cleaning processes are designed to offer maximum convenience, unparalleled hygiene, and extreme fabric care:
                    </p>
                    <ul>
                      <li><strong>German Fabric Care:</strong> We use eco-friendly solvents that protect clothing threads from losing their count or shine, ensuring zero fading.</li>
                      <li><strong>Color & Sort Protocol:</strong> Your clothes are categorized by color density, care label guidelines, and material type prior to washing to prevent any cross-bleeding.</li>
                      <li><strong>Doorstep Convenience:</strong> Busy schedule? We offer complimentary doorstep pickup and delivery for all orders above ₹300!</li>
                      <li><strong>Transparent Diagnostics:</strong> Each item undergoes meticulous diagnostic inspections to identify fabric wear, loose seams, or specific stain pre-treatment requirements.</li>
                    </ul>

                    <h3>Our Comprehensive Cleaning Services in {post.store.city}</h3>
                    <p>
                      Cleanz24 - {post.store.name} offers a complete suite of professional cleaning solutions:
                    </p>
                    <ol>
                      <li><strong>Premium Wash & Fold:</strong> Ideal for daily casual wear, linens, and everyday clothes. Cleaned, dried, and crisply folded.</li>
                      <li><strong>Professional Dry Cleaning:</strong> Gentle chemical-free solvent wash specifically tailored for woolens, designer silk sarees, formal suits, and bridal wear.</li>
                      <li><strong>Steam Pressing (Ironing):</strong> Industrial steam irons to give your formal shirts, trousers, and blazers that crisp, zero-crease, premium corporate look.</li>
                      <li><strong>Sneaker & Shoe Restorations:</strong> Professional deep-cleansing for sports shoes, canvas sneakers, nubuck, and premium leather footwear.</li>
                      <li><strong>Home Soft Furnishing Deep Cleaning:</strong> Curtains, quilts, duvets, blankets, and sofa covers are washed and fully sanitized.</li>
                    </ol>

                    <p>
                      Experience the peace of mind that comes with premium garment care. Book your appointment or schedule a free pickup today at our <strong>{post.store.city}</strong> branch and see the Cleanz24 difference for yourself!
                    </p>
                  </>
                ) : (
                  <>
                    <h3>Introduction to Garment and Fabric Care</h3>
                    <p>{post.excerpt}</p>
                    <p>Proper fabric care is essential to extending the life of your garments. Different materials—such as silk, cotton, wool, synthetic blends, and linen—require specific washing temperatures, detergent strengths, and drying limits. In this article, we outline best practices for keeping your clothes in pristine condition and highlight common mistakes to avoid.</p>
                    
                    <h3>Key Takeaways for Daily Maintenance</h3>
                    <ul>
                      <li><strong>Check Care Labels:</strong> Always verify instructions before washing any premium fabric.</li>
                      <li><strong>Color Separation:</strong> Separate dark, white, and bright items to prevent bleeding.</li>
                      <li><strong>Gentle Detergents:</strong> Avoid harsh chemicals on delicate threads to prevent structural breakdown.</li>
                    </ul>
                    
                    <p>By implementing professional wash processes at home or trusting a certified cleaning team, you can keep colors vibrant, textures soft, and seams secure for years to come.</p>
                  </>
                )}
              </article>
            </div>

            <div className="col-lg-4">
              <BlogSidebar
                isDarkMode={isDarkMode}
                activeCategory="All"
                onCategoryChange={(cat) => {
                  navigate('/laundry/blog');
                }}
                posts={ALL_BLOG_POSTS}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filter posts
  const filteredPosts = ALL_BLOG_POSTS.filter((post) => {
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

  const pageBg = isDarkMode ? '#081426' : '#F7FAFC';

  return (
    <div style={{ background: pageBg, minHeight: '100vh' }}>
      {/* Hero */}
      <BlogHero isDarkMode={isDarkMode} />

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
                background: activeCategory === cat ? '#2B6CB0' : isDarkMode ? '#12253f' : '#fff',
                color: activeCategory === cat ? '#fff' : isDarkMode ? '#A0AEC0' : '#4A5568',
                border: isDarkMode ? '1px solid #1b3252' : '1px solid #E2E8F0',
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
              <p style={{ color: isDarkMode ? '#718096' : '#A0AEC0', fontSize: '14px', margin: 0 }}>
                Showing{' '}
                <strong style={{ color: isDarkMode ? '#E2E8F0' : '#2D3748' }}>
                  {filteredPosts.length}
                </strong>{' '}
                {filteredPosts.length === 1 ? 'article' : 'articles'}
                {activeCategory !== 'All' && (
                  <>
                    {' '}in{' '}
                    <strong style={{ color: '#2B6CB0' }}>{activeCategory}</strong>
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
                      <BlogCard post={post} isDarkMode={isDarkMode} />
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
                      color: isDarkMode ? '#E2E8F0' : '#2D3748',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    No articles found
                  </h3>
                  <p style={{ color: isDarkMode ? '#718096' : '#A0AEC0', marginTop: '8px' }}>
                    Try a different category or search term.
                  </p>
                  <button
                    onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                    style={{
                      marginTop: '20px',
                      background: '#2B6CB0',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '30px',
                      padding: '12px 28px',
                      fontWeight: 700,
                      cursor: 'pointer',
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
              isDarkMode={isDarkMode}
            />
          </div>

          {/* ── Sidebar ── */}
          <div className="col-lg-4 d-none d-lg-block">
            <BlogSidebar
              isDarkMode={isDarkMode}
              activeCategory={activeCategory}
              onCategoryChange={(cat) => setActiveCategory(cat)}
              posts={ALL_BLOG_POSTS}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
