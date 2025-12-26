import React, { useState } from 'react';
import { Wrench, MapPin, Camera, CheckSquare, Plus, Search, Filter, ArrowRight, ClipboardList, ShieldCheck, Activity, Smartphone } from 'lucide-react';

/* ... imports ... */

const MeterInstallation = () => {
    const [activeTab, setActiveTab] = useState('desk');
    const [installations] = useState([
        { id: 'INST-9901', appNo: 'RGWA-APP-1209', rigId: 'RIG-004', serialNo: 'SN-77882', site: 'Phase 3, Industrial Area', date: '2024-12-20', status: 'Pending Verification' },
        { id: 'INST-9884', appNo: 'RGWA-APP-1150', rigId: 'RIG-012', serialNo: 'SN-44102', site: 'Sector 12, Green Park', date: '2024-12-18', status: 'Verified' },
    ]);

    return (
        <div className="meter-installation-v2">
            <div className="page-header">
                <div className="title-area">
                    <h1>Installation Command Center</h1>
                    <p>Field deployment management and geo-tagged evidence synchronization</p>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary-v2">View Work Orders</button>
                    <button className="btn-primary-v2" onClick={() => setActiveTab('wizard')}>
                        <Plus size={18} /> New Installation
                    </button>
                </div>
            </div>

            <div className="tabs-container">
                <div className="tabs-list">
                    <button className={`tab-btn ${activeTab === 'desk' ? 'active' : ''}`} onClick={() => setActiveTab('desk')}>
                        <ClipboardList size={16} /> Installation Desk
                    </button>
                    <button className={`tab-btn ${activeTab === 'wizard' ? 'active' : ''}`} onClick={() => setActiveTab('wizard')}>
                        <Wrench size={16} /> Work Order Wizard
                    </button>
                    <button className={`tab-btn ${activeTab === 'evidence' ? 'active' : ''}`} onClick={() => setActiveTab('evidence')}>
                        <Camera size={16} /> Evidence & Sealing
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'desk' && (
                        <div className="tab-pane active animated">
                            <div className="desk-controls">
                                <div className="search-bar">
                                    <Search size={18} />
                                    <input type="text" placeholder="Search by Application No or Serial..." />
                                </div>
                                <div className="filter-group">
                                    <button className="btn-filter"><Filter size={16} /> Status: All</button>
                                </div>
                            </div>

                            <div className="installation-table-box">
                                <table className="modern-table">
                                    <thead>
                                        <tr>
                                            <th>Deployment ID</th>
                                            <th>Target Rig / Borewell</th>
                                            <th>Asset Identity</th>
                                            <th>Location Detail</th>
                                            <th>Timeline</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {installations.map(inst => (
                                            <tr key={inst.id}>
                                                <td>
                                                    <div className="inst-id-col">
                                                        <strong>{inst.id}</strong>
                                                        <span>App: {inst.appNo}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="rig-badge">
                                                        <Activity size={14} /> {inst.rigId}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="asset-col">
                                                        <Smartphone size={14} className="text-blue-500" />
                                                        <span>{inst.serialNo}</span>
                                                    </div>
                                                </td>
                                                <td>{inst.site}</td>
                                                <td>{inst.date}</td>
                                                <td>
                                                    <span className={`status-pill ${inst.status.toLowerCase().replace(' ', '-')}`}>
                                                        {inst.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button className="btn-icon-v2"><ArrowRight size={18} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'wizard' && (
                        <div className="tab-pane active animated">
                            <div className="wizard-container">
                                <div className="wizard-header">
                                    <h2>Deployment Configuration</h2>
                                    <p>Step 1 of 4: Linking Device to Extraction Point</p>
                                </div>
                                <div className="wizard-form">
                                    <div className="form-group-v2">
                                        <label>Application Reference Number *</label>
                                        <div className="input-with-search">
                                            <input type="text" placeholder="RGWA-APP-XXXXX" />
                                            <button className="btn-verify">Fetch App</button>
                                        </div>
                                    </div>

                                    <div className="form-group-v2">
                                        <label>Select Target Rig / Borewell *</label>
                                        <select>
                                            <option value="">-- Select Active Rig --</option>
                                            <option value="RIG-001">RIG-001 (North East Corner)</option>
                                            <option value="RIG-002">RIG-002 (Main Plant Supply)</option>
                                        </select>
                                        <small className="field-hint">Only functional rigs listed in the NOC are shown.</small>
                                    </div>

                                    <div className="form-group-v2">
                                        <label>Meter Serial Number (from Inventory) *</label>
                                        <select>
                                            <option>Select an available unit...</option>
                                            <option>SN-88290-2024 (FlowMaster)</option>
                                        </select>
                                    </div>
                                    <div className="wizard-actions">
                                        <button className="btn-next">Proceed to Site Geofencing <ArrowRight size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'evidence' && (
                        <div className="tab-pane active animated">
                            <div className="evidence-portal">
                                <div className="evidence-requirements">
                                    <Camera size={32} className="text-blue-600" />
                                    <h3>Mandatory Visual Evidence</h3>
                                    <p>The following photos must be captured via the RGWA Inspector App (Mobile) for verification.</p>
                                </div>
                                <div className="req-checklist">
                                    <div className="check-item">
                                        <CheckSquare size={18} className="text-green-500" />
                                        <div className="check-text">
                                            <strong>Site Wide Angle</strong>
                                            <span>Shows the meter in the context of the well/pump house</span>
                                        </div>
                                    </div>
                                    <div className="check-item">
                                        <CheckSquare size={18} className="text-green-500" />
                                        <div className="check-text">
                                            <strong>Lead Seal Detail</strong>
                                            <span>High-resolution close-up of the intact regulatory seal</span>
                                        </div>
                                    </div>
                                    <div className="check-item">
                                        <CheckSquare size={18} className="text-green-500" />
                                        <div className="check-text">
                                            <strong>Final Reading (Initial)</strong>
                                            <span>Clear shot of the meter face showing zero or initial volume</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="compliance-banner">
                                    <ShieldCheck size={18} />
                                    <span>All photos are automatically watermarked with GPS coordinates and Server Timestamp.</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .meter-installation-v2 { padding: 30px; background: #f8fafc; min-height: 100vh; }
                .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
                .title-area h1 { font-size: 2rem; color: #1e293b; margin: 0; font-weight: 800; }
                .title-area p { color: #64748b; margin: 4px 0 0; font-size: 1rem; }

                .header-actions { display: flex; gap: 12px; }
                .btn-primary-v2 { padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 10px; font-weight: 700; display: flex; align-items: center; gap: 8px; cursor: pointer; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2); }
                .btn-secondary-v2 { padding: 10px 20px; background: white; border: 1px solid #e2e8f0; color: #475569; border-radius: 10px; font-weight: 700; display: flex; align-items: center; gap: 8px; cursor: pointer; }

                .tabs-container { background: white; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
                .tabs-list { display: flex; background: #f1f5f9; padding: 6px; gap: 4px; border-radius: 16px 16px 0 0; }
                .tab-btn { flex: 1; padding: 12px; border: none; background: transparent; border-radius: 10px; font-weight: 700; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; }
                .tab-btn:hover { background: #e2e8f0; color: #1e293b; }
                .tab-btn.active { background: white; color: #2563eb; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }

                .tab-content { padding: 30px; }

                .desk-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
                .search-bar { display: flex; align-items: center; gap: 12px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 18px; border-radius: 12px; width: 350px; }
                .search-bar input { border: none; background: transparent; outline: none; width: 100%; font-size: 0.95rem; color: #1e293b; }
                
                .btn-filter { padding: 8px 15px; border-radius: 10px; border: 1px solid #e2e8f0; background: white; color: #475569; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; }

                .modern-table { width: 100%; border-collapse: collapse; }
                .modern-table th { text-align: left; padding: 15px; background: #f8fafc; color: #64748b; font-size: 0.8rem; text-transform: uppercase; font-weight: 800; border-bottom: 1px solid #f1f5f9; }
                .modern-table td { padding: 15px; border-bottom: 1px solid #f1f5f9; font-size: 0.95rem; color: #475569; }

                .inst-id-col { display: flex; flex-direction: column; }
                .inst-id-col strong { color: #1e40af; }
                .inst-id-col span { font-size: 0.8rem; color: #94a3b8; font-weight: 600; }

                .rig-badge { display: inline-flex; align-items: center; gap: 6px; background: #f1f5f9; padding: 4px 8px; border-radius: 6px; font-family: monospace; font-size: 0.8rem; font-weight: 700; color: #334155; }

                .asset-col { display: flex; align-items: center; gap: 8px; color: #1e293b; font-weight: 600; }
                
                .status-pill { padding: 4px 10px; border-radius: 5px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
                .status-pill.pending-verification { background: #fffbeb; color: #9a3412; }
                .status-pill.verified { background: #dcfce7; color: #166534; }

                .btn-icon-v2 { width: 32px; height: 32px; border: none; background: #f1f5f9; color: #2563eb; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
                .btn-icon-v2:hover { background: #2563eb; color: white; }

                .wizard-container { max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 30px; border-radius: 20px; border: 1px solid #e2e8f0; }
                .wizard-header { text-align: center; margin-bottom: 30px; }
                .wizard-header h2 { font-size: 1.5rem; color: #1e293b; margin: 0; }
                .wizard-header p { color: #64748b; font-size: 0.95rem; }

                .form-group-v2 { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
                .form-group-v2 label { font-size: 0.85rem; font-weight: 700; color: #475569; }
                .form-group-v2 input, .form-group-v2 select { padding: 12px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 1rem; outline: none; }
                .field-hint { font-size: 0.8rem; color: #64748b; margin-top: 4px; }
                
                .input-with-search { display: flex; gap: 10px; }
                .input-with-search input { flex: 1; }
                .btn-verify { padding: 0 15px; background: #1e293b; color: white; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; }

                .btn-next { width: 100%; padding: 15px; background: #2563eb; color: white; border: none; border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2); }

                .evidence-portal { max-width: 600px; margin: 0 auto; text-align: center; }
                .evidence-requirements h3 { font-size: 1.5rem; color: #1e293b; margin: 15px 0 5px; }
                .evidence-requirements p { color: #64748b; margin-bottom: 30px; }

                .req-checklist { text-align: left; display: flex; flex-direction: column; gap: 15px; margin-bottom: 30px; }
                .check-item { display: flex; gap: 15px; background: white; padding: 15px; border-radius: 12px; border: 1px solid #e2e8f0; }
                .check-text strong { display: block; color: #1e293b; }
                .check-text span { font-size: 0.85rem; color: #64748b; }

                .compliance-banner { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 12px; background: #eff6ff; color: #2563eb; border-radius: 10px; font-size: 0.85rem; font-weight: 600; }

                .animated { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default MeterInstallation;
