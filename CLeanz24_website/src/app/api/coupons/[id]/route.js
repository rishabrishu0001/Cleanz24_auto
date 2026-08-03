import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Coupon from '@/lib/models/Coupon';
import { verifyAdminToken } from '@/lib/auth';

export async function PUT(request, { params }) {
  const auth = verifyAdminToken(request);
  if (!auth.valid) {
    return NextResponse.json({ message: auth.message }, { status: 401 });
  }

  try {
    const { id: couponId } = await params;
    const body = await request.json();

    const conn = await connectToDatabase();
    if (conn) {
      try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, body, { new: true });
        if (updatedCoupon) {
          return NextResponse.json({
            ...updatedCoupon.toObject(),
            id: updatedCoupon._id.toString()
          });
        }
      } catch (dbErr) {
        console.error('❌ Mongoose update coupon error:', dbErr.message);
      }
    }
    return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating coupon', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const auth = verifyAdminToken(request);
  if (!auth.valid) {
    return NextResponse.json({ message: auth.message }, { status: 401 });
  }

  try {
    const { id: couponId } = await params;
    const conn = await connectToDatabase();
    if (conn) {
      try {
        await Coupon.findByIdAndDelete(couponId);
      } catch (dbErr) {
        console.error('❌ Mongoose delete coupon error:', dbErr.message);
      }
    }
    return NextResponse.json({ message: 'Coupon deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting coupon', error: error.message }, { status: 500 });
  }
}
