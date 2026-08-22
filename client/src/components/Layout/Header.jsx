import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCompany } from '../../hooks/useCompany';

export default function Header() {
  const { logout, isAdmin } = useAuth();
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
          {isAdmin && (
            <Link to="/admin" className="btn-admin">
              <i className="fas fa-user-shield"></i> Admin
            </Link>
          )}
          <button onClick={handleLogout} className="btn-logout">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>

      <style>{`
        .btn-admin {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: #e0e7ff;
          color: #3730a3;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          text-decoration: none;
          margin-right: 10px;
          transition: all 0.2s ease;
        }

        .btn-admin:hover {
          background: #c7d2fe;
        }
      `}</style>
    </header>
  );
}