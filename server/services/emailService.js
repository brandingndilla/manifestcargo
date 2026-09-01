const nodemailer = require('nodemailer');

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: Number(process.env.EMAIL_PORT) === 465, // true only for port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    family: 4 // force IPv4 — Render's outbound IPv6 to Gmail SMTP is unreliable/blocked
  });
}

async function sendPasswordResetEmail(to, resetUrl) {
  const transporter = getTransporter();

  // Verify the SMTP connection/auth before attempting to send
  try {
    await transporter.verify();
  } catch (verifyErr) {
    console.error('❌ SMTP connection/auth failed:', verifyErr.message);
    throw verifyErr;
  }

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject: 'Reset your ManifestCargo password',
    html: `
      <p>You requested a password reset.</p>
      <p><a href="${resetUrl}">Click here to reset your password</a></p>
      <p>This link expires in 1 hour. If you didn't request this, ignore this email.</p>
    `
  });

  console.log('📧 Email sent:', info.messageId, '| Accepted:', info.accepted, '| Rejected:', info.rejected);
}

module.exports = { sendPasswordResetEmail };