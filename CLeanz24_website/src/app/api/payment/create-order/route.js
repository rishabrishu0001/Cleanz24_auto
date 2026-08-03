import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request) {
  try {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return NextResponse.json({ message: 'Razorpay keys not configured on server' }, { status: 500 });
    }

    const razorpayInstance = new Razorpay({ key_id, key_secret });
    const { amount, receipt } = await request.json();

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: receipt || `rcpt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ message: 'Error creating Razorpay order', error: error.message }, { status: 500 });
  }
}
