import { NextResponse } from 'next/server';
import { getOtpStore, signAdminToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const { phone, otp } = await request.json();
    if (!phone || !otp) {
      return NextResponse.json({ message: 'Phone and OTP are required.' }, { status: 400 });
    }

    const normalizedPhone = phone.replace(/^(\+91|91|0)/, '').replace(/\D/g, '');
    const otpStore = getOtpStore();
    const record = otpStore.get(normalizedPhone);

    if (!record) {
      return NextResponse.json({ message: 'No OTP found. Please request again.' }, { status: 400 });
    }
    if (Date.now() > record.expiry) {
      otpStore.delete(normalizedPhone);
      return NextResponse.json({ message: 'OTP has expired. Please request a new one.' }, { status: 400 });
    }
    if (record.otp !== otp.trim()) {
      return NextResponse.json({ message: 'Incorrect OTP. Please try again.' }, { status: 400 });
    }

    otpStore.delete(normalizedPhone);

    const token = signAdminToken({ method: 'otp', phone: normalizedPhone });
    return NextResponse.json({ success: true, token, message: 'Login successful.' });
  } catch (err) {
    return NextResponse.json({ message: 'Error verifying OTP.', error: err.message }, { status: 500 });
  }
}
