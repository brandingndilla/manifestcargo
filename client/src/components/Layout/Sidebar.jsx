import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      toast.success('Logged out');
      navigate('/login');
    }
  };

  const closeSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar && overlay) {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    }
  };

  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-brand">
        <div className="brand-text">
          <i className="fas fa-truck"></i>
          <span>{user?.company || 'Manifest'}</span>
        </div>
        <div className="brand-sub">Cargo Management System</div>
      </div>

      <nav>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeSidebar}>
          <i className="fas fa-th-large"></i> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/manifest" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeSidebar}>
          <i className="fas fa-clipboard-list"></i> <span>Manifest Manager</span>
        </NavLink>
        <NavLink to="/manifest-items" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeSidebar}>
          <i className="fas fa-boxes"></i> <span>Manifest Items</span>
        </NavLink>
        <NavLink to="/view-manifest" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeSidebar}>
          <i className="fas fa-eye"></i> <span>View Manifest</span>
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeSidebar}>
          <i className="fas fa-file-alt"></i> <span>Reports</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="logout-btn-sidebar" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
}