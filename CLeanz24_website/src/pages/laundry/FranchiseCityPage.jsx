import React, { useState } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import SEOMeta from "../../components/SEOMeta";
import { GOOGLE_SHEETS_LAUNDRY_FRANCHISE_SCRIPT_URL } from "../../config";

export const FRANCHISE_CITIES = [
  { city: "Visakhapatnam", state: "Andhra Pradesh", slug: "visakhapatnam" },
  { city: "Vijayawada", state: "Andhra Pradesh", slug: "vijayawada" },
  { city: "Guntur", state: "Andhra Pradesh", slug: "guntur" },
  { city: "Tirupati", state: "Andhra Pradesh", slug: "tirupati" },
  { city: "Nellore", state: "Andhra Pradesh", slug: "nellore" },
  { city: "Kurnool", state: "Andhra Pradesh", slug: "kurnool" },
  { city: "Rajahmundry", state: "Andhra Pradesh", slug: "rajahmundry" },
  { city: "Kakinada", state: "Andhra Pradesh", slug: "kakinada" },
  { city: "Kadapa", state: "Andhra Pradesh", slug: "kadapa" },
  { city: "Anantapur", state: "Andhra Pradesh", slug: "anantapur" },
  { city: "Vizianagaram", state: "Andhra Pradesh", slug: "vizianagaram" },
  { city: "Eluru", state: "Andhra Pradesh", slug: "eluru" },
  { city: "Ongole", state: "Andhra Pradesh", slug: "ongole" },
  { city: "Machilipatnam", state: "Andhra Pradesh", slug: "machilipatnam" },
  { city: "Tenali", state: "Andhra Pradesh", slug: "tenali" },
  { city: "Proddatur", state: "Andhra Pradesh", slug: "proddatur" },
  { city: "Chittoor", state: "Andhra Pradesh", slug: "chittoor" },
  { city: "Hindupur", state: "Andhra Pradesh", slug: "hindupur" },
  { city: "IB Nagar Visakhapatnam", state: "Andhra Pradesh", slug: "ib-nagar-visakhapatnam" },
  { city: "Guwahati", state: "Assam", slug: "guwahati" },
  { city: "Dibrugarh", state: "Assam", slug: "dibrugarh" },
  { city: "Silchar", state: "Assam", slug: "silchar" },
  { city: "Jorhat", state: "Assam", slug: "jorhat" },
  { city: "Nagaon", state: "Assam", slug: "nagaon" },
  { city: "Tinsukia", state: "Assam", slug: "tinsukia" },
  { city: "Tezpur", state: "Assam", slug: "tezpur" },
  { city: "Bongaigaon", state: "Assam", slug: "bongaigaon" },
  { city: "Dhubri", state: "Assam", slug: "dhubri" },
  { city: "North Lakhimpur", state: "Assam", slug: "north-lakhimpur" },
  { city: "Patna", state: "Bihar", slug: "patna" },
  { city: "Muzaffarpur", state: "Bihar", slug: "muzaffarpur" },
  { city: "Gaya", state: "Bihar", slug: "gaya" },
  { city: "Bhagalpur", state: "Bihar", slug: "bhagalpur" },
  { city: "Darbhanga", state: "Bihar", slug: "darbhanga" },
  { city: "Purnia", state: "Bihar", slug: "purnia" },
  { city: "Arrah", state: "Bihar", slug: "arrah" },
  { city: "Begusarai", state: "Bihar", slug: "begusarai" },
  { city: "Katihar", state: "Bihar", slug: "katihar" },
  { city: "Munger", state: "Bihar", slug: "munger" },
  { city: "Chhapra", state: "Bihar", slug: "chhapra" },
  { city: "Bettiah", state: "Bihar", slug: "bettiah" },
  { city: "Samastipur", state: "Bihar", slug: "samastipur" },
  { city: "Hajipur", state: "Bihar", slug: "hajipur" },
  { city: "Motihari", state: "Bihar", slug: "motihari" },
  { city: "Saharsa", state: "Bihar", slug: "saharsa" },
  { city: "Sasaram", state: "Bihar", slug: "sasaram" },
  { city: "Dehri", state: "Bihar", slug: "dehri" },
  { city: "Siwan", state: "Bihar", slug: "siwan" },
  { city: "Kishanganj", state: "Bihar", slug: "kishanganj" },
  { city: "Raipur", state: "Chhattisgarh", slug: "raipur" },
  { city: "Bhilai", state: "Chhattisgarh", slug: "bhilai" },
  { city: "Bilaspur", state: "Chhattisgarh", slug: "bilaspur-chhattisgarh" },
  { city: "Korba", state: "Chhattisgarh", slug: "korba" },
  { city: "Durg", state: "Chhattisgarh", slug: "durg" },
  { city: "Rajnandgaon", state: "Chhattisgarh", slug: "rajnandgaon" },
  { city: "Arjunda", state: "Chhattisgarh", slug: "arjunda-chhattisgarh" },
  { city: "Jagdalpur", state: "Chhattisgarh", slug: "jagdalpur" },
  { city: "Ambikapur", state: "Chhattisgarh", slug: "ambikapur" },
  { city: "Raigarh", state: "Chhattisgarh", slug: "raigarh" },
  { city: "Dhamtari", state: "Chhattisgarh", slug: "dhamtari" },
  { city: "Mahasamund", state: "Chhattisgarh", slug: "mahasamund" },
  { city: "Delhi", state: "Delhi", slug: "delhi" },
  { city: "New Delhi", state: "Delhi", slug: "new-delhi" },
  { city: "Laxmi Nagar", state: "Delhi", slug: "laxmi-nagar-delhi" },
  { city: "Dwarka", state: "Delhi", slug: "dwarka-delhi" },
  { city: "Rohini", state: "Delhi", slug: "rohini-delhi" },
  { city: "Pitampura", state: "Delhi", slug: "pitampura-delhi" },
  { city: "Janakpuri", state: "Delhi", slug: "janakpuri-delhi" },
  { city: "Saket", state: "Delhi", slug: "saket-delhi" },
  { city: "Vasant Kunj", state: "Delhi", slug: "vasant-kunj-delhi" },
  { city: "Connaught Place", state: "Delhi", slug: "connaught-place-delhi" },
  { city: "Karol Bagh", state: "Delhi", slug: "karol-bagh-delhi" },
  { city: "Lajpat Nagar", state: "Delhi", slug: "lajpat-nagar-delhi" },
  { city: "Shahdara", state: "Delhi", slug: "shahdara-delhi" },
  { city: "Preet Vihar", state: "Delhi", slug: "preet-vihar-delhi" },
  { city: "Mayur Vihar", state: "Delhi", slug: "mayur-vihar-delhi" },
  { city: "Paschim Vihar", state: "Delhi", slug: "paschim-vihar-delhi" },
  { city: "Greater Kailash", state: "Delhi", slug: "greater-kailash-delhi" },
  { city: "Green Park", state: "Delhi", slug: "green-park-delhi" },
  { city: "Hauz Khas", state: "Delhi", slug: "hauz-khas-delhi" },
  { city: "Panaji", state: "Goa", slug: "panaji" },
  { city: "Margao", state: "Goa", slug: "margao" },
  { city: "Vasco da Gama", state: "Goa", slug: "vasco-da-gama" },
  { city: "Mapusa", state: "Goa", slug: "mapusa" },
  { city: "Ponda", state: "Goa", slug: "ponda" },
  { city: "Calangute", state: "Goa", slug: "calangute" },
  { city: "Ahmedabad", state: "Gujarat", slug: "ahmedabad" },
  { city: "Surat", state: "Gujarat", slug: "surat" },
  { city: "Vadodara", state: "Gujarat", slug: "vadodara" },
  { city: "Rajkot", state: "Gujarat", slug: "rajkot" },
  { city: "Bhavnagar", state: "Gujarat", slug: "bhavnagar" },
  { city: "Jamnagar", state: "Gujarat", slug: "jamnagar" },
  { city: "Gandhinagar", state: "Gujarat", slug: "gandhinagar" },
  { city: "Anand", state: "Gujarat", slug: "anand" },
  { city: "Navsari", state: "Gujarat", slug: "navsari" },
  { city: "Junagadh", state: "Gujarat", slug: "junagadh" },
  { city: "Nadiad", state: "Gujarat", slug: "nadiad" },
  { city: "Bharuch", state: "Gujarat", slug: "bharuch" },
  { city: "Porbandar", state: "Gujarat", slug: "porbandar" },
  { city: "Morbi", state: "Gujarat", slug: "morbi" },
  { city: "Surendranagar", state: "Gujarat", slug: "surendranagar" },
  { city: "Vapi", state: "Gujarat", slug: "vapi" },
  { city: "Valsad", state: "Gujarat", slug: "valsad" },
  { city: "Mehsana", state: "Gujarat", slug: "mehsana" },
  { city: "Bhuj", state: "Gujarat", slug: "bhuj" },
  { city: "Veraval", state: "Gujarat", slug: "veraval" },
  { city: "Gurgaon", state: "Haryana", slug: "gurgaon" },
  { city: "Gurugram", state: "Haryana", slug: "gurugram" },
  { city: "Faridabad", state: "Haryana", slug: "faridabad" },
  { city: "Ambala", state: "Haryana", slug: "ambala" },
  { city: "Hisar", state: "Haryana", slug: "hisar" },
  { city: "Rohtak", state: "Haryana", slug: "rohtak" },
  { city: "Karnal", state: "Haryana", slug: "karnal" },
  { city: "Panipat", state: "Haryana", slug: "panipat" },
  { city: "Sonipat", state: "Haryana", slug: "sonipat" },
  { city: "Panchkula", state: "Haryana", slug: "panchkula" },
  { city: "Yamunanagar", state: "Haryana", slug: "yamunanagar" },
  { city: "Kurukshetra", state: "Haryana", slug: "kurukshetra" },
  { city: "Jhajjar", state: "Haryana", slug: "jhajjar" },
  { city: "Rewari", state: "Haryana", slug: "rewari" },
  { city: "Palwal", state: "Haryana", slug: "palwal" },
  { city: "Sirsa", state: "Haryana", slug: "sirsa" },
  { city: "Bahadurgarh", state: "Haryana", slug: "bahadurgarh" },
  { city: "Sec 52 Gurugram", state: "Haryana", slug: "sector-52-gurugram" },
  { city: "Shimla", state: "Himachal Pradesh", slug: "shimla" },
  { city: "Dharamsala", state: "Himachal Pradesh", slug: "dharamsala" },
  { city: "Manali", state: "Himachal Pradesh", slug: "manali" },
  { city: "Una", state: "Himachal Pradesh", slug: "una-himachal" },
  { city: "Solan", state: "Himachal Pradesh", slug: "solan" },
  { city: "Mandi", state: "Himachal Pradesh", slug: "mandi" },
  { city: "Kullu", state: "Himachal Pradesh", slug: "kullu" },
  { city: "Hamirpur", state: "Himachal Pradesh", slug: "hamirpur-himachal" },
  { city: "Bilaspur Himachal", state: "Himachal Pradesh", slug: "bilaspur-himachal" },
  { city: "Ranchi", state: "Jharkhand", slug: "ranchi" },
  { city: "Jamshedpur", state: "Jharkhand", slug: "jamshedpur" },
  { city: "Dhanbad", state: "Jharkhand", slug: "dhanbad" },
  { city: "Bokaro", state: "Jharkhand", slug: "bokaro" },
  { city: "Hazaribagh", state: "Jharkhand", slug: "hazaribagh" },
  { city: "Deoghar", state: "Jharkhand", slug: "deoghar" },
  { city: "Giridih", state: "Jharkhand", slug: "giridih" },
  { city: "Ramgarh", state: "Jharkhand", slug: "ramgarh" },
  { city: "Phusro", state: "Jharkhand", slug: "phusro" },
  { city: "Chirkunda", state: "Jharkhand", slug: "chirkunda" },
  { city: "Bengaluru", state: "Karnataka", slug: "bengaluru" },
  { city: "Bangalore", state: "Karnataka", slug: "bangalore" },
  { city: "Mysuru", state: "Karnataka", slug: "mysuru" },
  { city: "Hubli", state: "Karnataka", slug: "hubli" },
  { city: "Mangalore", state: "Karnataka", slug: "mangalore" },
  { city: "Belagavi", state: "Karnataka", slug: "belagavi" },
  { city: "Kalaburagi", state: "Karnataka", slug: "kalaburagi" },
  { city: "Davanagere", state: "Karnataka", slug: "davanagere" },
  { city: "Tumkur", state: "Karnataka", slug: "tumkur" },
  { city: "Udupi", state: "Karnataka", slug: "udupi" },
  { city: "Koramangala", state: "Karnataka", slug: "koramangala" },
  { city: "Whitefield", state: "Karnataka", slug: "whitefield" },
  { city: "Electronic City", state: "Karnataka", slug: "electronic-city" },
  { city: "HSR Layout", state: "Karnataka", slug: "hsr-layout" },
  { city: "Marathahalli", state: "Karnataka", slug: "marathahalli" },
  { city: "Sarjapur Road", state: "Karnataka", slug: "sarjapur-road" },
  { city: "Padmanabhanagar", state: "Karnataka", slug: "padmanabhanagar-bangalore" },
  { city: "Varthur Hobli", state: "Karnataka", slug: "varthur-hobli-bangalore" },
  { city: "Indiranagar", state: "Karnataka", slug: "indiranagar-bangalore" },
  { city: "Jayanagar", state: "Karnataka", slug: "jayanagar-bangalore" },
  { city: "Malleshwaram", state: "Karnataka", slug: "malleshwaram-bangalore" },
  { city: "Yelahanka", state: "Karnataka", slug: "yelahanka-bangalore" },
  { city: "Banashankari", state: "Karnataka", slug: "banashankari-bangalore" },
  { city: "Bellary", state: "Karnataka", slug: "bellary" },
  { city: "Shimoga", state: "Karnataka", slug: "shimoga" },
  { city: "Bidar", state: "Karnataka", slug: "bidar" },
  { city: "Hospet", state: "Karnataka", slug: "hospet" },
  { city: "Hassan", state: "Karnataka", slug: "hassan" },
  { city: "Thiruvananthapuram", state: "Kerala", slug: "thiruvananthapuram" },
  { city: "Trivandrum", state: "Kerala", slug: "trivandrum" },
  { city: "Kochi", state: "Kerala", slug: "kochi" },
  { city: "Kozhikode", state: "Kerala", slug: "kozhikode" },
  { city: "Thrissur", state: "Kerala", slug: "thrissur" },
  { city: "Kannur", state: "Kerala", slug: "kannur" },
  { city: "Malappuram", state: "Kerala", slug: "malappuram" },
  { city: "Kollam", state: "Kerala", slug: "kollam" },
  { city: "Palakkad", state: "Kerala", slug: "palakkad" },
  { city: "Kottayam", state: "Kerala", slug: "kottayam" },
  { city: "Alappuzha", state: "Kerala", slug: "alappuzha" },
  { city: "Ernakulam", state: "Kerala", slug: "ernakulam" },
  { city: "Cheriyamundam", state: "Kerala", slug: "cheriyamundam-malappuram" },
  { city: "Kazhakkoottam", state: "Kerala", slug: "kazhakkoottam-trivandrum" },
  { city: "Panoor", state: "Kerala", slug: "panoor-kerala" },
  { city: "Parad", state: "Kerala", slug: "parad-kerala" },
  { city: "Parat", state: "Kerala", slug: "parat-kerala" },
  { city: "Vaikom", state: "Kerala", slug: "vaikom-kerala" },
  { city: "Kunnothuparamba", state: "Kerala", slug: "kunnothuparamba" },
  { city: "Manjeri", state: "Kerala", slug: "manjeri" },
  { city: "Thalassery", state: "Kerala", slug: "thalassery" },
  { city: "Kanhangad", state: "Kerala", slug: "kanhangad" },
  { city: "Payyanur", state: "Kerala", slug: "payyanur" },
  { city: "Bhopal", state: "Madhya Pradesh", slug: "bhopal" },
  { city: "Indore", state: "Madhya Pradesh", slug: "indore" },
  { city: "Jabalpur", state: "Madhya Pradesh", slug: "jabalpur" },
  { city: "Gwalior", state: "Madhya Pradesh", slug: "gwalior" },
  { city: "Ujjain", state: "Madhya Pradesh", slug: "ujjain" },
  { city: "Sagar", state: "Madhya Pradesh", slug: "sagar" },
  { city: "Ratlam", state: "Madhya Pradesh", slug: "ratlam" },
  { city: "Satna", state: "Madhya Pradesh", slug: "satna" },
  { city: "Dewas", state: "Madhya Pradesh", slug: "dewas" },
  { city: "Burhanpur", state: "Madhya Pradesh", slug: "burhanpur" },
  { city: "Mandleshwar", state: "Madhya Pradesh", slug: "mandleshwar" },
  { city: "Mandla", state: "Madhya Pradesh", slug: "mandla-madhya-pradesh" },
  { city: "Katni", state: "Madhya Pradesh", slug: "katni" },
  { city: "Rewa", state: "Madhya Pradesh", slug: "rewa" },
  { city: "Singrauli", state: "Madhya Pradesh", slug: "singrauli" },
  { city: "Khandwa", state: "Madhya Pradesh", slug: "khandwa" },
  { city: "Morena", state: "Madhya Pradesh", slug: "morena" },
  { city: "Bhind", state: "Madhya Pradesh", slug: "bhind" },
  { city: "Chhindwara", state: "Madhya Pradesh", slug: "chhindwara" },
  { city: "Guna", state: "Madhya Pradesh", slug: "guna" },
  { city: "Shivpuri", state: "Madhya Pradesh", slug: "shivpuri" },
  { city: "Vidisha", state: "Madhya Pradesh", slug: "vidisha" },
  { city: "Mumbai", state: "Maharashtra", slug: "mumbai" },
  { city: "Pune", state: "Maharashtra", slug: "pune" },
  { city: "Nagpur", state: "Maharashtra", slug: "nagpur" },
  { city: "Nashik", state: "Maharashtra", slug: "nashik" },
  { city: "Aurangabad", state: "Maharashtra", slug: "aurangabad" },
  { city: "Chhatrapati Sambhajinagar", state: "Maharashtra", slug: "chhatrapati-sambhajinagar" },
  { city: "Solapur", state: "Maharashtra", slug: "solapur" },
  { city: "Thane", state: "Maharashtra", slug: "thane" },
  { city: "Navi Mumbai", state: "Maharashtra", slug: "navi-mumbai" },
  { city: "Kolhapur", state: "Maharashtra", slug: "kolhapur" },
  { city: "Amravati", state: "Maharashtra", slug: "amravati" },
  { city: "Akola", state: "Maharashtra", slug: "akola" },
  { city: "Jalgaon", state: "Maharashtra", slug: "jalgaon" },
  { city: "Sangli", state: "Maharashtra", slug: "sangli" },
  { city: "Latur", state: "Maharashtra", slug: "latur" },
  { city: "Bandra", state: "Maharashtra", slug: "bandra-mumbai" },
  { city: "Andheri", state: "Maharashtra", slug: "andheri-mumbai" },
  { city: "Borivali", state: "Maharashtra", slug: "borivali-mumbai" },
  { city: "Mulund", state: "Maharashtra", slug: "mulund-mumbai" },
  { city: "Wakad", state: "Maharashtra", slug: "wakad-pune" },
  { city: "Baner", state: "Maharashtra", slug: "baner-pune" },
  { city: "Kothrud", state: "Maharashtra", slug: "kothrud-pune" },
  { city: "Hinjewadi", state: "Maharashtra", slug: "hinjewadi-pune" },
  { city: "Aundh", state: "Maharashtra", slug: "aundh-pune" },
  { city: "Wagholi", state: "Maharashtra", slug: "wagholi-pune" },
  { city: "Hadapsar", state: "Maharashtra", slug: "hadapsar-pune" },
  { city: "Viman Nagar", state: "Maharashtra", slug: "viman-nagar-pune" },
  { city: "Pimpri-Chinchwad", state: "Maharashtra", slug: "pimpri-chinchwad" },
  { city: "Ravet", state: "Maharashtra", slug: "ravet-pune" },
  { city: "Thane West", state: "Maharashtra", slug: "thane-west" },
  { city: "Alibag", state: "Maharashtra", slug: "alibag-maharashtra" },
  { city: "Nanded", state: "Maharashtra", slug: "nanded" },
  { city: "Dhule", state: "Maharashtra", slug: "dhule" },
  { city: "Ahmednagar", state: "Maharashtra", slug: "ahmednagar" },
  { city: "Chandrapur", state: "Maharashtra", slug: "chandrapur" },
  { city: "Parbhani", state: "Maharashtra", slug: "parbhani" },
  { city: "Ichalkaranji", state: "Maharashtra", slug: "ichalkaranji" },
  { city: "Jalna", state: "Maharashtra", slug: "jalna" },
  { city: "Panvel", state: "Maharashtra", slug: "panvel" },
  { city: "Vasai-Virar", state: "Maharashtra", slug: "vasai-virar" },
  { city: "Kalyan-Dombivli", state: "Maharashtra", slug: "kalyan-dombivli" },
  { city: "Imphal", state: "Manipur", slug: "imphal" },
  { city: "Churachandpur", state: "Manipur", slug: "churachandpur" },
  { city: "Thoubal", state: "Manipur", slug: "thoubal" },
  { city: "Shillong", state: "Meghalaya", slug: "shillong" },
  { city: "Tura", state: "Meghalaya", slug: "tura" },
  { city: "Aizawl", state: "Mizoram", slug: "aizawl" },
  { city: "Lunglei", state: "Mizoram", slug: "lunglei" },
  { city: "Kohima", state: "Nagaland", slug: "kohima" },
  { city: "Dimapur", state: "Nagaland", slug: "dimapur" },
  { city: "Bhubaneswar", state: "Odisha", slug: "bhubaneswar" },
  { city: "Cuttack", state: "Odisha", slug: "cuttack" },
  { city: "Rourkela", state: "Odisha", slug: "rourkela" },
  { city: "Sambalpur", state: "Odisha", slug: "sambalpur" },
  { city: "Berhampur", state: "Odisha", slug: "berhampur" },
  { city: "Puri", state: "Odisha", slug: "puri" },
  { city: "Palasuni Bhubaneswar", state: "Odisha", slug: "palasuni-bhubaneswar" },
  { city: "Chandrasekharpur Bhubaneswar", state: "Odisha", slug: "chandrasekharpur-bhubaneswar" },
  { city: "Angul", state: "Odisha", slug: "angul-odisha" },
  { city: "Jeypore", state: "Odisha", slug: "jeypore-odisha" },
  { city: "Old Town Bhubaneswar", state: "Odisha", slug: "old-town-bhubaneswar" },
  { city: "Jatni Khordha", state: "Odisha", slug: "jatni-khordha" },
  { city: "CDA Cuttack", state: "Odisha", slug: "cda-cuttack" },
  { city: "Balasore", state: "Odisha", slug: "balasore" },
  { city: "Bhadrak", state: "Odisha", slug: "bhadrak" },
  { city: "Baripada", state: "Odisha", slug: "baripada" },
  { city: "Jharsuguda", state: "Odisha", slug: "jharsuguda" },
  { city: "Bargarh", state: "Odisha", slug: "bargarh" },
  { city: "Ludhiana", state: "Punjab", slug: "ludhiana" },
  { city: "Amritsar", state: "Punjab", slug: "amritsar" },
  { city: "Jalandhar", state: "Punjab", slug: "jalandhar" },
  { city: "Patiala", state: "Punjab", slug: "patiala" },
  { city: "Mohali", state: "Punjab", slug: "mohali" },
  { city: "Bathinda", state: "Punjab", slug: "bathinda" },
  { city: "Pathankot", state: "Punjab", slug: "pathankot" },
  { city: "Kharar", state: "Punjab", slug: "kharar-punjab" },
  { city: "Hoshiarpur", state: "Punjab", slug: "hoshiarpur" },
  { city: "Batala", state: "Punjab", slug: "batala" },
  { city: "Moga", state: "Punjab", slug: "moga" },
  { city: "Abohar", state: "Punjab", slug: "abohar" },
  { city: "Khanna", state: "Punjab", slug: "khanna" },
  { city: "Phagwara", state: "Punjab", slug: "phagwara" },
  { city: "Firozpur", state: "Punjab", slug: "firozpur" },
  { city: "Jaipur", state: "Rajasthan", slug: "jaipur" },
  { city: "Jodhpur", state: "Rajasthan", slug: "jodhpur" },
  { city: "Kota", state: "Rajasthan", slug: "kota" },
  { city: "Bikaner", state: "Rajasthan", slug: "bikaner" },
  { city: "Ajmer", state: "Rajasthan", slug: "ajmer" },
  { city: "Udaipur", state: "Rajasthan", slug: "udaipur" },
  { city: "Alwar", state: "Rajasthan", slug: "alwar" },
  { city: "Sikar", state: "Rajasthan", slug: "sikar" },
  { city: "Bharatpur", state: "Rajasthan", slug: "bharatpur" },
  { city: "Bhilwara", state: "Rajasthan", slug: "bhilwara" },
  { city: "Churu", state: "Rajasthan", slug: "churu-rajasthan" },
  { city: "Sanchore", state: "Rajasthan", slug: "sanchore-rajasthan" },
  { city: "Pali", state: "Rajasthan", slug: "pali-rajasthan" },
  { city: "Sri Ganganagar", state: "Rajasthan", slug: "sri-ganganagar" },
  { city: "Jhunjhunu", state: "Rajasthan", slug: "jhunjhunu" },
  { city: "Hanumangarh", state: "Rajasthan", slug: "hanumangarh" },
  { city: "Beawar", state: "Rajasthan", slug: "beawar" },
  { city: "Tonk", state: "Rajasthan", slug: "tonk" },
  { city: "Kishangarh", state: "Rajasthan", slug: "kishangarh" },
  { city: "Gangtok", state: "Sikkim", slug: "gangtok" },
  { city: "Agartala", state: "Tripura", slug: "agartala" },
  { city: "Dharmanagar", state: "Tripura", slug: "dharmanagar" },
  { city: "Chennai", state: "Tamil Nadu", slug: "chennai" },
  { city: "Coimbatore", state: "Tamil Nadu", slug: "coimbatore" },
  { city: "Madurai", state: "Tamil Nadu", slug: "madurai" },
  { city: "Tiruchirappalli", state: "Tamil Nadu", slug: "tiruchirappalli" },
  { city: "Salem", state: "Tamil Nadu", slug: "salem" },
  { city: "Tirunelveli", state: "Tamil Nadu", slug: "tirunelveli" },
  { city: "Erode", state: "Tamil Nadu", slug: "erode" },
  { city: "Vellore", state: "Tamil Nadu", slug: "vellore" },
  { city: "Tiruppur", state: "Tamil Nadu", slug: "tiruppur" },
  { city: "Thoothukudi", state: "Tamil Nadu", slug: "thoothukudi" },
  { city: "OMR Chennai", state: "Tamil Nadu", slug: "omr-chennai" },
  { city: "Velachery", state: "Tamil Nadu", slug: "velachery-chennai" },
  { city: "Anna Nagar", state: "Tamil Nadu", slug: "anna-nagar-chennai" },
  { city: "Adyar", state: "Tamil Nadu", slug: "adyar-chennai" },
  { city: "T Nagar", state: "Tamil Nadu", slug: "t-nagar-chennai" },
  { city: "Alandur", state: "Tamil Nadu", slug: "alandur-chennai" },
  { city: "Kalaiyarkovil", state: "Tamil Nadu", slug: "kalaiyarkovil" },
  { city: "Karungal", state: "Tamil Nadu", slug: "karungal" },
  { city: "Nagercoil", state: "Tamil Nadu", slug: "nagercoil" },
  { city: "Thanjavur", state: "Tamil Nadu", slug: "thanjavur" },
  { city: "Dindigul", state: "Tamil Nadu", slug: "dindigul" },
  { city: "Kanchipuram", state: "Tamil Nadu", slug: "kanchipuram" },
  { city: "Cuddalore", state: "Tamil Nadu", slug: "cuddalore" },
  { city: "Kumbakonam", state: "Tamil Nadu", slug: "kumbakonam" },
  { city: "Hyderabad", state: "Telangana", slug: "hyderabad" },
  { city: "Warangal", state: "Telangana", slug: "warangal" },
  { city: "Khammam", state: "Telangana", slug: "khammam" },
  { city: "Nizamabad", state: "Telangana", slug: "nizamabad" },
  { city: "Karimnagar", state: "Telangana", slug: "karimnagar" },
  { city: "Secunderabad", state: "Telangana", slug: "secunderabad" },
  { city: "Madhapur", state: "Telangana", slug: "madhapur-hyderabad" },
  { city: "Gachibowli", state: "Telangana", slug: "gachibowli-hyderabad" },
  { city: "Kondapur", state: "Telangana", slug: "kondapur-hyderabad" },
  { city: "HITEC City", state: "Telangana", slug: "hitec-city-hyderabad" },
  { city: "Kukatpally", state: "Telangana", slug: "kukatpally-hyderabad" },
  { city: "Banjara Hills", state: "Telangana", slug: "banjara-hills-hyderabad" },
  { city: "Jubilee Hills", state: "Telangana", slug: "jubilee-hills-hyderabad" },
  { city: "Kokapet", state: "Telangana", slug: "kokapet-hyderabad" },
  { city: "Gopanpally", state: "Telangana", slug: "gopanpally-hyderabad" },
  { city: "Narsingi", state: "Telangana", slug: "narsingi-hyderabad" },
  { city: "Beeramguda", state: "Telangana", slug: "beeramguda-hyderabad" },
  { city: "Tellapur", state: "Telangana", slug: "tellapur-hyderabad" },
  { city: "Vanasthalipuram", state: "Telangana", slug: "vanasthalipuram-hyderabad" },
  { city: "Ramagundam", state: "Telangana", slug: "ramagundam" },
  { city: "Mahbubnagar", state: "Telangana", slug: "mahbubnagar" },
  { city: "Nalgonda", state: "Telangana", slug: "nalgonda" },
  { city: "Adilabad", state: "Telangana", slug: "adilabad" },
  { city: "Lucknow", state: "Uttar Pradesh", slug: "lucknow" },
  { city: "Kanpur", state: "Uttar Pradesh", slug: "kanpur" },
  { city: "Agra", state: "Uttar Pradesh", slug: "agra" },
  { city: "Varanasi", state: "Uttar Pradesh", slug: "varanasi" },
  { city: "Prayagraj", state: "Uttar Pradesh", slug: "prayagraj" },
  { city: "Allahabad", state: "Uttar Pradesh", slug: "allahabad" },
  { city: "Meerut", state: "Uttar Pradesh", slug: "meerut" },
  { city: "Bareilly", state: "Uttar Pradesh", slug: "bareilly" },
  { city: "Aligarh", state: "Uttar Pradesh", slug: "aligarh" },
  { city: "Moradabad", state: "Uttar Pradesh", slug: "moradabad" },
  { city: "Gorakhpur", state: "Uttar Pradesh", slug: "gorakhpur" },
  { city: "Saharanpur", state: "Uttar Pradesh", slug: "saharanpur" },
  { city: "Mathura", state: "Uttar Pradesh", slug: "mathura" },
  { city: "Jhansi", state: "Uttar Pradesh", slug: "jhansi" },
  { city: "Muzaffarnagar", state: "Uttar Pradesh", slug: "muzaffarnagar" },
  { city: "Hapur", state: "Uttar Pradesh", slug: "hapur" },
  { city: "Ayodhya", state: "Uttar Pradesh", slug: "ayodhya" },
  { city: "Indirapuram", state: "Uttar Pradesh", slug: "indirapuram" },
  { city: "Noida Extension", state: "Uttar Pradesh", slug: "noida-extension" },
  { city: "Greater Noida", state: "Uttar Pradesh", slug: "greater-noida" },
  { city: "Greater Noida West", state: "Uttar Pradesh", slug: "greater-noida-west" },
  { city: "Noida", state: "Uttar Pradesh", slug: "noida" },
  { city: "Ghaziabad", state: "Uttar Pradesh", slug: "ghaziabad" },
  { city: "Sector 62 Noida", state: "Uttar Pradesh", slug: "sector-62-noida" },
  { city: "Swarn Nagari", state: "Uttar Pradesh", slug: "swarn-nagari-greater-noida" },
  { city: "Raj Nagar Extension", state: "Uttar Pradesh", slug: "raj-nagar-extension" },
  { city: "Vaishali", state: "Uttar Pradesh", slug: "vaishali-ghaziabad" },
  { city: "Bhinga", state: "Uttar Pradesh", slug: "bhinga-uttar-pradesh" },
  { city: "Firozabad", state: "Uttar Pradesh", slug: "firozabad" },
  { city: "Rampur", state: "Uttar Pradesh", slug: "rampur" },
  { city: "Shahjahanpur", state: "Uttar Pradesh", slug: "shahjahanpur" },
  { city: "Bulandshahr", state: "Uttar Pradesh", slug: "bulandshahr" },
  { city: "Farrukhabad", state: "Uttar Pradesh", slug: "farrukhabad" },
  { city: "Budaun", state: "Uttar Pradesh", slug: "budaun" },
  { city: "Sambhal", state: "Uttar Pradesh", slug: "sambhal" },
  { city: "Amroha", state: "Uttar Pradesh", slug: "amroha" },
  { city: "Hardoi", state: "Uttar Pradesh", slug: "hardoi" },
  { city: "Fatehpur", state: "Uttar Pradesh", slug: "fatehpur" },
  { city: "Raebareli", state: "Uttar Pradesh", slug: "raebareli" },
  { city: "Orai", state: "Uttar Pradesh", slug: "orai" },
  { city: "Sitapur", state: "Uttar Pradesh", slug: "sitapur" },
  { city: "Bahraich", state: "Uttar Pradesh", slug: "bahraich" },
  { city: "Unnao", state: "Uttar Pradesh", slug: "unnao" },
  { city: "Jaunpur", state: "Uttar Pradesh", slug: "jaunpur" },
  { city: "Lakhimpur", state: "Uttar Pradesh", slug: "lakhimpur" },
  { city: "Hathras", state: "Uttar Pradesh", slug: "hathras" },
  { city: "Banda", state: "Uttar Pradesh", slug: "banda" },
  { city: "Dehradun", state: "Uttarakhand", slug: "dehradun" },
  { city: "Haridwar", state: "Uttarakhand", slug: "haridwar" },
  { city: "Roorkee", state: "Uttarakhand", slug: "roorkee" },
  { city: "Nainital", state: "Uttarakhand", slug: "nainital" },
  { city: "Haldwani", state: "Uttarakhand", slug: "haldwani" },
  { city: "Rishikesh", state: "Uttarakhand", slug: "rishikesh" },
  { city: "Srinagar Garhwal", state: "Uttarakhand", slug: "srinagar-garhwal" },
  { city: "Karnaprayag", state: "Uttarakhand", slug: "karnaprayag" },
  { city: "Kashipur", state: "Uttarakhand", slug: "kashipur" },
  { city: "Rudrapur", state: "Uttarakhand", slug: "rudrapur" },
  { city: "Almora", state: "Uttarakhand", slug: "almora" },
  { city: "Pithoragarh", state: "Uttarakhand", slug: "pithoragarh" },
  { city: "Kolkata", state: "West Bengal", slug: "kolkata" },
  { city: "Howrah", state: "West Bengal", slug: "howrah" },
  { city: "Durgapur", state: "West Bengal", slug: "durgapur" },
  { city: "Asansol", state: "West Bengal", slug: "asansol" },
  { city: "Siliguri", state: "West Bengal", slug: "siliguri" },
  { city: "Bardhaman", state: "West Bengal", slug: "bardhaman" },
  { city: "Malda", state: "West Bengal", slug: "malda" },
  { city: "Haldia", state: "West Bengal", slug: "haldia" },
  { city: "Kharagpur", state: "West Bengal", slug: "kharagpur" },
  { city: "Shantipur", state: "West Bengal", slug: "shantipur" },
  { city: "Dankuni", state: "West Bengal", slug: "dankuni" },
  { city: "Dhulian", state: "West Bengal", slug: "dhulian" },
  { city: "Ranaghat", state: "West Bengal", slug: "ranaghat" },
  { city: "Berhampore", state: "West Bengal", slug: "berhampore" },
  { city: "Jalpaiguri", state: "West Bengal", slug: "jalpaiguri" },
  { city: "Balurghat", state: "West Bengal", slug: "balurghat" },
  { city: "Bankura", state: "West Bengal", slug: "bankura" },
  { city: "Purulia", state: "West Bengal", slug: "purulia" },
  { city: "Chandigarh", state: "Chandigarh", slug: "chandigarh" },
  { city: "Puducherry", state: "Puducherry", slug: "puducherry" },
  { city: "Mahe", state: "Puducherry", slug: "mahe-puducherry" },
  { city: "Karaikal", state: "Puducherry", slug: "karaikal" },
  { city: "Srinagar", state: "Jammu & Kashmir", slug: "srinagar" },
  { city: "Jammu", state: "Jammu & Kashmir", slug: "jammu" },
  { city: "Anantnag", state: "Jammu & Kashmir", slug: "anantnag" },
  { city: "Baramulla", state: "Jammu & Kashmir", slug: "baramulla" },
  { city: "Udhampur", state: "Jammu & Kashmir", slug: "udhampur" },
  { city: "Leh", state: "Ladakh", slug: "leh" },
  { city: "Kargil", state: "Ladakh", slug: "kargil" },
  { city: "Port Blair", state: "Andaman & Nicobar", slug: "port-blair" },
  { city: "Silvassa", state: "Dadra & Nagar Haveli", slug: "silvassa" },
  { city: "Daman", state: "Daman & Diu", slug: "daman" },
  { city: "Diu", state: "Daman & Diu", slug: "diu" },
];

