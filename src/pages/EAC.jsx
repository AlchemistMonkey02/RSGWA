import React, { useState } from 'react';
import { BookOpen, Eye, Download, CheckCircle } from 'lucide-react';

const EAC = () => {
    const [selectedEAC, setSelectedEAC] = useState(null);

    // Mock EAC data
    const eacRecords = [
        {
            id: 'EAC-2025-001',
            applicationCode: 'RJ-2025-APP-004',
            projectName: 'Residential Complex',
            eacDate: '18-Dec-2025',
            meetingNo: 'EAC-12-2025',
            recommendation: 'Approved with Conditions',
            conditions: [
                'Install water meter and submit monthly readings',
                'Maintain rainwater harvesting structure',
                'Submit quarterly compliance reports',
                'Ensure no groundwater extraction beyond approved quantum'
            ],
            status: 'Approved',
            remarks: 'Project approved subject to compliance with all conditions'
        },
        {
            id: 'EAC-2024-015',
            applicationCode: 'RJ-2024-APP-011',
            projectName: 'Metro Station',
            eacDate: '10-Dec-2024',
            meetingNo: 'EAC-11-2024',
            recommendation: 'Approved',
            conditions: [
                'Install digital water flow meters',
                'Submit environmental impact assessment report annually',
                'Implement water conservation measures'
            ],
            status: 'Approved',
            remarks: 'Approved for 3 years subject to annual review'
        },
        {
            id: 'EAC-2025-002',
            applicationCode: 'RJ-2025-APP-007',
            projectName: 'Marble Quarry',
            eacDate: '22-Dec-2025',
            meetingNo: 'EAC-12-2025',
            recommendation: 'Revision Required',
            conditions: [],
            status: 'Pending Revision',
            remarks: 'Submit revised project report with updated water requirement calculations and environmental clearance'
        }
    ];

    return (
        <div className="eac-container">
            {/* Alert */}
            <div className="alert-section">
                <p className="alert-text">
                    <strong>RAJASTHAN GROUND WATER AUTHORITY (RGWA)</strong>: View Environmental Appraisal Committee (EAC) recommendations and conditions for your applications.
                </p>
            </div>

            {/* Page Header */}
            <div className="page-header">
                <h2>EAC Recommendations</h2>
                <p className="subtitle">Environmental Appraisal Committee decisions and conditions</p>
            </div>

            {/* EAC Records */}
            <div className="section-card">
                <h3 className="section-title">
                    <BookOpen size={20} />
                    EAC Records
                </h3>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>EAC ID</th>
                                <th>APPLICATION CODE</th>
                                <th>PROJECT NAME</th>
                                <th>EAC DATE</th>
                                <th>MEETING NO.</th>
                                <th>RECOMMENDATION</th>
                                <th>STATUS</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eacRecords.map((record) => (
                                <tr key={record.id}>
                                    <td>{record.id}</td>
                                    <td>{record.applicationCode}</td>
                                    <td>{record.projectName}</td>
                                    <td>{record.eacDate}</td>
                                    <td>{record.meetingNo}</td>
                                    <td>{record.recommendation}</td>
                                    <td>
                                        <span className={`badge ${record.status === 'Approved' ? 'badge-success' : 'badge-warning'}`}>
                                            {record.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-icon"
                                            onClick={() => setSelectedEAC(record)}
                                            title="View Details"
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

            {/* EAC Detail Modal */}
            {selectedEAC && (
                <div className="modal-overlay" onClick={() => setSelectedEAC(null)}>
                    <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>EAC Details - {selectedEAC.id}</h3>
                            <button className="close-btn" onClick={() => setSelectedEAC(null)}>✕</button>
                        </div>

                        <div className="modal-body">
                            <div className="eac-info-box">
                                <div className="info-row">
                                    <div className="info-item">
                                        <span className="label">Application Code:</span>
                                        <span className="value">{selectedEAC.applicationCode}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Project Name:</span>
                                        <span className="value">{selectedEAC.projectName}</span>
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-item">
                                        <span className="label">EAC Meeting Date:</span>
                                        <span className="value">{selectedEAC.eacDate}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Meeting Number:</span>
                                        <span className="value">{selectedEAC.meetingNo}</span>
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-item">
                                        <span className="label">Recommendation:</span>
                                        <span className="value recommendation">{selectedEAC.recommendation}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Status:</span>
                                        <span className={`badge ${selectedEAC.status === 'Approved' ? 'badge-success' : 'badge-warning'}`}>
                                            {selectedEAC.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {selectedEAC.conditions.length > 0 && (
                                <div className="conditions-box">
                                    <h4>Conditions & Requirements</h4>
                                    <ul>
                                        {selectedEAC.conditions.map((condition, index) => (
                                            <li key={index}>
                                                <CheckCircle size={16} />
                                                <span>{condition}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="remarks-box">
                                <h4>Remarks</h4>
                                <p>{selectedEAC.remarks}</p>
                            </div>

                            {selectedEAC.status === 'Pending Revision' && (
                                <div className="action-required-box">
                                    <h4>Action Required</h4>
                                    <p>Please submit revised documents as per EAC recommendations</p>
                                    <button className="btn btn-primary">
                                        Submit Revised Report
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-success">
                                <Download size={18} />
                                Download EAC Report
                            </button>
                            <button className="btn btn-secondary" onClick={() => setSelectedEAC(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .eac-container {
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

        .eac-info-box {
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

        .recommendation {
          color: #007bff;
          font-weight: 600;
        }

        .conditions-box {
          background: #e3f2fd;
          padding: 20px;
          border-radius: 6px;
          margin-bottom: 20px;
          border-left: 4px solid #007bff;
        }

        .conditions-box h4 {
          margin: 0 0 15px 0;
          color: #0056b3;
        }

        .conditions-box ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .conditions-box li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 10px;
          color: #0056b3;
        }

        .conditions-box li:last-child {
          margin-bottom: 0;
        }

        .remarks-box {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 6px;
          margin-bottom: 20px;
        }

        .remarks-box h4 {
          margin: 0 0 10px 0;
          color: #333;
        }

        .remarks-box p {
          margin: 0;
          color: #666;
          line-height: 1.6;
        }

        .action-required-box {
          background: #fff3cd;
          padding: 20px;
          border-radius: 6px;
          border-left: 4px solid #ffc107;
          text-align: center;
        }

        .action-required-box h4 {
          margin: 0 0 10px 0;
          color: #856404;
        }

        .action-required-box p {
          margin: 0 0 15px 0;
          color: #856404;
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
      `}</style>
        </div>
    );
};

export default EAC;
