import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Download, Search } from 'lucide-react';

// Mock Application Database (same as Dashboard)
const ALL_APPLICATIONS = [
    { id: 1, code: 'RJ-2025-APP-001', project: 'Saket Hospital Expansion', type: 'Infrastructure', quantum: 15.5, month: 'December', year: '2025', status: 'Draft' },
    { id: 2, code: 'RJ-2025-APP-002', project: 'Steel Manufacturing Plant', type: 'Industrial', quantum: 45.2, month: 'December', year: '2025', status: 'Submitted' },
    { id: 3, code: 'RJ-2025-APP-003', project: 'Mining Operations - Jaipur', type: 'Mining', quantum: 32.8, month: 'December', year: '2025', status: 'Draft' },
    { id: 4, code: 'RJ-2025-APP-004', project: 'Residential Complex', type: 'Domestic', quantum: 8.5, month: 'December', year: '2025', status: 'Approved' },
    { id: 5, code: 'RJ-2025-APP-005', project: 'Highway Construction', type: 'Infrastructure', quantum: 28.0, month: 'November', year: '2025', status: 'Submitted' },
    { id: 6, code: 'RJ-2025-APP-006', project: 'Textile Factory', type: 'Industrial', quantum: 52.3, month: 'November', year: '2025', status: 'Draft' },
    { id: 7, code: 'RJ-2025-APP-007', project: 'Marble Quarry', type: 'Mining', quantum: 18.7, month: 'November', year: '2025', status: 'Approved' },
    { id: 8, code: 'RJ-2025-APP-008', project: 'Shopping Mall', type: 'Infrastructure', quantum: 22.4, month: 'October', year: '2025', status: 'Draft' },
    { id: 9, code: 'RJ-2025-APP-009', project: 'Chemical Plant', type: 'Industrial', quantum: 67.9, month: 'October', year: '2025', status: 'Submitted' },
    { id: 10, code: 'RJ-2025-APP-010', project: 'Apartment Building', type: 'Domestic', quantum: 12.3, month: 'October', year: '2025', status: 'Approved' },
    { id: 11, code: 'RJ-2024-APP-011', project: 'Metro Station', type: 'Infrastructure', quantum: 38.5, month: 'December', year: '2024', status: 'Approved' },
    { id: 12, code: 'RJ-2024-APP-012', project: 'Cement Factory', type: 'Industrial', quantum: 55.0, month: 'November', year: '2024', status: 'Approved' },
    { id: 13, code: 'RJ-2025-APP-013', project: 'Hotel Development', type: 'Infrastructure', quantum: 19.8, month: 'December', year: '2025', status: 'Draft' },
    { id: 14, code: 'RJ-2025-APP-014', project: 'Pharmaceutical Unit', type: 'Industrial', quantum: 41.2, month: 'December', year: '2025', status: 'Submitted' },
    { id: 15, code: 'RJ-2025-APP-015', project: 'Stone Mining', type: 'Mining', quantum: 25.6, month: 'December', year: '2025', status: 'Draft' },
];

