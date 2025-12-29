import React, { useState } from 'react';
import {
    Truck, Settings, Users, UploadCloud, CheckCircle,
    ArrowRight, ArrowLeft, Ruler, Shield, Info,
    Download, LayoutDashboard, Globe, LogOut, ChevronRight,
    BarChart3, Activity, Plus, Search, Filter, Eye, Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { RefreshCw, Building2 } from 'lucide-react';

const RigRegistration = ({ activeCompany, setActiveCompany, setUserCompanies }) => {
    const navigate = useNavigate();
    const [activeMenuItem, setActiveMenuItem] = useState('dashboard'); // 'dashboard' | 'new'
    const [step, setStep] = useState(1);
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const [myFleet, setMyFleet] = useState([
        { id: 'RGWA-RIG-001', type: 'DTH Rig', brand: 'Simco 2800', capacity: '300m', operator: 'Rajesh K.', status: 'Active', expiry: '2025-10-12' },
        { id: 'RGWA-RIG-442', type: 'Rotary Rig', brand: 'Ingersoll Rand', capacity: '500m', operator: 'Amit S.', status: 'Maintenance', expiry: '2024-12-30' },
        { id: 'RGWA-RIG-908', type: 'Crawler Rig', brand: 'Casagrande', capacity: '200m', operator: 'Suresh V.', status: 'Pending', expiry: '-' }
    ]);

    const [formData, setFormData] = useState({
        ownerName: 'Khandelwal Drilling Services',
        rigType: 'Combination Rig (Rotary/Percussion)',
        machineId: 'RJ-RIG-2025-V2',
        engineNumber: 'E9938842ND',
        chassisNumber: 'CH-X83992',
        drillCapacity: '250',
        compressorCFM: '1200'
    });

    const steps = [
        { id: 1, label: 'Identity & Ownership', icon: <Truck size={18} /> },
        { id: 2, label: 'Technical Specs', icon: <Settings size={18} /> },
        { id: 3, label: 'Operator Intel', icon: <Users size={18} /> },
        { id: 4, label: 'Credential Vault', icon: <UploadCloud size={18} /> }
    ];

    const handleLogout = () => {
        if (confirm('Exit Rig Registration? Progress may be lost.')) navigate('/dashboard');
    };

    const RigDashboard = () => (
        <div className="rig-dash animated">
            <div className="dash-stats">
                <div className="stat-card">
                    <div className="s-icon purple"><Truck size={24} /></div>
                    <div className="s-info">
                        <label>Active Fleet</label>
                        <strong>12 Rigs</strong>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="s-icon yellow"><Clock size={24} /></div>
                    <div className="s-info">
                        <label>Move Permits</label>
                        <strong>04 Pending</strong>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="s-icon green"><Shield size={24} /></div>
                    <div className="s-info">
                        <label>Compliance</label>
                        <strong>98% Score</strong>
                    </div>
                </div>
            </div>

            <div className="fleet-box">
                <div className="fb-header">
                    <h3>Equipment Inventory & Status</h3>
                    <div className="fb-actions">
                        <div className="fb-search"><Search size={16} /><input type="text" placeholder="Search Rig ID..." /></div>
                        <button className="btn-add-rig" onClick={() => setActiveMenuItem('new')}><Plus size={16} /> Register New Rig</button>
                    </div>
                </div>
                <div className="table-container">
                    <table className="rig-table">
                        <thead>
                            <tr>
                                <th>Equipment ID</th>
                                <th>Classification</th>
                                <th>Depth Cap</th>
                                <th>Current Operator</th>
                                <th>Permit Status</th>
                                <th>Expiry</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myFleet.map(rig => (
                                <tr key={rig.id}>
                                    <td><strong>{rig.id}</strong></td>
                                    <td>{rig.type}</td>
                                    <td>{rig.capacity}</td>
                                    <td>{rig.operator}</td>
                                    <td><span className={`status-pill ${rig.status.toLowerCase()}`}>{rig.status}</span></td>
                                    <td>{rig.expiry}</td>
                                    <td>
                                        <button className="btn-icon"><Eye size={14} /></button>
                                        <button className="btn-icon"><Download size={14} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const CompletionSuccess = () => (
        <div className="success-screen animated">
            <div className="success-icon"><CheckCircle size={80} /></div>
            <h2>Rig Successfully Registered</h2>
            <div className="ref-card">
                <p>Digital Registration Number</p>
                <strong>RGWA-RIG-RAJ-4009</strong>
            </div>
            <p className="desc">Your drilling equipment has been successfully white-listed in the **Rajasthan Ground Water Authority** database. You are now authorized to apply for move-out permits and drilling licenses.</p>
            <div className="next-actions">
                <button className="btn-secondary" onClick={() => setActiveMenuItem('dashboard')}>Back to Dashboard</button>
                <button className="btn-primary"><Download size={18} /> Download Certificate</button>
            </div>
        </div>
    );

    const WizardStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="wizard-step animated">
                        <h3>1. Equipment Identity & Ownership</h3>
                        <div className="form-layout">
                            <div className="form-group full">
                                <label>Legal Owner Entity</label>
                                <input type="text" value={formData.ownerName} onChange={e => setFormData({ ...formData, ownerName: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Rig Classification</label>
                                <select value={formData.rigType} onChange={e => setFormData({ ...formData, rigType: e.target.value })}>
                                    <option>Direct Rotary (DR)</option>
                                    <option>Down-the-Hole (DTH)</option>
                                    <option>Combination Rig</option>
                                    <option>Manual / Hand Operated</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Registration / Machine ID</label>
                                <input type="text" value={formData.machineId} />
                            </div>
                            <div className="form-group">
                                <label>Engine Serial Number</label>
                                <input type="text" value={formData.engineNumber} />
                            </div>
                            <div className="form-group">
                                <label>Chassis Serial Number</label>
                                <input type="text" value={formData.chassisNumber} />
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="wizard-step animated">
                        <h3>2. Technical Specifications & Power</h3>
                        <div className="info-alert">
                            <Shield size={20} />
                            <p>All registered rigs must maintain a <strong className="text-blue">Calibrated Depth Gauge</strong> for accurate digital logging.</p>
                        </div>
                        <div className="form-layout">
                            <div className="form-group">
                                <label>Max Drilling Depth (Meters)</label>
                                <div className="input-with-unit">
                                    <input type="number" value={formData.drillCapacity} />
                                    <span>MT</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Compressor Capacity (CFM)</label>
                                <input type="number" value={formData.compressorCFM} />
                            </div>
                            <div className="form-group">
                                <label>Pullback Capacity</label>
                                <select><option>Above 20,000 lbs</option><option>Below 20,000 lbs</option></select>
                            </div>
                            <div className="form-group">
                                <label>Carrier Type</label>
                                <select><option>Truck Mounted</option><option>Crawler / Track</option></select>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="wizard-step animated">
                        <h3>3. Certified Operator Information</h3>
                        <p className="step-desc">Enter details of the authorized Lead Driller responsible for this rig.</p>
                        <div className="form-layout">
                            <div className="form-group">
                                <label>Lead Driller Name</label>
                                <input type="text" placeholder="Full name as per Aadhar" />
                            </div>
                            <div className="form-group">
                                <label>Certification ID</label>
                                <input type="text" placeholder="RGWA-CERT-XXXX" />
                            </div>
                            <div className="form-group">
                                <label>Experience (Years)</label>
                                <input type="number" />
                            </div>
                            <div className="form-group">
                                <label>Mobile Coverage</label>
                                <input type="tel" placeholder="+91 XXXX-XXXX" />
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="wizard-step animated">
                        <h3>4. Professional Credential Vault</h3>
                        <div className="upload-grid">
                            <div className="upload-box active">
                                <UploadCloud size={24} />
                                <div><strong>RC & Insurance</strong><p>Vehicle registration and valid insurance</p></div>
                                <button className="btn-sm">Browse</button>
                            </div>
                            <div className="upload-box">
                                <UploadCloud size={24} />
                                <div><strong>Pollution (PUC)</strong><p>Engine emission certificate</p></div>
                                <button className="btn-sm">Browse</button>
                            </div>
                            <div className="upload-box">
                                <UploadCloud size={24} />
                                <div><strong>Technical Affidavit</strong><p>Notarized proof of equipment specs</p></div>
                                <button className="btn-sm">Browse</button>
                            </div>
                        </div>
                    </div>
                );
            default: return <CompletionSuccess />;
        }
    };

    return (
        <div className="sys-canvas">
            <aside className={`sys-sidebar ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
                <div className="sb-header">
                    <div className="sb-logo" onClick={() => navigate('/dashboard')}>
                        <div className="logo-box">R</div>
                        {isSidebarOpen && <span>Rig Registry</span>}
                    </div>
                    <button className="sb-toggle" onClick={() => setSidebarOpen(!isSidebarOpen)}>
                        <ChevronRight size={20} className={isSidebarOpen ? 'spin-180' : ''} />
                    </button>
                </div>
                <nav className="sb-nav">
                    <button className="sb-item" onClick={() => navigate('/dashboard')}><LayoutDashboard size={18} /> {isSidebarOpen && "Authority Hub"}</button>
                    <div className="sb-divider"></div>
                    <button className={`sb-item ${activeMenuItem === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveMenuItem('dashboard')}><Truck size={18} /> {isSidebarOpen && "Fleet Dashboard"}</button>
                    <button className={`sb-item ${activeMenuItem === 'new' ? 'active' : ''}`} onClick={() => setActiveMenuItem('new')}><Plus size={18} /> {isSidebarOpen && "New Registration"}</button>
                    <button className="sb-item"><Users size={18} /> {isSidebarOpen && "Crew Management"}</button>
                    <button className="sb-item"><Globe size={18} /> {isSidebarOpen && "Move Permits"}</button>
                </nav>
                <div className="sb-footer">
                    <div className="user-pill">
                        <div className="avatar">{activeCompany ? activeCompany.avatar : 'KS'}</div>
                        {isSidebarOpen && (
                            <div className="info">
                                <strong>{activeCompany ? activeCompany.name : 'Corporate User'}</strong>
                                <span>{activeCompany ? `ENTITY ID ${activeCompany.id}` : 'RIG OPERATOR'}</span>
                            </div>
                        )}
                    </div>
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
                        <button className="ac-switch" onClick={() => { setActiveCompany(null); navigate('/dashboard'); }}>
                            <RefreshCw size={14} /> Switch Entity
                        </button>
                    </div>
                )}
                <header className="sys-header">
                    <div className="header-branding">
                        <img src="/rajasthan_emblem.png" alt="Emblem" className="emblem-img" />
                        <div className="branding-txt">
                            <h2>RGWA Rig Control Center</h2>
                            <p>Integrated Drilling Equipment Database</p>
                        </div>
                    </div>
                    <div className="header-controls">
                        <button className="help-btn"><Info size={18} /></button>
                        <button className="logout-btn" onClick={handleLogout}><LogOut size={18} /></button>
                    </div>
                </header>

                <div className="sys-viewport">
                    {activeMenuItem === 'dashboard' ? (
                        <RigDashboard />
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
                                    <div className="wizard-nav">
                                        <button className="btn-ghost" disabled={step === 1} onClick={() => setStep(s => s - 1)}>
                                            <ArrowLeft size={18} /> Back
                                        </button>
                                        <button className="btn-solid" onClick={() => {
                                            setStep(s => s + 1);
                                            if (setUserCompanies && activeCompany) {
                                                setUserCompanies(prev => prev.map(c => {
                                                    if (c.id === activeCompany.id) {
                                                        return { ...c, services: { ...c.services, rigs: { ...c.services.rigs, registered: true, pending: false } } };
                                                    }
                                                    return c;
                                                }));
                                            }
                                        }}>
                                            {step === 4 ? 'White-list Rig' : 'Lock & Proceed'} <ArrowRight size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <style jsx>{`
                .sys-canvas { display: flex; height: 100vh; background: #f1f5f9; overflow: hidden; font-family: 'Inter', sans-serif; }

                .active-context-bar {
                    background: #f1f5f9;
                    border-bottom: 1px solid #e2e8f0;
                    padding: 8px 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.8rem;
                }
                .ac-left { display: flex; align-items: center; gap: 12px; color: #475569; }
                .ac-left strong { color: #0f172a; }
                .ac-id { font-size: 0.7rem; color: #94a3b8; font-weight: 700; background: white; padding: 2px 6px; border-radius: 4px; border: 1px solid #e2e8f0; }
                .ac-switch { background: #0f172a; color: white; border: none; padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s; }
                .ac-switch:hover { background: #1e293b; transform: translateY(-1px); }

                /* SIDEBAR */
                .sys-sidebar { background: #0f172a; color: white; transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; flex-direction: column; flex-shrink: 0; }
                .sys-sidebar.expanded { width: 260px; }
                .sys-sidebar.collapsed { width: 80px; }
                .sb-header { height: 80px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-bottom: 1px solid #1e293b; }
                .logo-box { width: 40px; height: 40px; background: #7c3aed; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.2rem; cursor: pointer; }
                .sb-toggle { background: transparent; border: none; color: #94a3b8; cursor: pointer; }
                .spin-180 { transform: rotate(180deg); }
                .sb-nav { padding: 20px 12px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
                .sb-item { display: flex; align-items: center; gap: 12px; padding: 12px; border: none; background: transparent; color: #94a3b8; border-radius: 10px; cursor: pointer; text-align: left; transition: all 0.2s; width: 100%; }
                .sb-item:hover { background: #1e293b; color: white; }
                .sb-item.active { background: #7c3aed; color: white; }
                .sb-footer { padding: 20px; border-top: 1px solid #1e293b; }
                .user-pill { display: flex; align-items: center; gap: 12px; background: #1e293b; padding: 10px; border-radius: 12px; }
                .avatar { width: 35px; height: 35px; background: #7c3aed; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; }
                .info { display: flex; flex-direction: column; overflow: hidden; }
                .info strong { font-size: 0.85rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .info span { font-size: 0.7rem; color: #94a3b8; }

                /* SURFACE & HEADER */
                .sys-surface { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
                .sys-header { height: 80px; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(12px); border-bottom: 1px solid #e2e8f0; padding: 0 30px; display: flex; justify-content: space-between; align-items: center; z-index: 50; flex-shrink: 0; }
                .header-branding { display: flex; align-items: center; gap: 15px; }
                .emblem-img { height: 45px; }
                .branding-txt h2 { margin: 0; font-size: 1.1rem; color: #0f172a; font-weight: 800; }
                .branding-txt p { margin: 0; font-size: 0.7rem; color: #64748b; text-transform: uppercase; font-weight: 800; }
                .header-controls { display: flex; gap: 12px; }
                .help-btn, .logout-btn { width: 40px; height: 40px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; }
                .logout-btn:hover { background: #fef2f2; border-color: #fecaca; color: #dc2626; }

                /* VIEWPORT */
                .sys-viewport { flex: 1; overflow-y: auto; background: #f8fafc; padding: 40px; }
                .wizard-container { max-width: 900px; margin: 0 auto; }
                
                /* STEPPER */
                .step-progress { display: flex; justify-content: space-between; margin-bottom: 50px; position: relative; }
                .p-node { z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 10px; width: 100px; }
                .node-icon { width: 40px; height: 40px; background: white; border: 2px solid #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #94a3b8; transition: all 0.3s; position: relative; z-index: 2; }
                .p-node.active .node-icon { border-color: #7c3aed; color: #7c3aed; background: #f5f3ff; box-shadow: 0 0 0 6px rgba(124, 58, 237, 0.1); }
                .p-node.active span { color: #7c3aed; }
                .p-node span { font-size: 0.75rem; font-weight: 700; color: #64748b; text-align: center; }
                .p-bar { position: absolute; top: 20px; left: 50px; right: 50px; height: 3px; background: #e2e8f0; z-index: 1; }
                .p-bar-fill { position: absolute; top: 0; left: 0; height: 100%; background: #7c3aed; transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1); }

                /* DASHBOARD SPECIFIC */
                .rig-dash { display: flex; flex-direction: column; gap: 30px; }
                .dash-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
                .stat-card { background: white; padding: 25px; border-radius: 20px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 20px; }
                .s-icon { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
                .s-icon.purple { background: #f5f3ff; color: #7c3aed; }
                .s-icon.yellow { background: #fffbeb; color: #f59e0b; }
                .s-icon.green { background: #f0fdf4; color: #10b981; }
                .s-info label { display: block; font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase; margin-bottom: 4px; }
                .s-info strong { font-size: 1.4rem; color: #0f172a; font-weight: 800; }

                .fleet-box { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 30px; }
                .fb-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
                .fb-header h3 { margin: 0; font-size: 1.25rem; color: #0f172a; }
                .fb-actions { display: flex; gap: 15px; }
                .fb-search { position: relative; display: flex; align-items: center; }
                .fb-search svg { position: absolute; left: 12px; color: #94a3b8; }
                .fb-search input { padding: 10px 10px 10px 40px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 0.9rem; width: 250px; }
                .btn-add-rig { background: #0f172a; color: white; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 0.9rem; }

                .table-container { overflow-x: auto; }
                .rig-table { width: 100%; border-collapse: collapse; text-align: left; }
                .rig-table th { padding: 15px; font-size: 0.75rem; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; font-weight: 800; }
                .rig-table td { padding: 18px 15px; font-size: 0.9rem; border-bottom: 1px solid #f8fafc; color: #475569; }
                .status-pill { padding: 4px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
                .status-pill.active { background: #f0fdf4; color: #166534; }
                .status-pill.maintenance { background: #fff1f2; color: #991b1b; }
                .status-pill.pending { background: #fef3c7; color: #92400e; }
                .btn-icon { width: 32px; height: 32px; border: 1px solid #e2e8f0; background: white; border-radius: 6px; color: #64748b; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; margin-right: 5px; }
                .btn-icon:hover { background: #f8fafc; color: #0f172a; }

                /* WIZARD CARD */
                .wizard-card-surface { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 40px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); min-height: 500px; display: flex; flex-direction: column; }
                .wizard-step h3 { font-size: 1.4rem; color: #0f172a; margin: 0 0 10px 0; font-weight: 800; border-left: 5px solid #7c3aed; padding-left: 15px; }
                .step-desc { font-size: 0.9rem; color: #64748b; margin-bottom: 30px; }

                .form-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                .form-group.full { grid-column: span 2; }
                .form-group label { display: block; font-size: 0.85rem; font-weight: 700; color: #475569; margin-bottom: 8px; text-transform: uppercase; }
                .form-group input, .form-group select { padding: 12px 16px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 1rem; width: 100%; outline: none; transition: border-color 0.2s; }
                .form-group input:focus { border-color: #7c3aed; }

                .info-alert { background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 12px; padding: 15px; display: flex; align-items: center; gap: 15px; margin-bottom: 30px; color: #5b21b6; }
                .info-alert p { margin: 0; font-size: 0.9rem; font-weight: 500; }
                .text-blue { color: #2563eb; font-weight: 700; }

                .input-with-unit { position: relative; }
                .input-with-unit span { position: absolute; right: 15px; top: 12px; font-weight: 800; color: #94a3b8; }

                .upload-grid { display: grid; gap: 15px; }
                .upload-box { display: flex; align-items: center; gap: 20px; padding: 20px; border: 2px dashed #e2e8f0; border-radius: 16px; background: #f8fafc; transition: all 0.2s; }
                .upload-box.active { border-color: #7c3aed; background: #f5f3ff; }
                .upload-box div { flex: 1; }
                .upload-box strong { display: block; color: #1e293b; }
                .upload-box p { margin: 0; font-size: 0.8rem; color: #64748b; }
                .btn-sm { padding: 6px 14px; background: white; border: 1px solid #cbd5e1; border-radius: 6px; font-weight: 700; font-size: 0.8rem; cursor: pointer; }

                .wizard-nav { margin-top: auto; padding-top: 40px; display: flex; justify-content: space-between; }
                .btn-ghost { background: transparent; border: none; font-weight: 700; color: #64748b; display: flex; align-items: center; gap: 8px; cursor: pointer; }
                .btn-solid { background: #7c3aed; color: white; border: none; padding: 14px 30px; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer; box-shadow: 0 4px 6px -1px rgba(124, 58, 237, 0.2); }

                /* SUCCESS VIEW */
                .success-screen { text-align: center; padding: 60px 20px; }
                .success-icon { color: #10b981; margin-bottom: 25px; }
                .ref-card { background: #ecfdf5; border: 1px solid #bbf7d0; padding: 25px; border-radius: 16px; display: inline-block; margin-bottom: 30px; }
                .ref-card p { margin: 0 0 8px 0; font-size: 0.85rem; color: #065f46; font-weight: 600; text-transform: uppercase; }
                .ref-card strong { font-size: 1.5rem; color: #065f46; font-weight: 900; }
                .desc { max-width: 600px; margin: 0 auto 40px; color: #64748b; line-height: 1.7; font-size: 1.05rem; }
                .next-actions { display: flex; justify-content: center; gap: 15px; }
                .btn-primary { background: #7c3aed; color: white; border: none; padding: 14px 30px; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; }
                .btn-secondary { background: white; border: 1px solid #cbd5e1; color: #475569; padding: 14px 30px; border-radius: 12px; font-weight: 700; cursor: pointer; }

                .animated { animation: slideUp 0.4s ease-out; }
                @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default RigRegistration;
