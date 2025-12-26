import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    Truck,
    CheckCircle,
    AlertCircle,
    PlusCircle,
    ArrowUpRight,
    Search,
    Clock,
    ShieldCheck,
    Wrench,
    FileText,
    AlertTriangle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const VendorDashboard = () => {
    const navigate = useNavigate();

    const stats = [
        { label: 'Total Models', value: '4', icon: <Package size={24} />, color: '#3b82f6', bg: '#eff6ff', path: '/meter-models' },
        { label: 'Registered Meters', value: '128', icon: <ShieldCheck size={24} />, color: '#10b981', bg: '#f0fdf4', path: '/meter-inventory' },
        { label: 'Pending Installs', value: '12', icon: <Truck size={24} />, color: '#f59e0b', bg: '#fffbeb', path: '/meter-installation' },
        { label: 'Verified Devices', value: '96', icon: <CheckCircle size={24} />, color: '#8b5cf6', bg: '#f5f3ff', path: '/meter-verification' }
    ];

    const chartData = [
        { name: 'Model A', value: 45 },
        { name: 'Model B', value: 32 },
        { name: 'Model C', value: 28 },
        { name: 'Model D', value: 23 },
    ];

    const serviceIssues = [
        { id: 'TKT-9982', issue: 'Sensor Calibration Error', device: 'SN-44521', status: 'Open', priority: 'High', daysOpen: 2 },
        { id: 'TKT-9983', issue: 'Battery Drain Alert', device: 'SN-44589', status: 'In Progress', priority: 'Medium', daysOpen: 4 },
        { id: 'TKT-9985', issue: 'Connectivity Loss', device: 'SN-44112', status: 'Open', priority: 'Low', daysOpen: 1 },
    ];

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

    return (
        <div className="vendor-dashboard">
            <header className="v-header">
                <div>
                    <h1>Vendor Management Portal</h1>
                    <p>Manage your flow meter inventory, installations, and service requests.</p>
                </div>
                <div className="v-actions">
                    <button className="btn btn-secondary-v2"><Clock size={18} /> Sync Devices</button>
                    <button className="btn btn-primary-v2" onClick={() => navigate('/meter-models?action=new')}>
                        <PlusCircle size={18} /> New Registration
                    </button>
                </div>
            </header>

            {/* Interactive Stats Cards */}
            <div className="stats-grid">
                {stats.map((s, i) => (
                    <div
                        key={i}
                        className="stat-card clickable"
                        style={{ borderLeft: `4px solid ${s.color}` }}
                        onClick={() => navigate(s.path)}
                    >
                        <div className="stat-icon" style={{ backgroundColor: s.bg, color: s.color }}>
                            {s.icon}
                        </div>
                        <div className="stat-info">
                            <span className="s-val">{s.value}</span>
                            <span className="s-lab">{s.label}</span>
                        </div>
                        <ArrowUpRight size={16} className="s-arrow" />
                    </div>
                ))}
            </div>

            <div className="dashboard-main">
                <div className="content-left">
                    {/* Performance Chart */}
                    <div className="chart-section mb-6">
                        <div className="card-header-flex">
                            <h3>Model Performance & Adoption</h3>
                            <span className="badge badge-success">4 Models Approved</span>
                        </div>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* New Service Reporting Section */}
                    <div className="service-section">
                        <div className="card-header-flex">
                            <h3><Wrench size={18} /> Service & Issue Reporting</h3>
                            <button className="btn-link">View All Tickets</button>
                        </div>
                        <div className="issues-list">
                            {serviceIssues.map(issue => (
                                <div key={issue.id} className="issue-item">
                                    <div className="issue-icon">
                                        <AlertTriangle size={18} />
                                    </div>
                                    <div className="issue-details">
                                        <h4>{issue.issue}</h4>
                                        <p>Device: <strong>{issue.device}</strong> • ID: {issue.id}</p>
                                    </div>
                                    <div className="issue-meta">
                                        <span className={`priority-tag ${issue.priority.toLowerCase()}`}>{issue.priority}</span>
                                        <span className="days-tag">{issue.daysOpen}d open</span>
                                    </div>
                                    <button className="btn-resolve">Resolve</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="content-right">
                    <div className="analytics-card">
                        <h4>Device Activation Success</h4>
                        <div className="success-rate">
                            <span className="rate-val">98.2%</span>
                            <span className="rate-label">Last 30 Days</span>
                        </div>
                        <div className="mini-progress-bar">
                            <div className="m-fill" style={{ width: '98.2%' }}></div>
                        </div>
                    </div>

                    <div className="analytics-card mt-6">
                        <h4>Regional Service Stats</h4>
                        <div className="stats-list">
                            <div className="s-item">
                                <span>Jaipur Region</span>
                                <span>85/90</span>
                            </div>
                            <div className="s-item">
                                <span>Jodhpur Region</span>
                                <span>42/45</span>
                            </div>
                        </div>
                    </div>

                    <div className="action-card mt-6">
                        <h4>Field Actions</h4>
                        <div className="quick-actions">
                            <button className="qa-btn"><FileText size={16} /> Generate Report</button>
                            <button className="qa-btn"><Truck size={16} /> Dispatch Tech</button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .vendor-dashboard { padding: 25px; background: #f8fafc; min-height: 100vh; font-family: 'Inter', sans-serif; }
                .v-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                .v-header h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin: 0; }
                .v-header p { color: #64748b; margin-top: 5px; }
                .v-actions { display: flex; gap: 12px; }

                .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 30px; }
                .stat-card { background: white; padding: 20px; border-radius: 12px; display: flex; align-items: center; gap: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); position: relative; transition: transform 0.2s, box-shadow 0.2s; }
                .stat-card.clickable { cursor: pointer; }
                .stat-card.clickable:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
                .stat-icon { width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
                .stat-info { display: flex; flex-direction: column; }
                .s-val { font-size: 1.5rem; font-weight: 800; color: #1e293b; }
                .s-lab { font-size: 0.85rem; color: #64748b; font-weight: 600; }
                .s-arrow { position: absolute; top: 15px; right: 15px; color: #cbd5e1; }

                .dashboard-main { display: grid; grid-template-columns: 1fr 340px; gap: 25px; margin-bottom: 25px; }
                .content-left { display: flex; flex-direction: column; }
                .content-right { display: flex; flex-direction: column; }

                .chart-section, .analytics-card, .service-section, .action-card { background: white; padding: 25px; border-radius: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #f1f5f9; }
                .mb-6 { margin-bottom: 24px; }
                .mt-6 { margin-top: 24px; }

                .card-header-flex { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                h3 { font-size: 1rem; font-weight: 700; color: #334155; margin: 0; display: flex; align-items: center; gap: 10px; }
                h4 { font-size: 0.9rem; color: #64748b; margin: 0 0 15px 0; font-weight: 600; }

                .success-rate { display: flex; align-items: baseline; gap: 8px; margin-bottom: 10px; }
                .rate-val { font-size: 1.8rem; font-weight: 800; color: #1e293b; }
                .rate-label { font-size: 0.75rem; color: #94a3b8; font-weight: 600; }
                .mini-progress-bar { height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; }
                .m-fill { height: 100%; background: #10b981; border-radius: 3px; }
                
                .stats-list { display: flex; flex-direction: column; gap: 12px; }
                .s-item { display: flex; justify-content: space-between; font-size: 0.85rem; color: #475569; font-weight: 500; }

                /* Service Section Styles */
                .issues-list { display: flex; flex-direction: column; gap: 12px; }
                .issue-item { display: flex; align-items: center; gap: 15px; padding: 12px; border: 1px solid #f1f5f9; border-radius: 10px; background: #fff; transition: background 0.2s; }
                .issue-item:hover { background: #f8fafc; }
                
                .issue-icon { color: #f59e0b; background: #fffbeb; padding: 8px; border-radius: 8px; }
                .issue-details { flex: 1; }
                .issue-details h4 { margin: 0 0 4px 0; color: #1e293b; font-size: 0.9rem; }
                .issue-details p { margin: 0; color: #64748b; font-size: 0.8rem; }
                
                .issue-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; margin-right: 15px; }
                .priority-tag { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; padding: 2px 6px; border-radius: 4px; }
                .priority-tag.high { color: #dc2626; background: #fee2e2; }
                .priority-tag.medium { color: #d97706; background: #fef3c7; }
                .priority-tag.low { color: #2563eb; background: #dbeafe; }
                .days-tag { font-size: 0.7rem; color: #94a3b8; }
                
                .btn-resolve { padding: 6px 12px; border: 1px solid #e2e8f0; background: white; border-radius: 6px; font-size: 0.8rem; cursor: pointer; color: #475569; font-weight: 600; }
                .btn-resolve:hover { background: #10b981; color: white; border-color: #10b981; }
                
                .btn-link { background: none; border: none; color: #2563eb; font-weight: 600; cursor: pointer; font-size: 0.85rem; }

                .quick-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                .qa-btn { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 15px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; cursor: pointer; color: #475569; font-size: 0.8rem; font-weight: 600; }
                .qa-btn:hover { background: #eff6ff; color: #2563eb; border-color: #dbeafe; }
            `}</style>
        </div>
    );
};

export default VendorDashboard;
