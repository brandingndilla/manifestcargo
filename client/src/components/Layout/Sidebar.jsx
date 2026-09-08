import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCompany } from '../../hooks/useCompany';
import './Sidebar.css';

export default function Sidebar({ isCollapsed, toggleSidebar }) {
  const navigate = useNavigate();
  const companyName = useCompany();
  const [expandedMenus, setExpandedMenus] = useState({
    manifests: true,
    admin: false
  });

  const toggleSubMenu = (key) => {
    setExpandedMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  // Get company initials for avatar
  const getInitials = (name) => {
    if (!name) return 'LC';
    const words = name.split(' ');
    if (words.length === 1) return name.substring(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  const menuItems = [
    {
      label: 'Manifests',
      icon: 'fa-clipboard-list',
      key: 'manifests',
      subItems: [
        { 
          path: '/manifest-manager', 
          label: 'Create Manifest',
          icon: 'fa-plus-circle'
        },
        { 
          path: '/view-manifest', 
          label: 'View Manifests',
          icon: 'fa-eye'
        },
        { 
          path: '/manifest-items', 
          label: 'Manifest Items',
          icon: 'fa-boxes'
        },
      ]
    },
    {
      label: 'Admin',
      icon: 'fa-user-shield',
      key: 'admin',
      subItems: [
        { 
          path: '/admin', 
          label: 'Dashboard',
          icon: 'fa-dashboard'
        },
        { 
          path: '/admin/users', 
          label: 'Manage Users',
          icon: 'fa-users'
        },
        { 
          path: '/admin/settings', 
          label: 'Settings',
          icon: 'fa-cog'
        },
      ]
    },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Brand / Logo */}
      <div className="sidebar-brand-wrapper">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <i className="fas fa-truck"></i>
          </div>
          {!isCollapsed && (
            <div className="brand-text">
              <span className="brand-name">{companyName || 'LogiTrack'}</span>
              <span className="brand-sub">Manifest System</span>
            </div>
          )}
        </div>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </button>
      </div>

      {/* Company Mini Avatar (Collapsed) */}
      {isCollapsed && companyName && (
        <div className="sidebar-company-mini">
          <div className="company-avatar">
            {getInitials(companyName)}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="sidebar-item">
              {item.subItems ? (
                // Menu with sub-items
                <>
                  <div 
                    className={`sidebar-link sidebar-parent ${expandedMenus[item.key] ? 'expanded' : ''}`}
                    onClick={() => !isCollapsed && toggleSubMenu(item.key)}
                  >
                    <i className={`fas ${item.icon}`}></i>
                    {!isCollapsed && (
                      <>
                        <span className="menu-label">{item.label}</span>
                        <i className={`fas fa-chevron-${expandedMenus[item.key] ? 'down' : 'right'} sub-arrow`}></i>
                      </>
                    )}
                  </div>
                  {!isCollapsed && expandedMenus[item.key] && (
                    <ul className="sidebar-submenu">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex} className="sidebar-subitem">
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) => 
                              `sidebar-link sidebar-sublink ${isActive ? 'active' : ''}`
                            }
                          >
                            <i className={`fas ${subItem.icon || 'fa-circle'} sub-dot`}></i>
                            <span>{subItem.label}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                // Single menu item
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                >
                  <i className={`fas ${item.icon}`}></i>
                  {!isCollapsed && <span className="menu-label">{item.label}</span>}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer / User Info & Logout */}
      <div className="sidebar-footer">
        {!isCollapsed && companyName && (
          <div className="sidebar-user-info">
            <div className="user-avatar">
              {getInitials(companyName)}
            </div>
            <div className="user-details">
              <span className="user-name">{companyName}</span>
              <span className="user-role">Company</span>
            </div>
          </div>
        )}
        <button className="sidebar-link logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}