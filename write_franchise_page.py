
import codecs, os

TARGET = r'c:\Users\DIVYA JAISWAL\Desktop\Cleanz24\CLeanz24_website\src\pages\laundry\FranchiseCityPage.jsx'

cities = [
  ('Visakhapatnam','Andhra Pradesh','visakhapatnam'),
  ('Vijayawada','Andhra Pradesh','vijayawada'),
  ('Guntur','Andhra Pradesh','guntur'),
  ('Tirupati','Andhra Pradesh','tirupati'),
  ('Nellore','Andhra Pradesh','nellore'),
  ('Kurnool','Andhra Pradesh','kurnool'),
  ('Rajahmundry','Andhra Pradesh','rajahmundry'),
  ('Kakinada','Andhra Pradesh','kakinada'),
  ('Kadapa','Andhra Pradesh','kadapa'),
  ('Anantapur','Andhra Pradesh','anantapur'),
  ('Guwahati','Assam','guwahati'),
  ('Dibrugarh','Assam','dibrugarh'),
  ('Silchar','Assam','silchar'),
  ('Jorhat','Assam','jorhat'),
  ('Patna','Bihar','patna'),
  ('Muzaffarpur','Bihar','muzaffarpur'),
  ('Gaya','Bihar','gaya'),
  ('Bhagalpur','Bihar','bhagalpur'),
  ('Darbhanga','Bihar','darbhanga'),
  ('Purnia','Bihar','purnia'),
  ('Arrah','Bihar','arrah'),
  ('Begusarai','Bihar','begusarai'),
  ('Katihar','Bihar','katihar'),
  ('Munger','Bihar','munger'),
  ('Chhapra','Bihar','chhapra'),
  ('Bettiah','Bihar','bettiah'),
  ('Samastipur','Bihar','samastipur'),
  ('Hajipur','Bihar','hajipur'),
  ('Raipur','Chhattisgarh','raipur'),
  ('Bhilai','Chhattisgarh','bhilai'),
  ('Bilaspur','Chhattisgarh','bilaspur-chhattisgarh'),
  ('Korba','Chhattisgarh','korba'),
  ('Durg','Chhattisgarh','durg'),
  ('Rajnandgaon','Chhattisgarh','rajnandgaon'),
  ('Arjunda','Chhattisgarh','arjunda-chhattisgarh'),
  ('Delhi','Delhi','delhi'),
  ('New Delhi','Delhi','new-delhi'),
  ('Laxmi Nagar','Delhi','laxmi-nagar-delhi'),
  ('Dwarka','Delhi','dwarka-delhi'),
  ('Rohini','Delhi','rohini-delhi'),
  ('Pitampura','Delhi','pitampura-delhi'),
  ('Janakpuri','Delhi','janakpuri-delhi'),
  ('Saket','Delhi','saket-delhi'),
  ('Vasant Kunj','Delhi','vasant-kunj-delhi'),
  ('Noida','Uttar Pradesh','noida'),
  ('Gurgaon','Haryana','gurgaon'),
  ('Gurugram','Haryana','gurugram'),
  ('Faridabad','Haryana','faridabad'),
  ('Ghaziabad','Uttar Pradesh','ghaziabad'),
  ('Greater Noida','Uttar Pradesh','greater-noida'),
  ('Greater Noida West','Uttar Pradesh','greater-noida-west'),
  ('Ahmedabad','Gujarat','ahmedabad'),
  ('Surat','Gujarat','surat'),
  ('Vadodara','Gujarat','vadodara'),
  ('Rajkot','Gujarat','rajkot'),
  ('Bhavnagar','Gujarat','bhavnagar'),
  ('Jamnagar','Gujarat','jamnagar'),
  ('Gandhinagar','Gujarat','gandhinagar'),
  ('Anand','Gujarat','anand'),
  ('Navsari','Gujarat','navsari'),
  ('Junagadh','Gujarat','junagadh'),
  ('Ambala','Haryana','ambala'),
  ('Hisar','Haryana','hisar'),
  ('Rohtak','Haryana','rohtak'),
  ('Karnal','Haryana','karnal'),
  ('Panipat','Haryana','panipat'),
  ('Sonipat','Haryana','sonipat'),
  ('Panchkula','Haryana','panchkula'),
  ('Shimla','Himachal Pradesh','shimla'),
  ('Dharamsala','Himachal Pradesh','dharamsala'),
  ('Manali','Himachal Pradesh','manali'),
  ('Ranchi','Jharkhand','ranchi'),
  ('Jamshedpur','Jharkhand','jamshedpur'),
  ('Dhanbad','Jharkhand','dhanbad'),
  ('Bokaro','Jharkhand','bokaro'),
  ('Hazaribagh','Jharkhand','hazaribagh'),
  ('Bengaluru','Karnataka','bengaluru'),
  ('Bangalore','Karnataka','bangalore'),
  ('Mysuru','Karnataka','mysuru'),
  ('Hubli','Karnataka','hubli'),
  ('Mangalore','Karnataka','mangalore'),
  ('Belagavi','Karnataka','belagavi'),
  ('Kalaburagi','Karnataka','kalaburagi'),
  ('Davanagere','Karnataka','davanagere'),
  ('Tumkur','Karnataka','tumkur'),
  ('Udupi','Karnataka','udupi'),
  ('Koramangala','Karnataka','koramangala'),
  ('Whitefield','Karnataka','whitefield'),
  ('Electronic City','Karnataka','electronic-city'),
  ('HSR Layout','Karnataka','hsr-layout'),
  ('Marathahalli','Karnataka','marathahalli'),
  ('Sarjapur Road','Karnataka','sarjapur-road'),
  ('Thiruvananthapuram','Kerala','thiruvananthapuram'),
  ('Kochi','Kerala','kochi'),
  ('Kozhikode','Kerala','kozhikode'),
  ('Thrissur','Kerala','thrissur'),
  ('Kannur','Kerala','kannur'),
  ('Malappuram','Kerala','malappuram'),
  ('Kollam','Kerala','kollam'),
  ('Palakkad','Kerala','palakkad'),
  ('Kottayam','Kerala','kottayam'),
  ('Alappuzha','Kerala','alappuzha'),
  ('Ernakulam','Kerala','ernakulam'),
  ('Cheriyamundam','Kerala','cheriyamundam-malappuram'),
  ('Kazhakkoottam','Kerala','kazhakkoottam-trivandrum'),
  ('Bhopal','Madhya Pradesh','bhopal'),
  ('Indore','Madhya Pradesh','indore'),
  ('Jabalpur','Madhya Pradesh','jabalpur'),
  ('Gwalior','Madhya Pradesh','gwalior'),
  ('Ujjain','Madhya Pradesh','ujjain'),
  ('Sagar','Madhya Pradesh','sagar'),
  ('Ratlam','Madhya Pradesh','ratlam'),
  ('Satna','Madhya Pradesh','satna'),
  ('Dewas','Madhya Pradesh','dewas'),
  ('Burhanpur','Madhya Pradesh','burhanpur'),
  ('Mumbai','Maharashtra','mumbai'),
  ('Pune','Maharashtra','pune'),
  ('Nagpur','Maharashtra','nagpur'),
  ('Nashik','Maharashtra','nashik'),
  ('Aurangabad','Maharashtra','aurangabad'),
  ('Solapur','Maharashtra','solapur'),
  ('Thane','Maharashtra','thane'),
  ('Navi Mumbai','Maharashtra','navi-mumbai'),
  ('Kolhapur','Maharashtra','kolhapur'),
  ('Amravati','Maharashtra','amravati'),
  ('Akola','Maharashtra','akola'),
  ('Jalgaon','Maharashtra','jalgaon'),
  ('Sangli','Maharashtra','sangli'),
  ('Latur','Maharashtra','latur'),
  ('Bandra','Maharashtra','bandra-mumbai'),
  ('Andheri','Maharashtra','andheri-mumbai'),
  ('Borivali','Maharashtra','borivali-mumbai'),
  ('Mulund','Maharashtra','mulund-mumbai'),
  ('Wakad','Maharashtra','wakad-pune'),
  ('Baner','Maharashtra','baner-pune'),
  ('Kothrud','Maharashtra','kothrud-pune'),
  ('Hinjewadi','Maharashtra','hinjewadi-pune'),
  ('Aundh','Maharashtra','aundh-pune'),
  ('Wagholi','Maharashtra','wagholi-pune'),
  ('Hadapsar','Maharashtra','hadapsar-pune'),
  ('Viman Nagar','Maharashtra','viman-nagar-pune'),
  ('Pimpri-Chinchwad','Maharashtra','pimpri-chinchwad'),
  ('Ravet','Maharashtra','ravet-pune'),
  ('Thane West','Maharashtra','thane-west'),
  ('Bhubaneswar','Odisha','bhubaneswar'),
  ('Cuttack','Odisha','cuttack'),
  ('Rourkela','Odisha','rourkela'),
  ('Sambalpur','Odisha','sambalpur'),
  ('Berhampur','Odisha','berhampur'),
  ('Puri','Odisha','puri'),
  ('Palasuni Bhubaneswar','Odisha','palasuni-bhubaneswar'),
  ('Chandrasekharpur Bhubaneswar','Odisha','chandrasekharpur-bhubaneswar'),
  ('Angul','Odisha','angul-odisha'),
  ('Jeypore','Odisha','jeypore-odisha'),
  ('Old Town Bhubaneswar','Odisha','old-town-bhubaneswar'),
  ('Jatni','Odisha','jatni-khordha'),
  ('CDA Cuttack','Odisha','cda-cuttack'),
  ('Ludhiana','Punjab','ludhiana'),
  ('Amritsar','Punjab','amritsar'),
  ('Jalandhar','Punjab','jalandhar'),
  ('Patiala','Punjab','patiala'),
  ('Mohali','Punjab','mohali'),
  ('Bathinda','Punjab','bathinda'),
  ('Pathankot','Punjab','pathankot'),
  ('Kharar','Punjab','kharar-punjab'),
  ('Jaipur','Rajasthan','jaipur'),
  ('Jodhpur','Rajasthan','jodhpur'),
  ('Kota','Rajasthan','kota'),
  ('Bikaner','Rajasthan','bikaner'),
  ('Ajmer','Rajasthan','ajmer'),
  ('Udaipur','Rajasthan','udaipur'),
  ('Alwar','Rajasthan','alwar'),
  ('Sikar','Rajasthan','sikar'),
  ('Bharatpur','Rajasthan','bharatpur'),
  ('Bhilwara','Rajasthan','bhilwara'),
  ('Churu','Rajasthan','churu-rajasthan'),
  ('Chennai','Tamil Nadu','chennai'),
  ('Coimbatore','Tamil Nadu','coimbatore'),
  ('Madurai','Tamil Nadu','madurai'),
  ('Tiruchirappalli','Tamil Nadu','tiruchirappalli'),
  ('Salem','Tamil Nadu','salem'),
  ('Tirunelveli','Tamil Nadu','tirunelveli'),
  ('Erode','Tamil Nadu','erode'),
  ('Vellore','Tamil Nadu','vellore'),
  ('Tiruppur','Tamil Nadu','tiruppur'),
  ('Thoothukudi','Tamil Nadu','thoothukudi'),
  ('OMR Chennai','Tamil Nadu','omr-chennai'),
  ('Velachery','Tamil Nadu','velachery-chennai'),
  ('Anna Nagar','Tamil Nadu','anna-nagar-chennai'),
  ('Adyar','Tamil Nadu','adyar-chennai'),
  ('T Nagar','Tamil Nadu','t-nagar-chennai'),
  ('Hyderabad','Telangana','hyderabad'),
  ('Warangal','Telangana','warangal'),
  ('Khammam','Telangana','khammam'),
  ('Nizamabad','Telangana','nizamabad'),
  ('Karimnagar','Telangana','karimnagar'),
  ('Secunderabad','Telangana','secunderabad'),
  ('Madhapur','Telangana','madhapur-hyderabad'),
  ('Gachibowli','Telangana','gachibowli-hyderabad'),
  ('Kondapur','Telangana','kondapur-hyderabad'),
  ('HITEC City','Telangana','hitec-city-hyderabad'),
  ('Kukatpally','Telangana','kukatpally-hyderabad'),
  ('Banjara Hills','Telangana','banjara-hills-hyderabad'),
  ('Jubilee Hills','Telangana','jubilee-hills-hyderabad'),
  ('Kokapet','Telangana','kokapet-hyderabad'),
  ('Gopanpally','Telangana','gopanpally-hyderabad'),
  ('Narsingi','Telangana','narsingi-hyderabad'),
  ('Lucknow','Uttar Pradesh','lucknow'),
  ('Kanpur','Uttar Pradesh','kanpur'),
  ('Agra','Uttar Pradesh','agra'),
  ('Varanasi','Uttar Pradesh','varanasi'),
  ('Prayagraj','Uttar Pradesh','prayagraj'),
  ('Meerut','Uttar Pradesh','meerut'),
  ('Bareilly','Uttar Pradesh','bareilly'),
  ('Aligarh','Uttar Pradesh','aligarh'),
  ('Moradabad','Uttar Pradesh','moradabad'),
  ('Gorakhpur','Uttar Pradesh','gorakhpur'),
  ('Saharanpur','Uttar Pradesh','saharanpur'),
  ('Mathura','Uttar Pradesh','mathura'),
  ('Jhansi','Uttar Pradesh','jhansi'),
  ('Muzaffarnagar','Uttar Pradesh','muzaffarnagar'),
  ('Hapur','Uttar Pradesh','hapur'),
  ('Ayodhya','Uttar Pradesh','ayodhya'),
  ('Indirapuram','Uttar Pradesh','indirapuram'),
  ('Noida Extension','Uttar Pradesh','noida-extension'),
  ('Dehradun','Uttarakhand','dehradun'),
  ('Haridwar','Uttarakhand','haridwar'),
  ('Roorkee','Uttarakhand','roorkee'),
  ('Nainital','Uttarakhand','nainital'),
  ('Haldwani','Uttarakhand','haldwani'),
  ('Rishikesh','Uttarakhand','rishikesh'),
  ('Kolkata','West Bengal','kolkata'),
  ('Howrah','West Bengal','howrah'),
  ('Durgapur','West Bengal','durgapur'),
  ('Asansol','West Bengal','asansol'),
  ('Siliguri','West Bengal','siliguri'),
  ('Bardhaman','West Bengal','bardhaman'),
  ('Malda','West Bengal','malda'),
  ('Panaji','Goa','panaji'),
  ('Margao','Goa','margao'),
  ('Srinagar','Jammu and Kashmir','srinagar'),
  ('Jammu','Jammu and Kashmir','jammu'),
  ('Imphal','Manipur','imphal'),
  ('Shillong','Meghalaya','shillong'),
  ('Agartala','Tripura','agartala'),
  ('Puducherry','Puducherry','puducherry'),
  ('Chandigarh','Chandigarh','chandigarh'),
]