const ApplicationsList = () => {
    const { status } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const month = searchParams.get('month') || 'December';
    const year = searchParams.get('year') || '2025';
    const type = searchParams.get('type') || 'All';

    // Filter applications based on status and other params
    const filteredApplications = ALL_APPLICATIONS.filter(app => {
        const statusMatch = status === 'completed' ? app.status === 'Approved' :
            status === 'pending' ? app.status === 'Pending Action' :
                app.status.toLowerCase() === status;
        const monthMatch = app.month === month;
        const yearMatch = app.year === year;
        const typeMatch = type === 'All' || app.type === type;

        return statusMatch && monthMatch && yearMatch && typeMatch;
    });

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Draft': return 'badge-warning';
            case 'Submitted': return 'badge-info';
            case 'Approved': return 'badge-success';
            default: return 'badge-secondary';
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case 'draft': return '#6a11cb';
            case 'submitted': return '#11998e';
            case 'pending': return '#ff416c';
            case 'completed': return '#56ab2f';
            default: return '#007bff';
        }
    };

    const getStatusLabel = () => {
        switch (status) {
            case 'draft': return 'Draft';
            case 'submitted': return 'Submitted';
            case 'pending': return 'Pending Action';
            case 'completed': return 'Completed';
            default: return status;
        }
    };

    return (
        <div className="applications-list-container">
            {/* Header */}
            <div className="page-header">
                <button className="back-btn" onClick={() => navigate('/')}>
                    <ArrowLeft size={20} />
                    <span>Back to Dashboard</span>
                </button>
                <div className="header-actions">
                    <button className="btn-secondary">
                        <Download size={16} />
                        Export
                    </button>
                </div>
            </div>

            {/* Title Section */}
            <div className="title-section" style={{ borderLeftColor: getStatusColor() }}>
                <h1>{getStatusLabel()} Applications</h1>
                <p className="subtitle">
                    Showing {filteredApplications.length} application(s) for {month} {year}
                    {type !== 'All' && ` - ${type}`}
                </p>
            </div>

            {/* Search Bar */}
            <div className="search-bar">
                <Search size={18} />
                <input type="text" placeholder="Search by project name, code, or type..." />
            </div>

            {/* Applications Table */}
            <div className="table-section">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>SR NO.</th>
                                <th>APP CODE</th>
                                <th>PROJECT NAME</th>
                                <th>PURPOSE</th>
                                <th>QUANTUM (KLD)</th>
                                <th>DATE</th>
                                <th>STATUS</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApplications.length > 0 ? (
                                filteredApplications.map((app, index) => (
                                    <tr key={app.id}>
                                        <td>{index + 1}</td>
                                        <td><strong>{app.code}</strong></td>
                                        <td>{app.project}</td>
                                        <td>{app.type}</td>
                                        <td>{app.quantum}</td>
                                        <td>21-{app.month.substring(0, 3)}-{app.year}</td>
                                        <td>
                                            <span className={`badge ${getStatusBadgeClass(app.status)}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn btn-primary btn-xs">View Details</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '50px', color: '#999' }}>
                                        No {getStatusLabel().toLowerCase()} applications found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx>{`
        .applications-list-container {
          padding-bottom: 50px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          border: 1px solid #ddd;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.95rem;
          color: #333;
          transition: all 0.2s;
        }

        .back-btn:hover {
          background: #f8f9fa;
          border-color: #007bff;
          color: #007bff;
        }

        .header-actions {
          display: flex;
          gap: 10px;
        }

        .btn-secondary {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          border: 1px solid #ddd;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          color: #333;
        }

        .btn-secondary:hover {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }

        .title-section {
          background: white;
          padding: 25px;
          border-radius: 8px;
          margin-bottom: 25px;
          border-left: 5px solid;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .title-section h1 {
          font-size: 1.8rem;
          color: #333;
          margin: 0 0 8px 0;
        }

        .subtitle {
          color: #666;
          font-size: 0.95rem;
          margin: 0;
        }

        .search-bar {
          background: white;
          padding: 15px 20px;
          border-radius: 8px;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .search-bar input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 0.95rem;
          color: #333;
        }

        .search-bar input::placeholder {
          color: #999;
        }

        .table-section {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .table-container {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }

        th {
          background-color: #f8f9fa;
          color: #6c757d;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.8rem;
          padding: 15px;
          border-bottom: 2px solid #eee;
          text-align: left;
        }

        td {
          padding: 15px;
          border-bottom: 1px solid #eee;
          font-size: 0.9rem;
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

        .badge-warning {
          background: #fff3cd;
          color: #856404;
        }

        .badge-info {
          background: #d1ecf1;
          color: #0c5460;
        }

        .badge-success {
          background: #d4edda;
          color: #155724;
        }

        .badge-secondary {
          background: #e2e3e5;
          color: #383d41;
        }

        .btn-xs {
          padding: 4px 12px;
          font-size: 0.8rem;
          border-radius: 4px;
        }
      `}</style>
        </div>
    );
};

export default ApplicationsList;
