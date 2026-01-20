import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createPasswordResetToken } from '@/lib/auth/tokens';
import { Resend } from 'resend';
import { env } from '@/env';

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate input
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Find user by email
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Always return success to prevent email enumeration
    // Even if user doesn't exist, we return success message
    if (!user) {
      return NextResponse.json(
        {
          message: 'If an account exists with this email, you will receive a password reset link.',
        },
        { status: 200 }
      );
    }

    // Create password reset token
    const resetToken = await createPasswordResetToken(user.id);

    // Send password reset email
    const resetUrl = `${env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    try {
      await resend.emails.send({
        from: env.EMAIL_FROM,
        to: user.email,
        subject: 'Reset your password',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">reset your password</h1>
              </div>
              <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
                <p style="margin-top: 0; font-size: 16px;">hello${user.name ? ` ${user.name}` : ''},</p>
                <p style="font-size: 16px;">you requested to reset your password. click the button below to create a new password:</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${resetUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600; font-size: 16px;">reset password</a>
                </div>
                <p style="font-size: 14px; color: #6b7280;">or copy and paste this link into your browser:</p>
                <p style="font-size: 12px; color: #9ca3af; word-break: break-all;">${resetUrl}</p>
                <p style="font-size: 14px; color: #6b7280;">if you didn't request this, you can safely ignore this email.</p>
                <p style="font-size: 14px; color: #6b7280; margin-bottom: 0;">this link will expire in 1 hour.</p>
              </div>
              <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
                <p>riqle - secure authentication</p>
              </div>
            </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
      // Don't reveal whether email failed for security
    }

    return NextResponse.json(
      {
        message: 'If an account exists with this email, you will receive a password reset link.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'An error occurred. Please try again.' }, { status: 500 });
  }
}
