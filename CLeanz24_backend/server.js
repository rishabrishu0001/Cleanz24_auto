require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'cleanz24_fallback_secret';

// ─── Middleware ───
app.use(cors());
app.use(express.json());

// ─── MongoDB Connection ───
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ Failed to connect to MongoDB', err));

// ─── Models ───
const Member = require('./models/Member');
const Coupon = require('./models/Coupon');
const Pickup = require('./models/Pickup');
const Franchise = require('./models/Franchise');

// ─── Razorpay Instance ───
let razorpayInstance = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

// ─── In-memory OTP Store (phone → { otp, expiry }) ───
const otpStore = new Map();

// ─── Helper: Generate 6-digit OTP ───
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ─── Helper: Send SMS via Fast2SMS ───
async function sendSmsOtp(phone, otp) {
  const apiKey = process.env.FAST2SMS_API_KEY;
  if (!apiKey || apiKey === 'replace_with_your_fast2sms_api_key') {
    // Dev fallback: log OTP to console
    console.log(`\n📱 [DEV MODE] OTP for ${phone}: ${otp}\n`);
    return true;
  }

  return new Promise((resolve) => {
    const message = `Your Cleanz24 Admin OTP is: ${otp}. Valid for 10 minutes. Do not share.`;
    const postData = JSON.stringify({
      route: 'q',
      message,
      language: 'english',
      flash: 0,
      numbers: phone,
    });

    const options = {
      hostname: 'www.fast2sms.com',
      path: '/dev/bulkV2',
      method: 'POST',
      headers: {
        authorization: apiKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          console.log('Fast2SMS Response:', parsed);
          resolve(parsed.return === true);
        } catch (e) {
          console.error('Fast2SMS Parse Error. Raw data:', data);
          resolve(false);
        }
      });
    });

    req.on('error', () => resolve(false));
    req.write(postData);
    req.end();
  });
}

// ─── JWT Auth Middleware ───
function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Forbidden.' });
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Session expired. Please log in again.' });
  }
}

// ═══════════════════════════════════════════════════════════════
// ─── ADMIN AUTH ROUTES ─────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════

// POST /api/admin/send-otp  — send OTP to admin phone
app.post('/api/admin/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: 'Phone number is required.' });

    const adminPhone = process.env.ADMIN_PHONE;
    // Normalize: strip leading 0 or +91
    const normalizedInput = phone.replace(/^(\+91|91|0)/, '').replace(/\D/g, '');
    const normalizedAdmin  = (adminPhone || '').replace(/^(\+91|91|0)/, '').replace(/\D/g, '');

    if (normalizedInput !== normalizedAdmin) {
      return res.status(403).json({ message: 'This phone number is not registered as admin.' });
    }

    const otp = generateOTP();
    otpStore.set(normalizedInput, { otp, expiry: Date.now() + 10 * 60 * 1000 }); // 10 min

    const sent = await sendSmsOtp(normalizedInput, otp);
    if (!sent) {
      // Still succeed in dev mode — OTP is in console
      console.log(`⚠️  SMS failed. OTP for ${normalizedInput}: ${otp}`);
    }

    res.json({ success: true, message: `OTP sent to +91${normalizedInput.slice(-10)}` });
  } catch (err) {
    res.status(500).json({ message: 'Error sending OTP.', error: err.message });
  }
});

// POST /api/admin/verify-otp  — verify OTP and issue JWT
app.post('/api/admin/verify-otp', (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ message: 'Phone and OTP are required.' });

    const normalizedPhone = phone.replace(/^(\+91|91|0)/, '').replace(/\D/g, '');
    const record = otpStore.get(normalizedPhone);

    if (!record) return res.status(400).json({ message: 'No OTP found. Please request again.' });
    if (Date.now() > record.expiry) {
      otpStore.delete(normalizedPhone);
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }
    if (record.otp !== otp.trim()) {
      return res.status(400).json({ message: 'Incorrect OTP. Please try again.' });
    }

    otpStore.delete(normalizedPhone); // single-use

    const token = jwt.sign({ role: 'admin', method: 'otp', phone: normalizedPhone }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ success: true, token, message: 'Login successful.' });
  } catch (err) {
    res.status(500).json({ message: 'Error verifying OTP.', error: err.message });
  }
});

