import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    company: '',
    companyPhone: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    // Validate password length
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register({
        company: formData.company,
        companyPhone: formData.companyPhone,
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      toast.success('Account created successfully!');
      navigate('/manifest-manager');
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.error || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo">
          <i className="fas fa-user-plus"></i>
          <h1>Create Account</h1>
          <p>Enter your company details to get started</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company Name <span style={{ color: '#e53e3e' }}>*</span></label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter your company name"
              required
            />
          </div>
          <div className="form-group">
            <label>Company Phone Number <span style={{ color: '#e53e3e' }}>*</span></label>
            <input
              type="tel"
              name="companyPhone"
              value={formData.companyPhone}
              onChange={handleChange}
              placeholder="Enter your company phone number"
              required
            />
          </div>
          <div className="form-group">
            <label>Full Name <span style={{ color: '#e53e3e' }}>*</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address <span style={{ color: '#e53e3e' }}>*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@company.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password <span style={{ color: '#e53e3e' }}>*</span></label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password (min 6 characters)"
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password <span style={{ color: '#e53e3e' }}>*</span></label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit" className="btn-auth" disabled={loading}>
            <i className="fas fa-user-plus"></i> {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
        <div className="auth-link">
          Already have an account? <Link to="/login">Sign in here</Link>
        </div>
      </div>
    </div>
  );
}