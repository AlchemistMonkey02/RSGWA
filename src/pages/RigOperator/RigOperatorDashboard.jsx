import React from 'react';
import {
    Droplets,
    Plus,
    Clock,
    MapPin,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    FileText,
    Calendar
} from 'lucide-react';

const RigOperatorDashboard = () => {
    const stats = [
        { label: 'Registered Rigs', value: '03', icon: <Droplets size={20} />, color: '#3b82f6' },
        { label: 'Active Permits', value: '12', icon: <CheckCircle2 size={20} />, color: '#10b981' },
        { label: 'Pending Renewals', value: '01', icon: <Clock size={20} />, color: '#f59e0b' },
        { label: 'Daily Logs Due', value: '02', icon: <AlertCircle size={20} />, color: '#dc2626' }
    ];

    const recentDrilling = [
        { id: 'DP/2025/110', location: 'Churu District', depth: '120m', status: 'In Progress', date: 'Oct 24, 2025' },
        { id: 'DP/2025/108', location: 'Jaipur Sector 4', depth: '85m', status: 'Completed', date: 'Oct 20, 2025' },
        { id: 'DP/2025/095', location: 'Bikaner Rural', depth: '150m', status: 'Completed', date: 'Oct 15, 2025' }
    ];

    return (
        <div className="operator-dashboard">
            <header className="dashboard-header">
                <div>
                    <h1>Rig Operator Portal</h1>
                    <p>Welcome, Khandelwal Drilling Services</p>
                </div>
                <div className="header-actions">
                    <button className="btn-outline"><FileText size={18} /> Download Certificates</button>
                    <button className="btn-primary"><Plus size={18} /> Register New Rig</button>
                </div>
            </header>

            {/* Stats */}
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

            <div className="dashboard-grid">
                {/* Current Operations */}
                <div className="operations-card">
                    <div className="card-header">
                        <h3>Recent Drilling Operations</h3>
                        <button className="view-all">View All <TrendingUp size={14} /></button>
                    </div>
                    <div className="op-list">
                        {recentDrilling.map((op, i) => (
                            <div key={i} className="op-item">
                                <div className="op-icon">
                                    <MapPin size={18} />
                                </div>
                                <div className="op-details">
                                    <h4>{op.location}</h4>
                                    <p>Permit ID: {op.id} • Depth: {op.depth}</p>
                                </div>
                                <div className="op-meta">
                                    <span className={`status-pill ${op.status.toLowerCase().replace(' ', '-')}`}>
                                        {op.status}
                                    </span>
                                    <span className="op-date">{op.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Compliance Reminders */}
                <div className="compliance-widgets">
                    <div className="widget-card">
                        <h3>Rig Maintenance Compliance</h3>
                        <p className="widget-desc">Ensure all rigs are GPS-enabled as per new RGWA guidelines.</p>
                        <div className="compliance-status">
                            <div className="status-item">
                                <span>Rig RJ-14-GA-102</span>
                                <span className="compliant">Compliant</span>
                            </div>
                            <div className="status-item">
                                <span>Rig RJ-07-GA-554</span>
                                <span className="non-compliant">GPS Offline</span>
                            </div>
                        </div>
                        <button className="btn-full">Update Device Status</button>
                    </div>

                    <div className="widget-card scheduled-jobs">
                        <h3>Scheduled Inspections</h3>
                        <div className="job-item">
                            <div className="date-box">
                                <span className="day">28</span>
                                <span className="month">OCT</span>
                            </div>
                            <div className="job-info">
                                <h4>Equipment Check</h4>
                                <p>Regional Office, Jaipur</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .operator-dashboard {
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
          background: #7c3aed;
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
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

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 1.5rem;
        }

        .operations-card {
           background: white;
           padding: 1.5rem;
           border-radius: 12px;
           box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .card-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: 2rem;
        }

        .card-header h3 {
           margin: 0;
           font-size: 1.1rem;
           font-weight: 700;
        }

        .view-all {
          background: none;
          border: none;
          color: #7c3aed;
          font-weight: 600;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
        }

        .op-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .op-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 10px;
          border: 1px solid #f1f5f9;
        }

        .op-icon {
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
        }

        .op-details { flex: 1; }
        .op-details h4 { font-size: 0.95rem; margin: 0 0 0.2rem; color: #1e293b; }
        .op-details p { font-size: 0.75rem; margin: 0; color: #64748b; }

        .op-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.4rem;
        }

        .status-pill {
          padding: 0.2rem 0.6rem;
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .status-pill.in-progress { background: #eff6ff; color: #3b82f6; }
        .status-pill.completed { background: #f0fdf4; color: #16a34a; }

        .op-date { font-size: 0.7rem; color: #94a3b8; }

        .widget-card {
           background: white;
           padding: 1.5rem;
           border-radius: 12px;
           box-shadow: 0 1px 3px rgba(0,0,0,0.1);
           margin-bottom: 1.5rem;
        }

        .widget-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 0.75rem; }
        .widget-desc { font-size: 0.8rem; color: #64748b; margin-bottom: 1.25rem; }

        .compliance-status {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .status-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .compliant { color: #16a34a; }
        .non-compliant { color: #dc2626; }

        .btn-full {
          width: 100%;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          padding: 0.6rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .job-item {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .date-box {
          background: #0f172a;
          color: white;
          padding: 0.5rem;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 50px;
        }

        .date-box .day { font-size: 1.25rem; font-weight: 800; line-height: 1; }
        .date-box .month { font-size: 0.65rem; font-weight: 700; }

        .job-info h4 { font-size: 0.9rem; margin: 0; color: #1e293b; }
        .job-info p { font-size: 0.75rem; margin: 0; color: #64748b; }

        @media (max-width: 1024px) {
          .dashboard-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
};

export default RigOperatorDashboard;