lines = []
lines.append('import React, { useState } from "react";')
lines.append('import { useParams, Link, useOutletContext } from "react-router-dom";')
lines.append('import SEOMeta from "../../components/SEOMeta";')
lines.append('import { GOOGLE_SHEETS_LAUNDRY_FRANCHISE_SCRIPT_URL } from "../../config";')
lines.append('')
lines.append('export const FRANCHISE_CITIES = [')
for city, state, slug in cities:
    lines.append('  { city: "' + city + '", state: "' + state + '", slug: "' + slug + '" },')
lines.append('];')
lines.append('')
lines.append('const HIGH_VALUE_KEYWORDS = [')
for kw in ['best laundry franchise opportunity','most profitable business model','profitable franchise in India','low investment high return franchise','laundry franchise business','dry cleaning franchise','laundry service near me','best franchise business to start','profitable business ideas','laundry and dry cleaning service','premium laundry franchise','franchise opportunity India','best business with low investment','laundry startup opportunity']:
    lines.append('  "' + kw + '",')
lines.append('];')
lines.append('')
lines.append('const STATS = [')
lines.append('  { value: "70+", label: "Active Stores" },')
lines.append('  { value: "Rs.8-15L", label: "Monthly Revenue Potential" },')
lines.append('  { value: "35-45%", label: "Profit Margin" },')
lines.append('  { value: "18-24 mo", label: "ROI Recovery" },')
lines.append('];')
lines.append('')

