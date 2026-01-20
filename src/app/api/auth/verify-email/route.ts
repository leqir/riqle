import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyEmailToken } from '@/lib/auth/tokens';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, token } = body;

    // Validate input
    if (!email || !token) {
      return NextResponse.json({ error: 'Email and token are required' }, { status: 400 });
    }

    // Verify the token
    const isValid = await verifyEmailToken(email, token);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid or expired verification token' }, { status: 400 });
    }

    // Mark email as verified
    await db.user.update({
      where: { email: email.toLowerCase() },
      data: { emailVerified: new Date() },
    });

    return NextResponse.json(
      { message: 'Email verified successfully. You can now log in.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'An error occurred during email verification. Please try again.' },
      { status: 500 }
    );
  }
}
