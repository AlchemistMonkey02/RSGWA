import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Clock, Activity, FileText, Filter, Calendar, Layers } from 'lucide-react';

// Mock Application Database
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

const Dashboard = () => {
  const navigate = useNavigate();

  // Filter States
  const [selectedMonth, setSelectedMonth] = useState('December');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Filter applications based on selected criteria
  const filteredApplications = useMemo(() => {
    return ALL_APPLICATIONS.filter(app => {
      const monthMatch = app.month === selectedMonth;
      const yearMatch = app.year === selectedYear;
      const typeMatch = selectedType === 'All' || app.type === selectedType;
      const statusMatch = selectedStatus === 'All' || app.status === selectedStatus;

      return monthMatch && yearMatch && typeMatch && statusMatch;
    });
  }, [selectedMonth, selectedYear, selectedType, selectedStatus]);

  // Calculate stats based on filtered data
  const getStats = () => {
    const drafts = filteredApplications.filter(app => app.status === 'Draft').length;
    const submitted = filteredApplications.filter(app => app.status === 'Submitted').length;
    const approved = filteredApplications.filter(app => app.status === 'Approved').length;
    const pending = filteredApplications.filter(app => app.status === 'Pending Action').length;

    return [
      { label: 'Drafts', value: drafts, color: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', icon: <FileText size={24} /> },
      { label: 'Submitted', value: submitted, color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', icon: <Activity size={24} /> },
      { label: 'Pending Action', value: pending, color: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)', icon: <Clock size={24} /> },
      { label: 'Completed', value: approved, color: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)', icon: <TrendingUp size={24} /> },
    ];
  };

  // Calculate category breakdown
  const getCategoryData = () => {
    const categories = ['Industrial', 'Infrastructure', 'Mining', 'Domestic'];
    return categories.map(cat => ({
      name: cat,
      value: filteredApplications.filter(app => app.type === cat).length
    })).filter(item => item.value > 0);
  };

  const weeklyTrendData = [
    { name: 'Mon', apps: Math.floor(Math.random() * 10) + 1 },
    { name: 'Tue', apps: Math.floor(Math.random() * 10) + 1 },
    { name: 'Wed', apps: Math.floor(Math.random() * 10) + 1 },
    { name: 'Thu', apps: Math.floor(Math.random() * 10) + 1 },
    { name: 'Fri', apps: Math.floor(Math.random() * 10) + 1 },
    { name: 'Sat', apps: Math.floor(Math.random() * 5) + 1 },
    { name: 'Sun', apps: Math.floor(Math.random() * 5) + 1 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Draft': return 'badge-warning';
      case 'Submitted': return 'badge-info';
      case 'Approved': return 'badge-success';
      default: return 'badge-secondary';
    }
  };

  return (
    <div className="dashboard-container">
      {/* Alert Section */}
      <div className="alert-section">
        <p className="alert-text">
          <strong>RAJASTHAN GROUND WATER AUTHORITY (RGWA)</strong>: The Issue Reporting Module is now live. Please report issues exclusively through the Issue Reporting Module.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-header">
          <Filter size={18} />
          <span>Filters</span>
        </div>
        <div className="filter-item">
          <Calendar size={16} className="text-secondary" />
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <span className="text-secondary font-bold">YR</span>
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <div className="filter-item">
          <Layers size={16} className="text-secondary" />
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="All">All Application Types</option>
            <option value="Industrial">Industrial</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Mining">Mining</option>
            <option value="Domestic">Domestic</option>
          </select>
        </div>
        <div className="filter-item">
          <Activity size={16} className="text-secondary" />
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Submitted">Submitted</option>
            <option value="Approved">Approved</option>
          </select>
        </div>
        <div className="filter-summary">
          <span className="filter-count">{filteredApplications.length} Applications Found</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {getStats().map((stat, index) => {
          const statusMap = {
            'Drafts': 'draft',
            'Submitted': 'submitted',
            'Pending Action': 'pending',
            'Completed': 'completed'
          };
          const statusRoute = statusMap[stat.label];

          return (
            <div
              key={index}
              className="stat-card clickable"
              style={{ background: stat.color }}
              onClick={() => navigate(`/applications/${statusRoute}?month=${selectedMonth}&year=${selectedYear}&type=${selectedType}`)}
            >
              <div className="stat-content">
                <div>
                  <h3>{stat.label}</h3>
                  <span className="stat-value">{stat.value}</span>
                </div>
                <div className="stat-icon">{stat.icon}</div>
              </div>
              <div className="stat-footer">
                <span>Verified for {selectedMonth} {selectedYear}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Meter & NOC Compliance Section */}
      <div className="compliance-grid">
        {/* Extraction Progress */}
        <div className="compliance-card">
          <div className="card-header-flex">
            <h3>NOC Extraction Limit</h3>
            <span className="status-badge success">Green Zone</span>
          </div>
          <div className="progress-container">
            <div className="progress-label">
              <span>Actual: 1,240 KLD</span>
              <span>Limit: 5,000 KLD</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: '25%' }}></div>
            </div>
            <p className="progress-hint">You are at 24.8% of your permitted annual quota.</p>
          </div>
        </div>

        {/* Live Meter Status - Clickable */}
        <div
          className="compliance-card clickable-card"
          onClick={() => navigate('/meter-registration-system')}
          style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
        >
          <div className="card-header-flex">
            <h3>Registered Meter</h3>
            <span className="status-badge info">Active</span>
          </div>
          <div className="meter-details">
            <div className="m-detail">
              <span className="m-label">Serial No:</span>
              <span className="m-value">WM-2025-AX-442</span>
            </div>
            <div className="m-detail">
              <span className="m-label">Last Ping:</span>
              <span className="m-value">2 mins ago (IoT)</span>
            </div>
            <div className="m-detail">
              <span className="m-label">Accuracy:</span>
              <span className="m-value">Class 1.0 (Electro-mag)</span>
            </div>
          </div>
          <div style={{ marginTop: '15px', borderTop: '1px solid #f1f5f9', paddingTop: '10px', textAlign: 'center' }}>
            <span style={{ color: '#3b82f6', fontSize: '0.85rem', fontWeight: '600' }}>Manage Meter System &rarr;</span>
          </div>
        </div>
      </div>

      <div className="dashboard-charts-grid">
        {/* Weekly Trend Chart */}
        <div className="chart-card">
          <h3 className="card-title">Live Abstraction Trend (Last 7 Days)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="apps" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Center Info */}
        <div className="chart-card info-card">
          <h3 className="card-title">Governance Highlights</h3>
          <div className="info-list">
            <div className="info-item">
              <div className="i-icon"><Activity size={18} /></div>
              <div className="i-content">
                <strong>Real-time Metering</strong>
                <p>Your meter is successfully syncing data via IoT LoRaWAN.</p>
              </div>
            </div>
            <div className="info-item">
              <div className="i-icon"><TrendingUp size={18} /></div>
              <div className="i-content">
                <strong>Penalty Notice</strong>
                <p>Over-extraction beyond 110% of NOC will trigger auto-penalties.</p>
              </div>
            </div>
            <div className="info-item">
              <div className="i-icon"><FileText size={18} /></div>
              <div className="i-content">
                <strong>EAC Guidelines</strong>
                <p>New norms for industrial abstraction are now active.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="table-section">
        <div className="section-header">
          <h2 className="section-title">
            Applications ({selectedStatus === 'All' ? 'All Statuses' : selectedStatus})
          </h2>
          <button className="btn-link">View All</button>
        </div>

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
                    <td>{app.code}</td>
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
                      <button className="btn btn-primary btn-xs">View</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#999' }}>
                    No applications found for the selected filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          padding-bottom: 50px;
        }

        /* Filter Bar */
        .filter-bar {
          background: white;
          padding: 15px 20px;
          border-radius: 8px;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          flex-wrap: wrap;
        }
        .filter-header {
           display: flex;
           align-items: center;
           gap: 8px;
           font-weight: 600;
           color: #333;
           padding-right: 15px;
           border-right: 1px solid #eee;
        }
        .filter-item {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          min-width: 150px;
        }
        .filter-item select {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          background-color: #f8f9fa;
          font-size: 0.9rem;
          color: #555;
          cursor: pointer;
        }
        .filter-item select:focus {
          border-color: #007bff;
          outline: none;
        }
        .filter-summary {
          margin-left: auto;
          padding-left: 15px;
          border-left: 1px solid #eee;
        }
        .filter-count {
          background: #007bff;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .text-secondary { color: #6c757d; }

        /* Alert */
        .alert-section {
          background: #fff3cd;
          border-left: 5px solid #ffc107;
          padding: 15px;
          margin-bottom: 25px;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .alert-text {
          color: #856404;
          font-size: 0.95rem;
        }

        /* Information Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .stat-card {
          padding: 20px;
          border-radius: 12px;
          color: white;
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .stat-card.clickable {
          cursor: pointer;
        }
        .stat-card.clickable:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }
        .stat-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }
        .stat-content h3 {
          font-size: 1rem;
          font-weight: 500;
          opacity: 0.9;
          margin-bottom: 5px;
        }
        .stat-value {
          font-size: 2.2rem;
          font-weight: 700;
        }
        .stat-icon {
          background: rgba(255,255,255,0.2);
          padding: 8px;
          border-radius: 8px;
          display: flex;
        }
        .stat-footer {
          font-size: 0.8rem;
          opacity: 0.8;
          background: rgba(0,0,0,0.05);
          padding: 5px 10px;
          border-radius: 4px;
          align-self: flex-start;
        }

        /* Charts */
        .dashboard-charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .chart-card {
           background: white;
           border-radius: 12px;
           padding: 20px;
           box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .card-title {
          font-size: 1.1rem;
          color: #333;
          margin-bottom: 20px;
          font-weight: 600;
        }

        /* Compliance Grid */
        .compliance-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 25px;
        }
        .compliance-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          border-top: 4px solid #3b82f6;
        }
        .card-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        .card-header-flex h3 {
          font-size: 1rem;
          color: #475569;
          font-weight: 600;
          margin: 0;
        }
        .status-badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .status-badge.success { background: #dcfce7; color: #166534; }
        .status-badge.info { background: #e0f2fe; color: #0369a1; }

        .progress-container { margin-top: 10px; }
        .progress-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 8px;
          font-weight: 500;
        }
        .progress-bar-bg {
          height: 10px;
          background: #f1f5f9;
          border-radius: 5px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
          border-radius: 5px;
        }
        .progress-hint {
          font-size: 0.75rem;
          color: #94a3b8;
          margin-top: 8px;
        }

        .meter-details { display: flex; flex-direction: column; gap: 8px; }
        .m-detail { display: flex; justify-content: space-between; font-size: 0.85rem; }
        .m-label { color: #64748b; }
        .m-value { color: #1e293b; font-weight: 600; }

        .info-list { display: flex; flex-direction: column; gap: 20px; }
        .info-item { display: flex; gap: 15px; align-items: flex-start; }
        .i-icon { width: 40px; height: 40px; border-radius: 8px; background: #eff6ff; color: #3b82f6; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .i-content strong { display: block; font-size: 0.95rem; color: #1e293b; margin-bottom: 4px; }
        .i-content p { font-size: 0.85rem; color: #64748b; margin: 0; line-height: 1.5; }

        /* Table */
        .table-section {
           background: white;
           border-radius: 12px;
           padding: 20px;
           box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .section-title {
          font-size: 1.1rem;
          color: #333;
          font-weight: 600;
          margin: 0;
        }
        .btn-link {
          background: none;
          border: none;
          color: #007bff;
          cursor: pointer;
          font-weight: 600;
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
        }
        td {
          padding: 15px;
          border-bottom: 1px solid #eee;
          font-size: 0.9rem;
          color: #333;
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

export default Dashboard;
