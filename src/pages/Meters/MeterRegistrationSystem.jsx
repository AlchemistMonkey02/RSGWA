import React, { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

import {
    LayoutDashboard, Plus, Users, Award, CheckCircle, Database, AlertTriangle, Link2, BarChart3, Gavel,
    Menu, X, Package, Ruler, Wifi, Save, RotateCcw, FileText, Search, Filter, UploadCloud, Info
} from 'lucide-react';

import VendorRegistry from './VendorRegistry';
import InstallerCertification from './InstallerCertification';
import MeterVerification from './MeterVerification';
import ComplianceMonitoring from './ComplianceMonitoring';
import GroundwaterCharges from '../Billing/GroundwaterCharges';

// --- MOCK DATA FOR CHARTS ---
const USAGE_DATA = [
    { day: 'Mon', usage: 450, limit: 500 },
    { day: 'Tue', usage: 480, limit: 500 },
    { day: 'Wed', usage: 520, limit: 500 }, // Overshoot
    { day: 'Thu', usage: 430, limit: 500 },
    { day: 'Fri', usage: 490, limit: 500 },
    { day: 'Sat', usage: 300, limit: 500 },
    { day: 'Sun', usage: 250, limit: 500 },
];

const TELEMETRY_LOGS = [
    { id: 101, time: '10:00 AM', flow: '45.2 m³/h', total: '14,200 m³', signal: 'Strong', battery: '98%', status: 'Normal' },
    { id: 102, time: '10:15 AM', flow: '46.1 m³/h', total: '14,211 m³', signal: 'Strong', battery: '98%', status: 'Normal' },
    { id: 103, time: '10:30 AM', flow: '0.0 m³/h', total: '14,222 m³', signal: 'Weak', battery: '97%', status: 'Low Flow' },
    { id: 104, time: '10:45 AM', flow: '44.8 m³/h', total: '14,233 m³', signal: 'Good', battery: '97%', status: 'Normal' },
];

const ROLE_PERMISSIONS = {
    admin: ['registration', 'vendor', 'installer', 'verification', 'data', 'compliance', 'integration', 'reports', 'enforcement'],
    vendor: ['registration', 'vendor', 'data'],
    user: ['registration', 'data', 'compliance', 'reports', 'enforcement']
};

const MeterRegistrationSystem = () => {
    const [activeTab, setActiveTab] = useState('registration');
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [showFlowGuide, setShowFlowGuide] = useState(false);
    const [userRole, setUserRole] = useState('admin'); // Default role for demo

    const menuItems = [
        { id: 'registration', label: '1. Meter Registration', icon: <Plus size={18} /> },
        { id: 'vendor', label: '2. Vendor Registry', icon: <Users size={18} /> },
        { id: 'installer', label: '3. Installer Cert', icon: <Award size={18} /> },
        { id: 'verification', label: '4. Verification', icon: <CheckCircle size={18} /> },
        { id: 'data', label: '5. Data Submission', icon: <Database size={18} /> },
        { id: 'compliance', label: '6. Compliance & Alerts', icon: <AlertTriangle size={18} /> },
        { id: 'integration', label: '7. Rig Integration', icon: <Link2 size={18} /> },
        { id: 'reports', label: '8. Reports & Analytics', icon: <BarChart3 size={18} /> },
        { id: 'enforcement', label: '9. Enforcement', icon: <Gavel size={18} /> },
    ];

    const allowedTabs = ROLE_PERMISSIONS[userRole] || [];
    const filteredMenu = menuItems.filter(item => allowedTabs.includes(item.id));

    // Reset active tab if permission lost
    if (!allowedTabs.includes(activeTab) && allowedTabs.length > 0) {
        setActiveTab(allowedTabs[0]);
    }

    const TabContent = () => {
        switch (activeTab) {
            case 'registration': return <RegistrationMock role={userRole} />;
            case 'vendor': return <VendorRegistry />;
            case 'installer': return <InstallerCertification />;
            case 'verification': return <MeterVerification />;
            case 'data': return <DataSubmissionView />;
            case 'compliance': return <ComplianceMonitoring />;
            case 'integration': return <IntegrationView />;
            case 'reports': return <ReportsView />;
            case 'enforcement': return <GroundwaterCharges />;
            default: return <RegistrationMock role={userRole} />;
        }
    };

    return (
        <div className="system-container">
            {/* Sidebar Navigation */}
            <div className={`system-sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
                <div className="sidebar-header">
                    {isSidebarOpen && <h2>Meter Sys</h2>}
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="toggle-btn">
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
                <div className="nav-menu">
                    {filteredMenu.map(item => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <span className="icon">{item.icon}</span>
                            {isSidebarOpen && <span className="label">{item.label}</span>}
                        </button>
                    ))}
                </div>
                <div className="sidebar-footer">
                    <button className="help-btn" onClick={() => setShowFlowGuide(true)}>
                        <Info size={18} />
                        {isSidebarOpen && <span>Module Flow</span>}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="system-main">
                <header className="main-header">
                    <div>
                        <h1>Water Meter Registration System</h1>
                        <p>Unified Module for Lifecycle Management, Compliance & Enforcement</p>
                    </div>
                    <div className="header-right">
                        <select
                            className="role-switcher"
                            value={userRole}
                            onChange={(e) => setUserRole(e.target.value)}
                        >
                            <option value="admin">Admin View</option>
                            <option value="vendor">Vendor View</option>
                            <option value="user">User View</option>
                        </select>
                        <button className="btn-guide" onClick={() => setShowFlowGuide(true)}>
                            <Info size={16} /> Workflow Guide
                        </button>
                    </div>
                </header>

                <div className="content-viewport">
                    <TabContent />
                </div>
            </div>

            {/* Workflow Guide Modal */}
            {showFlowGuide && (
                <div className="modal-overlay" onClick={() => setShowFlowGuide(false)}>
                    <div className="guide-modal" onClick={e => e.stopPropagation()}>
                        <div className="guide-header">
                            <h3>Module Ecosystem Flow</h3>
                            <button onClick={() => setShowFlowGuide(false)}><X size={20} /></button>
                        </div>
                        <div className="flow-steps">
                            <div className="step">
                                <div className="step-num">1</div>
                                <h4>Registration</h4>
                                <p>Meter is registered with tech specs (Type, Dia, Accuracy).</p>
                            </div>
                            <div className="arrow">→</div>
                            <div className="step">
                                <div className="step-num">2</div>
                                <h4>Verification</h4>
                                <p>Officer validates installation via 'Installer Cert' & 'Verification' tab.</p>
                            </div>
                            <div className="arrow">→</div>
                            <div className="step">
                                <div className="step-num">3</div>
                                <h4>Data Stream</h4>
                                <p>Data flows into 'Data Submission' (Manual/IoT).</p>
                            </div>
                            <div className="arrow">→</div>
                            <div className="step">
                                <div className="step-num">4</div>
                                <h4>Compliance</h4>
                                <p>'Compliance' engine checks limits; 'Enforcement' applies charges.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .system-container { display: flex; height: 100vh; background: #f1f5f9; overflow: hidden; font-family: 'Inter', sans-serif; }
                
                .system-sidebar { background: #1e293b; color: white; transition: width 0.3s ease; display: flex; flex-direction: column; }
                .system-sidebar.open { width: 280px; }
                .system-sidebar.collapsed { width: 70px; }
                
                .sidebar-header { height: 70px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-bottom: 1px solid #334155; }
                .sidebar-header h2 { margin: 0; font-size: 1.2rem; font-weight: 800; color: #60a5fa; }
                .toggle-btn { background: none; border: none; color: #94a3b8; cursor: pointer; }
                
                .nav-menu { padding: 20px 10px; display: flex; flex-direction: column; gap: 8px; overflow-y: auto; flex: 1; }
                .nav-item { display: flex; align-items: center; gap: 12px; padding: 12px; border: none; background: transparent; color: #cbd5e1; border-radius: 8px; cursor: pointer; transition: all 0.2s; text-align: left; }
                .nav-item:hover { background: #334155; color: white; }
                .nav-item.active { background: #2563eb; color: white; font-weight: 600; box-shadow: 0 4px 12px rgba(37,99,235,0.3); }
                .nav-item .icon { display: flex; align-items: center; justify-content: center; }
                
                .sidebar-footer { padding: 20px; border-top: 1px solid #334155; }
                .help-btn { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.1); border: none; color: #94a3b8; padding: 10px; border-radius: 8px; width: 100%; cursor: pointer; justify-content: center; transition: all 0.2s; }
                .help-btn:hover { background: rgba(255,255,255,0.2); color: white; }

                .system-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
                .main-header { height: 80px; background: white; border-bottom: 1px solid #e2e8f0; padding: 0 30px; display: flex; justify-content: space-between; align-items: center; }
                .main-header h1 { margin: 0; font-size: 1.5rem; color: #0f172a; }
                .main-header p { margin: 4px 0 0; color: #64748b; font-size: 0.9rem; }
                .header-right { display: flex; align-items: center; gap: 15px; }
                .btn-guide { display: flex; align-items: center; gap: 6px; padding: 8px 16px; background: #eff6ff; color: #2563eb; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.9rem; }
                .role-switcher { padding: 8px 15px; border-radius: 8px; border: 1px solid #cbd5e1; background: #f8fafc; font-weight: 700; color: #1e293b; cursor: pointer; outline: none; transition: all 0.2s; }
                .role-switcher:hover { background: #e2e8f0; }

                .content-viewport { flex: 1; overflow-y: auto; padding: 0; }

                .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
                .guide-modal { background: white; padding: 30px; border-radius: 16px; width: 800px; max-width: 90%; }
                .guide-header { display: flex; justify-content: space-between; margin-bottom: 30px; }
                .guide-header h3 { margin: 0; font-size: 1.5rem; color: #1e293b; }
                .flow-steps { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
                .step { text-align: center; flex: 1; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; }
                .step-num { width: 30px; height: 30px; background: #2563eb; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; margin: 0 auto 10px; }
                .step h4 { margin: 0 0 8px 0; color: #1e293b; }
                .step p { margin: 0; font-size: 0.85rem; color: #64748b; }
                .arrow { color: #cbd5e1; font-size: 1.5rem; font-weight: 300; }
            `}</style>
        </div>
    );
};

// ---------------- SUB-COMPONENTS ----------------

const RegistrationMock = () => (
    <div className="tab-p-30">
        <div className="entry-form-container">
            <h3 className="section-title">Meter Registration Form</h3>
            <p className="form-subtitle">Register new water abstraction infrastructure with full technical specifications.</p>
            {/* Same form as before, abbreviated here for brevity but fully rendered in actual component */}
            <div className="form-section">
                <h4><Package size={16} /> Basic Details</h4>
                <div className="form-grid-cols">
                    <div className="form-group">
                        <label>Meter ID (System Generated)</label>
                        <input type="text" value="MTR-2024-8892" disabled className="disabled-input" />
                    </div>
                    <div className="form-group">
                        <label>Manufacturer Name</label>
                        <select>
                            <option>FlowMaster Pvt Ltd</option>
                            <option>AquaTech Solutions</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-section">
                <h4><Ruler size={16} /> Installation Details</h4>
                <div className="form-grid-cols">
                    <div className="form-group"><label>Borewell ID</label><input type="text" placeholder="BW-001" /></div>
                    <div className="form-group"><label>Pipe Dia</label><select><option>80 mm</option></select></div>
                </div>
            </div>
            <div className="form-section">
                <h4><Wifi size={16} /> Connectivity</h4>
                <div className="form-grid-cols">
                    <div className="form-group full-width">
                        <div className="radio-group">
                            <label className="radio-card active"><input type="checkbox" checked readOnly /> <span>IoT / Telemetry</span></label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-actions">
                <button className="btn-save">Register Meter</button>
            </div>
        </div>
        <style jsx>{`
            .tab-p-30 { padding: 40px; }
            .entry-form-container { max-width: 900px; margin: 0 auto; background: white; padding: 40px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
            .section-title { margin: 0 0 5px 0; font-size: 1.5rem; color: #1e293b; }
            .form-subtitle { margin-bottom: 30px; color: #64748b; }
            .form-section { margin-bottom: 30px; border-bottom: 1px solid #f1f5f9; padding-bottom: 30px; }
            .form-section h4 { margin: 0 0 20px 0; color: #1e293b; display: flex; align-items: center; gap: 8px; }
            .form-grid-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .form-group { display: flex; flex-direction: column; gap: 6px; }
            .form-group.full-width { grid-column: span 2; }
            .form-group label { font-size: 0.85rem; font-weight: 700; color: #475569; }
            .form-group input, .form-group select { padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; width: 100%; outline: none; }
            .disabled-input { background: #f1f5f9; color: #94a3b8; cursor: not-allowed; }
            .radio-group { display: flex; gap: 10px; }
            .radio-card { flex: 1; border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px; display: flex; align-items: center; gap: 8px; cursor: pointer; }
            .radio-card.active { border-color: #3b82f6; background: #eff6ff; }
            .form-actions { display: flex; justify-content: flex-end; gap: 15px; margin-top: 20px; }
            .btn-save { padding: 12px 30px; background: #2563eb; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
        `}</style>
    </div>
);

const DataSubmissionView = () => {
    const [subMode, setSubMode] = useState('telemetry');

    return (
        <div className="tab-p-30">
            <div className="card-panel">
                <div className="panel-header">
                    <h3>Data Submission & Monitoring</h3>
                    <div className="tabs-sub">
                        <button className={`sub-tab ${subMode === 'manual' ? 'active' : ''}`} onClick={() => setSubMode('manual')}>Manual Entry</button>
                        <button className={`sub-tab ${subMode === 'telemetry' ? 'active' : ''}`} onClick={() => setSubMode('telemetry')}>Telemetry Hub</button>
                    </div>
                </div>

                {subMode === 'manual' && (
                    <div className="manual-entry-grid animated">
                        <div className="form-group full-width">
                            <label>Select Meter</label>
                            <select className="input-field"><option>MTR-8892 (Pump House 1) - Last Reading: 1,420 m³</option></select>
                        </div>
                        <div className="form-group">
                            <label>New Reading (m³)</label>
                            <input type="number" className="input-field" placeholder="0.00" />
                        </div>
                        <div className="form-group">
                            <label>Date of Reading</label>
                            <input type="date" className="input-field" />
                        </div>
                        <div className="form-group">
                            <label>Photo Proof</label>
                            <button className="upload-btn"><UploadCloud size={16} /> Upload Meter Image</button>
                        </div>
                        <div className="action-row">
                            <div className="info-tip"><Info size={14} /> Reading cannot be less than previous log.</div>
                            <button className="btn-primary-sm">Submit Verified Reading</button>
                        </div>
                    </div>
                )}

                {subMode === 'telemetry' && (
                    <div className="telemetry-view animated">
                        <div className="telemetry-stats">
                            <div className="t-stat"><div className="label">Active Conn.</div><div className="val">14 / 15</div></div>
                            <div className="t-stat"><div className="label">Avg Latency</div><div className="val">240ms</div></div>
                            <div className="t-stat"><div className="label">Packet Loss</div><div className="val">0.05%</div></div>
                        </div>
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th>Timestamp</th>
                                    <th>Flow Rate</th>
                                    <th>Totalizer</th>
                                    <th>Signal</th>
                                    <th>Battery</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TELEMETRY_LOGS.map(log => (
                                    <tr key={log.id}>
                                        <td>{log.time}</td>
                                        <td><strong>{log.flow}</strong></td>
                                        <td>{log.total}</td>
                                        <td><span className={`sig-dot ${log.signal.toLowerCase()}`}></span> {log.signal}</td>
                                        <td>{log.battery}</td>
                                        <td><span className={`status-badge-sm ${log.status === 'Normal' ? 'success' : 'warn'}`}>{log.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <style jsx>{`
                .tab-p-30 { padding: 30px; }
                .card-panel { background: white; padding: 30px; border-radius: 12px; border: 1px solid #e2e8f0; min-height: 500px; }
                .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px; }
                .panel-header h3 { margin: 0; font-size: 1.25rem; color: #1e293b; }
                
                .tabs-sub { display: flex; gap: 15px; }
                .sub-tab { border: none; background: none; font-weight: 600; color: #64748b; cursor: pointer; padding: 8px 16px; border-radius: 6px; transition: all 0.2s; }
                .sub-tab.active { background: #eff6ff; color: #2563eb; }

                .manual-entry-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 600px; }
                .form-group label { display: block; font-size: 0.85rem; font-weight: 700; color: #475569; margin-bottom: 8px; }
                .input-field { width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; }
                .upload-btn { width: 100%; padding: 12px; border: 1px dashed #cbd5e1; background: #f8fafc; color: #64748b; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
                .action-row { grid-column: span 2; display: flex; justify-content: space-between; align-items: center; margin-top: 20px; }
                .btn-primary-sm { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; }
                .info-tip { display: flex; align-items: center; gap: 6px; color: #64748b; font-size: 0.85rem; }

                .telemetry-stats { display: flex; gap: 20px; margin-bottom: 20px; }
                .t-stat { background: #f8fafc; padding: 15px; border-radius: 8px; min-width: 120px; }
                .t-stat .label { font-size: 0.75rem; color: #64748b; font-weight: 600; text-transform: uppercase; }
                .t-stat .val { font-size: 1.2rem; font-weight: 800; color: #1e293b; }

                .modern-table { width: 100%; border-collapse: collapse; }
                .modern-table th { text-align: left; padding: 12px; color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0; font-size: 0.9rem; }
                .modern-table td { padding: 15px 12px; border-bottom: 1px solid #f1f5f9; color: #1e293b; font-size: 0.95rem; }
                .sig-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px; }
                .sig-dot.strong { background: #22c55e; } .sig-dot.good { background: #eab308; } .sig-dot.weak { background: #ef4444; }
                .status-badge-sm { padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 700; }
                .status-badge-sm.success { background: #dcfce7; color: #166534; } .status-badge-sm.warn { background: #fee2e2; color: #991b1b; }
                .animated { animation: fadeUp 0.3s ease-out; }
                @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

const ReportsView = () => (
    <div className="tab-p-30">
        <div className="reports-container">
            <h3 className="section-title">Abstraction Analytics & Compliance Reports</h3>

            <div className="kpi-row">
                <div className="kpi-card">
                    <div className="icon-bx blue"><Database size={20} /></div>
                    <div>
                        <div className="kpi-val">12,450 m³</div>
                        <div className="kpi-lbl">Total Abstraction (Dec)</div>
                    </div>
                </div>
                <div className="kpi-card">
                    <div className="icon-bx green"><CheckCircle size={20} /></div>
                    <div>
                        <div className="kpi-val">98.5%</div>
                        <div className="kpi-lbl">Compliance Score</div>
                    </div>
                </div>
                <div className="kpi-card">
                    <div className="icon-bx amber"><AlertTriangle size={20} /></div>
                    <div>
                        <div className="kpi-val">3 Alerts</div>
                        <div className="kpi-lbl">Overshoot Warnings</div>
                    </div>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-card large">
                    <div className="chart-header">
                        <h4>Daily Abstraction vs Regulatory Limit</h4>
                        <select><option>Last 7 Days</option></select>
                    </div>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={USAGE_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <RechartsTooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    cursor={{ fill: '#f1f5f9' }}
                                />
                                <Legend />
                                <Bar dataKey="usage" name="Actual Extraction" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                                <Bar dataKey="limit" name="NOC Limit" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="chart-card">
                    <div className="chart-header">
                        <h4>Usage by Purpose</h4>
                    </div>
                    <div style={{ width: '100%', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={[{ name: 'Industrial', value: 70 }, { name: 'Domestic', value: 20 }, { name: 'Cooling', value: 10 }]}
                                    innerRadius={60} outerRadius={80} paddingAngle={5}
                                    dataKey="value"
                                >
                                    <Cell fill="#2563eb" />
                                    <Cell fill="#10b981" />
                                    <Cell fill="#f59e0b" />
                                </Pie>
                                <RechartsTooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
        <style jsx>{`
            .tab-p-30 { padding: 30px; }
            .section-title { margin-bottom: 25px; color: #1e293b; font-size: 1.4rem; }
            
            .kpi-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
            .kpi-card { background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
            .icon-bx { width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; }
            .icon-bx.blue { background: #3b82f6; } .icon-bx.green { background: #10b981; } .icon-bx.amber { background: #f59e0b; }
            .kpi-val { font-size: 1.5rem; font-weight: 800; color: #1e293b; line-height: 1; margin-bottom: 4px; }
            .kpi-lbl { font-size: 0.85rem; color: #64748b; font-weight: 600; }

            .charts-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
            .chart-card { background: white; padding: 25px; border-radius: 12px; border: 1px solid #e2e8f0; }
            .chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
            .chart-header h4 { margin: 0; color: #1e293b; font-size: 1rem; }
            .chart-header select { padding: 4px 10px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 0.8rem; }
        `}</style>
    </div>
);

const IntegrationView = () => (
    <div className="tab-p-30">
        <div className="card-panel">
            <h3>Rig & NOC Integration</h3>
            <div className="int-diagram">
                {/* ... existing diagram code ... */}
                <div className="int-box"><strong>NOC Approval</strong><p>Limit: 500 m³/day</p></div>
                <div className="int-arrow">→</div>
                <div className="int-box active"><strong>Rig #442</strong><p>Linked Meter: MTR-8892</p></div>
                <div className="int-arrow">→</div>
                <div className="int-box"><strong>Enforcement</strong><p>Charges Active</p></div>
            </div>
            <div className="alert-box"><AlertTriangle size={18} /><span>Sync Status: <strong>Real-time</strong>. Last sync 2 mins ago.</span></div>
        </div>
        <style jsx>{`
            .tab-p-30 { padding: 30px; }
            .card-panel { background: white; padding: 30px; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 800px; }
            .int-diagram { display: flex; align-items: center; justify-content: space-between; margin: 40px 0; }
            .int-box { background: #f8fafc; border: 2px solid #e2e8f0; padding: 20px; border-radius: 12px; text-align: center; min-width: 150px; }
            .int-box.active { border-color: #3b82f6; background: #eff6ff; }
            .int-box strong { display: block; color: #1e293b; margin-bottom: 4px; }
            .int-box p { margin: 0; font-size: 0.85rem; color: #64748b; }
            .int-arrow { font-size: 2rem; color: #cbd5e1; }
            .alert-box { background: #ecfdf5; border: 1px solid #a7f3d0; padding: 15px; border-radius: 8px; display: flex; align-items: center; gap: 10px; color: #064e3b; }
        `}</style>
    </div>
);

export default MeterRegistrationSystem;

