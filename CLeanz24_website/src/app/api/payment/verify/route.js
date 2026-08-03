import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_secret) {
      return NextResponse.json({ message: 'Razorpay secret key not configured' }, { status: 500 });
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      return NextResponse.json({ success: true, message: 'Payment successfully verified' });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error verifying payment', error: error.message }, { status: 500 });
  }
}
