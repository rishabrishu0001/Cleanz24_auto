import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Member from '@/lib/models/Member';
import { verifyAdminToken } from '@/lib/auth';

export async function PUT(request, { params }) {
  const auth = verifyAdminToken(request);
  if (!auth.valid) {
    return NextResponse.json({ message: auth.message }, { status: 401 });
  }

  try {
    const { id: memberId } = await params;
    const body = await request.json();

    const conn = await connectToDatabase();
    if (conn) {
      try {
        const updatedMember = await Member.findByIdAndUpdate(memberId, body, { new: true });
        if (updatedMember) {
          return NextResponse.json({
            ...updatedMember.toObject(),
            id: updatedMember._id.toString()
          });
        }
      } catch (dbErr) {
        console.error('❌ Mongoose update member error:', dbErr.message);
      }
    }
    return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating member', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const auth = verifyAdminToken(request);
  if (!auth.valid) {
    return NextResponse.json({ message: auth.message }, { status: 401 });
  }

  try {
    const { id: memberId } = await params;
    const conn = await connectToDatabase();
    if (conn) {
      try {
        await Member.findByIdAndDelete(memberId);
      } catch (dbErr) {
        console.error('❌ Mongoose delete member error:', dbErr.message);
      }
    }
    return NextResponse.json({ message: 'Member deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting member', error: error.message }, { status: 500 });
  }
}
