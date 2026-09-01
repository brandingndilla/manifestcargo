const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,   // smtp.gmail.com
  port: Number(process.env.EMAIL_PORT), // 587
  secure: false, // true for port 465, false for 587 (STARTTLS)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendPasswordResetEmail(toEmail, resetUrl) {
  try {
    const info = await transporter.sendMail({
      from: `"Cargo Manifest" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password (valid for 1 hour):</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      `
    });

    console.log('📧 Reset email sent via Gmail SMTP, messageId:', info.messageId);
    return info;
  } catch (err) {
    console.error('❌ Email send error:', err);
    throw err;
  }
}

module.exports = { sendPasswordResetEmail };