import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');

  useEffect(() => {
    const storedCompany = localStorage.getItem('companyName');
    if (storedCompany) setCompanyName(storedCompany);

    const storedPhone = localStorage.getItem('companyPhone');
    if (storedPhone) setCompanyPhone(storedPhone);

    if (token) {
      api.defaults.headers.common['x-auth-token'] = token;
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const res = await api.get('/auth/me');
      setUser(res.data);
      if (res.data.company) {
        setCompanyName(res.data.company);
        localStorage.setItem('companyName', res.data.company);
      }
      if (res.data.companyPhone !== undefined) {
        setCompanyPhone(res.data.companyPhone);
        localStorage.setItem('companyPhone', res.data.companyPhone);
      }
    } catch (err) {
      console.error('Error loading user:', err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      api.defaults.headers.common['x-auth-token'] = token;
      setToken(token);
      setUser(user);

      if (user.company) {
        setCompanyName(user.company);
        localStorage.setItem('companyName', user.company);
      }
      if (user.companyPhone) {
        setCompanyPhone(user.companyPhone);
        localStorage.setItem('companyPhone', user.companyPhone);
      }

      return user;
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };

  // NOTE: Registration no longer logs the user in automatically.
  // The backend now returns { message: '...' } instead of { token, user },
  // because new accounts start as "pending" and need admin approval
  // before they can log in. This function just forwards that message
  // back to the caller (e.g. Register.js) to display to the user.
  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      return res.data; // { message: 'Registration successful! Your account is pending admin approval.' }
    } catch (err) {
      console.error('Register error:', err);
      throw err;
    }
  };

  const updateProfile = async ({ companyPhone: newPhone }) => {
    try {
      const res = await api.put('/auth/profile', { companyPhone: newPhone });
      setCompanyPhone(res.data.user.companyPhone);
      localStorage.setItem('companyPhone', res.data.user.companyPhone);
      return res.data.user;
    } catch (err) {
      console.error('Update profile error:', err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('companyName');
    localStorage.removeItem('companyPhone');
    delete api.defaults.headers.common['x-auth-token'];
    setToken(null);
    setUser(null);
    setCompanyName('');
    setCompanyPhone('');
  };

  const value = {
    user,
    token,
    loading,
    companyName,
    companyPhone,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!token,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;