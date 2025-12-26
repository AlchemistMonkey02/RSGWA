import React, { useState } from 'react';
import { Send, Upload, FileText, Eye, Download, MessageSquare, Clock } from 'lucide-react';

const RaisedQuery = () => {
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [responseText, setResponseText] = useState('');
    const [responseDocument, setResponseDocument] = useState(null);

    // Mock queries from evaluation officers
    const queries = [
        {
            id: 'Q-001',
            applicationCode: 'RJ-2025-APP-004',
            projectName: 'Residential Complex',
            queryDate: '10-Dec-2025',
            officer: 'Dr. Rajesh Kumar',
            subject: 'Clarification on Water Requirement',
            query: 'Please provide detailed justification for the proposed quantum of 8.5 KLD. The current project scope seems to require less water. Also submit updated water balance calculations.',
            status: 'Pending Response',
            dueDate: '20-Dec-2025'
        },
        {
            id: 'Q-002',
            applicationCode: 'RJ-2025-APP-007',
            projectName: 'Marble Quarry',
            queryDate: '05-Dec-2025',
            officer: 'Mr. Anil Sharma',
            subject: 'Missing NOC Documents',
            query: 'NOC from Pollution Control Board is missing. Please submit the same along with environmental clearance certificate.',
            status: 'Pending Response',
            dueDate: '15-Dec-2025'
        },
        {
            id: 'Q-003',
            applicationCode: 'RJ-2024-APP-011',
            projectName: 'Metro Station',
            queryDate: '25-Nov-2025',
            officer: 'Dr. Priya Verma',
            subject: 'Site Plan Verification',
            query: 'The submitted site plan does not match with the coordinates provided. Please resubmit corrected site plan with proper geo-referencing.',
            status: 'Responded',
            responseDate: '28-Nov-2025',
            dueDate: '05-Dec-2025'
        }
    ];

    const handleFileChange = (e) => {
        setResponseDocument(e.target.files[0]);
    };

    const handleSubmitResponse = (queryId) => {
        if (!responseText.trim()) {
            alert('Please enter a response');
            return;
        }
        alert(`Response submitted for query ${queryId}`);
        setResponseText('');
        setResponseDocument(null);
        setSelectedQuery(null);
    };

    return (
        <div className="raised-query-container">
            {/* Alert */}
            <div className="alert-section">
                <p className="alert-text">
                    <strong>RAJASTHAN GROUND WATER AUTHORITY (RGWA)</strong>: Respond to queries within the due date to avoid application delays. Ensure all documents are properly uploaded.
                </p>
            </div>

            {/* Page Header */}
            <div className="page-header">
                <h2>Evaluation Officer Raised Queries</h2>
                <p className="subtitle">View and respond to queries raised by evaluation officers</p>
            </div>

            {/* Queries List */}
            <div className="section-card">
                <h3 className="section-title">
                    <MessageSquare size={20} />
                    Query List
                </h3>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>QUERY ID</th>
                                <th>APPLICATION CODE</th>
                                <th>PROJECT NAME</th>
                                <th>QUERY DATE</th>
                                <th>OFFICER</th>
                                <th>SUBJECT</th>
                                <th>DUE DATE</th>
                                <th>STATUS</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queries.map((query) => (
                                <tr key={query.id}>
                                    <td>{query.id}</td>
                                    <td>{query.applicationCode}</td>
                                    <td>{query.projectName}</td>
                                    <td>{query.queryDate}</td>
                                    <td>{query.officer}</td>
                                    <td>{query.subject}</td>
                                    <td className={query.status === 'Pending Response' ? 'due-date-warning' : ''}>
                                        {query.dueDate}
                                    </td>
                                    <td>
                                        <span className={`badge ${query.status === 'Responded' ? 'badge-success' : 'badge-warning'}`}>
                                            {query.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-icon"
                                            onClick={() => setSelectedQuery(query)}
                                            title="View & Respond"
                                        >
                                            <Eye size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Query Detail & Response Modal */}
            {selectedQuery && (
                <div className="modal-overlay" onClick={() => setSelectedQuery(null)}>
                    <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Query Details - {selectedQuery.id}</h3>
                            <button className="close-btn" onClick={() => setSelectedQuery(null)}>✕</button>
                        </div>

                        <div className="modal-body">
                            {/* Query Information */}
                            <div className="query-info-box">
                                <div className="info-row">
                                    <div className="info-item">
                                        <span className="label">Application Code:</span>
                                        <span className="value">{selectedQuery.applicationCode}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Project Name:</span>
                                        <span className="value">{selectedQuery.projectName}</span>
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-item">
                                        <span className="label">Query Date:</span>
                                        <span className="value">{selectedQuery.queryDate}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Due Date:</span>
                                        <span className="value due-date-warning">{selectedQuery.dueDate}</span>
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-item">
                                        <span className="label">Evaluation Officer:</span>
                                        <span className="value">{selectedQuery.officer}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Status:</span>
                                        <span className={`badge ${selectedQuery.status === 'Responded' ? 'badge-success' : 'badge-warning'}`}>
                                            {selectedQuery.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Query Subject & Details */}
                            <div className="query-detail-box">
                                <h4>Subject: {selectedQuery.subject}</h4>
                                <p className="query-text">{selectedQuery.query}</p>
                            </div>

                            {/* Response Section (only if pending) */}
                            {selectedQuery.status === 'Pending Response' && (
                                <div className="response-section">
                                    <h4>Submit Response</h4>

                                    <div className="form-group">
                                        <label>Response *</label>
                                        <textarea
                                            value={responseText}
                                            onChange={(e) => setResponseText(e.target.value)}
                                            className="form-control"
                                            rows="5"
                                            placeholder="Enter your detailed response to the query..."
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Upload Supporting Document (PDF)</label>
                                        <div className="file-upload-wrapper">
                                            {!responseDocument ? (
                                                <label className="file-upload-label">
                                                    <Upload size={20} />
                                                    <span>Choose File (PDF, max 5MB)</span>
                                                    <input
                                                        type="file"
                                                        accept=".pdf"
                                                        onChange={handleFileChange}
                                                        className="file-input"
                                                    />
                                                </label>
                                            ) : (
                                                <div className="file-selected">
                                                    <FileText size={18} />
                                                    <span>{responseDocument.name}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => setResponseDocument(null)}
                                                        className="remove-file-btn"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="modal-actions">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleSubmitResponse(selectedQuery.id)}
                                        >
                                            <Send size={18} />
                                            Submit Response
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Show response if already responded */}
                            {selectedQuery.status === 'Responded' && (
                                <div className="response-view-box">
                                    <h4>Your Response (Submitted on {selectedQuery.responseDate})</h4>
                                    <p className="response-text">
                                        Thank you for your query. We have reviewed the requirements and are submitting the requested documents along with detailed justification...
                                    </p>
                                    <div className="attached-docs">
                                        <FileText size={16} />
                                        <span>Response_Document.pdf</span>
                                        <button className="btn-icon-small">
                                            <Download size={14} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .raised-query-container {
          padding-bottom: 50px;
        }

        .alert-section {
          background: #fff3cd;
          border-left: 5px solid #ffc107;
          padding: 15px;
          margin-bottom: 25px;
          border-radius: 6px;
        }

        .alert-text {
          color: #856404;
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

        .due-date-warning {
          color: #dc3545;
          font-weight: 600;
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
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        .modal-content.large {
          max-width: 900px;
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

        .query-info-box {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 6px;
          margin-bottom: 20px;
        }

        .info-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
          margin-bottom: 15px;
        }

        .info-row:last-child {
          margin-bottom: 0;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .info-item .label {
          font-size: 0.85rem;
          color: #666;
          font-weight: 600;
        }

        .info-item .value {
          font-size: 0.95rem;
          color: #333;
        }

        .query-detail-box {
          background: #fff3cd;
          padding: 20px;
          border-radius: 6px;
          margin-bottom: 20px;
          border-left: 4px solid #ffc107;
        }

        .query-detail-box h4 {
          margin: 0 0 10px 0;
          color: #856404;
        }

        .query-text {
          margin: 0;
          color: #856404;
          line-height: 1.6;
        }

        .response-section {
          margin-top: 20px;
        }

        .response-section h4 {
          margin: 0 0 15px 0;
          color: #333;
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
          font-family: inherit;
        }

        .form-control:focus {
          outline: none;
          border-color: #007bff;
        }

        textarea.form-control {
          resize: vertical;
        }

        .file-upload-wrapper {
          border: 2px dashed #ddd;
          border-radius: 6px;
          padding: 20px;
          text-align: center;
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

        .modal-actions {
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
        }

        .btn-primary {
          background: #007bff;
          color: white;
        }

        .btn-primary:hover {
          background: #0056b3;
        }

        .response-view-box {
          background: #d4edda;
          padding: 20px;
          border-radius: 6px;
          border-left: 4px solid #28a745;
        }

        .response-view-box h4 {
          margin: 0 0 10px 0;
          color: #155724;
        }

        .response-text {
          margin: 0 0 15px 0;
          color: #155724;
          line-height: 1.6;
        }

        .attached-docs {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: white;
          border-radius: 4px;
        }

        .btn-icon-small {
          background: #28a745;
          color: white;
          border: none;
          padding: 4px 6px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
      `}</style>
        </div>
    );
};

export default RaisedQuery;
