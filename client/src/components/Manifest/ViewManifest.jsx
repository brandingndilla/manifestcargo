import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import toast from 'react-hot-toast';
import { useCompany, useCompanyPhone } from '../../hooks/useCompany';

export default function ViewManifest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const companyName = useCompany();
  const companyPhone = useCompanyPhone();
  const [manifest, setManifest] = useState(null);
  const [allManifests, setAllManifests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const printRef = useRef();

  useEffect(() => {
    fetchAllManifests();
  }, []);

  const toUpperCase = (value) => {
    return value ? value.toUpperCase() : '';
  };

  const fetchAllManifests = async () => {
    try {
      const res = await api.get('/manifests');
      const sorted = res.data.sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setAllManifests(sorted);

      if (id) {
        const found = sorted.find(m => m._id === id);
        if (found) {
          setManifest(found);
        }
      } else if (sorted.length > 0) {
        setManifest(sorted[0]);
      }
    } catch (err) {
      toast.error('Failed to load manifests');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  if (allManifests.length === 0) {
    return (
      <div className="view-manifest-page">
        <div className="view-page-header">
          <div className="view-header-left">
            <button className="view-back-btn" onClick={() => navigate('/manifest-manager')}>
              <i className="fas fa-arrow-left"></i>
            </button>
            <div className="view-header-title">
              <h2>View Manifest</h2>
              <span className="view-header-subtitle">Complete manifest details with identity and items</span>
            </div>
          </div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <i className="fas fa-inbox" style={{ fontSize: '48px', color: '#a0aec0', display: 'block', marginBottom: '12px' }}></i>
          <p style={{ color: '#a0aec0' }}>No manifests found. <a href="/manifest-manager" style={{ color: '#2b6cb0' }}>Create your first manifest</a></p>
        </div>
      </div>
    );
  }

  const shipments = manifest?.shipments || [];
  const filteredShipments = shipments.filter(s =>
    s.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.sender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.items?.some(item => item.name?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalItems = shipments.reduce((sum, s) =>
    sum + s.items?.reduce((a, i) => a + i.qty, 0) || 0, 0);
  const grandTotal = shipments.reduce((sum, s) => sum + (s.total || 0), 0);
  const collected = shipments.filter(s => s.payment === 'paid').reduce((sum, s) => sum + (s.total || 0), 0);
  const outstanding = grandTotal - collected;

  const recipients = shipments.filter(s => s.phone && s.phone.trim() !== '');

  const printManifest = () => {
    if (shipments.length === 0) {
      toast.error('No shipments to print');
      return;
    }

    const originalTitle = document.title;
    document.title = ' ';

    window.onafterprint = () => {
      document.title = originalTitle;
      window.onafterprint = null;
    };

    window.print();
  };

  // ========== UPDATED PRINT RECEIPT FUNCTION - Same as Manifest Manager ==========
  const printReceipt = (shipment) => {
    const receiptWindow = window.open('', '_blank', 'width=302,height=600');

    if (!receiptWindow) {
      toast.error('Please allow popups for this site');
      return;
    }

    const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Each shipment item gets its OWN row
    const itemsRows = shipment.items.map((item) => `
      <div class="item-row">
        <div class="item-name">${toUpperCase(item.name)}</div>
        <div class="item-values">
          <span class="qty">QTY: ${item.qty}</span>
        </div>
      </div>
    `).join('');

    // Format phone numbers - split by comma or new line
    const formatPhoneNumbers = (phoneStr) => {
      if (!phoneStr) return '<div class="contact-line">—</div>';
      const numbers = phoneStr.split(/[,;\n]/).map(p => p.trim()).filter(p => p);
      if (numbers.length === 0) return '<div class="contact-line">—</div>';
      return numbers.map(num => `<div class="contact-line">${num}</div>`).join('');
    };

    const contactLines = companyPhone ? formatPhoneNumbers(companyPhone) : '<div class="contact-line">—</div>';

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
            font-size: 14px;
            font-weight: 700;
            color: #000;
            padding: 3mm 3mm;
            line-height: 1.5;
          }
          .center { text-align: center; }
          .right { text-align: right; }
          .company { font-size: 20px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; }
          .subtitle { font-size: 16px; font-weight: 800; text-transform: uppercase; margin-top: 2px; }
          .meta { font-size: 11px; font-weight: 600; color: #333; margin-top: 3px; }
          .divider-eq { margin: 8px 0; font-size: 12px; font-weight: 700; letter-spacing: 1px; white-space: nowrap; overflow: hidden; }
          .divider-dash { border-top: 1.5px dashed #000; margin: 8px 0; }
          .divider-solid { border-top: 2px solid #000; margin: 8px 0; }
          .line { font-size: 14px; font-weight: 700; text-transform: uppercase; padding: 2px 0; word-break: break-word; }

          .items-block { margin-top: 4px; }
          .item-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            padding: 5px 0;
            border-bottom: 1px dashed #999;
          }
          .item-row:last-child { border-bottom: none; }
          .item-name { flex: 1; padding-right: 8px; }
          .item-values { text-align: right; white-space: nowrap; }
          .item-values .qty { display: block; font-size: 14px; font-weight: 800; }

          .status-line {
            display: flex;
            justify-content: space-between;
            margin: 10px 0 4px;
            font-size: 14px;
            font-weight: 800;
            text-transform: uppercase;
          }
          .status-label {
            font-weight: 800;
          }
          .status-value {
            font-weight: 800;
          }

          .contact-block { margin-top: 4px; }
          .contact-title { font-size: 14px; font-weight: 800; text-transform: uppercase; }
          .contact-line { font-size: 16px; font-weight: 800; padding: 3px 0; }

          .footer { text-align: center; margin-top: 10px; }
          .footer .thanks { font-size: 14px; font-weight: 800; }
          .footer .copy { font-size: 10px; font-weight: 600; color: #444; margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="center">
          <div class="company">${toUpperCase(companyName || 'Manifest System')}</div>
          <div class="subtitle">Way Bill</div>
        </div>

        <div class="divider-eq">====================</div>

        <div class="line">Date: ${dateStr}</div>
        <div class="line">Time: ${timeStr}</div>
        <div class="line">Truck: ${toUpperCase(manifest?.truckPlate || '—')}</div>
        <div class="line">Driver: ${toUpperCase(manifest?.driverName || '—')}</div>
        <div class="line">Sender: ${toUpperCase(shipment.sender) || '—'}</div>

        <div class="divider-dash"></div>

        <div class="line">Customer: ${toUpperCase(shipment.customer) || '—'}</div>
        <div class="line">Phone: ${shipment.phone || '—'}</div>
        <div class="line">Dest: ${toUpperCase(shipment.destination) || '—'}</div>

        <div class="divider-dash"></div>

        <div class="items-block">
          ${itemsRows}
        </div>

        <!-- Status Line - Left: STATUS, Right: [PAID/UNPAID] -->
        <div class="status-line">
          <span class="status-label">STATUS</span>
          <span class="status-value">[${toUpperCase(shipment.payment || 'unpaid')}]</span>
        </div>

        <div class="divider-solid"></div>

        <div class="contact-block">
          <div class="contact-title">Kwa Mawasiliano</div>
          <div class="contact-title">Zaidi Tupigie:</div>
          ${contactLines}
        </div>

        <div class="divider-solid"></div>

        <div class="footer">
          <div class="thanks">Thank you for your business!</div>
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

  const sendArrivalMessage = () => {
    if (shipments.length === 0) {
      toast.error('No shipments to send messages to.');
      return;
    }

    if (recipients.length === 0) {
      toast.error('No customer phone numbers found in this manifest.');
      return;
    }

    const message = document.getElementById('arrivalMessage')?.value || 'Your goods have arrived!';

    const phoneNumbers = recipients.map(s => `${s.customer}: ${s.phone}`).join('\n');
    const fullText = `RECIPIENTS:\n${phoneNumbers}\n\nMESSAGE:\n${message}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullText).then(() => {
        toast.success('Recipients and message copied to clipboard!');
      }).catch(() => {
        copyToClipboardFallback(fullText);
      });
    } else {
      copyToClipboardFallback(fullText);
    }
  };

  const copyToClipboardFallback = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    toast.success('Recipients and message copied to clipboard!');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getPaymentBadgeClass = (payment) => {
    return payment === 'paid' ? 'paid' : 'unpaid';
  };

  const getPaymentText = (payment) => {
    return payment === 'paid' ? 'Paid' : 'Unpaid';
  };

  const getStatusText = (status) => {
    if (status === 'loaded' || status === 'saved') {
      return 'Loaded';
    }
    return 'Not Loaded';
  };

  const getStatusBadgeClass = (status) => {
    if (status === 'loaded' || status === 'saved') {
      return 'loaded';
    }
    return 'not-loaded';
  };

  const goBack = () => {
    navigate('/manifest-manager');
  };

  const formatRowNumber = (num) => {
    return String(num + 1).padStart(3, '0');
  };

  return (
    <div className="view-manifest-page" ref={printRef}>
      {/* Page Header */}
      <div className="view-page-header">
        <div className="view-header-left">
          <button className="view-back-btn" onClick={goBack}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="view-header-title">
            <h2>View Manifest</h2>
            <span className="view-header-subtitle">Complete manifest details with identity and items</span>
          </div>
        </div>
      </div>

      {manifest && (
        <div>
          {/* ===== REGULAR VIEW CONTENT (shown on screen) ===== */}
          <div>
            {/* MANIFEST IDENTITY */}
            <div className="view-section-title">MANIFEST IDENTITY</div>

            <div className="view-identity-card">
              <div className="view-identity-row">
                <div className="view-identity-item">
                  <span className="view-identity-label truck-plate-label">
                    <i className="fas fa-truck" style={{ color: '#718096', fontSize: '16px', marginRight: '8px' }}></i>
                    {manifest?.truckPlate || 'No Plate'}
                  </span>
                </div>
                <div className="view-identity-item">
                  <span className="view-identity-label">DATE</span>
                  <span className="view-identity-value">{formatDate(manifest?.manifestDate || manifest?.createdAt)}</span>
                </div>
              </div>

              <div className="view-identity-row">
                <div className="view-identity-item driver-name-item">
                  <span className="view-identity-label driver-name-label">
                    <i className="fas fa-user" style={{ color: '#718096', fontSize: '11px', marginRight: '6px' }}></i>
                    DRIVER
                  </span>
                  <span className="view-identity-value driver-name-value">{manifest?.driverName || '—'}</span>
                </div>
                <div className="view-identity-item">
                  <span className="view-identity-label">PERSON IN CHARGE</span>
                  <span className="view-identity-value">{manifest?.supervisor || '—'}</span>
                </div>
              </div>
            </div>

            {/* FREIGHT REVENUE */}
            <div className="view-section-title">FREIGHT REVENUE</div>

            <div className="view-revenue-wrapper">
              <div className="view-revenue-scroll">
                <div className="view-revenue-item total">
                  <span className="view-revenue-label">Total Amount</span>
                  <span className="view-revenue-amount">TZS {grandTotal.toLocaleString()}</span>
                  <span className="view-revenue-sub">{totalItems} Items</span>
                </div>
                <div className="view-revenue-item collected">
                  <span className="view-revenue-label">Collected</span>
                  <span className="view-revenue-amount">TZS {collected.toLocaleString()}</span>
                </div>
                <div className="view-revenue-item outstanding">
                  <span className="view-revenue-label">Outstanding</span>
                  <span className="view-revenue-amount">TZS {outstanding.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* MANIFEST ITEMS */}
            <div className="view-items-section-header">
              <span className="view-section-title" style={{ marginBottom: '0' }}>MANIFEST ITEMS</span>
              <span className="view-items-total">{totalItems} Total</span>
            </div>

            <div className="view-items-card">
              <div className="view-search-wrapper">
                <i className="fas fa-search view-search-icon"></i>
                <input
                  type="text"
                  className="view-search-input"
                  placeholder="Search customer, goods, destination..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* ===== PC VIEW - TABLE ===== */}
              <div className="view-items-table-wrapper">
                <table className="view-items-table">
                  <thead>
                    <tr>
                      <th className="col-row">#</th>
                      <th className="col-customer">Customer</th>
                      <th className="col-phone">Phone</th>
                      <th className="col-goods">Goods</th>
                      <th className="col-qty">Qty</th>
                      <th className="col-destination">Destination</th>
                      <th className="col-rate">Rate <span className="currency-header">(TZS)</span></th>
                      <th className="col-amount">Amount <span className="currency-header">(TZS)</span></th>
                      <th className="col-payment">Payment</th>
                      <th className="col-status">Status</th>
                      <th className="col-actions">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredShipments.length === 0 ? (
                      <tr>
                        <td colSpan="11" style={{ textAlign: 'center', padding: '40px', color: '#a0aec0' }}>
                          No shipments found
                        </td>
                      </tr>
                    ) : (
                      filteredShipments.map((shipment, index) => {
                        const items = shipment.items || [];
                        const totalQty = items.reduce((sum, i) => sum + (i.qty || 0), 0);
                        const firstRate = items.length > 0 ? items[0]?.rate || 0 : 0;

                        return (
                          <tr key={shipment._id || index}>
                            <td className="col-row">{formatRowNumber(index)}</td>
                            <td className="col-customer">{shipment.customer}</td>
                            <td className="col-phone">{shipment.phone || '—'}</td>
                            <td className="col-goods">
                              <div className="goods-list">
                                {items.length > 0 ? (
                                  items.map((item, idx) => (
                                    <div key={idx} className="goods-item">
                                      {item.name}
                                    </div>
                                  ))
                                ) : (
                                  <span style={{ color: '#a0aec0' }}>—</span>
                                )}
                              </div>
                            </td>
                            <td className="col-qty">{totalQty}</td>
                            <td className="col-destination">{shipment.destination || '—'}</td>
                            <td className="col-rate">{firstRate.toLocaleString()}</td>
                            <td className="col-amount">{shipment.total?.toLocaleString() || 0}</td>
                            <td className="col-payment">
                              <span className={`payment-badge ${getPaymentBadgeClass(shipment.payment)}`}>
                                {getPaymentText(shipment.payment)}
                              </span>
                            </td>
                            <td className="col-status">
                              <span className={`status-badge ${getStatusBadgeClass(shipment.status)}`}>
                                {getStatusText(shipment.status)}
                              </span>
                            </td>
                            <td className="col-actions">
                              <button
                                className="action-btn btn-delete"
                                onClick={() => {
                                  if (window.confirm(`Are you sure you want to delete ${shipment.customer}?`)) {
                                    toast.success(`Deleted ${shipment.customer}`);
                                  }
                                }}
                                title="Delete"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* ===== MOBILE VIEW - CARDS ===== */}
              <div className="view-items-list">
                {filteredShipments.length === 0 ? (
                  <div className="view-empty-state">No shipments found</div>
                ) : (
                  filteredShipments.map((shipment, index) => {
                    const itemCount = shipment.items?.length || 0;
                    const itemsText = shipment.items?.map(item => item.name).join(', ') || '';

                    return (
                      <div key={shipment._id || index} className="view-item-card">
                        <div className="view-item-top-row">
                          <div className="view-customer-left">
                            <span className="view-item-label">CUSTOMER</span>
                            <span className="view-customer-name">{shipment.customer}</span>
                          </div>
                          <div className="view-item-actions">
                            <span className={`view-payment-badge ${getPaymentBadgeClass(shipment.payment)}`}>
                              {getPaymentText(shipment.payment)}
                            </span>
                            <button
                              className="view-item-print"
                              onClick={() => printReceipt(shipment)}
                              title="Print Receipt"
                            >
                              <i className="fas fa-print"></i>
                            </button>
                          </div>
                        </div>

                        <div className="view-item-row">
                          <span className="view-item-label">SENDER</span>
                          <span className="sender-value">{shipment.sender || '—'}</span>
                        </div>

                        <div className="view-item-goods-row">
                          <div className="view-item-goods-left">
                            <span className="view-item-label">GOODS</span>
                            <span className="goods-value">
                              {itemCount} • {itemsText} {shipment.destination ? `→ ${shipment.destination}` : ''}
                            </span>
                          </div>
                          <span className="view-item-amount">TZS {shipment.total?.toLocaleString() || 0}</span>
                        </div>

                        <div className="view-item-status-row" style={{ marginTop: '6px', paddingTop: '6px', borderTop: '1px solid #e8ecf0' }}>
                          <span className="view-item-label">STATUS</span>
                          <span className={`view-status-badge ${getStatusBadgeClass(shipment.status)}`}>
                            {getStatusText(shipment.status)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="view-action-buttons">
              <button className="view-btn view-btn-print" onClick={printManifest}>
                <i className="fas fa-print"></i> Print A4
              </button>
              <button className="view-btn view-btn-sms" onClick={sendArrivalMessage}>
                <i className="fas fa-sms"></i> Arrival SMS
              </button>
              <button className="view-btn view-btn-hesabu">
                <i className="fas fa-calculator"></i> Hesabu
              </button>
            </div>
          </div>

          {/* ===== PRINT CONTENT (hidden on screen, shown when printing) ===== */}
          <div className="print-content" style={{ display: 'none' }}>
            <div className="print-title">{companyName || 'Manifest System'}</div>
            <div className="print-subtitle">
              {manifest?.truckPlate} | {formatDate(manifest?.manifestDate || manifest?.createdAt)}
            </div>

            {/* Print Identity Card */}
            <div className="view-identity-card">
              <div className="view-identity-row">
                <div className="view-identity-item">
                  <span className="view-identity-label truck-plate-label">
                    <i className="fas fa-truck" style={{ color: '#718096', fontSize: '16px', marginRight: '8px' }}></i>
                    {manifest?.truckPlate || 'No Plate'}
                  </span>
                </div>
                <div className="view-identity-item">
                  <span className="view-identity-label">DATE</span>
                  <span className="view-identity-value">{formatDate(manifest?.manifestDate || manifest?.createdAt)}</span>
                </div>
              </div>

              <div className="view-identity-row">
                <div className="view-identity-item driver-name-item">
                  <span className="view-identity-label driver-name-label">
                    <i className="fas fa-user" style={{ color: '#718096', fontSize: '11px', marginRight: '6px' }}></i>
                    DRIVER
                  </span>
                  <span className="view-identity-value driver-name-value">{manifest?.driverName || '—'}</span>
                </div>
                <div className="view-identity-item">
                  <span className="view-identity-label">PERSON IN CHARGE</span>
                  <span className="view-identity-value">{manifest?.supervisor || '—'}</span>
                </div>
              </div>
            </div>

            {/* Print Table - Full width with all columns */}
            <div className="print-table-title">MANIFEST ITEMS</div>
            <div className="view-items-table-wrapper">
              <table className="view-items-table">
                <thead>
                  <tr>
                    <th className="col-row">#</th>
                    <th className="col-customer">CUSTOMER</th>
                    <th className="col-phone">PHONE</th>
                    <th className="col-goods">GOODS</th>
                    <th className="col-qty">QTY</th>
                    <th className="col-destination">DESTINATION</th>
                    <th className="col-rate">RATE (TZS)</th>
                    <th className="col-amount">AMOUNT (TZS)</th>
                    <th className="col-payment">PAYMENT</th>
                    <th className="col-status">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShipments.map((shipment, index) => {
                    const items = shipment.items || [];
                    const totalQty = items.reduce((sum, i) => sum + (i.qty || 0), 0);
                    const firstRate = items.length > 0 ? items[0]?.rate || 0 : 0;

                    const customerName = shipment.customer?.toUpperCase() || '—';
                    const phone = shipment.phone || '—';
                    const destination = shipment.destination?.toUpperCase() || '—';

                    return (
                      <tr key={shipment._id || index}>
                        <td className="col-row">{formatRowNumber(index)}</td>
                        <td className="col-customer">{customerName}</td>
                        <td className="col-phone">{phone}</td>
                        <td className="col-goods">
                          <div className="goods-list">
                            {items.length > 0 ? (
                              items.map((item, idx) => (
                                <div key={idx} className="goods-item">
                                  {item.name?.toUpperCase() || ''}
                                </div>
                              ))
                            ) : (
                              <span style={{ color: '#a0aec0' }}>—</span>
                            )}
                          </div>
                        </td>
                        <td className="col-qty">{totalQty}</td>
                        <td className="col-destination">{destination}</td>
                        <td className="col-rate">{firstRate.toLocaleString()}</td>
                        <td className="col-amount">{shipment.total?.toLocaleString() || 0}</td>
                        <td className="col-payment">
                          <span className={`payment-badge ${getPaymentBadgeClass(shipment.payment)}`}>
                            {getPaymentText(shipment.payment).toUpperCase()}
                          </span>
                        </td>
                        <td className="col-status">
                          <span className={`status-badge ${getStatusBadgeClass(shipment.status)}`}>
                            {getStatusText(shipment.status).toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Print Revenue Summary - As a table with same width */}
            <div className="print-revenue-summary">
              <table className="revenue-summary-table">
                <thead>
                  <tr>
                    <th colSpan="2">REVENUE SUMMARY</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Items:</td>
                    <td className="revenue-value">{totalItems}</td>
                  </tr>
                  <tr className="total-amount">
                    <td>Total Amount:</td>
                    <td className="revenue-value">TZS {grandTotal.toLocaleString()}</td>
                  </tr>
                  <tr className="collected-amount">
                    <td>Collected:</td>
                    <td className="revenue-value">TZS {collected.toLocaleString()}</td>
                  </tr>
                  <tr className="outstanding-amount">
                    <td>Outstanding:</td>
                    <td className="revenue-value">TZS {outstanding.toLocaleString()}</td>
                  </tr>
                  <tr className="total-revenue">
                    <td>Total Revenue:</td>
                    <td className="revenue-value">TZS {grandTotal.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* ===== PRINT STYLES ===== */
        @media print {
          @page {
            margin: 0;
          }

          body * {
            visibility: hidden !important;
          }

          .print-content,
          .print-content * {
            visibility: visible !important;
          }

          .print-content {
            display: block !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            padding: 20px 30px !important;
            background: white !important;
            visibility: visible !important;
          }

          .print-title {
            text-align: center !important;
            font-size: 18px !important;
            font-weight: 700 !important;
            letter-spacing: 0.5px !important;
            text-transform: uppercase !important;
            color: #0a1628 !important;
            margin-bottom: 4px !important;
          }

          .print-subtitle {
            text-align: center !important;
            font-size: 12px !important;
            color: #718096 !important;
            margin-bottom: 15px !important;
          }

          .view-identity-card {
            border: 1px solid #e2e8f0 !important;
            box-shadow: none !important;
            page-break-inside: avoid !important;
            margin-bottom: 12px !important;
            display: block !important;
            background: white !important;
            padding: 12px 16px !important;
            border-radius: 4px !important;
            width: 100% !important;
          }

          .view-identity-row {
            display: flex !important;
            justify-content: space-between !important;
            padding: 4px 0 !important;
          }

          .view-identity-item {
            display: flex !important;
            flex-direction: column !important;
          }

          .view-identity-label {
            font-size: 9px !important;
            font-weight: 600 !important;
            color: #718096 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
          }

          .view-identity-value {
            font-size: 14px !important;
            font-weight: 700 !important;
            color: #0a1628 !important;
          }

          .truck-plate-label {
            font-size: 16px !important;
            font-weight: 600 !important;
            color: #0a1628 !important;
            text-transform: none !important;
          }

          .driver-name-label {
            font-size: 9px !important;
            font-weight: 600 !important;
            color: #718096 !important;
            text-transform: uppercase !important;
          }

          .driver-name-value {
            font-size: 14px !important;
            font-weight: 700 !important;
            color: #0a1628 !important;
          }

          .print-table-title {
            font-size: 14px !important;
            font-weight: 700 !important;
            margin: 12px 0 8px 0 !important;
            color: #0a1628 !important;
            letter-spacing: 1px !important;
            text-transform: uppercase !important;
          }

          .view-items-table-wrapper {
            display: block !important;
            overflow: visible !important;
            width: 100% !important;
          }

          .view-items-table {
            width: 100% !important;
            border-collapse: collapse !important;
            font-size: 10px !important;
          }

          .view-items-table th {
            background: #1a2a4a !important;
            color: white !important;
            padding: 6px 8px !important;
            font-size: 9px !important;
            border: 1px solid #2d3748 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            font-weight: 700 !important;
            text-align: left !important;
          }

          .view-items-table td {
            padding: 5px 8px !important;
            font-size: 10px !important;
            border: 1px solid #e2e8f0 !important;
            text-transform: uppercase !important;
            vertical-align: middle !important;
          }

          .view-items-table tbody tr:nth-child(even) {
            background: #f7fafc !important;
          }

          .col-row {
            text-align: center !important;
            width: 30px !important;
          }

          .col-customer {
            min-width: 80px !important;
          }

          .col-phone {
            min-width: 80px !important;
          }

          .col-goods {
            min-width: 100px !important;
          }

          .col-qty {
            text-align: center !important;
            width: 40px !important;
          }

          .col-destination {
            min-width: 80px !important;
          }

          .col-rate {
            text-align: right !important;
            width: 80px !important;
          }

          .col-amount {
            text-align: right !important;
            width: 100px !important;
          }

          .col-payment {
            text-align: center !important;
            width: 70px !important;
          }

          .col-status {
            text-align: center !important;
            width: 70px !important;
          }

          .payment-badge {
            padding: 2px 10px !important;
            border-radius: 20px !important;
            font-size: 8px !important;
            font-weight: 700 !important;
            display: inline-block !important;
            text-transform: uppercase !important;
            min-width: 40px !important;
            text-align: center !important;
          }

          .payment-badge.paid {
            background: #d4edda !important;
            color: #155724 !important;
          }

          .payment-badge.unpaid {
            background: #f8d7da !important;
            color: #721c24 !important;
          }

          .status-badge {
            padding: 2px 10px !important;
            border-radius: 20px !important;
            font-size: 8px !important;
            font-weight: 700 !important;
            display: inline-block !important;
            text-transform: uppercase !important;
            min-width: 50px !important;
            text-align: center !important;
          }

          .status-badge.loaded {
            background: #d1ecf1 !important;
            color: #0c5460 !important;
          }

          .status-badge.not-loaded {
            background: #e2e8f0 !important;
            color: #4a5568 !important;
          }

          .goods-list {
            display: flex !important;
            flex-direction: column !important;
            gap: 1px !important;
          }

          .goods-item {
            font-size: 9px !important;
          }

          /* ===== REVENUE SUMMARY TABLE - Same width as main table ===== */
          .print-revenue-summary {
            display: block !important;
            margin: 12px 0 !important;
            width: 100% !important;
          }

          .revenue-summary-table {
            width: 100% !important;
            border-collapse: collapse !important;
            font-size: 10px !important;
          }

          .revenue-summary-table th {
            background: #1a2a4a !important;
            color: white !important;
            padding: 6px 8px !important;
            font-size: 9px !important;
            border: 1px solid #2d3748 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            font-weight: 700 !important;
            text-align: left !important;
          }

          .revenue-summary-table td {
            padding: 5px 8px !important;
            font-size: 10px !important;
            border: 1px solid #e2e8f0 !important;
            vertical-align: middle !important;
          }

          .revenue-summary-table tbody tr:nth-child(even) {
            background: #f7fafc !important;
          }

          .revenue-summary-table .revenue-value {
            text-align: right !important;
            font-weight: 600 !important;
          }

          .revenue-summary-table .total-amount td {
            color: #0a1628 !important;
            font-weight: 600 !important;
          }

          .revenue-summary-table .collected-amount td {
            color: #2ecc71 !important;
            font-weight: 600 !important;
          }

          .revenue-summary-table .outstanding-amount td {
            color: #e74c3c !important;
            font-weight: 600 !important;
          }

          .revenue-summary-table .total-revenue td {
            font-weight: 700 !important;
            border-top: 2px solid #0a1628 !important;
            color: #0a1628 !important;
            font-size: 11px !important;
          }
        }

        /* ===== MOBILE FREIGHT REVENUE - SWIPE ROW ===== */
        @media (max-width: 768px) {
          .view-revenue-scroll {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            gap: 10px !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
          }

          .view-revenue-scroll::-webkit-scrollbar {
            display: none !important;
          }

          .view-revenue-item {
            flex: 0 0 calc(50% - 5px) !important;
            scroll-snap-align: start !important;
          }
        }
      `}</style>
    </div>
  );
}