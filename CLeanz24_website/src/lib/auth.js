import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'cleanz24_fallback_secret';

// In-memory OTP store (phone -> { otp, expiry })
const globalOtpStore = global.otpStore || new Map();
if (!global.otpStore) global.otpStore = globalOtpStore;

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOtpStore() {
  return globalOtpStore;
}

export async function sendSmsOtp(phone, otp) {
  const apiKey = process.env.FAST2SMS_API_KEY;
  if (!apiKey || apiKey === 'replace_with_your_fast2sms_api_key') {
    console.log(`\n📱 [DEV MODE] OTP for ${phone}: ${otp}\n`);
    return true;
  }

  try {
    const message = `Your Cleanz24 Admin OTP is: ${otp}. Valid for 10 minutes. Do not share.`;
    const res = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        authorization: apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        route: 'q',
        message,
        language: 'english',
        flash: 0,
        numbers: phone,
      }),
    });
    const data = await res.json();
    console.log('Fast2SMS Response:', data);
    return data.return === true;
  } catch (err) {
    console.error('Fast2SMS Fetch Error:', err);
    return false;
  }
}

export function verifyAdminToken(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { valid: false, message: 'Unauthorized. Please log in.' };
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') {
      return { valid: false, message: 'Forbidden.' };
    }
    return { valid: true, admin: decoded };
  } catch {
    return { valid: false, message: 'Session expired. Please log in again.' };
  }
}

export function signAdminToken(payload) {
  return jwt.sign({ role: 'admin', ...payload }, JWT_SECRET, { expiresIn: '8h' });
}
