import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Pickup from '@/lib/models/Pickup';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) return NextResponse.json([]);
    const pickups = await Pickup.find().sort({ createdAt: -1 });
    return NextResponse.json(pickups);
  } catch (err) {
    return NextResponse.json({ message: 'Error fetching pickups', error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const pickupData = await request.json();
    console.log('📬 Received Pickup Request:', JSON.stringify(pickupData, null, 2));

    const conn = await connectToDatabase();
    if (conn) {
      const newPickup = new Pickup(pickupData);
      await newPickup.save();
      console.log('💾 Saved to MongoDB successfully');
    }

    const isCarSpa = pickupData.service && (
      pickupData.service.includes('Spa') || 
      pickupData.service.includes('Wash') || 
      pickupData.service.includes('Detailing') || 
      pickupData.service.includes('Shield') || 
      pickupData.service.includes('Touch') || 
      pickupData.service.includes('Radiance') || 
      pickupData.service.includes('Revival') ||
      (pickupData.source && pickupData.source.toLowerCase().includes('car'))
    );
    const scriptUrl = isCarSpa
      ? (process.env.GOOGLE_SHEETS_CAR_SPA_SCRIPT_URL || process.env.GOOGLE_SHEETS_SCRIPT_URL)
      : (process.env.GOOGLE_SHEETS_LAUNDRY_SCRIPT_URL || process.env.GOOGLE_SHEETS_SCRIPT_URL);

    if (scriptUrl && scriptUrl !== 'your_google_script_url_here' && scriptUrl !== '') {
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
          isMember: pickupData.isMember !== undefined ? pickupData.isMember : false,
          sheetName: isCarSpa ? 'Car sap leads' : 'washing leads'
        };
        console.log(`📤 Sending payload to ${isCarSpa ? 'Car Spa' : 'Laundry'} Google Sheets script:`, JSON.stringify(payload, null, 2));

        const response = await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const resText = await response.text();
        console.log(`📥 ${isCarSpa ? 'Car Spa' : 'Laundry'} Google Sheets response:`, resText);
      } catch (sheetErr) {
        console.error(`⚠️ Failed to save to ${isCarSpa ? 'Car Spa' : 'Laundry'} Google Sheets:`, sheetErr.message);
      }
    }

    return NextResponse.json({ success: true, message: 'Pickup scheduled successfully' }, { status: 201 });
  } catch (error) {
    console.error('❌ Error in /api/pickups:', error.message);
    return NextResponse.json({ message: 'Error scheduling pickup', error: error.message }, { status: 500 });
  }
}
