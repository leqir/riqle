import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, validatePassword } from '@/lib/auth/password';
import { verifyPasswordResetToken, markPasswordResetTokenAsUsed } from '@/lib/auth/tokens';
import { Resend } from 'resend';
import { env } from '@/env';

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = body;

    // Validate input
    if (!token || !password) {
      return NextResponse.json({ error: 'Token and password are required' }, { status: 400 });
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json({ error: passwordValidation.error }, { status: 400 });
    }

    // Verify reset token
    const userId = await verifyPasswordResetToken(token);

    if (!userId) {
      return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 });
    }

    // Get user
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Hash new password
    const hashedPassword = await hashPassword(password);

    // Update user password
    await db.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    // Mark token as used
    await markPasswordResetTokenAsUsed(token);

    // Send confirmation email
    try {
      await resend.emails.send({
        from: env.EMAIL_FROM,
        to: user.email,
        subject: 'Your password has been changed',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">password changed</h1>
              </div>
              <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
                <p style="margin-top: 0; font-size: 16px;">hello${user.name ? ` ${user.name}` : ''},</p>
                <p style="font-size: 16px;">your password has been successfully changed.</p>
                <p style="font-size: 16px;">you can now log in with your new password.</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${env.NEXTAUTH_URL}/login" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600; font-size: 16px;">sign in</a>
                </div>
                <p style="font-size: 14px; color: #6b7280;">if you didn't make this change, please contact support immediately.</p>
              </div>
              <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
                <p>riqle - secure authentication</p>
              </div>
            </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send password changed confirmation:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      { message: 'Password reset successfully. You can now log in with your new password.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'An error occurred while resetting your password. Please try again.' },
      { status: 500 }
    );
  }
}