lines.append('const WHY_CLEANZ24 = [')
lines.append('  { icon: "📈", title: "Most Profitable Business Model", desc: "Cleanz24 franchise delivers 35-45% net margins — one of the highest in the service franchise sector. Proven across 70+ stores." },')
lines.append('  { icon: "🏆", title: "Best Laundry Franchise Opportunity", desc: "India\'s premium laundry & dry cleaning franchise. 5-star rated, tech-enabled, and built for rapid scale." },')
lines.append('  { icon: "💰", title: "Low Investment, High Return", desc: "Start with just Rs.18-25 Lakhs. Get complete store setup, branding, training, supply chain, and digital marketing from Day 1." },')
lines.append('  { icon: "🤝", title: "Complete Business Support", desc: "From site selection to daily operations, our franchise team is with you. No experience required." },')
lines.append('  { icon: "🌐", title: "Digital & SEO Marketing Included", desc: "Every franchise gets a dedicated local Google listing, social media handle, and city page on Cleanz24.com." },')
lines.append('  { icon: "📦", title: "Proven & Scalable Franchise Model", desc: "Replicate our proven business system. Multi-unit options available. Partners earning Rs.2-5 Lakh per month." },')
lines.append('];')
lines.append('')

lines.append('const SERVICES = [')
lines.append('  { icon: "👕", name: "Wash & Fold", desc: "Best-in-class clothes washing with premium detergents" },')
lines.append('  { icon: "🥼", name: "Dry Cleaning", desc: "Expert dry cleaning for delicate fabrics, suits & sarees" },')
lines.append('  { icon: "♨", name: "Steam Ironing", desc: "Professional steam pressing for crisp, wrinkle-free clothes" },')
lines.append('  { icon: "👟", name: "Shoe Cleaning", desc: "Premium sneaker & leather shoe spa & restoration" },')
lines.append('  { icon: "👜", name: "Bag Cleaning", desc: "Luxury leather bag & handbag cleaning service" },')
lines.append('  { icon: "🛋", name: "Sofa & Carpet", desc: "Deep cleaning for sofas, carpets & curtains at home" },')
lines.append('];')
lines.append('')

