import React, { useState } from 'react';
import { CreditCard, Download, Eye, Receipt } from 'lucide-react';

const PaymentDetails = () => {
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    // Mock payment data
    const payments = [
        {
            id: 'INV-2025-001',
            applicationCode: 'RJ-2025-APP-004',
            projectName: 'Residential Complex',
            type: 'Processing Fee',
            amount: 5000,
            date: '16-Dec-2025',
            paymentMode: 'Online',
            transactionId: 'TXN20251216001',
            status: 'Paid',
            receiptNo: 'RCP-2025-001'
        },
        {
            id: 'INV-2025-002',
            applicationCode: 'RJ-2025-APP-004',
            projectName: 'Residential Complex',
            type: 'Approval Fee',
            amount: 15000,
            date: '23-Dec-2025',
            paymentMode: 'Pending',
            transactionId: '-',
            status: 'Pending',
            receiptNo: '-',
            dueDate: '30-Dec-2025'
        },
        {
            id: 'INV-2024-015',
            applicationCode: 'RJ-2024-APP-011',
            projectName: 'Metro Station',
            type: 'Processing Fee',
            amount: 8000,
            date: '20-Nov-2024',
            paymentMode: 'Online',
            transactionId: 'TXN20241120015',
            status: 'Paid',
            receiptNo: 'RCP-2024-015'
        },
        {
            id: 'INV-2024-016',
            applicationCode: 'RJ-2024-APP-011',
            projectName: 'Metro Station',
            type: 'Approval Fee',
            amount: 25000,
            date: '05-Dec-2024',
            paymentMode: 'Online',
            transactionId: 'TXN20241205016',
            status: 'Paid',
            receiptNo: 'RCP-2024-016'
        }
    ];

    const handleDownloadReceipt = (payment) => {
        alert(`Downloading receipt: ${payment.receiptNo}`);
    };

    return (
        <div className="payment-details-container">
            {/* Alert */}
            <div className="alert-section">
                <p className="alert-text">
                    <strong>RAJASTHAN GROUND WATER AUTHORITY (RGWA)</strong>: All payments must be made online. Download receipts for your records.
                </p>
            </div>

            {/* Page Header */}
            <div className="page-header">
                <h2>Payment Details</h2>
                <p className="subtitle">View invoices, receipts, and payment history</p>
            </div>

            {/* Payment List */}
            <div className="section-card">
                <h3 className="section-title">
                    <CreditCard size={20} />
                    Invoice & Payment History
                </h3>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>INVOICE NO.</th>
                                <th>APPLICATION CODE</th>
                                <th>PROJECT NAME</th>
                                <th>PAYMENT TYPE</th>
                                <th>AMOUNT (₹)</th>
                                <th>DATE</th>
                                <th>STATUS</th>
                                <th>RECEIPT NO.</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{payment.id}</td>
                                    <td>{payment.applicationCode}</td>
                                    <td>{payment.projectName}</td>
                                    <td>{payment.type}</td>
                                    <td className="amount">₹ {payment.amount.toLocaleString()}</td>
                                    <td>{payment.date}</td>
                                    <td>
                                        <span className={`badge ${payment.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td>{payment.receiptNo}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="btn-icon"
                                                onClick={() => setSelectedInvoice(payment)}
                                                title="View Details"
                                            >
                                                <Eye size={14} />
                                            </button>
                                            {payment.status === 'Paid' && (
                                                <button
                                                    className="btn-icon btn-success"
                                                    onClick={() => handleDownloadReceipt(payment)}
                                                    title="Download Receipt"
                                                >
                                                    <Download size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Invoice Detail Modal */}
            {selectedInvoice && (
                <div className="modal-overlay" onClick={() => setSelectedInvoice(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Invoice Details - {selectedInvoice.id}</h3>
                            <button className="close-btn" onClick={() => setSelectedInvoice(null)}>✕</button>
                        </div>

                        <div className="modal-body">
                            <div className="invoice-header">
                                <div className="invoice-logo">
                                    <h2>RAJASTHAN GROUND WATER AUTHORITY</h2>
                                    <p>Government of Rajasthan</p>
                                </div>
                                <div className="invoice-number">
                                    <h3>{selectedInvoice.id}</h3>
                                    <p>Date: {selectedInvoice.date}</p>
                                </div>
                            </div>

                            <div className="invoice-details">
                                <div className="detail-section">
                                    <h4>Application Details</h4>
                                    <p><strong>Application Code:</strong> {selectedInvoice.applicationCode}</p>
                                    <p><strong>Project Name:</strong> {selectedInvoice.projectName}</p>
                                </div>

                                <div className="detail-section">
                                    <h4>Payment Details</h4>
                                    <p><strong>Payment Type:</strong> {selectedInvoice.type}</p>
                                    <p><strong>Amount:</strong> ₹ {selectedInvoice.amount.toLocaleString()}</p>
                                    <p><strong>Payment Mode:</strong> {selectedInvoice.paymentMode}</p>
                                    {selectedInvoice.transactionId !== '-' && (
                                        <p><strong>Transaction ID:</strong> {selectedInvoice.transactionId}</p>
                                    )}
                                    <p><strong>Status:</strong> <span className={`badge ${selectedInvoice.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>{selectedInvoice.status}</span></p>
                                    {selectedInvoice.dueDate && (
                                        <p className="due-date"><strong>Due Date:</strong> {selectedInvoice.dueDate}</p>
                                    )}
                                </div>
                            </div>

                            {selectedInvoice.status === 'Paid' && (
                                <div className="receipt-section">
                                    <Receipt size={40} />
                                    <h4>Receipt No: {selectedInvoice.receiptNo}</h4>
                                    <p>Payment received successfully</p>
                                </div>
                            )}

                            {selectedInvoice.status === 'Pending' && (
                                <div className="payment-action">
                                    <button className="btn btn-primary btn-large">
                                        <CreditCard size={18} />
                                        Pay Now - ₹ {selectedInvoice.amount.toLocaleString()}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="modal-footer">
                            {selectedInvoice.status === 'Paid' && (
                                <button className="btn btn-success" onClick={() => handleDownloadReceipt(selectedInvoice)}>
                                    <Download size={18} />
                                    Download Receipt
                                </button>
                            )}
                            <button className="btn btn-secondary" onClick={() => setSelectedInvoice(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .payment-details-container {
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

        .table-container {
          overflow-x: auto;
          border: 1px solid #dee2e6;
          border-radius: 6px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1100px;
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

        .amount {
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

        .badge-warning {
          background: #fff3cd;
          color: #856404;
        }

        .action-buttons {
          display: flex;
          gap: 5px;
        }

        .btn-icon {
          background: #007bff;
          color: white;
          border: none;
          padding: 6px 8px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .btn-icon:hover {
          background: #0056b3;
        }

        .btn-icon.btn-success {
          background: #28a745;
        }

        .btn-icon.btn-success:hover {
          background: #218838;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 8px;
          max-width: 700px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 25px;
          border-bottom: 2px solid #f0f0f0;
        }

        .modal-header h3 {
          margin: 0;
          color: #333;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #999;
        }

        .close-btn:hover {
          color: #333;
        }

        .modal-body {
          padding: 25px;
        }

        .invoice-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #007bff;
        }

        .invoice-logo h2 {
          margin: 0 0 5px 0;
          color: #007bff;
          font-size: 1.3rem;
        }

        .invoice-logo p {
          margin: 0;
          color: #666;
        }

        .invoice-number {
          text-align: right;
        }

        .invoice-number h3 {
          margin: 0 0 5px 0;
          color: #333;
        }

        .invoice-number p {
          margin: 0;
          color: #666;
        }

        .invoice-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .detail-section h4 {
          margin: 0 0 10px 0;
          color: #007bff;
          font-size: 1rem;
        }

        .detail-section p {
          margin: 5px 0;
          color: #333;
          font-size: 0.9rem;
        }

        .due-date {
          color: #dc3545;
          font-weight: 600;
        }

        .receipt-section {
          background: #d4edda;
          padding: 20px;
          border-radius: 6px;
          text-align: center;
          margin: 20px 0;
        }

        .receipt-section h4 {
          margin: 10px 0 5px 0;
          color: #155724;
        }

        .receipt-section p {
          margin: 0;
          color: #155724;
        }

        .payment-action {
          text-align: center;
          margin: 20px 0;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding: 20px 25px;
          border-top: 2px solid #f0f0f0;
        }

        .btn {
          display: flex;
          align-items: center;
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

        .btn-success {
          background: #28a745;
          color: white;
        }

        .btn-success:hover {
          background: #218838;
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
        }

        .btn-secondary:hover {
          background: #5a6268;
        }

        .btn-large {
          padding: 15px 30px;
          font-size: 1.1rem;
        }
      `}</style>
        </div>
    );
};

export default PaymentDetails;
