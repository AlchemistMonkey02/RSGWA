import React, { useState } from 'react';
import { ClipboardList, CheckCircle, XCircle, Camera, MapPin, Search, Filter, ArrowRight, History, ShieldCheck, Activity, Smartphone, Info } from 'lucide-react';

const MeterVerification = () => {
    const [activeTab, setActiveTab] = useState('queue');
    const [selectedInstallation, setSelectedInstallation] = useState(null);
    const [pendingAudits] = useState([
        { id: 'AUD-5501', appNo: 'RGWA-APP-1209', serialNo: 'SN-77882', vendor: 'FlowMaster', site: 'Phase 3, Industrial Area', date: '2024-12-21', status: 'Pending', type: 'Initial' },
        { id: 'AUD-5492', appNo: 'RGWA-APP-1188', serialNo: 'SN-99042', vendor: 'AquaTech', site: 'Sector 4, Rohini', date: '2024-12-20', status: 'In Review', type: 'Maintenance' },
    ]);

    const handleProcessAudit = (audit) => {
        setSelectedInstallation(audit);
        setActiveTab('panel');
    };

    return (
        <div className="meter-verification-v2">
            <div className="page-header">
                <div className="title-area">
                    <h1>Officer Audit Console</h1>
                    <p>Formal verification and field evidence scrutiny for meter activation</p>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary-v2"><History size={16} /> Audit Logs</button>
                    <div className="verification-stats">
                        <div className="v-stat">
                            <strong>12</strong>
                            <span>Pending Audits</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tabs-container">
                <div className="tabs-list">
                    <button className={`tab-btn ${activeTab === 'queue' ? 'active' : ''}`} onClick={() => setActiveTab('queue')}>
                        <ClipboardList size={16} /> Audit Queue
                    </button>
                    <button className={`tab-btn ${activeTab === 'panel' ? 'active' : ''}`} onClick={() => setActiveTab('panel')}>
                        <ShieldCheck size={16} /> Tech Audit Panel
                    </button>
                    <button className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
                        <History size={16} /> Audit History
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'queue' && (
                        <div className="tab-pane active animated">
                            <div className="queue-controls">
                                <div className="search-bar">
                                    <Search size={18} />
                                    <input type="text" placeholder="Search by App No, Serial or Site..." />
                                </div>
                                <div className="filter-group">
                                    <button className="btn-filter"><Filter size={16} /> Priority: High</button>
                                </div>
                            </div>

                            <div className="audit-grid">
                                {pendingAudits.map(audit => (
                                    <div key={audit.id} className="audit-card">
                                        <div className="audit-header">
                                            <div className="audit-id">
                                                <span className="type-tag">{audit.type} Audit</span>
                                                <strong>{audit.id}</strong>
                                            </div>
                                            <span className={`status-pill ${audit.status.toLowerCase().replace(' ', '-')}`}>{audit.status}</span>
                                        </div>
                                        <div className="audit-info">
                                            <div className="info-item">
                                                <Smartphone size={14} />
                                                <span>{audit.serialNo} ({audit.vendor})</span>
                                            </div>
                                            <div className="info-item">
                                                <MapPin size={14} />
                                                <span>{audit.site}</span>
                                            </div>
                                            <div className="info-item">
                                                <ClipboardList size={14} />
                                                <span>App: {audit.appNo}</span>
                                            </div>
                                        </div>
                                        <div className="audit-actions">
                                            <button className="btn-process" onClick={() => handleProcessAudit(audit)}>
                                                Process Audit <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'panel' && (
                        <div className="tab-pane active animated">
                            {selectedInstallation ? (
                                <div className="audit-workspace">
                                    <div className="evidence-viewer">
                                        <div className="main-photo-frame">
                                            <div className="photo-placeholder">
                                                <Camera size={48} />
                                                <span>Geo-tagged Installation Photo</span>
                                                <div className="geo-overlay">
                                                    <span>Lat: 26.9124 | Lng: 75.7873</span>
                                                    <span>TS: 2024-12-21 14:22:10</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="photo-thumbnails">
                                            <div className="thumb active">Seal</div>
                                            <div className="thumb">Inlet</div>
                                            <div className="thumb">Outlet</div>
                                            <div className="thumb">Site</div>
                                        </div>
                                    </div>
                                    <div className="audit-checklist-side">
                                        <h3>Regulatory Checklist</h3>
                                        <div className="checklist-items">
                                            <label className="check-row">
                                                <input type="checkbox" />
                                                <span>Meter Model matches Approved Registry</span>
                                            </label>
                                            <label className="check-row">
                                                <input type="checkbox" />
                                                <span>Lead Seal matches Serial Record</span>
                                            </label>
                                            <label className="check-row">
                                                <input type="checkbox" />
                                                <span>GPS Coordinates match NOC application</span>
                                            </label>
                                            <label className="check-row">
                                                <input type="checkbox" />
                                                <span>No visible bypass/looping observed</span>
                                            </label>
                                        </div>
                                        <div className="audit-final-actions">
                                            <button className="btn-approve"><CheckCircle size={16} /> Approve & Activate</button>
                                            <button className="btn-reject"><XCircle size={16} /> Reject Installation</button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="empty-selection">
                                    <Info size={48} />
                                    <h3>No Installation Selected</h3>
                                    <p>Please select an installation from the Audit Queue to begin verification.</p>
                                    <button className="btn-secondary-v2" onClick={() => setActiveTab('queue')}>Back to Queue</button>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="tab-pane active animated">
                            <div className="placeholder-content">
                                <History size={32} />
                                <h3>Post-Deployment Inspection Logs</h3>
                                <p>Archive of all verified installations and retrospective audit logs.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .meter-verification-v2 { padding: 30px; background: #f8fafc; min-height: 100vh; }
                .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
                .title-area h1 { font-size: 2rem; color: #1e293b; margin: 0; font-weight: 800; }
                .title-area p { color: #64748b; margin: 4px 0 0; font-size: 1rem; }

                .header-actions { display: flex; gap: 20px; align-items: center; }
                .btn-secondary-v2 { padding: 10px 20px; background: white; border: 1px solid #e2e8f0; color: #475569; border-radius: 10px; font-weight: 700; display: flex; align-items: center; gap: 8px; cursor: pointer; }
                
                .verification-stats { border-left: 2px solid #e2e8f0; padding-left: 20px; }
                .v-stat strong { display: block; font-size: 1.5rem; color: #2563eb; line-height: 1; }
                .v-stat span { font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase; }

                .tabs-container { background: white; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
                .tabs-list { display: flex; background: #f1f5f9; padding: 6px; gap: 4px; border-radius: 16px 16px 0 0; }
                .tab-btn { flex: 1; padding: 12px; border: none; background: transparent; border-radius: 10px; font-weight: 700; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; }
                .tab-btn:hover { background: #e2e8f0; color: #1e293b; }
                .tab-btn.active { background: white; color: #2563eb; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }

                .tab-content { padding: 30px; }

                .queue-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
                .search-bar { display: flex; align-items: center; gap: 12px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 18px; border-radius: 12px; width: 350px; }
                .search-bar input { border: none; background: transparent; outline: none; width: 100%; font-size: 0.95rem; }

                .audit-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
                .audit-card { background: white; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; transition: all 0.2s; }
                .audit-card:hover { transform: translateY(-3px); border-color: #2563eb; }
                
                .audit-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; }
                .type-tag { display: block; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: #2563eb; margin-bottom: 2px; }
                .audit-id strong { color: #1e293b; font-size: 1.1rem; }
                
                .status-pill { padding: 3px 10px; border-radius: 5px; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; }
                .status-pill.pending { background: #fffbeb; color: #9a3412; }
                .status-pill.in-review { background: #eff6ff; color: #2563eb; }

                .audit-info { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; padding: 12px; background: #f8fafc; border-radius: 10px; }
                .info-item { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #475569; }

                .btn-process { width: 100%; padding: 10px; background: #1e293b; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }

                .audit-workspace { display: grid; grid-template-columns: 1fr 350px; gap: 30px; }
                .main-photo-frame { aspect-ratio: 16/9; background: #1e293b; border-radius: 12px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
                .photo-placeholder { color: #475569; display: flex; flex-direction: column; align-items: center; gap: 10px; }
                .geo-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.6); color: white; padding: 10px; font-size: 0.75rem; display: flex; justify-content: space-between; font-family: monospace; }
                
                .photo-thumbnails { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 15px; }
                .thumb { height: 60px; background: #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; color: #475569; cursor: pointer; border: 2px solid transparent; }
                .thumb.active { border-color: #2563eb; background: #eff6ff; }

                .audit-checklist-side h3 { margin: 0 0 20px 0; color: #1e293b; font-size: 1.1rem; }
                .checklist-items { display: flex; flex-direction: column; gap: 12px; margin-bottom: 30px; }
                .check-row { display: flex; align-items: flex-start; gap: 12px; padding: 12px; background: #f8fafc; border-radius: 10px; cursor: pointer; }
                .check-row input { margin-top: 3px; }
                .check-row span { font-size: 0.9rem; color: #475569; line-height: 1.4; }

                .audit-final-actions { display: grid; gap: 10px; }
                .btn-approve { padding: 12px; background: #16a34a; color: white; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
                .btn-reject { padding: 12px; background: white; color: #dc2626; border: 1px solid #dc2626; border-radius: 10px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }

                .empty-selection { text-align: center; padding: 60px; color: #94a3b8; }
                .empty-selection h3 { color: #475569; margin: 15px 0 5px; }

                .placeholder-content { text-align: center; padding: 80px; color: #94a3b8; }

                .animated { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default MeterVerification;
