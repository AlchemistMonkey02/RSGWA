import React, { useState } from 'react';
import { ClipboardList, CheckCircle, XCircle, Camera, MapPin, Search, Filter, ArrowRight, History, ShieldCheck, Activity, Smartphone, Info } from 'lucide-react';

const MeterVerification = ({ meters = [], onVerify }) => {
    const [activeTab, setActiveTab] = useState('queue');
    const [selectedInstallation, setSelectedInstallation] = useState(null);

    const pendingAudits = meters.filter(m => m.status === 'Installed');

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
                                            <button className="btn-approve" onClick={() => {
                                                onVerify(selectedInstallation.id);
                                                setSelectedInstallation(null);
                                                setActiveTab('queue');
                                            }}><CheckCircle size={16} /> Approve & Activate</button>
                                            <button className="btn-reject" onClick={() => setSelectedInstallation(null)}><XCircle size={16} /> Reject Installation</button>
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
                .meter-verification-v2 { padding: 0; background: transparent; }
                .page-header { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    margin-bottom: 35px; 
                    background: white; 
                    padding: 24px 30px; 
                    border-radius: 20px; 
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
                }
                .title-area h1 { font-size: 1.75rem; color: #0f172a; margin: 0; font-weight: 800; }
                .title-area p { color: #64748b; margin: 4px 0 0; font-size: 1rem; font-weight: 500; }

                .header-actions { display: flex; gap: 20px; align-items: center; }
                .btn-secondary-v2 { 
                    padding: 10px 20px; 
                    background: white; 
                    border: 1.5px solid #e2e8f0; 
                    color: #475569; 
                    border-radius: 12px; 
                    font-weight: 700; 
                    display: flex; 
                    align-items: center; 
                    gap: 10px; 
                    cursor: pointer; 
                    transition: all 0.2s;
                    font-size: 0.85rem;
                }
                .btn-secondary-v2:hover { border-color: #3b82f6; color: #2563eb; }
                
                .verification-stats { border-left: 2px solid #f1f5f9; padding-left: 20px; }
                .v-stat strong { display: block; font-size: 1.75rem; color: #2563eb; line-height: 1.1; font-weight: 800; }
                .v-stat span { font-size: 0.7rem; color: #94a3b8; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }

                .tabs-container { background: white; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }
                .tabs-list { display: flex; background: #f8fafc; padding: 10px; gap: 8px; border-bottom: 1px solid #f1f5f9; }
                .tab-btn { flex: 1; padding: 14px; border: none; background: transparent; border-radius: 14px; font-weight: 800; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.2s; font-size: 0.9rem; }
                .tab-btn:hover { background: #f1f5f9; color: #1e293b; }
                .tab-btn.active { background: white; color: #2563eb; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1); border: 1px solid #e2e8f0; }

                .tab-content { padding: 40px; }

                .queue-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                .search-bar { display: flex; align-items: center; gap: 12px; background: #f8fafc; border: 1.5px solid #e2e8f0; padding: 10px 20px; border-radius: 14px; width: 400px; transition: border-color 0.2s; }
                .search-bar:focus-within { border-color: #3b82f6; }
                .search-bar input { border: none; background: transparent; outline: none; width: 100%; font-size: 0.95rem; font-weight: 500; }

                .audit-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; }
                .audit-card { 
                    background: white; 
                    border: 1px solid #e2e8f0; 
                    border-radius: 20px; 
                    padding: 24px; 
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
                }
                .audit-card:hover { transform: translateY(-4px); border-color: #3b82f6; box-shadow: 0 12px 20px -5px rgba(0,0,0,0.08); }
                
                .audit-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
                .type-tag { display: block; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: #3b82f6; margin-bottom: 4px; letter-spacing: 0.5px; }
                .audit-id strong { color: #0f172a; font-size: 1.2rem; font-weight: 800; }
                
                .status-pill { padding: 4px 12px; border-radius: 8px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
                .status-pill.pending { background: #fffcf0; color: #d97706; border: 1px solid #fef3c7; }
                .status-pill.installed { background: #f0fdf4; color: #166534; border: 1px solid #dcfce7; }

                .audit-info { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; padding: 16px; background: #f8fafc; border-radius: 16px; border: 1px solid #f1f5f9; }
                .info-item { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; color: #475569; font-weight: 500; }

                .btn-process { 
                    width: 100%; 
                    padding: 12px; 
                    background: #0f172a; 
                    color: white; 
                    border: none; 
                    border-radius: 12px; 
                    font-weight: 800; 
                    cursor: pointer; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    gap: 10px; 
                    transition: all 0.2s;
                    font-size: 0.9rem;
                }
                .btn-process:hover { background: #1e293b; transform: scale(1.02); }

                .audit-workspace { display: grid; grid-template-columns: 1fr 380px; gap: 40px; }
                .main-photo-frame { aspect-ratio: 16/10; background: #0f172a; border-radius: 20px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
                .photo-placeholder { color: #94a3b8; display: flex; flex-direction: column; align-items: center; gap: 16px; }
                .geo-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); color: white; padding: 15px 20px; font-size: 0.75rem; display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace; font-weight: 600; }
                
                .photo-thumbnails { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 20px; }
                .thumb { height: 70px; background: #f1f5f9; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800; color: #64748b; cursor: pointer; border: 2px solid transparent; transition: all 0.2s; text-transform: uppercase; }
                .thumb:hover { border-color: #cbd5e1; }
                .thumb.active { border-color: #2563eb; background: #eff6ff; color: #2563eb; }

                .audit-checklist-side h3 { margin: 0 0 24px 0; color: #0f172a; font-size: 1.25rem; font-weight: 800; }
                .checklist-items { display: flex; flex-direction: column; gap: 16px; margin-bottom: 35px; }
                .check-row { display: flex; align-items: center; gap: 16px; padding: 16px 20px; background: #f8fafc; border-radius: 16px; cursor: pointer; border: 1.5px solid #f1f5f9; transition: all 0.2s; }
                .check-row:hover { border-color: #e2e8f0; background: white; }
                .check-row input { width: 18px; height: 18px; border-radius: 6px; cursor: pointer; }
                .check-row span { font-size: 0.95rem; color: #334155; line-height: 1.4; font-weight: 500; }

                .audit-final-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .btn-approve { padding: 14px; background: #059669; color: white; border: none; border-radius: 14px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.2s; }
                .btn-approve:hover { background: #047857; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3); }
                .btn-reject { padding: 14px; background: white; color: #dc2626; border: 2px solid #fee2e2; border-radius: 14px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.2s; }
                .btn-reject:hover { background: #fff1f2; border-color: #fecaca; }

                .empty-selection { text-align: center; padding: 80px 40px; color: #94a3b8; background: #f8fafc; border-radius: 24px; border: 2px dashed #e2e8f0; }
                .empty-selection h3 { color: #1e293b; margin: 24px 0 8px; font-weight: 800; font-size: 1.5rem; }
                .empty-selection p { font-size: 1rem; font-weight: 500; margin-bottom: 24px; }

                .placeholder-content { text-align: center; padding: 100px; color: #94a3b8; }
                .placeholder-content h3 { color: #1e293b; margin-top: 24px; font-weight: 800; }

                .animated { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default MeterVerification;