lines.append('const INVESTMENT = [')
lines.append('  { tier: "Standard Store", investment: "Rs.18-22 Lakhs", area: "300-500 sq ft", revenue: "Rs.4-8 Lakhs/mo", roi: "20-24 months", badge: "" },')
lines.append('  { tier: "Premium Store", investment: "Rs.22-30 Lakhs", area: "500-800 sq ft", revenue: "Rs.8-15 Lakhs/mo", roi: "18-22 months", badge: "Most Popular" },')
lines.append('  { tier: "Flagship Store", investment: "Rs.30-45 Lakhs", area: "800-1500 sq ft", revenue: "Rs.15-25 Lakhs/mo", roi: "14-18 months", badge: "Best ROI" },')
lines.append('];')
lines.append('')

css_fn = r"""const PAGE_CSS = (dark) => `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Inter:wght@400;500;600&display=swap');
  .fcp-page { font-family:'Inter',sans-serif; color:${dark?"#e2e8f0":"#1a202c"}; background:${dark?"#0f1623":"#fff"}; }
  .fcp-hero { background:${dark?"linear-gradient(135deg,#0f1623 0%,#1a3a1a 100%)":"linear-gradient(135deg,#f0faf2 0%,#e8f5e9 100%)"}; padding:110px 0 70px; position:relative; overflow:hidden; }
  .fcp-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 70% 50%, rgba(34,197,94,0.12) 0%, transparent 60%); pointer-events:none; }
  .fcp-badge { display:inline-flex; align-items:center; gap:8px; background:${dark?"rgba(34,197,94,0.15)":"rgba(34,197,94,0.1)"}; border:1px solid ${dark?"rgba(34,197,94,0.3)":"rgba(34,197,94,0.4)"}; color:${dark?"#4ade80":"#16a34a"}; font-size:0.8rem; font-weight:600; padding:6px 16px; border-radius:99px; margin-bottom:20px; letter-spacing:0.05em; text-transform:uppercase; }
  .fcp-city-name { font-family:'Poppins',sans-serif; font-size:clamp(2.2rem,5vw,3.8rem); font-weight:900; color:${dark?"#f1f5f9":"#111"}; line-height:1.1; margin-bottom:8px; }
  .fcp-city-highlight { color:${dark?"#4ade80":"#16a34a"}; }
  .fcp-hero-sub { font-size:1.1rem; color:${dark?"#94a3b8":"#4a5568"}; max-width:560px; margin:16px 0 32px; line-height:1.7; }
  .fcp-hero-btns { display:flex; gap:14px; flex-wrap:wrap; }
  .fcp-btn-primary { background:linear-gradient(135deg,#16a34a,#15803d); color:#fff; border:none; border-radius:8px; padding:14px 32px; font-size:1rem; font-weight:700; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:all 0.2s; box-shadow:0 4px 20px rgba(22,163,74,0.35); }
  .fcp-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(22,163,74,0.45); }
  .fcp-btn-secondary { background:transparent; color:${dark?"#4ade80":"#16a34a"}; border:2px solid ${dark?"#4ade80":"#16a34a"}; border-radius:8px; padding:14px 32px; font-size:1rem; font-weight:700; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:all 0.2s; }
  .fcp-btn-secondary:hover { background:${dark?"rgba(74,222,128,0.1)":"rgba(22,163,74,0.08)"}; }
  .fcp-stats { display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:20px; margin:48px 0 0; }
  .fcp-stat { background:${dark?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.8)"}; border:1px solid ${dark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.06)"}; border-radius:12px; padding:20px; text-align:center; backdrop-filter:blur(10px); }
  .fcp-stat-val { font-family:'Poppins',sans-serif; font-size:1.8rem; font-weight:800; color:${dark?"#4ade80":"#16a34a"}; }
  .fcp-stat-label { font-size:0.8rem; color:${dark?"#94a3b8":"#6b7280"}; margin-top:4px; font-weight:500; }
  .fcp-section { padding:70px 0; }
  .fcp-section-alt { background:${dark?"#111827":"#f9fafb"}; }
  .fcp-section-title { font-family:'Poppins',sans-serif; font-size:clamp(1.6rem,3.5vw,2.4rem); font-weight:800; color:${dark?"#f1f5f9":"#111"}; margin-bottom:12px; }
  .fcp-section-sub { color:${dark?"#94a3b8":"#6b7280"}; font-size:1rem; max-width:540px; }
  .fcp-cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:24px; margin-top:40px; }
  .fcp-card { background:${dark?"#1e293b":"#fff"}; border:1px solid ${dark?"#334155":"#e5e7eb"}; border-radius:16px; padding:28px; transition:all 0.25s; }
  .fcp-card:hover { transform:translateY(-4px); box-shadow:0 12px 40px rgba(0,0,0,${dark?"0.3":"0.1"}); border-color:${dark?"#4ade80":"#16a34a"}; }
  .fcp-card-icon { font-size:2rem; margin-bottom:14px; }
  .fcp-card-title { font-family:'Poppins',sans-serif; font-size:1.05rem; font-weight:700; color:${dark?"#f1f5f9":"#111"}; margin-bottom:8px; }
  .fcp-card-desc { font-size:0.9rem; color:${dark?"#94a3b8":"#6b7280"}; line-height:1.6; }
  .fcp-service-cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:18px; margin-top:36px; }
  .fcp-service-card { background:${dark?"#1e293b":"#fff"}; border:1px solid ${dark?"#334155":"#e5e7eb"}; border-radius:12px; padding:22px; text-align:center; }
  .fcp-service-icon { font-size:2.2rem; margin-bottom:10px; }
  .fcp-service-name { font-weight:700; color:${dark?"#f1f5f9":"#111"}; font-size:0.95rem; margin-bottom:6px; }
  .fcp-service-desc { font-size:0.82rem; color:${dark?"#94a3b8":"#6b7280"}; }
  .fcp-invest-cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:24px; margin-top:40px; }
  .fcp-invest-card { background:${dark?"#1e293b":"#fff"}; border:2px solid ${dark?"#334155":"#e5e7eb"}; border-radius:16px; padding:30px; position:relative; }
  .fcp-invest-card.popular { border-color:#16a34a; }
  .fcp-invest-badge { position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:linear-gradient(135deg,#16a34a,#15803d); color:#fff; font-size:0.75rem; font-weight:700; padding:4px 16px; border-radius:99px; white-space:nowrap; }
  .fcp-invest-tier { font-family:'Poppins',sans-serif; font-size:1.1rem; font-weight:700; color:${dark?"#f1f5f9":"#111"}; margin-bottom:12px; }
  .fcp-invest-amount { font-size:1.6rem; font-weight:800; color:${dark?"#4ade80":"#16a34a"}; margin-bottom:6px; }
  .fcp-invest-row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid ${dark?"#334155":"#f3f4f6"}; font-size:0.88rem; }
  .fcp-invest-row:last-child { border-bottom:none; }
  .fcp-invest-label { color:${dark?"#94a3b8":"#6b7280"}; }
  .fcp-invest-val { font-weight:600; color:${dark?"#e2e8f0":"#1a202c"}; }
  .fcp-form-wrap { background:${dark?"#1e293b":"#fff"}; border:1px solid ${dark?"#334155":"#e5e7eb"}; border-radius:20px; padding:40px; max-width:560px; }
  .fcp-form-title { font-family:'Poppins',sans-serif; font-size:1.5rem; font-weight:800; color:${dark?"#f1f5f9":"#111"}; margin-bottom:6px; }
  .fcp-form-sub { color:${dark?"#94a3b8":"#6b7280"}; font-size:0.9rem; margin-bottom:28px; }
  .fcp-form label { display:block; font-weight:600; font-size:0.85rem; color:${dark?"#cbd5e1":"#374151"}; margin-bottom:6px; }
  .fcp-form input,.fcp-form select { width:100%; border:1.5px solid ${dark?"#334155":"#d1d5db"}; border-radius:8px; padding:11px 14px; font-size:0.95rem; color:${dark?"#e2e8f0":"#1a202c"}; background:${dark?"#0f1623":"#f9fafb"}; outline:none; margin-bottom:18px; box-sizing:border-box; transition:border-color 0.2s; }
  .fcp-form input:focus,.fcp-form select:focus { border-color:#16a34a; box-shadow:0 0 0 3px rgba(22,163,74,0.15); }
  .fcp-form input::placeholder { color:${dark?"#64748b":"#9ca3af"}; }
  .fcp-keywords { display:flex; flex-wrap:wrap; gap:10px; margin-top:32px; }
  .fcp-keyword { background:${dark?"rgba(34,197,94,0.1)":"rgba(34,197,94,0.08)"}; border:1px solid ${dark?"rgba(34,197,94,0.25)":"rgba(34,197,94,0.3)"}; color:${dark?"#4ade80":"#15803d"}; font-size:0.8rem; font-weight:600; padding:5px 14px; border-radius:99px; }
  .fcp-breadcrumb { display:flex; align-items:center; gap:8px; font-size:0.85rem; color:${dark?"#64748b":"#9ca3af"}; margin-bottom:24px; flex-wrap:wrap; }
  .fcp-breadcrumb a { color:${dark?"#4ade80":"#16a34a"}; text-decoration:none; }
  .fcp-breadcrumb a:hover { text-decoration:underline; }
  .fcp-success { text-align:center; padding:40px 20px; }
  .fcp-success-icon { font-size:3rem; margin-bottom:12px; }
  .fcp-success-title { font-family:'Poppins',sans-serif; font-size:1.4rem; font-weight:700; color:${dark?"#4ade80":"#16a34a"}; margin-bottom:8px; }
  .fcp-success-text { color:${dark?"#94a3b8":"#6b7280"}; font-size:0.95rem; }
  @media(max-width:768px) { .fcp-hero { padding:90px 0 50px; } .fcp-form-wrap { padding:24px; } }
`;
"""
lines.append(css_fn)

