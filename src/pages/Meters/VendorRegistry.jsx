import React, { useState } from 'react';
import { Package, ShieldCheck, FileText, Plus, Search, CheckCircle, Clock, Building2, Globe, PenSquare, BarChart3, ChevronRight, Filter, Download, X, Factory, Award, Calendar, ExternalLink } from 'lucide-react';

const VendorRegistry = () => {
    const [activeTab, setActiveTab] = useState('list');
    const [selectedVendor, setSelectedVendor] = useState(null);

    const [vendors] = useState([
        {
            id: 'V-001',
            name: 'EcoFlow Systems Ltd.',
            models: 3,
            status: 'Approved',
            license: 'RGWA-LIC-2024-01',
            expiry: '2026-12-31',
            hq: 'Ahmedabad, Gujarat',
            rating: '4.8',
            founded: '2010',
            capacity: '50,000 units/year',
            contactEmail: 'regulatory@ecoflow.in',
            website: 'www.ecoflow.in',
            approvedModelsList: ['FM-200', 'FM-500', 'EcoSmart-X']
        },
        {
            id: 'V-002',
            name: 'HydroSmart IoT Solutions',
            models: 1,
            status: 'Pending',
            license: 'RGWA-LIC-2024-05',
            expiry: '2025-06-15',
            hq: 'Bangalore, Karnataka',
            rating: '4.2',
            founded: '2018',
            capacity: '10,000 units/year',
            contactEmail: 'compliance@hydrosmart.io',
            website: 'www.hydrosmart.io',
            approvedModelsList: ['HydroSense-1']
        },
        {
            id: 'V-003',
            name: 'AquaMeasure Precision',
            models: 5,
            status: 'Approved',
            license: 'RGWA-LIC-2023-11',
            expiry: '2025-11-20',
            hq: 'Jaipur, Rajasthan',
            rating: '4.9',
            founded: '2005',
            capacity: '120,000 units/year',
            contactEmail: 'info@aquameasure.com',
            website: 'www.aquameasure.com',
            approvedModelsList: ['AquaMaster', 'FlowGuard', 'Precision-X', 'StreamLine', 'AquaSonic']
        }
    ]);

    const VendorDetailModal = ({ vendor, onClose }) => {
        if (!vendor) return null;

        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <div className="header-brand">
                            <div className="brand-logo">{vendor.name.charAt(0)}</div>
                            <div>
                                <span className="id-badge">{vendor.id}</span>
                                <h2>{vendor.name}</h2>
                                <a href={`https://${vendor.website}`} target="_blank" rel="noreferrer" className="website-link">
                                    {vendor.website} <ExternalLink size={12} />
                                </a>
                            </div>
                        </div>
                        <button className="btn-close" onClick={onClose}><X size={24} /></button>
                    </div>

                    <div className="modal-body">
                        <div className="profile-grid">
                            <div className="profile-section main-info">
                                <h3><Building2 size={18} /> Company Profile</h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>Headquarters</label>
                                        <span>{vendor.hq}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Founded</label>
                                        <span>{vendor.founded}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Mfg. Capacity</label>
                                        <span>{vendor.capacity}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Contact</label>
                                        <span>{vendor.contactEmail}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="profile-section license-info">
                                <h3><ShieldCheck size={18} /> License & Compliance</h3>
                                <div className="license-card">
                                    <div className="lc-row">
                                        <span className="lc-label">License Number</span>
                                        <span className="lc-val mono">{vendor.license}</span>
                                    </div>
                                    <div className="lc-row">
                                        <span className="lc-label">Valid Until</span>
                                        <span className="lc-val">{vendor.expiry}</span>
                                    </div>
                                    <div className="lc-status">
                                        <span className={`status-tag ${vendor.status.toLowerCase()}`}>
                                            {vendor.status === 'Approved' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                            {vendor.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="profile-section models-list-section">
                            <h3><Package size={18} /> Approved Portfolio ({vendor.approvedModelsList.length})</h3>
                            <div className="model-tags">
                                {vendor.approvedModelsList.map(model => (
                                    <span key={model} className="model-tag">
                                        <Award size={14} /> {model}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn-action secondary">View Audit History</button>
                            <button className="btn-action primary">Contact Vendor</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="vendor-registry-v2">
            <div className="page-header">
                <div className="title-area">
                    <h1>Ecosystem Registry</h1>
                    <p>Official repository of authorized water meter manufacturers and licensed vendors</p>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary-v2"><Download size={16} /> Export AVL</button>
                    <button className="btn-primary-v2" onClick={() => setActiveTab('onboarding')}>
                        <Plus size={18} /> New Registration
                    </button>
                </div>
            </div>

            <div className="tabs-container">
                <div className="tabs-list">
                    <button
                        className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
                        onClick={() => setActiveTab('list')}
                    >
                        <Building2 size={16} /> Manufacturer List
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'onboarding' ? 'active' : ''}`}
                        onClick={() => setActiveTab('onboarding')}
                    >
                        <PenSquare size={16} /> Onboarding Portal
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'performance' ? 'active' : ''}`}
                        onClick={() => setActiveTab('performance')}
                    >
                        <BarChart3 size={16} /> Performance Index
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'list' && (
                        <div className="tab-pane active animated">
                            <div className="list-controls-v2">
                                <div className="search-box">
                                    <Search size={18} />
                                    <input type="text" placeholder="Search by Vendor, License or HQ..." />
                                </div>
                                <div className="filter-group">
                                    <div className="filter-chip">Status: All</div>
                                    <div className="filter-chip">Region: All</div>
                                    <button className="btn-filter-icon"><Filter size={16} /></button>
                                </div>
                            </div>

                            <div className="vendor-table-box">
                                <table className="modern-table">
                                    <thead>
                                        <tr>
                                            <th>Vendor Identity</th>
                                            <th>License Status</th>
                                            <th>HQ Location</th>
                                            <th>Portfolio</th>
                                            <th>System Rating</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vendors.map(v => (
                                            <tr key={v.id} onClick={() => setSelectedVendor(v)} className="clickable-row">
                                                <td>
                                                    <div className="vendor-identity">
                                                        <div className="v-avatar">{v.name.charAt(0)}</div>
                                                        <div className="v-names">
                                                            <strong>{v.name}</strong>
                                                            <span>Reg ID: {v.id}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="license-col">
                                                        <span className={`status-tag ${v.status.toLowerCase()}`}>
                                                            {v.status === 'Approved' ? <CheckCircle size={10} /> : <Clock size={10} />}
                                                            {v.status}
                                                        </span>
                                                        <span className="lic-no">{v.license}</span>
                                                    </div>
                                                </td>
                                                <td>{v.hq}</td>
                                                <td>{v.models} Approved Models</td>
                                                <td>
                                                    <div className="rating-pill">
                                                        <span>★</span> {v.rating}
                                                    </div>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn-icon-v2"
                                                        onClick={(e) => { e.stopPropagation(); setSelectedVendor(v); }}
                                                    >
                                                        <ChevronRight size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'onboarding' && (
                        <div className="tab-pane active animated">
                            <div className="onboarding-wizard">
                                <div className="wizard-intro">
                                    <h2>Manufacturer Onboarding Portal</h2>
                                    <p>Follow the techno-legal framework to register as an authorized RGWA vendor.</p>
                                </div>
                                <div className="wizard-steps-grid">
                                    <div className="w-step">
                                        <div className="w-step-no">01</div>
                                        <div className="w-step-body">
                                            <h4>Legal Entity Data</h4>
                                            <p>CIN, GSTIN, and Manufacturer PAN details</p>
                                        </div>
                                    </div>
                                    <div className="w-step">
                                        <div className="w-step-no">02</div>
                                        <div className="w-step-body">
                                            <h4>Certification Vault</h4>
                                            <p>BIS License (IS 779/ISO 4064) & NABL Reports</p>
                                        </div>
                                    </div>
                                    <div className="w-step processing">
                                        <div className="w-step-no">03</div>
                                        <div className="w-step-body">
                                            <h4>Infrastructure Audit</h4>
                                            <p>Submit Manufacturing & Calibration Lab specs</p>
                                        </div>
                                    </div>
                                    <div className="w-step disabled">
                                        <div className="w-step-no">04</div>
                                        <div className="w-step-body">
                                            <h4>Licensing Fee</h4>
                                            <p>Payment of performance bank guarantees</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="wizard-action">
                                    <button className="btn-wizard-next">Initiate Registration Sequence</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'performance' && (
                        <div className="tab-pane active animated">
                            <div className="archive-placeholder">
                                <BarChart3 size={32} />
                                <h3>Vendor Performance Index</h3>
                                <p>Analytics on meter failure rates, data uptime, and field response times.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {selectedVendor && <VendorDetailModal vendor={selectedVendor} onClose={() => setSelectedVendor(null)} />}

            <style jsx>{`
                .vendor-registry-v2 { padding: 30px; background: #f8fafc; min-height: 100vh; font-family: 'Inter', sans-serif; }
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

                .list-controls-v2 { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
                .search-box { display: flex; align-items: center; gap: 12px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 18px; border-radius: 12px; width: 350px; }
                .search-box input { border: none; background: transparent; outline: none; width: 100%; font-size: 0.95rem; }
                
                .filter-group { display: flex; gap: 10px; align-items: center; }
                .filter-chip { background: #eff6ff; color: #2563eb; padding: 6px 14px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; border: 1px solid #dbeafe; }
                .btn-filter-icon { width: 34px; height: 34px; border-radius: 10px; border: 1px solid #e2e8f0; background: white; display: flex; align-items: center; justify-content: center; color: #64748b; cursor: pointer; }

                .modern-table { width: 100%; border-collapse: collapse; }
                .modern-table th { text-align: left; padding: 15px; background: #f8fafc; color: #64748b; font-size: 0.75rem; text-transform: uppercase; font-weight: 800; border-bottom: 2px solid #e2e8f0; }
                .modern-table td { padding: 20px 15px; border-bottom: 1px solid #f1f5f9; font-size: 0.95rem; }
                .clickable-row { cursor: pointer; transition: background 0.1s; }
                .clickable-row:hover { background: #f8fafc; }

                .vendor-identity { display: flex; align-items: center; gap: 12px; }
                .v-avatar { width: 44px; height: 44px; background: #e0e7ff; color: #3730a3; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; }
                .v-names { display: flex; flex-direction: column; }
                .v-names strong { color: #1e293b; font-size: 0.95rem; }
                .v-names span { font-size: 0.75rem; color: #94a3b8; font-weight: 600; }

                .license-col { display: flex; flex-direction: column; gap: 4px; }
                .status-tag { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; width: fit-content; }
                .status-tag.approved { background: #dcfce7; color: #166534; }
                .status-tag.pending { background: #fffbeb; color: #9a3412; }
                .lic-no { font-size: 0.75rem; color: #64748b; font-family: monospace; }

                .rating-pill { background: #fffbeb; border: 1px solid #fde68a; color: #92400e; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 800; width: fit-content; }
                .rating-pill span { color: #f59e0b; font-size: 1rem; line-height: 0; position: relative; top: 2px; }

                .btn-icon-v2 { width: 32px; height: 32px; border-radius: 8px; border: none; background: #f8fafc; color: #64748b; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
                .btn-icon-v2:hover { background: #eff6ff; color: #2563eb; }

                /* Modal Styles */
                .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); display: flex; justify-content: center; align-items: center; z-index: 1000; animation: fadeIn 0.2s ease-out; }
                .modal-content { background: white; width: 800px; max-width: 95vw; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: 1px solid #e2e8f0; display: flex; flex-direction: column; max-height: 90vh; }

                .modal-header { padding: 25px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: flex-start; background: #fff; }
                .header-brand { display: flex; gap: 15px; align-items: center; }
                .brand-logo { width: 50px; height: 50px; background: #1e293b; color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 800; }
                .id-badge { background: #f1f5f9; color: #64748b; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-family: monospace; font-weight: 700; margin-bottom: 4px; display: inline-block; }
                .modal-header h2 { margin: 0; font-size: 1.4rem; color: #1e293b; }
                .website-link { display: flex; align-items: center; gap: 4px; color: #3b82f6; text-decoration: none; font-size: 0.85rem; font-weight: 600; margin-top: 4px; }

                .btn-close { border: none; background: transparent; color: #94a3b8; cursor: pointer; padding: 5px; border-radius: 8px; transition: all 0.2s; }
                .btn-close:hover { background: #f1f5f9; color: #ef4444; }

                .modal-body { padding: 30px; overflow-y: auto; }
                .profile-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; }
                
                .profile-section h3 { font-size: 0.95rem; color: #475569; margin: 0 0 15px 0; display: flex; align-items: center; gap: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }

                .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
                .info-item { display: flex; flex-direction: column; gap: 4px; }
                .info-item label { font-size: 0.75rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; }
                .info-item span { font-size: 0.95rem; color: #1e293b; font-weight: 600; }

                .license-card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 12px; }
                .lc-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.9rem; }
                .lc-label { color: #64748b; }
                .lc-val { font-weight: 600; color: #1e293b; }
                .lc-val.mono { font-family: monospace; }
                .lc-status { margin-top: 15px; pt-3 border-top: 1px solid #e2e8f0 text-align: right; }

                .models-list-section { background: #fafafa; padding: 20px; border-radius: 12px; border: 1px dashed #e2e8f0; margin-bottom: 25px; }
                .model-tags { display: flex; flex-wrap: wrap; gap: 10px; }
                .model-tag { display: inline-flex; align-items: center; gap: 6px; background: white; border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; color: #334155; font-weight: 600; }

                .modal-footer { display: flex; justify-content: flex-end; gap: 12px; padding-top: 10px; border-top: 1px solid #f1f5f9; }
                .btn-action { padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; border: none; font-size: 0.9rem; transition: all 0.2s; }
                .btn-action.secondary { background: white; border: 1px solid #e2e8f0; color: #475569; }
                .btn-action.secondary:hover { background: #f8fafc; color: #1e293b; }
                .btn-action.primary { background: #1e293b; color: white; }
                .btn-action.primary:hover { background: #0f172a; }

                /* Wizard & Other Placeholders */
                .onboarding-wizard { max-width: 800px; margin: 0 auto; padding: 20px 0; }
                .wizard-intro { text-align: center; margin-bottom: 40px; }
                .wizard-intro h2 { font-size: 1.5rem; color: #1e293b; margin-bottom: 8px; }
                .wizard-intro p { color: #64748b; }
                .wizard-steps-grid { display: grid; gap: 15px; margin-bottom: 40px; }
                .w-step { display: flex; align-items: center; gap: 20px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; transition: all 0.2s; }
                .w-step-no { width: 40px; height: 40px; border-radius: 50%; background: #e2e8f0; color: #64748b; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; }
                .w-step-body h4 { margin: 0 0 4px 0; color: #1e293b; font-size: 1.1rem; }
                .w-step-body p { margin: 0; color: #64748b; font-size: 0.9rem; }
                .w-step.processing { border-color: #2563eb; background: #eff6ff; }
                .w-step.processing .w-step-no { background: #2563eb; color: white; }
                .w-step.disabled { opacity: 0.5; cursor: not-allowed; }
                .wizard-action { display: flex; justify-content: center; }
                .btn-wizard-next { padding: 15px 40px; background: #1e293b; color: white; border: none; border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer; box-shadow: 0 10px 15px -3px rgba(30, 41, 59, 0.2); }
                .archive-placeholder { text-align: center; padding: 80px 40px; color: #94a3b8; }
                .archive-placeholder h3 { color: #475569; margin-top: 20px; }

                .animated { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default VendorRegistry;
