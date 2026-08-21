import React, { useState } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';

export default function Reports() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const generateReport = async () => {
    if (!fromDate || !toDate) {
      toast.error('Please select date range.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.get('/shipments');
      const shipments = res.data;

      const from = new Date(fromDate);
      const to = new Date(toDate);
      to.setHours(23, 59, 59, 999);

      const filtered = shipments.filter(s => {
        const d = new Date(s.createdAt);
        return d >= from && d <= to;
      });

      setReportData(filtered);
      toast.success(`Found ${filtered.length} shipments`);
    } catch (err) {
      toast.error('Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    if (!reportData || reportData.length === 0) {
      toast.error('No data to download.');
      return;
    }

    let csv = 'Date,Sender,Customer,Destination,Items,Total,Payment,Status\n';
    reportData.forEach(s => {
      const date = new Date(s.createdAt).toLocaleDateString();
      const items = s.items?.map(i => `${i.name}(${i.qty})`).join('; ') || '';
      csv += `${date},${s.sender},${s.customer},${s.destination},"${items}",${s.total},${s.payment},${s.status}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `manifest-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success('Report downloaded successfully!');
  };

  const downloadPDF = () => {
    if (!reportData || reportData.length === 0) {
      toast.error('No data to download.');
      return;
    }

    setDownloading(true);

    // Create print window
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    const totalValue = reportData.reduce((sum, s) => sum + (s.total || 0), 0);
    const totalItems = reportData.reduce((sum, s) => 
      sum + (s.items?.reduce((a, i) => a + i.qty, 0) || 0), 0);
    const paidAmount = reportData.filter(s => s.payment === 'paid').reduce((sum, s) => sum + (s.total || 0), 0);
    const unpaidAmount = totalValue - paidAmount;

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Report - ${fromDate} to ${toDate}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Inter', 'Segoe UI', sans-serif; 
            padding: 20px; 
            color: #2d3748;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .report-container { max-width: 800px; margin: 0 auto; }
          .report-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            text-align: center;
          }
          .report-header h1 { font-size: 24px; margin-bottom: 5px; }
          .report-header p { font-size: 13px; opacity: 0.9; }
          .report-info {
            background: #f7fafc;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .report-info-item { display: flex; gap: 8px; padding: 5px; }
          .report-info-label { font-weight: 600; color: #4a5568; font-size: 12px; }
          .report-info-value { color: #1a202c; font-size: 13px; }
          .summary-cards {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin-bottom: 20px;
          }
          .summary-card {
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            color: white;
          }
          .summary-card.paid { background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); }
          .summary-card.unpaid { background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%); }
          .summary-card.items { background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%); }
          .summary-card.total { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
          .summary-card .number { font-size: 20px; font-weight: 700; margin-bottom: 3px; }
          .summary-card .label { font-size: 11px; text-transform: uppercase; opacity: 0.9; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          table thead { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
          table th {
            padding: 10px 12px;
            text-align: left;
            color: white;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          table td {
            padding: 10px 12px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 12px;
          }
          table tbody tr:nth-child(even) { background: #f7fafc; }
          .grand-total-row {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          }
          .grand-total-row td {
            color: white !important;
            font-weight: 700;
            font-size: 13px;
          }
          .status-paid { color: #22543d; font-weight: 600; }
          .status-unpaid { color: #742a2a; font-weight: 600; }
          .report-footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 15px;
            border-top: 2px solid #e2e8f0;
            color: #718096;
            font-size: 11px;
          }
          @media print {
            body { padding: 0; }
            .report-container { max-width: 100%; }
          }
        </style>
      </head>
      <body>
        <div class="report-container">
          <div class="report-header">
            <h1>MANIFEST REPORT</h1>
            <p>Period: ${fromDate} to ${toDate}</p>
            <p>Generated: ${new Date().toLocaleString()}</p>
          </div>

          <div class="report-info">
            <div class="report-info-item">
              <span class="report-info-label">Total Shipments:</span>
              <span class="report-info-value">${reportData.length}</span>
            </div>
            <div class="report-info-item">
              <span class="report-info-label">Total Items:</span>
              <span class="report-info-value">${totalItems}</span>
            </div>
            <div class="report-info-item">
              <span class="report-info-label">Paid Amount:</span>
              <span class="report-info-value">TZS ${paidAmount.toLocaleString()}</span>
            </div>
            <div class="report-info-item">
              <span class="report-info-label">Unpaid Amount:</span>
              <span class="report-info-value">TZS ${unpaidAmount.toLocaleString()}</span>
            </div>
          </div>

          <div class="summary-cards">
            <div class="summary-card paid">
              <div class="number">TZS ${paidAmount.toLocaleString()}</div>
              <div class="label">Paid</div>
            </div>
            <div class="summary-card unpaid">
              <div class="number">TZS ${unpaidAmount.toLocaleString()}</div>
              <div class="label">Unpaid</div>
            </div>
            <div class="summary-card items">
              <div class="number">${totalItems}</div>
              <div class="label">Items</div>
            </div>
            <div class="summary-card total">
              <div class="number">TZS ${totalValue.toLocaleString()}</div>
              <div class="label">Total</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Sender</th>
                <th>Customer</th>
                <th>Destination</th>
                <th>Items</th>
                <th>Total (TZS)</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              ${reportData.map((s, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td>${new Date(s.createdAt).toLocaleDateString()}</td>
                  <td>${s.sender}</td>
                  <td>${s.customer}</td>
                  <td>${s.destination}</td>
                  <td>${s.items?.reduce((sum, i) => sum + i.qty, 0) || 0}</td>
                  <td>TZS ${s.total?.toLocaleString() || 0}</td>
                  <td class="${s.payment === 'paid' ? 'status-paid' : 'status-unpaid'}">${s.payment}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr class="grand-total-row">
                <td colspan="6" style="text-align: right;">GRAND TOTAL</td>
                <td colspan="2">TZS ${totalValue.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>

          <div class="report-footer">
            <p>© ${new Date().getFullYear()} Manifest System. All rights reserved.</p>
          </div>
        </div>
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    
    setTimeout(() => {
      setDownloading(false);
    }, 1000);
  };

  const totalValue = reportData?.reduce((sum, s) => sum + (s.total || 0), 0) || 0;
  const totalItems = reportData?.reduce((sum, s) => 
    sum + (s.items?.reduce((a, i) => a + i.qty, 0) || 0), 0) || 0;
  const loadedCount = reportData?.filter(s => s.status === 'loaded').length || 0;
  const paidAmount = reportData?.filter(s => s.payment === 'paid').reduce((sum, s) => sum + (s.total || 0), 0) || 0;
  const unpaidAmount = totalValue - paidAmount;

  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h2>Reports</h2>
          <span className="subtitle">Generate and download reports</span>
        </div>
      </div>

      <div className="card">
        <div className="form-row">
          <div className="form-group">
            <label>From Date</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>To Date</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button className="btn btn-primary" onClick={generateReport} disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
              <i className="fas fa-chart-bar"></i> {loading ? 'Generating...' : 'Generate Report'}
            </button>
          </div>
        </div>

        <div id="reportResults">
          {reportData === null ? (
            <p style={{ color: '#718096', textAlign: 'center', padding: '24px' }}>
              Select date range and click "Generate Report" to see summary.
            </p>
          ) : reportData.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#a0aec0' }}>
              <i className="fas fa-inbox" style={{ fontSize: '36px', display: 'block', marginBottom: '10px' }}></i>
              No shipments found for this period.
            </div>
          ) : (
            <div>
              {/* Enhanced Summary Cards */}
              <div className="enhanced-summary-grid">
                <div className="enhanced-summary-card total-shipments">
                  <div className="number">{reportData.length}</div>
                  <div className="label">Total Shipments</div>
                </div>
                <div className="enhanced-summary-card total-items">
                  <div className="number">{totalItems}</div>
                  <div className="label">Total Items</div>
                </div>
                <div className="enhanced-summary-card paid-amount">
                  <div className="number">TZS {paidAmount.toLocaleString()}</div>
                  <div className="label">Paid Amount</div>
                </div>
                <div className="enhanced-summary-card unpaid-amount">
                  <div className="number">TZS {unpaidAmount.toLocaleString()}</div>
                  <div className="label">Unpaid Amount</div>
                </div>
                <div className="enhanced-summary-card total-value">
                  <div className="number">TZS {totalValue.toLocaleString()}</div>
                  <div className="label">Total Value</div>
                </div>
              </div>

              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Sender</th>
                      <th>Customer</th>
                      <th>Destination</th>
                      <th>Items</th>
                      <th style={{ color: '#1a365d', fontWeight: '700' }}>Total (TZS)</th>
                      <th>Payment</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((s, idx) => (
                      <tr key={idx}>
                        <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                        <td>{s.sender}</td>
                        <td>{s.customer}</td>
                        <td>{s.destination}</td>
                        <td>{s.items?.reduce((sum, i) => sum + i.qty, 0) || 0}</td>
                        <td style={{ fontWeight: '700', color: '#1a365d' }}>TZS {s.total?.toLocaleString() || 0}</td>
                        <td>
                          <span className={`badge-status ${s.payment === 'paid' ? 'paid' : 'unpaid'}`}>
                            {s.payment}
                          </span>
                        </td>
                        <td>
                          <span className={`badge-status ${s.status === 'loaded' ? 'loaded' : 'not-loaded'}`}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="grand-total-row">
                      <td colSpan="5" style={{ textAlign: 'right', fontSize: '14px' }}>
                        <strong>TOTAL</strong>
                      </td>
                      <td style={{ fontSize: '15px', color: '#1a365d' }}>
                        <strong>TZS {totalValue.toLocaleString()}</strong>
                      </td>
                      <td colSpan="2"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div style={{ marginTop: '12px', textAlign: 'center', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={downloadPDF} disabled={downloading}>
                  <i className="fas fa-file-pdf"></i> {downloading ? 'Preparing...' : 'Download PDF'}
                </button>
                <button className="btn btn-success" onClick={downloadCSV}>
                  <i className="fas fa-file-csv"></i> Download CSV
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}