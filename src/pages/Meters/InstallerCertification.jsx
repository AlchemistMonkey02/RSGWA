import React, { useState } from 'react';
import { UserCheck, MapPin, Camera, Clipboard, ShieldCheck, Search, Plus, X, Upload, FileCheck, Award, Briefcase, Ruler } from 'lucide-react';

const InstallerCertification = ({ meters = [], onInstall }) => {
    const [activeTab, setActiveTab] = useState('list');
    const [selectedJob, setSelectedJob] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    // Mock installers list (static for now as focus is on job flow)
    const installers = [
        { id: 1, name: 'Rahul Sharma', region: 'Jaipur', cert: 'RGWA-INS-4421', status: 'Certified', rating: '4.8', proofs: 124 },
        { id: 2, name: 'Amit Verma', region: 'Ajmer', cert: 'RGWA-INS-3902', status: 'Pending Renewal', rating: '4.5', proofs: 85 },
    ];

    const pendingJobs = meters.filter(m => m.status === 'Pending');

    const handleCompleteJob = (job) => {
        const proof = {
            installedBy: 'Rahul Sharma',
            installDate: new Date().toISOString().split('T')[0],
            geoLat: '26.9124',
            geoLong: '75.7873',
            photo: 'site_photo_v1.jpg',
            sealPhoto: 'seal_secure_v2.jpg',
            initialReading: '00010.5',
            sourceType: 'Borewell/Submersible'
        };
        onInstall(job.id, proof);
        setSelectedJob(null);
        alert(`Installation Certificate Generated for Unit ${job.serialNumber || job.id}. Digital seal applied.`);
    };

    return (
        <div className="module-container">
            <header className="module-header">
                <div className="title-grp">
                    <h1><ShieldCheck size={28} className="icon-blue" /> Field Operations & Evidence</h1>
                    <p>Technician workspace for capturing installation proof and generating digital certificates.</p>
                </div>
                <div className="header-actions">
                    <button className={`btn-tab ${activeTab === 'jobs' ? 'active' : ''}`} onClick={() => setActiveTab('jobs')}>
                        Field Assignments <span className="badge-count">{pendingJobs.length}</span>
                    </button>
                    <button className={`btn-tab ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')}>Certified Techs</button>
                </div>
            </header>

            {activeTab === 'list' && (
                <div className="installer-list animated">
                    <div className="grid-view">
                        {installers.map(i => (
                            <div key={i.id} className="installer-card">
                                <div className="i-header">
                                    <div className="i-avatar"><UserCheck size={24} /></div>
                                    <div className="i-title"><h3>{i.name}</h3><span>{i.cert}</span></div>
                                    <span className="i-rating">⭐ {i.rating}</span>
                                </div>
                                <div className="i-body">
                                    <div className="i-meta"><MapPin size={14} /><span>{i.region}</span></div>
                                    <div className="i-status-row">
                                        <span className={`status-pill ${i.status.toLowerCase().replace(' ', '-')}`}>{i.status}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'jobs' && (
                <div className="jobs-view animated">
                    <div className="job-list-header">
                        <h2>Active Assignments</h2>
                        <div className="filter-row">
                            <Search size={16} />
                            <input type="text" placeholder="Filter by Serial/NOC..." />
                        </div>
                    </div>

                    <div className="jobs-grid">
                        {pendingJobs.length === 0 ? (
                            <div className="empty-state">
                                <Clipboard size={48} />
                                <h3>Work Queue Empty</h3>
                                <p>All registered units have been successfully installed and documented.</p>
                            </div>
                        ) : (
                            pendingJobs.map(job => (
                                <div key={job.id} className="job-card-v3">
                                    <div className="j-badge">ASSIGNED</div>
                                    <div className="job-body">
                                        <div className="unit-info">
                                            <h3>{job.serialNumber || job.id}</h3>
                                            <span>Model ID: {job.modelId || 'N/A'}</span>
                                        </div>
                                        <div className="client-link">
                                            <p><strong>Applicant:</strong> {job.applicantName || 'Anonymous'}</p>
                                            <p><strong>NOC:</strong> {job.applicationId || 'N/A'}</p>
                                        </div>
                                        <div className="tech-specs-row">
                                            <span><Ruler size={12} /> {job.pipeSize}</span>
                                            <span><MapPin size={12} /> {job.borewellId}</span>
                                        </div>
                                    </div>
                                    <div className="job-footer">
                                        <button className="btn-action-primary" onClick={() => handleCompleteJob(job)}>
                                            <Camera size={16} /> Capture Installation Evidence
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            <style jsx>{`
                .module-container { padding: 0; background: transparent; }
                .module-header { 
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
                .title-grp h1 { font-size: 1.5rem; margin: 0; display: flex; align-items: center; gap: 12px; color: #0f172a; font-weight: 800; }
                .title-grp p { color: #64748b; margin: 4px 0 0; font-size: 0.95rem; font-weight: 500; }
                .icon-blue { color: #3b82f6; }

                .header-actions { display: flex; gap: 12px; }
                .btn-tab { 
                    padding: 10px 20px; 
                    background: #f1f5f9; 
                    border: 1px solid transparent; 
                    border-radius: 12px; 
                    font-weight: 700; 
                    color: #64748b; 
                    cursor: pointer; 
                    transition: all 0.2s; 
                    font-size: 0.85rem;
                }
                .btn-tab.active { background: white; color: #2563eb; border-color: #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
                .badge-count { background: #ef4444; color: white; padding: 2px 8px; border-radius: 6px; font-size: 0.7rem; margin-left: 8px; font-weight: 800; }

                .grid-view { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
                .installer-card { 
                    background: white; 
                    padding: 24px; 
                    border-radius: 20px; 
                    border: 1px solid #e2e8f0; 
                    transition: all 0.3s;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
                }
                .installer-card:hover { transform: translateY(-4px); box-shadow: 0 12px 20px -5px rgba(0,0,0,0.08); border-color: #3b82f6; }
                
                .i-header { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
                .i-avatar { width: 48px; height: 48px; border-radius: 14px; background: #eff6ff; color: #3b82f6; display: flex; align-items: center; justify-content: center; }
                .i-title { flex: 1; }
                .i-title h3 { margin: 0; font-size: 1.1rem; color: #0f172a; font-weight: 700; }
                .i-title span { font-size: 0.75rem; color: #64748b; font-weight: 600; font-family: monospace; }
                .i-rating { font-size: 0.85rem; font-weight: 700; color: #0f172a; }

                .i-body { border-top: 1px solid #f1f5f9; padding-top: 16px; display: flex; justify-content: space-between; align-items: center; }
                .i-meta { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #64748b; font-weight: 500; }
                .status-pill { padding: 4px 12px; border-radius: 10px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
                .status-pill.certified { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
                .status-pill.pending-renewal { background: #fffbeb; color: #d97706; border: 1px solid #fef3c7; }

                .jobs-view { display: flex; flex-direction: column; gap: 30px; }
                .job-list-header { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    background: white; 
                    padding: 20px 30px; 
                    border-radius: 20px; 
                    border: 1px solid #e2e8f0;
                }
                .job-list-header h2 { margin: 0; font-size: 1.25rem; color: #0f172a; font-weight: 800; }
                .filter-row { display: flex; align-items: center; gap: 12px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 16px; border-radius: 12px; width: 300px; }
                .filter-row input { border: none; background: transparent; outline: none; width: 100%; font-size: 0.9rem; font-weight: 500; }

                .jobs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; }
                .job-card-v3 { 
                    background: white; 
                    border-radius: 24px; 
                    border: 1px solid #e2e8f0; 
                    overflow: hidden; 
                    position: relative; 
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
                }
                .job-card-v3:hover { transform: translateY(-6px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); border-color: #3b82f6; }
                .j-badge { position: absolute; top: 16px; right: 16px; background: #eff6ff; color: #2563eb; padding: 6px 12px; border-radius: 10px; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.5px; border: 1px solid #dbeafe; }
                
                .job-body { padding: 30px; }
                .unit-info h3 { margin: 0 0 4px 0; color: #0f172a; font-size: 1.3rem; font-weight: 800; }
                .unit-info span { font-size: 0.75rem; color: #94a3b8; font-family: 'JetBrains Mono', monospace; font-weight: 600; }
                
                .client-link { 
                    margin: 20px 0; 
                    padding: 16px; 
                    background: #f8fafc; 
                    border-radius: 16px; 
                    font-size: 0.85rem; 
                    border: 1px solid #f1f5f9;
                }
                .client-link p { margin: 6px 0; color: #475569; font-weight: 500; }
                .client-link strong { color: #1e293b; font-weight: 700; }
                
                .tech-specs-row { display: flex; gap: 20px; }
                .tech-specs-row span { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }

                .job-footer { padding: 20px 30px; background: #f8fafc; border-top: 1px solid #f1f5f9; }
                .btn-action-primary { 
                    width: 100%; 
                    padding: 14px; 
                    background: #0f172a; 
                    color: white; 
                    border: none; 
                    border-radius: 14px; 
                    font-weight: 800; 
                    cursor: pointer; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    gap: 12px; 
                    transition: all 0.2s;
                    font-size: 0.9rem;
                }
                .btn-action-primary:hover { background: #1e293b; transform: scale(1.02); }
                
                .empty-state { 
                    grid-column: 1 / -1; 
                    padding: 80px 40px; 
                    text-align: center; 
                    color: #94a3b8; 
                    background: white; 
                    border-radius: 24px; 
                    border: 2px dashed #e2e8f0; 
                }
                .empty-state h3 { margin: 24px 0 8px; color: #1e293b; font-weight: 800; font-size: 1.5rem; }
                .empty-state p { font-size: 1rem; font-weight: 500; }

                .animated { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};


export default InstallerCertification;
