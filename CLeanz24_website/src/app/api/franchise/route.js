import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Franchise from '@/lib/models/Franchise';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) return NextResponse.json([]);
    const franchises = await Franchise.find().sort({ createdAt: -1 });
    return NextResponse.json(franchises);
  } catch (err) {
    return NextResponse.json({ message: 'Error fetching franchises', error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const franchiseData = await request.json();
    console.log('📬 Received Franchise Inquiry:', JSON.stringify(franchiseData, null, 2));

    const conn = await connectToDatabase();
    if (conn) {
      const newFranchise = new Franchise(franchiseData);
      await newFranchise.save();
      console.log('💾 Saved Franchise to MongoDB successfully');
    }

    const isCarSpa = franchiseData.modelType && (
      franchiseData.modelType.includes('Car Spa') || 
      franchiseData.modelType.includes('Studio') || 
      franchiseData.modelType.includes('Hub')
    );
    const scriptUrl = isCarSpa
      ? (process.env.GOOGLE_SHEETS_CAR_SPA_FRANCHISE_SCRIPT_URL || process.env.GOOGLE_SHEETS_FRANCHISE_SCRIPT_URL)
      : (process.env.GOOGLE_SHEETS_LAUNDRY_FRANCHISE_SCRIPT_URL || process.env.GOOGLE_SHEETS_FRANCHISE_SCRIPT_URL);

    if (scriptUrl && scriptUrl !== 'your_google_sheets_franchise_script_url_here' && scriptUrl !== '') {
      try {
        const payload = {
          timestamp: new Date().toISOString().split('T')[0],
          name: franchiseData.name,
          mobile: franchiseData.mobile,
          email: franchiseData.email,
          city: franchiseData.city,
          modelType: franchiseData.modelType || 'General Inquiry',
          sheetName: isCarSpa ? 'Car sap frenchise leads' : 'laundry frenchise leads'
        };
        console.log(`📤 Sending payload to ${isCarSpa ? 'Car Spa' : 'Laundry'} Franchise Google Sheets script:`, JSON.stringify(payload, null, 2));

        const response = await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const resText = await response.text();
        console.log(`📥 ${isCarSpa ? 'Car Spa' : 'Laundry'} Franchise Google Sheets response:`, resText);
      } catch (sheetErr) {
        console.error(`⚠️ Failed to save ${isCarSpa ? 'Car Spa' : 'Laundry'} Franchise to Google Sheets:`, sheetErr.message);
      }
    }

    const scriptUrl2 = isCarSpa
      ? (process.env.GOOGLE_SHEETS_CAR_SPA_FRANCHISE_SCRIPT_URL_2 || process.env.GOOGLE_SHEETS_FRANCHISE_SCRIPT_URL_2)
      : (process.env.GOOGLE_SHEETS_LAUNDRY_FRANCHISE_SCRIPT_URL_2 || process.env.GOOGLE_SHEETS_FRANCHISE_SCRIPT_URL_2);

    if (scriptUrl2 && scriptUrl2 !== 'your_google_sheets_franchise_script_url_2_here' && scriptUrl2 !== '' && scriptUrl2 !== scriptUrl) {
      try {
        const payload = {
          timestamp: new Date().toISOString().split('T')[0],
          name: franchiseData.name,
          mobile: franchiseData.mobile,
          email: franchiseData.email,
          city: franchiseData.city,
          modelType: franchiseData.modelType || 'General Inquiry',
          sheetName: isCarSpa ? 'Car sap frenchise leads' : 'laundry frenchise leads'
        };
        console.log(`📤 Sending payload to Secondary ${isCarSpa ? 'Car Spa' : 'Laundry'} Franchise Google Sheets script:`, JSON.stringify(payload, null, 2));

        const response = await fetch(scriptUrl2, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const resText = await response.text();
        console.log(`📥 Secondary ${isCarSpa ? 'Car Spa' : 'Laundry'} Franchise Google Sheets response:`, resText);
      } catch (sheetErr) {
        console.error(`⚠️ Failed to save Secondary ${isCarSpa ? 'Car Spa' : 'Laundry'} Franchise to Google Sheets:`, sheetErr.message);
      }
    }

    return NextResponse.json({ success: true, message: 'Franchise inquiry submitted successfully' }, { status: 201 });
  } catch (error) {
    console.error('❌ Error in /api/franchise:', error.message);
    return NextResponse.json({ message: 'Error submitting franchise inquiry', error: error.message }, { status: 500 });
  }
}