const HIGH_VALUE_KEYWORDS = [
  "best laundry franchise opportunity",
  "most profitable business model",
  "profitable franchise in India",
  "low investment high return franchise",
  "laundry franchise business",
  "dry cleaning franchise",
  "laundry service near me",
  "best franchise business to start",
  "profitable business ideas",
  "laundry and dry cleaning service",
  "premium laundry franchise",
  "franchise opportunity India",
  "best business with low investment",
  "laundry startup opportunity",
];

const STATS = [
  { value: "100+", label: "Active Stores" },
  { value: "21", label: "States Covered" },
  { value: "35-45%", label: "Profit Margin" },
  { value: "18-20 mo", label: "ROI Recovery" },
];

const WHY_CLEANZ24 = [
  { icon: "📈", title: "Most Profitable Business Model", desc: "Cleanz24 franchise delivers 35-45% net margins — one of the highest in the service franchise sector. Proven across 100+ stores." },
  { icon: "🏆", title: "Best Laundry Franchise Opportunity", desc: "India's premium laundry & dry cleaning franchise. 5-star rated, tech-enabled, and built for rapid scale." },
  { icon: "💰", title: "Low Investment, High Return", desc: "Start with just ₹13 Lacs+. Get complete store setup, branding, training, supply chain, and digital marketing from Day 1." },
  { icon: "🤝", title: "Complete Business Support", desc: "From site selection to daily operations, our franchise team is with you. No experience required." },
  { icon: "🌐", title: "Digital & SEO Marketing Included", desc: "Every franchise gets a dedicated local Google listing, social media handle, and city page on Cleanz24.com." },
  { icon: "📦", title: "Proven & Scalable Franchise Model", desc: "Replicate our proven business system. Multi-unit options available. Partners earning ₹2-5 Lakh per month." },
];