component = r"""export default function FranchiseCityPage() {
  const { citySlug } = useParams();
  const ctx = (typeof useOutletContext === "function" ? useOutletContext() : null) || {};
  const dark = ctx.darkMode ?? false;
  const cityData = FRANCHISE_CITIES.find((c) => c.slug === citySlug);
  const cityName = cityData ? cityData.city : "Your City";
  const stateName = cityData ? cityData.state : "India";
  const [form, setForm] = useState({ name: "", phone: "", email: "", investment: "", city: cityName });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmitting(true); setError("");
    try {
      if (GOOGLE_SHEETS_LAUNDRY_FRANCHISE_SCRIPT_URL) {
        const p = new URLSearchParams({ Name: form.name, Phone: form.phone, Email: form.email, Investment: form.investment, City: form.city, Source: "FranchiseCityPage-" + cityName });
        await fetch(GOOGLE_SHEETS_LAUNDRY_FRANCHISE_SCRIPT_URL + "?" + p.toString());
      }
      setSubmitted(true);
    } catch { setError("Something went wrong. Please WhatsApp us at +91 91380 04800."); }
    setSubmitting(false);
  };
  const canonicalUrl = "https://cleanz24.com/laundry/franchise/" + citySlug;
  const pageTitle = "Best Laundry & Dry Cleaning Franchise in " + cityName + " | Cleanz24";
  const pageDesc = "Start the most profitable laundry & dry cleaning franchise in " + cityName + ", " + stateName + ". Low investment (Rs.18-45L), high returns (35-45% margins), complete support. Enquire now!";
  const pageKeywords = ["laundry franchise in " + cityName, "dry cleaning franchise " + cityName, "best franchise opportunity in " + cityName, "profitable business in " + cityName, "laundry service near me " + cityName, "best laundry service " + cityName, "dry cleaning service near me " + cityName, "best business model " + cityName, "low investment franchise " + cityName, "Cleanz24 franchise " + cityName, ...HIGH_VALUE_KEYWORDS].join(", ");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "LocalBusiness", name: "Cleanz24 - " + cityName, description: pageDesc, url: canonicalUrl, telephone: "+919138004800", address: { "@type": "PostalAddress", addressLocality: cityName, addressRegion: stateName, addressCountry: "IN" }, priceRange: "Rs.", aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "500" } },
      { "@type": "FAQPage", mainEntity: [
        { "@type": "Question", name: "How much does a Cleanz24 franchise cost in " + cityName + "?", acceptedAnswer: { "@type": "Answer", text: "A Cleanz24 franchise in " + cityName + " costs Rs.18-45 Lakhs depending on store size. Includes setup, equipment, branding, and training." } },
        { "@type": "Question", name: "Is laundry franchise profitable in " + cityName + "?", acceptedAnswer: { "@type": "Answer", text: "Yes! Cleanz24 franchise delivers 35-45% profit margins in " + cityName + ". Partners earn Rs.4-15 Lakhs per month." } },
        { "@type": "Question", name: "What is the best franchise opportunity in " + cityName + "?", acceptedAnswer: { "@type": "Answer", text: "Cleanz24 is one of the best franchise opportunities in " + cityName + " — premium laundry, dry cleaning & car spa with proven ROI in 18-24 months." } },
        { "@type": "Question", name: "Where can I find the best dry cleaning service near me in " + cityName + "?", acceptedAnswer: { "@type": "Answer", text: "Cleanz24 is the best laundry & dry cleaning service near you in " + cityName + ". Call +91 91380 04800." } },
      ]},
    ],
  };
  const waLink = "https://wa.me/919138004800?text=Hi%20I%20want%20Cleanz24%20franchise%20in%20" + encodeURIComponent(cityName);
  return (
    <div className="fcp-page">
      <style>{PAGE_CSS(dark)}</style>
      <SEOMeta title={pageTitle} description={pageDesc} keywords={pageKeywords} canonical={canonicalUrl} schema={schema} />
      <section className="fcp-hero">
        <div className="container">
          <nav className="fcp-breadcrumb" aria-label="breadcrumb">
            <Link to="/laundry">Home</Link><span>›</span>
            <Link to="/laundry/franchise">Franchise</Link><span>›</span>
            <span>{cityName}</span>
          </nav>
          <span className="fcp-badge">🚀 Franchise Opportunity — {cityName}</span>
          <h1 className="fcp-city-name">Best Laundry & Dry Cleaning<br /><span className="fcp-city-highlight">Franchise in {cityName}</span></h1>
          <p className="fcp-hero-sub">Join India's most profitable laundry franchise in <strong>{cityName}, {stateName}</strong>. Low investment · High returns · Full support · Proven model. Best laundry & dry cleaning service near you.</p>
          <div className="fcp-hero-btns">
            <a href="#apply-now" className="fcp-btn-primary">📋 Apply for Franchise</a>
            <a href={waLink} target="_blank" rel="noreferrer" className="fcp-btn-secondary">💬 WhatsApp Us</a>
          </div>
          <div className="fcp-stats">{STATS.map((s) => (<div className="fcp-stat" key={s.label}><div className="fcp-stat-val">{s.value}</div><div className="fcp-stat-label">{s.label}</div></div>))}</div>
        </div>
      </section>
      <section className="fcp-section">
        <div className="container">
          <h2 className="fcp-section-title">Why Cleanz24 is the <span style={{ color: dark ? "#4ade80" : "#16a34a" }}>Best Franchise in {cityName}</span>?</h2>
          <p className="fcp-section-sub">Best profitable business model · Most successful franchise idea · High retention business opportunity</p>
          <div className="fcp-cards">{WHY_CLEANZ24.map((c) => (<div className="fcp-card" key={c.title}><div className="fcp-card-icon">{c.icon}</div><div className="fcp-card-title">{c.title}</div><div className="fcp-card-desc">{c.desc}</div></div>))}</div>
        </div>
      </section>
      <section className="fcp-section fcp-section-alt">
        <div className="container">
          <h2 className="fcp-section-title">Best Laundry & Dry Cleaning Services Near You in {cityName}</h2>
          <p className="fcp-section-sub">Your franchise store will offer all premium services in {cityName}</p>
          <div className="fcp-service-cards">{SERVICES.map((s) => (<div className="fcp-service-card" key={s.name}><div className="fcp-service-icon">{s.icon}</div><div className="fcp-service-name">{s.name}</div><div className="fcp-service-desc">{s.desc}</div></div>))}</div>
        </div>
      </section>
      <section className="fcp-section">
        <div className="container">
          <h2 className="fcp-section-title">Investment & Revenue in {cityName}</h2>
          <p className="fcp-section-sub">Most profitable franchise model with transparent cost structure and high ROI</p>
          <div className="fcp-invest-cards">{INVESTMENT.map((inv) => (<div className={"fcp-invest-card" + (inv.badge === "Most Popular" ? " popular" : "")} key={inv.tier}>{inv.badge ? <span className="fcp-invest-badge">{inv.badge}</span> : null}<div className="fcp-invest-tier">{inv.tier}</div><div className="fcp-invest-amount">{inv.investment}</div><div className="fcp-invest-row"><span className="fcp-invest-label">Area Required</span><span className="fcp-invest-val">{inv.area}</span></div><div className="fcp-invest-row"><span className="fcp-invest-label">Revenue/Month</span><span className="fcp-invest-val">{inv.revenue}</span></div><div className="fcp-invest-row"><span className="fcp-invest-label">ROI Recovery</span><span className="fcp-invest-val">{inv.roi}</span></div></div>))}</div>
        </div>
      </section>
      <section className="fcp-section fcp-section-alt" id="apply-now">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", alignItems: "flex-start" }}>
            <div>
              <h2 className="fcp-section-title">Start Your <span style={{ color: dark ? "#4ade80" : "#16a34a" }}>Franchise in {cityName}</span> Today</h2>
              <p style={{ color: dark ? "#94a3b8" : "#6b7280", fontSize: "1rem", lineHeight: 1.7, marginBottom: "24px" }}>Take the first step towards owning the most profitable business in {cityName}. Our team will call you within 24 hours.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>{["✅ Free franchise consultation call", "✅ Detailed ROI & profit model", "✅ Site selection & setup support", "✅ Full training & marketing kit", "✅ Dedicated area exclusivity in " + cityName].map((p) => (<div key={p} style={{ fontSize: "0.92rem", color: dark ? "#cbd5e1" : "#374151", fontWeight: 500 }}>{p}</div>))}</div>
              <div className="fcp-keywords">{["Laundry Franchise " + cityName, "Dry Cleaning Franchise " + cityName, "Best Business " + cityName, "Low Investment High Returns", "Profitable Franchise Model", "Service Near Me " + cityName].map((k) => (<span className="fcp-keyword" key={k}>{k}</span>))}</div>
            </div>
            <div className="fcp-form-wrap" id="franchise-form">
              {submitted ? (<div className="fcp-success"><div className="fcp-success-icon">🎉</div><div className="fcp-success-title">Enquiry Received!</div><div className="fcp-success-text">Our team will call you within 24 hours for {cityName}. WhatsApp: <strong>+91 91380 04800</strong></div></div>) : (
                <><div className="fcp-form-title">Franchise Enquiry — {cityName}</div>
                <div className="fcp-form-sub">Fill the form to get your FREE franchise brochure & ROI report</div>
                <form className="fcp-form" onSubmit={handleSubmit}>
                  <label>Full Name <span style={{ color: "#e53e3e" }}>*</span></label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                  <label>Phone Number <span style={{ color: "#e53e3e" }}>*</span></label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required />
                  <label>Email Address</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                  <label>Investment Budget</label>
                  <select name="investment" value={form.investment} onChange={handleChange}>
                    <option value="">Select budget range</option>
                    <option value="18-22L">Rs.18-22 Lakhs (Standard)</option>
                    <option value="22-30L">Rs.22-30 Lakhs (Premium)</option>
                    <option value="30-45L">Rs.30-45 Lakhs (Flagship)</option>
                    <option value="45L+">Rs.45+ Lakhs (Multi-Unit)</option>
                  </select>
                  {error ? <p style={{ color: "#e53e3e", fontSize: "0.88rem", marginBottom: "12px" }}>{error}</p> : null}
                  <button type="submit" className="fcp-btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={submitting}>{submitting ? "⏳ Submitting..." : "🚀 Apply for " + cityName + " Franchise"}</button>
                </form></>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="fcp-section">
        <div className="container" style={{ maxWidth: "760px" }}>
          <h2 className="fcp-section-title">FAQs — Cleanz24 Franchise in {cityName}</h2>
          <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              { q: "How much does a Cleanz24 franchise cost in " + cityName + "?", a: "A Cleanz24 franchise in " + cityName + " costs between Rs.18-45 Lakhs depending on store size, including setup, equipment, branding, and training." },
              { q: "Is laundry franchise the best profitable business in " + cityName + "?", a: "Yes! Laundry is a recession-proof business. Cleanz24 franchise delivers 35-45% net profit margins in " + cityName + ". Partners earn Rs.4-15 Lakhs per month." },
              { q: "Where can I find the best dry cleaning service near me in " + cityName + "?", a: "Cleanz24 is the best dry cleaning & laundry service near you in " + cityName + ". Call +91 91380 04800 or WhatsApp for pickup & delivery." },
              { q: "What support does Cleanz24 provide to franchise partners in " + cityName + "?", a: "Full support: site selection, store setup, staff training, technology, marketing & SEO, supply chain, and dedicated franchise manager for " + cityName + "." },
              { q: "What is the ROI timeline for a Cleanz24 franchise in " + cityName + "?", a: "Typical ROI recovery is 18-24 months for standard stores in " + cityName + ". Premium & flagship stores achieve ROI faster." },
            ].map((faq) => (<div key={faq.q} style={{ background: dark ? "#1e293b" : "#f9fafb", border: "1px solid " + (dark ? "#334155" : "#e5e7eb"), borderRadius: "12px", padding: "20px 24px" }}><div style={{ fontWeight: 700, color: dark ? "#f1f5f9" : "#111", marginBottom: "8px", fontSize: "0.95rem" }}>❓ {faq.q}</div><div style={{ color: dark ? "#94a3b8" : "#6b7280", fontSize: "0.9rem", lineHeight: 1.6 }}>{faq.a}</div></div>))}
          </div>
        </div>
      </section>
      <section style={{ background: "linear-gradient(135deg, #15803d, #166534)", padding: "56px 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>Ready to Start Your Cleanz24 Franchise in {cityName}?</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "28px", fontSize: "1rem" }}>Join India's fastest growing laundry & dry cleaning franchise. Best profitable business opportunity in {cityName}.</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#apply-now" className="fcp-btn-primary" style={{ background: "#fff", color: "#16a34a" }}>📋 Apply Now — {cityName}</a>
            <a href="tel:+919138004800" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.7)", borderRadius: "8px", padding: "14px 28px", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>📞 Call +91 91380 04800</a>
          </div>
        </div>
      </section>
    </div>
  );
}
"""
lines.append(component)

with open(TARGET, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))
print("SUCCESS - total lines:", len(lines))
