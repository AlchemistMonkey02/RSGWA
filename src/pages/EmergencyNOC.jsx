import React, { useState } from 'react';
import {
    AlertTriangle, FileText, UploadCloud, CheckCircle, ArrowRight, ArrowLeft,
    Building2, Info, Download, LayoutDashboard, LogOut, ChevronRight,
    Plus, Eye, Clock, MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmergencyNOC = ({ activeCompany, setActiveCompany }) => {
    const navigate = useNavigate();
    const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
    const [step, setStep] = useState(1);
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const [myApplications, setMyApplications] = useState([
        { id: 'EMERG-2025-001', reason: 'Drought Emergency', location: 'Jaipur, Phagi', status: 'Approved', date: '2024-12-05', expiry: '2025-03-05' },
        { id: 'EMERG-2025-002', reason: 'Critical Water Shortage', location: 'Jaipur, Sanganer', status: 'Pending', date: '2024-12-20', expiry: '-' }
    ]);

    const [formData, setFormData] = useState({
        applicantName: activeCompany?.name || 'Rajas Stones Pvt Ltd',
        emergencyType: 'Drought',
        location: '',
        district: 'Jaipur',
        justification: '',
        urgencyLevel: 'High',
        estimatedDuration: '3 months'
    });

    const steps = [
        { id: 1, label: 'Emergency Details', icon: <AlertTriangle size={18} /> },
        { id: 2, label: 'Site Information', icon: <MapPin size={18} /> },
        { id: 3, label: 'Documentation', icon: <FileText size={18} /> },
        { id: 4, label: 'Review & Submit', icon: <CheckCircle size={18} /> }
    ];

    const handleLogout = () => {
        if (confirm('Exit Emergency NOC Application? Progress may be lost.')) navigate('/dashboard');
    };

    const EmergencyDashboard = () => (
        <div className="emergency-dash animated">
            <div className="alert-warning">
                <AlertTriangle size={24} />
                <div>
                    <strong>Emergency NOC Notice</strong>
                    <p>Emergency NOCs are granted only in cases of severe water shortage, drought, or critical infrastructure needs. Approval is subject to immediate review by RGWA authorities.</p>
                </div>
            </div>

            <div className="dash-stats">
                <div className="stat-card">
                    <div className="s-icon red"><AlertTriangle size={24} /></div>
                    <div className="s-info">
                        <strong>{myApplications.filter(a => a.status === 'Approved').length}</strong>
                        <span>Active Emergency NOCs</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="s-icon yellow"><Clock size={24} /></div>
                    <div className="s-info">
                        <strong>{myApplications.filter(a => a.status === 'Pending').length}</strong>
                        <span>Pending Applications</span>
                    </div>
                </div>
            </div>

            <div className="applications-table">
                <div className="table-header">
                    <h3>My Emergency NOC Applications</h3>
                    <button className="btn-primary" onClick={() => setActiveMenuItem('new')}>
                        <Plus size={18} /> New Emergency Application
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Application ID</th>
                            <th>Emergency Type</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Expiry</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myApplications.map(app => (
                            <tr key={app.id}>
                                <td><strong>{app.id}</strong></td>
                                <td>{app.reason}</td>
                                <td>{app.location}</td>
                                <td><span className={`status-badge ${app.status.toLowerCase()}`}>{app.status}</span></td>
                                <td>{app.date}</td>
                                <td>{app.expiry}</td>
                                <td>
                                    <button className="btn-icon" title="View Details"><Eye size={14} /></button>
                                    {app.status === 'Approved' && (
                                        <button className="btn-icon" title="Download NOC"><Download size={14} /></button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const WizardStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="wizard-step animated">
                        <h3>1. Emergency Details</h3>
                        <div className="form-layout">
                            <div className="form-group full">
                                <label>Applicant Name</label>
                                <input type="text" value={formData.applicantName} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Emergency Type *</label>
                                <select value={formData.emergencyType} onChange={e => setFormData({ ...formData, emergencyType: e.target.value })}>
                                    <option>Drought</option>
                                    <option>Critical Water Shortage</option>
                                    <option>Infrastructure Emergency</option>
                                    <option>Public Health Emergency</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Urgency Level *</label>
                                <select value={formData.urgencyLevel} onChange={e => setFormData({ ...formData, urgencyLevel: e.target.value })}>
                                    <option>High</option>
                                    <option>Critical</option>
                                    <option>Extreme</option>
                                </select>
                            </div>
                            <div className="form-group full">
                                <label>Justification for Emergency NOC *</label>
                                <textarea value={formData.justification} onChange={e => setFormData({ ...formData, justification: e.target.value })} placeholder="Explain the emergency situation and why immediate water access is required" rows="5"></textarea>
                            </div>
                            <div className="form-group">
                                <label>Estimated Duration *</label>
                                <select value={formData.estimatedDuration} onChange={e => setFormData({ ...formData, estimatedDuration: e.target.value })}>
                                    <option>1 month</option>
                                    <option>3 months</option>
                                    <option>6 months</option>
                                    <option>12 months</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="wizard-step animated">
                        <h3>2. Site Information</h3>
                        <div className="form-layout">
                            <div className="form-group">
                                <label>District *</label>
                                <select value={formData.district} onChange={e => setFormData({ ...formData, district: e.target.value })}>
                                    <option>Jaipur</option>
                                    <option>Jodhpur</option>
                                    <option>Udaipur</option>
                                    <option>Kota</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Tehsil *</label>
                                <input type="text" placeholder="Enter tehsil" />
                            </div>
                            <div className="form-group full">
                                <label>Site Location Address *</label>
                                <textarea value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="Complete address of the emergency site" rows="3"></textarea>
                            </div>
                            <div className="form-group">
                                <label>Current Water Source Status</label>
                                <select>
                                    <option>Completely Dry</option>
                                    <option>Severely Depleted</option>
                                    <option>Contaminated</option>
                                    <option>Not Accessible</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="wizard-step animated">
                        <h3>3. Required Documents</h3>
                        <div className="document-checklist">
                            <div className="doc-item">
                                <input type="checkbox" id="doc1" />
                                <label htmlFor="doc1">Emergency Declaration Document</label>
                            </div>
                            <div className="doc-item">
                                <input type="checkbox" id="doc2" />
                                <label htmlFor="doc2">Site Location Details</label>
                            </div>
                            <div className="doc-item">
                                <input type="checkbox" id="doc3" />
                                <label htmlFor="doc3">Water Quality Test (if applicable)</label>
                            </div>
                            <div className="doc-item">
                                <input type="checkbox" id="doc4" />
                                <label htmlFor="doc4">Supporting Evidence of Emergency</label>
                            </div>
                        </div>
                        <div className="upload-section">
                            <UploadCloud size={24} />
                            <p>Upload required documents</p>
                            <button className="btn-secondary">Browse Files</button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="wizard-step animated">
                        <h3>4. Review & Submit</h3>
                        <div className="review-summary">
                            <div className="summary-item">
                                <label>Applicant:</label>
                                <span>{formData.applicantName}</span>
                            </div>
                            <div className="summary-item">
                                <label>Emergency Type:</label>
                                <span>{formData.emergencyType}</span>
                            </div>
                            <div className="summary-item">
                                <label>Urgency Level:</label>
                                <span>{formData.urgencyLevel}</span>
                            </div>
                            <div className="summary-item">
                                <label>Location:</label>
                                <span>{formData.location}</span>
                            </div>
                            <div className="summary-item">
                                <label>Estimated Duration:</label>
                                <span>{formData.estimatedDuration}</span>
                            </div>
                        </div>
                        <div className="consent-box">
                            <input type="checkbox" id="consent" />
                            <label htmlFor="consent">I confirm that this is a genuine emergency situation and all information provided is accurate. I understand that emergency NOCs are subject to immediate review and may be revoked if misused.</label>
                        </div>
                    </div>
                );
            default:
                return <div className="success-screen">
                    <CheckCircle size={80} />
                    <h2>Emergency Application Submitted!</h2>
                    <p>Your emergency NOC application has been submitted for immediate review. Reference ID: <strong>EMERG-2025-{Math.floor(Math.random() * 900 + 100)}</strong></p>
                    <p style={{ color: '#dc2626', fontWeight: 600 }}>Please note: This application will be reviewed on priority basis by RGWA authorities.</p>
                    <button className="btn-primary" onClick={() => { setActiveMenuItem('dashboard'); setStep(1); }}>Back to Dashboard</button>
                </div>;
        }
    };

    return (
        <div className="sys-canvas">
            <aside className={`sys-sidebar ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
                <div className="sb-header">
                    <div className="sb-logo" onClick={() => navigate('/dashboard')}>
                        <div className="logo-box">E</div>
                        {isSidebarOpen && <span>Emergency NOC</span>}
                    </div>
                    <button className="sb-toggle" onClick={() => setSidebarOpen(!isSidebarOpen)}>
                        <ChevronRight size={20} className={isSidebarOpen ? 'spin-180' : ''} />
                    </button>
                </div>
                <nav className="sb-nav">
                    <button className="sb-item" onClick={() => navigate('/dashboard')}><LayoutDashboard size={18} /> {isSidebarOpen && "Authority Hub"}</button>
                    <div className="sb-divider"></div>
                    <button className={`sb-item ${activeMenuItem === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveMenuItem('dashboard')}><AlertTriangle size={18} /> {isSidebarOpen && "My Applications"}</button>
                    <button className={`sb-item ${activeMenuItem === 'new' ? 'active' : ''}`} onClick={() => setActiveMenuItem('new')}><Plus size={18} /> {isSidebarOpen && "New Application"}</button>
                </nav>
                <div className="sb-footer">
                    <button className="sb-item" onClick={handleLogout}><LogOut size={18} /> {isSidebarOpen && "Exit"}</button>
                </div>
            </aside>

            <main className="sys-surface">
                {activeCompany && (
                    <div className="active-context-bar animated">
                        <div className="ac-left">
                            <Building2 size={16} />
                            <span>Acting as: <strong>{activeCompany.name}</strong></span>
                            <span className="ac-id">{activeCompany.id}</span>
                        </div>
                    </div>
                )}
                <header className="sys-header">
                    <div className="header-branding">
                        <img src="/rajasthan_emblem.png" alt="Emblem" className="emblem-img" />
                        <div className="branding-txt">
                            <h2>Emergency NOC Portal</h2>
                            <p>Drought / Emergency Water Access • Rajasthan Ground Water Authority</p>
                        </div>
                    </div>
                    <div className="header-controls">
                        <button className="help-btn"><Info size={18} /></button>
                        <button className="logout-btn" onClick={handleLogout}><LogOut size={18} /></button>
                    </div>
                </header>

                <div className="sys-viewport">
                    {activeMenuItem === 'dashboard' ? (
                        <EmergencyDashboard />
                    ) : (
                        <div className="wizard-container">
                            {step <= 4 && (
                                <div className="step-progress">
                                    {steps.map(s => (
                                        <div key={s.id} className={`p-node ${step >= s.id ? 'active' : ''}`}>
                                            <div className="node-icon">{step > s.id ? <CheckCircle size={14} /> : s.icon}</div>
                                            <span>{s.label}</span>
                                        </div>
                                    ))}
                                    <div className="p-bar">
                                        <div className="p-bar-fill" style={{ width: `${(step - 1) * 33.3}%` }}></div>
                                    </div>
                                </div>
                            )}
                            <div className="wizard-card-surface">
                                <WizardStep />
                                {step <= 4 && (
                                    <div className="wizard-actions">
                                        {step > 1 && (
                                            <button className="btn-secondary" onClick={() => setStep(step - 1)}>
                                                <ArrowLeft size={16} /> Previous
                                            </button>
                                        )}
                                        <button className="btn-primary" onClick={() => step < 4 ? setStep(step + 1) : setStep(5)}>
                                            {step < 4 ? 'Next' : 'Submit Application'} <ArrowRight size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <style jsx>{`
                .sys-canvas { display: flex; height: 100vh; background: #f8fafc; overflow: hidden; font-family: 'Inter', sans-serif; }
                .sys-sidebar { background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); color: white; display: flex; flex-direction: column; border-right: 1px solid rgba(255,255,255,0.1); transition: width 0.3s; }
                .sys-sidebar.expanded { width: 280px; }
                .sys-sidebar.collapsed { width: 80px; }
                .sb-header { height: 80px; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; border-bottom: 1px solid rgba(255,255,255,0.1); }
                .sb-logo { display: flex; align-items: center; gap: 12px; cursor: pointer; }
                .logo-box { width: 40px; height: 40px; background: linear-gradient(135deg, #ef4444, #dc2626); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem; }
                .sb-toggle { background: rgba(255,255,255,0.1); border: none; color: white; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; }
                .sb-nav { padding: 24px 16px; flex: 1; display: flex; flex-direction: column; gap: 8px; }
                .sb-item { display: flex; align-items: center; gap: 16px; padding: 12px 16px; border-radius: 12px; background: transparent; border: none; color: rgba(255,255,255,0.7); font-weight: 600; cursor: pointer; transition: all 0.2s; text-align: left; }
                .sb-item:hover { background: rgba(255,255,255,0.05); color: white; }
                .sb-item.active { background: linear-gradient(90deg, rgba(59, 130, 246, 0.2), transparent); color: white; border-left: 3px solid #ef4444; }
                .sb-divider { height: 1px; background: rgba(255,255,255,0.1); margin: 8px 0; }
                .sb-footer { padding: 24px; border-top: 1px solid rgba(255,255,255,0.1); }
                .sys-surface { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
                .active-context-bar { background: hsla(210, 40%, 96%, 0.8); backdrop-filter: blur(10px); border-bottom: 1px solid #e2e8f0; padding: 8px 32px; display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; }
                .ac-left { display: flex; align-items: center; gap: 12px; color: #64748b; }
                .ac-left strong { color: #1e293b; }
                .ac-id { font-size: 0.7rem; color: #ef4444; font-weight: 700; background: white; padding: 2px 6px; border-radius: 4px; }
                .sys-header { height: 80px; background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(20px); border-bottom: 1px solid #e2e8f0; padding: 0 32px; display: flex; justify-content: space-between; align-items: center; }
                .header-branding { display: flex; align-items: center; gap: 16px; }
                .emblem-img { height: 48px; }
                .branding-txt h2 { margin: 0; font-size: 1.1rem; color: #0f172a; font-weight: 800; }
                .branding-txt p { margin: 0; font-size: 0.75rem; color: #64748b; text-transform: uppercase; font-weight: 700; }
                .header-controls { display: flex; align-items: center; gap: 16px; }
                .help-btn, .logout-btn { width: 40px; height: 40px; border-radius: 12px; border: 1px solid #e2e8f0; background: white; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
                .help-btn:hover { background: #f8fafc; color: #ef4444; }
                .logout-btn:hover { background: #fef2f2; border-color: #fecaca; color: #dc2626; }
                .sys-viewport { flex: 1; overflow-y: auto; background: radial-gradient(circle at 0% 0%, #f9fafb, #fef2f2 100%); padding: 40px; }
                .emergency-dash { animation: fadeIn 0.5s ease-out; }
                .alert-warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; border-radius: 12px; margin-bottom: 32px; display: flex; gap: 16px; align-items: flex-start; }
                .alert-warning svg { color: #ef4444; flex-shrink: 0; margin-top: 4px; }
                .alert-warning strong { display: block; color: #991b1b; font-size: 1.1rem; margin-bottom: 8px; }
                .alert-warning p { color: #7f1d1d; margin: 0; line-height: 1.6; }
                .dash-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-bottom: 32px; }
                .stat-card { background: white; border-radius: 20px; padding: 24px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 20px; }
                .s-icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
                .s-icon.red { background: #fef2f2; color: #ef4444; }
                .s-icon.yellow { background: #fefce8; color: #eab308; }
                .s-info strong { display: block; font-size: 2rem; font-weight: 800; color: #0f172a; line-height: 1; margin-bottom: 6px; }
                .s-info span { font-size: 0.85rem; color: #64748b; font-weight: 700; text-transform: uppercase; }
                .applications-table { background: white; border-radius: 20px; padding: 32px; border: 1px solid #e2e8f0; }
                .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
                .table-header h3 { margin: 0; font-size: 1.25rem; font-weight: 800; color: #0f172a; }
                .btn-primary { background: #ef4444; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s; }
                .btn-primary:hover { background: #dc2626; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3); }
                table { width: 100%; border-collapse: collapse; }
                thead th { text-align: left; padding: 12px; background: #f8fafc; color: #64748b; font-weight: 800; font-size: 0.75rem; text-transform: uppercase; border-bottom: 2px solid #e2e8f0; }
                tbody td { padding: 16px 12px; border-bottom: 1px solid #f1f5f9; }
                .status-badge { padding: 4px 12px; border-radius: 12px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
                .status-badge.approved { background: #ecfdf5; color: #059669; }
                .status-badge.pending { background: #fff7ed; color: #c2410c; }
                .btn-icon { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
                .btn-icon:hover { border-color: #ef4444; color: #ef4444; }
                .wizard-container { max-width: 900px; margin: 0 auto; }
                .step-progress { display: flex; justify-content: space-between; margin-bottom: 40px; position: relative; }
                .p-node { display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 1; }
                .node-icon { width: 40px; height: 40px; border-radius: 50%; background: #f1f5f9; border: 2px solid #e2e8f0; display: flex; align-items: center; justify-content: center; color: #94a3b8; }
                .p-node.active .node-icon { background: #ef4444; border-color: #ef4444; color: white; }
                .p-node span { font-size: 0.75rem; font-weight: 700; color: #64748b; }
                .p-node.active span { color: #ef4444; }
                .p-bar { position: absolute; top: 20px; left: 0; right: 0; height: 2px; background: #e2e8f0; z-index: 0; }
                .p-bar-fill { height: 100%; background: #ef4444; transition: width 0.3s; }
                .wizard-card-surface { background: white; border-radius: 24px; padding: 40px; border: 1px solid #e2e8f0; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
                .wizard-step h3 { font-size: 1.5rem; font-weight: 800; color: #0f172a; margin-bottom: 32px; }
                .form-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                .form-group.full { grid-column: span 2; }
                .form-group label { display: block; font-size: 0.85rem; font-weight: 700; color: #475569; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
                .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1.5px solid #e2e8f0; font-size: 0.95rem; outline: none; transition: all 0.2s; font-family: inherit; }
                .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #ef4444; box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1); }
                .document-checklist { margin-bottom: 32px; }
                .doc-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: #f8fafc; border-radius: 8px; margin-bottom: 8px; }
                .doc-item input { width: 18px; height: 18px; cursor: pointer; }
                .doc-item label { margin: 0; font-size: 0.9rem; color: #1e293b; font-weight: 600; cursor: pointer; }
                .upload-section { text-align: center; padding: 40px; background: #f8fafc; border-radius: 16px; border: 2px dashed #cbd5e1; }
                .upload-section svg { color: #94a3b8; margin-bottom: 12px; }
                .upload-section p { color: #64748b; font-weight: 600; margin-bottom: 16px; }
                .btn-secondary { background: white; color: #475569; border: 1.5px solid #e2e8f0; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
                .btn-secondary:hover { border-color: #ef4444; color: #ef4444; }
                .review-summary { background: #f8fafc; border-radius: 16px; padding: 24px; margin-bottom: 32px; }
                .summary-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
                .summary-item:last-child { border-bottom: none; }
                .summary-item label { font-weight: 700; color: #64748b; }
                .summary-item span { font-weight: 600; color: #0f172a; }
                .consent-box { display: flex; gap: 12px; align-items: flex-start; }
                .consent-box input { margin-top: 4px; }
                .consent-box label { font-size: 0.9rem; color: #475569; line-height: 1.5; cursor: pointer; }
                .wizard-actions { display: flex; justify-content: space-between; margin-top: 32px; padding-top: 32px; border-top: 1px solid #e2e8f0; }
                .success-screen { text-align: center; padding: 60px 40px; }
                .success-screen svg { color: #10b981; margin-bottom: 24px; }
                .success-screen h2 { font-size: 1.8rem; font-weight: 800; color: #0f172a; margin-bottom: 16px; }
                .success-screen p { color: #64748b; font-size: 1.1rem; line-height: 1.6; margin-bottom: 12px; }
                .success-screen strong { color: #ef4444; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animated { animation: fadeIn 0.5s ease-out; }
                .spin-180 { transform: rotate(180deg); }
            `}</style>
        </div>
    );
};

export default EmergencyNOC;