// POST /api/admin/login  — email + password login
app.post('/api/admin/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });

    if (email.trim().toLowerCase() !== (process.env.ADMIN_EMAIL || '').toLowerCase()) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ role: 'admin', method: 'password', email }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ success: true, token, message: 'Login successful.' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in.', error: err.message });
  }
});

// POST /api/admin/verify-token  — check if token is still valid
app.post('/api/admin/verify-token', requireAdminAuth, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

// ═══════════════════════════════════════════════════════════════
// ─── RESILIENT DATA STORES & FALLBACKS ─────────────────────────
// ═══════════════════════════════════════════════════════════════

let inMemoryMembers = [
  { _id: 'm-1', name: 'Aarav Sharma',  mobile: '9876543210', email: 'aarav.sharma@example.com',  plan: 'crystal-shield-annual',    vehicleNumber: 'DL3CA1234',  vehicleModel: 'Honda City',    startDate: '2026-01-15', status: 'Active' },
  { _id: 'm-2', name: 'Riya Patel',    mobile: '9123456789', email: 'riya.patel@example.com',    plan: 'pearl-radiance-annual',    vehicleNumber: 'GJ01AB9876', vehicleModel: 'Hyundai Creta', startDate: '2026-03-10', status: 'Active' },
  { _id: 'm-3', name: 'Vikram Singh',  mobile: '9988776655', email: 'vikram.singh@example.com',  plan: 'platinum-revival-annual',  vehicleNumber: 'MH12CD5678', vehicleModel: 'BMW 3 Series',  startDate: '2026-05-02', status: 'Active' }
];

let inMemoryCoupons = [
  { _id: 'c-1', code: 'CLEAN24', discountPercent: 15, active: true },
  { _id: 'c-2', code: 'WELCOME10', discountPercent: 10, active: true }
];

// ═══════════════════════════════════════════════════════════════
// ─── MEMBER ROUTES (Protected) ─────────────────────────────────
// ═══════════════════════════════════════════════════════════════

// GET all members
app.get('/api/members', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('⚠️ MongoDB not connected. Serving members from memory.');
      return res.json(inMemoryMembers);
    }
    const dbMembers = await Member.find().sort({ createdAt: -1 });
    const allMembers = [...inMemoryMembers];
    dbMembers.forEach(dbm => {
      const matchIdx = allMembers.findIndex(x => x.mobile === dbm.mobile || x._id.toString() === dbm._id.toString());
      if (matchIdx === -1) {
        allMembers.push({
          ...dbm.toObject(),
          id: dbm._id.toString()
        });
      }
    });
    res.json(allMembers);
  } catch (error) {
    console.warn('⚠️ Mongoose get members failed. Falling back to memory.', error.message);
    res.json(inMemoryMembers);
  }
});

// POST new member (public — called after payment)
app.post('/api/members', async (req, res) => {
  try {
    const memberData = req.body;
    if (!memberData._id) {
      memberData._id = 'm-' + Date.now();
    }
    memberData.id = memberData._id;

    // Store in-memory
    inMemoryMembers.unshift(memberData);
    
    if (mongoose.connection.readyState === 1) {
      try {
        const newMember = new Member(memberData);
        const savedMember = await newMember.save();
        return res.status(201).json({
          ...savedMember.toObject(),
          id: savedMember._id.toString()
        });
      } catch (dbErr) {
        console.error('❌ Mongoose save member error:', dbErr.message);
      }
    } else {
      console.log('⚠️ MongoDB not connected. Kept member in memory.');
    }
    res.status(201).json(memberData);
  } catch (error) {
    res.status(500).json({ message: 'Error saving member', error: error.message });
  }
});

// PUT update member (admin only)
app.put('/api/members/:id', requireAdminAuth, async (req, res) => {
  try {
    const memberId = req.params.id;
    const memIdx = inMemoryMembers.findIndex(x => x._id.toString() === memberId || x.id === memberId);
    if (memIdx !== -1) {
      inMemoryMembers[memIdx] = { ...inMemoryMembers[memIdx], ...req.body };
    }
    
    if (mongoose.connection.readyState === 1) {
      try {
        const updatedMember = await Member.findByIdAndUpdate(memberId, req.body, { new: true });
        if (updatedMember) {
          return res.json({
            ...updatedMember.toObject(),
            id: updatedMember._id.toString()
          });
        }
      } catch (dbErr) {
        console.error('❌ Mongoose update member error:', dbErr.message);
      }
    }
    const fallbackMember = inMemoryMembers.find(x => x._id.toString() === memberId || x.id === memberId) || req.body;
    res.json(fallbackMember);
  } catch (error) {
    res.status(500).json({ message: 'Error updating member', error: error.message });
  }
});

