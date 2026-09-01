// server/routes/auth.js

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    console.log('🔐 Forgot password request for:', email);
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'No account found with this email' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    // ===== FIX: Build the reset URL =====
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;
    // ===== END FIX =====

    console.log('🔗 Reset URL:', resetUrl); // Should show full URL

    // ===== FIX: Pass resetUrl correctly =====
    await sendPasswordResetEmail(user.email, resetUrl, user.name);
    // ===== END FIX =====

    res.json({ 
      success: true,
      message: 'Password reset email sent successfully'
    });
  } catch (error) {
    console.error('❌ Forgot password error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
});