import React, { useState } from 'react';
import { BookOpen, Download, Filter, Calendar } from 'lucide-react';

const Passbook = () => {
    const [selectedApp, setSelectedApp] = useState('');
    const [filterMonth, setFilterMonth] = useState('');
    const [filterYear, setFilterYear] = useState('2025');

    // Mock applications
    const applications = [
        { code: 'RJ-2024-APP-011', name: 'Metro Station' },
        { code: 'RJ-2024-APP-012', name: 'Cement Factory' },
        { code: 'RJ-2025-APP-004', name: 'Residential Complex' }
    ];

    // Mock passbook entries
    const passbookEntries = [
        { date: '15-Dec-2025', particular: 'Application Submitted', debit: 0, credit: 0, balance: 0, status: 'Completed', remarks: 'Fresh application submitted' },
        { date: '16-Dec-2025', particular: 'Processing Fee Payment', debit: 5000, credit: 0, balance: 5000, status: 'Paid', remarks: 'Payment ID: PAY-2025-001' },
        { date: '18-Dec-2025', particular: 'Document Verification', debit: 0, credit: 0, balance: 5000, status: 'In Progress', remarks: 'Under review by EO' },
        { date: '20-Dec-2025', particular: 'Query Raised', debit: 0, credit: 0, balance: 5000, status: 'Action Required', remarks: 'Response required by 25-Dec-2025' },
        { date: '22-Dec-2025', particular: 'Query Response Submitted', debit: 0, credit: 0, balance: 5000, status: 'Completed', remarks: 'Additional documents submitted' },
        { date: '23-Dec-2025', particular: 'Approval Fee', debit: 15000, credit: 0, balance: 20000, status: 'Pending', remarks: 'Payment due by 30-Dec-2025' }
    ];

    return (
        <div className="passbook-container">
            {/* Alert */}
            <div className="alert-section">
                <p className="alert-text">
                    <strong>RAJASTHAN GROUND WATER AUTHORITY (RGWA)</strong>: Passbook shows complete transaction history and status updates for your applications.
                </p>
            </div>

            {/* Page Header */}
            <div className="page-header">
                <h2>Application Passbook</h2>
                <p className="subtitle">View complete transaction ledger and status timeline</p>
            </div>

            {/* Filters */}
            <div className="section-card">
                <h3 className="section-title">
                    <Filter size={20} />
                    Select Application
                </h3>

                <div className="filter-row">
                    <div className="form-group">
                        <label>Application Code *</label>
                        <select
                            value={selectedApp}
                            onChange={(e) => setSelectedApp(e.target.value)}
                            className="form-control"
                        >
                            <option value="">-- Select Application --</option>
                            {applications.map(app => (
                                <option key={app.code} value={app.code}>
                                    {app.code} - {app.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Month</label>
                        <select value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)} className="form-control">
                            <option value="">All Months</option>
                            <option value="December">December</option>
                            <option value="November">November</option>
                            <option value="October">October</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Year</label>
                        <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)} className="form-control">
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary">
                            <Download size={16} />
                            Download Passbook
                        </button>
                    </div>
                </div>
            </div>

            {/* Passbook Entries */}
            {selectedApp && (
                <div className="section-card">
                    <h3 className="section-title">
                        <BookOpen size={20} />
                        Transaction Ledger - {selectedApp}
                    </h3>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>DATE</th>
                                    <th>PARTICULAR</th>
                                    <th>DEBIT (₹)</th>
                                    <th>CREDIT (₹)</th>
                                    <th>BALANCE (₹)</th>
                                    <th>STATUS</th>
                                    <th>REMARKS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passbookEntries.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.date}</td>
                                        <td>{entry.particular}</td>
                                        <td className={entry.debit > 0 ? 'amount-debit' : ''}>{entry.debit > 0 ? entry.debit.toLocaleString() : '-'}</td>
                                        <td className={entry.credit > 0 ? 'amount-credit' : ''}>{entry.credit > 0 ? entry.credit.toLocaleString() : '-'}</td>
                                        <td className="amount-balance">{entry.balance.toLocaleString()}</td>
                                        <td>
                                            <span className={`badge badge-${entry.status === 'Completed' ? 'success' : entry.status === 'Paid' ? 'info' : entry.status === 'Pending' ? 'warning' : 'danger'}`}>
                                                {entry.status}
                                            </span>
                                        </td>
                                        <td>{entry.remarks}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="summary-box">
                        <div className="summary-item">
                            <span className="summary-label">Total Debit:</span>
                            <span className="summary-value debit">₹ 20,000</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Total Credit:</span>
                            <span className="summary-value credit">₹ 0</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Current Balance:</span>
                            <span className="summary-value balance">₹ 20,000</span>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .passbook-container {
          padding-bottom: 50px;
        }

        .alert-section {
          background: #d1ecf1;
          border-left: 5px solid #0c5460;
          padding: 15px;
          margin-bottom: 25px;
          border-radius: 6px;
        }

        .alert-text {
          color: #0c5460;
          font-size: 0.9rem;
          margin: 0;
        }

        .page-header {
          background: white;
          padding: 25px;
          border-radius: 8px;
          margin-bottom: 25px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .page-header h2 {
          font-size: 1.8rem;
          color: #333;
          margin: 0 0 8px 0;
        }

        .subtitle {
          color: #666;
          font-size: 0.95rem;
          margin: 0;
        }

        .section-card {
          background: white;
          padding: 25px;
          border-radius: 8px;
          margin-bottom: 25px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.2rem;
          color: #007bff;
          margin: 0 0 20px 0;
          padding-bottom: 15px;
          border-bottom: 2px solid #f0f0f0;
        }

        .filter-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          align-items: end;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #555;
          margin-bottom: 8px;
        }

        .form-control {
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 0.95rem;
        }

        .form-control:focus {
          outline: none;
          border-color: #007bff;
        }

        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        }

        .btn-primary {
          background: #007bff;
          color: white;
        }

        .btn-primary:hover {
          background: #0056b3;
        }

        .table-container {
          overflow-x: auto;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          margin-bottom: 20px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1000px;
        }

        th {
          background-color: #0f3c5f;
          color: white;
          padding: 12px 10px;
          font-size: 0.75rem;
          text-transform: uppercase;
          text-align: left;
          border: 1px solid #0f3c5f;
          font-weight: 600;
        }

        td {
          padding: 12px 10px;
          border: 1px solid #dee2e6;
          font-size: 0.85rem;
          color: #333;
        }

        tr:hover {
          background-color: #f8f9fa;
        }

        .amount-debit {
          color: #dc3545;
          font-weight: 600;
        }

        .amount-credit {
          color: #28a745;
          font-weight: 600;
        }

        .amount-balance {
          font-weight: 600;
          color: #007bff;
        }

        .badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .badge-success {
          background: #d4edda;
          color: #155724;
        }

        .badge-info {
          background: #d1ecf1;
          color: #0c5460;
        }

        .badge-warning {
          background: #fff3cd;
          color: #856404;
        }

        .badge-danger {
          background: #f8d7da;
          color: #721c24;
        }

        .summary-box {
          display: flex;
          justify-content: flex-end;
          gap: 30px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 6px;
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .summary-label {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 5px;
        }

        .summary-value {
          font-size: 1.2rem;
          font-weight: 700;
        }

        .summary-value.debit {
          color: #dc3545;
        }

        .summary-value.credit {
          color: #28a745;
        }

        .summary-value.balance {
          color: #007bff;
        }
      `}</style>
        </div>
    );
};

export default Passbook;
