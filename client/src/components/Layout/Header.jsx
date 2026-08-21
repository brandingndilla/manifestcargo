import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCompany } from '../../hooks/useCompany';

export default function Header() {
  const { logout } = useAuth();
  const companyName = useCompany();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <Link to="/manifest" className="header-logo">
            <i className="fas fa-truck"></i>
            <span>{companyName}</span>
          </Link>
        </div>
        <div className="header-right">
          <button onClick={handleLogout} className="btn-logout">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
    </header>
  );
}