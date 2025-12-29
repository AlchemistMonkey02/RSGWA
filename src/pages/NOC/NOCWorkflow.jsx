import React, { useState } from 'react';
import {
    FileText, MapPin, Droplets, UploadCloud, CheckCircle, AlertCircle,
    ArrowRight, ArrowLeft, Building2, Gavel, Search, Download, Plus, Globe,
    LayoutDashboard, Users, Clock, Filter, Eye, MessageSquare, BarChart2,
    Shield, Settings, Activity, MoreVertical, CheckSquare, ClipboardCheck,
    ArrowUpRight, ArrowDownRight, Lock, Check, RefreshCw, Send, ChevronDown, ChevronRight, ChevronLeft, LogOut, BookOpen, CreditCard, Wallet, FileCheck, Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import sub-pages to integrate into the Hub
import ApplicationForm from '../ApplicationForm';
import SelfCompliance from '../SelfCompliance';
import SelfInspection from '../SelfInspection';
import RenewalApplication from '../RenewalApplication';
import EAC from '../EAC';
import Passbook from '../Passbook';
import PaymentDetails from '../PaymentDetails';
import Reports from '../Reports';
import ServicePortfolio from './ServicePortfolio';
import UnifiedApplicationEngine from './UnifiedApplicationEngine';
import NOCDetails from './NOCDetails';
import GISDashboard from './GISDashboard';


const NOCWorkflow = ({ activeCompany, setActiveCompany, userCompanies = [], setUserCompanies }) => {
    const [role, setRole] = useState('applicant'); // 'applicant' | 'officer'
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [step, setStep] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [selectedService, setSelectedService] = useState(null);

    // Mock Form Data
    const [formData, setFormData] = useState({
        name: activeCompany?.name || userCompanies[0]?.name || 'Rajas Stones Pvt Ltd',
        type: 'Small (MSME)',
        district: 'Jaipur',
        zone: activeCompany?.zone || userCompanies[0]?.zone || 'Safe',
        plotArea: '2500',
        waterReq: '45.5',
        purpose: 'Industrial'
    });

    // Handle context switching
    React.useEffect(() => {
        if (activeCompany) {
            setFormData(prev => ({
                ...prev,
                name: activeCompany.name,
                zone: activeCompany.zone || prev.zone
            }));
        }
    }, [activeCompany]);

    // Unified Application Engine handles dynamic steps

    const applicantItems = [
        { id: 'dashboard', label: 'My NOC Portfolio', icon: <LayoutDashboard size={18} /> },
        { id: 'services', label: 'Services Portfolio', icon: <Globe size={18} /> },
        { id: 'new', label: 'Apply New NOC', icon: <Plus size={18} /> },
        { id: 'vault', label: 'Digital Vault', icon: <Shield size={18} /> },
        { id: 'passbook', label: 'Application Passbook', icon: <FileText size={18} /> },
        { id: 'gis', label: 'GIS Platform', icon: <Globe size={18} /> },
        { id: 'compliance', label: 'Self Compliance', icon: <CheckSquare size={18} /> },
        { id: 'notices', label: 'Legal Orders & Notices', icon: <Gavel size={18} /> },
        { id: 'inspection', label: 'Self Inspection', icon: <ClipboardCheck size={18} /> },
        { id: 'reports', label: 'My NOC Reports', icon: <BarChart2 size={18} /> }
    ];

    const menuItems = {
        applicant: applicantItems,
        officer: [
            { id: 'tasks', label: 'Scrutiny Queue', icon: <Clock size={18} /> },
            { id: 'verified', label: 'NOC Issued', icon: <CheckCircle size={18} /> },
            { id: 'enforcement', label: 'Enforcement Hub', icon: <Gavel size={18} /> },
            { id: 'reports', label: 'Analysis', icon: <Activity size={18} /> }
        ]
    };

    // New state for handling detailed NOC view
    const [viewingNocId, setViewingNocId] = useState(null);

    const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
    const [tasks, setTasks] = useState([
        {
            id: 'RJ-IND-2023-18580',
            name: 'M/s Rekart Industries Private Limited',
            status: 'Under Review',
            statusClass: 'yellow',
            time: '8 days left',
            location: 'Bundi',
            category: 'MEDIUM',
            officer: 'R.P. Sharma',
            type: 'abstraction-industry',
            query: null,
            response: null,
            // Rekart Master Data
            appNo: '21-4/18580/RJ/IND/2023',
            submissionDate: '03/07/2023',
            waterQuality: 'Fresh Water',
            areaType: 'Non-Notified',
            areaCategory: 'Semi-Critical',
            msmeStatus: 'Micro',
            projectStatus: 'Proposed',
            latitude: '25.730000',
            longitude: '76.180000',
            village: 'Nayagaon',
            tehsil: 'Indergarh',
            landUse: {
                greenBelt: { existing: 0, proposed: 37101.82, total: 37101.82 },
                roads: { existing: 0, proposed: 8941.66, total: 8941.66 },
                rooftop: { existing: 0, proposed: 78654.24, total: 78654.24 },
                total: { existing: 0, proposed: 124697.72, total: 124697.72 }
            },
            waterRequirement: {
                groundwater: 480,
                surface: 0,
                agency: 0,
                totalFresh: 480,
                recycled: 378,
                totalReq: 858
            },
            usageBreakdown: [
                { activity: 'Industrial Process', qty: 810, days: 300, annual: 243000 },
                { activity: 'Domestic', qty: 10, days: 300, annual: 3000 },
                { activity: 'Greenbelt', qty: 38, days: 300, annual: 11400 }
            ],
            recycling: {
                wastewater: 385,
                treatedAvailable: 378,
                reuseIndustrial: 340,
                reuseGreenbelt: 38
            },
            structures: [
                { id: 1, year: 2023, meter: 'Pending', tele: 'Required' },
                { id: 2, year: 2023, meter: 'Pending', tele: 'Required' },
                { id: 3, year: 2023, meter: 'Pending', tele: 'Required' },
                { id: 4, year: 2023, meter: 'Pending', tele: 'Required' }
            ],
            documents: {
                sitePlan: true,
                ownership: true,
                waterBalance: true,
                hydroReport: true,
                rwhProposal: true,
                msmeCert: true,
                spcbConsent: false,
                bharatKosh: false
            }
        },
        { id: 'RJ-NOC-002', name: 'Tata Metaliks Processing', status: 'Under Review', statusClass: 'yellow', time: '2 days left', location: 'Bhiwadi', category: 'LARGE', officer: 'R.P. Sharma', type: 'abstraction-mining', query: null, response: null },
        { id: 'RJ-NOC-015', name: 'Highway Infra Project', status: 'New', statusClass: 'blue', time: '5 days left', location: 'Jaipur', category: 'MEDIUM', officer: 'S.K. Verma', type: 'abstraction-infra', query: null, response: null },
        { id: 'RJ-NOC-102', name: 'Shree Cement Ltd', status: 'Approved', statusClass: 'green', time: '--', location: 'Beawar', category: 'LARGE', officer: 'R.P. Sharma', type: 'abstraction-industry', query: null, response: null }
    ]);

    const [selectedTaskId, setSelectedTaskId] = useState('RJ-NOC-002');
    const [scruChecklist, setScruChecklist] = useState({
        zoneChecked: false,
        coordsVerified: false,
        documentsValid: false,
        feesPaid: true
    });
    const [isIssuanceModalOpen, setIssuanceModalOpen] = useState(false);
    const [isQueryModalOpen, setQueryModalOpen] = useState(false);
    const [isResponseModalOpen, setResponseModalOpen] = useState(false);
    const [queryMsg, setQueryMsg] = useState('');
    const [responseMsg, setResponseMsg] = useState('');

    const currentTask = tasks.find(t => t.id === selectedTaskId) || tasks[0];

    const [violations, setViolations] = useState([
        { id: 'V-882', industry: 'Ambuja Cements (Unit C)', type: 'Over Abstraction', severity: 'High', date: '21 Dec 2024', location: 'Nagaur', status: 'Notice Pending' },
        { id: 'V-901', industry: 'Hotel Heritage', type: 'Meter Tampering', severity: 'Critical', date: '27 Dec 2024', location: 'Udaipur', status: 'In-Investigation' }
    ]);

    const [notifications, setNotifications] = useState([
        { id: 1, type: 'info', msg: 'System Maintenance scheduled for midnight', time: '1 hr ago', read: false },
        { id: 2, type: 'success', msg: 'NOC Issued for RJ-NOC-102', time: '5 hrs ago', read: true }
    ]);
    const [showNotif, setShowNotif] = useState(false);

    const [notices, setNotices] = useState([
        { id: 'ORD-GW-2025-001', type: 'Show Cause Notice', date: '15 Dec 2025', subject: 'Unauthorized Drilling Activity', amount: 'N/A', status: 'Active' },
        { id: 'EC-ORDER-992', type: 'Penalty Order (EC)', date: '10 Nov 2025', subject: 'Environmental Compensation for Over-drafting', amount: '₹ 2,45,000', status: 'Settlement Pending' }
    ]);

    const [ecInputs, setEcInputs] = useState({ days: 30, qty: 100, rate: 20 });
    const calculatedEC = ecInputs.days * ecInputs.qty * ecInputs.rate;

    const handleAction = (action) => {
        if (action === 'NOC Approved') {
            setTasks(prev => prev.map(t => t.id === selectedTaskId ? { ...t, status: 'Approved', statusClass: 'green' } : t));
            setIssuanceModalOpen(true);
        } else if (action === 'Query Raised') {
            setQueryModalOpen(true);
        } else {
            alert(`${action} successful for ${selectedTaskId}`);
        }
    };

    const handleSubmission = (data) => {
        const newTask = {
            id: data.refId,
            name: activeCompany?.name || 'New Entity',
            status: 'New',
            statusClass: 'blue',
            time: '14 days left',
            location: 'Jaipur',
            category: 'MEDIUM',
            officer: '-',
            type: data.serviceId
        };
        setTasks(prev => [newTask, ...prev]);

        // Add Notification for Officer
        setNotifications(prev => [{
            id: Date.now(),
            type: 'alert',
            msg: `New Application: ${newTask.id} from ${newTask.name}`,
            time: 'Just Now',
            read: false
        }, ...prev]);

        // Sync with Global Company Service State
        if (setUserCompanies && activeCompany) {
            setUserCompanies(prev => prev.map(c => {
                if (c.id === activeCompany.id) {
                    const services = { ...c.services };
                    if (data.serviceId.includes('abstraction')) services.noc = { ...services.noc, registered: true, pending: false };
                    if (data.serviceId === 'rig-registration') services.rigs = { ...services.rigs, registered: true, pending: false };
                    if (data.serviceId === 'meter-installation') services.meters = { ...services.meters, registered: true, pending: false };
                    return { ...c, services };
                }
                return c;
            }));
        }

        setSelectedService(null);
        setActiveMenuItem('dashboard');
    };

    const issueNotice = (violation) => {
        const newNotice = {
            id: `ORD-GW-2026-${Math.floor(Math.random() * 900) + 100}`,
            type: 'Penalty Order (EC)',
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'Short', year: 'numeric' }),
            subject: `EC for ${violation.type} at ${violation.location}`,
            amount: '₹ 50,000',
            status: 'Settlement Pending'
        };
        setNotices(prev => [newNotice, ...prev]);
        setViolations(prev => prev.map(v => v.id === violation.id ? { ...v, status: 'Order Issued' } : v));
        alert(`Legal Order issued to ${violation.industry}`);
    };

    const handleRegularize = (notice) => {
        // Intelligent Mapping: Determine the best service based on notice content
        let targetServiceId = 'violation-regularization'; // Default

        if (notice.subject.toLowerCase().includes('drilling') || notice.subject.toLowerCase().includes('rig')) {
            targetServiceId = 'rig-registration';
        } else if (notice.subject.toLowerCase().includes('abstraction') || notice.subject.toLowerCase().includes('over-drafting')) {
            targetServiceId = 'abstraction-industry';
        }

        // Find the service object (mocking the search since we don't have the full list here, 
        // but we know the IDs from ServicePortfolio)
        const mappedService = {
            id: targetServiceId,
            title: targetServiceId.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
        };

        setSelectedService(mappedService);
        setActiveMenuItem('new');
        alert(`Notice ID: ${notice.id}\nAction: Regularization triggered.\nOpening ${mappedService.title} workflow for compliance.`);
    };

    const handleResponseSubmission = (taskId, msg) => {
        setTasks(prev => prev.map(t => t.id === taskId ? {
            ...t,
            status: 'Response Received',
            statusClass: 'blue',
            response: msg,
            responseDate: new Date().toLocaleDateString()
        } : t));

        // Notify Officer
        setNotifications(prev => [{
            id: Date.now(),
            type: 'info',
            msg: `Clarification Received for ${taskId}`,
            time: 'Just Now',
            read: false
        }, ...prev]);

        setResponseModalOpen(false);
        setResponseMsg('');
        alert('Your response has been submitted to the Authority for review.');
    };

    const handlePayNotice = (noticeId) => {
        setNotices(prev => prev.map(n => n.id === noticeId ? { ...n, status: 'Settled' } : n));

        // Add Notification for Officer
        setNotifications(prev => [{
            id: Date.now(),
            type: 'payment',
            msg: `Penalty Settled: ${noticeId}`,
            time: 'Just Now',
            read: false
        }, ...prev]);

        alert(`Payment successful for ${noticeId}. Order has been settled.`);
    };

    const CompletionSuccess = () => (
        <div className="success-screen animated">
            <div className="success-icon"><CheckCircle size={80} /></div>
            <h2>Submission Successful!</h2>
            <div className="ref-card">
                <p>Application Reference Number</p>
                <strong>NOC-RAJ-2025-APP-8839</strong>
            </div>
            <p className="desc">Your proposal has been successfully submitted to <strong>Rajasthan Ground Water Authority</strong>. The Hydrogeology department will conduct a site inspection within the next 15 working days.</p>
            <div className="next-actions">
                <button className="btn-secondary" onClick={() => setStep(1)}>Submit Another</button>
                <button className="btn-primary" onClick={() => window.print()}><Download size={18} /> Export Receipt</button>
            </div>
        </div>
    );

    const [myApplications, setMyApplications] = useState([
        { id: 'RG-NOC-2024-001', industry: 'Rajas Stones Pvt Ltd', status: 'Active', issued: '12 Jan 2024', expiry: '11 Jan 2027', zone: 'Safe' },
        { id: 'RG-NOC-2024-089', industry: 'Rajas Stones Pvt Ltd (Unit B)', status: 'Pending Verification', issued: '--', expiry: '--', zone: 'Critical' }
    ]);

    const DigitalVault = () => (
        <div className="digital-vault animated">
            <div className="dash-header">
                <div>
                    <h1>Digital Vault</h1>
                    <p>Secure repository for all your digitally signed NOCs and regulatory permits</p>
                </div>
            </div>

            <div className="doc-grid-v3">
                {[
                    { name: 'Groundwater Abstraction NOC - Unit A', date: '12 Jan 2024', size: '2.4 MB', id: 'RJ-NOC-2024-001' },
                    { name: 'Compliance Certificate Q4', date: '05 Nov 2024', size: '1.1 MB', id: 'RJ-CERT-992' },
                    { name: 'Site Inspection Report', date: '15 Oct 2024', size: '4.5 MB', id: 'RJ-INSP-002' }
                ].map((doc, idx) => (
                    <div key={idx} className="vault-doc-card">
                        <div className="vd-icon"><FileCheck size={24} /></div>
                        <div className="vd-info">
                            <strong>{doc.name}</strong>
                            <span>Issued: {doc.date} • {doc.size}</span>
                        </div>
                        <button className="btn-icon-s" title="Download Digitally Signed PDF"><Download size={16} /></button>
                    </div>
                ))}
            </div>
            <style jsx>{`
    .doc - grid - v3 { display: grid; grid- template - columns: repeat(auto - fill, minmax(350px, 1fr)); gap: 20px; margin - top: 30px; }
                .vault - doc - card { background: white; padding: 20px; border - radius: 16px; border: 1.5px solid #e2e8f0; display: flex; align - items: center; gap: 15px; transition: all 0.2s; }
                .vault - doc - card:hover { border - color: #3b82f6; transform: translateY(-3px); }
                .vd - icon { width: 48px; height: 48px; background: #eff6ff; color: #3b82f6; border - radius: 12px; display: flex; align - items: center; justify - content: center; }
                .vd - info { flex: 1; }
                .vd - info strong { display: block; font - size: 0.95rem; color: #1e293b; }
                .vd - info span { font - size: 0.75rem; color: #64748b; font - weight: 600; }
`}</style>
        </div>
    );

    // Unified Financial Ledger handled by Passbook component

    const ApplicantDashboard = () => (
        <div className="applicant-dashboard animated">
            <div className="dash-header flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">My NOC Portfolio</h1>
                    <p className="text-slate-500 font-medium">Overview of active abstraction licenses and lifecycle status</p>
                </div>
                <div className="header-actions flex gap-3">
                    <button className="btn-secondary glass-btn flex items-center gap-2 px-4 py-2 rounded-lg font-semibold" onClick={() => setActiveMenuItem('vault')}>
                        <Download size={18} /> Download Signed NOCs
                    </button>
                    <button className="btn-primary flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow-lg shadow-blue-500/30" onClick={() => setActiveMenuItem('new')}>
                        <Plus size={18} /> Apply for New NOC
                    </button>
                </div>
            </div>

            <div className="dash-stats-grid">
                <div className="glass-card stat-card blue-accent">
                    <div className="stat-icon"><FileText size={24} /></div>
                    <div className="stat-info">
                        <strong>2</strong>
                        <span>Active Licenses</span>
                    </div>
                </div>
                <div className="glass-card stat-card yellow-accent">
                    <div className="stat-icon"><Clock size={24} /></div>
                    <div className="stat-info">
                        <strong>1</strong>
                        <span>Draft / Pending</span>
                    </div>
                </div>
                <div className="glass-card stat-card red-accent clickable cursor-pointer hover:bg-white/80 transition-colors" onClick={() => setActiveMenuItem('notices')}>
                    <div className="stat-icon"><Gavel size={24} /></div>
                    <div className="stat-info">
                        <strong>{notices.length}</strong>
                        <span>Legal Notices</span>
                    </div>
                </div>
                <div className="glass-card stat-card cyan-accent clickable cursor-pointer hover:bg-white/80 transition-colors" onClick={() => navigate('/meter-registration-system')}>
                    <div className="stat-icon"><Activity size={24} /></div>
                    <div className="stat-info">
                        <strong>98.2%</strong>
                        <span>Equipment Health (IoT)</span>
                        <div className="badge badge-info mt-1 text-xs">ACCUMAX INTEGRATED</div>
                    </div>
                </div>
            </div>

            {/* Technical Queries Section */}
            {tasks.filter(t => t.status === 'Query Raised').length > 0 && (
                <div className="queries-alert-box glass-panel p-5 mb-8 border-l-4 border-l-orange-500 bg-orange-50/50">
                    <div className="flex items-center gap-3 mb-4 text-orange-700">
                        <AlertCircle size={20} />
                        <h3 className="text-lg font-bold">Technical Queries Requiring Action</h3>
                    </div>
                    <div className="grid gap-4">
                        {tasks.filter(t => t.status === 'Query Raised').map(q => (
                            <div key={q.id} className="flex justify-between items-center bg-white/60 p-4 rounded-xl border border-orange-100 backdrop-blur-sm">
                                <div>
                                    <strong className="block text-slate-800 text-sm mb-1">{q.id}: {q.name}</strong>
                                    <p className="text-sm text-slate-600 mb-1">{q.query}</p>
                                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Raised on: {q.queryDate}</span>
                                </div>
                                <button className="btn-primary text-sm py-2 px-4 shadow-md bg-orange-500 hover:bg-orange-600 border-none" onClick={() => {
                                    setSelectedTaskId(q.id);
                                    setResponseModalOpen(true);
                                }}>
                                    <MessageSquare size={16} className="mr-2" /> Respond
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="glass-panel p-8 mt-4">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Recent Applications & Active Permits</h3>
                    <button className="btn-text text-sm font-bold text-blue-600 hover:text-blue-700" onClick={() => setActiveMenuItem('passbook')}>View All History</button>
                </div>
                <div className="table-container glass-table-container border-0 bg-transparent shadow-none">
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th className="bg-transparent text-xs font-extrabold text-slate-400 uppercase tracking-wider">NOC / App ID</th>
                                <th className="bg-transparent text-xs font-extrabold text-slate-400 uppercase tracking-wider">Category</th>
                                <th className="bg-transparent text-xs font-extrabold text-slate-400 uppercase tracking-wider">Zone Info</th>
                                <th className="bg-transparent text-xs font-extrabold text-slate-400 uppercase tracking-wider">Issued Date</th>
                                <th className="bg-transparent text-xs font-extrabold text-slate-400 uppercase tracking-wider">Expiry</th>
                                <th className="bg-transparent text-xs font-extrabold text-slate-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myApplications.map(app => (
                                <tr key={app.id} className="hover:bg-blue-50/50 transition-colors group">
                                    <td className="font-bold text-slate-800 py-4">{app.id}</td>
                                    <td className="py-4"><span className={`badge ${app.status === 'Active' ? 'badge-success' : 'badge-warning'} px-3 py-1 rounded-full text-xs font-bold`}>{app.status === 'Active' ? 'Permit Active' : 'Application In-Process'}</span></td>
                                    <td className="text-slate-600 font-medium py-4">{app.zone}</td>
                                    <td className="text-slate-600 font-medium py-4">{app.issued}</td>
                                    <td className="text-slate-600 font-medium py-4">{app.expiry}</td>
                                    <td className="flex gap-2 py-4">
                                        <button className="btn-icon bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-500 transition-all p-2 rounded-lg shadow-sm" title="View Details" onClick={() => setViewingNocId(app.id)}><Eye size={16} /></button>
                                        <button className="btn-icon bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-500 transition-all p-2 rounded-lg shadow-sm" title="Download Signed NOC" onClick={() => { setActiveMenuItem('vault') }}><Download size={16} /></button>
                                        {app.status === 'Active' && (
                                            <>
                                                <button className="btn-icon bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-500 transition-all p-2 rounded-lg shadow-sm" title="Apply for Amendment" onClick={() => setActiveMenuItem('amend')}><Settings size={16} /></button>
                                                <button className="btn-icon bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-500 transition-all p-2 rounded-lg shadow-sm" title="Apply for Renewal" onClick={() => setActiveMenuItem('renew')}><RefreshCw size={16} /></button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx>{`
                .dash-stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                    margin-bottom: 32px;
                }
                .stat-card {
                    padding: 24px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }
                .stat-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                }
                .blue-accent .stat-icon { background: #eff6ff; color: #3b82f6; }
                .yellow-accent .stat-icon { background: #fefce8; color: #eab308; }
                .red-accent .stat-icon { background: #fef2f2; color: #ef4444; }
                .cyan-accent .stat-icon { background: #ecfeff; color: #06b6d4; }
                
                .stat-info strong {
                    display: block;
                    font-size: 2rem;
                    font-weight: 800;
                    line-height: 1;
                    margin-bottom: 6px;
                    color: var(--text-main);
                    font-feature-settings: "tnum";
                    letter-spacing: -1px;
                }
                .stat-info span {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .glass-btn {
                    background: rgba(255,255,255,0.5);
                    backdrop-filter: blur(4px);
                    border: 1px solid rgba(255,255,255,0.6);
                }
            `}</style>
        </div>
    );

    // Obsolete WizardStep removed in favor of UnifiedApplicationEngine

    const filteredTasks = tasks.filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.id.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeMenuItem === 'tasks') return matchesSearch && t.status !== 'Approved';
        if (activeMenuItem === 'verified') return matchesSearch && t.status === 'Approved';
        return matchesSearch;
    });

    const EnforcementHub = () => (
        <div className="enforcement-workstation">
            <header className="scrutiny-header">
                <h2>Enforcement Hub & Violation Registry</h2>
                <div className="sh-actions">
                    <button className="btn-secondary small"><Filter size={14} /> Filter Severity</button>
                    <button className="btn-primary small"><Plus size={14} /> New Inspection Case</button>
                </div>
            </header>

            <div className="violation-grid">
                {violations.map(v => (
                    <div key={v.id} className="violation-card">
                        <div className="vc-header">
                            <span className="v-id">{v.id}</span>
                            <span className={`v-severity ${v.severity.toLowerCase()}`}>{v.severity}</span>
                        </div>
                        <h3>{v.industry}</h3>
                        <p className="v-type">{v.type}</p>
                        <div className="v-meta">
                            <span><MapPin size={12} /> {v.location}</span>
                            <span><Clock size={12} /> {v.date}</span>
                        </div>
                        <div className="v-footer">
                            <span className="v-status">{v.status}</span>
                            <button className="btn-action" onClick={() => issueNotice(v)}>Initiate Order <ArrowUpRight size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="ec-calculator-section">
                <h3><Activity size={18} /> EC Calculator (NGT Formula)</h3>
                <div className="calc-flex">
                    <div className="calc-inputs" style={{ display: 'flex', gap: '20px' }}>
                        <div className="input-group">
                            <label>Days of Violation</label>
                            <input
                                type="number"
                                value={ecInputs.days}
                                onChange={(e) => setEcInputs({ ...ecInputs, days: Number(e.target.value) })}
                                placeholder="Enter days"
                            />
                        </div>
                        <div className="input-group">
                            <label>Daily Abstraction (m3)</label>
                            <input
                                type="number"
                                value={ecInputs.qty}
                                onChange={(e) => setEcInputs({ ...ecInputs, qty: Number(e.target.value) })}
                                placeholder="Enter qty"
                            />
                        </div>
                        <div className="input-group">
                            <label>Rate (₹/m3)</label>
                            <input
                                type="number"
                                value={ecInputs.rate}
                                onChange={(e) => setEcInputs({ ...ecInputs, rate: Number(e.target.value) })}
                                placeholder="Enter rate"
                            />
                        </div>
                    </div>
                    <div className="calc-result">
                        <span className="res-label">Estimated Environmental Compensation</span>
                        <span className="res-value">₹ {calculatedEC.toLocaleString()}</span>
                        <button className="btn-primary" onClick={() => issueNotice({ type: 'Calculated EC', location: 'Custom Site', industry: 'Self Assessment' })}>Generate Notice</button>
                    </div>
                </div>
            </div>
        </div>
    );

    const LegalOrders = () => (
        <div className="legal-orders-view animated">
            <div className="glass-panel main-panel">
                <header className="lo-header">
                    <div>
                        <h2>Legal Orders & Notices</h2>
                        <p>Statutory orders issued by Rajasthan Ground Water Authority</p>
                    </div>
                    <div className="lo-stats">
                        <div className="glass-card stat-item">
                            <div className="s-icon red"><AlertCircle size={24} /></div>
                            <div>
                                <span className="s-val">{notices.filter(n => n.status === 'Active').length.toString().padStart(2, '0')}</span>
                                <span className="s-label">Active Notices</span>
                            </div>
                        </div>
                        <div className="glass-card stat-item">
                            <div className="s-icon orange"><Wallet size={24} /></div>
                            <div>
                                <span className="s-val">₹ {notices.length > 2 ? '2.95L' : '2.45L'}</span>
                                <span className="s-label">Pending Penalties</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="table-container glass-table-container">
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Description</th>
                                <th>Date Issued</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notices.map(n => (
                                <tr key={n.id}>
                                    <td className="fw-bold">{n.id}</td>
                                    <td>
                                        <div>
                                            <strong className="d-block">{n.type}</strong>
                                            <span className="sub-text">{n.subject}</span>
                                        </div>
                                    </td>
                                    <td className="text-muted">{n.date}</td>
                                    <td className={`fw-bold ${n.amount !== 'N/A' ? 'text-danger' : 'text-muted'}`}>{n.amount}</td>
                                    <td>
                                        <span className={`status-pill ${n.status.toLowerCase().replace(' ', '-')}`}>
                                            {n.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-row">
                                            <button className="btn-icon" title="Download Order"><Download size={16} /></button>

                                            {n.id.includes('EC') && n.status !== 'Settled' && (
                                                <button className="btn-action dark" onClick={() => handlePayNotice(n.id)}>
                                                    <CreditCard size={14} /> Pay & Settle
                                                </button>
                                            )}

                                            {n.type.includes('Show Cause') && (
                                                <button className="btn-action primary" onClick={() => handleRegularize(n)}>
                                                    <RefreshCw size={14} /> Regularize
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx>{`
                .legal-orders-view { animation: fadeUp 0.5s ease; }
                .glass-panel.main-panel { padding: 32px; margin-bottom: 24px; }
                
                .lo-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
                .lo-header h2 { font-size: 1.5rem; font-weight: 800; color: var(--primary); margin: 0; }
                .lo-header p { color: #64748b; font-weight: 600; margin: 4px 0 0; }
                
                .lo-stats { display: flex; gap: 16px; }
                .stat-item { display: flex; align-items: center; gap: 16px; padding: 16px 24px; background: rgba(255,255,255,0.6); }
                .s-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
                .s-icon.red { background: #fef2f2; color: #ef4444; }
                .s-icon.orange { background: #fff7ed; color: #f97316; }
                
                .s-val { display: block; font-size: 1.5rem; font-weight: 800; color: var(--primary); line-height: 1; margin-bottom: 4px; }
                .s-label { font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }

                .table-container { overflow-x: auto; }
                .glass-table-container { background: transparent !important; border: none !important; box-shadow: none !important; }
                
                .modern-table { width: 100%; border-collapse: separate; border-spacing: 0 8px; }
                .modern-table th { text-align: left; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; padding: 0 16px 8px; }
                .modern-table td { padding: 16px; background: rgba(255,255,255,0.4); border-top: 1px solid rgba(255,255,255,0.4); border-bottom: 1px solid rgba(255,255,255,0.4); }
                .modern-table tr td:first-child { border-top-left-radius: 12px; border-bottom-left-radius: 12px; border-left: 1px solid rgba(255,255,255,0.4); }
                .modern-table tr td:last-child { border-top-right-radius: 12px; border-bottom-right-radius: 12px; border-right: 1px solid rgba(255,255,255,0.4); }
                .modern-table tr:hover td { background: rgba(255,255,255,0.9); }

                .fw-bold { font-weight: 700; color: var(--primary); }
                .d-block { display: block; color: #334155; }
                .sub-text { font-size: 0.8rem; color: #64748b; font-weight: 600; }
                .text-muted { color: #64748b; font-weight: 500; }
                .text-danger { color: #dc2626; }
                
                .status-pill { padding: 6px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }
                .status-pill.active { background: #fef2f2; color: #ef4444; border: 1px solid #fecaca; }
                .status-pill.settled { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
                .status-pill.settlement-pending { background: #fff7ed; color: #ea580c; border: 1px solid #fed7aa; }

                .action-row { display: flex; gap: 8px; justify-content: flex-end; }
                .btn-icon { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid #e2e8f0; background: white; color: #64748b; cursor: pointer; transition: all 0.2s; }
                .btn-icon:hover { border-color: var(--accent); color: var(--accent); }
                
                .btn-action { display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; }
                .btn-action.dark { background: var(--primary); color: white; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2); }
                .btn-action.dark:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(15, 23, 42, 0.3); }
                .btn-action.primary { background: var(--accent); color: white; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2); }
                .btn-action.primary:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(37, 99, 235, 0.3); }
            `}</style>
        </div>
    );

    const OfficerScrutiny = () => (
        <div className="scrutiny-hub animated">
            <div className="queue-sidebar">
                <div className="sidebar-header">
                    <h3>{activeMenuItem === 'verified' ? 'Issued Registry' : 'Scrutiny Queue'}</h3>
                    <div className="search-box">
                        <Search size={14} />
                        <input
                            type="text"
                            placeholder="Search applications..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="queue-list">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map(t => (
                            <div
                                key={t.id}
                                className={`task-card ${selectedTaskId === t.id ? 'active' : ''}`}
                                onClick={() => setSelectedTaskId(t.id)}
                            >
                                <div className="task-head">
                                    <strong>{t.id}</strong>
                                    <span className={`p-chip ${t.statusClass}`}>{t.status}</span>
                                </div>
                                <div className="task-type-tag">
                                    {t.type.includes('amendment') ? 'Modification Request' : t.type.includes('renewal') ? 'Statutory Renewal' : 'Fresh Application'}
                                </div>
                                <p>{t.name}</p>
                                <div className="task-meta">
                                    <span><Clock size={12} /> {t.time}</span>
                                    <span><MapPin size={12} /> {t.location}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">No matching applications</div>
                    )}
                </div>
            </div>

            <div className="case-content">
                <div className="case-top">
                    <div>
                        <h2>Application Scrutiny: {currentTask.id}</h2>
                        <div className="case-tags">
                            <span className="status-chip">Officer: {currentTask.officer}</span>
                            <span className="status-chip">Category: {currentTask.category}</span>
                        </div>
                    </div>
                    <div className="case-actions">
                        {currentTask.status === 'Approved' ? (
                            <button className="btn-primary" onClick={() => setIssuanceModalOpen(true)}><Download size={18} /> View Issued NOC</button>
                        ) : (
                            <>
                                <button className="btn-secondary dark" onClick={() => setQueryModalOpen(true)}>Raise Query</button>
                                <button
                                    className={`btn-primary success ${!Object.values(scruChecklist).every(v => v) ? 'disabled-btn' : ''}`}
                                    onClick={() => Object.values(scruChecklist).every(v => v) && handleAction('NOC Approved')}
                                    title={!Object.values(scruChecklist).every(v => v) ? 'Complete the checklist first' : ''}
                                >
                                    <CheckCircle size={18} /> Approve NOC
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {currentTask.id === 'RJ-IND-2023-18580' && (
                    <div className="gis-box">
                        <div className="gis-pin"><MapPin size={24} /></div>
                        <div className="gis-coords">
                            <strong>Nayagaon, Indergarh, Bundi</strong>
                            <span>Lat: {currentTask.latitude} | Long: {currentTask.longitude} | Sub-District: Keshoraipatan</span>
                        </div>
                        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                            <span className="p-chip yellow" style={{ background: '#fef3c7', color: '#92400e' }}>Semi-Critical Category Block</span>
                        </div>
                    </div>
                )}

                <div className="case-details-grid">
                    <div className="detail-panel">
                        <div className="p-header">Industry Profile</div>
                        <div className="grid-2">
                            <div className="g-item"><label>Industry Name</label><p>{currentTask.name}</p></div>
                            <div className="g-item"><label>MSME Status</label><p>{currentTask.msmeStatus || 'Not Specified'}</p></div>
                            <div className="g-item"><label>Project Status</label><p>{currentTask.projectStatus || 'Active'}</p></div>
                            <div className="g-item"><label>District / Block</label><p>{currentTask.location} / {currentTask.tehsil || 'Central'}</p></div>
                        </div>
                    </div>
                    <div className="detail-panel">
                        <div className="p-header">Statutory Checklist</div>
                        <div className="scru-checklist">
                            {Object.entries(scruChecklist).map(([key, val]) => (
                                <label key={key} className="check-item">
                                    <input
                                        type="checkbox"
                                        checked={val}
                                        onChange={() => setScruChecklist(prev => ({ ...prev, [key]: !val }))}
                                    />
                                    <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {currentTask.id === 'RJ-IND-2023-18580' && (
                    <>
                        <div className="detail-panel" style={{ marginTop: '25px' }}>
                            <div className="p-header">Land Use Statistics Module</div>
                            <table className="tech-table">
                                <thead>
                                    <tr>
                                        <th>Component</th>
                                        <th>Existing (sqm)</th>
                                        <th>Proposed (sqm)</th>
                                        <th>Total (sqm)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Green Belt</td><td>{currentTask.landUse.greenBelt.existing.toFixed(2)}</td><td>{currentTask.landUse.greenBelt.proposed.toLocaleString()}</td><td>{currentTask.landUse.greenBelt.total.toLocaleString()}</td></tr>
                                    <tr><td>Roads / Paved</td><td>{currentTask.landUse.roads.existing.toFixed(2)}</td><td>{currentTask.landUse.roads.proposed.toLocaleString()}</td><td>{currentTask.landUse.roads.total.toLocaleString()}</td></tr>
                                    <tr><td>Rooftop Area</td><td>{currentTask.landUse.rooftop.existing.toFixed(2)}</td><td>{currentTask.landUse.rooftop.proposed.toLocaleString()}</td><td>{currentTask.landUse.rooftop.total.toLocaleString()}</td></tr>
                                    <tr className="total-row"><td>Grand Total</td><td>{currentTask.landUse.total.existing.toFixed(2)}</td><td>{currentTask.landUse.total.proposed.toLocaleString()}</td><td>{currentTask.landUse.total.total.toLocaleString()}</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="detail-panel" style={{ marginTop: '25px' }}>
                            <div className="p-header">Activity-wise Water Usage Validation</div>
                            <table className="tech-table">
                                <thead>
                                    <tr>
                                        <th>Activity</th>
                                        <th>Req (m³/day)</th>
                                        <th>Days/Year</th>
                                        <th>Annual (m³/year)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTask.usageBreakdown.map((row, i) => (
                                        <tr key={i}>
                                            <td>{row.activity}</td>
                                            <td>{row.qty}</td>
                                            <td>{row.days}</td>
                                            <td>{row.annual.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                    <tr className="total-row">
                                        <td>Total Requirement</td>
                                        <td>{currentTask.waterRequirement.totalReq}</td>
                                        <td colSpan="2" style={{ textAlign: 'right', paddingRight: '20px' }}>{(257400).toLocaleString()} m³/year</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="stat-grid-v2" style={{ marginTop: '25px' }}>
                            <div className="stat-card-v2">
                                <label>Wastewater Generated</label>
                                <strong>{currentTask.recycling.wastewater} KLD</strong>
                            </div>
                            <div className="stat-card-v2 highlight">
                                <label>Net Recharge Utilization</label>
                                <strong>{currentTask.recycling.treatedAvailable} KLD</strong>
                            </div>
                            <div className="stat-card-v2">
                                <label>Industrial Reuse</label>
                                <strong>{currentTask.recycling.reuseIndustrial} KLD</strong>
                            </div>
                        </div>

                        <div className="detail-panel">
                            <div className="p-header">Proposed Abstraction Structures</div>
                            <table className="tech-table">
                                <thead>
                                    <tr>
                                        <th>Borewell No.</th>
                                        <th>Installation Year</th>
                                        <th>Meter Status</th>
                                        <th>Telemetry</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTask.structures.map(s => (
                                        <tr key={s.id}>
                                            <td>Borewell {s.id}</td>
                                            <td>{s.year}</td>
                                            <td><span className="p-chip yellow">Required</span></td>
                                            <td><span className="p-chip blue">Mandatory</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                <div className="document-vault">
                    <div className="p-header">Documentation Scrutiny</div>
                    <div className="doc-table">
                        <div className="doc-row">
                            <div className="d-info">
                                <FileText size={20} className="text-blue" />
                                <div><strong>Site Layout Plan</strong><span>Approved by RIICO/UDH</span></div>
                            </div>
                            <div className="d-actions">
                                <button className="btn-text green"><Eye size={14} /> Review</button>
                                <span className="verified-label"><CheckCircle size={14} /> Verified</span>
                            </div>
                        </div>
                        <div className="doc-row">
                            <div className="d-info">
                                <FileText size={20} className="text-blue" />
                                <div><strong>Hydraulic Balance Matrix</strong><span>Water recycling plan</span></div>
                            </div>
                            <div className="d-actions">
                                <button className="btn-text green"><Eye size={14} /> Review</button>
                                <button className="btn-text red"><AlertCircle size={14} /> Flag Error</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Issuance Modal */}
            {isIssuanceModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content cert-preview animated">
                        <div className="modal-header">
                            <h3>NOC Certificate Preview - {currentTask.id}</h3>
                            <button className="close-btn" onClick={() => setIssuanceModalOpen(false)}>✕</button>
                        </div>
                        <div className="cert-body">
                            <div className="cert-frame">
                                <div className="cert-header">
                                    <img src="/rajasthan_emblem.png" alt="Emblem" height="60" />
                                    <h4>GOVERNMENT OF RAJASTHAN</h4>
                                    <h5>Ground Water Department</h5>
                                    <div className="cert-divider"></div>
                                </div>
                                <div className="cert-main">
                                    <h3>FORM 8: NO OBJECTION CERTIFICATE</h3>
                                    <p>Certificate No: <strong>RAJ/GW/2025/{currentTask.id}</strong></p>
                                    <p>Date: {new Date().toLocaleDateString('en-IN')}</p>

                                    <div className="cert-text">
                                        This is to certify that <strong>{currentTask.name}</strong> is hereby granted permission
                                        for groundwater abstraction at <strong>{currentTask.location}</strong>.
                                        This NOC is valid for a period of 3 years under the provisions of the
                                        Rajasthan Ground Water Management Act.
                                    </div>

                                    <div className="cert-footer">
                                        <div className="qr-box">[QR CODE]</div>
                                        <div className="sign-box">
                                            <p>Digitally Signed by:</p>
                                            <strong>REGISTRAR (GW)</strong>
                                            <span>Goverment of Rajasthan</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setIssuanceModalOpen(false)}>Cancel</button>
                            <button className="btn-primary" onClick={() => { setIssuanceModalOpen(false); alert('NOC Published to Applicant Digital Vault'); }}>
                                <Download size={18} /> Publish & Notify Applicant
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Query Modal */}
            {isQueryModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content query-modal animated">
                        <div className="modal-header">
                            <h3>Raise Technical Query: {currentTask.id}</h3>
                            <button className="close-btn" onClick={() => setQueryModalOpen(false)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <label>Description of Query</label>
                            <textarea
                                value={queryMsg}
                                onChange={(e) => setQueryMsg(e.target.value)}
                                placeholder="Specify what data or document is missing or incorrect..."
                            ></textarea>
                            <div className="query-shortcuts">
                                <button onClick={() => setQueryMsg('Please upload a clearer copy of the Site Layout Plan.')}>Site Plan Missing</button>
                                <button onClick={() => setQueryMsg('The water balance calculations do not match the abstraction request.')}>Water Balance Error</button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setQueryModalOpen(false)}>Cancel</button>
                            <button className="btn-primary" onClick={() => {
                                setTasks(prev => prev.map(t => t.id === currentTask.id ? { ...t, status: 'Query Raised', statusClass: 'orange', query: queryMsg, queryDate: new Date().toLocaleDateString() } : t));
                                setQueryModalOpen(false);
                                alert(`Technical Query raised for ${currentTask.id}. Applicant notified.`);
                            }}>
                                <Send size={18} /> Send Query
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Response Modal */}
            {isResponseModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content query-modal animated">
                        <div className="modal-header">
                            <h3>Respond to Technical Query: {currentTask.id}</h3>
                            <button className="close-btn" onClick={() => setResponseModalOpen(false)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <div className="officer-query-display">
                                <label>Officer's Query:</label>
                                <blockquote>{currentTask.query}</blockquote>
                            </div>
                            <label>Your Response / Clarification</label>
                            <textarea
                                value={responseMsg}
                                onChange={(e) => setResponseMsg(e.target.value)}
                                placeholder="Provide the requested information or confirm document upload..."
                            ></textarea>
                            <div className="upload-hint">
                                <UploadCloud size={14} /> <span>You can update documents in the Application Vault if needed.</span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setResponseModalOpen(false)}>Cancel</button>
                            <button className="btn-primary" onClick={() => handleResponseSubmission(currentTask.id, responseMsg)}>
                                <Send size={18} /> Submit Clarification
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const OfficerAnalytics = () => (
        <div className="analytics-dashboard animated">
            <div className="dash-header">
                <div>
                    <h1>Authority Analysis Hub</h1>
                    <p>Real-time regulatory performance and basin abstraction trends</p>
                </div>
            </div>
            <div className="dash-stats">
                <div className="d-stat-card">
                    <div className="ds-icon blue"><BookOpen size={24} /></div>
                    <div className="ds-info"><strong>128</strong><span>Applications MTD</span></div>
                </div>
                <div className="d-stat-card">
                    <div className="ds-icon green"><Activity size={24} /></div>
                    <div className="ds-info"><strong>8.4 days</strong><span>Avg. TAT</span></div>
                </div>
                <div className="d-stat-card">
                    <div className="ds-icon yellow"><AlertCircle size={24} /></div>
                    <div className="ds-info"><strong>14</strong><span>Critical Violations</span></div>
                </div>
            </div>
            <div className="analytics-body">
                <div className="analysis-card">
                    <h3>Abstraction by Sector (MTD)</h3>
                    <div className="mock-chart">
                        <div className="bar" style={{ height: '80%' }}><span>Ind</span></div>
                        <div className="bar" style={{ height: '45%' }}><span>Min</span></div>
                        <div className="bar" style={{ height: '60%' }}><span>Inf</span></div>
                        <div className="bar" style={{ height: '30%' }}><span>Com</span></div>
                    </div>
                </div>
            </div>
        </div>
    );

    const OfficerHub = () => (
        <div className="officer-workstation-container">
            {activeMenuItem === 'tasks' || activeMenuItem === 'verified' ? <OfficerScrutiny /> : null}
            {activeMenuItem === 'enforcement' && <EnforcementHub />}
            {activeMenuItem === 'reports' && <OfficerAnalytics />}
        </div>
    );

    const navigate = useNavigate();

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            navigate('/');
        }
    };

    return (
        <div className="sys-canvas">
            <aside className={`glass-sidebar ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
                <div className="sb-header">
                    <div className="sb-brand" onClick={() => navigate('/')}>
                        <div className="brand-logo"><Building2 size={24} /></div>
                        {isSidebarOpen && <span className="brand-name">NOC Portal</span>}
                    </div>
                    <button className="sb-toggle" onClick={() => setSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </button>
                </div>

                <nav className="sb-nav">
                    {role !== 'applicant' && (
                        <div className="sb-section">
                            <button className={`nav-item ${activeMenuItem === 'dashboard' ? 'active' : ''}`} onClick={() => navigate('/dashboard')}>
                                <LayoutDashboard size={20} />
                                {isSidebarOpen && <span>Authority Hub</span>}
                            </button>
                        </div>
                    )}

                    <div className="sb-section">
                        {isSidebarOpen && <h4 className="sb-section-title">Menu</h4>}
                        {menuItems[role].map(item => (
                            <button
                                key={item.id}
                                className={`nav-item ${activeMenuItem === item.id ? 'active' : ''}`}
                                onClick={() => setActiveMenuItem(item.id)}
                                title={!isSidebarOpen ? item.label : ''}
                            >
                                {item.icon}
                                {isSidebarOpen && <span>{item.label}</span>}
                            </button>
                        ))}
                    </div>
                </nav>

                <div className="sb-footer">
                    <div className="user-profile">
                        <div className="user-avatar">{activeCompany?.name?.[0] || 'U'}</div>
                        {isSidebarOpen && (
                            <div className="user-info">
                                <span className="user-name">{activeCompany?.name || 'User'}</span>
                                <span className="user-role">{role}</span>
                            </div>
                        )}
                        {isSidebarOpen && <LogOut size={16} className="logout-icon" onClick={handleLogout} />}
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
                            <h2>Rajasthan Ground Water Authority</h2>
                            <p>Governance • Sustainability • Compliance</p>
                        </div>
                    </div>
                    <div className="header-controls">
                        <div className="role-chip">
                            <Users size={14} />
                            <select value={role} onChange={e => setRole(e.target.value)}>
                                <option value="applicant">APPLICANT HUB</option>
                                <option value="officer">OFFICER HUB</option>
                            </select>
                        </div>

                        <div className="notif-wrapper">
                            <button className={`notif-btn ${notifications.some(n => !n.read) ? 'has-new' : ''}`} onClick={() => setShowNotif(!showNotif)}>
                                <Bell size={18} />
                                {notifications.filter(n => !n.read).length > 0 && <span className="notif-badge">{notifications.filter(n => !n.read).length}</span>}
                            </button>

                            {showNotif && (
                                <div className="notif-tray animated slideInDown">
                                    <div className="nt-header">
                                        <span>Alerts & Activity</span>
                                        <button onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}>Mark all as read</button>
                                    </div>
                                    <div className="nt-list">
                                        {notifications.length > 0 ? notifications.map(n => (
                                            <div key={n.id} className={`nt-item ${n.read ? '' : 'unread'} ${n.type}`}>
                                                <div className="nt-icon">
                                                    {n.type === 'alert' && <AlertCircle size={14} />}
                                                    {n.type === 'success' && <CheckCircle size={14} />}
                                                    {n.type === 'payment' && <CreditCard size={14} />}
                                                    {n.type === 'info' && <Info size={14} />}
                                                </div>
                                                <div className="nt-content">
                                                    <p>{n.msg}</p>
                                                    <span>{n.time}</span>
                                                </div>
                                                {!n.read && <div className="unread-dot"></div>}
                                            </div>
                                        )) : (
                                            <div className="nt-empty">No new notifications</div>
                                        )}
                                    </div>
                                    <div className="nt-footer">View All History</div>
                                </div>
                            )}
                        </div>

                        <button className="help-btn"><MessageSquare size={18} /></button>
                        <button className="logout-btn" onClick={handleLogout}><LogOut size={18} /></button>
                    </div>
                </header>

                <div className="sys-viewport">
                    {role === 'officer' ? (
                        <OfficerHub />
                    ) : (
                        viewingNocId ? (
                            <NOCDetails onBack={() => setViewingNocId(null)} />
                        ) : (
                            <>
                                {activeMenuItem === 'dashboard' && <ApplicantDashboard />}
                                {activeMenuItem === 'services' && (
                                    <ServicePortfolio
                                        onApply={(svc) => {
                                            setSelectedService(svc);
                                            setActiveMenuItem('new');
                                        }}
                                    />
                                )}
                                {activeMenuItem === 'new' && (
                                    <UnifiedApplicationEngine
                                        activeCompany={activeCompany}
                                        selectedService={selectedService}
                                        onComplete={handleSubmission}
                                        onCancel={() => setActiveMenuItem('dashboard')}
                                    />
                                )}
                                {activeMenuItem === 'amend' && (
                                    <UnifiedApplicationEngine
                                        selectedService={{ id: 'noc-amendment', title: 'NOC Amendment', category: 'lifecycle' }}
                                        activeCompany={activeCompany}
                                        onCancel={() => setActiveMenuItem('dashboard')}
                                        onComplete={(data) => {
                                            handleSubmission({ ...data, serviceId: 'noc-amendment', refId: 'AMEND-' + Date.now().toString().slice(-6) });
                                        }}
                                    />
                                )}
                                {activeMenuItem === 'renew' && (
                                    <UnifiedApplicationEngine
                                        selectedService={{ id: 'noc-renewal', title: 'NOC Renewal', category: 'lifecycle' }}
                                        activeCompany={activeCompany}
                                        onBack={() => setActiveMenuItem('dashboard')}
                                        onSubmit={(data) => {
                                            handleSubmission({ ...data, serviceId: 'noc-renewal', refId: 'RENEW-' + Date.now().toString().slice(-6) });
                                        }}
                                    />
                                )}
                                {activeMenuItem === 'compliance' && <SelfCompliance standalone={false} />}
                                {activeMenuItem === 'inspection' && <SelfInspection />}
                                {activeMenuItem === 'vault' && <DigitalVault />}
                                {activeMenuItem === 'passbook' && <Passbook standalone={false} activeCompany={activeCompany} />}
                                {activeMenuItem === 'gis' && <GISDashboard />}
                                {activeMenuItem === 'notices' && <LegalOrders />}
                                {activeMenuItem === 'reports' && <Reports />}
                            </>
                        )
                    )}
                </div>


            </main >

            <style jsx>{`
                .sys-canvas { 
                    display: flex; 
                    height: 100vh; 
                    background: var(--bg-body); 
                    overflow: hidden; 
                    font-family: 'Inter', sans-serif; 
                }

                /* GLASSMORPHISM SURFACE */
                .sys-surface { 
                    flex: 1; 
                    display: flex; 
                    flex-direction: column; 
                    overflow: hidden; 
                    position: relative;
                }

                .sys-header { 
                    height: 80px; 
                    background: rgba(255, 255, 255, 0.7); 
                    backdrop-filter: blur(20px); 
                    border-bottom: 1px solid var(--border-light); 
                    padding: 0 32px; 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    z-index: 50; 
                }

                .active-context-bar {
                    background: hsla(210, 40%, 96%, 0.8);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid var(--border-light);
                    padding: 8px 32px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.85rem;
                }
                .ac-left { display: flex; align-items: center; gap: 12px; color: var(--text-muted); }
                .ac-left strong { color: var(--text-main); }
                .ac-id { font-size: 0.7rem; color: var(--accent); font-weight: 700; background: white; padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border-light); }
                .ac-switch { background: var(--primary); color: white; border: none; padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s; }
                .ac-switch:hover { background: var(--primary-light); transform: translateY(-1px); }

                /* GLASS SIDEBAR */
                .glass-sidebar { 
                    background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); 
                    color: white; 
                    display: flex; 
                    flex-direction: column; 
                    border-right: 1px solid rgba(255,255,255,0.1); 
                    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
                    z-index: 100;
                    box-shadow: 5px 0 15px rgba(0,0,0,0.1);
                }
                .glass-sidebar.expanded { width: 280px; }
                .glass-sidebar.collapsed { width: 80px; }
                
                .sb-header { 
                    height: 80px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: space-between; 
                    padding: 0 24px; 
                    border-bottom: 1px solid rgba(255,255,255,0.1); 
                }
                .sb-brand { display: flex; align-items: center; gap: 12px; cursor: pointer; }
                .brand-logo { 
                    width: 40px; height: 40px; 
                    background: linear-gradient(135deg, var(--accent), #3b82f6); 
                    border-radius: 12px; 
                    display: flex; align-items: center; justify-content: center; 
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
                }
                .brand-name { font-weight: 800; font-size: 1.2rem; letter-spacing: -0.5px; }
                .sb-toggle { 
                    background: rgba(255,255,255,0.1); 
                    border: none; 
                    color: white; 
                    width: 32px; height: 32px; 
                    border-radius: 8px; 
                    display: flex; align-items: center; justify-content: center; 
                    cursor: pointer; 
                    transition: background 0.2s; 
                }
                .sb-toggle:hover { background: rgba(255,255,255,0.2); }
                
                .sb-nav { padding: 24px 16px; flex: 1; display: flex; flex-direction: column; gap: 32px; overflow-y: auto; }
                .sb-section { display: flex; flex-direction: column; gap: 8px; }
                .sb-section-title { 
                    font-size: 0.7rem; 
                    text-transform: uppercase; 
                    color: rgba(255,255,255,0.4); 
                    font-weight: 700; 
                    margin: 0 0 8px 12px; 
                    letter-spacing: 1px; 
                }
                
                .nav-item { 
                    display: flex; align-items: center; gap: 16px; 
                    padding: 12px 16px; 
                    border-radius: 12px; 
                    background: transparent; 
                    border: none; 
                    color: rgba(255,255,255,0.7); 
                    font-weight: 600; 
                    cursor: pointer; 
                    transition: all 0.2s; 
                    text-align: left; 
                    font-size: 0.95rem; 
                }
                .nav-item:hover { 
                    background: rgba(255,255,255,0.05); 
                    color: white; 
                }
                .nav-item.active { 
                    background: linear-gradient(90deg, rgba(59, 130, 246, 0.2), transparent); 
                    color: white; 
                    border-left: 3px solid var(--accent); 
                }
                .nav-item span { white-space: nowrap; }
                
                .sb-footer { 
                    padding: 24px; 
                    border-top: 1px solid rgba(255,255,255,0.1); 
                    background: rgba(0,0,0,0.2); 
                }
                .user-profile { 
                    display: flex; align-items: center; gap: 12px; 
                }
                .user-avatar { 
                    width: 40px; height: 40px; 
                    background: var(--accent); 
                    border-radius: 50%; 
                    display: flex; align-items: center; justify-content: center; 
                    font-weight: 700; 
                    border: 2px solid rgba(255,255,255,0.2); 
                }
                .user-info { flex: 1; overflow: hidden; }
                .user-name { display: block; font-size: 0.9rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .user-role { display: block; font-size: 0.7rem; color: rgba(255,255,255,0.5); text-transform: uppercase; font-weight: 600; }
                .logout-icon { color: rgba(255,255,255,0.4); cursor: pointer; transition: color 0.2s; }
                .logout-icon:hover { color: #ef4444; }

                /* HEADER BRANDING & CONTROLS */
                .header-branding { display: flex; align-items: center; gap: 16px; }
                .emblem-img { height: 48px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
                .branding-txt h2 { margin: 0; font-size: 1.1rem; color: var(--primary); font-weight: 800; letter-spacing: -0.5px; }
                .branding-txt p { margin: 0; font-size: 0.75rem; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; }

                .header-controls { display: flex; align-items: center; gap: 16px; }
                .role-chip { 
                    display: flex; align-items: center; gap: 8px; 
                    background: white; 
                    padding: 8px 16px; 
                    border-radius: 12px; 
                    border: 1px solid var(--border-light);
                    box-shadow: var(--shadow-sm); 
                }
                .role-chip select { 
                    border: none; background: transparent; 
                    font-weight: 700; outline: none; cursor: pointer; 
                    color: var(--primary); font-size: 0.85rem; 
                }

                .help-btn, .logout-btn, .notif-btn { 
                    width: 40px; height: 40px; 
                    border-radius: 12px; 
                    border: 1px solid var(--border-light); 
                    background: white; 
                    color: #64748b; 
                    cursor: pointer; 
                    display: flex; align-items: center; justify-content: center; 
                    transition: all 0.2s;
                }
                .help-btn:hover, .notif-btn:hover { background: #f8fafc; color: var(--primary); transform: translateY(-1px); }
                .logout-btn:hover { background: #fef2f2; border-color: #fecaca; color: #dc2626; }

                .notif-wrapper { position: relative; }
                .notif-btn.has-new { position: relative; }
                .notif-badge { 
                    position: absolute; top: -5px; right: -5px; 
                    background: #ef4444; color: white; 
                    font-size: 0.65rem; font-weight: 800; 
                    width: 18px; height: 18px; 
                    border-radius: 50%; 
                    display: flex; align-items: center; justify-content: center; 
                    border: 2px solid white;
                }

                /* VIEWPORT & MAIN SURFACE */
                .sys-viewport { 
                    flex: 1; 
                    overflow-y: auto; 
                    background: radial-gradient(circle at 0% 0%, #f9fafb, #eff6ff 100%); 
                    padding: 40px; 
                }

                /* SCRUTINY HUB REDESIGN */
                .scrutiny-hub { 
                    display: grid; 
                    grid-template-columns: 320px 1fr; 
                    gap: 30px; 
                    height: calc(100vh - 180px); 
                }
                .queue-sidebar { 
                    background: rgba(255, 255, 255, 0.8); 
                    backdrop-filter: blur(10px);
                    border-radius: 24px; 
                    border: 1px solid var(--border-light); 
                    display: flex; 
                    flex-direction: column; 
                    overflow: hidden; 
                    box-shadow: var(--shadow-premium);
                }
                .sidebar-header { 
                    padding: 20px; 
                    background: rgba(248, 250, 252, 0.5); 
                    border-bottom: 1px solid var(--border-light); 
                }
                .sidebar-header h3 { 
                    margin: 0 0 12px 0; 
                    font-size: 0.85rem; 
                    font-weight: 800; 
                    color: var(--text-muted); 
                    text-transform: uppercase; 
                    letter-spacing: 1px; 
                }
                .search-box { 
                    display: flex; 
                    align-items: center; 
                    gap: 10px; 
                    background: white; 
                    border: 1px solid var(--border-light); 
                    padding: 10px 14px; 
                    border-radius: 12px; 
                    transition: border-color 0.2s;
                }
                .search-box:focus-within { border-color: var(--accent); }
                .search-box input { border: none; outline: none; font-size: 0.9rem; width: 100%; color: var(--text-main); }

                .queue-list { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 12px; }
                .task-card { 
                    padding: 20px; 
                    border: 1.5px solid transparent; 
                    border-radius: 16px; 
                    cursor: pointer; 
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    background: white;
                }
                .task-card:hover { transform: translateY(-2px); border-color: var(--accent); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
                .task-card.active { border-color: var(--accent); background: #eff6ff; box-shadow: 0 8px 16px var(--accent-glow); }
                .task-type-tag { font-size: 0.65rem; font-weight: 800; color: var(--accent); text-transform: uppercase; margin-bottom: 8px; background: #eff6ff; padding: 4px 8px; border-radius: 6px; display: inline-block; }
                
                .case-content { 
                    background: white; 
                    border-radius: 28px; 
                    border: 1px solid var(--border-light); 
                    padding: 40px; 
                    overflow-y: auto; 
                    box-shadow: var(--shadow-premium);
                }
                .case-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 35px; border-bottom: 1px solid #f1f5f9; padding-bottom: 25px; }
                .case-top h2 { margin: 0 0 10px 0; font-size: 1.8rem; color: var(--primary); font-weight: 850; letter-spacing: -0.5px; }
                
                .case-details-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; margin-bottom: 35px; }
                .detail-panel { border: 1px solid var(--border-light); border-radius: 20px; overflow: hidden; background: white; }
                .p-header { background: #f8fafc; padding: 14px 24px; border-bottom: 1px solid var(--border-light); font-weight: 800; color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; }
                .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding: 24px; }
                .g-item label { display: block; font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 6px; }
                .g-item p { margin: 0; font-weight: 700; color: var(--text-main); font-size: 1rem; }
                
                /* TECH TABLES & GIS */
                .tech-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                .tech-table th { text-align: left; padding: 12px 16px; background: #f1f5f9; color: var(--text-muted); font-weight: 800; font-size: 0.7rem; text-transform: uppercase; border: 1px solid var(--border-light); }
                .tech-table td { padding: 14px 16px; border: 1px solid var(--border-light); color: var(--text-main); font-weight: 600; font-size: 0.9rem; }
                
                .gis-box { 
                    background: linear-gradient(135deg, #f0f9ff, #e0f2fe); 
                    border: 1px solid #bae6fd; 
                    border-radius: 20px; 
                    padding: 20px; 
                    display: flex; 
                    align-items: center; 
                    gap: 20px; 
                    margin-bottom: 25px; 
                }
                .gis-pin { width: 44px; height: 44px; background: var(--accent); color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px var(--accent-glow); }
                .text - red { color: #dc2626; }

                .audit - list { padding: 20px; display: flex; flex - direction: column; gap: 15px; }
                .disabled - btn { opacity: 0.5; cursor: not - allowed!important; filter: grayscale(1); }

                .scru - checklist { padding: 20px; display: flex; flex - direction: column; gap: 12px; }
                .check - item { display: flex; align - items: center; gap: 10px; cursor: pointer; font - size: 0.85rem; font - weight: 700; color: #475569; }
                .check - item input { width: 18px; height: 18px; cursor: pointer; }

                .modal - overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6); display: flex; align - items: center; justify - content: center; z - index: 1000; backdrop - filter: blur(4px); }
                .modal - content { background: white; border - radius: 24px; width: 600px; max - height: 90vh; overflow - y: auto; box - shadow: 0 25px 50px - 12px rgba(0, 0, 0, 0.25); }
                .modal - content.cert - preview { width: 800px; }
                .modal - header { padding: 25px 30px; border - bottom: 1px solid #f1f5f9; display: flex; justify - content: space - between; align - items: center; }
                .modal - header h3 { margin: 0; font - size: 1.2rem; color: #0f172a; font - weight: 800; }
                .close - btn { background: none; border: none; font - size: 1.5rem; cursor: pointer; color: #94a3b8; }
                .modal - body { padding: 30px; }
                .modal - footer { padding: 25px 30px; border - top: 1px solid #f1f5f9; display: flex; justify - content: flex - end; gap: 12px; }

                .cert - frame { border: 15px double #e2e8f0; padding: 40px; background: #fff; position: relative; font - family: 'serif'; color: #1e293b; }
                .cert - header { text - align: center; margin - bottom: 30px; }
                .cert - header h4 { margin: 10px 0 2px; font - size: 1.1rem; }
                .cert - header h5 { margin: 0; color: #64748b; }
                .cert - divider { height: 2px; background: #e2e8f0; margin: 20px auto; width: 60 %; }
                /* SUCCESS VIEW REDESIGN */
                .success-screen { text-align: center; padding: 80px 40px; }
                .success-icon { color: var(--success); margin-bottom: 30px; transform: scale(1.2); }
                .ref-card { 
                    background: hsla(158, 64%, 95%, 0.5); 
                    border: 1.5px solid hsla(158, 64%, 52%, 0.2); 
                    padding: 30px 40px; 
                    border-radius: 20px; 
                    display: inline-block; 
                    margin-bottom: 35px; 
                    box-shadow: 0 8px 16px rgba(16, 185, 129, 0.05);
                }
                .ref-card p { margin: 0 0 10px 0; font-size: 0.8rem; color: var(--success); font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
                .ref-card strong { font-size: 2rem; color: var(--success); font-weight: 950; letter-spacing: -1px; }
                .desc { max-width: 600px; margin: 0 auto 40px; color: var(--text-muted); line-height: 1.8; font-size: 1.1rem; font-weight: 500; }
                
                /* MODALS & OVERLAYS */
                .modal-overlay { 
                    position: fixed; 
                    top: 0; left: 0; right: 0; bottom: 0; 
                    background: rgba(15, 23, 42, 0.5); 
                    backdrop-filter: blur(8px); 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    z-index: 1000; 
                }
                .modal-content { 
                    background: white; 
                    border-radius: 28px; 
                    width: 640px; 
                    max-height: 90vh; 
                    overflow-y: auto; 
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.2); 
                    border: 1px solid var(--border-light);
                }
                .modal-header { padding: 32px 40px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; }
                .modal-header h3 { margin: 0; font-size: 1.4rem; color: var(--primary); font-weight: 850; letter-spacing: -0.5px; }

                /* ALERTS & QUERIES */
                .queries-alert-box { 
                    background: hsla(38, 92%, 96%, 0.8); 
                    border: 1.5px solid hsla(38, 92%, 50%, 0.2); 
                    border-radius: 24px; 
                    padding: 30px; 
                    margin-bottom: 35px; 
                }
                .q-item { 
                    background: white; 
                    padding: 20px; 
                    border-radius: 16px; 
                    border: 1px solid hsla(38, 92%, 50%, 0.1); 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    transition: all 0.2s;
                }
                .q-item:hover { border-color: var(--warning); box-shadow: 0 4px 12px rgba(245, 158, 11, 0.05); }

                /* UTILS & ANIMATIONS */
                .animated { animation: premiumPop 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
                @keyframes premiumPop {
                    from { opacity: 0; transform: translateY(15px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .p-chip { padding: 4px 12px; border-radius: 8px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
                .status-chip { background: var(--bg-body); color: var(--text-muted); padding: 6px 14px; border-radius: 10px; font-size: 0.75rem; font-weight: 700; border: 1px solid var(--border-light); }
            `}</style>
        </div >
    );
};

export default NOCWorkflow;