const SERVICES = [
  { icon: "👕", name: "Wash & Fold", desc: "Best-in-class clothes washing with premium detergents" },
  { icon: "🥼", name: "Dry Cleaning", desc: "Expert dry cleaning for delicate fabrics, suits & sarees" },
  { icon: "♨", name: "Steam Ironing", desc: "Professional steam pressing for crisp, wrinkle-free clothes" },
  { icon: "👟", name: "Shoe Cleaning", desc: "Premium sneaker & leather shoe spa & restoration" },
  { icon: "👜", name: "Bag Cleaning", desc: "Luxury leather bag & handbag cleaning service" },
  { icon: "🛋", name: "Sofa & Carpet", desc: "Deep cleaning for sofas, carpets & curtains at home" },
];

const INVESTMENT = [
  { tier: "ALPHA MODEL", investment: "₹13 Lacs+", area: "250 Sq.Ft (Minimum)", revenue: "₹1 Lakh/Month+", roi: "18-20 Months", badge: "Starter" },
  { tier: "BETA MODEL", investment: "₹15 Lacs+", area: "250 Sq.Ft (Minimum)", revenue: "₹1.5 Lacs/Month+", roi: "18-20 Months", badge: "Most Popular" },
  { tier: "COMBO MODEL", investment: "₹22 Lacs+", area: "400 Sq.Ft (Minimum)", revenue: "₹2 Lacs/Month+", roi: "18-20 Months", badge: "Commercial Combo" },
  { tier: "HYDRO-CARBON MODEL", investment: "₹29 Lacs+", area: "500 Sq.Ft (Minimum)", revenue: "₹2.5 Lacs/Month+", roi: "18-20 Months", badge: "Premium Dry-Clean" },
];

