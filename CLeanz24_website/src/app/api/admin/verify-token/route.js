import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';

export async function POST(request) {
  const auth = verifyAdminToken(request);
  if (!auth.valid) {
    return NextResponse.json({ message: auth.message }, { status: 401 });
  }
  return NextResponse.json({ valid: true, admin: auth.admin });
}