// DELETE member (admin only)
app.delete('/api/members/:id', requireAdminAuth, async (req, res) => {
  try {
    const memberId = req.params.id;
    inMemoryMembers = inMemoryMembers.filter(x => x._id.toString() !== memberId && x.id !== memberId);
    
    if (mongoose.connection.readyState === 1) {
      try {
        await Member.findByIdAndDelete(memberId);
      } catch (dbErr) {
        console.error('❌ Mongoose delete member error:', dbErr.message);
      }
    }
    res.json({ message: 'Member deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting member', error: error.message });
  }
});

// ═══════════════════════════════════════════════════════════════
// ─── COUPON ROUTES (Protected) ─────────────────────────────────
// ═══════════════════════════════════════════════════════════════

// GET all coupons (public — used on payment page)
app.get('/api/coupons', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(inMemoryCoupons);
    }
    const dbCoupons = await Coupon.find().sort({ createdAt: -1 });
    const allCoupons = [...inMemoryCoupons];
    dbCoupons.forEach(dbc => {
      const matchIdx = allCoupons.findIndex(x => x.code.toUpperCase() === dbc.code.toUpperCase() || x._id.toString() === dbc._id.toString());
      if (matchIdx === -1) {
        allCoupons.push({
          ...dbc.toObject(),
          id: dbc._id.toString()
        });
      }
    });
    res.json(allCoupons);
  } catch (error) {
    console.warn('⚠️ Mongoose get coupons failed. Falling back to memory.', error.message);
    res.json(inMemoryCoupons);
  }
});

// POST new coupon (admin only)
app.post('/api/coupons', requireAdminAuth, async (req, res) => {
  try {
    const couponData = req.body;
    if (!couponData._id) {
      couponData._id = 'c-' + Date.now();
    }
    couponData.id = couponData._id;

    inMemoryCoupons.unshift(couponData);
    
    if (mongoose.connection.readyState === 1) {
      try {
        const newCoupon = new Coupon(couponData);
        const savedCoupon = await newCoupon.save();
        return res.status(201).json({
          ...savedCoupon.toObject(),
          id: savedCoupon._id.toString()
        });
      } catch (dbErr) {
        console.error('❌ Mongoose save coupon error:', dbErr.message);
      }
    }
    res.status(201).json(couponData);
  } catch (error) {
    res.status(500).json({ message: 'Error saving coupon', error: error.message });
  }
});

// PUT update coupon (admin only)
app.put('/api/coupons/:id', requireAdminAuth, async (req, res) => {
  try {
    const couponId = req.params.id;
    const coupIdx = inMemoryCoupons.findIndex(x => x._id.toString() === couponId || x.id === couponId);
    if (coupIdx !== -1) {
      inMemoryCoupons[coupIdx] = { ...inMemoryCoupons[coupIdx], ...req.body };
    }
    
    if (mongoose.connection.readyState === 1) {
      try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, req.body, { new: true });
        if (updatedCoupon) {
          return res.json({
            ...updatedCoupon.toObject(),
            id: updatedCoupon._id.toString()
          });
        }
      } catch (dbErr) {
        console.error('❌ Mongoose update coupon error:', dbErr.message);
      }
    }
    const fallbackCoupon = inMemoryCoupons.find(x => x._id.toString() === couponId || x.id === couponId) || req.body;
    res.json(fallbackCoupon);
  } catch (error) {
    res.status(500).json({ message: 'Error updating coupon', error: error.message });
  }
});

// DELETE coupon (admin only)
app.delete('/api/coupons/:id', requireAdminAuth, async (req, res) => {
  try {
    const couponId = req.params.id;
    inMemoryCoupons = inMemoryCoupons.filter(x => x._id.toString() !== couponId && x.id !== couponId);
    
    if (mongoose.connection.readyState === 1) {
      try {
        await Coupon.findByIdAndDelete(couponId);
      } catch (dbErr) {
        console.error('❌ Mongoose delete coupon error:', dbErr.message);
      }
    }
    res.json({ message: 'Coupon deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting coupon', error: error.message });
  }
});

