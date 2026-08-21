import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [manifest, setManifest] = useState(null);
  const [recentManifests, setRecentManifests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchCurrentManifest();
    fetchAllManifests();
  }, []);

  const fetchCurrentManifest = async () => {
    try {
      const res = await api.get('/manifests/current');
      setManifest(res.data);
    } catch (err) {
      toast.error('Failed to load manifest');
    }
  };

  const fetchAllManifests = async () => {
    try {
      const res = await api.get('/manifests');
      const sorted = res.data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRecentManifests(sorted);
    } catch (err) {
      console.error('Failed to load manifests:', err);
      toast.error('Failed to load recent manifests');
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // EDIT MANIFEST - Navigate to edit page
  // ============================================
  const handleEditManifest = (manifestId) => {
    navigate(`/edit-manifest/${manifestId}`);
  };

  // ============================================
  // DELETE MANIFEST
  // ============================================
  const handleDeleteManifest = async (manifestId, e) => {
    e.stopPropagation();
    if (!confirm('Delete this manifest and all its shipments?')) return;
    
    try {
      await api.delete(`/manifests/${manifestId}`);
      toast.success('✅ Manifest deleted successfully');
      fetchAllManifests();
      // Reset to first page if current page becomes empty
      if (currentManifests.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      toast.error('Failed to delete manifest');
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>Loading...</div>;
  }

  const totals = manifest?.totals || { totalItems: 0, totalShipments: 0, totalAmount: 0 };

  const totalPages = Math.ceil(recentManifests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentManifests = recentManifests.slice(startIndex, endIndex);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusClass = (status) => {
    const statusMap = {
      'DRAFT': 'badge-status not-loaded',
      'ACTIVE': 'badge-status loaded',
      'DEPARTED': 'badge-status loaded',
      'ARRIVED': 'badge-status paid',
      'CLOSED': 'badge-status paid'
    };
    return statusMap[status] || 'badge-status not-loaded';
  };

  const getStatusText = (status) => {
    const statusMap = {
      'DRAFT': 'Draft',
      'ACTIVE': 'Active',
      'DEPARTED': 'Departed',
      'ARRIVED': 'Arrived',
      'CLOSED': 'Closed'
    };
    return statusMap[status] || status || 'Draft';
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <span className="subtitle">Overview of today's operations</span>
        </div>
        <span style={{ color: '#718096', fontSize: '13px' }}>
          <i className="fas fa-calendar"></i> {new Date().toLocaleDateString()}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="session-stat">
          <div className="number">{totals.totalItems || 0}</div>
          <div className="label">Total Items</div>
        </div>
        <div className="session-stat">
          <div className="number">{totals.totalShipments || 0}</div>
          <div className="label">Total Shipments</div>
        </div>
        <div className="session-stat">
          <div className="number">TZS {totals.totalAmount?.toLocaleString() || 0}</div>
          <div className="label">Total Amount</div>
        </div>
        <div className="session-stat">
          <div className="number">
            {manifest?.shipments?.filter(s => s.status === 'loaded').length || 0}
          </div>
          <div className="label">Loaded</div>
        </div>
      </div>

      {/* Current Session Card */}
      <div className="card">
        <div className="card-header">
          <h3><i className="fas fa-clock"></i> Current Session</h3>
          <button className="btn btn-primary btn-sm" onClick={() => window.location.href = '/manifest'}>
            <i className="fas fa-eye"></i> View Current Manifest
          </button>
        </div>
        <div className="session-summary">
          <div className="session-stat">
            <div className="number">{totals.totalItems || 0}</div>
            <div className="label">Items</div>
          </div>
          <div className="session-stat">
            <div className="number">{totals.totalShipments || 0}</div>
            <div className="label">Shipments</div>
          </div>
          <div className="session-stat">
            <div className="number">TZS {totals.totalAmount?.toLocaleString() || 0}</div>
            <div className="label">Amount</div>
          </div>
          <div className="session-stat">
            <div className="number">
              {manifest?.shipments?.filter(s => s.status === 'loaded').length || 0}/{totals.totalShipments || 0}
            </div>
            <div className="label">Loaded</div>
          </div>
        </div>
      </div>

      {/* Recent Manifests */}
      <div className="card">
        <div className="card-header">
          <h3><i className="fas fa-history"></i> Recent Manifests</h3>
          <span className="badge">Total: {recentManifests.length}</span>
        </div>

        {recentManifests.length === 0 ? (
          <p style={{ color: '#a0aec0', textAlign: 'center', padding: '20px' }}>
            No manifests yet. <Link to="/manifest" style={{ color: '#2b6cb0' }}>Create your first manifest</Link>
          </p>
        ) : (
          <>
            <div className="recent-manifests-list">
              {currentManifests.map((m) => {
                const totalItems = m.totals?.totalItems || 0;
                const totalAmount = m.totals?.totalAmount || 0;
                const shipmentCount = m.totals?.totalShipments || 0;
                
                return (
                  <div key={m._id} className="manifest-summary-card">
                    {/* Clickable area for viewing manifest */}
                    <div 
                      className="manifest-summary-clickable"
                      onClick={() => handleEditManifest(m._id)}
                    >
                      <div className="manifest-summary-header">
                        <span className="manifest-summary-number">{m.manifestNumber || 'MAN-001'}</span>
                        <span className="manifest-summary-plate">{m.truckPlate || 'No Plate'}</span>
                        <span className={getStatusClass(m.status)}>
                          {getStatusText(m.status)}
                        </span>
                      </div>
                      <div className="manifest-summary-details">
                        <span className="manifest-summary-date">
                          <i className="far fa-calendar-alt"></i> {formatDate(m.createdAt || m.manifestDate)}
                        </span>
                        <span className="manifest-summary-shipments">
                          <i className="fas fa-boxes"></i> {shipmentCount} Shipments
                        </span>
                        <span className="manifest-summary-items">
                          <i className="fas fa-cube"></i> {totalItems} Items
                        </span>
                        <span className="manifest-summary-amount">
                          <i className="fas fa-money-bill-wave"></i> TZS {totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="manifest-summary-actions">
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEditManifest(m._id)}
                        title="Edit Manifest"
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={(e) => handleDeleteManifest(m._id, e)}
                        title="Delete Manifest"
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination - Only show if more than 5 manifests */}
            {recentManifests.length > itemsPerPage && (
              <div className="pagination">
                <button 
                  className="pagination-btn" 
                  onClick={prevPage} 
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left"></i> Previous
                </button>
                
                <div className="pagination-info">
                  <span className="pagination-current">{currentPage}</span>
                  <span className="pagination-separator">of</span>
                  <span className="pagination-total">{totalPages}</span>
                </div>
                
                <button 
                  className="pagination-btn" 
                  onClick={nextPage} 
                  disabled={currentPage === totalPages}
                >
                  Next <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="footer">
        © {new Date().getFullYear()} {user?.company || 'Manifest System'}. All rights reserved.
      </div>
    </div>
  );
}