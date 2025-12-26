import React, { useState } from 'react';
import { UserCheck, MapPin, Camera, Clipboard, ShieldCheck, Search, Plus, X, Upload, FileCheck, Award, Briefcase } from 'lucide-react';

const InstallerCertification = () => {
    const [selectedInstaller, setSelectedInstaller] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const installers = [
        {
            id: 1,
            name: 'Rahul Sharma',
            region: 'Jaipur',
            cert: 'RGWA-INS-4421',
            rating: '4.8',
            activeJobs: 3,
            status: 'Certified',
            expiry: '2025-12-31',
            company: 'AquaFix Solutions',
            proofs: 124
        },
        {
            id: 2,
            name: 'Amit Verma',
            region: 'Ajmer',
            cert: 'RGWA-INS-3902',
            rating: '4.5',
            activeJobs: 1,
            status: 'Pending Renewal',
            expiry: '2024-12-15',
            company: 'Independent',
            proofs: 85
        },
    ];

    const InstallerProfileModal = ({ installer, onClose }) => (
        <div className="modal-overlay">
            <div className="modal-content-lg">
                <button className="close-btn" onClick={onClose}><X size={20} /></button>
                <div className="profile-header">
                    <div className="ph-avatar">
                        <UserCheck size={40} />
                    </div>
                    <div className="ph-info">
                        <h2>{installer.name}</h2>
                        <div className="ph-meta">
                            <span className="badge-cert">{installer.cert}</span>
                            <span className={`badge-status ${installer.status.toLowerCase().replace(' ', '-')}`}>{installer.status}</span>
                        </div>
                    </div>
                    <div className="ph-stats">
                        <div className="stat-box">
                            <strong>{installer.rating}</strong>
                            <span>Rating</span>
                        </div>
                        <div className="stat-box">
                            <strong>{installer.proofs}</strong>
                            <span>Verified Installs</span>
                        </div>
                    </div>
                </div>

                <div className="profile-body">
                    <div className="pb-section">
                        <h3><Award size={18} /> Certification Details</h3>
                        <div className="grid-2">
                            <div className="field-group">
                                <label>License Expiry</label>
                                <p>{installer.expiry}</p>
                            </div>
                            <div className="field-group">
                                <label>Authorized Company</label>
                                <p>{installer.company}</p>
                            </div>
                            <div className="field-group full">
                                <label>Certificates</label>
                                <div className="file-list">
                                    <div className="file-row">
                                        <FileCheck size={16} className="text-green-500" />
                                        <span>ISO_9001_Training.pdf</span>
                                        <button className="btn-link">View</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pb-section">
                        <h3><Camera size={18} /> Recent Geo-Tagged Proofs</h3>
                        <div className="photo-grid">
                            <div className="proof-thumb"><div className="mock-img">Site 1</div></div>
                            <div className="proof-thumb"><div className="mock-img">Site 2</div></div>
                            <div className="proof-thumb"><div className="mock-img">Site 3</div></div>
                        </div>
                    </div>

                    <div className="pb-section">
                        <h3><Briefcase size={18} /> Workload</h3>
                        <div className="job-card">
                            <div className="jc-header">
                                <strong>Installation at Site #442</strong>
                                <span className="status-tag active">In Progress</span>
                            </div>
                            <p>Sector 4, Malviya Nagar, Jaipur</p>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>Close</button>
                    <button className="btn-primary">Renew Certification</button>
                    <button className="btn-danger">Suspend License</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="module-container">
            <header className="module-header">
                <div>
                    <h1>Authorized Installer Network</h1>
                    <p>Verify and manage certified field technicians responsible for meter installation and sealing.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    <Plus size={18} /> Add New Installer
                </button>
            </header>

            <div className="stats-row">
                <div className="s-card">
                    <span className="s-label">Certified Installers</span>
                    <span className="s-value">24</span>
                </div>
                <div className="s-card">
                    <span className="s-label">Active Field Jobs</span>
                    <span className="s-value">12</span>
                </div>
                <div className="s-card">
                    <span className="s-label">Certification Renewals</span>
                    <span className="s-value warning">5 Pending</span>
                </div>
            </div>

            <div className="installer-list">
                <div className="list-toolbar">
                    <div className="search-bar">
                        <Search size={18} />
                        <input type="text" placeholder="Search installers by name or certification ID..." />
                    </div>
                </div>

                <div className="grid-view">
                    {installers.map(i => (
                        <div key={i.id} className="installer-card" onClick={() => setSelectedInstaller(i)}>
                            <div className="i-header">
                                <div className="i-avatar">
                                    <UserCheck size={24} />
                                </div>
                                <div className="i-title">
                                    <h3>{i.name}</h3>
                                    <span>{i.cert}</span>
                                </div>
                                <span className="i-rating">⭐ {i.rating}</span>
                            </div>

                            <div className="i-body">
                                <div className="i-meta">
                                    <MapPin size={14} />
                                    <span>{i.region} District</span>
                                </div>
                                <div className="i-meta">
                                    <Clipboard size={14} />
                                    <span>{i.activeJobs} Active Installations</span>
                                </div>
                                <div className="i-status-row">
                                    <span className={`status-pill ${i.status.toLowerCase().replace(' ', '-')}`}>{i.status}</span>
                                </div>
                            </div>

                            <div className="i-footer">
                                <button className="btn-secondary">View Profile</button>
                                <button className="btn-primary-sm" onClick={(e) => { e.stopPropagation(); alert('Assign Job Flow'); }}>Assign Job</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedInstaller && <InstallerProfileModal installer={selectedInstaller} onClose={() => setSelectedInstaller(null)} />}

            <style jsx>{`
                .module-container { padding: 25px; background: #f8fafc; min-height: 100vh; font-family: 'Inter', sans-serif; }
                .module-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
                .module-header h1 { font-size: 1.75rem; color: #1e293b; margin: 0; font-weight: 800; }
                .module-header p { color: #64748b; font-size: 0.95rem; margin: 5px 0 0; }

                .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
                .s-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-bottom: 3px solid #e2e8f0; }
                .s-label { display: block; font-size: 0.8rem; color: #64748b; font-weight: 600; margin-bottom: 5px; }
                .s-value { font-size: 1.5rem; font-weight: 800; color: #1e293b; }
                .s-value.warning { color: #f59e0b; }

                .installer-list { background: white; padding: 25px; border-radius: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
                .search-bar { display: flex; align-items: center; gap: 10px; background: #f8fafc; padding: 10px 15px; border-radius: 8px; border: 1px solid #e2e8f0; max-width: 400px; margin-bottom: 20px; }
                .search-bar input { background: none; border: none; outline: none; width: 100%; font-size: 0.9rem; }

                .grid-view { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 25px; }
                .installer-card { border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; transition: transform 0.2s; cursor: pointer; background: white; }
                .installer-card:hover { transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); border-color: #3b82f6; }

                .i-header { display: flex; align-items: center; gap: 12px; margin-bottom: 15px; }
                .i-avatar { width: 50px; height: 50px; border-radius: 50%; background: #eff6ff; color: #3b82f6; display: flex; align-items: center; justify-content: center; }
                .i-title h3 { font-size: 1.1rem; margin: 0; color: #1e293b; font-weight: 700; }
                .i-title span { font-size: 0.8rem; color: #64748b; font-weight: 600; }
                .i-rating { margin-left: auto; font-size: 0.9rem; font-weight: 700; color: #f59e0b; }

                .i-body { margin-bottom: 20px; display: flex; flex-direction: column; gap: 8px; }
                .i-meta { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #475569; }
                
                .status-pill { display: inline-block; padding: 4px 10px; border-radius: 99px; font-size: 0.75rem; font-weight: 700; }
                .status-pill.certified { background: #dcfce7; color: #166534; }
                .status-pill.pending-renewal { background: #fee2e2; color: #991b1b; }

                .i-footer { display: flex; gap: 10px; border-top: 1px solid #f1f5f9; pt: 15px; }
                .btn-secondary { flex: 1; padding: 10px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; font-size: 0.85rem; font-weight: 600; cursor: pointer; color: #475569; }
                .btn-primary-sm { flex: 1; padding: 10px; border-radius: 8px; background: #2563eb; color: white; border: none; font-size: 0.85rem; font-weight: 600; cursor: pointer; }
                .btn-primary { background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer; }

                /* Modal Styles */
                .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
                .modal-content-lg { background: white; width: 600px; max-height: 90vh; border-radius: 16px; padding: 30px; position: relative; overflow-y: auto; }
                .close-btn { position: absolute; top: 20px; right: 20px; background: none; border: none; cursor: pointer; color: #94a3b8; }
                
                .profile-header { display: flex; align-items: center; gap: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 20px; }
                .ph-avatar { width: 80px; height: 80px; background: #eff6ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #3b82f6; }
                .ph-info h2 { margin: 0 0 5px 0; font-size: 1.5rem; color: #1e293b; }
                .ph-meta { display: flex; gap: 10px; }
                .badge-cert { font-family: monospace; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem; }
                .badge-status.certified { color: #166534; background: #dcfce7; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; }
                .badge-status.pending-renewal { color: #991b1b; background: #fee2e2; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; }
                
                .ph-stats { margin-left: auto; display: flex; gap: 15px; }
                .stat-box { text-align: center; }
                .stat-box strong { display: block; font-size: 1.2rem; color: #1e293b; }
                .stat-box span { font-size: 0.75rem; color: #64748b; }

                .profile-body { display: flex; flex-direction: column; gap: 25px; }
                .pb-section h3 { font-size: 1rem; color: #334155; margin: 0 0 15px 0; display: flex; align-items: center; gap: 8px; }
                .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
                .field-group label { display: block; font-size: 0.75rem; color: #64748b; margin-bottom: 4px; }
                .field-group p { margin: 0; font-weight: 600; color: #1e293b; }
                .field-group.full { grid-column: span 2; }
                
                .file-row { display: flex; align-items: center; gap: 10px; background: #f8fafc; padding: 10px; border-radius: 8px; }
                .btn-link { margin-left: auto; color: #2563eb; background: none; border: none; cursor: pointer; font-weight: 600; }

                .photo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
                .proof-thumb { height: 100px; background: #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #64748b; }
                .mock-img { font-size: 0.8rem; }

                .job-card { background: #f8fafc; padding: 15px; border-radius: 10px; border: 1px solid #e2e8f0; }
                .jc-header { display: flex; justify-content: space-between; margin-bottom: 5px; }
                .status-tag { font-size: 0.7rem; background: #dbeafe; color: #1e40af; padding: 2px 6px; border-radius: 4px; font-weight: 700; }
                .job-card p { margin: 0; font-size: 0.85rem; color: #64748b; }

                .modal-footer { margin-top: 30px; display: flex; justify-content: flex-end; gap: 10px; border-top: 1px solid #f1f5f9; pt: 20px; }
                .btn-danger { padding: 10px 20px; background: #fee2e2; color: #991b1b; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
            `}</style>
        </div>
    );
};

export default InstallerCertification;
