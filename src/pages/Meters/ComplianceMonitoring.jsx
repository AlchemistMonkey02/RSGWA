import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, Activity, BarChart3, TrendingUp, Zap, HelpCircle, X, MapPin, FileWarning, Gavel, CheckCircle2, Siren, Search, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const ComplianceMonitoring = () => {
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [activeTab, setActiveTab] = useState('feed'); // feed, map, analytics

    const alerts = [
        {
            id: 1,
            type: 'Critical',
            issue: 'Zero Flow (Potential Tampering)',
            industry: 'Industrial Steel Ltd',
            location: 'Jaipur Ind. Area',
            time: '10 mins ago',
            details: 'Flow meter recording true zero despite pump status ON for > 4 hours.',
            history: [
                { time: '08:00', flow: 45, limit: 50 },
                { time: '09:00', flow: 48, limit: 50 },
                { time: '10:00', flow: 0, limit: 50 },
                { time: '11:00', flow: 0, limit: 50 },
                { time: '12:00', flow: 0, limit: 50 },
            ],
            nocStatus: 'Active (Expires Dec 2025)',
            contact: '+91-9876543210'
        },
        {
            id: 2,
            type: 'Warning',
            issue: 'Overshooting NOC Limit (108%)',
            industry: 'Green Aquaponics',
            location: 'Udaipur Rural',
            time: '1 hour ago',
            details: 'Daily abstraction limit of 500KL exceeded. Current usage: 540KL.',
            history: [
                { time: 'Mon', flow: 450, limit: 500 },
                { time: 'Tue', flow: 480, limit: 500 },
                { time: 'Wed', flow: 540, limit: 500 },
                { time: 'Thu', flow: 510, limit: 500 },
                { time: 'Fri', flow: 490, limit: 500 },
            ],
            nocStatus: 'Active',
            contact: '+91-9988776655'
        },
        {
            id: 3,
            type: 'Technical',
            issue: 'Meter Offline > 24 Hours',
            industry: 'Jaipur Textile Hub',
            location: 'Sitapura',
            time: '5 hours ago',
            details: 'Last heartbeat received 26 hours ago. Possible power failure or network jam.',
            history: [],
            nocStatus: 'Under Review',
            contact: '+91-1122334455'
        },
    ];

    const AlertDetailModal = ({ alert, onClose }) => {
        if (!alert) return null;

        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <div className="mh-left">
                            <span className={`type-tag ${alert.type.toLowerCase()}`}>{alert.type} Alert</span>
                            <h2>{alert.issue}</h2>
                            <p className="industry-sub">{alert.industry} • {alert.location}</p>
                        </div>
                        <button className="btn-close" onClick={onClose}><X size={24} /></button>
                    </div>

                    <div className="modal-body-grid">
                        <div className="mb-left">
                            <div className="section-card">
                                <h3><Activity size={18} /> Telemetry Analysis</h3>
                                <div className="chart-container">
                                    <ResponsiveContainer width="100%" height={200}>
                                        <AreaChart data={alert.history}>
                                            <defs>
                                                <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                            <XAxis dataKey="time" hide />
                                            <YAxis />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="flow" stroke="#3b82f6" fillOpacity={1} fill="url(#colorFlow)" />
                                            <Line type="monotone" dataKey="limit" stroke="#ef4444" strokeDasharray="5 5" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                    <div className="chart-legend">
                                        <div className="leg-item"><span className="dot flow"></span> Actual Flow</div>
                                        <div className="leg-item"><span className="dot limit"></span> NOC Limit</div>
                                    </div>
                                </div>
                            </div>

                            <div className="section-card">
                                <h3><FileWarning size={18} /> Violation Details</h3>
                                <p className="det-text">{alert.details}</p>
                                <div className="meta-row">
                                    <div className="meta-item">
                                        <span className="label">NOC Status</span>
                                        <span className="val">{alert.nocStatus}</span>
                                    </div>
                                    <div className="meta-item">
                                        <span className="label">Contact</span>
                                        <span className="val">{alert.contact}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-right">
                            <div className="section-card map-card">
                                <h3><MapPin size={18} /> Location Context</h3>
                                <div className="map-placeholder">
                                    <div className="map-pulse"></div>
                                    <span>Geo-fenced Location Verified</span>
                                </div>
                            </div>

                            <div className="section-card enforcement-actions">
                                <h3><Gavel size={18} /> Enforcement Actions</h3>
                                <button className="btn-enforce warning">
                                    <FileWarning size={16} /> Issue Show Cause Notice
                                </button>
                                <button className="btn-enforce penalty">
                                    <Siren size={16} /> Levy Penalty (₹ 50,000)
                                </button>
                                <button className="btn-enforce resolve">
                                    <CheckCircle2 size={16} /> Mark Resolved
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="compliance-monitor-v3">
            <header className="cm-header">
                <div>
                    <h1>Command Center</h1>
                    <p>Real-time groundwater compliance enforcement & anomaly detection</p>
                </div>
                <div className="cm-stats">
                    <div className="stat-pill critical">
                        <span className="val">12</span>
                        <span className="lbl">Critical</span>
                    </div>
                    <div className="stat-pill warning">
                        <span className="val">45</span>
                        <span className="lbl">Warnings</span>
                    </div>
                </div>
            </header>

            <div className="cm-controls">
                <div className="search-wrapper">
                    <Search size={18} />
                    <input type="text" placeholder="Search industries, Alert IDs..." />
                </div>
                <div className="filters">
                    <button className="btn-filter active">All Alerts</button>
                    <button className="btn-filter">Critical</button>
                    <button className="btn-filter">Technical</button>
                    <button className="btn-filter icon"><Filter size={16} /></button>
                </div>
            </div>

            <div className="cm-grid">
                <div className="feed-column">
                    <h3 className="section-title">Live Surveillance Feed</h3>
                    <div className="alerts-list">
                        {alerts.map(a => (
                            <div key={a.id} className={`alert-item-card ${a.type.toLowerCase()}`}>
                                <div className="ac-icon">
                                    {a.type === 'Critical' ? <Siren size={20} /> : a.type === 'Warning' ? <AlertTriangle size={20} /> : <Zap size={20} />}
                                </div>
                                <div className="ac-content">
                                    <div className="ac-header">
                                        <span className="ac-issue">{a.issue}</span>
                                        <span className="ac-time">{a.time}</span>
                                    </div>
                                    <div className="ac-sub">
                                        <span className="ac-ind">{a.industry}</span>
                                        <span className="dot">•</span>
                                        <span className="ac-loc">{a.location}</span>
                                    </div>
                                </div>
                                <button className="btn-investigate" onClick={() => setSelectedAlert(a)}>
                                    Investigate
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rules-column">
                    <h3 className="section-title">Auto-Enforcement Logic</h3>
                    <div className="rules-stack">
                        <div className="rule-card">
                            <div className="rc-header">
                                <strong>Over-Extraction Protocol</strong>
                                <div className="toggle active"></div>
                            </div>
                            <p>Trigger Warning @ 100% NOC</p>
                            <p>Trigger Shutdown @ 110% NOC</p>
                        </div>
                        <div className="rule-card">
                            <div className="rc-header">
                                <strong>Zero-Flow Tamper</strong>
                                <div className="toggle active"></div>
                            </div>
                            <p>If Pump Current {'>'} 5A & Flow = 0 for 60mins</p>
                        </div>
                        <div className="rule-card">
                            <div className="rc-header">
                                <strong>Geo-Fence Breach</strong>
                                <div className="toggle"></div>
                            </div>
                            <p>Mobile Rig outside designated zone</p>
                        </div>
                    </div>

                    <div className="impact-box">
                        <h4>Impact Today</h4>
                        <div className="impact-row">
                            <span>Auto-Notices Sent</span>
                            <strong>24</strong>
                        </div>
                        <div className="impact-row">
                            <span>Units Disabled</span>
                            <strong>02</strong>
                        </div>
                    </div>
                </div>
            </div>

            {selectedAlert && <AlertDetailModal alert={selectedAlert} onClose={() => setSelectedAlert(null)} />}

            <style jsx>{`
                .compliance-monitor-v3 { padding: 30px; background: #f1f5f9; min-height: 100vh; font-family: 'Inter', sans-serif; }
                
                .cm-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                .cm-header h1 { font-size: 2rem; color: #0f172a; margin: 0; font-weight: 800; letter-spacing: -0.5px; }
                .cm-header p { color: #64748b; margin: 6px 0 0; font-size: 1rem; }

                .cm-stats { display: flex; gap: 15px; }
                .stat-pill { display: flex; flex-direction: column; align-items: center; padding: 10px 20px; border-radius: 12px; min-width: 90px; }
                .stat-pill.critical { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
                .stat-pill.warning { background: #fff7ed; color: #9a3412; border: 1px solid #fed7aa; }
                .stat-pill .val { font-size: 1.5rem; font-weight: 800; line-height: 1; }
                .stat-pill .lbl { font-size: 0.75rem; text-transform: uppercase; font-weight: 700; opacity: 0.8; margin-top: 4px; }

                .cm-controls { display: flex; justify-content: space-between; margin-bottom: 25px; }
                .search-wrapper { position: relative; width: 400px; }
                .search-wrapper svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #94a3b8; }
                .search-wrapper input { width: 100%; padding: 12px 12px 12px 42px; border: 1px solid #e2e8f0; border-radius: 10px; outline: none; transition: all 0.2s; font-size: 0.95rem; }
                .search-wrapper input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }

                .filters { display: flex; gap: 8px; }
                .btn-filter { padding: 8px 16px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; color: #64748b; font-weight: 600; cursor: pointer; transition: all 0.2s; }
                .btn-filter:hover { background: #f8fafc; color: #334155; }
                .btn-filter.active { background: #0f172a; color: white; border-color: #0f172a; }
                .btn-filter.icon { padding: 8px; display: flex; align-items: center; }

                .cm-grid { display: grid; grid-template-columns: 1fr 350px; gap: 30px; }
                .section-title { font-size: 0.9rem; text-transform: uppercase; color: #64748b; font-weight: 700; margin: 0 0 15px 0; letter-spacing: 0.5px; }

                .alerts-list { display: flex; flex-direction: column; gap: 12px; }
                .alert-item-card { display: flex; align-items: center; padding: 16px; background: white; border-radius: 12px; border: 1px solid #e2e8f0; transition: all 0.2s; cursor: pointer; }
                .alert-item-card:hover { transform: translateY(-2px); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
                .alert-item-card.critical { border-left: 4px solid #ef4444; }
                .alert-item-card.warning { border-left: 4px solid #f59e0b; }
                .alert-item-card.technical { border-left: 4px solid #3b82f6; }

                .ac-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0; }
                .critical .ac-icon { background: #fee2e2; color: #dc2626; }
                .warning .ac-icon { background: #fff7ed; color: #ea580c; }
                .technical .ac-icon { background: #eff6ff; color: #2563eb; }

                .ac-content { flex: 1; }
                .ac-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
                .ac-issue { font-weight: 700; color: #1e293b; font-size: 1rem; }
                .ac-time { font-size: 0.8rem; color: #94a3b8; }
                .ac-sub { font-size: 0.85rem; color: #64748b; display: flex; align-items: center; gap: 6px; }
                .dot { color: #cbd5e1; }

                .btn-investigate { padding: 8px 16px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.85rem; font-weight: 600; color: #334155; cursor: pointer; transition: all 0.2s; white-space: nowrap; margin-left: 10px; }
                .btn-investigate:hover { background: #f8fafc; border-color: #cbd5e1; color: #0f172a; }

                .rules-stack { display: flex; flex-direction: column; gap: 15px; margin-bottom: 30px; }
                .rule-card { background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; }
                .rc-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
                .rc-header strong { font-size: 0.95rem; color: #1e293b; }
                .toggle { width: 36px; height: 20px; background: #cbd5e1; border-radius: 20px; position: relative; cursor: pointer; }
                .toggle.active { background: #10b981; }
                .toggle::after { content: ''; position: absolute; left: 2px; top: 2px; width: 16px; height: 16px; background: white; border-radius: 50%; transition: all 0.2s; }
                .toggle.active::after { transform: translateX(16px); }
                .rule-card p { margin: 0; font-size: 0.85rem; color: #64748b; line-height: 1.4; }

                .impact-box { background: #1e293b; padding: 20px; border-radius: 12px; color: white; }
                .impact-box h4 { margin: 0 0 15px 0; font-size: 0.95rem; opacity: 0.9; }
                .impact-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); }
                .impact-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
                .impact-row span { font-size: 0.9rem; opacity: 0.8; }
                .impact-row strong { font-size: 1.1rem; }

                /* Modal Styles */
                .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); display: flex; justify-content: center; align-items: center; z-index: 1000; animation: fadeIn 0.2s ease-out; }
                .modal-content { background: white; width: 900px; max-width: 95vw; max-height: 90vh; border-radius: 20px; overflow-y: auto; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: 1px solid #e2e8f0; display: flex; flex-direction: column; }
                
                .modal-header { padding: 25px 30px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: flex-start; background: #fff; position: sticky; top: 0; z-index: 10; }
                .type-tag { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; margin-bottom: 10px; }
                .type-tag.critical { background: #fee2e2; color: #991b1b; }
                .type-tag.warning { background: #fff7ed; color: #9a3412; }
                .type-tag.technical { background: #eff6ff; color: #1e40af; }
                .mh-left h2 { margin: 0; font-size: 1.5rem; color: #1e293b; }
                .industry-sub { margin: 5px 0 0; color: #64748b; font-size: 1rem; font-weight: 500; }
                
                .btn-close { border: none; background: transparent; color: #94a3b8; cursor: pointer; padding: 5px; border-radius: 8px; transition: all 0.2s; }
                .btn-close:hover { background: #f1f5f9; color: #ef4444; }

                .modal-body-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 25px; padding: 30px; background: #f8fafc; }
                .section-card { background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
                .section-card h3 { font-size: 1rem; color: #334155; margin: 0 0 20px 0; display: flex; align-items: center; gap: 10px; }
                
                .chart-container { width: 100%; }
                .chart-legend { display: flex; justify-content: center; gap: 20px; margin-top: 15px; font-size: 0.85rem; color: #64748b; }
                .leg-item { display: flex; align-items: center; gap: 6px; }
                .dot { width: 8px; height: 8px; border-radius: 50%; }
                .dot.flow { background: #3b82f6; }
                .dot.limit { background: #ef4444; }

                .det-text { color: #475569; line-height: 1.6; margin-bottom: 20px; font-size: 0.95rem; }
                .meta-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .meta-item { display: flex; flex-direction: column; gap: 4px; }
                .label { font-size: 0.75rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; }
                .val { font-size: 0.95rem; color: #1e293b; font-weight: 600; }

                .map-placeholder { background: #eff6ff; height: 180px; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #3b82f6; border: 2px dashed #bfdbfe; font-weight: 600; font-size: 0.9rem; }
                .map-pulse { width: 40px; height: 40px; background: rgba(59, 130, 246, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; position: relative; }
                .map-pulse::after { content: ''; width: 12px; height: 12px; background: #3b82f6; border-radius: 50%; }

                .enforcement-actions { display: flex; flex-direction: column; gap: 12px; }
                .btn-enforce { width: 100%; padding: 14px; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 0.95rem; transition: all 0.2s; }
                .btn-enforce.warning { background: #fff7ed; color: #c2410c; border: 1px solid #fed7aa; }
                .btn-enforce.warning:hover { background: #ffedd5; }
                .btn-enforce.penalty { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
                .btn-enforce.penalty:hover { background: #fee2e2; }
                .btn-enforce.resolve { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }
                .btn-enforce.resolve:hover { background: #e2e8f0; }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
        </div>
    );
};

export default ComplianceMonitoring;
