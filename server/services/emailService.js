async function sendPasswordResetEmail(to, resetUrl) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to,
      subject: 'Reset your ManifestCargo password',
      html: `
        <p>You requested a password reset.</p>
        <p><a href="${resetUrl}">Click here to reset your password</a></p>
        <p>This link expires in 1 hour. If you didn't request this, ignore this email.</p>
      `
    })
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('❌ Resend API error:', data);
    throw new Error(data.message || 'Failed to send email');
  }

  console.log('📧 Email sent via Resend, id:', data.id);
}

module.exports = { sendPasswordResetEmail };