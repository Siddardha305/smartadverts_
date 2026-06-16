import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const correctEmail = process.env.ADMIN_EMAIL || 'admin@smartadverts.com';
    const correctPassword = process.env.ADMIN_PASSWORD || 'smartadverts123';
    
    if (email === correctEmail && password === correctPassword) {
      return NextResponse.json({ success: true, token: password });
    }
    
    return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
