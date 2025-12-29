import React, { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { useNavigate } from 'react-router-dom';

import {
    Activity, RefreshCcw, Battery, Signal, History, Briefcase, LogOut, Globe,
    Plus, Users, Award, CheckCircle, Database, AlertTriangle, Link2, BarChart3, Gavel, Search, X, Info,
    Ruler, UploadCloud, RotateCcw, ShieldCheck, FileText, ChevronRight, LayoutDashboard, Siren,
    ArrowRight, Building2, Package, RefreshCw
} from 'lucide-react';

import VendorRegistry from './VendorRegistry';
import InstallerCertification from './InstallerCertification';
import MeterVerification from './MeterVerification';
import GISViewer from './GISViewer';

// --- MOCK DATA FOR CHARTS ---
const USAGE_DATA = [
    { day: 'Mon', usage: 450, limit: 500 },
    { day: 'Tue', usage: 480, limit: 500 },
    { day: 'Wed', usage: 520, limit: 500 }, // Overshoot
    { day: 'Thu', usage: 430, limit: 500 },
    { day: 'Fri', usage: 490, limit: 500 },
    { day: 'Sat', usage: 300, limit: 500 },
    { day: 'Sun', usage: 250, limit: 500 },
];

const TELEMETRY_LOGS = [
    { id: 101, time: '10:00 AM', flow: '45.2 m³/h', total: '14,200 m³', signal: 'Strong', battery: '98%', status: 'Normal' },
    { id: 102, time: '10:15 AM', flow: '46.1 m³/h', total: '14,211 m³', signal: 'Strong', battery: '98%', status: 'Normal' },
    { id: 103, time: '10:30 AM', flow: '0.0 m³/h', total: '14,222 m³', signal: 'Weak', battery: '97%', status: 'Low Flow' },
    { id: 104, time: '10:45 AM', flow: '44.8 m³/h', total: '14,233 m³', signal: 'Good', battery: '97%', status: 'Normal' },
];

const ROLE_PERMISSIONS = {
    admin: ['vendor', 'installer', 'verification', 'data', 'compliance', 'integration', 'reports', 'enforcement'],
    vendor: ['vendor', 'v-health', 'data', 'reports'],
    applicant: ['vendor', 'v-health', 'data', 'reports'], // Applicants managing their vendor profile
    officer: ['installer', 'verification', 'data', 'compliance', 'integration', 'reports', 'enforcement'],
};

const MeterRegistrationSystem = ({ activeCompany, setActiveCompany, userRole: propRole, setUserRole: setPropRole, userCompanies = [], setUserCompanies }) => {
    const [activeTab, setActiveTab] = useState('vendor');
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [showFlowGuide, setShowFlowGuide] = useState(false);
    const [userRole, setUserRole] = useState(propRole ? propRole.toLowerCase() : 'vendor'); // admin, vendor, officer
    const [loggedInVendorId, setLoggedInVendorId] = useState(activeCompany?.id || 'V-001');

    // Sync vendor identity if activeCompany changes
    React.useEffect(() => {
        if (activeCompany) {
            setLoggedInVendorId(activeCompany.id);
            setVendors(prev => prev.map((v, i) => i === 0 ? {
                ...v,
                id: activeCompany.id,
                name: activeCompany.name,
                location: activeCompany.zone || v.location
            } : v));
            setMeterUnits(prev => prev.map((m, i) => i === 0 ? {
                ...m,
                vendorId: activeCompany.id,
                make: activeCompany.name
            } : m));
        }
    }, [activeCompany]);

    const [globalSearch, setGlobalSearch] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const navigate = useNavigate();

    const menuItems = [
        { id: 'vendor', label: 'Ecosystem Registry', icon: <Users size={18} /> },
        { id: 'v-health', label: 'Asset Health', icon: <Activity size={18} /> },
        { id: 'registration', label: 'Unit Assignment', icon: <Plus size={18} /> },
        { id: 'installer', label: 'Field Execution', icon: <Award size={18} /> },
        { id: 'verification', label: 'Quality Audit', icon: <CheckCircle size={18} /> },
        { id: 'data', label: 'IoT Stream', icon: <Database size={18} /> },
        { id: 'compliance', label: 'Enforcement', icon: <ShieldCheck size={18} /> },
        { id: 'integration', label: 'Rig Links', icon: <Link2 size={18} /> },
        { id: 'reports', label: 'BI Analytics', icon: <BarChart3 size={18} /> },
        { id: 'enforcement', label: 'Revenue Billing', icon: <Gavel size={18} /> },
    ];

    const allowedTabs = ROLE_PERMISSIONS[userRole] || [];
    const filteredMenu = menuItems.filter(item => allowedTabs.includes(item.id));

    // --- GLOBAL STATE (Initialized from Dashboard context) ---
    const [vendors, setVendors] = useState([
        ...userCompanies.map(c => ({
            id: c.id,
            name: c.name,
            status: 'Approved',
            gstin: '08AAACE1234F1Z5', cin: 'U29100RJ2015PTC047000',
            location: c.zone || 'Jaipur (Industrial)', rating: 5.0,
            staff: [
                { id: 'S-001', name: 'Rajesh Kumar', role: 'Technical User', phone: '9876543210' },
                { id: 'S-002', name: 'Amit Singh', role: 'Installation Engineer', phone: '9876543211' }
            ]
        })),
        { id: 'V-PRO-002', name: 'AquaTech Solutions', status: 'Approved', gstin: '08BBBCF5678G1Z6', location: 'Jodhpur', rating: 4.9, staff: [] },
        {
            id: 'V-ACC-001',
            name: 'Accumax Instruments Pvt. Ltd.',
            tagline: 'Maximum Accuracy, Maximum Trust',
            status: 'Approved',
            gstin: '24AAACQ0274F1ZU',
            cin: 'U64200GJ1992PTC018138',
            location: 'Gandhinagar, Gujarat',
            address: 'B-95, Electronics Estate, GIDC, Sector-25, Gandhinagar, Gujarat – 382024',
            rating: 5.0,
            iso: 'ISO 9001:2015',
            experience: '20+ Years',
            rd: 'In-house R&D',
            categories: ['Groundwater Abstraction Monitoring', 'CGWA-Compliant Flow Measurement', 'Groundwater Level Monitoring', 'Telemetry & Remote Data Reporting', 'Battery Operated Instruments'],
            est: 1992,
            manufacturing: 'Made in India',
            staff: []
        },
        { id: 'V-PRO-003', name: 'HydroSense IoT', status: 'Pending', location: 'Udaipur', rating: 4.2, staff: [] }
    ]);

    const [meterModels, setMeterModels] = useState([
        { id: 'MOD-DX1', vendorId: activeCompany?.id || 'V-INIT', name: 'EcoFlow Smart DX1', tech: 'Ultrasonic', size: '50-100mm', status: 'Approved' },
        { id: 'MOD-DX2', vendorId: activeCompany?.id || 'V-INIT', name: 'EcoFlow Pro DX2', tech: 'Electromagnetic', size: '80-200mm', status: 'Approved' },
        {
            id: 'M-ACC-EMF',
            vendorId: 'V-ACC-001',
            name: 'Battery Operated Electromagnetic Flow Meter with GSM Telemetry',
            tech: 'Electromagnetic',
            size: '80 NB (3 Inch)',
            status: 'Approved',
            compliance: ['CGWA Norms', 'Telemetry Enabled', 'NABL Mandatory']
        },
        {
            id: 'M-ACC-DWLR',
            vendorId: 'V-ACC-001',
            name: 'Battery Operated Digital Water Level Recorder (DWLR) with GSM Telemetry',
            tech: 'Digital Piezometer',
            size: '50-75m Cable',
            status: 'Approved',
            compliance: ['CGWA Norms', 'Solar Ready', 'Borewell Monitoring']
        }
    ]);

    const [meterUnits, setMeterUnits] = useState([
        {
            id: 'MTR-8892', serialNumber: 'FM-2024-001', modelId: 'MOD-DX1', vendorId: activeCompany?.id || userCompanies[0]?.id || 'COMP-9901', status: 'Active',
            make: activeCompany?.name || userCompanies[0]?.name || 'Rajas Stones Pvt Ltd', pipeSize: '80mm', installDate: '2024-12-01', warrantyExp: '2026-12-01',
            calibrationExp: '2025-06-01', district: 'Jaipur', geoLat: 26.9124, geoLong: 75.7873, zone: 'Critical',
            health: { battery: 85, signal: 'Strong', lastPulse: '10 mins ago', status: 'Healthy' }
        },
        {
            id: 'MTR-1102', serialNumber: 'AQ-99-881', modelId: 'MOD-DX2', vendorId: 'V-002', status: 'Active',
            make: 'AquaTech Solutions', pipeSize: '100mm', installDate: '2024-11-15', district: 'Jodhpur',
            geoLat: 26.2389, geoLong: 73.0243, zone: 'Semi-Critical',
            health: { battery: 92, signal: 'Good', lastPulse: '1 hr ago', status: 'Healthy' }
        }
    ]);

    const [readings, setReadings] = useState([
        { id: 1, meterId: 'MTR-8892', val: 14200, date: '2025-12-25' }
    ]);

    const [users, setUsers] = useState([
        { email: 'admin@rgwa.gov.in', password: 'admin', role: 'admin' },
        { email: 'officer@rgwa.gov.in', password: 'officer', role: 'officer' },
        { email: 'contact@flowmaster.com', password: 'vendor', role: 'vendor', vendorId: 'V-001' }
    ]);

    const [activities, setActivities] = useState([
        { id: 1, type: 'model', title: 'New Model Approved', desc: 'EcoFlow Smart DX1 has been verified.', time: '2 hrs ago', status: 'success' },
        { id: 2, type: 'staff', title: 'Staff Authorized', desc: 'Rajesh Kumar joined the technical team.', time: '5 hrs ago', status: 'info' }
    ]);

    const addActivity = (activity) => {
        setActivities([{ id: Date.now(), time: 'Just Now', ...activity }, ...activities]);
    };

    const updateVendorStatus = (id, status) => {
        setVendors(vendors.map(v => v.id === id ? { ...v, status } : v));
    };

    const handleLogin = (email, password) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            setUserRole(user.role);
            if (user.vendorId) setLoggedInVendorId(user.vendorId);
            setActiveTab(ROLE_PERMISSIONS[user.role][0]);
        }
    };

    const handleLogout = () => {
        setUserRole('vendor');
        setActiveTab('vendor');
    };

    const registerMeter = (meterData) => {
        const newMeter = {
            ...meterData,
            id: `MTR-${Math.floor(1000 + Math.random() * 9000)}`,
            status: 'Active',
            health: { battery: 100, signal: 'Strong', lastPulse: 'Now', status: 'Healthy' }
        };
        setMeterUnits([...meterUnits, newMeter]);
        addActivity({ type: 'inventory', title: 'New Unit Registered', desc: `Meter with SN ${meterData.serialNumber} added to stock.`, status: 'success' });

        // Global State Sync: Mark meter registration as complete for context company
        if (activeCompany && setUserCompanies) {
            setUserCompanies(prev => prev.map(c => {
                if (c.id === activeCompany.id) {
                    const updatedServices = c.services.map(s => {
                        if (s.id === 'meters' || s.id === 'flow') {
                            return { ...s, registered: true, pending: false };
                        }
                        return s;
                    });
                    return { ...c, services: updatedServices };
                }
                return c;
            }));
        }
    };

    const installMeter = (id) => {
        setMeterUnits(meterUnits.map(m => m.id === id ? { ...m, status: 'Installed' } : m));
    };

    const verifyMeter = (id) => {
        setMeterUnits(meterUnits.map(m => m.id === id ? { ...m, status: 'Active' } : m));
    };

    const submitReading = (readingData) => {
        setReadings([...readings, readingData]);
    };

    const handleReplace = (oldId, newSerial) => {
        setMeterUnits(meterUnits.map(m => m.id === oldId ? { ...m, serialNumber: newSerial, status: 'Active' } : m));
    };

    const addStaff = (vendorId, staffData) => {
        const newStaff = { ...staffData, id: `S-${Math.floor(1000 + Math.random() * 9000)}` };
        setVendors(vendors.map(v => v.id === vendorId ? { ...v, staff: [...(v.staff || []), newStaff] } : v));
        addActivity({ type: 'staff', title: 'Member Added', desc: `${staffData.name} was registered as ${staffData.role}.`, status: 'info' });
    };

    const updateStaff = (vendorId, staffId, updatedData) => {
        setVendors(vendors.map(v => v.id === vendorId ? {
            ...v,
            staff: v.staff.map(s => s.id === staffId ? { ...s, ...updatedData } : s)
        } : v));
        addActivity({ type: 'staff', title: 'Member Profile Updated', desc: `Profile of ${updatedData.name} was revised.`, status: 'info' });
    };

    const addModel = (modelData) => {
        setMeterModels([...meterModels, { ...modelData, id: `RQ-${Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase()}`, status: 'Pending' }]);
        addActivity({ type: 'model', title: 'Type Approval Requested', desc: `Model ${modelData.name} submitted for scrutiny.`, status: 'warning' });
    };

    const TabContent = () => {
        const searchLow = globalSearch.toLowerCase();

        // Base filtering for global search
        const sFilteredVendors = vendors.filter(v =>
            v.name.toLowerCase().includes(searchLow) ||
            v.id.toLowerCase().includes(searchLow) ||
            v.gstin?.toLowerCase().includes(searchLow)
        );
        const sFilteredMeters = meterUnits.filter(m =>
            m.serialNumber.toLowerCase().includes(searchLow) ||
            m.applicantName?.toLowerCase().includes(searchLow) ||
            m.id.toLowerCase().includes(searchLow)
        );
        const sFilteredModels = meterModels.filter(m =>
            m.name.toLowerCase().includes(searchLow) ||
            m.id.toLowerCase().includes(searchLow)
        );

        // Role-based filtering
        const vendorMeters = (userRole === 'vendor' || userRole === 'applicant') ? sFilteredMeters.filter(m => m.vendorId === (activeCompany?.id || loggedInVendorId)) : sFilteredMeters;
        const vendorReadings = (userRole === 'vendor' || userRole === 'applicant') ? readings.filter(r => vendorMeters.some(m => m.id === r.meterId)) : readings;

        // Finalized context vendor (prioritize activeCompany prop for real-time sync with dashboard)
        let contextVendor = vendors.find(v => v.id === (activeCompany?.id || loggedInVendorId)) || vendors[0];
        if ((userRole === 'vendor' || userRole === 'applicant') && activeCompany) {
            contextVendor = {
                ...contextVendor,
                id: activeCompany.id,
                name: activeCompany.name,
                location: activeCompany.zone || contextVendor.location
            };
        }

        const vList = (userRole === 'vendor' || userRole === 'applicant') ? [contextVendor] : sFilteredVendors;
        const vModels = (userRole === 'vendor' || userRole === 'applicant') ? sFilteredModels.filter(m => m.vendorId === (activeCompany?.id || loggedInVendorId)) : sFilteredModels;

        switch (activeTab) {
            case 'registration': return <RegistrationMock role={userRole} vendors={vendors} models={vModels} onRegister={registerMeter} vendorId={loggedInVendorId} globalSearch={globalSearch} />;
            case 'v-health': return <AssetHealth units={vendorMeters} onReplace={handleReplace} globalSearch={globalSearch} />;
            case 'vendor': return <VendorRegistry vendor={vList[0]} allVendors={vendors} models={vModels} units={vendorMeters} activities={activities} onUpdateStatus={updateVendorStatus} onAddStaff={addStaff} onUpdateStaff={updateStaff} onAddModel={addModel} onRegisterUnit={registerMeter} role={userRole} isAdmin={userRole === 'admin'} globalSearch={globalSearch} />;
            case 'installer': return <InstallerCertification meters={sFilteredMeters} onInstall={installMeter} globalSearch={globalSearch} />;
            case 'verification': return <MeterVerification meters={sFilteredMeters} onVerify={verifyMeter} globalSearch={globalSearch} />;
            case 'data': return <DataSubmissionView meters={vendorMeters} onSubmit={submitReading} readings={vendorReadings} globalSearch={globalSearch} />;
            case 'compliance': return <ComplianceMonitoring readings={readings} meters={sFilteredMeters} globalSearch={globalSearch} />;
            case 'enforcement': return <GroundwaterCharges readings={readings} meters={sFilteredMeters} globalSearch={globalSearch} />;
            case 'reports': return <ReportsView readings={vendorReadings} isVendor={userRole === 'vendor'} meters={vendorMeters} globalSearch={globalSearch} />;
            case 'integration': return <IntegrationView meters={sFilteredMeters} globalSearch={globalSearch} />;
            default: return <div className="p-40">Section Under Construction</div>;
        }
    };

    return (
        <div className="sys-canvas">
            <aside className={`sys-sidebar ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
                <div className="hub-top-banner">
                    <div className="banner-left">
                        <Activity size={16} />
                        <span>System Health: <strong>Optimal (98.2%)</strong></span>
                    </div>
                    <div className="banner-right">
                        <span>Last Telemetry Sync: 2 mins ago</span>
                        <div className="pulse-dot"></div>
                    </div>
                </div>

                <div className="hub-header">
                    <div className="sb-logo">
                        <div className="logo-box">M</div>
                        {isSidebarOpen && <span>Meter Registry</span>}
                    </div>
                    <button className="sb-toggle" onClick={() => setSidebarOpen(!isSidebarOpen)}>
                        <Activity size={20} className={isSidebarOpen ? 'spin-slow' : ''} />
                    </button>
                </div>

                <div className="hub-notifications">
                    <div className="hn-header">
                        <span>Surveillance Alerts</span>
                        <div className="badge-pulse">3 New</div>
                    </div>
                    <div className="hn-list">
                        <div className="hn-item critical">
                            <Siren size={14} />
                            <div><strong>Tamper Alert</strong><span>MTR-0098 @ Jodhpur Rural</span></div>
                        </div>
                        <div className="hn-item warning">
                            <AlertTriangle size={14} />
                            <div><strong>Overshoot</strong><span>Industry #44-A @ Jaipur</span></div>
                        </div>
                        <div className="hn-item success">
                            <CheckCircle size={14} />
                            <div><strong>Verification</strong><span>Rig-991 Link Verified</span></div>
                        </div>
                    </div>
                </div>
                <nav className="sb-nav">
                    <button className="sb-item" onClick={() => navigate('/dashboard')}>
                        <LayoutDashboard size={18} />
                        {isSidebarOpen && <span className="sb-label">Authority Hub</span>}
                    </button>
                    <div className="sb-hr"></div>
                    {filteredMenu.map(item => (
                        <button key={item.id} className={`sb-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
                            <span className="sb-icon">{item.icon}</span>
                            {isSidebarOpen && <span className="sb-label">{item.label}</span>}
                        </button>
                    ))}
                </nav>
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
                            <h2>Rajasthan Ground Water Authority</h2>
                            <p>State Water Management & Compliance Division</p>
                        </div>
                    </div>
                    <div className={`sys-search-bar ${isSearchFocused ? 'focused' : ''}`}>
                        <Search size={18} />
                        <input type="text" placeholder="Universal Search..." onFocus={() => setIsSearchFocused(true)} onBlur={() => setIsSearchFocused(false)} value={globalSearch} onChange={e => setGlobalSearch(e.target.value)} />
                    </div>
                    <div className="header-controls">
                        <div className="role-chip">
                            <Users size={14} />
                            <select value={userRole === 'applicant' ? 'vendor' : userRole} onChange={e => setUserRole(e.target.value)}>
                                <option value="admin">ADMIN</option>
                                <option value="officer">OFFICER</option>
                                <option value="vendor">VENDOR</option>
                            </select>
                        </div>
                        <button className="logout-btn" onClick={handleLogout}><LogOut size={20} /></button>
                    </div>
                </header>
                <div className="sys-content-view animated-view">
                    <TabContent />
                </div>
            </main>

            <style jsx>{`
                .active-context-bar {
                    background: #f1f5f9;
                    border-bottom: 1px solid #e2e8f0;
                    padding: 8px 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.85rem;
                }
                .ac-left { display: flex; align-items: center; gap: 12px; color: #475569; }
                .ac-left strong { color: #0f172a; }
                .ac-id { font-size: 0.75rem; color: #94a3b8; font-weight: 700; background: white; padding: 2px 8px; border-radius: 6px; border: 1px solid #e2e8f0; }
                .ac-switch { background: #0f172a; color: white; border: none; padding: 6px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s; }
                .ac-switch:hover { background: #1e293b; transform: translateY(-1px); }

                .sys-canvas { 
                    display: flex; 
                    height: 100vh; 
                    background: #f1f5f9; 
                    overflow: hidden; 
                    font-family: 'Inter', sans-serif; 
                }
                
                /* Premium Sidebar with Gradient */
                .sys-sidebar { 
                    background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
                    color: white; 
                    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
                    display: flex; 
                    flex-direction: column; 
                    box-shadow: 4px 0 10px rgba(0,0,0,0.1);
                    z-index: 100;
                }
                .sys-sidebar.expanded { width: 280px; }
                .sys-sidebar.collapsed { width: 80px; }

                .hub-top-banner { 
                    background: rgba(30, 41, 59, 0.5); 
                    padding: 12px 20px; 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    font-size: 0.7rem; 
                    color: #94a3b8; 
                    border-bottom: 1px solid rgba(255,255,255,0.05); 
                }
                .banner-left, .banner-right { display: flex; align-items: center; gap: 8px; }
                .pulse-dot { 
                    width: 8px; 
                    height: 8px; 
                    background: #10b981; 
                    border-radius: 50%; 
                    box-shadow: 0 0 8px #10b981;
                    animation: pulse 2s infinite; 
                }
                @keyframes pulse { 
                    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); } 
                    70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); } 
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } 
                }

                .hub-header {
                    padding: 24px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .sb-logo { display: flex; align-items: center; gap: 12px; }
                .logo-box { 
                    width: 36px; 
                    height: 36px; 
                    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                    border-radius: 10px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-weight: 800; 
                    color: white;
                    box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);
                }
                .sb-logo span { font-weight: 700; font-size: 1.1rem; letter-spacing: -0.5px; }

                .hub-notifications { padding: 10px 20px 20px; }
                .hn-header { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    margin-bottom: 15px; 
                    font-size: 0.65rem; 
                    color: #64748b; 
                    font-weight: 700; 
                    text-transform: uppercase; 
                    letter-spacing: 1px;
                }
                .badge-pulse { 
                    background: #ef4444; 
                    color: white; 
                    padding: 2px 8px; 
                    border-radius: 20px; 
                    font-size: 0.6rem; 
                    font-weight: 800;
                }
                
                .hn-list { display: flex; flex-direction: column; gap: 10px; }
                .hn-item { 
                    display: flex; 
                    align-items: center; 
                    gap: 12px; 
                    padding: 12px; 
                    border-radius: 12px; 
                    font-size: 0.75rem; 
                    background: rgba(30, 41, 59, 0.4); 
                    border: 1px solid rgba(255,255,255,0.05);
                    transition: all 0.2s;
                }
                .hn-item:hover { background: rgba(30, 41, 59, 0.6); transform: translateX(4px); }
                .hn-item.critical { border-left: 3px solid #ef4444; }
                .hn-item.warning { border-left: 3px solid #f59e0b; }
                .hn-item.success { border-left: 3px solid #10b981; }
                .hn-item strong { display: block; font-size: 0.8rem; color: #f8fafc; }
                .hn-item span { color: #94a3b8; font-size: 0.7rem; }

                .sb-nav { padding: 10px 15px; display: flex; flex-direction: column; gap: 4px; }
                .sb-item { 
                    display: flex; 
                    align-items: center; 
                    gap: 12px; 
                    padding: 12px 16px; 
                    border: none; 
                    background: transparent; 
                    color: #94a3b8; 
                    border-radius: 12px; 
                    cursor: pointer; 
                    transition: all 0.2s;
                    font-size: 0.9rem;
                    font-weight: 500;
                }
                .sb-item:hover { background: rgba(255,255,255,0.05); color: #f8fafc; }
                .sb-item.active { 
                    background: #2563eb; 
                    color: white; 
                    font-weight: 600; 
                    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
                }
                .sb-hr { height: 1px; background: rgba(255,255,255,0.05); margin: 15px 10px; }
                
                .sys-surface { flex: 1; display: flex; flex-direction: column; overflow: hidden; position: relative; }
                
                /* Glassmorphic Header */
                .sys-header { 
                    height: 80px; 
                    background: rgba(255, 255, 255, 0.8); 
                    backdrop-filter: blur(12px); 
                    border-bottom: 1px solid rgba(226, 232, 240, 0.8); 
                    padding: 0 40px; 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    z-index: 50; 
                }
                .header-branding { display: flex; align-items: center; gap: 18px; }
                .emblem-img { height: 48px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
                .branding-txt h2 { margin: 0; font-size: 1.25rem; color: #0f172a; font-weight: 800; }
                .branding-txt p { margin: 0; font-size: 0.7rem; color: #3b82f6; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; }
                
                .sys-search-bar { 
                    flex: 1; 
                    max-width: 460px; 
                    margin: 0 30px; 
                    background: #f1f5f9; 
                    border: 1px solid #e2e8f0; 
                    border-radius: 14px; 
                    display: flex; 
                    align-items: center; 
                    padding: 0 16px;
                    transition: all 0.3s;
                }
                .sys-search-bar.focused { 
                    border-color: #3b82f6; 
                    background: white; 
                    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
                    max-width: 500px;
                }
                .sys-search-bar input { border: none; background: transparent; padding: 12px; outline: none; width: 100%; font-weight: 500; color: #1e293b; }
                
                .header-controls { display: flex; gap: 20px; align-items: center; }
                .role-chip { 
                    display: flex; 
                    align-items: center; 
                    gap: 10px; 
                    background: white; 
                    padding: 8px 16px; 
                    border-radius: 12px; 
                    border: 1px solid #e2e8f0; 
                    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                }
                .role-chip select { border: none; background: transparent; font-weight: 700; outline: none; cursor: pointer; color: #1e293b; font-size: 0.85rem; }
                .logout-btn { 
                    background: #fff1f2; 
                    color: #e11d48; 
                    border: 1px solid #fecdd3; 
                    width: 44px; 
                    height: 44px; 
                    border-radius: 12px; 
                    cursor: pointer; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    transition: all 0.2s;
                }
                .logout-btn:hover { background: #e11d48; color: white; transform: rotate(90deg); }
                
                .sys-content-view { 
                    flex: 1; 
                    overflow-y: auto; 
                    background: #f8fafc; 
                    padding: 40px;
                    scrollbar-width: thin;
                    scrollbar-color: #cbd5e1 transparent;
                }
                .sys-content-view::-webkit-scrollbar { width: 6px; }
                .sys-content-view::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }

                .spin-slow { animation: spin 10s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                
                .animated-view { 
                    animation: slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1); 
                }
                @keyframes slideInUp { 
                    from { opacity: 0; transform: translateY(20px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }
            `}</style>
        </div>
    );
};


