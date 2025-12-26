import React, { useState } from 'react';
import { Search, Upload, Send, FileText, Calendar, Download, Eye } from 'lucide-react';

const SelfCompliance = () => {
    const [selectedApplication, setSelectedApplication] = useState('');
    const [complianceData, setComplianceData] = useState({
        complianceMonth: '',
        complianceYear: '',
        actualExtraction: '',
        approvedQuantum: '',
        waterLevel: '',
        remarks: '',
        document: null
    });

    // Mock approved applications
    const approvedApplications = [
        { id: 'RJ-2024-APP-011', name: 'Metro Station', quantum: 38.5, approvalDate: '15-Dec-2024' },
        { id: 'RJ-2024-APP-012', name: 'Cement Factory', quantum: 55.0, approvalDate: '20-Nov-2024' },
        { id: 'RJ-2025-APP-004', name: 'Residential Complex', quantum: 8.5, approvalDate: '10-Dec-2025' },
        { id: 'RJ-2025-APP-007', name: 'Marble Quarry', quantum: 18.7, approvalDate: '25-Nov-2025' },
        { id: 'RJ-2025-APP-010', name: 'Apartment Building', quantum: 12.3, approvalDate: '05-Oct-2025' }
    ];

    // Mock compliance history
    const complianceHistory = [
        { month: 'November', year: '2025', extraction: 35.2, approved: 38.5, status: 'Submitted', date: '05-Dec-2025' },
        { month: 'October', year: '2025', extraction: 37.8, approved: 38.5, status: 'Approved', date: '03-Nov-2025' },
        { month: 'September', year: '2025', extraction: 36.5, approved: 38.5, status: 'Approved', date: '02-Oct-2025' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setComplianceData({
            ...complianceData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setComplianceData({
            ...complianceData,
            document: e.target.files[0]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedApplication) {
            alert('Please select an application');
            return;
        }
        alert('Compliance report submitted successfully!');
        // Reset form
        setComplianceData({
            complianceMonth: '',
            complianceYear: '',
            actualExtraction: '',
            approvedQuantum: '',
            waterLevel: '',
            remarks: '',
            document: null
        });
    };

    const selectedApp = approvedApplications.find(app => app.id === selectedApplication);

    return (
        <div className="self-compliance-container">
            {/* Alert */}
            <div className="alert-section">
                <p className="alert-text">
                    <strong>RAJASTHAN GROUND WATER AUTHORITY (RGWA)</strong>: Self Compliance Report must be submitted monthly. Ensure all data is accurate and supported by relevant documents.
                </p>
            </div>

            {/* Page Header */}
            <div className="page-header">
                <h2>Self Compliance Report</h2>
                <p className="subtitle">Submit monthly groundwater extraction compliance data</p>
            </div>

            {/* Application Selection */}
            <div className="section-card">
                <h3 className="section-title">
                    <FileText size={20} />
                    Select Approved Application
                </h3>

                <div className="form-group">
                    <label>Choose Application *</label>
                    <select
                        value={selectedApplication}
                        onChange={(e) => setSelectedApplication(e.target.value)}
                        className="form-control"
                        required
                    >
                        <option value="">-- Select Application --</option>
                        {approvedApplications.map(app => (
                            <option key={app.id} value={app.id}>
                                {app.id} - {app.name} (Approved Quantum: {app.quantum} KLD)
                            </option>
                        ))}
                    </select>
                </div>

                {selectedApp && (
                    <div className="app-details-box">
                        <h4>Application Details</h4>
                        <div className="details-grid">
                            <div className="detail-item">
                                <span className="label">Application Code:</span>
                                <span className="value">{selectedApp.id}</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Project Name:</span>
                                <span className="value">{selectedApp.name}</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Approved Quantum:</span>
                                <span className="value">{selectedApp.quantum} KLD</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Approval Date:</span>
                                <span className="value">{selectedApp.approvalDate}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Compliance Form */}
            {selectedApplication && (
                <div className="section-card">
                    <h3 className="section-title">
                        <Calendar size={20} />
                        Compliance Data Entry
                    </h3>

                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Compliance Month *</label>
                                <select
                                    name="complianceMonth"
                                    value={complianceData.complianceMonth}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                >
                                    <option value="">Select Month</option>
                                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Compliance Year *</label>
                                <select
                                    name="complianceYear"
                                    value={complianceData.complianceYear}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                >
                                    <option value="">Select Year</option>
                                    <option value="2025">2025</option>
                                    <option value="2024">2024</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Actual Groundwater Extraction (KLD) *</label>
                                <input
                                    type="number"
                                    name="actualExtraction"
                                    value={complianceData.actualExtraction}
                                    onChange={handleChange}
                                    className="form-control"
                                    step="0.01"
                                    placeholder="Enter actual extraction"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Approved Quantum (KLD)</label>
                                <input
                                    type="number"
                                    value={selectedApp?.quantum || ''}
                                    className="form-control"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Water Level (meters below ground level) *</label>
                            <input
                                type="number"
                                name="waterLevel"
                                value={complianceData.waterLevel}
                                onChange={handleChange}
                                className="form-control"
                                step="0.1"
                                placeholder="Enter water level"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Remarks / Additional Information</label>
                            <textarea
                                name="remarks"
                                value={complianceData.remarks}
                                onChange={handleChange}
                                className="form-control"
                                rows="4"
                                placeholder="Enter any additional information or remarks"
                            />
                        </div>

                        <div className="form-group">
                            <label>Upload Supporting Document (PDF) *</label>
                            <div className="file-upload-wrapper">
                                {!complianceData.document ? (
                                    <label className="file-upload-label">
                                        <Upload size={20} />
                                        <span>Choose File (PDF, max 5MB)</span>
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            className="file-input"
                                            required
                                        />
                                    </label>
                                ) : (
                                    <div className="file-selected">
                                        <FileText size={18} />
                                        <span>{complianceData.document.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => setComplianceData({ ...complianceData, document: null })}
                                            className="remove-file-btn"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">
                                <Send size={18} />
                                Submit Compliance Report
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Compliance History */}
            <div className="section-card">
                <h3 className="section-title">
                    <FileText size={20} />
                    Compliance History
                </h3>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>SR NO.</th>
                                <th>MONTH</th>
                                <th>YEAR</th>
                                <th>ACTUAL EXTRACTION (KLD)</th>
                                <th>APPROVED QUANTUM (KLD)</th>
                                <th>STATUS</th>
                                <th>SUBMISSION DATE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complianceHistory.length > 0 ? (
                                complianceHistory.map((record, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{record.month}</td>
                                        <td>{record.year}</td>
                                        <td>{record.extraction}</td>
                                        <td>{record.approved}</td>
                                        <td>
                                            <span className={`badge ${record.status === 'Approved' ? 'badge-success' : 'badge-info'}`}>
                                                {record.status}
                                            </span>
                                        </td>
                                        <td>{record.date}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-icon" title="View">
                                                    <Eye size={14} />
                                                </button>
                                                <button className="btn-icon" title="Download">
                                                    <Download size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#999' }}>
                                        No compliance records found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx>{`
        .self-compliance-container {
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

        .app-details-box {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 6px;
          margin-top: 20px;
        }

        .app-details-box h4 {
          margin: 0 0 15px 0;
          color: #333;
          font-size: 1rem;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .detail-item .label {
          font-size: 0.85rem;
          color: #666;
          font-weight: 600;
        }

        .detail-item .value {
          font-size: 0.95rem;
          color: #333;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: #555;
          margin-bottom: 8px;
        }

        .form-control {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 0.95rem;
        }

        .form-control:focus {
          outline: none;
          border-color: #007bff;
        }

        .form-control:disabled {
          background: #f8f9fa;
          cursor: not-allowed;
        }

        textarea.form-control {
          resize: vertical;
          font-family: inherit;
        }

        .file-upload-wrapper {
          border: 2px dashed #ddd;
          border-radius: 6px;
          padding: 20px;
          text-align: center;
          transition: border-color 0.2s;
        }

        .file-upload-wrapper:hover {
          border-color: #007bff;
        }

        .file-upload-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          color: #666;
        }

        .file-input {
          display: none;
        }

        .file-selected {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 4px;
        }

        .remove-file-btn {
          margin-left: auto;
          background: #dc3545;
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
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
          transition: all 0.2s;
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
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 900px;
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
          justify-content: center;
        }

        .btn-icon:hover {
          background: #0056b3;
        }
      `}</style>
        </div>
    );
};

export default SelfCompliance;
