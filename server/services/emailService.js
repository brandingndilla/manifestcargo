const nodemailer = require('nodemailer');

async function sendPasswordResetEmail(toEmail, resetUrl) {
  try {
    console.log('📧 Sending password reset email to:', toEmail);
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email credentials are missing');
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter.verify();
    console.log('✅ SMTP connection verified');

    const info = await transporter.sendMail({
      from: `"Cargo Manifest" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: 'Password Reset Request - Cargo Manifest',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Hello,</p>
          <p>You requested a password reset for your Cargo Manifest account.</p>
          <p>Click the link below to reset your password (valid for 1 hour):</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>If you didn't request this, you can safely ignore this email.</p>
        </div>
      `
    });

    console.log('✅ Password reset email sent successfully!');
    return info;
  } catch (error) {
    console.error('❌ Email send error:', error);
    throw error;
  }
}

module.exports = { sendPasswordResetEmail };