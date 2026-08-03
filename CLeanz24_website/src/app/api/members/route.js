import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Member from '@/lib/models/Member';

let inMemoryMembers = [
  { _id: 'm-1', name: 'Aarav Sharma',  mobile: '9876543210', email: 'aarav.sharma@example.com',  plan: 'crystal-shield-annual',    vehicleNumber: 'DL3CA1234',  vehicleModel: 'Honda City',    startDate: '2026-01-15', status: 'Active' },
  { _id: 'm-2', name: 'Riya Patel',    mobile: '9123456789', email: 'riya.patel@example.com',    plan: 'pearl-radiance-annual',    vehicleNumber: 'GJ01AB9876', vehicleModel: 'Hyundai Creta', startDate: '2026-03-10', status: 'Active' },
  { _id: 'm-3', name: 'Vikram Singh',  mobile: '9988776655', email: 'vikram.singh@example.com',  plan: 'platinum-revival-annual',  vehicleNumber: 'MH12CD5678', vehicleModel: 'BMW 3 Series',  startDate: '2026-05-02', status: 'Active' }
];

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(inMemoryMembers);
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
    return NextResponse.json(allMembers);
  } catch (error) {
    console.warn('⚠️ Mongoose get members failed. Falling back to memory.', error.message);
    return NextResponse.json(inMemoryMembers);
  }
}

export async function POST(request) {
  try {
    const memberData = await request.json();
    if (!memberData._id) {
      memberData._id = 'm-' + Date.now();
    }
    memberData.id = memberData._id;

    inMemoryMembers.unshift(memberData);

    const conn = await connectToDatabase();
    if (conn) {
      try {
        const newMember = new Member(memberData);
        const savedMember = await newMember.save();
        return NextResponse.json({
          ...savedMember.toObject(),
          id: savedMember._id.toString()
        }, { status: 201 });
      } catch (dbErr) {
        console.error('❌ Mongoose save member error:', dbErr.message);
      }
    }
    return NextResponse.json(memberData, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error saving member', error: error.message }, { status: 500 });
  }
}
