import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    Truck,
    CheckCircle,
    AlertCircle,
    ArrowUpRight,
    Search,
    Clock,
    ShieldCheck,
    Wrench,
    FileText,
    AlertTriangle,
    MapPin,
    ArrowRight,
    Activity,
    Zap,
    Bell,
    Settings,
    ChevronRight,
    Plus,
    Trash2,
    Users,
    Building,
    Database,
    Upload,
    MoreVertical
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
    PieChart, Pie
} from 'recharts';

const VendorDashboard = () => {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('overview'); // 'overview', 'company', 'inventory', 'staff'
    const [timeRange, setTimeRange] = useState('30d');

    // Mock Data for Inventory Management
    const [inventory, setInventory] = useState([
        { id: 'M-7701', sn: 'FM-2025-001', model: 'Zenner WMT', client: 'Lakeside Estates', status: 'Active', pulse: 'Normal' },
        { id: 'M-7702', sn: 'FM-2025-012', model: 'Italmet B3', client: 'Desert Inn', status: 'Pending', pulse: 'Silent' },
        { id: 'M-7703', sn: 'FM-2025-045', model: 'Zenner WMT', client: 'Green Valley', status: 'Critical', pulse: 'Leak' },
    ]);

    // Mock Data for Staff
    const [staff, setStaff] = useState([
        { id: 'ST-01', name: 'Rahul Sharma', role: 'Chief Installer', phone: '+91 98XXX XXX01', units: 45 },
        { id: 'ST-02', name: 'Amit Singh', role: 'Field Tech', phone: '+91 98XXX XXX12', units: 12 },
    ]);

    const stats = [
        { label: 'Total Models', value: '4', icon: <Package size={22} />, color: '#2563eb', bg: '#eff6ff', path: '/meter-models', trend: '+1 this month' },
        { label: 'Active Meters', value: inventory.length.toString(), icon: <ShieldCheck size={22} />, color: '#059669', bg: '#f0fdf4', path: '/meter-inventory', trend: '98.2% health' },
        { label: 'Pending Installs', value: '12', icon: <Truck size={22} />, color: '#d97706', bg: '#fffbeb', path: '/meter-installation', trend: '5 due today' },
        { label: 'Quality Alerts', value: '3', icon: <AlertTriangle size={22} />, color: '#dc2626', bg: '#fef2f2', path: '/meter-verification', trend: 'Requires action' }
    ];

    const modelSalesData = [
        { name: 'Zenner WMT', value: 450, color: '#2563eb' },
        { name: 'Italmet B3', value: 320, color: '#7c3aed' },
        { name: 'HydroFlow X1', value: 280, color: '#059669' },
        { name: 'SonicSmart', value: 230, color: '#f59e0b' },
    ];

    const regionalData = [
        { name: 'Jaipur', value: 400 },
        { name: 'Jodhpur', value: 300 },
        { name: 'Udaipur', value: 200 },
        { name: 'Kota', value: 100 },
    ];

    const handleDeleteMeter = (id) => {
        setInventory(inventory.filter(m => m.id !== id));
    };

    const handleAddMeter = () => {
        const newId = `M-${Math.floor(Math.random() * 9000) + 1000}`;
        setInventory([...inventory, { id: newId, sn: 'FM-NEW-' + newId, model: 'Zenner WMT', client: 'Unassigned', status: 'Registered', pulse: 'N/A' }]);
    };

    // Sub-View: Overview Dashboard
    const OverviewView = () => (
        <div className="view-animated">
            {/* Alert Banner for Critical Issues */}
            <div className="critical-notice-bar animated slideDown">
                <Zap size={18} />
                <div className="notice-content">
                    <strong>System Alert:</strong> High leakage detected in Jaipur Sector 4. Manual inspection required.
                </div>
                <button className="btn-action-small" onClick={() => setActiveView('inventory')}>Check Meters <ArrowRight size={14} /></button>
            </div>

            <div className="v-dash-grid">
                <div className="v-col-main">
                    <div className="stats-strip">
                        {stats.map((s, i) => (
                            <div key={i} className="s-card" onClick={() => navigate(s.path)}>
                                <div className="s-card-top">
                                    <div className="s-icon-box" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
                                    <ArrowUpRight size={16} className="s-arrow-top" />
                                </div>
                                <div className="s-card-bottom">
                                    <h3 className="s-value">{s.value}</h3>
                                    <p className="s-label">{s.label}</p>
                                    <span className="s-trend" style={{ color: i === 3 ? '#dc2626' : '#64748b' }}>{s.trend}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="chart-card-v2">
                        <div className="card-top-flex">
                            <div className="title-grp">
                                <h3><Activity size={18} className="text-blue-600" /> Device Deployment Trends</h3>
                                <p>Meter activations across different product lines</p>
                            </div>
                            <div className="time-filter">
                                {['7d', '30d', '90d'].map(t => (
                                    <button
                                        key={t}
                                        className={timeRange === t ? 'active' : ''}
                                        onClick={() => setTimeRange(t)}
                                    >{t}</button>
                                ))}
                            </div>
                        </div>
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={modelSalesData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '12px' }}
                                    />
                                    <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                                        {modelSalesData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="v-col-side">
                    <div className="side-card-v2 dark">
                        <h4>Manufacturer Score</h4>
                        <div className="compliance-gauge">
                            <div className="gauge-val">9.4</div>
                            <div className="gauge-label">Compliance Grade: <strong>A+</strong></div>
                        </div>
                        <div className="gauge-bar">
                            <div className="gauge-fill" style={{ width: '94%' }}></div>
                        </div>
                        <p className="gauge-desc">Grade is based on calibration accuracy and audit success rates.</p>
                    </div>

                    <div className="side-card-v2">
                        <h4>Distribution by Region</h4>
                        <div className="pie-wrapper">
                            <ResponsiveContainer width="100%" height={180}>
                                <PieChart>
                                    <Pie
                                        data={regionalData}
                                        innerRadius={50}
                                        outerRadius={70}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {regionalData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={['#2563eb', '#7c3aed', '#059669', '#f59e0b'][index % 4]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Sub-View: Company Setup / Registration
    const CompanySetupView = () => (
        <div className="view-animated">
            <div className="module-header-v2">
                <div>
                    <h2><Building size={24} /> Company Registration Profile</h2>
                    <p>Update your official manufacturer authorization details and documents.</p>
                </div>
                <button className="btn-save-v2">Submit Update Request</button>
            </div>

            <div className="form-grid-hub">
                <div className="form-card">
                    <h3>Legal Entity Information</h3>
                    <div className="hub-inputs">
                        <div className="i-box">
                            <label>Manufacturer Name</label>
                            <input type="text" defaultValue="Zenner India Pvt Ltd" />
                        </div>
                        <div className="i-box">
                            <label>Incorporation Type</label>
                            <select><option>Private Limited</option><option>Public Limited</option></select>
                        </div>
                        <div className="i-box">
                            <label>GSTIN Number</label>
                            <input type="text" defaultValue="08ABBZXXXX1Z0" />
                        </div>
                        <div className="i-box">
                            <label>PAN Number</label>
                            <input type="text" defaultValue="AAACZXXXXK" />
                        </div>
                    </div>
                </div>

                <div className="form-card">
                    <h3>Office Address & Contact</h3>
                    <div className="hub-inputs">
                        <div className="i-box full">
                            <label>Registered Address</label>
                            <input type="text" defaultValue="Plot 42, Sitapura Industrial Area, Jaipur, Rajasthan" />
                        </div>
                        <div className="i-box">
                            <label>Official Email</label>
                            <input type="email" defaultValue="reg@zennerindia.com" />
                        </div>
                        <div className="i-box">
                            <label>Contact Number</label>
                            <input type="text" defaultValue="+91 141 22XXXXX" />
                        </div>
                    </div>
                </div>

                <div className="form-card full-span">
                    <h3>Authorization Documents</h3>
                    <div className="doc-upload-grid">
                        <div className="upload-box">
                            <Database size={24} />
                            <span>Trade License</span>
                            <small>Expires: 2026-12-31</small>
                            <button className="btn-up-sm">Update</button>
                        </div>
                        <div className="upload-box">
                            <ShieldCheck size={24} />
                            <span>ISO Certification</span>
                            <small>Level: Platinum</small>
                            <button className="btn-up-sm">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Sub-View: Inventory Management
    const InventoryView = () => (
        <div className="view-animated">
            <div className="module-header-v2">
                <div>
                    <h2><Database size={24} /> Asset & Inventory Manager</h2>
                    <p>Track every meter serial number from production to field activation.</p>
                </div>
                <div className="header-actions-hub">
                    <button className="btn-secondary-hub"><Upload size={18} /> Bulk Import</button>
                    <button className="btn-primary-hub" onClick={handleAddMeter}><Plus size={18} /> Add New Meter</button>
                </div>
            </div>

            <div className="inventory-list-hub">
                <table className="hub-table">
                    <thead>
                        <tr>
                            <th>Unit ID</th>
                            <th>Serial Number</th>
                            <th>Model Type</th>
                            <th>Current Client</th>
                            <th>Pulse / Health</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map(m => (
                            <tr key={m.id}>
                                <td><span className="hub-id">{m.id}</span></td>
                                <td><strong>{m.sn}</strong></td>
                                <td>{m.model}</td>
                                <td>{m.client}</td>
                                <td>
                                    <div className={`health-dot ${m.pulse.toLowerCase()}`}></div>
                                    <span className="health-txt">{m.pulse}</span>
                                </td>
                                <td><span className={`hub-status ${m.status.toLowerCase()}`}>{m.status}</span></td>
                                <td>
                                    <button className="btn-delete-hub" onClick={() => handleDeleteMeter(m.id)}>
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // Sub-View: Staff Management
    const StaffView = () => (
        <div className="view-animated">
            <div className="module-header-v2">
                <div>
                    <h2><Users size={24} /> Authorized Technical Staff</h2>
                    <p>Manage technicians and installers permitted to handle your device security seals.</p>
                </div>
                <button className="btn-primary-hub"><Plus size={18} /> Register Personnel</button>
            </div>

            <div className="staff-grid-hub">
                {staff.map(s => (
                    <div key={s.id} className="staff-card-hub">
                        <div className="staff-header-hub">
                            <div className="st-avatar">{s.name.charAt(0)}</div>
                            <div className="st-info">
                                <h3>{s.name}</h3>
                                <p>{s.role}</p>
                            </div>
                            <MoreVertical size={18} className="st-more" />
                        </div>
                        <div className="st-body-hub">
                            <div className="st-stat">
                                <label>Phone</label>
                                <span>{s.phone}</span>
                            </div>
                            <div className="st-stat">
                                <label>Assigned Units</label>
                                <span>{s.units} Devices</span>
                            </div>
                        </div>
                        <div className="st-footer-hub">
                            <button className="btn-st-action">View Performance</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="hub-outer">
            {/* Left Nav Hub */}
            <aside className="hub-sidebar">
                <div className="hub-branding">
                    <div className="hub-logo">Z</div>
                    <h3>ZENNER PORTAL</h3>
                </div>

                <nav className="hub-nav-links">
                    <button
                        className={activeView === 'overview' ? 'active' : ''}
                        onClick={() => setActiveView('overview')}
                    >
                        <LayoutDashboard size={20} /> Overview
                    </button>
                    <button
                        className={activeView === 'company' ? 'active' : ''}
                        onClick={() => setActiveView('company')}
                    >
                        <Building size={20} /> Company Profile
                    </button>
                    <button
                        className={activeView === 'inventory' ? 'active' : ''}
                        onClick={() => setActiveView('inventory')}
                    >
                        <Database size={20} /> Serial Inventory
                    </button>
                    <button
                        className={activeView === 'staff' ? 'active' : ''}
                        onClick={() => setActiveView('staff')}
                    >
                        <Users size={20} /> Technical Staff
                    </button>
                </nav>

                <div className="hub-user-p">
                    <div className="u-avatar">RD</div>
                    <div className="u-info">
                        <p>Ramesh Das</p>
                        <span>Admin</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="hub-main">
                <header className="hub-top-header">
                    <div className="search-hub">
                        <Search size={18} />
                        <input type="text" placeholder="Global search models, serials, staff..." />
                    </div>
                    <div className="header-hub-actions">
                        <button className="hub-icon-btn"><Bell size={20} /><span className="hub-b">3</span></button>
                        <button className="hub-icon-btn"><Settings size={20} /></button>
                    </div>
                </header>

                <div className="hub-content-view">
                    {activeView === 'overview' && <OverviewView />}
                    {activeView === 'company' && <CompanySetupView />}
                    {activeView === 'inventory' && <InventoryView />}
                    {activeView === 'staff' && <StaffView />}
                </div>
            </main>

            <style jsx>{`
                .hub-outer { display: flex; background: #f8fafc; min-height: 100vh; font-family: 'Inter', sans-serif; }

                /* Hub Sidebar */
                .hub-sidebar { width: 280px; background: #0f172a; color: white; display: flex; flex-direction: column; padding: 30px 20px; position: fixed; height: 100vh; }
                .hub-branding { display: flex; align-items: center; gap: 15px; margin-bottom: 50px; }
                .hub-logo { width: 40px; height: 40px; background: #2563eb; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.5rem; }
                .hub-branding h3 { font-size: 1.1rem; font-weight: 700; color: #f1f5f9; margin: 0; }

                .hub-nav-links { display: flex; flex-direction: column; gap: 8px; flex: 1; }
                .hub-nav-links button { background: transparent; border: none; color: #94a3b8; padding: 14px 18px; border-radius: 12px; text-align: left; display: flex; align-items: center; gap: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 0.95rem; }
                .hub-nav-links button:hover { background: #1e293b; color: white; }
                .hub-nav-links button.active { background: #2563eb; color: white; }

                .hub-user-p { display: flex; align-items: center; gap: 12px; padding: 15px; background: #1e293b; border-radius: 12px; }
                .u-avatar { width: 38px; height: 38px; background: #3b82f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; }
                .u-info p { margin: 0; font-size: 0.9rem; font-weight: 700; }
                .u-info span { font-size: 0.75rem; color: #94a3b8; }

                /* Main Hub Area */
                .hub-main { flex: 1; margin-left: 280px; display: flex; flex-direction: column; }
                .hub-top-header { padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; background: white; border-bottom: 1px solid #f1f5f9; }
                .search-hub { display: flex; align-items: center; gap: 12px; background: #f8fafc; padding: 10px 20px; border-radius: 12px; border: 1px solid #e2e8f0; width: 400px; }
                .search-hub input { border: none; background: transparent; outline: none; font-size: 0.9rem; width: 100%; }
                .header-hub-actions { display: flex; gap: 15px; }
                .hub-icon-btn { position: relative; background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; border-radius: 10px; cursor: pointer; color: #64748b; }
                .hub-b { position: absolute; top: -5px; right: -5px; background: #ef4444; color: white; font-size: 0.6rem; padding: 2px 5px; border-radius: 10px; border: 2px solid white; }

                .hub-content-view { padding: 40px; }

                /* Generic View Styles */
                .view-animated { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .module-header-v2 { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 35px; }
                .module-header-v2 h2 { margin: 0; font-size: 1.75rem; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 15px; }
                .module-header-v2 p { margin: 8px 0 0 0; color: #64748b; font-size: 1rem; }

                .header-actions-hub { display: flex; gap: 12px; }
                .btn-primary-hub { background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }
                .btn-secondary-hub { background: white; border: 1px solid #e2e8f0; color: #475569; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }

                /* Company Form Grid */
                .form-grid-hub { display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px; }
                .form-card { background: white; padding: 30px; border-radius: 20px; border: 1px solid #f1f5f9; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
                .form-card.full-span { grid-column: span 2; }
                .form-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 25px; color: #1e293b; border-left: 4px solid #2563eb; padding-left: 15px; }
                .hub-inputs { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .i-box { display: flex; flex-direction: column; gap: 8px; }
                .i-box.full { grid-column: span 2; }
                .i-box label { font-size: 0.85rem; font-weight: 700; color: #64748b; }
                .i-box input, .i-box select { padding: 12px; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 0.95rem; outline: none; }
                .i-box input:focus { border-color: #2563eb; }

                .doc-upload-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
                .upload-box { display: flex; align-items: center; gap: 20px; background: #f8fafc; padding: 20px; border-radius: 15px; border: 2px dashed #e2e8f0; }
                .upload-box span { font-weight: 700; font-size: 0.9rem; color: #1e293b; flex: 1; }
                .upload-box small { font-size: 0.75rem; color: #64748b; }
                .btn-up-sm { background: white; border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; }

                /* Inventory Table */
                .inventory-list-hub { background: white; border-radius: 20px; border: 1px solid #f1f5f9; overflow: hidden; }
                .hub-table { width: 100%; border-collapse: collapse; }
                .hub-table th { background: #f8fafc; padding: 18px 25px; text-align: left; font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase; border-bottom: 2px solid #f1f5f9; }
                .hub-table td { padding: 18px 25px; border-bottom: 1px solid #f1f5f9; font-size: 0.95rem; }
                .hub-id { background: #f1f5f9; padding: 4px 8px; border-radius: 6px; font-family: monospace; font-size: 0.8rem; color: #475569; }
                .hub-status { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
                .hub-status.active { background: #f0fdf4; color: #166534; }
                .hub-status.pending { background: #fffbeb; color: #92400e; }
                .hub-status.critical { background: #fef2f2; color: #991b1b; }

                .health-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 8px; }
                .health-dot.normal { background: #22c55e; box-shadow: 0 0 8px #22c55e; }
                .health-dot.silent { background: #94a3b8; }
                .health-dot.leak { background: #dc2626; box-shadow: 0 0 8px #dc2626; animation: pulseRed 1s infinite; }
                @keyframes pulseRed { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }

                .btn-delete-hub { background: #fef2f2; color: #dc2626; border: none; padding: 8px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
                .btn-delete-hub:hover { background: #dc2626; color: white; }

                /* Staff Grid */
                .staff-grid-hub { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 25px; }
                .staff-card-hub { background: white; border-radius: 20px; border: 1px solid #f1f5f9; padding: 25px; transition: transform 0.2s; }
                .staff-card-hub:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
                .staff-header-hub { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
                .st-avatar { width: 48px; height: 48px; background: #e0e7ff; color: #3730a3; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; }
                .st-info h3 { margin: 0; font-size: 1.05rem; font-weight: 700; color: #1e293b; }
                .st-info p { margin: 2px 0 0 0; font-size: 0.85rem; color: #64748b; font-weight: 600; }
                .st-more { color: #cbd5e1; cursor: pointer; }

                .st-body-hub { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; padding: 15px 0; border-top: 1px solid #f8fafc; }
                .st-stat label { font-size: 0.75rem; color: #94a3b8; font-weight: 600; display: block; margin-bottom: 4px; }
                .st-stat span { font-size: 0.9rem; font-weight: 700; color: #334155; }

                .st-footer-hub { margin-top: 20px; }
                .btn-st-action { width: 100%; padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 0.85rem; font-weight: 700; color: #475569; cursor: pointer; }

                /* Reused Overview Styles refined for Hub */
                .critical-notice-bar { background: #0f172a; color: white; padding: 12px 25px; border-radius: 16px; margin-bottom: 30px; display: flex; align-items: center; gap: 15px; }
                .v-dash-grid { display: grid; grid-template-columns: 1fr 340px; gap: 30px; }
                .stats-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
                .s-card { background: white; padding: 20px; border-radius: 16px; border: 1px solid #f1f5f9; cursor: pointer; }
                .chart-card-v2 { background: white; padding: 30px; border-radius: 20px; border: 1px solid #f1f5f9; }
                .side-card-v2 { background: white; padding: 25px; border-radius: 20px; border: 1px solid #f1f5f9; margin-bottom: 25px; }
                .side-card-v2.dark { background: #1e293b; color: white; border: none; }
                .gauge-val { font-size: 3rem; font-weight: 800; color: #10b981; text-align: center; }
                .gauge-bar { height: 8px; background: #0f172a; border-radius: 4px; margin: 15px 0; }
                .gauge-fill { height: 100%; background: #10b981; border-radius: 4px; }
            `}</style>
        </div>
    );
};

export default VendorDashboard;
