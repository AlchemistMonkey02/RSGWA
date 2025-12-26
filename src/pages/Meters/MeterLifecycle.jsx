import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Bell, ClipboardList, Search, Filter, ArrowUpRight, Signal,
    Battery, RefreshCw, Activity, ShieldAlert, Zap, Factory, CheckCircle2,
    Truck, UserCheck, ArrowLeft, MoreHorizontal, FileText, MapPin
} from 'lucide-react';

const MeterLifecycle = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const activeSerial = searchParams.get('serial');

    const [activeTab, setActiveTab] = useState('console');
    const [telemetry] = useState([
        { id: 1, serial: 'SN-77881', model: 'FM-200', status: 'Active', volume: '1,240.5 m3', battery: '88%', signal: 'Good', lastSeen: '2 mins ago' },
        { id: 2, serial: 'SN-77882', model: 'FM-200', status: 'Active', volume: '842.1 m3', battery: '92%', signal: 'Excellent', lastSeen: '15 mins ago' },
        { id: 3, serial: 'SN-99042', model: 'AT-Ultra', status: 'Suspended', volume: '0.0 m3', battery: '12%', signal: 'Weak', lastSeen: '2 days ago' },
    ]);

    // Mock Timeline Data
    const timelineEvents = [
        {
            stage: 'Manufacturing',
            date: '2024-10-15',
            title: 'Unit Manufactured',
            details: 'Produced at FlowMaster Facility A. QA Check Passed.',
            icon: Factory,
            bg: '#eff6ff',
            color: '#3b82f6'
        },
        {
            stage: 'Registration',
            date: '2024-10-20',
            title: 'Vendor Registration',
            details: 'Added to Vendor Inventory. Initial calibration certificate uploaded.',
            icon: ClipboardList,
            bg: '#f0fdf4',
            color: '#10b981'
        },
        {
            stage: 'Installation',
            date: '2024-11-05',
            title: 'Field Installation',
            details: 'Installed at Site RJ-JP-004. Linked to Tube Well #2.',
            icon: Truck,
            bg: '#fff7ed',
            color: '#f59e0b'
        },
        {
            stage: 'Verification',
            date: '2024-11-08',
            title: 'Officer Verification',
            details: 'Verified by Officer Rajesh Kumar. Sealing complete.',
            icon: UserCheck,
            bg: '#f5f3ff',
            color: '#8b5cf6'
        }
    ];

    if (activeSerial) {
        return (
            <div className="lifecycle-timeline-page">
                <div className="timeline-header">
                    <button className="btn-back" onClick={() => navigate('/meter-lifecycle')}>
                        <ArrowLeft size={18} /> Back to Console
                    </button>
                    <div className="device-identity">
                        <h1>Device Lifecycle: {activeSerial}</h1>
                        <span className="status-badge active">Active Monitoring</span>
                    </div>
                    <div className="header-actions">
                        <button className="btn-secondary-v2"><FileText size={16} /> History Report</button>
                        <button className="btn-primary-v2"><RefreshCw size={16} /> Refresh Status</button>
                    </div>
                </div>

                <div className="timeline-container">
                    <div className="current-status-card">
                        <h3>Current Telemetry</h3>
                        <div className="status-grid">
                            <div className="stat-box">
                                <label>Signal Strength</label>
                                <div className="val-row"><Signal size={16} className="text-green-500" /> <strong>-85 dBm</strong></div>
                            </div>
                            <div className="stat-box">
                                <label>Battery Level</label>
                                <div className="val-row"><Battery size={16} className="text-green-500" /> <strong>92%</strong></div>
                            </div>
                            <div className="stat-box">
                                <label>Last Syllabus</label>
                                <div className="val-row"><Activity size={16} className="text-blue-500" /> <strong>10 mins ago</strong></div>
                            </div>
                        </div>
                    </div>

                    <div className="timeline-track">
                        {timelineEvents.map((event, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-marker">
                                    <div className="icon-circle" style={{ background: event.bg, color: event.color }}>
                                        <event.icon size={20} />
                                    </div>
                                    {index !== timelineEvents.length - 1 && <div className="line-connector"></div>}
                                </div>
                                <div className="timeline-content">
                                    <div className="tc-header">
                                        <h4>{event.title}</h4>
                                        <span className="event-date">{event.date}</span>
                                    </div>
                                    <p>{event.details}</p>
                                    <span className="stage-tag">{event.stage}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <style jsx>{`
                    .lifecycle-timeline-page { padding: 30px; background: #f8fafc; min-height: 100vh; font-family: 'Inter', sans-serif; }
                    .timeline-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
                    .btn-back { background: none; border: none; color: #64748b; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 0.9rem; }
                    .btn-back:hover { color: #1e293b; }
                    
                    .device-identity h1 { font-size: 1.5rem; margin: 0 0 5px 0; color: #1e293b; }
                    .status-badge { background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 99px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
                    .header-actions { display: flex; gap: 10px; }

                    .timeline-container { display: grid; grid-template-columns: 300px 1fr; gap: 40px; max-width: 1000px; margin: 0 auto; }
                    
                    .current-status-card { background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; height: fit-content; }
                    .current-status-card h3 { margin: 0 0 15px 0; font-size: 1rem; color: #334155; }
                    .status-grid { display: flex; flex-direction: column; gap: 15px; }
                    .stat-box label { display: block; font-size: 0.75rem; color: #64748b; margin-bottom: 4px; }
                    .val-row { display: flex; align-items: center; gap: 8px; color: #1e293b; }

                    .timeline-track { display: flex; flex-direction: column; gap: 0; }
                    .timeline-item { display: flex; gap: 20px; position: relative; padding-bottom: 30px; }
                    .timeline-marker { display: flex; flex-direction: column; align-items: center; width: 40px; }
                    .icon-circle { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 2; position: relative; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
                    .line-connector { width: 2px; background: #e2e8f0; flex: 1; margin-top: -5px; margin-bottom: -5px; position: absolute; top: 40px; bottom: 0; left: 50%; transform: translateX(-50%); z-index: 1; }
                    
                    .timeline-content { background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; flex: 1; position: relative; top: -5px; }
                    .tc-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
                    .tc-header h4 { margin: 0; color: #1e293b; font-size: 1rem; }
                    .event-date { font-size: 0.8rem; color: #64748b; font-weight: 600; }
                    .timeline-content p { color: #475569; font-size: 0.9rem; margin: 0 0 12px 0; line-height: 1.5; }
                    .stage-tag { font-size: 0.7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
                `}</style>
            </div>
        );
    }

    // Default Console View (Existing Code)
    return (
        <div className="meter-lifecycle-v2">
            <div className="page-header">
                <div className="title-area">
                    <h1>Lifecycle & Telemetry Monitor</h1>
                    <p>Real-time extraction velocity and infrastructure health diagnostics</p>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary-v2"><RefreshCw size={16} /> Sync Data</button>
                    <div className="network-health">
                        <Signal size={16} className="text-green-500" />
                        <span>Network: Optimal</span>
                    </div>
                </div>
            </div>

            <div className="tabs-container">
                <div className="tabs-list">
                    <button className={`tab-btn ${activeTab === 'console' ? 'active' : ''}`} onClick={() => setActiveTab('console')}>
                        <LayoutDashboard size={16} /> Live Console
                    </button>
                    <button className={`tab-btn ${activeTab === 'alerts' ? 'active' : ''}`} onClick={() => setActiveTab('alerts')}>
                        <Bell size={16} /> Alert Manager
                    </button>
                    <button className={`tab-btn ${activeTab === 'logs' ? 'active' : ''}`} onClick={() => setActiveTab('logs')}>
                        <ClipboardList size={16} /> Lifecycle Logs
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'console' && (
                        <div className="tab-pane active animated">
                            <div className="metrics-grid">
                                <div className="metric-card-v2">
                                    <Zap size={20} className="text-blue-500" />
                                    <div className="m-detail">
                                        <span>Total Extraction</span>
                                        <strong>2,082.6 m³</strong>
                                    </div>
                                </div>
                                <div className="metric-card-v2">
                                    <ShieldAlert size={20} className="text-red-500" />
                                    <div className="m-detail">
                                        <span>Active Issues</span>
                                        <strong>3 Alerts</strong>
                                    </div>
                                </div>
                                <div className="metric-card-v2">
                                    <Activity size={20} className="text-green-500" />
                                    <div className="m-detail">
                                        <span>Sync Frequency</span>
                                        <strong>15 Mins</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="console-controls">
                                <div className="search-box">
                                    <Search size={18} />
                                    <input type="text" placeholder="Filter by Serial or Site..." />
                                </div>
                                <button className="btn-filter-icon"><Filter size={16} /></button>
                            </div>

                            <div className="telemetry-grid">
                                {telemetry.map(meter => (
                                    <div key={meter.id} className={`tele-card ${meter.status.toLowerCase()}`}>
                                        <div className="tele-header">
                                            <div className="tele-id">
                                                <strong>{meter.serial}</strong>
                                                <span>{meter.model}</span>
                                            </div>
                                            <span className={`status-pill ${meter.status.toLowerCase()}`}>{meter.status}</span>
                                        </div>
                                        <div className="tele-info">
                                            <div className="info-node">
                                                <span className="info-label">Cumulative Volume</span>
                                                <span className="info-value">{meter.volume}</span>
                                            </div>
                                            <div className="tech-row">
                                                <div className="tech-item">
                                                    <Battery size={14} className={parseInt(meter.battery) < 20 ? 'text-red-500' : 'text-green-500'} />
                                                    <span>{meter.battery}</span>
                                                </div>
                                                <div className="tech-item">
                                                    <Signal size={14} className={meter.signal === 'Weak' ? 'text-red-500' : 'text-blue-500'} />
                                                    <span>{meter.signal}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tele-footer">
                                            <span className="last-seen">Seen {meter.lastSeen}</span>
                                            <button className="btn-diag" onClick={() => navigate(`/meter-lifecycle?serial=${meter.serial}`)}>
                                                Deep Diagnostics <ArrowUpRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'alerts' && (
                        <div className="tab-pane active animated">
                            <div className="alert-table-box">
                                <table className="modern-table">
                                    <thead>
                                        <tr>
                                            <th>Alert Ref</th>
                                            <th>Identity</th>
                                            <th>Violation Type</th>
                                            <th>Severity</th>
                                            <th>Timeline</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="font-mono">ALR-4402</td>
                                            <td>SN-99042</td>
                                            <td>Critically Low Battery</td>
                                            <td><span className="sev-tag warning">Warning</span></td>
                                            <td>2 hours ago</td>
                                            <td><button className="btn-table-action">Investigate</button></td>
                                        </tr>
                                        <tr>
                                            <td className="font-mono">ALR-4398</td>
                                            <td>SN-10229</td>
                                            <td>Tamper Detected (Seal)</td>
                                            <td><span className="sev-tag critical">Critical</span></td>
                                            <td>6 hours ago</td>
                                            <td><button className="btn-table-action">Escalate</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'logs' && (
                        <div className="tab-pane active animated">
                            <div className="log-placeholder">
                                <ClipboardList size={32} />
                                <h3>Infrastructure Event Log</h3>
                                <p>Comprehensive stream of all handshake, sync, and configuration events.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .meter-lifecycle-v2 { padding: 30px; background: #f8fafc; min-height: 100vh; font-family: 'Inter', sans-serif; }
                .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
                .title-area h1 { font-size: 2rem; color: #1e293b; margin: 0; font-weight: 800; }
                .title-area p { color: #64748b; margin: 4px 0 0; font-size: 1rem; }

                .header-actions { display: flex; gap: 20px; align-items: center; }
                .btn-sync { padding: 8px 15px; background: white; border: 1px solid #e2e8f0; color: #475569; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }
                .network-health { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 700; color: #1e293b; }

                .tabs-container { background: white; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
                .tabs-list { display: flex; background: #f1f5f9; padding: 6px; gap: 4px; border-radius: 16px 16px 0 0; }
                .tab-btn { flex: 1; padding: 12px; border: none; background: transparent; border-radius: 10px; font-weight: 700; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; }
                .tab-btn:hover { background: #e2e8f0; color: #1e293b; }
                .tab-btn.active { background: white; color: #2563eb; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }

                .tab-content { padding: 30px; }

                .metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
                .metric-card-v2 { background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 16px; display: flex; align-items: center; gap: 15px; }
                .m-detail span { display: block; font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase; }
                .m-detail strong { font-size: 1.25rem; color: #1e293b; }

                .console-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
                .search-box { display: flex; align-items: center; gap: 12px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 18px; border-radius: 12px; width: 350px; }
                .search-box input { border: none; background: transparent; outline: none; width: 100%; font-size: 0.95rem; }
                .btn-filter-icon { width: 38px; height: 38px; border-radius: 10px; border: 1px solid #e2e8f0; background: white; color: #475569; display: flex; align-items: center; justify-content: center; cursor: pointer; }

                .telemetry-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
                .tele-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; transition: all 0.2s; }
                .tele-card:hover { transform: translateY(-3px); border-color: #2563eb; }
                
                .tele-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
                .tele-id strong { display: block; font-family: 'JetBrains Mono', monospace; color: #1e293b; }
                .tele-id span { font-size: 0.8rem; color: #94a3b8; font-weight: 600; }
                
                .status-pill { padding: 3px 8px; border-radius: 4px; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; }
                .status-pill.active { background: #dcfce7; color: #166534; }
                .status-pill.suspended { background: #fee2e2; color: #991b1b; }

                .tele-info { margin-bottom: 20px; }
                .info-node { margin-bottom: 12px; }
                .info-label { display: block; font-size: 0.7rem; color: #64748b; font-weight: 700; text-transform: uppercase; margin-bottom: 4px; }
                .info-value { font-size: 1.25rem; font-weight: 800; color: #1e293b; }

                .tech-row { display: flex; gap: 15px; }
                .tech-item { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; font-weight: 600; color: #475569; }

                .tele-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 1px solid #f1f5f9; }
                .last-seen { font-size: 0.75rem; color: #94a3b8; }
                .btn-diag { font-size: 0.75rem; font-weight: 700; color: #2563eb; background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 4px; }

                .modern-table { width: 100%; border-collapse: collapse; }
                .modern-table th { text-align: left; padding: 15px; background: #f8fafc; color: #64748b; font-size: 0.75rem; text-transform: uppercase; font-weight: 800; border-bottom: 1px solid #f1f5f9; }
                .modern-table td { padding: 15px; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; color: #475569; }

                .sev-tag { padding: 4px 10px; border-radius: 4px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
                .sev-tag.warning { background: #fffbeb; color: #9a3412; }
                .sev-tag.critical { background: #fee2e2; color: #991b1b; }

                .btn-table-action { padding: 5px 12px; border-radius: 6px; border: 1px solid #e2e8f0; background: white; font-size: 0.8rem; font-weight: 700; cursor: pointer; }
                
                .log-placeholder { text-align: center; padding: 100px; color: #94a3b8; }
                .animated { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default MeterLifecycle;
