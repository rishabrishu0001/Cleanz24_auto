import { NextResponse } from 'next/server';
import { signAdminToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    const allowedEmails = (process.env.ADMIN_EMAIL || '').toLowerCase().split(',').map(e => e.trim());
    if (!allowedEmails.includes(email.trim().toLowerCase())) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }

    const token = signAdminToken({ method: 'password', email });
    return NextResponse.json({ success: true, token, message: 'Login successful.' });
  } catch (err) {
    return NextResponse.json({ message: 'Error logging in.', error: err.message }, { status: 500 });
  }
}
