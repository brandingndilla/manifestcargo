import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import toast from 'react-hot-toast';
import messageIcon from '../../assets/image.png';
import { useCompany, useCompanyPhone } from '../../hooks/useCompany';

export default function ManifestManager() {
  const { id } = useParams();
  const navigate = useNavigate();
  const companyName = useCompany();
  const companyPhone = useCompanyPhone();
  const [manifest, setManifest] = useState(null);
  const [allManifests, setAllManifests] = useState([]);
  const [goodsRows, setGoodsRows] = useState([
    { id: Date.now(), name: '', qty: '', rate: '', total: 0 }
  ]);
  const [loading, setLoading] = useState(true);
  const [truckPlate, setTruckPlate] = useState('');
  const [driverName, setDriverName] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [manifestDate, setManifestDate] = useState('');
  const [sender, setSender] = useState('');
  const [customer, setCustomer] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [selectedManifestId, setSelectedManifestId] = useState(null);
  const [isNewManifest, setIsNewManifest] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Message modal state
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    fetchAllManifests();
  }, []);

  const toUpperCase = (value) => {
    return value ? value.toUpperCase() : '';
  };

  const formatTotal = (value) => {
    return (value || 0).toFixed(2);
  };

  const fetchAllManifests = async () => {
    try {
      const res = await api.get('/manifests');
      
      // Separate into ACTIVE (saved) and DRAFT (current working session)
      const activeManifests = res.data.filter(m => m.status === 'ACTIVE');
      const draftManifests = res.data.filter(m => m.status === 'DRAFT');
      
      // Filter out manifests with no plate number AND no items
      const filterValidManifests = (manifests) => {
        return manifests.filter(m => {
          const hasPlate = m.truckPlate && m.truckPlate.trim() !== '';
          const hasItems = m.shipments && m.shipments.length > 0;
          return hasPlate || hasItems;
        });
      };
      
      const filteredActive = filterValidManifests(activeManifests);
      
      // Sort by createdAt - newest first
      const sortedActive = filteredActive.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      // Recent Manifests list only shows SAVED (ACTIVE) manifests.
      // Draft manifests (unsaved, with items still unloaded) are never
      // listed here — they stay reachable only through the CURRENT
      // SESSION banner and its item-count button.
      setAllManifests(sortedActive);
      
      // Handle current manifest selection
      if (id) {
        const found = res.data.find(m => m._id === id);
        if (found) {
          setSelectedManifestId(id);
          setManifest(found);
          loadManifestData(found);
        } else if (draftManifests.length > 0) {
          const draft = draftManifests[0];
          setSelectedManifestId(draft._id);
          setManifest(draft);
          loadManifestData(draft);
        } else if (sortedActive.length > 0) {
          createNewManifestDirect();
        } else {
          createNewManifestDirect();
        }
      } else if (draftManifests.length > 0) {
        const draft = draftManifests[0];
        setSelectedManifestId(draft._id);
        setManifest(draft);
        loadManifestData(draft);
      } else if (sortedActive.length > 0) {
        createNewManifestDirect();
      } else {
        createNewManifestDirect();
      }
    } catch (err) {
      toast.error('Failed to load manifests');
    } finally {
      setLoading(false);
    }
  };

  const loadManifestData = (manifestData) => {
    setManifest(manifestData);
    setTruckPlate(toUpperCase(manifestData.truckPlate || ''));
    setDriverName(toUpperCase(manifestData.driverName || ''));
    const supervisorValue = manifestData.supervisor || '';
    setSupervisor(supervisorValue === 'GEORGE' ? '' : toUpperCase(supervisorValue));
    if (manifestData.manifestDate) {
      const date = new Date(manifestData.manifestDate);
      setManifestDate(date.toISOString().split('T')[0]);
    }
    setIsNewManifest(false);
  };

  const createNewManifestDirect = async () => {
    try {
      const payload = {
        manifestDate: manifestDate || new Date().toISOString().split('T')[0]
      };
      
      if (truckPlate && truckPlate !== 'GEORGE') payload.truckPlate = toUpperCase(truckPlate);
      if (driverName && driverName !== 'GEORGE') payload.driverName = toUpperCase(driverName);
      if (supervisor && supervisor !== 'GEORGE') payload.supervisor = toUpperCase(supervisor);
      
      const res = await api.post('/manifests', payload);
      setManifest(res.data);
      setIsNewManifest(true);
      setSelectedManifestId(res.data._id);
      
      await fetchAllManifests();
    } catch (err) {
      toast.error('Failed to create new manifest');
    }
  };

  const createNewManifest = async () => {
    if (!confirm('Create a new manifest?')) {
      return;
    }

    setLoading(true);
    try {
      const payload = {
        manifestDate: manifestDate || new Date().toISOString().split('T')[0]
      };
      if (truckPlate && truckPlate !== 'GEORGE') payload.truckPlate = toUpperCase(truckPlate);
      if (driverName && driverName !== 'GEORGE') payload.driverName = toUpperCase(driverName);
      if (supervisor && supervisor !== 'GEORGE') payload.supervisor = toUpperCase(supervisor);
      
      const res = await api.post('/manifests', payload);
      
      setManifest(res.data);
      setIsNewManifest(true);
      setSelectedManifestId(res.data._id);
      
      await fetchAllManifests();
      
      toast.success('New manifest created!');
    } catch (err) {
      toast.error('Failed to create new manifest');
    } finally {
      setLoading(false);
    }
  };

  const handleTruckPlateChange = (e) => {
    setTruckPlate(toUpperCase(e.target.value));
  };

  const handleDriverNameChange = (e) => {
    setDriverName(toUpperCase(e.target.value));
  };

  const handleSupervisorChange = (e) => {
    setSupervisor(toUpperCase(e.target.value));
  };

  const handleSenderChange = (e) => {
    setSender(toUpperCase(e.target.value));
  };

  const handleCustomerChange = (e) => {
    setCustomer(toUpperCase(e.target.value));
  };

  const handleDestinationChange = (e) => {
    setDestination(toUpperCase(e.target.value));
  };

  const addGoodsRow = () => {
    setGoodsRows([...goodsRows, { id: Date.now(), name: '', qty: '', rate: '', total: 0 }]);
  };

  const removeGoodsRow = (id) => {
    if (goodsRows.length === 1) {
      toast.error('You need at least one goods item.');
      return;
    }
    setGoodsRows(goodsRows.filter(row => row.id !== id));
  };

  const updateGoodsRow = (id, field, value) => {
    setGoodsRows(goodsRows.map(row => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };
        if (field === 'qty' || field === 'rate') {
          const qty = field === 'qty' ? parseFloat(value) || 0 : parseFloat(row.qty) || 0;
          const rate = field === 'rate' ? parseFloat(value) || 0 : parseFloat(row.rate) || 0;
          updatedRow.total = qty * rate;
        }
        if (field === 'name') {
          updatedRow.name = toUpperCase(value);
        }
        return updatedRow;
      }
      return row;
    }));
  };

  const generateMessage = () => {
    const items = goodsRows
      .filter(row => row.name.trim() && row.qty && row.rate)
      .map(row => ({
        name: row.name.trim(),
        qty: parseInt(row.qty),
        rate: parseFloat(row.rate),
        total: parseFloat(row.qty) * parseFloat(row.rate)
      }));

    const totalAmount = items.reduce((sum, item) => sum + item.total, 0);
    
    let itemsList = '';
    items.forEach((item, index) => {
      itemsList += `${index + 1}. ${item.name} - Qty: ${item.qty}, TZS ${item.total.toLocaleString()}\n`;
    });

    const message = `Habari ${customer || 'Mteja'},\n\nTumepokea mzigo wako kama ifuatavyo:\n${itemsList}\n💰 Jumla : TZS ${totalAmount.toLocaleString()}\n📍 Kwenda: ${destination || 'hapa'}\n\nAsante kwa kuchagua huduma zetu!`;
    
    setMessageText(message);
    setShowMessageModal(true);
  };

  const sendMessage = () => {
    if (!phone) {
      toast.error('Please enter a phone number first.');
      return;
    }
    
    let formattedPhone = phone.replace(/\s/g, '');
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = '+' + formattedPhone;
    }
    
    const smsUrl = `sms:${formattedPhone}?body=${encodeURIComponent(messageText)}`;
    window.open(smsUrl, '_blank');
    
    setShowMessageModal(false);
    toast.success('Message sent successfully!');
  };

  const printReceipt = (shipment) => {
    const receiptWindow = window.open('', '_blank', 'width=302,height=600');

    const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const itemsRows = shipment.items.map((item, idx) => `
      <tr>
        <td class="c">${idx + 1}</td>
        <td class="name">${toUpperCase(item.name)}</td>
        <td class="c">${item.qty}</td>
        <td class="r">${item.total.toLocaleString()}</td>
      </tr>
    `).join('');

    const receiptHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt</title>
        <style>
          @page { size: 58mm auto; margin: 0; }
          * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          html, body { width: 58mm; }
          body {
            font-family: 'Courier New', Consolas, monospace;
            font-size: 11px;
            font-weight: 400;
            color: #111;
            padding: 2mm 3mm;
          }
          .center { text-align: center; }
          .right { text-align: right; }
          .company { font-size: 14px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
          .meta { font-size: 9px; color: #555; margin-top: 2px; font-weight: 400; }
          .divider { border-top: 1px dashed #999; margin: 5px 0; }
          .divider.solid { border-top: 1px solid #333; }
          .row { display: flex; justify-content: space-between; font-size: 10.5px; padding: 1.5px 0; font-weight: 400; }
          .row span:first-child { color: #444; }
          .row .value { font-weight: 500; text-align: right; max-width: 65%; color: #111; }
          table { width: 100%; border-collapse: collapse; margin-top: 2px; font-size: 10px; }
          thead th { border-bottom: 1px solid #333; padding: 2px 0; font-size: 9px; text-transform: uppercase; text-align: left; font-weight: 600; color: #444; }
          thead th.c, td.c { text-align: center; }
          thead th.r, td.r { text-align: right; }
          tbody td { padding: 2px 0; vertical-align: top; font-weight: 400; }
          tbody tr td.name { font-weight: 500; }
          tfoot td { padding-top: 4px; font-weight: 600; font-size: 12px; border-top: 1px solid #333; }
          .payment-line { display: flex; justify-content: center; margin: 6px 0 2px; }
          .payment-badge { border: 1px solid #333; padding: 2px 10px; font-size: 9px; font-weight: 600; letter-spacing: 0.5px; }
          .footer { text-align: center; margin-top: 6px; }
          .footer .thanks { font-size: 10.5px; font-weight: 600; }
          .footer .phone { font-size: 10px; margin-top: 2px; font-weight: 400; }
          .footer .copy { font-size: 8px; color: #888; margin-top: 4px; font-weight: 400; }
        </style>
      </head>
      <body>
        <div class="center">
          <div class="company">${toUpperCase(companyName || 'Manifest System')}</div>
          <div class="meta">${dateStr} • ${timeStr}</div>
        </div>

        <div class="divider solid"></div>

        <div class="row"><span>Truck</span><span class="value">${toUpperCase(truckPlate) || '—'}</span></div>
        <div class="row"><span>Driver</span><span class="value">${toUpperCase(driverName) || '—'}</span></div>
        <div class="row"><span>Sender</span><span class="value">${toUpperCase(shipment.sender) || '—'}</span></div>
        <div class="row"><span>Customer</span><span class="value">${toUpperCase(shipment.customer) || '—'}</span></div>
        <div class="row"><span>Destination</span><span class="value">${toUpperCase(shipment.destination) || '—'}</span></div>
        ${shipment.phone ? `<div class="row"><span>Phone</span><span class="value">${shipment.phone}</span></div>` : ''}

        <div class="divider"></div>

        <table>
          <thead>
            <tr>
              <th class="c" style="width:10%;">#</th>
              <th style="width:50%;">Item</th>
              <th class="c" style="width:15%;">Qty</th>
              <th class="r" style="width:25%;">Amt</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">TOTAL</td>
              <td class="r">${shipment.total?.toLocaleString() || 0}</td>
            </tr>
          </tfoot>
        </table>
        <div class="right meta" style="margin-top:2px;">Amount in TZS</div>

        <div class="payment-line">
          <span class="payment-badge">${toUpperCase(shipment.payment || 'unpaid')}</span>
        </div>

        <div class="divider solid"></div>

        <div class="footer">
          <div class="thanks">Thank you for your business!</div>
          ${companyPhone ? `<div class="phone">Kwa mawasiliano: ${companyPhone}</div>` : ''}
          <div class="copy">© ${new Date().getFullYear()} ${toUpperCase(companyName || 'Manifest System')}</div>
        </div>
        <script>
          window.onload = function () {
            window.print();
            window.onafterprint = function () { window.close(); };
          };
        <\/script>
      </body>
      </html>
    `;

    receiptWindow.document.write(receiptHtml);
    receiptWindow.document.close();
  };

  const addShipmentToManifest = async () => {
    if (!sender || !customer || !destination) {
      toast.error('Please fill in Sender, Customer, and Destination fields.');
      return;
    }

    const items = goodsRows
      .filter(row => row.name.trim() && row.qty && row.rate)
      .map(row => ({
        name: toUpperCase(row.name.trim()),
        qty: parseInt(row.qty),
        rate: parseFloat(row.rate),
        total: parseFloat(row.qty) * parseFloat(row.rate)
      }));

    if (items.length === 0) {
      toast.error('Please add at least one valid goods item.');
      return;
    }

    if (!manifest) {
      toast.error('No manifest selected. Please create a new one.');
      return;
    }

    setLoading(true);
    try {
      const supervisorValue = supervisor === 'GEORGE' ? '' : toUpperCase(supervisor || '');
      
      await api.put(`/manifests/${manifest._id}`, {
        truckPlate: toUpperCase(truckPlate || ''),
        driverName: toUpperCase(driverName || ''),
        supervisor: supervisorValue,
        manifestDate: manifestDate
      });

      const totalAmount = items.reduce((sum, item) => sum + item.total, 0);
      const shipmentData = {
        sender: toUpperCase(sender),
        customer: toUpperCase(customer),
        phone: phone,
        destination: toUpperCase(destination),
        items: items,
        payment: paymentStatus ? 'paid' : 'unpaid',
        status: loadingStatus ? 'loaded' : 'not-loaded',
        manifestId: manifest._id
      };

      const res = await api.post('/shipments', shipmentData);
      
      printReceipt({
        ...shipmentData,
        total: totalAmount
      });

      setGoodsRows([{ id: Date.now(), name: '', qty: '', rate: '', total: 0 }]);
      setSender('');
      setCustomer('');
      setPhone('');
      setDestination('');
      setPaymentStatus(false);
      setLoadingStatus(false);

      toast.success('Shipment added and receipt printed!');
      
      await fetchAllManifests();
      
      if (manifest) {
        setTruckPlate(toUpperCase(manifest.truckPlate || truckPlate));
        setDriverName(toUpperCase(manifest.driverName || driverName));
        const supVal = manifest.supervisor || '';
        setSupervisor(supVal === 'GEORGE' ? '' : toUpperCase(supVal));
      }
    } catch (err) {
      console.error('Error adding shipment:', err);
      toast.error(err.response?.data?.error || 'Failed to add shipment');
    } finally {
      setLoading(false);
    }
  };

  const deleteShipment = async (shipmentId) => {
    if (!confirm('Delete this shipment?')) return;
    try {
      await api.delete(`/shipments/${shipmentId}`);
      toast.success('Shipment deleted');
      fetchAllManifests();
    } catch (err) {
      toast.error('Failed to delete shipment');
    }
  };

  const handleDeleteManifest = async (manifestId, e) => {
    e.stopPropagation();
    if (!confirm('Delete this manifest and all its shipments?')) return;
    
    try {
      await api.delete(`/manifests/${manifestId}`);
      toast.success('Manifest deleted successfully');
      await fetchAllManifests();
    } catch (err) {
      toast.error('Failed to delete manifest');
    }
  };

  const handleEditManifest = (manifestId, e) => {
    e.stopPropagation();
    navigate(`/edit-manifest/${manifestId}`);
  };

  // This navigates to the View Manifest page
  const handleViewManifest = (manifestId, e) => {
    e.stopPropagation();
    navigate(`/view-manifest/${manifestId}`);
  };

  // Pagination
  const totalPages = Math.ceil(allManifests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentManifests = allManifests.slice(startIndex, endIndex);

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

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  // Calculate total items and unloaded items in current manifest
  const allShipments = manifest?.shipments || [];
  const totalItems = allShipments.reduce((sum, s) => sum + (s.items?.length || 0), 0) || 0;
  
  const unloadedShipments = allShipments.filter(s => s.status !== 'loaded');
  const unloadedCount = unloadedShipments.reduce((sum, s) => sum + (s.items?.length || 0), 0) || 0;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const goToViewManifest = () => {
    if (manifest?._id) {
      navigate(`/manifest-items/${manifest._id}`);
    }
  };

  const goToBannerManifestItems = (e) => {
    e.stopPropagation();
    if (manifest?._id) {
      navigate(`/manifest-items/${manifest._id}`);
    }
  };

  return (
    <div className="manifest-manager-page">
      {/* Message Modal */}
      {showMessageModal && (
        <div className="modal-overlay" onClick={() => setShowMessageModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><i className="fas fa-comment-dots" style={{ color: '#4da6ff' }}></i> Send Message</h3>
              <button className="modal-close" onClick={() => setShowMessageModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="modal-recipient">
                <strong>To:</strong> {phone || 'No phone number provided'}
              </div>
              <div className="modal-message">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows="10"
                  className="message-textarea"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowMessageModal(false)}>
                Cancel
              </button>
              <button className="btn-send" onClick={sendMessage} disabled={!phone}>
                <i className="fas fa-paper-plane"></i> Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header">
        <div className="header-left">
          <div className="header-title">
            <h2>Manifest Manager</h2>
            <span className="subtitle">Create and manage manifests</span>
          </div>
        </div>
      </div>

      {/* Manifest Details */}
      <div className="card manifest-details-card">
        <div className="card-header">
          <h3>
            <i className="fas fa-clipboard-list" style={{ fontSize: '16px', color: '#4a5568', marginRight: '6px' }}></i>
            Manifest Details
          </h3>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Date</label>
            <input type="date" value={manifestDate} onChange={(e) => setManifestDate(e.target.value)} placeholder="DATE" />
          </div>
          <div className="form-group">
            <label>Truck Plate</label>
            <input 
              type="text" 
              value={truckPlate} 
              onChange={handleTruckPlateChange} 
              placeholder="T 123 ABC"
            />
          </div>
          <div className="form-group">
            <label>Driver Name</label>
            <input 
              type="text" 
              value={driverName} 
              onChange={handleDriverNameChange} 
              placeholder="ENTER DRIVER NAME"
            />
          </div>
          <div className="form-group">
            <label>Supervisor</label>
            <input 
              type="text" 
              value={supervisor} 
              onChange={handleSupervisorChange} 
              placeholder="ENTER SUPERVISOR NAME"
            />
          </div>
        </div>
      </div>

      {/* Quick Shipment Entry */}
      <div className="card add-shipment-card">
        <div className="card-header">
          <h3>
            <span style={{ display: 'inline-flex', alignItems: 'center', position: 'relative', marginRight: '6px' }}>
              <i className="fas fa-check-circle" style={{ fontSize: '16px' }}></i>
              <i className="fas fa-plus" style={{ fontSize: '8px', position: 'absolute', bottom: '-1px', right: '-3px', background: 'white', borderRadius: '50%', padding: '1px', fontWeight: 'bold' }}></i>
            </span>
            Quick Shipment Entry
          </h3>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Sender Name</label>
            <input 
              type="text" 
              value={sender} 
              onChange={handleSenderChange} 
              placeholder="Enter sender name"
            />
          </div>
          <div className="form-group">
            <label>Customer Name</label>
            <input 
              type="text" 
              value={customer} 
              onChange={handleCustomerChange} 
              placeholder="Enter customer name"
            />
          </div>
          <div className="form-group">
            <label>Phone / Contact</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="255 7xx 000 000" />
          </div>
          <div className="form-group">
            <label>Destination</label>
            <input 
              type="text" 
              value={destination} 
              onChange={handleDestinationChange} 
              placeholder="Enter destination city"
            />
          </div>
        </div>

        {/* Goods List */}
        <div className="goods-section">
          <div className="goods-header">
            <label>
              <i className="fas fa-box" style={{ fontSize: '16px', color: '#4a5568', marginRight: '6px' }}></i>
              Goods List
            </label>
            <span 
              className="add-item-link" 
              onClick={addGoodsRow}
              style={{ 
                color: '#a78bfa', 
                cursor: 'pointer', 
                fontSize: '13px', 
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#8b5cf6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#a78bfa';
              }}
            >
              <i className="fas fa-plus-circle" style={{ fontSize: '14px', color: '#a78bfa', transition: 'all 0.3s ease' }}></i> Add Item
            </span>
          </div>

          {goodsRows.map((row) => (
            <div key={row.id} className="goods-row">
              <div className="goods-row-fields">
                <div className="goods-field">
                  <label>Item Name</label>
                  <input 
                    type="text" 
                    value={row.name} 
                    onChange={(e) => updateGoodsRow(row.id, 'name', e.target.value)} 
                    placeholder="Item name"
                  />
                </div>
                <div className="goods-field">
                  <label>Qty</label>
                  <input 
                    type="number" 
                    value={row.qty} 
                    onChange={(e) => updateGoodsRow(row.id, 'qty', e.target.value)} 
                    placeholder="0" 
                  />
                </div>
                <div className="goods-field">
                  <label>Rate</label>
                  <input 
                    type="number" 
                    value={row.rate} 
                    onChange={(e) => updateGoodsRow(row.id, 'rate', e.target.value)} 
                    placeholder="0" 
                  />
                </div>
                <div className="goods-field">
                  <label>Total Amount</label>
                  <input 
                    type="text" 
                    value={formatTotal(row.total)} 
                    placeholder="0.00" 
                    readOnly 
                    style={{ 
                      background: '#f7fafc',
                      fontWeight: '600',
                      color: '#0a1628'
                    }}
                  />
                </div>
                <div className="goods-field goods-delete-pc">
                  <label>&nbsp;</label>
                  <span 
                    className="delete-icon-pc"
                    onClick={() => removeGoodsRow(row.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </span>
                </div>
              </div>
              
              <div className="goods-row-total-mobile">
                <div className="goods-total-mobile">
                  <label>Total Amount</label>
                  <input 
                    type="text" 
                    value={formatTotal(row.total)} 
                    placeholder="0.00" 
                    readOnly 
                  />
                </div>
                <span 
                  className="delete-icon-mobile"
                  onClick={() => removeGoodsRow(row.id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Switches for Payment and Loading Status */}
        <div className="toggle-group">
          <div className="toggle-item">
            <div className="toggle-label-wrapper">
              <span className="toggle-status-label">Payment Status</span>
              <div 
                className={`toggle-switch ${paymentStatus ? 'active' : ''}`}
                onClick={() => setPaymentStatus(!paymentStatus)}
              >
                <span className="toggle-track">
                  <span className="toggle-thumb"></span>
                </span>
                <span className="toggle-label-text">
                  {paymentStatus ? 'Paid' : 'Unpaid'}
                </span>
              </div>
            </div>
          </div>

          <div className="toggle-item">
            <div className="toggle-label-wrapper">
              <span className="toggle-status-label">Loaded Status</span>
              <div 
                className={`toggle-switch ${loadingStatus ? 'active' : ''}`}
                onClick={() => setLoadingStatus(!loadingStatus)}
              >
                <span className="toggle-track">
                  <span className="toggle-thumb"></span>
                </span>
                <span className="toggle-label-text">
                  {loadingStatus ? 'Loaded' : 'Not Loaded'}
                </span>
              </div>
            </div>
          </div>

          <div className="toggle-item toggle-action">
            <button className="btn-add-shipment" onClick={addShipmentToManifest}>
              Add & Print
            </button>
            <button 
              className="btn-message" 
              onClick={generateMessage} 
              title="Send Message"
            >
              <img 
                src={messageIcon} 
                alt="Message" 
              />
            </button>
          </div>
        </div>
      </div>

      {/* CURRENT SESSION BANNER */}
      <div className="current-session-banner" onClick={goToViewManifest} style={{ cursor: 'pointer' }}>
        <div className="current-session-left">
          <span className="session-title">CURRENT SESSION</span>
          <span className="session-subtitle">
            {unloadedCount > 0 ? `${unloadedCount} item(s) remain unloaded` : 'All items loaded ✓'}
          </span>
        </div>
        <div className="current-session-right">
          <div 
            className="item-count-box"
            onClick={goToBannerManifestItems}
            style={{ cursor: 'pointer' }}
          >
            <div className="count-row count-row-top">
              <span className="count-number">{totalItems}</span>
            </div>
            <div className="count-row count-row-middle">
              <span className="count-arrow">
                <i className="fas fa-chevron-right"></i>
              </span>
            </div>
            <div className="count-row count-row-bottom">
              <span className="count-label">items</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Manifests — SAVED (ACTIVE) manifests only */}
      <div className="card recent-manifests-card">
        <div className="card-header">
          <h3><i className="fas fa-history"></i> Recent Manifests</h3>
          <span className="badge">Total: {allManifests.length}</span>
        </div>

        {allManifests.length === 0 ? (
          <p style={{ color: '#a0aec0', textAlign: 'center', padding: '20px' }}>
            No saved manifests yet. Load and finalize the current session to see it here.
          </p>
        ) : (
          <>
            <div className="recent-manifests-list">
              {currentManifests.map((m) => {
                const totalItems = m.totals?.totalItems || 0;
                
                return (
                  <div key={m._id} className="manifest-summary-card">
                    <div className="manifest-summary-header">
                      {/* Clicking the plate number navigates to View Manifest */}
                      <span 
                        className="manifest-summary-plate"
                        onClick={(e) => handleViewManifest(m._id, e)}
                        style={{ 
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontWeight: '600',
                          color: '#0a1628'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#e8edf5';
                          e.currentTarget.style.color = '#4da6ff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#0a1628';
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.transform = 'scale(0.95)';
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        {toUpperCase(m.truckPlate || 'No Plate')}
                      </span>
                      <span className="manifest-summary-date">
                        {formatDate(m.createdAt || m.manifestDate)}
                      </span>
                      <span className="manifest-summary-items-count">
                        • {totalItems} Items
                      </span>
                    </div>
                    <div className="manifest-summary-actions">
                      <button 
                        className="btn-action btn-edit"
                        onClick={(e) => handleEditManifest(m._id, e)}
                        title="Edit Manifest"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn-action btn-delete"
                        onClick={(e) => handleDeleteManifest(m._id, e)}
                        title="Delete Manifest"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {allManifests.length > itemsPerPage && (
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
                  <span>of</span>
                  <span>{totalPages}</span>
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


    </div>
  );
}