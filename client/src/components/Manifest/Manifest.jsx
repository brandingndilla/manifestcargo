import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import toast from 'react-hot-toast';

export default function ManifestItems() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manifest, setManifest] = useState(null);
  const [allManifests, setAllManifests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedManifestId, setSelectedManifestId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editShipmentIdx, setEditShipmentIdx] = useState(null);
  const [editItemIdx, setEditItemIdx] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', qty: '', rate: '' });
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [showLoadedModal, setShowLoadedModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [selectedShipmentIdx, setSelectedShipmentIdx] = useState(null);
  const [loadedQty, setLoadedQty] = useState('');
  const [totalQty, setTotalQty] = useState(0);
  const [editShipmentId, setEditShipmentId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showNewManifestModal, setShowNewManifestModal] = useState(false);
  const [orphanedShipments, setOrphanedShipments] = useState([]);
  const [newManifestDetails, setNewManifestDetails] = useState({
    truckPlate: '',
    driverName: '',
    supervisor: '',
    manifestDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchAllManifests();
  }, [refreshKey]);

  const fetchAllManifests = async () => {
    try {
      setLoading(true);
      const res = await api.get('/manifests');
      const draftManifests = res.data.filter(m => m.status === 'DRAFT');
      const activeManifests = res.data.filter(m => m.status === 'ACTIVE');

      const sortedDrafts = draftManifests.sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      const sortedActive = activeManifests.sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
      );

      const sorted = [...sortedDrafts, ...sortedActive];
      setAllManifests(sorted);

      // Fetch orphaned shipments (unloaded items with no manifest)
      try {
        const shipmentsRes = await api.get('/shipments');
        const orphaned = shipmentsRes.data.filter(s => 
          s.manifestId === null && s.status !== 'loaded'
        );
        setOrphanedShipments(orphaned);
      } catch (err) {
        console.error('Error fetching orphaned shipments:', err);
      }

      // IMPORTANT: Only set manifest if id exists and is NOT undefined
      if (id && id !== 'undefined') {
        const found = sorted.find(m => m._id === id);
        if (found) {
          setSelectedManifestId(id);
          setManifest(found);
        } else {
          // If manifest with ID not found, try to get first draft
          if (draftManifests.length > 0) {
            setSelectedManifestId(draftManifests[0]._id);
            setManifest(draftManifests[0]);
          } else if (sorted.length > 0) {
            setSelectedManifestId(sorted[0]._id);
            setManifest(sorted[0]);
          }
        }
      } else {
        // No ID provided - select first draft or first manifest
        if (draftManifests.length > 0) {
          setSelectedManifestId(draftManifests[0]._id);
          setManifest(draftManifests[0]);
        } else if (sorted.length > 0) {
          setSelectedManifestId(sorted[0]._id);
          setManifest(sorted[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching manifests:', err);
      toast.error('Failed to load manifests');
    } finally {
      setLoading(false);
    }
  };

  const selectManifest = (manifestId) => {
    if (!manifestId) return;
    const found = allManifests.find(m => m._id === manifestId);
    if (found) {
      setSelectedManifestId(manifestId);
      setManifest(found);
      navigate(`/manifest-items/${manifestId}`, { replace: true });
    }
  };

  // SAVE MANIFEST - ONLY saves LOADED items, unloaded become orphaned
  const saveManifest = async () => {
    if (!manifest) {
      toast.error('No manifest to save.');
      return;
    }

    const allShipments = manifest.shipments || [];
    const loadedShipments = allShipments.filter(s => s.status === 'loaded');
    const unloadedShipments = allShipments.filter(s => s.status !== 'loaded');

    if (loadedShipments.length === 0) {
      toast.error('No loaded shipments to save. Please load some items first.');
      return;
    }

    try {
      setLoading(true);

      const newManifestData = {
        truckPlate: manifest.truckPlate || '',
        driverName: manifest.driverName || '',
        supervisor: manifest.supervisor || '',
        manifestDate: manifest.manifestDate || new Date().toISOString().split('T')[0],
        status: 'ACTIVE',
        shipments: loadedShipments.map(s => s._id)
      };
      const newManifestRes = await api.post('/manifests', newManifestData);

      for (const shipment of loadedShipments) {
        await api.put(`/shipments/${shipment._id}`, {
          ...shipment,
          saved: true,
          status: 'loaded',
          manifestId: newManifestRes.data._id
        });
      }

      // Unloaded shipments become orphaned (manifestId: null)
      if (unloadedShipments.length > 0) {
        for (const shipment of unloadedShipments) {
          await api.put(`/shipments/${shipment._id}`, {
            ...shipment,
            manifestId: null
          });
        }
      }

      await api.delete(`/manifests/${manifest._id}`);

      toast.success(`${loadedShipments.length} loaded shipment(s) saved successfully!`);
      if (unloadedShipments.length > 0) {
        toast.success(`${unloadedShipments.length} unloaded shipment(s) remain. They are ready for a new manifest.`);
      }

      // Navigate to the new manifest view
      navigate(`/view-manifest/${newManifestRes.data._id}`);
      
    } catch (err) {
      console.error('Save error:', err);
      toast.error(err.response?.data?.error || 'Failed to save manifest');
    } finally {
      setLoading(false);
    }
  };

  // Open modal to create new manifest for unloaded items
  const openCreateManifestModal = () => {
    const allUnloaded = [...(manifest?.shipments?.filter(s => s.status !== 'loaded') || []), ...orphanedShipments];
    
    if (allUnloaded.length === 0) {
      toast.error('No unloaded shipments to create a manifest for.');
      return;
    }

    setNewManifestDetails({
      truckPlate: '',
      driverName: '',
      supervisor: '',
      manifestDate: new Date().toISOString().split('T')[0]
    });
    setShowNewManifestModal(true);
  };

  // Create new manifest for unloaded items
  const createManifestForUnloaded = async () => {
    const { truckPlate, driverName, supervisor, manifestDate } = newManifestDetails;
    
    if (!truckPlate || !driverName || !supervisor) {
      toast.error('Please fill all manifest details');
      return;
    }

    const allUnloaded = [...(manifest?.shipments?.filter(s => s.status !== 'loaded') || []), ...orphanedShipments];

    if (allUnloaded.length === 0) {
      toast.error('No unloaded shipments found');
      return;
    }

    try {
      setLoading(true);

      const newManifestData = {
        truckPlate: truckPlate,
        driverName: driverName,
        supervisor: supervisor,
        manifestDate: manifestDate || new Date().toISOString().split('T')[0],
        status: 'DRAFT',
        shipments: allUnloaded.map(s => s._id)
      };
      const newManifestRes = await api.post('/manifests', newManifestData);

      for (const shipment of allUnloaded) {
        await api.put(`/shipments/${shipment._id}`, {
          ...shipment,
          manifestId: newManifestRes.data._id
        });
      }

      if (manifest) {
        const loadedShipments = manifest.shipments?.filter(s => s.status === 'loaded') || [];
        await api.put(`/manifests/${manifest._id}`, {
          ...manifest,
          shipments: loadedShipments.map(s => s._id)
        });
      }

      toast.success(`New manifest created for ${allUnloaded.length} unloaded shipment(s)!`);
      
      setShowNewManifestModal(false);
      setRefreshKey(prev => prev + 1);
      
      navigate(`/manifest-items/${newManifestRes.data._id}`);
    } catch (err) {
      console.error('Create manifest error:', err);
      toast.error(err.response?.data?.error || 'Failed to create manifest');
    } finally {
      setLoading(false);
    }
  };

  // DELETE SHIPMENT
  const deleteShipment = async (shipmentId) => {
    if (!shipmentId) {
      toast.error('Invalid shipment ID');
      return;
    }

    if (!confirm('Delete this shipment?')) return;

    try {
      await api.delete(`/shipments/${shipmentId}`);
      toast.success('Shipment deleted successfully');
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error('Delete error:', err);
      toast.error(err.response?.data?.error || 'Failed to delete shipment');
    }
  };

  // CLEAR UNLOADED - Delete all unloaded shipments
  const clearUnloaded = async () => {
    const allUnloaded = [...(manifest?.shipments?.filter(s => s.status !== 'loaded') || []), ...orphanedShipments];
    
    if (allUnloaded.length === 0) {
      toast.error('No unloaded shipments to clear.');
      return;
    }

    if (!confirm(`Delete ${allUnloaded.length} unloaded shipments?`)) return;

    try {
      for (const shipment of allUnloaded) {
        await api.delete(`/shipments/${shipment._id}`);
      }

      if (manifest) {
        const loadedShipments = manifest.shipments?.filter(s => s.status === 'loaded') || [];
        await api.put(`/manifests/${manifest._id}`, {
          ...manifest,
          shipments: loadedShipments.map(s => s._id)
        });
      }

      toast.success(`${allUnloaded.length} unloaded shipments cleared successfully!`);
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error('Clear unloaded error:', err);
      toast.error(err.response?.data?.error || 'Failed to clear unloaded shipments');
    }
  };

  // EDIT ITEM
  const openEditModal = (shipment, shipmentIdx, itemIdx) => {
    if (!shipment || !shipment.items || !shipment.items[itemIdx]) {
      toast.error('Item not found');
      return;
    }

    const item = shipment.items[itemIdx];
    setEditShipmentIdx(shipmentIdx);
    setEditItemIdx(itemIdx);
    setEditShipmentId(shipment._id);
    setEditForm({
      name: item.name || '',
      qty: item.qty || '',
      rate: item.rate || ''
    });
    setEditingItem(true);
  };

  const closeEditModal = () => {
    setEditingItem(null);
    setEditShipmentIdx(null);
    setEditItemIdx(null);
    setEditShipmentId(null);
    setEditForm({ name: '', qty: '', rate: '' });
  };

  const saveEditItem = async () => {
    const { name, qty, rate } = editForm;
    if (!name || !qty || !rate) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const shipment = manifest.shipments.find(s => s._id === editShipmentId);
      if (!shipment) {
        toast.error('Shipment not found');
        return;
      }

      const qtyNum = parseInt(qty);
      const rateNum = parseFloat(rate);

      const updatedItems = shipment.items.map((item, idx) => {
        if (idx === editItemIdx) {
          return {
            ...item,
            name: name,
            qty: qtyNum,
            rate: rateNum,
            total: qtyNum * rateNum
          };
        }
        return item;
      });

      const newTotal = updatedItems.reduce((sum, item) => sum + (item.total || 0), 0);

      await api.put(`/shipments/${shipment._id}`, {
        ...shipment,
        items: updatedItems,
        total: newTotal
      });

      toast.success('Item updated successfully!');
      closeEditModal();
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error('Edit error:', err);
      toast.error(err.response?.data?.error || 'Failed to update item');
    }
  };

  // Open Loaded Modal
  const openLoadedModal = (shipment, shipmentIdx) => {
    if (!shipment || !shipment.items) return;
    const total = shipment.items.reduce((sum, item) => sum + (item.qty || 0), 0);
    setTotalQty(total);
    setSelectedShipment(shipment);
    setSelectedShipmentIdx(shipmentIdx);
    setLoadedQty('');
    setShowLoadedModal(true);
  };

  // Confirm Loaded Quantity
  const confirmLoaded = async () => {
    if (!selectedShipment) return;

    const qty = parseInt(loadedQty);
    if (isNaN(qty) || qty < 0) {
      toast.error('Please enter a valid quantity');
      return;
    }

    if (qty > totalQty) {
      toast.error(`Cannot load more than ${totalQty} items`);
      return;
    }

    if (qty === 0) {
      toast.error('Please enter a quantity greater than 0');
      return;
    }

    setUpdatingStatus(true);
    try {
      const shipment = selectedShipment;
      const items = shipment.items || [];
      const remainingQty = totalQty - qty;

      const loadedItems = items.map(item => {
        const itemRatio = (item.qty || 0) / totalQty;
        const loadedItemQty = Math.round(qty * itemRatio);
        return {
          ...item,
          qty: loadedItemQty > 0 ? loadedItemQty : 0,
          total: loadedItemQty > 0 ? loadedItemQty * (item.rate || 0) : 0
        };
      }).filter(item => item.qty > 0);

      const unloadedItems = items.map(item => {
        const itemRatio = (item.qty || 0) / totalQty;
        const loadedItemQty = Math.round(qty * itemRatio);
        const remainingItemQty = (item.qty || 0) - loadedItemQty;
        return {
          ...item,
          qty: remainingItemQty > 0 ? remainingItemQty : 0,
          total: remainingItemQty > 0 ? remainingItemQty * (item.rate || 0) : 0
        };
      }).filter(item => item.qty > 0);

      await api.delete(`/shipments/${shipment._id}`);

      if (loadedItems.length > 0) {
        const loadedShipmentData = {
          sender: shipment.sender,
          customer: shipment.customer,
          phone: shipment.phone,
          destination: shipment.destination,
          items: loadedItems,
          payment: shipment.payment,
          status: 'loaded',
          loadedQty: qty,
          manifestId: manifest?._id || null,
          saved: false,
          total: loadedItems.reduce((sum, item) => sum + (item.total || 0), 0)
        };
        await api.post('/shipments', loadedShipmentData);
      }

      if (unloadedItems.length > 0) {
        const unloadedShipmentData = {
          sender: shipment.sender,
          customer: shipment.customer,
          phone: shipment.phone,
          destination: shipment.destination,
          items: unloadedItems,
          payment: shipment.payment,
          status: 'not-loaded',
          loadedQty: 0,
          manifestId: null,
          saved: false,
          total: unloadedItems.reduce((sum, item) => sum + (item.total || 0), 0)
        };
        await api.post('/shipments', unloadedShipmentData);
      }

      toast.success(`${qty} items loaded. ${remainingQty} items remain unloaded.`);
      setShowLoadedModal(false);
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error('Error:', err);
      toast.error(err.response?.data?.error || 'Failed to update status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Toggle Paid status
  const togglePaidStatus = async (shipmentId, currentPayment) => {
    if (updatingStatus) return;
    setUpdatingStatus(true);

    try {
      const newPayment = currentPayment === 'paid' ? 'unpaid' : 'paid';
      await api.put(`/shipments/${shipmentId}`, {
        payment: newPayment
      });
      toast.success(`Shipment marked as ${newPayment === 'paid' ? 'PAID' : 'UNPAID'}`);
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      toast.error('Failed to update payment status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const markAllLoaded = async () => {
    if (!manifest || !manifest.shipments || manifest.shipments.length === 0) {
      toast.error('No shipments to update.');
      return;
    }

    if (!confirm('Mark all shipments as LOADED?')) return;

    try {
      const updatePromises = manifest.shipments.map(shipment =>
        api.put(`/shipments/${shipment._id}`, {
          ...shipment,
          status: 'loaded'
        })
      );
      await Promise.all(updatePromises);
      toast.success('All shipments marked as LOADED!');
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      toast.error('Failed to update shipments');
    }
  };

  const goBack = () => {
    navigate('/manifest');
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  // Get all shipments to display (from current manifest + orphaned)
  const allShipments = [...(manifest?.shipments || []), ...orphanedShipments];
  const loadedShipments = allShipments.filter(s => s.status === 'loaded');
  const unloadedShipments = allShipments.filter(s => s.status !== 'loaded');

  const totalRecords = allShipments.reduce((sum, s) =>
    sum + (s.items?.reduce((a, i) => a + (i.qty || 0), 0) || 0), 0);

  const loadedRecords = loadedShipments.reduce((sum, s) =>
    sum + (s.items?.reduce((a, i) => a + (i.qty || 0), 0) || 0), 0);

  const unloadedRecords = unloadedShipments.reduce((sum, s) =>
    sum + (s.items?.reduce((a, i) => a + (i.qty || 0), 0) || 0), 0);

  const totalAmount = allShipments.reduce((sum, s) => sum + (s.total || 0), 0);

  const filterShipments = (shipments) => {
    return shipments.filter(s =>
      (s.sender || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.customer || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.destination || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredLoaded = filterShipments(loadedShipments);
  const filteredUnloaded = filterShipments(unloadedShipments);

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderShipmentCard = (shipment, shipmentIdx, isOrphaned = false) => {
    const items = shipment.items || [];
    const isLoaded = shipment.status === 'loaded';

    return (
      <div key={shipment._id || shipmentIdx} className="shipment-card" style={{ border: isOrphaned ? '2px dashed #e2e8f0' : 'none' }}>
        {isOrphaned && (
          <div style={{ 
            background: '#f6e05e', 
            color: '#744210', 
            fontSize: '10px', 
            fontWeight: '600',
            padding: '2px 8px',
            borderRadius: '4px',
            display: 'inline-block',
            marginBottom: '6px'
          }}>
            <i className="fas fa-exclamation-triangle"></i> No Manifest
          </div>
        )}
        <div className="customer-header-row">
          <span className="customer-name">{shipment.customer || '—'}</span>
          <div className="header-action-icons">
            <button
              className="icon-btn icon-edit"
              onClick={() => openEditModal(shipment, shipmentIdx, 0)}
              title="Edit Item"
            >
              <i className="fas fa-edit"></i>
            </button>
            <button
              className="icon-btn icon-delete"
              onClick={() => deleteShipment(shipment._id)}
              title="Delete Shipment"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <div className="phone-row">
          <i className="fas fa-phone"></i> {shipment.phone || '—'}
        </div>

        <div className="goods-destination-row">
          <i className="fas fa-box"></i>
          <span className="goods-item">
            {items.map((item, idx) => (
              <span key={idx}>
                {idx > 0 && ', '}
                {item.name || '—'}
              </span>
            ))}
          </span>
          <span className="arrow">→</span>
          <span className="destination">{shipment.destination || '—'}</span>
        </div>

        <div className="qra-header">
          <span className="q-label">Q</span>
          <span className="divider">|</span>
          <span className="r-label">R</span>
          <span className="divider">|</span>
          <span className="a-label">A</span>
        </div>

        {items.map((item, idx) => (
          <div key={idx} className={`qra-row ${idx > 0 ? 'extra-qra' : ''}`}>
            <span className="q-value">{item.qty || 0}</span>
            <span className="divider">|</span>
            <span className="r-value">{(item.rate || 0).toLocaleString()}</span>
            <span className="divider">|</span>
            <span className="a-value">{(item.total || 0).toLocaleString()}</span>
          </div>
        ))}

        <div className="status-buttons-row">
          <button
            className={`status-btn status-btn-loaded ${isLoaded ? 'active' : 'inactive'}`}
            onClick={() => openLoadedModal(shipment, shipmentIdx)}
            disabled={updatingStatus}
          >
            <i className="fas fa-box"></i>
            {isLoaded ? 'Loaded' : 'Load'}
          </button>
          <button
            className={`status-btn status-btn-paid ${shipment.payment === 'paid' ? 'active' : 'inactive'}`}
            onClick={() => togglePaidStatus(shipment._id, shipment.payment)}
            disabled={updatingStatus}
          >
            <i className="fas fa-money-bill-wave"></i>
            {shipment.payment === 'paid' ? 'Paid' : 'Unpaid'}
          </button>
        </div>
      </div>
    );
  };

  const hasUnloadedItems = unloadedShipments.length > 0;

  return (
    <div className="manifest-items-page">
      <div className="view-page-header">
        <div className="view-header-left">
          <button className="view-back-btn" onClick={goBack}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="view-header-title">
            <h2>Manifest Items</h2>
            <span className="view-header-subtitle">View, edit or delete items in manifests</span>
          </div>
        </div>
      </div>

      <div className="card manifest-details-card">
        <div className="card-header">
          <h3>
            <i className="fas fa-clipboard-list" style={{ fontSize: '16px', color: '#4a5568', marginRight: '6px' }}></i>
            {manifest ? 'Manifest Details' : 'No Active Manifest'}
          </h3>
          {manifest && (
            <span className="badge" style={{ background: '#e8edf5', color: '#0a1628' }}>
              {allShipments.length} Total
            </span>
          )}
        </div>
        {manifest ? (
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input type="text" value={formatDate(manifest?.manifestDate)} readOnly style={{ background: '#f7fafc' }} />
            </div>
            <div className="form-group">
              <label>Plate Number</label>
              <input type="text" value={manifest?.truckPlate || '—'} readOnly style={{ background: '#f7fafc' }} />
            </div>
            <div className="form-group">
              <label>Driver</label>
              <input type="text" value={manifest?.driverName || '—'} readOnly style={{ background: '#f7fafc' }} />
            </div>
            <div className="form-group">
              <label>Supervisor</label>
              <input type="text" value={manifest?.supervisor || '—'} readOnly style={{ background: '#f7fafc' }} />
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px', color: '#718096' }}>
            <i className="fas fa-info-circle"></i> No active manifest. Unloaded items are waiting for a new manifest.
          </div>
        )}
      </div>

      <div className="card search-card">
        <div className="search-wrapper" style={{ position: 'relative', width: '100%' }}>
          <i className="fas fa-search" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0', fontSize: '16px' }}></i>
          <input
            type="text"
            className="view-search-input"
            placeholder="Search customer, sender or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              paddingLeft: '44px',
              width: '100%',
              padding: '12px 16px 12px 44px',
              border: '1.5px solid #e2e8f0',
              borderRadius: '10px',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.3s ease',
              background: 'white'
            }}
          />
        </div>
      </div>

      <div className="session-summary-wrapper">
        <div className="view-revenue-wrapper">
          <div className="view-revenue-scroll">
            <div className="view-revenue-item total">
              <span className="view-revenue-label">Total Records</span>
              <span className="view-revenue-amount">{totalRecords}</span>
              <span className="view-revenue-sub" style={{ fontSize: '11px', color: '#718096', display: 'block', marginTop: '2px' }}>
                {loadedRecords} loaded · {unloadedRecords} unloaded
              </span>
            </div>
            <div className="view-revenue-item collected">
              <span className="view-revenue-label">Total Amount</span>
              <span className="view-revenue-amount">TZS {totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="action-buttons-row">
          {manifest && (
            <button onClick={markAllLoaded} className="btn-mark-loaded">
              <i className="fas fa-check-double"></i> Mark All Loaded
            </button>
          )}
          <button onClick={clearUnloaded} className="btn-clear-unloaded">
            <i className="fas fa-trash-alt"></i> Clear Unloaded
          </button>
          {hasUnloadedItems && (
            <button onClick={openCreateManifestModal} className="btn-create-manifest">
              <i className="fas fa-plus-circle"></i> Create New Manifest for Unloaded
            </button>
          )}
        </div>
      </div>

      <div className="card manifest-items-list">
        <div className="items-cards-container">
          {filteredLoaded.map((shipment, idx) => renderShipmentCard(shipment, idx, false))}
          {filteredUnloaded.map((shipment, idx) => renderShipmentCard(shipment, idx + filteredLoaded.length, !shipment.manifestId))}

          {allShipments.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <i className="fas fa-inbox" style={{ fontSize: '48px', color: '#a0aec0', display: 'block', marginBottom: '12px' }}></i>
              <p style={{ color: '#a0aec0' }}>No shipments found. Add items from the manifest page.</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
          {manifest && (
            <button className="btn-save-manifest" onClick={saveManifest}>
              <i className="fas fa-save"></i> Save Manifest
            </button>
          )}
          {manifest && (
            <button
              onClick={() => navigate(`/view-manifest/${manifest._id}`)}
              className="btn-view-manifest"
              style={{
                background: '#48bb78',
                color: 'white',
                border: 'none',
                padding: '10px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                marginLeft: '12px'
              }}
            >
              <i className="fas fa-eye"></i> View Current Manifest
            </button>
          )}
        </div>
      </div>

      {/* Create New Manifest Modal for Unloaded Items */}
      {showNewManifestModal && (
        <div className="modal-overlay" onClick={() => setShowNewManifestModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <i className="fas fa-truck" style={{ color: '#4da6ff' }}></i> Create New Manifest for Unloaded Items
              </h3>
              <button className="modal-close" onClick={() => setShowNewManifestModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: '12px', color: '#4a5568', fontSize: '14px' }}>
                <strong>{unloadedShipments.length}</strong> unloaded item(s) will be moved to a new manifest.
              </p>
              <div className="form-group">
                <label>Truck Plate <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  value={newManifestDetails.truckPlate}
                  onChange={(e) => setNewManifestDetails({ ...newManifestDetails, truckPlate: e.target.value })}
                  placeholder="Enter truck plate number"
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
                />
              </div>
              <div className="form-group" style={{ marginTop: '12px' }}>
                <label>Driver Name <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  value={newManifestDetails.driverName}
                  onChange={(e) => setNewManifestDetails({ ...newManifestDetails, driverName: e.target.value })}
                  placeholder="Enter driver name"
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
                />
              </div>
              <div className="form-group" style={{ marginTop: '12px' }}>
                <label>Supervisor <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  value={newManifestDetails.supervisor}
                  onChange={(e) => setNewManifestDetails({ ...newManifestDetails, supervisor: e.target.value })}
                  placeholder="Enter supervisor name"
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
                />
              </div>
              <div className="form-group" style={{ marginTop: '12px' }}>
                <label>Date</label>
                <input
                  type="date"
                  value={newManifestDetails.manifestDate}
                  onChange={(e) => setNewManifestDetails({ ...newManifestDetails, manifestDate: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowNewManifestModal(false)}>
                Cancel
              </button>
              <button className="btn-send" onClick={createManifestForUnloaded}>
                <i className="fas fa-plus-circle"></i> Create Manifest
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loaded Quantity Modal */}
      {showLoadedModal && selectedShipment && (
        <div className="modal-overlay" onClick={() => setShowLoadedModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <i className="fas fa-box" style={{ color: '#4da6ff' }}></i> Load Quantity
              </h3>
              <button className="modal-close" onClick={() => setShowLoadedModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: '12px', color: '#4a5568' }}>
                Customer: <strong>{selectedShipment.customer || '—'}</strong>
              </p>
              <p style={{ marginBottom: '16px', color: '#4a5568' }}>
                Total Items: <strong>{totalQty}</strong>
              </p>
              <div className="form-group">
                <label>Quantity Loaded</label>
                <input
                  type="number"
                  value={loadedQty}
                  onChange={(e) => setLoadedQty(e.target.value)}
                  placeholder={`Enter quantity (max ${totalQty})`}
                  min="0"
                  max={totalQty}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
                />
              </div>
              {loadedQty > 0 && parseInt(loadedQty) < totalQty && (
                <p style={{ marginTop: '12px', color: '#e74c3c', fontSize: '13px' }}>
                  <i className="fas fa-info-circle"></i> Remaining {totalQty - parseInt(loadedQty)} items will remain unloaded
                </p>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowLoadedModal(false)}>
                Cancel
              </button>
              <button className="btn-send" onClick={confirmLoaded} disabled={!loadedQty || parseInt(loadedQty) === 0}>
                <i className="fas fa-check"></i> Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="modal-overlay" onClick={closeEditModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <i className="fas fa-edit" style={{ color: '#4da6ff' }}></i> Edit Item
              </h3>
              <button className="modal-close" onClick={closeEditModal}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Item Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>
              <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    value={editForm.qty}
                    onChange={(e) => setEditForm({ ...editForm, qty: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Rate (TZS)</label>
                  <input
                    type="number"
                    value={editForm.rate}
                    onChange={(e) => setEditForm({ ...editForm, rate: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeEditModal}>
                Cancel
              </button>
              <button className="btn-send" onClick={saveEditItem}>
                <i className="fas fa-save"></i> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .btn-create-manifest {
          padding: 10px 16px;
          background: #4da6ff;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-create-manifest:hover {
          background: #3b8fd9;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(77, 166, 255, 0.25);
        }

        .btn-mark-loaded {
          padding: 10px 16px;
          background: #0a1628;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-mark-loaded:hover {
          background: #1a2a4a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(10, 22, 40, 0.25);
        }

        .btn-clear-unloaded {
          padding: 10px 16px;
          background: transparent;
          color: #e74c3c;
          border: 2px solid #e74c3c;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-clear-unloaded:hover {
          background: #fff5f5;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(231, 76, 60, 0.2);
        }

        .btn-save-manifest {
          background: #2b6cb0;
          color: white;
          border: none;
          padding: 10px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-save-manifest:hover {
          background: #1a4f8b;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(43, 108, 176, 0.3);
        }

        .btn-view-manifest {
          background: #48bb78;
          color: white;
          border: none;
          padding: 10px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-view-manifest:hover {
          background: #38a169;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(56, 161, 105, 0.3);
        }

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
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #e8ecf0;
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
          font-size: 24px;
          color: #a0aec0;
          cursor: pointer;
          transition: 0.3s;
        }

        .modal-close:hover {
          color: #e74c3c;
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
        }

        .btn-cancel {
          background: #e2e8f0;
          color: #4a5568;
          padding: 8px 20px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
        }

        .btn-cancel:hover {
          background: #cbd5e0;
        }

        .btn-send {
          background: #2ecc71;
          color: white;
          padding: 8px 20px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-send:hover {
          background: #27ae60;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
        }

        .btn-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .action-buttons-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 12px;
        }

        @media (max-width: 768px) {
          .action-buttons-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}