import { NextResponse } from 'next/server';
import { generateOTP, getOtpStore, sendSmsOtp } from '@/lib/auth';

export async function POST(request) {
  try {
    const { phone } = await request.json();
    if (!phone) {
      return NextResponse.json({ message: 'Phone number is required.' }, { status: 400 });
    }

    const adminPhone = process.env.ADMIN_PHONE;
    const normalizedInput = phone.replace(/^(\+91|91|0)/, '').replace(/\D/g, '');
    const normalizedAdmin = (adminPhone || '').replace(/^(\+91|91|0)/, '').replace(/\D/g, '');

    if (normalizedInput !== normalizedAdmin) {
      return NextResponse.json({ message: 'This phone number is not registered as admin.' }, { status: 403 });
    }

    const otp = generateOTP();
    const otpStore = getOtpStore();
    otpStore.set(normalizedInput, { otp, expiry: Date.now() + 10 * 60 * 1000 });

    const sent = await sendSmsOtp(normalizedInput, otp);
    if (!sent) {
      console.log(`⚠️ SMS failed. Dev OTP for ${normalizedInput}: ${otp}`);
    }

    return NextResponse.json({ success: true, message: `OTP sent to +91${normalizedInput.slice(-10)}` });
  } catch (err) {
    return NextResponse.json({ message: 'Error sending OTP.', error: err.message }, { status: 500 });
  }
}
