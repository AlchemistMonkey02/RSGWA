import React, { useState } from 'react';
import {
    Package, CheckCircle, AlertTriangle, Users, LayoutDashboard, Database,
    Plus, Search, Download, Factory, Globe, Award, Calendar, MapPin,
    Activity, ShieldCheck, ChevronRight, X, Briefcase, Ruler, FileText, Info, PenSquare,
    Settings, ExternalLink, Smartphone, BadgeCheck, UploadCloud, Cpu,
    Battery, Shield, Target, Signal, Thermometer, Waves, Clock
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';

const MOCK_PERFORMANCE_DATA = [
    { month: 'Jul', units: 45 },
    { month: 'Aug', units: 52 },
    { month: 'Sep', units: 48 },
    { month: 'Oct', units: 70 },
    { month: 'Nov', units: 65 },
    { month: 'Dec', units: 85 },
];

const MODEL_TECHNICAL_SPECS = {
    'MOD-DX1': {
        battery: '12V Lithium (10-yr life)',
        protection: 'IP68 (Hermetically Sealed)',
        precision: 'Class 2 / R250',
        iot: 'Internal NB-IoT with e-SIM',
        material: 'Stainless Steel 316',
        temp: '-10°C to 70°C',
        pressure: 'PN16',
        sampling: 'Every 5 seconds'
    },
    'MOD-DX2': {
        battery: 'External Power + 8h Backup',
        protection: 'IP67 (Industrial Grade)',
        precision: 'Class 1 / R400',
        iot: 'GPRS/4G Modular Plug',
        material: 'Cast Iron + Epoxy',
        temp: '0°C to 60°C',
        pressure: 'PN25',
        sampling: 'Continuous Real-time'
    },
    'M-ACC-EMF': {
        accuracy: '±0.5% of Full Scale',
        liner: 'PTFE',
        electrodes: 'SS316L',
        protection: 'IP68 (Sensor), IP66 (Display)',
        power: 'Battery Operated',
        telemetry: 'GSM (Telemetry) Enabled',
        pressure: '16 kg/cm²',
        temp: '100°C Max',
        display: 'Integral 16×2 LCD',
        compliance: 'CGWA Compliant'
    },
    'M-ACC-DWLR': {
        sensor: 'Digital Piezometer',
        material: 'SS304 Stainless Steel',
        cable: '50m / 75m Waterproof',
        power: 'Battery with Solar Support',
        telemetry: 'GSM / Cloud Synced',
        protection: 'IP68 (Sensor), IP66 (Display)',
        display: '16×2 LCD Output',
        usage: 'Borewell Monitoring'
    }
};

const VendorRegistry = ({ vendor, allVendors = [], models = [], units = [], activities = [], onAddModel, onAddStaff, onUpdateStaff, onRegisterUnit, onUpdateStatus, onLogin, isAdmin, role, globalSearch = '' }) => {
    const [activeTab, setActiveTab] = useState(role === 'vendor' || role === 'applicant' ? 'erp-dash' : 'list');
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);

    const filteredUnits = units.filter(un =>
        un.serialNumber?.toLowerCase().includes(globalSearch.toLowerCase()) ||
        un.applicantName?.toLowerCase().includes(globalSearch.toLowerCase()) ||
        un.modelId?.toLowerCase().includes(globalSearch.toLowerCase())
    );

    const baseFiltered = allVendors.filter(v =>
        v.name?.toLowerCase().includes(globalSearch.toLowerCase()) ||
        v.id?.toLowerCase().includes(globalSearch.toLowerCase()) ||
        v.gstin?.toLowerCase().includes(globalSearch.toLowerCase())
    );

    const filteredVendors = (role === 'admin' || role === 'officer')
        ? baseFiltered
        : baseFiltered.filter(v => v.id === vendor?.id);

    // ERP Sub-Views
    const ERPDashboard = () => (
        <div className="erp-dash-container">
            <div className="erp-stats-grid">
                <div className="erp-stat-card">
                    <div className="erp-stat-icon blue"><Package size={24} /></div>
                    <div className="erp-stat-info">
                        <h3>{models.length}</h3>
                        <p>Approved Models</p>
                    </div>
                </div>
                <div className="erp-stat-card">
                    <div className="erp-stat-icon green"><CheckCircle size={24} /></div>
                    <div className="erp-stat-info">
                        <h3>{units.length}</h3>
                        <p>Active Units</p>
                    </div>
                </div>
                <div className="erp-stat-card">
                    <div className="erp-stat-icon orange"><AlertTriangle size={24} /></div>
                    <div className="erp-stat-info">
                        <h3>2</h3>
                        <p>Health Alerts</p>
                    </div>
                </div>
                <div className="erp-stat-card">
                    <div className="erp-stat-icon purple"><Users size={24} /></div>
                    <div className="erp-stat-info">
                        <h3>{vendor?.staff?.length || 0}</h3>
                        <p>Team Members</p>
                    </div>
                </div>
            </div>

            <div className="erp-main-grid">
                <div className="erp-chart-box">
                    <h4>Monthly Supply Performance</h4>
                    <div style={{ height: '220px', width: '100%', marginTop: '20px' }}>
                        <ResponsiveContainer>
                            <AreaChart data={MOCK_PERFORMANCE_DATA}>
                                <defs>
                                    <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                />
                                <RechartsTooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="units"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorUnits)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="erp-list-box">
                    <div className="box-header">
                        <h4>Recent Activity</h4>
                        <button className="btn-text">View All</button>
                    </div>
                    <div className="activity-feed">
                        {activities.length > 0 ? activities.map(act => (
                            <div key={act.id} className="feed-item">
                                <div className={`feed-icon ${act.status === 'success' ? 'blue' : act.status === 'warning' ? 'orange' : 'green'}`}>
                                    {act.type === 'model' ? <Award size={14} /> : act.type === 'staff' ? <Users size={14} /> : <Package size={14} />}
                                </div>
                                <div className="feed-content">
                                    <strong>{act.title}</strong>
                                    <p>{act.desc}</p>
                                    <span className="time">{act.time}</span>
                                </div>
                            </div>
                        )) : (
                            <p className="p-20 text-center color-slate-400">No recent activities</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const ModelsCatalog = () => {
        const [showForm, setShowForm] = useState(false);

        return (
            <div className="erp-models">
                <div className="view-header">
                    <div className="title-grp">
                        <h3>Authorized Meter Models</h3>
                        <p>Authorized technical models approved for deployment in Rajasthan.</p>
                    </div>
                    <button className="btn-primary-v2" onClick={() => setShowForm(true)}><Plus size={18} /> New Type Approval Request</button>
                </div>

                {showForm && (
                    <div className="model-request-form-v3 animatedSlideIn">
                        <div className="f-header">
                            <h4>Hardware Certification Request</h4>
                            <button className="btn-close-sm" onClick={() => setShowForm(false)}><X size={18} /></button>
                        </div>
                        <div className="f-body grid-2">
                            <div className="input-box"><label>Model Name</label><input type="text" id="m_name" placeholder="e.g. UltraFlow X1" /></div>
                            <div className="input-box"><label>Technology</label><select id="m_tech"><option>Ultrasonic</option><option>Electromagnetic</option></select></div>
                            <div className="input-box"><label>Pipe Size (mm)</label><input type="text" id="m_size" placeholder="e.g. 50, 80, 100" /></div>
                            <div className="input-box"><label>IoT Comms</label><select id="m_iot"><option>NB-IoT</option><option>LoRaWAN</option><option>GPRS</option></select></div>
                            <div className="input-box full"><label>NABL Test Report (PDF)</label><div className="pdf-upload"><UploadCloud size={16} /> Upload Certificate</div></div>
                            <button className="btn-submit-v2-full" onClick={() => {
                                const name = document.getElementById('m_name').value;
                                const tech = document.getElementById('m_tech').value;
                                const size = document.getElementById('m_size').value;
                                if (name && size) {
                                    onAddModel({ vendorId: vendor.id, name, tech, size });
                                    setShowForm(false);
                                }
                            }}>Submit for Government Scrutiny</button>
                        </div>
                    </div>
                )}

                <div className="models-grid">
                    {models.length > 0 ? models.map(m => (
                        <div key={m.id} className="model-card-v3 animated">
                            <div className="mc-header">
                                <div className="mc-icon-box">
                                    {m.tech === 'Ultrasonic' ? <Activity size={24} /> : <Database size={24} />}
                                </div>
                                <span className={`model-status ${m.status?.toLowerCase() || 'approved'}`}>
                                    {m.status || 'Approved'}
                                </span>
                            </div>
                            <div className="mc-content">
                                <h4>{m.name}</h4>
                                <span className="m-id-tag">REF: {m.id}</span>

                                <div className="model-specs-v2">
                                    <div className="spec-pill">
                                        <Cpu size={14} />
                                        <span>{m.tech}</span>
                                    </div>
                                    <div className="spec-pill">
                                        <Ruler size={14} />
                                        <span>{m.size}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mc-footer">
                                <button className="btn-mc-link" onClick={() => alert('Downloading technical datasheet for ' + m.name)}>
                                    Technical Datasheet <ExternalLink size={14} />
                                </button>
                                <button className="btn-mc-settings" onClick={() => setSelectedModel(m)}><Settings size={16} /></button>
                            </div>
                        </div>
                    )) : (
                        <div className="empty-state-card full-width">
                            <Package size={48} />
                            <h3>No Approved Models</h3>
                            <p>You haven't registered any meter models yet. Contact RGWA for technology authorization.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const InventoryTracking = () => {
        const [showUnitForm, setShowUnitForm] = useState(false);

        return (
            <div className="erp-inventory">
                <div className="view-header">
                    <div className="title-grp">
                        <h3>Unit Inventory & Traceability</h3>
                        <p>Track individual meter units from manufacturing to deployment.</p>
                    </div>
                    <div className="header-actions">
                        <button className="btn-primary-v2" onClick={() => setShowUnitForm(true)}><Plus size={18} /> Register New Unit</button>
                    </div>
                </div>

                {showUnitForm && (
                    <div className="model-request-form-v3 animatedSlideIn" style={{ borderLeft: '4px solid #10b981' }}>
                        <div className="f-header">
                            <h4>New Unit Digital Registration</h4>
                            <button className="btn-close-sm" onClick={() => setShowUnitForm(false)}><X size={18} /></button>
                        </div>
                        <div className="f-body grid-2">
                            <div className="input-box"><label>Serial Number</label><input type="text" id="u_serial" placeholder="FM-2025-XXXX" /></div>
                            <div className="input-box">
                                <label>Model Selection</label>
                                <select id="u_model">
                                    {models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                </select>
                            </div>
                            <div className="input-box"><label>Manufacturing Date</label><input type="date" id="u_mfg" /></div>
                            <div className="input-box"><label>Calibration Validity (Years)</label><input type="number" id="u_cal" defaultValue="1" /></div>
                            <button className="btn-submit-v2-full" style={{ background: '#10b981' }} onClick={() => {
                                const serialNumber = document.getElementById('u_serial').value;
                                const modelId = document.getElementById('u_model').value;
                                if (serialNumber) {
                                    onRegisterUnit({
                                        serialNumber,
                                        modelId,
                                        vendorId: vendor.id,
                                        make: vendor.name,
                                        status: 'In Stock',
                                        calibrationExp: '2025-12-01'
                                    });
                                    setShowUnitForm(false);
                                }
                            }}>Generate Digital Twin</button>
                        </div>
                    </div>
                )}

                <div className="inventory-controls">
                    <div className="search-bar">
                        <Search size={16} />
                        <input type="text" placeholder="Search serial number..." />
                    </div>
                    <select className="filter-select">
                        <option>All Statuses</option>
                        <option>Assigned</option>
                        <option>Unassigned</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                    <button className="btn-secondary-v2" onClick={() => alert('Exporting batch inventory as CSV...')}>
                        <Download size={16} /> Export Batch CSV
                    </button>
                </div>

                <table className="modern-table">
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th>Model</th>
                            <th>Client / Site</th>
                            <th>Status</th>
                            <th>Calibration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUnits.length > 0 ? filteredUnits.map(un => (
                            <tr key={un.id}>
                                <td><strong>{un.serialNumber}</strong></td>
                                <td>{un.modelId}</td>
                                <td>{un.applicantName || 'Unassigned'}</td>
                                <td><span className={`status-badge-sm ${un.status.toLowerCase().replace(' ', '-')}`}>{un.status}</span></td>
                                <td>{un.calibrationExp}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                        <Database size={32} style={{ opacity: 0.5 }} />
                                        <span>No unit inventory records found.</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    };

    const StaffManagement = () => {
        const [showStaffForm, setShowStaffForm] = useState(false);
        const [editingStaff, setEditingStaff] = useState(null);

        const handleFormOpen = (staff = null) => {
            setEditingStaff(staff);
            setShowStaffForm(true);
        };

        return (
            <div className="erp-staff">
                <div className="view-header">
                    <div className="title-grp">
                        <h3>Technician & Field Staff</h3>
                        <p>Manage authorized personnel for installation and maintenance.</p>
                    </div>
                    <button className="btn-primary-v2" onClick={() => handleFormOpen()}><Plus size={18} /> Register Staff</button>
                </div>

                {showStaffForm && (
                    <div className="model-request-form-v3 animatedSlideIn" style={{ borderLeft: '4px solid #3b82f6' }}>
                        <div className="f-header">
                            <h4>{editingStaff ? 'Edit Staff Profile' : 'Authorized Personnel Onboarding'}</h4>
                            <button className="btn-close-sm" onClick={() => { setShowStaffForm(false); setEditingStaff(null); }}><X size={18} /></button>
                        </div>
                        <div className="f-body grid-2">
                            <div className="input-box">
                                <label>Full Name</label>
                                <input type="text" id="s_name" defaultValue={editingStaff?.name || ''} placeholder="John Doe" />
                            </div>
                            <div className="input-box">
                                <label>Role</label>
                                <select id="s_role" defaultValue={editingStaff?.role || 'Installation Engineer'}>
                                    <option>Installation Engineer</option>
                                    <option>Maintenance Technician</option>
                                    <option>Quality Auditor</option>
                                </select>
                            </div>
                            <div className="input-box">
                                <label>Mobile Number</label>
                                <input type="text" id="s_phone" defaultValue={editingStaff?.phone || ''} placeholder="9876543210" />
                            </div>
                            <div className="input-box"><label>ID Proof (Aadhar/Voter)</label><input type="text" placeholder="XXXX-XXXX-XXXX" /></div>
                            <button className="btn-submit-v2-full" onClick={() => {
                                const name = document.getElementById('s_name').value;
                                const role = document.getElementById('s_role').value;
                                const phone = document.getElementById('s_phone').value;
                                if (name && phone) {
                                    if (editingStaff) {
                                        onUpdateStaff(vendor.id, editingStaff.id, { name, role, phone });
                                    } else {
                                        onAddStaff(vendor.id, { name, role, phone });
                                    }
                                    setShowStaffForm(false);
                                    setEditingStaff(null);
                                }
                            }}>{editingStaff ? 'Update Profile' : 'Authorize & Register'}</button>
                        </div>
                    </div>
                )}

                <div className="staff-grid-v3">
                    {vendor?.staff?.length > 0 ? vendor.staff.map((s, i) => (
                        <div key={s.id || i} className="staff-card-v3">
                            <div className="sc-avatar">{s.name.charAt(0)}</div>
                            <div className="sc-info">
                                <h4>{s.name}</h4>
                                <span className="sc-role">{s.role}</span>
                                <div className="sc-meta">
                                    <span><Smartphone size={12} /> {s.phone}</span>
                                    <span><BadgeCheck size={12} className="text-green-500" /> Authorized</span>
                                </div>
                            </div>
                            <button className="btn-edit-v3" onClick={() => handleFormOpen(s)}><PenSquare size={16} /></button>
                        </div>
                    )) : (
                        <div className="empty-state-card full-width">
                            <Users size={48} />
                            <h3>No Registered Staff</h3>
                            <p>Add your authorized installers and field engineers to assign jobs.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };


    const OnboardingPortal = () => {
        const [isSubmitted, setIsSubmitted] = useState(false);
        const [regRef, setRegRef] = useState('');

        const handleOnboard = (e) => {
            e.preventDefault();
            const ref = 'REG-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            setRegRef(ref);
            setIsSubmitted(true);
        };

        if (isSubmitted) {
            return (
                <div className="onboarding-success animated">
                    <CheckCircle size={60} className="icon-green" />
                    <h2>Application Submitted</h2>
                    <p>Your manufacturer authorization request has been received. Our technical team will review your NABL certifications and manufacturing facility details.</p>
                    <div className="ref-number">{regRef}</div>
                    <button className="btn-primary-v2" onClick={() => setIsSubmitted(false)}>Register Another Entity</button>
                </div>
            );
        }

        return (
            <div className="onboarding-portal animated">
                <div className="onboarding-welcome">
                    <h2>Manufacturer Authorization</h2>
                    <p>Apply for technical authorization to supply and install smart water flow meters in Rajasthan.</p>
                </div>

                <form className="onboarding-form-box" onSubmit={handleOnboard}>
                    <div className="form-header">
                        <h3><Globe size={24} /> 1. Corporate Identity</h3>
                        <p>Basic legal and operational details of the manufacturing entity.</p>
                    </div>

                    <div className="form-grid-v2">
                        <div className="input-grp">
                            <label>Manufacturer Name</label>
                            <input type="text" placeholder="Legal Entity Name" required />
                        </div>
                        <div className="input-grp">
                            <label>GSTIN</label>
                            <input type="text" placeholder="08XXXXXXXXXXXXX" required />
                        </div>
                        <div className="input-grp">
                            <label>Headquarters Location</label>
                            <input type="text" placeholder="City, State" required />
                        </div>
                        <div className="input-grp">
                            <label>Technical Contact</label>
                            <input type="email" placeholder="tech@company.com" required />
                        </div>
                        <div className="input-grp full-width">
                            <label>Manufacturing Facility Address (Rajasthan Unit if any)</label>
                            <input type="text" placeholder="Full Address" />
                        </div>
                    </div>

                    <div className="form-header" style={{ marginTop: '40px' }}>
                        <h3><ShieldCheck size={24} /> 2. Quality & Compliance</h3>
                        <p>Mandatory certifications for Type Approval.</p>
                    </div>

                    <div className="form-grid-v2">
                        <div className="input-grp">
                            <label>NABL Laboratory Report No.</label>
                            <input type="text" placeholder="Report Reference" required />
                        </div>
                        <div className="input-grp">
                            <label>ISO 4064 Compliance Verifier</label>
                            <input type="text" placeholder="Auditor Name" required />
                        </div>
                    </div>

                    <div className="form-footer">
                        <div className="compliance-note">
                            <Info size={16} /> Data will be verified against GSTN and NABL databases.
                        </div>
                        <button type="submit" className="btn-primary-v2">Submit Authorization Request</button>
                    </div>
                </form>
            </div>
        );
    };


    const GovernmentRegistryView = () => {
        const [govTab, setGovTab] = useState('list');

        return (
            <div className="gov-registry-container">
                <div className="gov-header-tabs">
                    <button className={govTab === 'list' ? 'active' : ''} onClick={() => setGovTab('list')}>
                        <Users size={18} /> Authorized Registry
                    </button>
                    <button className={govTab === 'portal' ? 'active' : ''} onClick={() => setGovTab('portal')}>
                        <Globe size={18} /> Authorization Portal
                    </button>
                </div>

                <div className="gov-content">
                    {govTab === 'list' ? (
                        <div className="gov-list-view animated">
                            <div className="view-header">
                                <div className="title-area">
                                    <h1>Ecosystem Registry</h1>
                                    <p>Official list of authorized water flow meter vendors and manufacturers.</p>
                                </div>
                                <div className="header-actions">
                                    <button className="btn-secondary-v2"><Download size={16} /> Export Registry</button>
                                </div>
                            </div>
                            <table className="modern-table">
                                <thead>
                                    <tr>
                                        <th>Identity</th>
                                        <th>Status</th>
                                        <th>GSTIN/CIN</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredVendors.map(v => (
                                        <tr key={v.id}>
                                            <td>
                                                <strong>{v.name}</strong>
                                                <div className="v-id-small">{v.id}</div>
                                            </td>
                                            <td><span className={`status-badge ${v.status?.toLowerCase()}`}>{v.status}</span></td>
                                            <td><small className="font-mono">{v.gstin || 'N/A'}</small></td>
                                            <td>
                                                <div className="table-actions">
                                                    <button className="btn-icon-v2" onClick={() => setSelectedVendor(v)}><Info size={16} /></button>
                                                    {isAdmin && v.status === 'Pending' && (
                                                        <button
                                                            className="btn-action-approve"
                                                            onClick={() => onUpdateStatus(v.id, 'Approved')}
                                                        >
                                                            Approve Vendor
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <OnboardingPortal />
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="vendor-registry-v3">
            {role === 'vendor' || role === 'applicant' ? (
                <div className="erp-wrapper">
                    <div className="erp-sidebar">
                        <div className="vendor-profile-box">
                            <div className="v-logo-large">{vendor?.name?.charAt(0)}</div>
                            <h4>{vendor?.name}</h4>
                            {vendor?.tagline && <p className="v-tagline">"{vendor.tagline}"</p>}
                            <span className="v-id-tag">ID: {vendor?.id}</span>
                        </div>
                        <nav className="erp-nav">
                            <button className={activeTab === 'erp-dash' ? 'active' : ''} onClick={() => setActiveTab('erp-dash')}><LayoutDashboard size={18} /> Dashboard</button>
                            <button className={activeTab === 'erp-models' ? 'active' : ''} onClick={() => setActiveTab('erp-models')}><Package size={18} /> My Models</button>
                            <button className={activeTab === 'erp-inventory' ? 'active' : ''} onClick={() => setActiveTab('erp-inventory')}><Database size={18} /> Serial Inventory</button>
                            <button className={activeTab === 'erp-staff' ? 'active' : ''} onClick={() => setActiveTab('erp-staff')}><Users size={18} /> Staff Roles</button>
                        </nav>
                        <div className="compliance-status">
                            <ShieldCheck size={16} /> Authorized Manufacturer
                        </div>
                    </div>
                    <div className="erp-content">
                        {activeTab === 'erp-dash' && <ERPDashboard />}
                        {activeTab === 'erp-models' && <ModelsCatalog />}
                        {activeTab === 'erp-inventory' && <InventoryTracking />}
                        {activeTab === 'erp-staff' && <StaffManagement />}
                    </div>
                </div>
            ) : (
                <GovernmentRegistryView />
            )}

            {selectedVendor && (
                <div className="modal-overlay" onClick={() => setSelectedVendor(null)}>
                    <div className="vendor-modal animated" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="v-profile">
                                <div className="v-logo-modal">{selectedVendor.name.charAt(0)}</div>
                                <div>
                                    <h2>{selectedVendor.name}</h2>
                                    <span className="v-id-tag-modal">{selectedVendor.id}</span>
                                </div>
                            </div>
                            <button className="close-btn" onClick={() => setSelectedVendor(null)}><X size={24} /></button>
                        </div>
                        <div className="modal-body">
                            <div className="info-grid">
                                <div className="info-item">
                                    <label>Location</label>
                                    <p>{selectedVendor.location}</p>
                                </div>
                                <div className="info-item">
                                    <label>GST Number</label>
                                    <p>{selectedVendor.gstin || 'N/A'}</p>
                                </div>
                                <div className="info-item">
                                    <label>CIN</label>
                                    <p>{selectedVendor.cin || 'N/A'}</p>
                                </div>
                                <div className="info-item">
                                    <label>Quality Rating</label>
                                    <div className="rating-pill">★ {selectedVendor.rating}</div>
                                </div>
                                {selectedVendor.iso && (
                                    <div className="info-item">
                                        <label>Certification</label>
                                        <div className="iso-badge"><Award size={12} /> {selectedVendor.iso}</div>
                                    </div>
                                )}
                                {selectedVendor.experience && (
                                    <div className="info-item">
                                        <label>Experience</label>
                                        <p>{selectedVendor.experience}</p>
                                    </div>
                                )}
                                {selectedVendor.rd && (
                                    <div className="info-item">
                                        <label>R&D Capability</label>
                                        <div className="rd-badge"><Cpu size={12} /> {selectedVendor.rd}</div>
                                    </div>
                                )}
                                {selectedVendor.address && (
                                    <div className="info-item full">
                                        <label>Corporate Address</label>
                                        <p style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>{selectedVendor.address}</p>
                                    </div>
                                )}
                                {selectedVendor.categories && (
                                    <div className="info-item full">
                                        <label>Service Categories</label>
                                        <div className="cat-tags">
                                            {selectedVendor.categories.map(cat => <span key={cat} className="cat-tag">{cat}</span>)}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="staff-section">
                                <h3><Users size={18} /> Authorized Staff</h3>
                                <div className="staff-list-modal">
                                    {selectedVendor.staff?.map((s, i) => (
                                        <div key={i} className="staff-card-v2">
                                            <div>
                                                <strong>{s.name}</strong>
                                                <p>{s.role}</p>
                                            </div>
                                            <span className="phone-v">{s.phone}</span>
                                        </div>
                                    ))}
                                    {!selectedVendor.staff?.length && <p className="empty-staff">No authorized staff listed.</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedModel && (
                <div className="modal-overlay" onClick={() => setSelectedModel(null)}>
                    <div className="premium-tech-modal animatedPop" onClick={e => e.stopPropagation()}>
                        <div className="tech-header">
                            <div className="tech-brand">
                                <div className="tech-icon-circle">
                                    {selectedModel.tech === 'Ultrasonic' ? <Activity size={32} /> : <Database size={32} />}
                                </div>
                                <div className="tech-title-block">
                                    <h2>{selectedModel.name}</h2>
                                    <div className="tech-meta-row">
                                        <span className="ref-badge">REF: {selectedModel.id}</span>
                                        <span className="auth-pill">AUTHORIZED UNIT</span>
                                    </div>
                                </div>
                            </div>
                            <button className="tech-close-btn" onClick={() => setSelectedModel(null)}><X size={20} /></button>
                        </div>

                        <div className="tech-body">
                            <div className="tech-specs-container">
                                {Object.entries(MODEL_TECHNICAL_SPECS[selectedModel.id] || {}).map(([key, val]) => (
                                    <div key={key} className="tech-spec-card">
                                        <div className="spec-label-row">
                                            {key === 'battery' && <Battery size={14} color="#3b82f6" />}
                                            {key === 'protection' && <Shield size={14} color="#10b981" />}
                                            {key === 'precision' && <Target size={14} color="#f59e0b" />}
                                            {key === 'iot' && <Signal size={14} color="#8b5cf6" />}
                                            {key === 'material' && <Briefcase size={14} color="#6366f1" />}
                                            {key === 'temp' && <Thermometer size={14} color="#ef4444" />}
                                            {key === 'pressure' && <Waves size={14} color="#06b6d4" />}
                                            {key === 'sampling' && <Clock size={14} color="#f43f5e" />}
                                            <label>{key}</label>
                                        </div>
                                        <p>{val}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="tech-innovation-bar">
                                <div className="cert-seal">
                                    <BadgeCheck size={28} />
                                    <div className="cert-info">
                                        <strong>NABL CERTIFIED HARDWARE</strong>
                                        <p>Statutory Compliance: RGWA Standard-2024.V3</p>
                                    </div>
                                </div>
                                <p className="tech-disclaimer">Telemetry data is captured every 5 mins and transmitted via encrypted NB-IoT tunnels to the Hub.</p>
                            </div>
                        </div>

                        <div className="tech-footer">
                            <button className="btn-tech-secondary" onClick={() => setSelectedModel(null)}>Dismiss Catalog</button>
                            <button className="btn-tech-primary" onClick={() => alert('Accessing secure document terminal...')}>
                                <div className="btn-content">
                                    <span>Technical Manual v4.2</span>
                                    <small>Secure PDF (2.4MB)</small>
                                </div>
                                <Download size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .vendor-registry-v3 { height: 100%; display: flex; flex-direction: column; background: #f8fafc; overflow: hidden; }

                /* ERP Layout */
                .erp-wrapper { display: flex; height: 100%; overflow: hidden; }
                
                .erp-sidebar { 
                    width: 280px; 
                    background: white; 
                    border-right: 1px solid #e2e8f0; 
                    display: flex; 
                    flex-direction: column; 
                    padding: 30px 20px;
                }
                
                .vendor-profile-box { text-align: center; margin-bottom: 40px; }
                .v-logo-large { 
                    width: 80px; 
                    height: 80px; 
                    background: #f1f5f9; 
                    border-radius: 24px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-size: 2.5rem; 
                    font-weight: 800; 
                    margin: 0 auto 15px; 
                    color: #2563eb; 
                    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
                }
                .v-profile-box h4 { margin: 0; color: #0f172a; font-size: 1.1rem; font-weight: 700; }
                .v-id-tag { 
                    background: #f1f5f9; 
                    padding: 4px 12px; 
                    border-radius: 20px; 
                    font-size: 0.75rem; 
                    font-family: monospace; 
                    color: #64748b;
                    display: inline-block;
                    margin-top: 8px;
                }
                
                .erp-nav { display: flex; flex-direction: column; gap: 6px; flex: 1; }
                .erp-nav button { 
                    background: transparent; 
                    border: none; 
                    color: #64748b; 
                    padding: 12px 16px; 
                    border-radius: 12px; 
                    text-align: left; 
                    display: flex; 
                    align-items: center; 
                    gap: 12px; 
                    font-weight: 600; 
                    cursor: pointer; 
                    transition: all 0.2s; 
                }
                .erp-nav button:hover { background: #f8fafc; color: #1e293b; }
                .erp-nav button.active { background: #2563eb; color: white; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2); }
                
                .compliance-status { 
                    margin-top: 20px; 
                    background: #ecfdf5; 
                    color: #059669; 
                    padding: 12px; 
                    border-radius: 12px; 
                    font-size: 0.8rem; 
                    font-weight: 700; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                    gap: 8px; 
                    border: 1px solid #d1fae5;
                }

                .erp-content { flex: 1; padding: 30px; overflow-y: auto; background: #f8fafc; }
                .erp-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
                .erp-stat-card { 
                    background: white; 
                    padding: 24px; 
                    border-radius: 20px; 
                    border: 1px solid #e2e8f0; 
                    display: flex; 
                    align-items: center; 
                    gap: 20px; 
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .erp-stat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 20px -5px rgba(0,0,0,0.05); }
                .erp-stat-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
                .erp-stat-icon.blue { background: #eff6ff; color: #3b82f6; }
                .erp-stat-icon.green { background: #f0fdf4; color: #10b981; }
                .erp-stat-icon.orange { background: #fff7ed; color: #f59e0b; }
                .erp-stat-icon.purple { background: #faf5ff; color: #a855f7; }
                .erp-stat-info h3 { margin: 0; font-size: 1.75rem; color: #0f172a; font-weight: 800; line-height: 1.2; }
                .erp-stat-info p { margin: 0; font-size: 0.8rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }

                .erp-main-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
                .erp-chart-box, .erp-list-box { 
                    background: white; 
                    padding: 24px; 
                    border-radius: 20px; 
                    border: 1px solid #e2e8f0; 
                }
                .erp-chart-box h4, .erp-list-box h4 { margin: 0; font-size: 1.1rem; color: #0f172a; font-weight: 700; }
                
                .box-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                .btn-text { background: transparent; border: none; color: #2563eb; font-weight: 700; font-size: 0.85rem; cursor: pointer; }

                .activity-feed { display: flex; flex-direction: column; gap: 20px; }
                .feed-item { display: flex; gap: 16px; position: relative; }
                .feed-icon { 
                    width: 32px; 
                    height: 32px; 
                    border-radius: 10px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    flex-shrink: 0;
                }
                .feed-icon.blue { background: #eff6ff; color: #3b82f6; }
                .feed-icon.green { background: #f0fdf4; color: #10b981; }
                .feed-icon.orange { background: #fff7ed; color: #f59e0b; }
                
                .feed-content { flex: 1; }
                .feed-content strong { display: block; font-size: 0.9rem; color: #1e293b; margin-bottom: 2px; }
                .feed-content p { margin: 0; font-size: 0.85rem; color: #64748b; line-height: 1.4; }
                .feed-content .time { font-size: 0.75rem; color: #94a3b8; font-weight: 500; margin-top: 4px; display: block; }

                .form-grid-v2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
                .input-grp { display: flex; flex-direction: column; gap: 8px; }
                .input-grp label { font-size: 0.85rem; font-weight: 700; color: #475569; }
                .input-grp input { padding: 12px; border: 1.5px solid #e2e8f0; border-radius: 12px; outline: none; transition: border-color 0.2s; }
                .input-grp input:focus { border-color: #2563eb; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }
                
                .btn-primary-v2 { 
                    background: #2563eb; 
                    color: white; 
                    padding: 12px 24px; 
                    border-radius: 12px; 
                    border: none; 
                    font-weight: 700; 
                    cursor: pointer; 
                    display: flex; 
                    align-items: center; 
                    gap: 8px;
                    transition: all 0.2s;
                }
                .btn-primary-v2:hover { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3); }

                .modern-table { width: 100%; border-collapse: separate; border-spacing: 0; }
                .modern-table th { text-align: left; padding: 16px; color: #64748b; font-weight: 700; border-bottom: 1px solid #f1f5f9; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; }
                .modern-table td { padding: 16px; border-bottom: 1px solid #f1f5f9; color: #1e293b; font-size: 0.95rem; }
                .status-badge-sm { padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
                .status-badge-sm.active { background: #ecfdf5; color: #059669; }
                .status-badge-sm.pending { background: #fffbeb; color: #d97706; }

                /* Catalog & Models Styling */
                .erp-models { height: 100%; display: flex; flex-direction: column; }
                .view-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
                .title-grp h3 { margin: 0; font-size: 1.5rem; color: #0f172a; font-weight: 800; }
                .title-grp p { margin: 4px 0 0; color: #64748b; font-size: 0.95rem; }

                .models-grid { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
                    gap: 25px; 
                }
                .model-card-v3 { 
                    background: white; 
                    border-radius: 24px; 
                    border: 1px solid #e2e8f0; 
                    padding: 25px; 
                    display: flex; 
                    flex-direction: column; 
                    gap: 20px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }
                .model-card-v3:hover { 
                    transform: translateY(-8px); 
                    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
                    border-color: #3b82f6;
                }
                .mc-header { display: flex; justify-content: space-between; align-items: center; }
                .mc-icon-box { 
                    width: 52px; 
                    height: 52px; 
                    background: white; 
                    border-radius: 16px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    color: #2563eb;
                    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.1);
                    border: 1.5px solid #f1f5f9;
                }
                .model-status { 
                    padding: 6px 14px; 
                    border-radius: 10px; 
                    font-size: 0.65rem; 
                    font-weight: 800; 
                    text-transform: uppercase; 
                    letter-spacing: 1px;
                }
                .model-status.approved { background: #ecfdf5; color: #059669; border: 1px solid #10b98133; }
                .model-status.pending { background: #fffbe6; color: #d48806; border: 1px solid #ffe58f; }

                .mc-content h4 { margin: 0 0 6px 0; font-size: 1.2rem; color: #0f172a; font-weight: 800; letter-spacing: -0.3px; }
                .m-id-tag { 
                    font-size: 0.7rem; 
                    color: #64748b; 
                    font-family: monospace; 
                    font-weight: 700; 
                    background: #f1f5f9;
                    padding: 2px 8px;
                    border-radius: 4px;
                }
                
                .model-specs-v2 { display: flex; gap: 10px; margin-top: 20px; }
                .spec-pill { 
                    display: flex; 
                    align-items: center; 
                    gap: 8px; 
                    padding: 8px 14px; 
                    background: #f8fafc; 
                    border: 1px solid #e2e8f0; 
                    border-radius: 12px; 
                    font-size: 0.75rem; 
                    color: #475569; 
                    font-weight: 700;
                    transition: all 0.2s;
                }
                .spec-pill:hover { background: white; border-color: #3b82f6; color: #2563eb; }

                .mc-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 20px; border-top: 1px solid #f1f5f9; }
                .btn-mc-link { 
                    background: transparent; 
                    border: none; 
                    color: #2563eb; 
                    font-weight: 700; 
                    font-size: 0.85rem; 
                    display: flex; 
                    align-items: center; 
                    gap: 8px; 
                    cursor: pointer; 
                }
                .btn-mc-settings { 
                    width: 36px; 
                    height: 36px; 
                    border-radius: 10px; 
                    border: 1.5px solid #e2e8f0; 
                    background: white; 
                    color: #64748b; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-mc-settings:hover { background: #0f172a; color: white; border-color: #0f172a; }

                /* Form Enhancements */
                .model-request-form-v3 { 
                    background: white; 
                    border-radius: 20px; 
                    border: 1px solid #3b82f6; 
                    padding: 30px; 
                    margin-bottom: 40px; 
                    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.1);
                }
                .f-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
                .f-header h4 { margin: 0; font-size: 1.1rem; color: #0f172a; font-weight: 800; }
                .btn-close-sm { background: #f1f5f9; border: none; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #64748b; }
                .f-body.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .input-box { display: flex; flex-direction: column; gap: 8px; }
                .input-box.full { grid-column: span 2; }
                .input-box label { font-size: 0.8rem; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; }
                .input-box input, .input-box select { padding: 12px; border: 1.5px solid #e2e8f0; border-radius: 12px; outline: none; transition: border-color 0.2s; }
                .input-box input:focus { border-color: #3b82f6; }
                .pdf-upload { 
                    padding: 20px; 
                    border: 2px dashed #cbd5e1; 
                    border-radius: 12px; 
                    text-align: center; 
                    color: #64748b; 
                    font-weight: 600; 
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: all 0.2s;
                }
                .pdf-upload:hover { background: #eff6ff; border-color: #3b82f6; color: #2563eb; }
                .btn-submit-v2-full { 
                    grid-column: span 2; 
                    padding: 16px; 
                    background: #2563eb; 
                    color: white; 
                    border: none; 
                    border-radius: 12px; 
                    font-weight: 800; 
                    cursor: pointer;
                    margin-top: 10px;
                }

                /* Staff Styling */
                .staff-grid-v3 { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); 
                    gap: 20px; 
                }
                .staff-card-v3 { 
                    background: white; 
                    border: 1px solid #e2e8f0; 
                    border-radius: 20px; 
                    padding: 20px; 
                    display: flex; 
                    align-items: center; 
                    gap: 15px;
                    transition: all 0.2s;
                    position: relative;
                }
                .staff-card-v3:hover { border-color: #2563eb; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
                .sc-avatar { 
                    width: 50px; 
                    height: 50px; 
                    background: #eff6ff; 
                    color: #2563eb; 
                    border-radius: 15px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-size: 1.25rem; 
                    font-weight: 800; 
                }
                .sc-info { flex: 1; }
                .sc-info h4 { margin: 0; font-size: 1rem; color: #1e293b; font-weight: 700; }
                .sc-role { font-size: 0.8rem; color: #64748b; font-weight: 600; }
                .sc-meta { display: flex; gap: 12px; margin-top: 8px; }
                .sc-meta span { font-size: 0.75rem; color: #94a3b8; display: flex; align-items: center; gap: 4px; font-weight: 500; }
                .btn-edit-v3 { 
                    padding: 8px; 
                    background: transparent; 
                    border: none; 
                    color: #94a3b8; 
                    cursor: pointer; 
                    transition: color 0.2s; 
                }
                .btn-edit-v3:hover { color: #2563eb; }

                /* Premium Tech Modal Styles */
                .premium-tech-modal {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 32px;
                    width: 900px;
                    max-width: 95vw;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255,255,255,0.5);
                    overflow: hidden;
                    border: 1px solid rgba(226, 232, 240, 0.8);
                }

                .tech-header {
                    padding: 40px;
                    background: linear-gradient(to bottom, #f8fafc, transparent);
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    border-bottom: 1px solid #f1f5f9;
                }

                .tech-brand { display: flex; gap: 24px; align-items: center; }
                .tech-icon-circle {
                    width: 80px;
                    height: 80px;
                    background: white;
                    border-radius: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #2563eb;
                    box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.15);
                }

                .tech-title-block h2 { margin: 0; font-size: 1.75rem; color: #0f172a; font-weight: 800; letter-spacing: -0.5px; }
                .tech-meta-row { display: flex; gap: 12px; margin-top: 10px; }
                .ref-badge { background: #f1f5f9; color: #64748b; font-family: monospace; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; }
                .auth-pill { background: #ecfdf5; color: #10b981; padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.5px; }
                .v-tagline { font-size: 0.75rem; color: #3b82f6; font-weight: 700; font-style: italic; margin-bottom: 10px; }
                .v-id-tag { background: #f1f5f9; color: #475569; padding: 4px 10px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; font-family: monospace; }
                
                .mfg-badge { background: #ecfdf5; color: #059669; padding: 4px 10px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; }

                .tech-close-btn { background: #f1f5f9; border: none; width: 40px; height: 40px; border-radius: 12px; cursor: pointer; color: #64748b; transition: all 0.2s; }
                .tech-close-btn:hover { background: #ef4444; color: white; transform: rotate(90deg); }

                .tech-body { padding: 40px; }
                .tech-specs-container { 
                    display: grid; 
                    grid-template-columns: repeat(4, 1fr); 
                    gap: 20px; 
                    margin-bottom: 40px;
                }

                .tech-spec-card {
                    background: white;
                    padding: 20px;
                    border-radius: 20px;
                    border: 1px solid #f1f5f9;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .tech-spec-card:hover { transform: translateY(-4px); box-shadow: 0 12px 20px -5px rgba(0,0,0,0.05); border-color: #3b82f633; }

                .spec-label-row { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
                .spec-label-row label { font-size: 0.7rem; color: #94a3b8; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
                .tech-spec-card p { margin: 0; font-size: 1rem; color: #1e293b; font-weight: 700; }

                .tech-innovation-bar {
                    background: #f8fafc;
                    padding: 24px;
                    border-radius: 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 40px;
                    border: 1px dashed #cbd5e1;
                }

                .cert-seal { display: flex; gap: 16px; align-items: center; color: #059669; flex-shrink: 0; }
                .cert-info strong { display: block; font-size: 0.9rem; letter-spacing: 0.5px; }
                .cert-info p { margin: 0; font-size: 0.75rem; opacity: 0.8; }
                .tech-disclaimer { margin: 0; font-size: 0.8rem; color: #64748b; line-height: 1.5; font-style: italic; }

                .tech-footer {
                    padding: 30px 40px;
                    background: #f8fafc;
                    border-top: 1px solid #f1f5f9;
                    display: flex;
                    justify-content: flex-end;
                    gap: 16px;
                }

                .btn-tech-secondary { background: white; border: 1.5px solid #e2e8f0; color: #64748b; padding: 14px 24px; border-radius: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
                .btn-tech-secondary:hover { background: #f1f5f9; color: #0f172a; }

                .btn-tech-primary {
                    background: #2563eb;
                    color: white;
                    border: none;
                    padding: 14px 28px;
                    border-radius: 14px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.25);
                }
                .btn-tech-primary:hover { background: #1e40af; transform: translateY(-2px); box-shadow: 0 20px 25px -5px rgba(37, 99, 235, 0.3); }
                .btn-content { text-align: left; display: flex; flex-direction: column; line-height: 1; }
                .btn-content small { font-size: 0.65rem; opacity: 0.7; margin-top: 4px; font-weight: 500; }

                .iso-badge { background: #eff6ff; color: #1d4ed8; padding: 4px 10px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; }
                .rd-badge { background: #fef2f2; color: #dc2626; padding: 4px 10px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; }
                .cat-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 5px; }
                .cat-tag { background: #f1f5f9; color: #475569; padding: 4px 12px; border-radius: 50px; font-size: 0.7rem; font-weight: 700; border: 1px solid #e2e8f0; }

                .animated { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                
                .animatedPop { animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
                @keyframes popIn { 0% { opacity: 0; transform: scale(0.9) translateY(20px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
                
                .animatedSlideIn { animation: slideIn 0.3s ease-out; }
                @keyframes slideIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div >
    );
};

export default VendorRegistry;

