import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Coupon from '@/lib/models/Coupon';
import { verifyAdminToken } from '@/lib/auth';

let inMemoryCoupons = [
  { _id: 'c-1', code: 'CLEAN24', discountPercent: 15, active: true },
  { _id: 'c-2', code: 'WELCOME10', discountPercent: 10, active: true }
];

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(inMemoryCoupons);
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
    return NextResponse.json(allCoupons);
  } catch (error) {
    console.warn('⚠️ Mongoose get coupons failed. Falling back to memory.', error.message);
    return NextResponse.json(inMemoryCoupons);
  }
}

export async function POST(request) {
  const auth = verifyAdminToken(request);
  if (!auth.valid) {
    return NextResponse.json({ message: auth.message }, { status: 401 });
  }

  try {
    const couponData = await request.json();
    if (!couponData._id) {
      couponData._id = 'c-' + Date.now();
    }
    couponData.id = couponData._id;

    inMemoryCoupons.unshift(couponData);

    const conn = await connectToDatabase();
    if (conn) {
      try {
        const newCoupon = new Coupon(couponData);
        const savedCoupon = await newCoupon.save();
        return NextResponse.json({
          ...savedCoupon.toObject(),
          id: savedCoupon._id.toString()
        }, { status: 201 });
      } catch (dbErr) {
        console.error('❌ Mongoose save coupon error:', dbErr.message);
      }
    }
    return NextResponse.json(couponData, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error saving coupon', error: error.message }, { status: 500 });
  }
}