// ═══════════════════════════════════════════════════════════════
// ─── RAZORPAY ROUTES ───────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════

app.post('/api/payment/create-order', async (req, res) => {
  try {
    if (!razorpayInstance) {
      return res.status(500).json({ message: 'Razorpay keys not configured on server' });
    }
    const { amount, receipt } = req.body;
    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: receipt || `rcpt_${Date.now()}`,
    };
    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating Razorpay order', error: error.message });
  }
});

app.post('/api/payment/verify', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      res.json({ success: true, message: 'Payment successfully verified' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error verifying payment', error: error.message });
  }
});

// ─── PICKUP / BOOKING ROUTES ───
app.get('/api/pickups', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.json([]);
    const pickups = await Pickup.find().sort({ createdAt: -1 });
    res.json(pickups);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pickups', error: err.message });
  }
});

app.post('/api/pickups', async (req, res) => {
  try {
    const pickupData = req.body;
    console.log('📬 Received Pickup Request:', JSON.stringify(pickupData, null, 2));
    
    // Save to MongoDB
    const newPickup = new Pickup(pickupData);
    await newPickup.save();
    console.log('💾 Saved to MongoDB successfully');

    // Send to Google Sheets Apps Script Web App if configured
    const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;
    if (scriptUrl && scriptUrl !== 'your_google_script_url_here') {
      try {
        const payload = {
          timestamp: new Date().toISOString().split('T')[0],
          name: pickupData.name,
          mobile: pickupData.mobile,
          email: pickupData.email || 'N/A',
          service: pickupData.service || 'N/A',
          date: pickupData.date || 'N/A',
          time: pickupData.time || 'N/A',
          address: pickupData.address,
          type: pickupData.type || 'Booking',
          source: pickupData.source || 'Website',
          price: pickupData.price || 0,
          isMember: pickupData.isMember !== undefined ? pickupData.isMember : false
        };
        console.log('📤 Sending payload to Google Sheets script:', JSON.stringify(payload, null, 2));

        const response = await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const resText = await response.text();
        console.log('📥 Google Sheets response:', resText);
      } catch (sheetErr) {
        console.error('⚠️ Failed to save to Google Sheets:', sheetErr.message);
      }
    }

    res.status(201).json({ success: true, message: 'Pickup scheduled successfully' });
  } catch (error) {
    console.error('❌ Error in /api/pickups:', error.message);
    res.status(500).json({ message: 'Error scheduling pickup', error: error.message });
  }
});

// ─── FRANCHISE INQUIRY ROUTES ───
app.get('/api/franchise', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.json([]);
    const franchises = await Franchise.find().sort({ createdAt: -1 });
    res.json(franchises);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching franchises', error: err.message });
  }
});

app.post('/api/franchise', async (req, res) => {
  try {
    const franchiseData = req.body;
    console.log('📬 Received Franchise Inquiry:', JSON.stringify(franchiseData, null, 2));

    // Save to MongoDB
    const newFranchise = new Franchise(franchiseData);
    await newFranchise.save();
    console.log('💾 Saved Franchise to MongoDB successfully');

    // Send to Google Sheets Apps Script Web App for Franchise if configured
    const scriptUrl = process.env.GOOGLE_SHEETS_FRANCHISE_SCRIPT_URL;
    if (scriptUrl && scriptUrl !== 'your_google_sheets_franchise_script_url_here') {
      try {
        const payload = {
          timestamp: new Date().toISOString().split('T')[0],
          name: franchiseData.name,
          mobile: franchiseData.mobile,
          email: franchiseData.email,
          city: franchiseData.city,
          modelType: franchiseData.modelType || 'General Inquiry'
        };
        console.log('📤 Sending payload to Franchise Google Sheets script:', JSON.stringify(payload, null, 2));

        const response = await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const resText = await response.text();
        console.log('📥 Franchise Google Sheets response:', resText);
      } catch (sheetErr) {
        console.error('⚠️ Failed to save Franchise to Google Sheets:', sheetErr.message);
      }
    }

    res.status(201).json({ success: true, message: 'Franchise inquiry submitted successfully' });
  } catch (error) {
    console.error('❌ Error in /api/franchise:', error.message);
    res.status(500).json({ message: 'Error submitting franchise inquiry', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
