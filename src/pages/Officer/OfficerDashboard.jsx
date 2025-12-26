import React, { useState } from 'react';
import {
  Users,
  FileCheck,
  Search,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  ArrowUpRight,
  MoreVertical,
  ShieldAlert
} from 'lucide-react';

const OfficerDashboard = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const stats = [
    { label: 'Pending Scrutiny', value: '42', icon: <Clock size={20} />, color: '#f59e0b' },
    { label: 'Pending GIS Validation', value: '18', icon: <MapPin size={20} />, color: '#3b82f6' },
    { label: 'Scheduled Inspections', value: '12', icon: <FileCheck size={20} />, color: '#10b981' },
    { label: 'Meter Verifications', value: '8', icon: <ShieldAlert size={20} />, color: '#8b5cf6' },
    { label: 'High Priority (Critical Blocks)', value: '7', icon: <AlertTriangle size={20} />, color: '#dc2626' }
  ];

  const applications = [
    { id: 'NOC/IND/2025/1102', applicant: 'Adani Cement Ltd.', type: 'Industrial', block: 'Jaipur (OE)', score: 85, status: 'Pending Scrutiny' },
    { id: 'NOC/MIN/2025/0984', applicant: 'Aravali Marbles', type: 'Mining', block: 'Nagaur (Critical)', score: 92, status: 'Pending GIS' },
    { id: 'NOC/INF/2025/1045', applicant: 'Jaipur Metro Rail', type: 'Infrastructure', block: 'Jaipur (Safe)', score: 78, status: 'Documents Verified' },
  ];

  return (
    <div className="officer-dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Officer Scrutiny Console</h1>
          <p>Welcome, Evaluation Officer (Jaipur Region)</p>
        </div>
        <div className="header-actions">
          <button className="btn-outline"><Filter size={18} /> Filter List</button>
          <button className="btn-primary">Daily Report</button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="content-grid">
        <div className="applications-list">
          <div className="list-header">
            <div className="tabs">
              <button className={activeTab === 'pending' ? 'active' : ''} onClick={() => setActiveTab('pending')}>
                Application Queue (12)
              </button>
              <button className={activeTab === 'meters' ? 'active' : ''} onClick={() => setActiveTab('meters')}>
                Meter Audits (8)
              </button>
              <button className={activeTab === 'processed' ? 'active' : ''} onClick={() => setActiveTab('processed')}>
                Processed
              </button>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Applicant Name</th>
                  <th>Category</th>
                  <th>Block Level</th>
                  <th>AI Readiness</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, i) => (
                  <tr key={i}>
                    <td className="app-id">{app.id}</td>
                    <td>{app.applicant}</td>
                    <td><span className={`tag ${app.type.toLowerCase()}`}>{app.type}</span></td>
                    <td>
                      <span className={`block-tag ${app.block.includes('OE') ? 'oe' : 'safe'}`}>
                        {app.block}
                      </span>
                    </td>
                    <td>
                      <div className="score-wrapper">
                        <div className="score-bar" style={{ width: `${app.score}%` }}></div>
                        <span>{app.score}%</span>
                      </div>
                    </td>
                    <td><span className="status-label">{app.status}</span></td>
                    <td>
                      <button className="btn-icon"><MoreVertical size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="sidebar-widgets">
          <div className="widget-card compliance-alerts">
            <div className="widget-header">
              <ShieldAlert size={18} color="#dc2626" />
              <h3>Meter Compliance Alerts</h3>
            </div>
            <div className="alert-scroll">
              <div className="risk-item critical">
                <span className="risk-dot high"></span>
                <div className="risk-text">
                  <h4>Potential Tampering (SN-992)</h4>
                  <p>Zero flow detected with pump running hours active.</p>
                </div>
              </div>
              <div className="risk-item warning mt-10">
                <span className="risk-dot mid"></span>
                <div className="risk-text">
                  <h4>Exceeding NOC Limit (IND-44)</h4>
                  <p>Operating at 108% of permitted abstraction.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="widget-card heatmap-summary">
            <h3>Regional Abstraction Heatmap</h3>
            <div className="heatmap-placeholder">
              <div className="h-row"><span>Jaipur (OE)</span><div className="h-bar r-80"></div></div>
              <div className="h-row"><span>Jodhpur (CR)</span><div className="h-bar r-60"></div></div>
              <div className="h-row"><span>Kota (Safe)</span><div className="h-bar r-30"></div></div>
            </div>
          </div>

          <div className="widget-card quick-actions">
            <h3>Quick Tools</h3>
            <button className="tool-btn"><MapPin size={16} /> GIS Abstraction Overlap</button>
            <button className="tool-btn"><ShieldAlert size={16} /> Auto-Penalty Engine</button>
            <button className="tool-btn"><FileCheck size={16} /> Compliance Audit Log</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .officer-dashboard {
          padding: 1.5rem;
          background: #f8fafc;
          min-height: 100vh;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .dashboard-header h1 {
          font-size: 1.75rem;
          font-weight: 800;
          color: #1e293b;
          margin: 0;
        }

        .dashboard-header p {
          color: #64748b;
          margin: 0.25rem 0 0;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .btn-outline {
          background: white;
          border: 1px solid #e2e8f0;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-primary {
          background: #2563eb;
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1e293b;
        }

        .stat-label {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 500;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 1.5rem;
        }

        .applications-list {
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .list-header {
          padding: 0 1.5rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .tabs {
          display: flex;
          gap: 2rem;
        }

        .tabs button {
          background: none;
          border: none;
          padding: 1rem 0;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          position: relative;
        }

        .tabs button.active {
          color: #2563eb;
        }

        .tabs button.active:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #2563eb;
        }

        .table-container {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        th {
          padding: 1rem 1.5rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          color: #64748b;
          background: #f8fafc;
        }

        td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #f1f5f9;
          font-size: 0.9rem;
          color: #334155;
        }

        .app-id {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          color: #2563eb;
        }

        .tag {
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.75rem;
        }

        .tag.industrial { background: #eff6ff; color: #1e40af; }
        .tag.mining { background: #fef2f2; color: #991b1b; }
        .tag.infrastructure { background: #f0fdf4; color: #166534; }

        .block-tag {
           padding: 0.2rem 0.6rem;
           border-radius: 50px;
           font-size: 0.75rem;
           font-weight: 600;
        }

        .block-tag.oe { background: #fef2f2; color: #dc2626; }
        .block-tag.safe { background: #f0fdf4; color: #16a34a; }

        .score-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .score-bar {
          height: 6px;
          background: #10b981;
          border-radius: 10px;
        }

        .status-label {
          color: #f59e0b;
          font-weight: 600;
        }

        .btn-icon {
          background: none;
          border: none;
          color: #cbd5e1;
          cursor: pointer;
        }

        .sidebar-widgets {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .widget-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .widget-header {
           display: flex;
           align-items: center;
           gap: 0.75rem;
           margin-bottom: 1.25rem;
        }

        .widget-card h3 {
          font-size: 1rem;
          font-weight: 700;
          margin: 0;
        }

        .risk-item {
          display: flex;
          gap: 1rem;
          padding: 0.75rem;
          background: #fef2f2;
          border-radius: 8px;
        }

        .risk-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 5px;
        }

        .risk-dot.high { background: #dc2626; box-shadow: 0 0 0 4px #fee2e2; }

        .risk-text h4 {
          font-size: 0.85rem;
          margin: 0 0 0.25rem;
          color: #991b1b;
        }

        .risk-text p {
          font-size: 0.75rem;
          margin: 0;
          color: #ef4444;
        }

        .quick-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .tool-btn {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 0.75rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          font-size: 0.85rem;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s;
        }

        .risk-item.critical { background: #fef2f2; border: 1px solid #fee2e2; }
        .risk-item.warning { background: #fffbeb; border: 1px solid #fef3c7; }
        .risk-dot.mid { background: #f59e0b; box-shadow: 0 0 0 4px #fef3c7; }
        .mt-10 { margin-top: 10px; }

        .heatmap-placeholder { display: flex; flex-direction: column; gap: 12px; margin-top: 10px; }
        .h-row { display: flex; align-items: center; gap: 10px; font-size: 0.75rem; color: #64748b; }
        .h-row span { width: 80px; }
        .h-bar { height: 8px; border-radius: 4px; background: #e2e8f0; flex: 1; position: relative; overflow: hidden; }
        .h-bar:after { content: ''; position: absolute; left: 0; top: 0; height: 100%; border-radius: 4px; }
        .h-bar.r-80:after { width: 80%; background: #dc2626; }
        .h-bar.r-60:after { width: 60%; background: #f59e0b; }
        .h-bar.r-30:after { width: 30%; background: #10b981; }

        .tool-btn:hover {
          background: #eff6ff;
          border-color: #3b82f6;
          color: #2563eb;
        }
      `}</style>
    </div>
  );
};

export default OfficerDashboard;
