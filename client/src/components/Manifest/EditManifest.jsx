import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import toast from 'react-hot-toast';

export default function EditManifest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [manifest, setManifest] = useState(null);
  
  // Manifest Details
  const [truckPlate, setTruckPlate] = useState('');
  const [driverName, setDriverName] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [manifestDate, setManifestDate] = useState('');
  
  // Shipments
  const [shipments, setShipments] = useState([]);
  const [editingShipmentIndex, setEditingShipmentIndex] = useState(null);
  const [showAddShipment, setShowAddShipment] = useState(false);
  
  // New Shipment Form
  const [newShipment, setNewShipment] = useState({
    sender: '',
    customer: '',
    phone: '',
    destination: '',
    items: [{ name: '', qty: '', rate: '' }],
    payment: false,
    status: false
  });

  useEffect(() => {
    // Check if id exists, if not redirect
    if (!id) {
      toast.error('Invalid manifest ID');
      navigate('/manifest-manager');
      return;
    }
    fetchManifest();
  }, [id, navigate]);

  const fetchManifest = async () => {
    try {
      const res = await api.get(`/manifests/${id}`);
      const data = res.data;
      setManifest(data);
      setTruckPlate(data.truckPlate || '');
      setDriverName(data.driverName || '');
      setSupervisor(data.supervisor || '');
      setManifestDate(data.manifestDate ? new Date(data.manifestDate).toISOString().split('T')[0] : '');
      setShipments(data.shipments || []);
    } catch (err) {
      toast.error('Failed to load manifest');
      navigate('/manifest-manager');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveManifest = async () => {
    if (!truckPlate.trim()) {
      toast.error('Please enter a truck plate number');
      return;
    }

    setSaving(true);
    try {
      await api.put(`/manifests/${id}`, {
        truckPlate: truckPlate.toUpperCase(),
        driverName: driverName.toUpperCase(),
        supervisor: supervisor.toUpperCase(),
        manifestDate: manifestDate,
        status: 'ACTIVE'
      });

      toast.success('Manifest updated successfully!');
      // Navigate to view manifest page to see the updated data immediately
      navigate(`/view-manifest/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update manifest');
    } finally {
      setSaving(false);
    }
  };

  const handleAddShipment = async () => {
    const sender = newShipment.sender || '';
    const customer = newShipment.customer || '';
    const phone = newShipment.phone || '';
    const destination = newShipment.destination || '';
    const items = newShipment.items || [];
    const payment = newShipment.payment || false;
    const status = newShipment.status || false;
    
    if (!sender.trim() || !customer.trim() || !destination.trim()) {
      toast.error('Please fill in Sender, Customer, and Destination');
      return;
    }

    const validItems = items.filter(item => item.name && item.name.trim() && item.qty && item.rate);
    if (validItems.length === 0) {
      toast.error('Please add at least one valid item');
      return;
    }

    try {
      // Calculate totals for items
      const processedItems = validItems.map(item => ({
        name: item.name.toUpperCase().trim(),
        qty: parseInt(item.qty),
        rate: parseFloat(item.rate),
        total: parseInt(item.qty) * parseFloat(item.rate)
      }));

      // Calculate total for the shipment
      const totalAmount = processedItems.reduce((sum, item) => sum + item.total, 0);

      const shipmentData = {
        sender: sender.toUpperCase().trim(),
        customer: customer.toUpperCase().trim(),
        phone: phone || '',
        destination: destination.toUpperCase().trim(),
        items: processedItems,
        payment: payment ? 'paid' : 'unpaid',
        status: status ? 'loaded' : 'not-loaded',
        manifestId: id,
        total: totalAmount
      };

      const res = await api.post('/shipments', shipmentData);
      
      // Ensure the response has the total
      const newShipmentData = {
        ...res.data,
        total: res.data.total || totalAmount
      };
      
      setShipments([...shipments, newShipmentData]);
      setShowAddShipment(false);
      setNewShipment({
        sender: '',
        customer: '',
        phone: '',
        destination: '',
        items: [{ name: '', qty: '', rate: '' }],
        payment: false,
        status: false
      });
      toast.success('Shipment added successfully!');
      
      // Refresh the manifest data to update totals
      fetchManifest();
    } catch (err) {
      console.error('Add shipment error:', err);
      toast.error(err.response?.data?.error || 'Failed to add shipment');
    }
  };

  const handleDeleteShipment = async (shipmentId, index) => {
    if (!confirm('Delete this shipment?')) return;
    
    try {
      await api.delete(`/shipments/${shipmentId}`);
      const updatedShipments = shipments.filter((_, i) => i !== index);
      setShipments(updatedShipments);
      toast.success('Shipment deleted successfully');
      
      // Refresh the manifest data to update totals
      fetchManifest();
    } catch (err) {
      toast.error('Failed to delete shipment');
    }
  };

  const handleEditShipment = (index) => {
    setEditingShipmentIndex(index);
    const shipment = shipments[index];
    setNewShipment({
      sender: shipment.sender || '',
      customer: shipment.customer || '',
      phone: shipment.phone || '',
      destination: shipment.destination || '',
      items: shipment.items ? shipment.items.map(item => ({
        name: item.name || '',
        qty: item.qty || '',
        rate: item.rate || ''
      })) : [{ name: '', qty: '', rate: '' }],
      payment: shipment.payment === 'paid',
      status: shipment.status === 'loaded'
    });
    setShowAddShipment(true);
  };

  const handleUpdateShipment = async () => {
    const sender = newShipment.sender || '';
    const customer = newShipment.customer || '';
    const phone = newShipment.phone || '';
    const destination = newShipment.destination || '';
    const items = newShipment.items || [];
    const payment = newShipment.payment || false;
    const status = newShipment.status || false;
    
    if (!sender.trim() || !customer.trim() || !destination.trim()) {
      toast.error('Please fill in Sender, Customer, and Destination');
      return;
    }

    const validItems = items.filter(item => item.name && item.name.trim() && item.qty && item.rate);
    if (validItems.length === 0) {
      toast.error('Please add at least one valid item');
      return;
    }

    try {
      const shipment = shipments[editingShipmentIndex];
      
      // Calculate totals for items
      const processedItems = validItems.map(item => ({
        name: item.name.toUpperCase().trim(),
        qty: parseInt(item.qty),
        rate: parseFloat(item.rate),
        total: parseInt(item.qty) * parseFloat(item.rate)
      }));

      // Calculate total for the shipment
      const totalAmount = processedItems.reduce((sum, item) => sum + item.total, 0);

      const shipmentData = {
        sender: sender.toUpperCase().trim(),
        customer: customer.toUpperCase().trim(),
        phone: phone || '',
        destination: destination.toUpperCase().trim(),
        items: processedItems,
        payment: payment ? 'paid' : 'unpaid',
        status: status ? 'loaded' : 'not-loaded',
        total: totalAmount
      };

      const res = await api.put(`/shipments/${shipment._id}`, shipmentData);
      
      // Create updated shipment with ALL data from response and ensure total is set
      const updatedShipment = {
        ...res.data,
        _id: shipment._id,
        total: res.data.total || totalAmount
      };
      
      // Update the state with the new shipment data
      const updatedShipments = shipments.map((ship, idx) => {
        if (idx === editingShipmentIndex) {
          return updatedShipment;
        }
        return ship;
      });
      
      setShipments(updatedShipments);
      
      // Reset form and close modal
      setShowAddShipment(false);
      setEditingShipmentIndex(null);
      setNewShipment({
        sender: '',
        customer: '',
        phone: '',
        destination: '',
        items: [{ name: '', qty: '', rate: '' }],
        payment: false,
        status: false
      });
      
      toast.success('Shipment updated successfully!');
      
      // Refresh the manifest data to update totals
      fetchManifest();
    } catch (err) {
      console.error('Update shipment error:', err);
      toast.error(err.response?.data?.error || 'Failed to update shipment');
    }
  };

  const addItemRow = () => {
    setNewShipment({
      ...newShipment,
      items: [...newShipment.items, { name: '', qty: '', rate: '' }]
    });
  };

  const removeItemRow = (index) => {
    if (newShipment.items.length === 1) {
      toast.error('You need at least one item');
      return;
    }
    const updatedItems = newShipment.items.filter((_, i) => i !== index);
    setNewShipment({ ...newShipment, items: updatedItems });
  };

  const updateItemRow = (index, field, value) => {
    const updatedItems = newShipment.items.map((item, i) => {
      if (i === index) {
        const updated = { ...item, [field]: value };
        if (field === 'qty' || field === 'rate') {
          const qty = parseFloat(updated.qty) || 0;
          const rate = parseFloat(updated.rate) || 0;
          updated.total = qty * rate;
        }
        return updated;
      }
      return item;
    });
    setNewShipment({ ...newShipment, items: updatedItems });
  };

  const toUpperCase = (value) => value ? value.toUpperCase() : '';

  const togglePaymentStatus = () => {
    setNewShipment({ ...newShipment, payment: !newShipment.payment });
  };

  const toggleLoadingStatus = () => {
    setNewShipment({ ...newShipment, status: !newShipment.status });
  };

  // Show loading state while checking id or fetching data
  if (!id) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Invalid manifest ID. Redirecting...</div>;
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  return (
    <div className="edit-manifest-page">
      {/* Page Header */}
      <div className="view-page-header">
        <div className="view-header-left">
          <button className="view-back-btn" onClick={() => navigate('/manifest-manager')}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="view-header-title">
            <h2>Edit Manifest</h2>
            <span className="view-header-subtitle">Modify manifest details and manage shipments</span>
          </div>
        </div>
        {/* PC View - Update Manifest button on right */}
        <div className="header-right desktop-only">
          <button 
            className="btn-update" 
            onClick={handleSaveManifest}
            disabled={saving}
          >
            <i className="fas fa-save"></i> {saving ? 'Updating...' : 'Update Manifest'}
          </button>
        </div>
      </div>

      {/* Manifest Details */}
      <div className="card">
        <div className="card-header">
          <h3><i className="fas fa-clipboard-list"></i> Manifest Details</h3>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Date</label>
            <input 
              type="date" 
              value={manifestDate} 
              onChange={(e) => setManifestDate(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Truck Plate <span className="required">*</span></label>
            <input 
              type="text" 
              value={truckPlate} 
              onChange={(e) => setTruckPlate(toUpperCase(e.target.value))} 
              placeholder="T 123 ABC"
            />
          </div>
          <div className="form-group">
            <label>Driver Name</label>
            <input 
              type="text" 
              value={driverName} 
              onChange={(e) => setDriverName(toUpperCase(e.target.value))} 
              placeholder="Enter driver name"
            />
          </div>
          <div className="form-group">
            <label>Supervisor</label>
            <input 
              type="text" 
              value={supervisor} 
              onChange={(e) => setSupervisor(toUpperCase(e.target.value))} 
              placeholder="Enter supervisor name"
            />
          </div>
        </div>
      </div>

      {/* Shipments */}
      <div className="card">
        <div className="card-header">
          <h3 className="shipments-title">Shipments</h3>
          <div className="card-actions">
            <span className="badge">{shipments.length}</span>
          </div>
        </div>

        {/* Shipments List */}
        {shipments.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-inbox"></i>
            <p>No shipments yet.</p>
          </div>
        ) : (
          <div className="shipments-list">
            {shipments.map((shipment, index) => (
              <div key={shipment._id || index} className="shipment-item">
                <div className="shipment-header">
                  <div className="shipment-customer">
                    <span className="customer-name">{shipment.customer || '—'}</span>
                    <div className="shipment-status">
                      <span className={`status-badge ${shipment.status === 'loaded' ? 'loaded' : 'not-loaded'}`}>
                        <i className={`fas ${shipment.status === 'loaded' ? 'fa-check-circle' : 'fa-clock'}`}></i>
                        {shipment.status === 'loaded' ? 'Loaded' : 'Not Loaded'}
                      </span>
                      <span className={`payment-badge ${shipment.payment === 'paid' ? 'paid' : 'unpaid'}`}>
                        <i className={`fas ${shipment.payment === 'paid' ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                        {shipment.payment === 'paid' ? 'Paid' : 'Unpaid'}
                      </span>
                    </div>
                  </div>
                  <div className="shipment-actions">
                    <button 
                      className="icon-btn edit-btn"
                      onClick={() => handleEditShipment(index)}
                      title="Edit Shipment"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="icon-btn delete-btn"
                      onClick={() => handleDeleteShipment(shipment._id, index)}
                      title="Delete Shipment"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                <div className="shipment-details">
                  <div className="detail-row">
                    <span className="label">Sender:</span>
                    <span className="value">{shipment.sender || '—'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Phone:</span>
                    <span className="value">{shipment.phone || '—'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Destination:</span>
                    <span className="value">{shipment.destination || '—'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Items:</span>
                    <span className="value">
                      {shipment.items?.map((item, idx) => (
                        <span key={idx}>
                          {idx > 0 && ', '}
                          {item.name} ({item.qty} × {item.rate})
                        </span>
                      )) || '—'}
                    </span>
                  </div>
                  <div className="detail-row total-row">
                    <span className="label">Total:</span>
                    <span className="value">TZS {shipment.total?.toLocaleString() || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile View - Update Manifest button at bottom */}
      <div className="mobile-update-btn mobile-only">
        <button 
          className="btn-update-full" 
          onClick={handleSaveManifest}
          disabled={saving}
        >
          <i className="fas fa-save"></i> {saving ? 'Updating...' : 'Update Manifest'}
        </button>
      </div>

      {/* Add/Edit Shipment Modal */}
      {showAddShipment && (
        <div className="modal-overlay" onClick={() => {
          setShowAddShipment(false);
          setEditingShipmentIndex(null);
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <i className="fas fa-box" style={{ color: '#4da6ff' }}></i>
                {editingShipmentIndex !== null ? 'Edit Shipment' : 'Add Shipment'}
              </h3>
              <button className="modal-close" onClick={() => {
                setShowAddShipment(false);
                setEditingShipmentIndex(null);
              }}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Sender <span className="required">*</span></label>
                  <input 
                    type="text" 
                    value={newShipment.sender} 
                    onChange={(e) => setNewShipment({ ...newShipment, sender: toUpperCase(e.target.value) })} 
                    placeholder="Enter sender name"
                  />
                </div>
                <div className="form-group">
                  <label>Customer <span className="required">*</span></label>
                  <input 
                    type="text" 
                    value={newShipment.customer} 
                    onChange={(e) => setNewShipment({ ...newShipment, customer: toUpperCase(e.target.value) })} 
                    placeholder="Enter customer name"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input 
                    type="text" 
                    value={newShipment.phone} 
                    onChange={(e) => setNewShipment({ ...newShipment, phone: e.target.value })} 
                    placeholder="255 7XX 000 000"
                  />
                </div>
                <div className="form-group">
                  <label>Destination <span className="required">*</span></label>
                  <input 
                    type="text" 
                    value={newShipment.destination} 
                    onChange={(e) => setNewShipment({ ...newShipment, destination: toUpperCase(e.target.value) })} 
                    placeholder="Enter destination"
                  />
                </div>
              </div>

              {/* Toggle Switches - 2 columns on mobile */}
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-label-wrapper">
                    <span className="toggle-status-label">Payment Status</span>
                    <div 
                      className={`toggle-switch ${newShipment.payment ? 'active' : ''}`}
                      onClick={togglePaymentStatus}
                    >
                      <span className="toggle-track">
                        <span className="toggle-thumb"></span>
                      </span>
                      <span className="toggle-label-text">
                        {newShipment.payment ? 'Paid' : 'Unpaid'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="toggle-item">
                  <div className="toggle-label-wrapper">
                    <span className="toggle-status-label">Loaded Status</span>
                    <div 
                      className={`toggle-switch ${newShipment.status ? 'active' : ''}`}
                      onClick={toggleLoadingStatus}
                    >
                      <span className="toggle-track">
                        <span className="toggle-thumb"></span>
                      </span>
                      <span className="toggle-label-text">
                        {newShipment.status ? 'Loaded' : 'Not Loaded'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="items-section">
                <div className="items-header">
                  <label><i className="fas fa-list"></i> Items</label>
                  <span className="add-item-link" onClick={addItemRow}>
                    <i className="fas fa-plus-circle"></i> Add Item
                  </span>
                </div>
                {newShipment.items.map((item, index) => (
                  <div key={index} className="item-row">
                    <div className="item-fields">
                      <div className="item-field">
                        <label>Item Name</label>
                        <input 
                          type="text" 
                          value={item.name} 
                          onChange={(e) => updateItemRow(index, 'name', toUpperCase(e.target.value))} 
                          placeholder="Item name"
                        />
                      </div>
                      <div className="item-field">
                        <label>Qty</label>
                        <input 
                          type="number" 
                          value={item.qty} 
                          onChange={(e) => updateItemRow(index, 'qty', e.target.value)} 
                          placeholder="0"
                          min="0"
                        />
                      </div>
                      <div className="item-field">
                        <label>Rate</label>
                        <input 
                          type="number" 
                          value={item.rate} 
                          onChange={(e) => updateItemRow(index, 'rate', e.target.value)} 
                          placeholder="0"
                          min="0"
                        />
                      </div>
                      <div className="item-field">
                        <label>Total</label>
                        <input 
                          type="text" 
                          value={(parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0)} 
                          readOnly 
                          className="total-input"
                        />
                      </div>
                      <div className="item-field item-delete">
                        <label>&nbsp;</label>
                        <span className="delete-icon" onClick={() => removeItemRow(index)}>
                          <i className="fas fa-trash-alt"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => {
                setShowAddShipment(false);
                setEditingShipmentIndex(null);
              }}>
                Cancel
              </button>
              <button 
                className="btn-save-shipment" 
                onClick={editingShipmentIndex !== null ? handleUpdateShipment : handleAddShipment}
              >
                <i className="fas fa-check"></i> 
                {editingShipmentIndex !== null ? 'Update Shipment' : 'Add Shipment'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* ===== PAGE STYLES ===== */
        .edit-manifest-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 24px;
          min-height: 100vh;
          background: #f0f4f8;
        }

        /* ===== PAGE HEADER ===== */
        .view-page-header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 2px solid #e8ecf0;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .view-header-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .view-back-btn {
          background: none;
          border: none;
          font-size: 20px;
          color: #0a1628;
          cursor: pointer;
          padding: 6px 10px;
          border-radius: 8px;
          transition: 0.3s;
        }

        .view-back-btn:hover {
          background: #e8ecf0;
        }

        .view-header-title h2 {
          font-size: 20px;
          font-weight: 700;
          color: #0a1628;
          margin: 0;
        }

        .view-header-subtitle {
          color: #718096;
          font-size: 13px;
          display: block;
          margin-top: 2px;
        }

        .header-right {
          display: flex;
          gap: 10px;
        }

        .desktop-only {
          display: block;
        }

        .mobile-only {
          display: none;
        }

        .btn-update {
          padding: 10px 24px;
          background: #0a1628;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-update:hover:not(:disabled) {
          background: #1a2a4a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(10, 22, 40, 0.25);
        }

        .btn-update:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-update-full {
          padding: 12px 24px;
          background: #0a1628;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
        }

        .btn-update-full:hover:not(:disabled) {
          background: #1a2a4a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(10, 22, 40, 0.25);
        }

        .btn-update-full:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* ===== CARDS ===== */
        .card {
          background: white;
          border-radius: 10px;
          padding: 18px 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          margin-bottom: 16px;
          border: 1px solid #e8ecf0;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 8px;
        }

        .card-header h3 {
          font-size: 15px;
          font-weight: 600;
          color: #0a1628;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .card-header h3 i {
          color: #4a5568;
        }

        .shipments-title {
          font-size: 15px;
          font-weight: 600;
          color: #0a1628;
          margin: 0;
        }

        .card-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .badge {
          background: #e8edf5;
          color: #0a1628;
          padding: 2px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          min-width: 28px;
          text-align: center;
        }

        /* ===== FORM ROWS ===== */
        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
          margin-bottom: 0;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          font-size: 11px;
          margin-bottom: 4px;
          color: #4a5568;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .form-group label .required {
          color: #e74c3c;
        }

        .form-group input {
          width: 100%;
          padding: 8px 12px;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          font-size: 13px;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
          background: white;
          color: #2d3748;
        }

        .form-group input:focus {
          outline: none;
          border-color: #4da6ff;
          box-shadow: 0 0 0 3px rgba(77, 166, 255, 0.1);
        }

        .form-group input::placeholder {
          color: #a0aec0;
          font-size: 13px;
        }

        /* ===== TOGGLE SWITCHES ===== */
        .toggle-group {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-top: 12px;
          padding: 12px 16px;
          background: #f7fafc;
          border-radius: 10px;
          flex-wrap: wrap;
        }

        .toggle-item {
          display: flex;
          align-items: center;
          flex: 1 1 0;
          min-width: 0;
        }

        .toggle-label-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          width: 100%;
        }

        .toggle-status-label {
          font-size: 10px;
          font-weight: 600;
          color: #4a5568;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .toggle-switch {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
          padding: 4px 12px;
          border-radius: 20px;
          transition: all 0.2s;
          border: 1px solid transparent;
          width: 100%;
        }

        .toggle-switch:hover {
          background: #edf2f7;
        }

        .toggle-track {
          display: inline-block;
          width: 40px;
          height: 22px;
          background: #cbd5e0;
          border-radius: 22px;
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .toggle-thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 18px;
          height: 18px;
          background: white;
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        .toggle-label-text {
          font-size: 13px;
          font-weight: 600;
          color: #4a5568;
          transition: all 0.3s;
          white-space: nowrap;
          min-width: 60px;
        }

        .toggle-switch.active .toggle-track {
          background: #2ecc71;
        }

        .toggle-switch.active .toggle-thumb {
          transform: translateX(18px);
        }

        .toggle-switch.active .toggle-label-text {
          color: #155724;
        }

        .toggle-item:nth-child(2) .toggle-switch.active .toggle-track {
          background: #4da6ff;
        }

        .toggle-item:nth-child(2) .toggle-switch.active .toggle-label-text {
          color: #0c5460;
        }

        /* ===== SHIPMENTS LIST ===== */
        .shipments-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .shipment-item {
          background: #f7fafc;
          border-radius: 8px;
          padding: 12px 14px;
          border: 1px solid #edf2f7;
        }

        .shipment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .shipment-customer {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .customer-name {
          font-size: 15px;
          font-weight: 600;
          color: #0a1628;
        }

        .shipment-status {
          display: flex;
          gap: 6px;
        }

        .status-badge,
        .payment-badge {
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 9px;
          font-weight: 600;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .status-badge i,
        .payment-badge i {
          font-size: 10px;
        }

        .status-badge.loaded {
          background: #d1ecf1;
          color: #0c5460;
        }

        .status-badge.not-loaded {
          background: #e2e8f0;
          color: #4a5568;
        }

        .payment-badge.paid {
          background: #d4edda;
          color: #155724;
        }

        .payment-badge.unpaid {
          background: #f8d7da;
          color: #721c24;
        }

        .shipment-actions {
          display: flex;
          gap: 6px;
        }

        .icon-btn {
          width: 30px;
          height: 30px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-size: 13px;
        }

        .icon-btn.edit-btn {
          background: #ebf8ff;
          color: #2b6cb0;
        }

        .icon-btn.edit-btn:hover {
          background: #bee3f8;
          transform: scale(1.05);
        }

        .icon-btn.delete-btn {
          background: #fff5f5;
          color: #e53e3e;
        }

        .icon-btn.delete-btn:hover {
          background: #fed7d7;
          transform: scale(1.05);
        }

        .shipment-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px 16px;
          font-size: 13px;
        }

        .detail-row {
          display: flex;
          gap: 6px;
          padding: 2px 0;
        }

        .detail-row .label {
          color: #718096;
          font-weight: 500;
          min-width: 70px;
        }

        .detail-row .value {
          color: #2d3748;
        }

        .detail-row.total-row .value {
          font-weight: 700;
          color: #0a1628;
        }

        .empty-state {
          text-align: center;
          color: #a0aec0;
          padding: 30px 20px;
        }

        .empty-state i {
          font-size: 36px;
          display: block;
          margin-bottom: 8px;
        }

        .empty-state p {
          font-size: 14px;
        }

        /* ===== ITEMS SECTION IN MODAL ===== */
        .items-section {
          margin-top: 12px;
          border-top: 1px solid #e2e8f0;
          padding-top: 12px;
        }

        .items-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .items-header label {
          font-weight: 600;
          font-size: 13px;
          color: #0a1628;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .items-header label i {
          color: #4a5568;
        }

        .add-item-link {
          color: #a78bfa;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.3s ease;
        }

        .add-item-link:hover {
          color: #8b5cf6;
        }

        .item-row {
          background: #f8fafc;
          border-radius: 8px;
          padding: 10px 12px;
          margin-bottom: 8px;
          border: 1px solid #e8ecf0;
        }

        .item-fields {
          display: grid;
          grid-template-columns: 2fr 0.8fr 0.8fr 1fr 0.5fr;
          gap: 10px;
          align-items: end;
        }

        .item-field label {
          display: block;
          font-weight: 600;
          font-size: 10px;
          margin-bottom: 3px;
          color: #4a5568;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .item-field input {
          width: 100%;
          padding: 6px 10px;
          border: 1.5px solid #e2e8f0;
          border-radius: 6px;
          font-size: 13px;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
          background: white;
          color: #2d3748;
        }

        .item-field input:focus {
          outline: none;
          border-color: #4da6ff;
          box-shadow: 0 0 0 3px rgba(77, 166, 255, 0.1);
        }

        .item-field .total-input {
          background: #f7fafc;
          font-weight: 600;
          color: #0a1628;
        }

        .item-delete {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .item-delete label {
          visibility: hidden;
        }

        .delete-icon {
          color: #e74c3c;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 36px;
        }

        .delete-icon:hover {
          color: #c0392b;
          transform: scale(1.15);
        }

        /* ===== MODAL ===== */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.3s ease;
          padding: 20px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          max-width: 700px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #e8ecf0;
          position: sticky;
          top: 0;
          background: white;
          z-index: 10;
          border-radius: 12px 12px 0 0;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 18px;
          color: #0a1628;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 20px;
          color: #a0aec0;
          cursor: pointer;
          transition: 0.3s;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .modal-close:hover {
          color: #e74c3c;
          background: #fef2f2;
        }

        .modal-body {
          padding: 20px;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 16px 20px;
          border-top: 1px solid #e8ecf0;
          position: sticky;
          bottom: 0;
          background: white;
          border-radius: 0 0 12px 12px;
        }

        .btn-cancel {
          padding: 8px 20px;
          background: #e2e8f0;
          color: #4a5568;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.3s;
          font-family: 'Inter', sans-serif;
        }

        .btn-cancel:hover {
          background: #cbd5e0;
        }

        .btn-save-shipment {
          padding: 8px 24px;
          background: #0a1628;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.3s;
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-save-shipment:hover {
          background: #1a2a4a;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(10, 22, 40, 0.2);
        }

        /* ============================================ */
        /* RESPONSIVE */
        /* ============================================ */

        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }

          .mobile-only {
            display: block !important;
          }

          .edit-manifest-page {
            padding: 12px 16px;
          }

          .view-page-header {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 8px;
            gap: 4px;
          }

          .view-header-left {
            flex: 1;
            min-width: 0;
          }

          .view-header-title h2 {
            font-size: 17px;
          }

          .view-header-subtitle {
            font-size: 12px;
          }

          .view-back-btn {
            font-size: 18px;
            padding: 4px 8px;
          }

          .mobile-update-btn {
            margin-top: 8px;
            margin-bottom: 12px;
            padding: 0 4px;
          }

          .form-row {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .card-header {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          .shipments-title {
            font-size: 14px;
          }

          .card-actions {
            gap: 6px;
          }

          .badge {
            font-size: 10px;
            padding: 2px 8px;
            min-width: 24px;
          }

          .toggle-group {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            padding: 12px 14px;
          }

          .toggle-item {
            flex: 1;
            min-width: 0;
          }

          .toggle-label-wrapper {
            align-items: center;
            width: 100%;
          }

          .toggle-status-label {
            font-size: 9px;
            text-align: center;
            width: 100%;
          }

          .toggle-switch {
            padding: 4px 8px;
            gap: 8px;
            justify-content: center;
          }

          .toggle-track {
            width: 34px;
            height: 20px;
          }

          .toggle-thumb {
            width: 16px;
            height: 16px;
            top: 2px;
            left: 2px;
          }

          .toggle-switch.active .toggle-thumb {
            transform: translateX(14px);
          }

          .toggle-label-text {
            font-size: 11px;
            min-width: 50px;
          }

          .shipment-details {
            grid-template-columns: 1fr;
          }

          .modal-content {
            max-width: 100%;
            margin: 10px;
          }

          .item-fields {
            grid-template-columns: 1fr 1fr;
          }

          .item-field:first-child {
            grid-column: span 2;
          }

          .item-delete {
            grid-column: span 2;
            align-items: flex-end;
          }

          .shipment-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .shipment-actions {
            align-self: flex-end;
          }

          .shipment-customer {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }

          .card {
            padding: 14px;
          }

          .card-header h3 {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .edit-manifest-page {
            padding: 10px 12px;
          }

          .view-header-title h2 {
            font-size: 15px;
          }

          .view-header-subtitle {
            font-size: 11px;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .toggle-group {
            gap: 10px;
            padding: 10px 12px;
          }

          .toggle-switch {
            padding: 3px 6px;
            gap: 6px;
          }

          .toggle-track {
            width: 30px;
            height: 18px;
          }

          .toggle-thumb {
            width: 14px;
            height: 14px;
          }

          .toggle-switch.active .toggle-thumb {
            transform: translateX(12px);
          }

          .toggle-label-text {
            font-size: 10px;
            min-width: 40px;
          }

          .toggle-status-label {
            font-size: 8px;
          }

          .modal-body {
            padding: 14px;
          }

          .modal-footer {
            flex-direction: column;
          }

          .btn-cancel,
          .btn-save-shipment {
            width: 100%;
            justify-content: center;
          }

          .item-fields {
            grid-template-columns: 1fr;
          }

          .item-field:first-child {
            grid-column: span 1;
          }

          .item-delete {
            grid-column: span 1;
            align-items: center;
          }

          .btn-update-full {
            font-size: 13px;
            padding: 10px 16px;
          }

          .shipments-title {
            font-size: 13px;
          }

          .badge {
            font-size: 9px;
            padding: 2px 6px;
            min-width: 20px;
          }
        }

        @media (min-width: 769px) {
          .mobile-only {
            display: none !important;
          }

          .desktop-only {
            display: block !important;
          }

          .toggle-group {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
          }

          .toggle-item {
            flex: 0 0 auto !important;
          }
        }
      `}</style>
    </div>
  );
}