const PAGE_CSS = (dark) => `
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
  .fcp-invest-cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:24px; margin-top:40px; }
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

export default function FranchiseCityPage() {
  const { citySlug } = useParams();
  const ctx = (typeof useOutletContext === "function" ? useOutletContext() : null) || {};
  const dark = ctx.darkMode ?? false;
  const cityData = FRANCHISE_CITIES.find((c) => c.slug === citySlug);
  const cityName = cityData ? cityData.city : "Your City";
  const stateName = cityData ? cityData.state : "India";

  const [form, setForm] = useState({ name: "", phone: "", email: "", model: "ALPHA MODEL" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");

    try {
      const dateStr = new Date().toISOString().split("T")[0];
      const payload = {
        date: dateStr, Date: dateStr, timestamp: dateStr, Timestamp: dateStr,
        name: form.name, Name: form.name,
        mobile: "'+91 " + form.phone, phone: "'+91 " + form.phone, Phone: "'+91 " + form.phone, Mobile: "'+91 " + form.phone,
        email: form.email, Email: form.email,
        city: cityName, City: cityName, Location: cityName,
        modelType: form.model + " (Franchise City Page)", Model: form.model, Investment: form.model,
        source: "Franchise City Page - " + cityName, Source: "Franchise City Page - " + cityName
      };

      await fetch("https://script.google.com/macros/s/AKfycbwgrxbbzmaqU8BT-l7xFSriJ-BNM01ad5Qo66ZOfR-XBF4ag9h1u1ErJcAN4J7LcM4p/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload)
      });

      if (typeof window !== "undefined") {
        if (typeof window.gtag === "function") {
          window.gtag("event", "conversion", { send_to: "AW-16562330559/Ly9XCOC_iLQaEL-3xNk9" });
          window.gtag("event", "laundry_franchise_lead", { event_category: "Franchise", event_label: "Franchise City Page Submission - " + cityName });
        }
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting city franchise form:", err);
      // Even in no-cors or network glitch, show success to user
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const canonicalUrl = "https://cleanz24.com/laundry/franchise/" + citySlug;
  const pageTitle = "Best Laundry & Dry Cleaning Franchise in " + cityName + " | Cleanz24";
  const pageDesc = "Start the most profitable laundry & dry cleaning franchise in " + cityName + ", " + stateName + ". Investment starting ₹13 Lacs+, high profit margins, 100+ stores network. Enquire now!";
  const pageKeywords = ["laundry franchise in " + cityName, "dry cleaning franchise " + cityName, "best franchise opportunity in " + cityName, "profitable business in " + cityName, "laundry service near me " + cityName, "best laundry service " + cityName, "dry cleaning service near me " + cityName, "best business model " + cityName, "low investment franchise " + cityName, "Cleanz24 franchise " + cityName, ...HIGH_VALUE_KEYWORDS].join(", ");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "LocalBusiness", name: "Cleanz24 Laundry & Dry Cleaning - " + cityName, description: pageDesc, url: canonicalUrl, telephone: "+919138004800", address: { "@type": "PostalAddress", addressLocality: cityName, addressRegion: stateName, addressCountry: "IN" }, priceRange: "₹₹", aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "500" } },
      { "@type": "FAQPage", mainEntity: [
        { "@type": "Question", name: "How much does a Cleanz24 franchise cost in " + cityName + "?", acceptedAnswer: { "@type": "Answer", text: "A Cleanz24 franchise in " + cityName + " starts at ₹13 Lacs+ for the Alpha Model, ₹15 Lacs+ for Beta Model, ₹22 Lacs+ for Combo Model, and ₹29 Lacs+ for Hydro-Carbon Model." } },
        { "@type": "Question", name: "Is laundry franchise the best profitable business in " + cityName + "?", acceptedAnswer: { "@type": "Answer", text: "Yes! Cleanz24 franchise delivers 35-45% net profit margins in " + cityName + ". Franchise partners earn ₹1-2.5 Lacs+ per month with full brand & CRM support." } },
        { "@type": "Question", name: "What is the best franchise opportunity in " + cityName + "?", acceptedAnswer: { "@type": "Answer", text: "Cleanz24 is India's leading laundry & dry cleaning franchise with 100+ stores across 21 states. Proven ROI in 18-20 months." } },
        { "@type": "Question", name: "Where can I find the best dry cleaning service near me in " + cityName + "?", acceptedAnswer: { "@type": "Answer", text: "Cleanz24 is the best laundry & dry cleaning service near you in " + cityName + ". Call +91 91380 04800 for store details & franchise opportunities." } },
      ]},
    ],
  };

  const waLink = "https://wa.me/919138004800?text=Hi%20I%20want%20to%20know%20about%20Cleanz24%20franchise%20in%20" + encodeURIComponent(cityName);

  return (
    <div className="fcp-page">
      <style>{PAGE_CSS(dark)}</style>
      <SEOMeta title={pageTitle} description={pageDesc} keywords={pageKeywords} canonical={canonicalUrl} schema={schema} />

      {/* HERO */}
      <section className="fcp-hero">
        <div className="container">
          <nav className="fcp-breadcrumb" aria-label="breadcrumb">
            <Link to="/laundry">Home</Link><span>›</span>
            <Link to="/laundry/franchise">Franchise</Link><span>›</span>
            <span>{cityName}</span>
          </nav>
          <span className="fcp-badge">🚀 100+ Stores Network — Franchise in {cityName}</span>
          <h1 className="fcp-city-name">Best Laundry & Dry Cleaning<br /><span className="fcp-city-highlight">Franchise in {cityName}</span></h1>
          <p className="fcp-hero-sub">Join India's most profitable laundry franchise network (100+ Stores) in <strong>{cityName}, {stateName}</strong>. Investment starting ₹13 Lacs+ · High returns · Full support · 18-20 Mo ROI.</p>
          <div className="fcp-hero-btns">
            <a href="#apply-now" className="fcp-btn-primary">📋 Apply for Franchise</a>
            <a href={waLink} target="_blank" rel="noreferrer" className="fcp-btn-secondary">💬 WhatsApp Us</a>
          </div>
          <div className="fcp-stats">{STATS.map((s) => (<div className="fcp-stat" key={s.label}><div className="fcp-stat-val">{s.value}</div><div className="fcp-stat-label">{s.label}</div></div>))}</div>
        </div>
      </section>

      {/* WHY CLEANZ24 */}
      <section className="fcp-section">
        <div className="container">
          <h2 className="fcp-section-title">Why Cleanz24 is the <span style={{ color: dark ? "#4ade80" : "#16a34a" }}>Best Franchise in {cityName}</span>?</h2>
          <p className="fcp-section-sub">Best profitable business model · Most successful franchise idea · High retention business opportunity</p>
          <div className="fcp-cards">{WHY_CLEANZ24.map((c) => (<div className="fcp-card" key={c.title}><div className="fcp-card-icon">{c.icon}</div><div className="fcp-card-title">{c.title}</div><div className="fcp-card-desc">{c.desc}</div></div>))}</div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="fcp-section fcp-section-alt">
        <div className="container">
          <h2 className="fcp-section-title">Best Laundry & Dry Cleaning Services Near You in {cityName}</h2>
          <p className="fcp-section-sub">Your franchise store will offer all premium laundry, dry cleaning & car spa services in {cityName}</p>
          <div className="fcp-service-cards">{SERVICES.map((s) => (<div className="fcp-service-card" key={s.name}><div className="fcp-service-icon">{s.icon}</div><div className="fcp-service-name">{s.name}</div><div className="fcp-service-desc">{s.desc}</div></div>))}</div>
        </div>
      </section>

      {/* INVESTMENT MODELS - EXACT MATCH WITH MAIN FRANCHISE PAGE */}
      <section className="fcp-section">
        <div className="container">
          <h2 className="fcp-section-title">Franchise Models & Investment in {cityName}</h2>
          <p className="fcp-section-sub">Exact investment models & pricing structure for opening a store in {cityName}</p>
          <div className="fcp-invest-cards">
            {INVESTMENT.map((inv) => (
              <div className={"fcp-invest-card" + (inv.badge === "Most Popular" ? " popular" : "")} key={inv.tier}>
                {inv.badge ? <span className="fcp-invest-badge">{inv.badge}</span> : null}
                <div className="fcp-invest-tier">{inv.tier}</div>
                <div className="fcp-invest-amount">{inv.investment}</div>
                <div className="fcp-invest-row"><span className="fcp-invest-label">Area Required</span><span className="fcp-invest-val">{inv.area}</span></div>
                <div className="fcp-invest-row"><span className="fcp-invest-label">Net Profit</span><span className="fcp-invest-val">{inv.revenue}</span></div>
                <div className="fcp-invest-row"><span className="fcp-invest-label">ROI Recovery</span><span className="fcp-invest-val">{inv.roi}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM & APPLY */}
      <section className="fcp-section fcp-section-alt" id="apply-now">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", alignItems: "flex-start" }}>
            <div>
              <h2 className="fcp-section-title">Start Your <span style={{ color: dark ? "#4ade80" : "#16a34a" }}>Franchise in {cityName}</span> Today</h2>
              <p style={{ color: dark ? "#94a3b8" : "#6b7280", fontSize: "1rem", lineHeight: 1.7, marginBottom: "24px" }}>Take the first step towards owning the most profitable business in {cityName}. Our team will call you within 24 hours with a complete franchise kit.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>{["✅ Free franchise consultation call", "✅ Detailed ROI & profit model", "✅ Site selection & store setup support", "✅ Complete staff training & marketing kit", "✅ Exclusive area rights in " + cityName].map((p) => (<div key={p} style={{ fontSize: "0.92rem", color: dark ? "#cbd5e1" : "#374151", fontWeight: 500 }}>{p}</div>))}</div>
              <div className="fcp-keywords">{["Laundry Franchise " + cityName, "Dry Cleaning Franchise " + cityName, "Best Business " + cityName, "Low Investment High Returns", "Profitable Franchise Model", "Service Near Me " + cityName].map((k) => (<span className="fcp-keyword" key={k}>{k}</span>))}</div>
            </div>

            <div className="fcp-form-wrap" id="franchise-form">
              {submitted ? (
                <div className="fcp-success">
                  <div className="fcp-success-icon">🎉</div>
                  <div className="fcp-success-title">Enquiry Received!</div>
                  <div className="fcp-success-text">
                    Thank you! Our franchise team will call you within 24 hours regarding your enquiry for <strong>{cityName}</strong>.<br /><br />
                    You can also WhatsApp us directly at <strong>+91 91380 04800</strong>.
                  </div>
                </div>
              ) : (
                <>
                  <div className="fcp-form-title">Franchise Enquiry — {cityName}</div>
                  <div className="fcp-form-sub">Fill the form to get your FREE franchise brochure & ROI report for {cityName}</div>
                  <form className="fcp-form" onSubmit={handleSubmit}>
                    <label>Full Name <span style={{ color: "#e53e3e" }}>*</span></label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />

                    <label>Phone Number <span style={{ color: "#e53e3e" }}>*</span></label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" required />

                    <label>Email Address</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />

                    <label>Select Franchise Model</label>
                    <select name="model" value={form.model} onChange={handleChange}>
                      <option value="ALPHA MODEL">ALPHA MODEL — ₹13 Lacs+ (Starter)</option>
                      <option value="BETA MODEL">BETA MODEL — ₹15 Lacs+ (Most Popular)</option>
                      <option value="COMBO MODEL">COMBO MODEL — ₹22 Lacs+ (Commercial)</option>
                      <option value="HYDRO-CARBON MODEL">HYDRO-CARBON MODEL — ₹29 Lacs+ (Premium)</option>
                    </select>

                    {error ? <p style={{ color: "#e53e3e", fontSize: "0.88rem", marginBottom: "12px" }}>{error}</p> : null}

                    <button type="submit" className="fcp-btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={submitting}>
                      {submitting ? "⏳ Submitting..." : "🚀 Apply for " + cityName + " Franchise"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="fcp-section">
        <div className="container" style={{ maxWidth: "760px" }}>
          <h2 className="fcp-section-title">FAQs — Cleanz24 Franchise in {cityName}</h2>
          <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              { q: "How much does a Cleanz24 franchise cost in " + cityName + "?", a: "A Cleanz24 franchise in " + cityName + " starts at ₹13 Lacs+ for Alpha Model, ₹15 Lacs+ for Beta Model, ₹22 Lacs+ for Combo Model, and ₹29 Lacs+ for Hydro-Carbon Model." },
              { q: "Is laundry franchise the best profitable business in " + cityName + "?", a: "Yes! Laundry is a recession-proof business. Cleanz24 franchise delivers 35-45% net profit margins in " + cityName + ". Partners earn ₹1-2.5 Lacs+ per month." },
              { q: "Where can I find the best dry cleaning service near me in " + cityName + "?", a: "Cleanz24 is the best dry cleaning & laundry service near you in " + cityName + ". Call +91 91380 04800 or WhatsApp for store details." },
              { q: "What support does Cleanz24 provide to franchise partners in " + cityName + "?", a: "Full support: site selection, store setup, staff training, tech & CRM platform, marketing & SEO, supply chain, and dedicated franchise manager for " + cityName + "." },
              { q: "What is the ROI timeline for a Cleanz24 franchise in " + cityName + "?", a: "Typical ROI recovery is 18-20 months across all models in " + cityName + "." },
            ].map((faq) => (<div key={faq.q} style={{ background: dark ? "#1e293b" : "#f9fafb", border: "1px solid " + (dark ? "#334155" : "#e5e7eb"), borderRadius: "12px", padding: "20px 24px" }}><div style={{ fontWeight: 700, color: dark ? "#f1f5f9" : "#111", marginBottom: "8px", fontSize: "0.95rem" }}>❓ {faq.q}</div><div style={{ color: dark ? "#94a3b8" : "#6b7280", fontSize: "0.9rem", lineHeight: 1.6 }}>{faq.a}</div></div>))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section style={{ background: "linear-gradient(135deg, #15803d, #166534)", padding: "56px 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>Ready to Start Your Cleanz24 Franchise in {cityName}?</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "28px", fontSize: "1rem" }}>Join India's fastest growing laundry & dry cleaning franchise (100+ Stores). Best profitable business opportunity in {cityName}.</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#apply-now" className="fcp-btn-primary" style={{ background: "#fff", color: "#16a34a" }}>📋 Apply Now — {cityName}</a>
            <a href="tel:+919138004800" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.7)", borderRadius: "8px", padding: "14px 28px", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>📞 Call +91 91380 04800</a>
          </div>
        </div>
      </section>
    </div>
  );
}