// ---------------- SUB-COMPONENTS ----------------

const RegistrationMock = ({ role, vendors = [], models = [], onRegister, vendorId }) => {
    const approvedVendors = vendors.filter(v => v.status === 'Approved');
    const myVendor = approvedVendors.find(v => v.id === vendorId);

    const [formData, setFormData] = useState({
        make: myVendor ? myVendor.name : '',
        modelId: '',
        serialNumber: '',
        applicantName: '',
        applicationId: '',
        borewellId: '',
        pipeSize: '80 mm',
        isIoT: true
    });

    // Sync if vendorId changes or initial load
    React.useEffect(() => {
        if (myVendor) {
            setFormData(prev => ({ ...prev, make: myVendor.name }));
        }
    }, [vendorId, vendors]);

    const handleSubmit = () => {
        if (!formData.modelId || !formData.serialNumber || !formData.applicationId) {
            alert('Please fill all mandatory fields: Model, Serial, and Application ID');
            return;
        }
        onRegister({
            ...formData,
            vendorId,
            status: 'Registered'
        });
    };

    return (
        <div className="tab-p-30">
            <div className="entry-form-container">
                <h3 className="section-title">Client Assignment & Unit Registration</h3>
                <p className="form-subtitle">Assign a physical meter unit from your inventory to an authorized groundwater applicant.</p>

                <div className="form-section">
                    <h4><Package size={16} /> 1. Product Identification</h4>
                    <div className="form-grid-cols">
                        <div className="form-group">
                            <label>Manufacturer</label>
                            <input type="text" value={formData.make} disabled className="disabled-input" />
                        </div>
                        <div className="form-group">
                            <label>Approved Model</label>
                            <select
                                value={formData.modelId}
                                onChange={e => setFormData({ ...formData, modelId: e.target.value })}
                            >
                                <option value="">Select Approved Model</option>
                                {models.map(m => (
                                    <option key={m.id} value={m.id}>{m.name} ({m.tech})</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Unit Serial Number</label>
                            <input
                                type="text"
                                placeholder="e.g. FM-2025-XXXX"
                                value={formData.serialNumber}
                                onChange={e => setFormData({ ...formData, serialNumber: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Inventory Status</label>
                            <span className="status-tag available">Available in Stock</span>
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h4><Users size={16} /> 2. Client / Applicant Link</h4>
                    <div className="form-grid-cols">
                        <div className="form-group">
                            <label>Application / NOC ID</label>
                            <input
                                type="text"
                                placeholder="e.g. NOC-RAJ-2025-001"
                                value={formData.applicationId}
                                onChange={e => setFormData({ ...formData, applicationId: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Applicant Name</label>
                            <input
                                type="text"
                                placeholder="Name of Landowner/Industry"
                                value={formData.applicantName}
                                onChange={e => setFormData({ ...formData, applicantName: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h4><Ruler size={16} /> 3. Technical Specifications</h4>
                    <div className="form-grid-cols">
                        <div className="form-group">
                            <label>Site Borewell ID</label>
                            <input
                                type="text"
                                placeholder="e.g. SITE-BW-Jaipur"
                                value={formData.borewellId}
                                onChange={e => setFormData({ ...formData, borewellId: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Pipe Diameter</label>
                            <select value={formData.pipeSize} onChange={e => setFormData({ ...formData, pipeSize: e.target.value })}>
                                <option>40 mm</option>
                                <option>50 mm</option>
                                <option>80 mm</option>
                                <option>100 mm</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button className="btn-secondary-sm">Save as Draft</button>
                    <button className="btn-save" onClick={handleSubmit}>Assign & Register</button>
                </div>
            </div>

            <style jsx>{`
                .tab-p-30 { padding: 0; }
                .entry-form-container { 
                    max-width: 1000px; 
                    margin: 0 auto; 
                    background: white; 
                    padding: 40px; 
                    border-radius: 24px; 
                    border: 1px solid #e2e8f0; 
                    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); 
                }
                .section-title { margin: 0 0 5px 0; font-size: 1.75rem; color: #0f172a; font-weight: 800; }
                .form-subtitle { margin-bottom: 40px; color: #64748b; font-size: 1rem; }
                .form-section { 
                    margin-bottom: 40px; 
                    background: #f8fafc; 
                    padding: 30px; 
                    border-radius: 20px; 
                    border: 1px solid #f1f5f9;
                }
                .form-section h4 { margin: 0 0 24px 0; color: #1e293b; display: flex; align-items: center; gap: 10px; font-size: 1.1rem; font-weight: 700; }
                .form-grid-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
                .form-group { display: flex; flex-direction: column; gap: 10px; }
                .form-group label { font-size: 0.8rem; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 1px; }
                .form-group input, .form-group select { 
                    padding: 14px 18px; 
                    border: 1.5px solid #e2e8f0; 
                    border-radius: 14px; 
                    font-size: 0.95rem; 
                    width: 100%; 
                    outline: none; 
                    transition: all 0.2s; 
                    background: white;
                }
                .form-group input:focus, .form-group select:focus { 
                    border-color: #3b82f6; 
                    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
                }
                .disabled-input { background: #f1f5f9 !important; color: #64748b; font-weight: 600; cursor: not-allowed; }
                .status-tag { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 20px; font-size: 0.75rem; font-weight: 800; background: #dcfce7; color: #166534; width: fit-content; text-transform: uppercase; }
                
                .form-actions { display: flex; justify-content: flex-end; gap: 20px; margin-top: 20px; }
                .btn-save { 
                    padding: 16px 40px; 
                    background: #2563eb; 
                    color: white; 
                    border: none; 
                    border-radius: 14px; 
                    font-weight: 700; 
                    cursor: pointer; 
                    transition: all 0.2s; 
                    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
                }
                .btn-save:hover { background: #1d4ed8; transform: translateY(-1px); }
                .btn-secondary-sm { 
                    padding: 16px 30px; 
                    background: white; 
                    border: 1.5px solid #e2e8f0; 
                    border-radius: 14px; 
                    color: #475569; 
                    font-weight: 700; 
                    cursor: pointer; 
                    transition: all 0.2s;
                }
            `}</style>
        </div>
    );
};


const DataSubmissionView = ({ meters = [], onSubmit, readings = [] }) => {
    const [subMode, setSubMode] = useState('manual');
    const [readingData, setReadingData] = useState({ meterId: '', val: '', date: '' });

    const handleSubmit = () => {
        if (!readingData.meterId || !readingData.val || !readingData.date) {
            alert('Please fill all fields');
            return;
        }
        onSubmit({
            id: Date.now(),
            ...readingData,
            val: Number(readingData.val)
        });
        setReadingData({ meterId: '', val: '', date: '' });
    };

    return (
        <div className="tab-p-30">
            <div className="card-panel">
                <div className="panel-header">
                    <h3>Data Submission & Monitoring</h3>
                    <div className="tabs-sub">
                        <button className={`sub-tab ${subMode === 'manual' ? 'active' : ''}`} onClick={() => setSubMode('manual')}>Manual Entry</button>
                        <button className={`sub-tab ${subMode === 'telemetry' ? 'active' : ''}`} onClick={() => setSubMode('telemetry')}>Telemetry Hub</button>
                    </div>
                </div>

                {subMode === 'manual' && (
                    <div className="manual-entry-grid animated">
                        <div className="form-group full-width">
                            <label>Select Meter</label>
                            <select
                                className="input-field"
                                value={readingData.meterId}
                                onChange={e => setReadingData({ ...readingData, meterId: e.target.value })}
                            >
                                <option value="">Select Active Meter</option>
                                {meters.map(m => (
                                    <option key={m.id} value={m.id}>
                                        {m.id} - {m.make} ({m.geoLat || 'No Location'})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>New Reading (m³)</label>
                            <input
                                type="number"
                                className="input-field"
                                placeholder="0.00"
                                value={readingData.val}
                                onChange={e => setReadingData({ ...readingData, val: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date of Reading</label>
                            <input
                                type="date"
                                className="input-field"
                                value={readingData.date}
                                onChange={e => setReadingData({ ...readingData, date: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Photo Proof</label>
                            <button className="upload-btn"><UploadCloud size={16} /> Upload Meter Image</button>
                        </div>
                        <div className="action-row">
                            <div className="info-tip"><Info size={14} /> Reading cannot be less than previous log.</div>
                            <button className="btn-primary-sm" onClick={handleSubmit}>Submit Verified Reading</button>
                        </div>
                    </div>
                )}

                {subMode === 'telemetry' && (
                    <div className="telemetry-view animated">
                        <div className="telemetry-stats">
                            <div className="t-stat"><div className="label">Active Conn.</div><div className="val">{meters.length} / {meters.length}</div></div>
                            <div className="t-stat"><div className="label">Avg Latency</div><div className="val">240ms</div></div>
                            <div className="t-stat"><div className="label">Packet Loss</div><div className="val">0.05%</div></div>
                        </div>
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Meter ID</th>
                                    <th>Reading (m³)</th>
                                    <th>Signal</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {readings.slice(0, 5).map((log, idx) => (
                                    <tr key={idx}>
                                        <td>{log.date}</td>
                                        <td>{log.meterId}</td>
                                        <td><strong>{log.val}</strong></td>
                                        <td><span className="sig-dot strong"></span> Good</td>
                                        <td><span className="status-badge-sm success">Normal</span></td>
                                    </tr>
                                ))}
                                {readings.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center' }}>No readings available</td></tr>}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <style jsx>{`
                .tab-p-30 { padding: 0; }
                .card-panel { background: white; padding: 35px; border-radius: 24px; border: 1px solid #e2e8f0; min-height: 550px; }
                .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 35px; }
                .panel-header h3 { margin: 0; font-size: 1.5rem; color: #0f172a; font-weight: 800; }
                
                .tabs-sub { display: flex; gap: 8px; background: #f1f5f9; padding: 6px; border-radius: 14px; }
                .sub-tab { border: none; background: transparent; font-weight: 700; color: #64748b; cursor: pointer; padding: 10px 20px; border-radius: 10px; transition: all 0.2s; font-size: 0.85rem; }
                .sub-tab.active { background: white; color: #2563eb; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }

                .manual-entry-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 800px; }
                .form-group label { display: block; font-size: 0.8rem; font-weight: 700; color: #475569; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
                .form-group.full-width { grid-column: span 2; }
                .input-field { width: 100%; padding: 14px; border: 1.5px solid #e2e8f0; border-radius: 12px; outline: none; transition: all 0.2s; }
                .input-field:focus { border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }
                
                .upload-btn { width: 100%; padding: 14px; border: 1.5px dashed #cbd5e1; background: #f8fafc; color: #64748b; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; font-weight: 600; font-size: 0.9rem; }
                .action-row { grid-column: span 2; display: flex; justify-content: space-between; align-items: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #f1f5f9; }
                .btn-primary-sm { padding: 14px 28px; background: #2563eb; color: white; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2); }
                .info-tip { display: flex; align-items: center; gap: 8px; color: #64748b; font-size: 0.8rem; font-weight: 500; }

                .telemetry-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
                .t-stat { background: #f8fafc; padding: 20px; border-radius: 16px; border: 1px solid #f1f5f9; }
                .t-stat .label { font-size: 0.7rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
                .t-stat .val { font-size: 1.5rem; font-weight: 800; color: #0f172a; }

                .modern-table { width: 100%; border-collapse: separate; border-spacing: 0; }
                .modern-table th { text-align: left; padding: 16px; color: #64748b; font-weight: 700; border-bottom: 1px solid #f1f5f9; font-size: 0.8rem; text-transform: uppercase; }
                .modern-table td { padding: 18px 16px; border-bottom: 1px solid #f1f5f9; color: #1e293b; font-size: 0.95rem; }
                .sig-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 8px; box-shadow: 0 0 8px rgba(34, 197, 94, 0.5); }
                .sig-dot.strong { background: #22c55e; } 
                .status-badge-sm { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }
                .status-badge-sm.success { background: #dcfce7; color: #166534; }
                .animated { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

const ReportsView = ({ readings = [], isVendor }) => {
    // Dynamic Stats
    const totalAbstraction = readings.reduce((sum, r) => sum + (Number(r.val) || 0), 0);
    const complianceScore = totalAbstraction > 50000 ? '85.2%' : '98.5%'; // Mocked logic
    const alerts = totalAbstraction > 50000 ? 3 : 0;

    // Derived Data for Chart
    const chartData = readings.length > 0 ? readings.map(r => ({
        day: r.date,
        usage: r.val,
        limit: 15000 // Mock limit
    })) : [
        // Fallback default data for demo
        { day: 'Mon', usage: 12000, limit: 15000 },
        { day: 'Tue', usage: 13500, limit: 15000 },
        { day: 'Wed', usage: 11000, limit: 15000 },
    ];

    return (
        <div className="tab-p-30">
            <div className="reports-container">
                <h3 className="section-title">
                    {isVendor ? 'Manufacturer Performance Analytics' : 'Abstraction Analytics & Compliance Reports'}
                </h3>

                <div className="kpi-row">
                    <div className="kpi-card">
                        <div className="icon-bx blue"><Database size={20} /></div>
                        <div>
                            <div className="kpi-val">{totalAbstraction.toLocaleString()} m³</div>
                            <div className="kpi-lbl">{isVendor ? 'Total Sales Abstraction' : 'Total Abstraction (Cumulative)'}</div>
                        </div>
                    </div>
                    <div className="kpi-card">
                        <div className="icon-bx green"><CheckCircle size={20} /></div>
                        <div>
                            <div className="kpi-val">{complianceScore}</div>
                            <div className="kpi-lbl">Compliance Score</div>
                        </div>
                    </div>
                    <div className="kpi-card">
                        <div className="icon-bx amber"><AlertTriangle size={20} /></div>
                        <div>
                            <div className="kpi-val">{alerts} Alerts</div>
                            <div className="kpi-lbl">Overshoot Warnings</div>
                        </div>
                    </div>
                </div>

                <div className="charts-grid">
                    <div className="chart-card large">
                        <div className="chart-header">
                            <h4>Abstraction History</h4>
                            <select><option>All Time</option></select>
                        </div>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <RechartsTooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        cursor={{ fill: '#f1f5f9' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="usage" name="Actual Extraction" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                                    <Bar dataKey="limit" name="NOC Limit" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="chart-card">
                        <div className="chart-header">
                            <h4>Usage by Purpose</h4>
                        </div>
                        <div style={{ width: '100%', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={[{ name: 'Industrial', value: 70 }, { name: 'Domestic', value: 20 }, { name: 'Cooling', value: 10 }]}
                                        innerRadius={60} outerRadius={80} paddingAngle={5}
                                        dataKey="value"
                                    >
                                        <Cell fill="#2563eb" />
                                        <Cell fill="#10b981" />
                                        <Cell fill="#f59e0b" />
                                    </Pie>
                                    <RechartsTooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
            .tab-p-30 { padding: 0; }
            .section-title { margin-bottom: 30px; color: #0f172a; font-size: 1.75rem; font-weight: 800; }
            
            .kpi-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 35px; }
            .kpi-card { 
                background: white; 
                padding: 24px; 
                border-radius: 20px; 
                border: 1px solid #e2e8f0; 
                display: flex; 
                align-items: center; 
                gap: 20px; 
                box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
            }
            .icon-bx { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; color: white; }
            .icon-bx.blue { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }
            .icon-bx.green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
            .icon-bx.amber { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
            .kpi-val { font-size: 1.75rem; font-weight: 800; color: #0f172a; line-height: 1.2; margin-bottom: 4px; }
            .kpi-lbl { font-size: 0.8rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
-
            .charts-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
            .chart-card { 
                background: white; 
                padding: 30px; 
                border-radius: 24px; 
                border: 1px solid #e2e8f0; 
            }
            .chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
            .chart-header h4 { margin: 0; color: #0f172a; font-size: 1.1rem; font-weight: 700; }
            .chart-header select { 
                padding: 8px 16px; 
                border-radius: 12px; 
                border: 1px solid #e2e8f0; 
                font-size: 0.85rem; 
                background: #f8fafc; 
                font-weight: 600;
                outline: none;
            }
        `}</style>
        </div>
    );
};

const IntegrationView = () => (
    <div className="tab-p-30">
        <div className="integration-matrix animated">
            <div className="matrix-header">
                <h3>Digital Infrastructure Matrix</h3>
                <p>Cross-verified linkage between Approvals (NOC), Execution (Rigs), and Monitoring (Meters).</p>
            </div>

            <div className="matrix-flow">
                <div className="step approved">
                    <div className="step-icon"><FileText size={24} /></div>
                    <div className="step-info">
                        <strong>NOC Approval</strong>
                        <span>ID: NOC-2025-081</span>
                    </div>
                </div>
                <div className="flow-line active"></div>
                <div className="step approved">
                    <div className="step-icon"><Link2 size={24} /></div>
                    <div className="step-info">
                        <strong>Rig Authorization</strong>
                        <span>ID: RIG-JP-442</span>
                    </div>
                </div>
                <div className="flow-line pulse"></div>
                <div className="step active">
                    <div className="step-icon"><Database size={24} /></div>
                    <div className="step-info">
                        <strong>Meter Deployment</strong>
                        <span>ID: MTR-8892</span>
                    </div>
                </div>
                <div className="flow-line"></div>
                <div className="step pending">
                    <div className="step-icon"><CheckCircle size={24} /></div>
                    <div className="step-info">
                        <strong>Final Audit</strong>
                        <span>In Queue</span>
                    </div>
                </div>
            </div>

            <div className="linkage-table-card mt-30">
                <h4>Recent Infrastructure Links</h4>
                <div className="table-mini-wrapper">
                    <table className="mini-table">
                        <thead>
                            <tr>
                                <th>Project Code</th>
                                <th>NOC Holder</th>
                                <th>Assigned Rig</th>
                                <th>IoT Meter</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>PRJ-001</td>
                                <td>Adani Solar Park</td>
                                <td>DeepDrill 22</td>
                                <td>FM-2025-01</td>
                                <td><span className="dot-active"></span> Linked</td>
                            </tr>
                            <tr>
                                <td>PRJ-002</td>
                                <td>Jaipur Textile Hub</td>
                                <td>RJ-Rig-09</td>
                                <td>AT-8812</td>
                                <td><span className="dot-pending"></span> Pending Verification</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <style jsx>{`
            .tab-p-30 { padding: 30px; }
            .integration-matrix { background: white; padding: 40px; border-radius: 20px; border: 1px solid #e2e8f0; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05); }
            .matrix-header { margin-bottom: 40px; }
            .matrix-header h3 { font-size: 1.5rem; color: #1e293b; margin: 0 0 5px 0; font-weight: 800; }
            .matrix-header p { color: #64748b; font-size: 0.95rem; }

            .matrix-flow { display: flex; align-items: center; gap: 0; padding: 20px 0; }
            .step { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px; z-index: 2; width: 140px; }
            .step-icon { width: 56px; height: 56px; border-radius: 16px; background: #f8fafc; border: 2px solid #e2e8f0; display: flex; align-items: center; justify-content: center; color: #94a3b8; transition: all 0.3s; }
            .step-info strong { display: block; font-size: 0.85rem; color: #1e293b; }
            .step-info span { font-size: 0.75rem; color: #94a3b8; font-weight: 600; font-family: monospace; }
            
            .step.approved .step-icon { background: #f0fdf4; border-color: #4ade80; color: #166534; }
            .step.active .step-icon { background: #eff6ff; border-color: #3b82f6; color: #2563eb; transform: scale(1.1); box-shadow: 0 4px 12px rgba(37,99,235,0.2); }
            .step.pending .step-icon { border-style: dashed; }

            .flow-line { flex: 1; height: 3px; background: #e2e8f0; margin-top: -50px; position: relative; top: -14px; }
            .flow-line.active { background: #4ade80; }
            .flow-line.pulse { background: #3b82f6; }
            .flow-line.pulse::after { content: ''; position: absolute; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, #fff, transparent); animation: slide 1.5s infinite; }
            
            @keyframes slide { from { transform: translateX(-100%); } to { transform: translateX(100%); } }

            .mt-30 { margin-top: 50px; }
            .linkage-table-card h4 { margin-bottom: 20px; font-size: 1.1rem; color: #334155; }
            .table-mini-wrapper { background: #f8fafc; border-radius: 12px; padding: 10px; }
            .mini-table { width: 100%; border-collapse: collapse; }
            .mini-table th { text-align: left; font-size: 0.75rem; color: #64748b; text-transform: uppercase; padding: 10px; border-bottom: 1px solid #e2e8f0; }
            .mini-table td { font-size: 0.85rem; color: #475569; padding: 12px 10px; border-bottom: 1px solid #f1f5f9; }
            
            .dot-active { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #22c55e; margin-right: 6px; }
            .dot-pending { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #f59e0b; margin-right: 6px; }
        `}</style>
    </div>
);

const ComplianceMonitoring = ({ readings = [] }) => {
    // Logic: Identify readings that exceed a daily limit (e.g., 500 m3)
    const LIMIT = 500;
    const violations = readings.filter(r => r.val > LIMIT).map(r => ({
        ...r,
        excess: r.val - LIMIT,
        severity: (r.val - LIMIT) > 200 ? 'Critical' : 'Moderate'
    }));

    return (
        <div className="tab-p-30">
            <div className="compliance-header">
                <h3><ShieldCheck size={20} /> Regulatory Compliance Dashboard</h3>
                <span className="badge-alert">{violations.length} Active Violations</span>
            </div>

            <div className="violations-list">
                {violations.length === 0 ? (
                    <div className="empty-state-green">
                        <CheckCircle size={40} />
                        <h4>All Systems Compliant</h4>
                        <p>No abstraction limit violations detected in the current cycle.</p>
                    </div>
                ) : (
                    violations.map((v, i) => (
                        <div key={i} className="violation-card">
                            <div className="v-icon warning"><AlertTriangle size={24} /></div>
                            <div className="v-details">
                                <h4>Overshoot Detected: Meter {v.meterId}</h4>
                                <p>Recorded: {v.val} m³ | Limit: {LIMIT} m³ | Date: {v.date}</p>
                            </div>
                            <div className="v-actions">
                                <span className={`severity-tag ${v.severity.toLowerCase()}`}>{v.severity}</span>
                                <button className="btn-secondary-sm">Issue Notice</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <style jsx>{`
                .tab-p-30 { padding: 0; }
                .compliance-header { 
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
                .compliance-header h3 { margin: 0; display: flex; align-items: center; gap: 12px; color: #0f172a; font-weight: 800; font-size: 1.25rem; }
                .badge-alert { 
                    background: #fef2f2; 
                    color: #dc2626; 
                    padding: 8px 16px; 
                    border-radius: 12px; 
                    font-weight: 800; 
                    font-size: 0.85rem; 
                    border: 1px solid #fee2e2;
                }
                
                .empty-state-green { 
                    text-align: center; 
                    padding: 80px 40px; 
                    background: white; 
                    border: 1px solid #e2e8f0; 
                    border-radius: 24px; 
                    color: #059669; 
                    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
                }
                .empty-state-green h4 { margin: 20px 0 10px; font-size: 1.5rem; color: #0f172a; font-weight: 800; }
                .empty-state-green p { color: #64748b; font-size: 1rem; }
                
                .violations-list { display: flex; flex-direction: column; gap: 20px; }
                .violation-card { 
                    background: white; 
                    padding: 24px; 
                    border-radius: 20px; 
                    border: 1px solid #fee2e2; 
                    border-left: 6px solid #ef4444; 
                    display: flex; 
                    align-items: center; 
                    gap: 24px; 
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
                    transition: transform 0.2s;
                }
                .violation-card:hover { transform: translateX(8px); }
                .v-icon.warning { 
                    color: #ef4444; 
                    background: #fef2f2; 
                    width: 56px; 
                    height: 56px; 
                    border-radius: 16px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    flex-shrink: 0;
                }
                .v-details { flex: 1; }
                .v-details h4 { margin: 0 0 4px 0; color: #0f172a; font-weight: 700; font-size: 1.1rem; }
                .v-details p { margin: 0; font-size: 0.9rem; color: #64748b; font-weight: 500; }
                .v-actions { display: flex; align-items: center; gap: 20px; }
                .severity-tag { padding: 6px 14px; border-radius: 10px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
                .severity-tag.critical { background: #fef2f2; color: #dc2626; border: 1px solid #fee2e2; }
                .severity-tag.moderate { background: #fffbeb; color: #d97706; border: 1px solid #fef3c7; }
                .btn-secondary-sm { 
                    padding: 10px 20px; 
                    border: 1.5px solid #e2e8f0; 
                    background: white; 
                    border-radius: 12px; 
                    cursor: pointer; 
                    font-weight: 700; 
                    font-size: 0.85rem; 
                    color: #475569;
                    transition: all 0.2s;
                }
                .btn-secondary-sm:hover { border-color: #3b82f6; color: #2563eb; }
             `}</style>
        </div>
    );
};

const GroundwaterCharges = ({ readings = [] }) => {
    const [selectedChallan, setSelectedChallan] = useState(null);
    const TARIFF_RATE = 10;
    const PENALTY_RATE = 25;
    const LIMIT = 500;

    const charges = readings.map(r => {
        const excess = Math.max(0, r.val - LIMIT);
        const baseCharge = Math.min(r.val, LIMIT) * TARIFF_RATE;
        const penalty = excess * PENALTY_RATE;
        return { ...r, excess, base: baseCharge, penalty, total: baseCharge + penalty, status: 'Unpaid' };
    });

    const ChallanModal = ({ challan, onClose }) => (
        <div className="modal-overlay" onClick={onClose}>
            <div className="challan-doc animated" onClick={e => e.stopPropagation()}>
                <div className="doc-watermark">RGWA</div>
                <div className="doc-header">
                    <div className="dh-left">
                        <h2>Digital Demand Note</h2>
                        <span className="doc-no">REF: {challan.meterId}/DEC-2024</span>
                    </div>
                    <div className="dh-right">
                        <div className="rajasthan-logo-small">RGWA</div>
                    </div>
                </div>
                <div className="doc-grid">
                    <div className="dg-item"><label>Payer Identity</label><strong>{challan.meterId}</strong></div>
                    <div className="dg-item"><label>Log Period</label><strong>December 2024</strong></div>
                    <div className="dg-item"><label>Due Date</label><strong>15 Jan 2025</strong></div>
                    <div className="dg-item"><label>Abstraction</label><strong>{challan.val} m³</strong></div>
                </div>
                <div className="doc-table">
                    <div className="tr-header"><span>Item</span><span>Calculation</span><span>Amount (₹)</span></div>
                    <div className="tr"><span>Base Abstraction</span><span>{Math.min(challan.val, LIMIT)} m³ @ ₹{TARIFF_RATE}</span><span>₹{challan.base}</span></div>
                    <div className="tr"><span>Penalty (Excess)</span><span>{challan.excess} m³ @ ₹{PENALTY_RATE}</span><span className="text-red">₹{challan.penalty}</span></div>
                    <div className="tr-footer"><span>Total Amount Due</span><span></span><strong>₹{challan.total}</strong></div>
                </div>
                <div className="doc-actions">
                    <button className="btn-pay-now">Proceed to Payment Gateway <ArrowRight size={16} /></button>
                    <button className="btn-download" onClick={onClose}>Close Document</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="tab-p-30">
            <div className="billing-header">
                <h3><Gavel size={20} /> Revenue & Billing Ledger</h3>
                <div className="billing-stats">
                    <div className="b-stat"><label>Total Outstanding</label><strong>₹{charges.reduce((s, c) => s + c.total, 0)}</strong></div>
                    <div className="b-stat"><label>Unpaid Docs</label><strong className="text-red">{charges.length}</strong></div>
                </div>
            </div>

            <div className="challan-grid">
                {charges.map((c, i) => (
                    <div key={i} className="challan-card-mini animated">
                        <div className="cc-header">
                            <span className="cc-id">{c.meterId}</span>
                            <span className="unpaid-tag">Unpaid</span>
                        </div>
                        <div className="cc-body">
                            <div className="cc-row"><span>Log Value</span><strong>{c.val} m³</strong></div>
                            <div className="cc-row"><span>Total Demand</span><strong>₹{c.total}</strong></div>
                        </div>
                        <button className="btn-view-challan" onClick={() => setSelectedChallan(c)}>View Demand Note</button>
                    </div>
                ))}
            </div>

            {selectedChallan && <ChallanModal challan={selectedChallan} onClose={() => setSelectedChallan(null)} />}

            <style jsx>{`
                .tab-p-30 { padding: 0; }
                .billing-header { 
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
                .billing-header h3 { margin: 0; display: flex; align-items: center; gap: 12px; color: #0f172a; font-weight: 800; font-size: 1.25rem; }
                .billing-stats { display: flex; gap: 30px; }
                .b-stat { text-align: right; }
                .b-stat label { display: block; font-size: 0.7rem; color: #64748b; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
                .b-stat strong { font-size: 1.25rem; color: #0f172a; font-weight: 800; }
                .text-red { color: #ef4444 !important; }
                
                .challan-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
                .challan-card-mini { 
                    background: white; 
                    border: 1px solid #e2e8f0; 
                    border-radius: 20px; 
                    padding: 24px; 
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
                }
                .challan-card-mini:hover { 
                    border-color: #3b82f6; 
                    transform: translateY(-4px); 
                    box-shadow: 0 12px 20px -5px rgba(0,0,0,0.08); 
                }
                .cc-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                .cc-id { font-family: monospace; font-weight: 800; color: #0f172a; font-size: 1rem; }
                .unpaid-tag { 
                    font-size: 0.65rem; 
                    background: #fef2f2; 
                    color: #dc2626; 
                    padding: 4px 10px; 
                    border-radius: 8px; 
                    font-weight: 800; 
                    text-transform: uppercase;
                    border: 1px solid #fee2e2;
                }
                .cc-body { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
                .cc-row { display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 500; }
                .cc-row span { color: #64748b; }
                .cc-row strong { color: #1e293b; font-weight: 700; }
                .btn-view-challan { 
                    width: 100%; 
                    padding: 12px; 
                    border: 1.5px solid #e2e8f0; 
                    border-radius: 12px; 
                    background: white; 
                    font-weight: 700; 
                    color: #475569; 
                    cursor: pointer; 
                    transition: all 0.2s;
                    font-size: 0.85rem;
                }
                .btn-view-challan:hover { background: #0f172a; color: white; border-color: #0f172a; }
-
                /* Billing Modal Styled as Professional Invoice */
                .challan-doc { 
                    background: white; 
                    width: 550px; 
                    padding: 50px; 
                    border-radius: 4px; 
                    border: 1px solid #e2e8f0; 
                    position: relative; 
                    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); 
                    font-family: 'Inter', sans-serif; 
                    height: fit-content; 
                    overflow: hidden;
                }
                .doc-watermark { 
                    position: absolute; 
                    font-size: 8rem; 
                    font-weight: 900; 
                    color: #f1f5f9; 
                    transform: rotate(-45deg); 
                    top: 30%; 
                    left: 10%; 
                    z-index: 0; 
                    pointer-events: none; 
                    opacity: 0.5;
                }
                .doc-header { 
                    position: relative; 
                    z-index: 1; 
                    display: flex; 
                    justify-content: space-between; 
                    border-bottom: 3px solid #0f172a; 
                    padding-bottom: 24px; 
                    margin-bottom: 30px; 
                }
                .doc-header h2 { margin: 0; font-size: 1.5rem; text-transform: uppercase; letter-spacing: 1px; color: #0f172a; font-weight: 900; }
                .doc-no { font-size: 0.8rem; color: #64748b; font-weight: 700; margin-top: 4px; display: block; }
                .rajasthan-logo-small { 
                    font-weight: 900; 
                    font-size: 1rem; 
                    border: 3px solid #0f172a; 
                    padding: 4px 8px; 
                    height: fit-content;
                }
                
                .doc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px; position: relative; z-index: 1; }
                .dg-item label { display: block; font-size: 0.65rem; color: #94a3b8; text-transform: uppercase; font-weight: 800; letter-spacing: 0.5px; margin-bottom: 4px; }
                .dg-item strong { color: #0f172a; font-size: 1rem; }
-
                .doc-table { margin-bottom: 40px; position: relative; z-index: 1; border: 1px solid #e2e8f0; }
                .tr-header { display: flex; justify-content: space-between; padding: 12px; background: #f8fafc; color: #0f172a; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; border-bottom: 2px solid #0f172a; }
                .tr { display: flex; justify-content: space-between; padding: 15px 12px; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; color: #1e293b; font-weight: 500; }
                .tr-footer { display: flex; justify-content: space-between; padding: 20px 12px; background: #f8fafc; font-size: 1.15rem; color: #0f172a; border-top: 2px solid #0f172a; }
                
                .doc-actions { display: flex; flex-direction: column; gap: 12px; position: relative; z-index: 1; }
                .btn-pay-now { 
                    padding: 16px; 
                    background: #0f172a; 
                    color: white; 
                    border: none; 
                    font-weight: 800; 
                    cursor: pointer; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    gap: 12px; 
                    transition: all 0.2s; 
                    font-size: 1rem;
                }
                .btn-pay-now:hover { background: #1e293b; }
                .btn-download { padding: 14px; background: white; border: 1.5px solid #e2e8f0; color: #64748b; font-weight: 700; cursor: pointer; border-radius: 0; }
            `}</style>
        </div>
    );
};

const AssetHealth = ({ units = [], onReplace }) => {
    const alerts = units.filter(u => u.health?.status !== 'Healthy' && u.health?.status !== 'New');

    const handleTriggerReplacement = (id) => {
        const newSerial = prompt("Enter New Serial Number for Replacement unit:");
        if (newSerial) {
            onReplace(id, newSerial);
        }
    };

    return (
        <div className="asset-health-portal animated">
            <div className="health-dashboard">
                <div className="health-stats">
                    <div className="h-stat-card">
                        <Activity size={24} className="icon-blue" />
                        <div><h3>{units.length}</h3><p>Total Assets</p></div>
                    </div>
                    <div className="h-stat-card">
                        <AlertTriangle size={24} className="icon-orange" />
                        <div><h3>{alerts.length}</h3><p>Health Alerts</p></div>
                    </div>
                    <div className="h-stat-card">
                        <CheckCircle size={24} className="icon-green" />
                        <div><h3>{units.length - alerts.length}</h3><p>Operational</p></div>
                    </div>
                </div>

                <div className="health-main-grid">
                    <div className="health-table-box">
                        <div className="table-header">
                            <h3>Critical Asset Monitoring</h3>
                            <button className="btn-secondary-v2"><RefreshCcw size={16} /> Poll All Units</button>
                        </div>
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th>Asset Serial</th>
                                    <th>Telemetry</th>
                                    <th>Health Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {units.map(u => (
                                    <tr key={u.id}>
                                        <td><strong>{u.serialNumber}</strong><br /><small>{u.modelId}</small></td>
                                        <td>
                                            <div className="telemetry-stack">
                                                <span><Battery size={12} /> {u.health?.battery}%</span>
                                                <span><Signal size={12} /> {u.health?.signal}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`health-tag ${u.health?.status?.toLowerCase()}`}>
                                                {u.health?.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-action-sm red" onClick={() => handleTriggerReplacement(u.id)}>
                                                <RotateCcw size={14} /> Replace
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="maintenance-logs">
                        <div className="table-header">
                            <h3><History size={18} /> Support Tickets</h3>
                        </div>
                        <div className="ticket-list">
                            <div className="ticket-item">
                                <span className="t-id">#TIC-992</span>
                                <strong>Battery Swap Required</strong>
                                <span className="t-status open">Open</span>
                            </div>
                            <div className="ticket-item">
                                <span className="t-id">#TIC-881</span>
                                <strong>Calibration Verified</strong>
                                <span className="t-status closed">Resolved</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .asset-health-portal { padding: 0; }
                .health-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 35px; }
                .h-stat-card { 
                    background: white; 
                    padding: 24px; 
                    border-radius: 20px; 
                    border: 1px solid #e2e8f0; 
                    display: flex; 
                    align-items: center; 
                    gap: 20px; 
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
                }
                .icon-blue { color: #3b82f6; }
                .icon-orange { color: #f59e0b; }
                .icon-green { color: #10b981; }
                .h-stat-card h3 { margin: 0; font-size: 1.75rem; color: #0f172a; font-weight: 800; line-height: 1.2; }
                .h-stat-card p { margin: 0; color: #64748b; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }

                .health-main-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
                .health-table-box, .maintenance-logs { 
                    background: white; 
                    border-radius: 24px; 
                    border: 1px solid #e2e8f0; 
                    padding: 30px; 
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
                }
                
                .table-header { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    margin-bottom: 24px; 
                }
                .table-header h3 { margin: 0; display: flex; align-items: center; gap: 10px; font-size: 1.1rem; color: #0f172a; font-weight: 700; }
                
                .telemetry-stack { display: flex; flex-direction: column; gap: 6px; font-size: 0.85rem; color: #475569; font-weight: 500; }
                .telemetry-stack span { display: flex; align-items: center; gap: 8px; }

                .health-tag { padding: 6px 14px; border-radius: 12px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
                .health-tag.healthy { background: #f0fdf4; color: #10b981; border: 1px solid #dcfce7; }
                .health-tag.new { background: #eff6ff; color: #2563eb; border: 1px solid #dbeafe; }
                .health-tag.warning { background: #fffbeb; color: #d97706; border: 1px solid #fef3c7; }
                
                .btn-action-sm { 
                    background: white; 
                    border: 1.5px solid #e2e8f0; 
                    color: #475569; 
                    padding: 8px 16px; 
                    border-radius: 10px; 
                    font-size: 0.85rem; 
                    cursor: pointer; 
                    display: flex; 
                    align-items: center; 
                    gap: 8px; 
                    font-weight: 700;
                    transition: all 0.2s;
                }
                .btn-action-sm:hover { background: #f1f5f9; color: #1e293b; border-color: #cbd5e1; }
                .btn-action-sm.red { color: #dc2626; border-color: #fee2e2; }
                .btn-action-sm.red:hover { background: #fef2f2; border-color: #fecaca; }

                .ticket-list { display: flex; flex-direction: column; gap: 14px; }
                .ticket-item { 
                    background: #f8fafc; 
                    padding: 20px; 
                    border-radius: 16px; 
                    border: 1px solid #f1f5f9;
                    transition: transform 0.2s;
                }
                .ticket-item:hover { transform: scale(1.02); }
                .ticket-item strong { display: block; font-size: 0.95rem; color: #1e293b; margin: 8px 0; font-weight: 700; }
                .t-id { font-size: 0.7rem; color: #94a3b8; font-family: monospace; font-weight: 800; text-transform: uppercase; }
                .t-status { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; padding: 4px 8px; border-radius: 6px; letter-spacing: 0.5px; }
                .t-status.open { background: #fff7ed; color: #c2410c; border: 1px solid #ffedd5; }
                .t-status.resolved { background: #f0fdf4; color: #15803d; border: 1px solid #dcfce7; }
            `}</style>
        </div>
    );
};

export default MeterRegistrationSystem;

