import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending'); // 'pending' | 'approved' | 'rejected' | 'all'
  const [actionLoadingId, setActionLoadingId] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      toast.error('Admin access required');
      navigate('/manifest-manager');
      return;
    }
    if (!authLoading && isAdmin) {
      fetchUsers();
    }
  }, [authLoading, isAdmin]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Fetch users error:', err);
      toast.error(err.response?.data?.error || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id, name) => {
    setActionLoadingId(id);
    try {
      await api.put(`/admin/users/${id}/approve`);
      toast.success(`${name} approved`);
      setUsers(prev => prev.map(u => u._id === id ? { ...u, status: 'approved' } : u));
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to approve user');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (id, name) => {
    if (!confirm(`Reject access for ${name}?`)) return;
    setActionLoadingId(id);
    try {
      await api.put(`/admin/users/${id}/reject`);
      toast.success(`${name} rejected`);
      setUsers(prev => prev.map(u => u._id === id ? { ...u, status: 'rejected' } : u));
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to reject user');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Stats are computed from the full `users` list, not the filtered view,
  // so the counts stay visible and accurate no matter which tab is active.
  const nonAdminUsers = users.filter(u => u.role !== 'admin');
  const pendingCount = nonAdminUsers.filter(u => u.status === 'pending').length;
  const approvedCount = nonAdminUsers.filter(u => u.status === 'approved').length;
  const rejectedCount = nonAdminUsers.filter(u => u.status === 'rejected').length;

  const filteredUsers = filter === 'all' ? users : users.filter(u => u.status === filter);

  if (authLoading || loading) {
    return <div className="admin-page-loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard-page">
      <div className="admin-header">
        <div className="admin-header-title">
          <h2><i className="fas fa-user-shield"></i> Admin Dashboard</h2>
          <span className="admin-header-subtitle">Manage user access requests</span>
        </div>
      </div>

      {/* Persistent stats bar - always visible regardless of active tab */}
      <div className="stats-bar">
        <div className="stat-card stat-pending">
          <span className="stat-number">{pendingCount}</span>
          <span className="stat-label"><i className="fas fa-clock"></i> Pending</span>
        </div>
        <div className="stat-card stat-approved">
          <span className="stat-number">{approvedCount}</span>
          <span className="stat-label"><i className="fas fa-check-circle"></i> Approved</span>
        </div>
        <div className="stat-card stat-rejected">
          <span className="stat-number">{rejectedCount}</span>
          <span className="stat-label"><i className="fas fa-times-circle"></i> Rejected</span>
        </div>
        <div className="stat-card stat-total">
          <span className="stat-number">{nonAdminUsers.length}</span>
          <span className="stat-label"><i className="fas fa-users"></i> Total Users</span>
        </div>
      </div>

      <div className="admin-filters">
        {['pending', 'approved', 'rejected', 'all'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filteredUsers.length === 0 ? (
        <div className="admin-empty-state">
          <i className="fas fa-users"></i>
          <p>No {filter !== 'all' ? filter : ''} users found.</p>
        </div>
      ) : (
        <div className="users-list">
          {filteredUsers.map(u => (
            <div key={u._id} className="user-card">
              <div className="user-card-top">
                <span className="user-name">{u.name}</span>
                <div className="user-badges">
                  <span className={`status-pill status-${u.status}`}>{u.status}</span>
                  {u.role === 'admin' && <span className="role-pill">admin</span>}
                </div>
              </div>

              <div className="user-details">
                <span><i className="fas fa-envelope"></i> {u.email}</span>
                <span><i className="fas fa-building"></i> {u.company}</span>
                <span><i className="fas fa-phone"></i> {u.companyPhone}</span>
              </div>

              {u.role !== 'admin' && (
                <div className="user-actions">
                  {/* Both buttons always render so the admin can change a decision later.
                      Whichever matches the current status stays visually "active" (filled),
                      the other stays outlined - this is the permanent record of the action taken. */}
                  <button
                    className={`btn-approve ${u.status === 'approved' ? 'is-active' : ''}`}
                    disabled={actionLoadingId === u._id}
                    onClick={() => handleApprove(u._id, u.name)}
                  >
                    <i className="fas fa-check"></i> {u.status === 'approved' ? 'Approved' : 'Approve'}
                  </button>
                  <button
                    className={`btn-reject ${u.status === 'rejected' ? 'is-active' : ''}`}
                    disabled={actionLoadingId === u._id}
                    onClick={() => handleReject(u._id, u.name)}
                  >
                    <i className="fas fa-times"></i> {u.status === 'rejected' ? 'Rejected' : 'Reject'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`
        .admin-page-loading {
          text-align: center;
          padding: 60px;
          color: #718096;
        }

        .admin-dashboard-page {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px 24px;
          min-height: 100vh;
          background: #f0f4f8;
        }

        .admin-header {
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 2px solid #e8ecf0;
        }

        .admin-header-title h2 {
          font-size: 20px;
          font-weight: 700;
          color: #0a1628;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .admin-header-subtitle {
          color: #718096;
          font-size: 13px;
          display: block;
          margin-top: 2px;
        }

        /* ===== PERSISTENT STATS BAR ===== */
        .stats-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }

        .stat-card {
          background: white;
          border-radius: 10px;
          padding: 14px 16px;
          border: 1px solid #e8ecf0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-number {
          font-size: 26px;
          font-weight: 800;
          color: #0a1628;
        }

        .stat-label {
          font-size: 12px;
          font-weight: 600;
          color: #718096;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .stat-pending .stat-number { color: #856404; }
        .stat-approved .stat-number { color: #155724; }
        .stat-rejected .stat-number { color: #721c24; }
        .stat-total .stat-number { color: #0a1628; }

        .stat-pending { border-left: 4px solid #ffc107; }
        .stat-approved { border-left: 4px solid #28a745; }
        .stat-rejected { border-left: 4px solid #e53e3e; }
        .stat-total { border-left: 4px solid #0a1628; }

        .admin-filters {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 8px 16px;
          background: white;
          border: 1.5px solid #e2e8f0;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          background: #f7fafc;
        }

        .filter-btn.active {
          background: #0a1628;
          border-color: #0a1628;
          color: white;
        }

        .admin-empty-state {
          text-align: center;
          color: #a0aec0;
          padding: 60px 20px;
        }

        .admin-empty-state i {
          font-size: 40px;
          display: block;
          margin-bottom: 10px;
        }

        .users-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* ===== USER CARD ===== */
        .user-card {
          background: white;
          border-radius: 10px;
          padding: 16px 18px;
          border: 1px solid #e8ecf0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .user-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
          flex-wrap: wrap;
        }

        .user-name {
          font-size: 15px;
          font-weight: 700;
          color: #0a1628;
        }

        .user-badges {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .status-pill {
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .status-pill.status-pending {
          background: #fff3cd;
          color: #856404;
        }

        .status-pill.status-approved {
          background: #d4edda;
          color: #155724;
        }

        .status-pill.status-rejected {
          background: #f8d7da;
          color: #721c24;
        }

        .role-pill {
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          background: #e0e7ff;
          color: #3730a3;
          white-space: nowrap;
        }

        .user-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 12.5px;
          color: #4a5568;
          background: #f7fafc;
          border-radius: 8px;
          padding: 10px 12px;
        }

        .user-details span {
          display: flex;
          align-items: center;
          gap: 8px;
          word-break: break-word;
        }

        .user-details i {
          width: 14px;
          color: #a0aec0;
          flex-shrink: 0;
        }

        .user-actions {
          display: flex;
          gap: 8px;
        }

        .btn-approve, .btn-reject {
          flex: 1;
          padding: 9px 14px;
          border: 1.5px solid transparent;
          border-radius: 8px;
          font-weight: 600;
          font-size: 12.5px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .btn-approve:disabled, .btn-reject:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Inactive (not the current status) - outlined, muted */
        .btn-approve {
          background: white;
          border-color: #d4edda;
          color: #2f855a;
        }
        .btn-approve:hover:not(:disabled) {
          background: #f0fff4;
        }

        .btn-reject {
          background: white;
          border-color: #f8d7da;
          color: #c53030;
        }
        .btn-reject:hover:not(:disabled) {
          background: #fff5f5;
        }

        /* Active (matches current status) - solid filled, stays this way permanently */
        .btn-approve.is-active {
          background: #28a745;
          border-color: #28a745;
          color: white;
        }
        .btn-approve.is-active:hover:not(:disabled) {
          background: #218838;
        }

        .btn-reject.is-active {
          background: #e53e3e;
          border-color: #e53e3e;
          color: white;
        }
        .btn-reject.is-active:hover:not(:disabled) {
          background: #c53030;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 700px) {
          .stats-bar {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .admin-dashboard-page {
            padding: 14px 12px;
          }

          .admin-header-title h2 {
            font-size: 17px;
          }

          .stats-bar {
            gap: 8px;
            margin-bottom: 16px;
          }

          .stat-card {
            padding: 10px 12px;
          }

          .stat-number {
            font-size: 20px;
          }

          .stat-label {
            font-size: 10px;
          }

          .admin-filters {
            gap: 6px;
          }

          .filter-btn {
            padding: 6px 12px;
            font-size: 12px;
            flex: 1 1 auto;
            text-align: center;
          }

          .user-card {
            padding: 12px 14px;
          }

          .user-card-top {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }

          .user-name {
            font-size: 14px;
          }

          .user-details {
            font-size: 12px;
          }

          .user-actions {
            flex-direction: row;
          }

          .btn-approve, .btn-reject {
            font-size: 12px;
            padding: 10px 8px;
          }
        }

        @media (max-width: 380px) {
          .stats-bar {
            grid-template-columns: 1fr 1fr;
          }

          .btn-approve span, .btn-reject span {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}