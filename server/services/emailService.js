// server/services/emailService.js

// ===== FIX: Make sure function accepts resetUrl =====
async function sendPasswordResetEmail(to, resetUrl, name = 'User') {
  console.log('📧 Sending to:', to);
  console.log('🔗 Reset URL received:', resetUrl); // Should show full URL
  
  // ===== FIX: Check if resetUrl is valid =====
  if (!resetUrl || resetUrl === 'undefined') {
    throw new Error('Reset URL is undefined or invalid');
  }
  // ===== END FIX =====

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to,
      subject: 'Reset Your Password - ITERICS',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background: #f0f4f8; padding: 20px; }
            .container { max-width: 500px; margin: 0 auto; background: white; border-radius: 12px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 24px; }
            .header h1 { color: #0a1628; font-size: 24px; margin: 0; }
            .header p { color: #718096; margin: 4px 0 0 0; }
            .content { color: #2d3748; line-height: 1.6; }
            .btn { display: inline-block; background: #0a1628; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 16px 0; }
            .btn:hover { background: #1a2a4a; }
            .footer { text-align: center; color: #718096; font-size: 12px; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e8ecf0; }
            .warning { color: #e74c3c; font-size: 13px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚚 ITERICS</h1>
              <p>Cargo Manifest System</p>
            </div>
            <div class="content">
              <p>Hello <strong>${name}</strong>,</p>
              <p>We received a request to reset your password. Click the button below to set a new password:</p>
              <div style="text-align: center;">
                <a href="${resetUrl}" class="btn">Reset Password</a>
              </div>
              <p style="text-align: center; color: #718096; font-size: 14px;">
                Or copy and paste this link into your browser:
              </p>
              <p style="word-break: break-all; font-size: 13px; color: #4da6ff; background: #f7fafc; padding: 10px; border-radius: 6px; text-align: center;">
                ${resetUrl}
              </p>
              <p>This link will expire in <strong>1 hour</strong>.</p>
              <p class="warning">If you didn't request this, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} ITERICS. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    })
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('❌ Resend API error:', data);
    throw new Error(data.message || 'Failed to send email');
  }

  console.log('📧 Email sent via Resend, id:', data.id);
  return { success: true, id: data.id };
}

module.exports = { sendPasswordResetEmail };