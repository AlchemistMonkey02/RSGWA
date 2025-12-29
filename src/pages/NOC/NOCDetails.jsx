import React, { useState } from 'react';
import {
    FileText, MapPin, Droplets, CheckCircle, AlertCircle,
    ArrowLeft, Building2, Activity, ClipboardCheck,
    Download, Shield, Clock, AlertTriangle, FileCheck, Layers, Router,
    Thermometer, BarChart2
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DigitalCertificate from './DigitalCertificate';

const NOCDetails = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isGeneratingPdf, setIsGeneratingPdf] = React.useState(false);
    const certRef = React.useRef(null);

    const tabs = [
        { id: 'overview', label: 'NOC Overview', icon: <FileText size={16} /> },
        { id: 'project', label: 'Project & Location', icon: <Building2 size={16} /> },
        { id: 'abstraction', label: 'Abstraction Permission', icon: <Droplets size={16} /> },
        { id: 'structures', label: 'Structures Inventory', icon: <Layers size={16} /> },
        { id: 'meter', label: 'Flow Meter & Telemetry', icon: <Router size={16} /> },
        { id: 'quality', label: 'Water Quality', icon: <Thermometer size={16} /> },
        { id: 'compliance', label: 'Self-Compliance', icon: <ClipboardCheck size={16} /> },
        { id: 'renewal', label: 'Renewal & Amendment', icon: <Clock size={16} /> },
        { id: 'violations', label: 'Violations & Penalties', icon: <AlertTriangle size={16} /> },
        { id: 'docs', label: 'Documents', icon: <FileCheck size={16} /> }
    ];

    const nocData = {
        master: {
            authority: 'Central Ground Water Authority (CGWA)',
            ministry: 'Ministry of Jal Shakti',
            dept: 'Department of Water Resources, River Development & Ganga Rejuvenation',
            certType: 'No Objection Certificate (NOC)',
            purpose: 'Ground Water Abstraction',
            nocNo: 'NOC/IND/RJ/2025/8896-REV-2',
            appNo: 'IND/RJ/2025/8896-REV-2',
            issueDate: '19-12-2025',
            nocType: 'New',
            appType: 'Industry',
            projectStatus: 'Existing Project',
            validFrom: '26-12-2024',
            validTo: '25-12-2026',
            areaType: 'Over Exploited (GWRE-2024)',
            waterQuality: 'Fresh Water'
        },
        project: {
            name: 'Jodhpur RBU Infrabuild Private Limited',
            address: 'Khasra No. 165/317/566, Village Bhoo',
            tehsil: 'Jaisalmer',
            district: 'Jaisalmer',
            state: 'Rajasthan',
            pin: '345001',
            town: 'Jaisalmer',
            comAddress: 'H.No. 7, Housing Board Colony, Ganpati Enclave, Jharsa Road, New Civil Lines',
            cgwbOffice: '6-A, Jhalana Doongri, Jaipur – 302004, Rajasthan'
        },
        abstraction: {
            groundwater: { daily: 33.35, annual: 9371.35 },
            dewatering: { daily: 0.00, annual: 0.00 },
            total: { daily: 33.35, annual: 9371.35 }
        },
        structures: {
            dw: { exist: 0, prop: 0, total: 0 },
            dcb: { exist: 0, prop: 0, total: 0 },
            bw: { exist: 1, prop: 1, total: 2 },
            tw: { exist: 0, prop: 0, total: 0 },
            pumps: { exist: 0, prop: 0, total: 0 }
        }
    };

    const handleDownloadNOC = async () => {
        if (!certRef.current) return;

        setIsGeneratingPdf(true);
        try {
            // Wait for render
            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(certRef.current, {
                scale: 2, // Higher quality
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`NOC_${nocData.master.nocNo.replace(/\//g, '-')}.pdf`);
        } catch (error) {
            console.error("PDF Generation failed", error);
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="grid grid-cols-2 gap-6 animated fadeUp">
                        <div className="glass-card p-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Issuing Authority Details</h3>
                            <div className="space-y-3">
                                <InfoRow label="Issuing Authority" value={nocData.master.authority} />
                                <InfoRow label="Ministry" value={nocData.master.ministry} />
                                <InfoRow label="Department" value={nocData.master.dept} />
                            </div>
                        </div>
                        <div className="glass-card p-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Certificate Details</h3>
                            <div className="space-y-3">
                                <InfoRow label="Certificate Type" value={nocData.master.certType} />
                                <InfoRow label="Purpose" value={nocData.master.purpose} />
                                <InfoRow label="NOC Number" value={nocData.master.nocNo} isHighlight />
                                <InfoRow label="Application Number" value={nocData.master.appNo} />
                            </div>
                        </div>
                        <div className="glass-card p-6 col-span-2">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Validity & Category</h3>
                            <div className="grid grid-cols-3 gap-6">
                                <InfoRow label="Date of Issue" value={nocData.master.issueDate} />
                                <InfoRow label="Valid From" value={nocData.master.validFrom} />
                                <InfoRow label="Valid Up To" value={nocData.master.validTo} />
                                <InfoRow label="NOC Type" value={nocData.master.nocType} />
                                <InfoRow label="Application Type" value={nocData.master.appType} />
                                <InfoRow label="Project Status" value={nocData.master.projectStatus} />
                                <InfoRow label="Area Type Category" value={nocData.master.areaType} isAlert />
                                <InfoRow label="Water Quality Type" value={nocData.master.waterQuality} />
                            </div>
                        </div>
                    </div>
                );

            case 'project':
                return (
                    <div className="grid grid-cols-2 gap-6 animated fadeUp">
                        <div className="glass-card p-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><MapPin size={18} /> Project Location</h3>
                            <div className="space-y-3">
                                <InfoRow label="Project Name" value={nocData.project.name} isHighlight />
                                <InfoRow label="Address" value={nocData.project.address} />
                                <div className="grid grid-cols-2 gap-4">
                                    <InfoRow label="Tehsil" value={nocData.project.tehsil} />
                                    <InfoRow label="District" value={nocData.project.district} />
                                    <InfoRow label="State" value={nocData.project.state} />
                                    <InfoRow label="PIN Code" value={nocData.project.pin} />
                                </div>
                            </div>
                        </div>
                        <div className="glass-card p-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Communication & Regional Office</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Communication Address</label>
                                    <p className="text-sm font-semibold text-slate-800">{nocData.project.comAddress}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">CGWB Regional Office</label>
                                    <p className="text-sm font-semibold text-slate-800">{nocData.project.cgwbOffice}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'abstraction':
                return (
                    <div className="glass-panel p-6 animated fadeUp">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><Droplets size={20} /> Quantified Abstraction Permission</h3>
                        <div className="glass-table-container">
                            <table className="modern-table w-full">
                                <thead>
                                    <tr>
                                        <th>Parameter</th>
                                        <th>m³/day</th>
                                        <th>m³/year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="font-bold text-blue-900">Groundwater Abstraction</td>
                                        <td className="font-mono font-bold text-slate-700">{nocData.abstraction.groundwater.daily}</td>
                                        <td className="font-mono font-bold text-slate-700">{nocData.abstraction.groundwater.annual}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold text-slate-600">Dewatering</td>
                                        <td className="font-mono text-slate-500">{nocData.abstraction.dewatering.daily.toFixed(2)}</td>
                                        <td className="font-mono text-slate-500">{nocData.abstraction.dewatering.annual.toFixed(2)}</td>
                                    </tr>
                                    <tr className="bg-blue-50/50">
                                        <td className="font-extrabold text-blue-700">Total Permitted</td>
                                        <td className="font-mono font-extrabold text-blue-700">{nocData.abstraction.total.daily}</td>
                                        <td className="font-mono font-extrabold text-blue-700">{nocData.abstraction.total.annual}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'structures':
                return (
                    <div className="glass-panel p-6 animated fadeUp">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><Layers size={20} /> Abstraction Structures Inventory</h3>
                        <div className="glass-table-container">
                            <table className="modern-table w-full">
                                <thead>
                                    <tr>
                                        <th>Structure Type</th>
                                        <th>Existing</th>
                                        <th>Proposed</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(nocData.structures).map(([key, val]) => (
                                        <tr key={key}>
                                            <td className="font-bold text-slate-700 capitalize">
                                                {key === 'dw' ? 'Dug Well (DW)' :
                                                    key === 'dcb' ? 'Dug-cum-Bore Well (DCB)' :
                                                        key === 'bw' ? 'Bore Well (BW)' :
                                                            key === 'tw' ? 'Tube Well (TW)' : 'Pumps'}
                                            </td>
                                            <td className="text-center font-mono">{val.exist}</td>
                                            <td className="text-center font-mono">{val.prop}</td>
                                            <td className="text-center font-bold text-blue-600 font-mono">{val.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'compliance':
                return (
                    <div className="space-y-6 animated fadeUp">
                        <div className="glass-card p-6 border-l-4 border-green-500">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Phase-I (Within 30 Days)</h3>
                            <ul className="space-y-3">
                                <ComplianceItem text="Installation of tamper-proof digital water flow meter" />
                                <ComplianceItem text="Telemetry enabled on all abstraction structures" />
                                <ComplianceItem text="Update installation details in BHUNeER App / Portal" />
                            </ul>
                        </div>
                        <div className="glass-card p-6 border-l-4 border-blue-500">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Phase-II (Within 11 Months)</h3>
                            <ul className="space-y-3">
                                <ComplianceItem text="Annual calibration of water flow meter from authorized agency" />
                            </ul>
                        </div>
                    </div>
                );
            case 'quality':
                return (
                    <div className="glass-panel p-6 animated fadeUp">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Monitoring & Reporting</h3>
                        <div className="glass-table-container">
                            <table className="modern-table w-full">
                                <thead>
                                    <tr>
                                        <th>Requirement</th>
                                        <th>Frequency</th>
                                        <th>Submission Mode</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="font-bold">Groundwater Level Monitoring (Piezometer)</td>
                                        <td>Continuous</td>
                                        <td>CGWA Web Portal</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Water Quality Testing</td>
                                        <td>Once every year (April/May)</td>
                                        <td>NABL Accredited Lab</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Parameters</td>
                                        <td colSpan="2">Cations, Anions, Heavy Metals, Pesticides, Organics (Online Upload)</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Compliance Filing</td>
                                        <td>Mandatory</td>
                                        <td>BHUNeER App</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'violations':
                return (
                    <div className="glass-panel p-6 animated fadeUp">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 text-red-600 flex gap-2 items-center"><AlertTriangle size={20} /> Penalty & Enforcement Module</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                <span className="block text-xs font-bold text-red-400 uppercase">Condition</span>
                                <strong className="text-red-900 block mt-1">Non-compliance</strong>
                                <div className="mt-2 text-sm text-red-700 font-semibold bg-white/50 p-2 rounded">Action: Cancellation of NOC</div>
                            </div>
                            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                <span className="block text-xs font-bold text-red-400 uppercase">Condition</span>
                                <strong className="text-red-900 block mt-1">Violation</strong>
                                <div className="mt-2 text-sm text-red-700 font-semibold bg-white/50 p-2 rounded">Action: Legal action</div>
                            </div>
                            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                                <span className="block text-xs font-bold text-orange-400 uppercase">Condition</span>
                                <strong className="text-orange-900 block mt-1">Penalty</strong>
                                <div className="mt-2 text-sm text-orange-700 font-semibold bg-white/50 p-2 rounded">Action: As per Section 16 of Guidelines</div>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                <span className="block text-xs font-bold text-slate-400 uppercase">Condition</span>
                                <strong className="text-slate-900 block mt-1">Accidents / Borewell failure</strong>
                                <div className="mt-2 text-sm text-slate-700 font-semibold bg-white/50 p-2 rounded">Action: Joint liability of PP & Drilling Agency</div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="glass-panel p-8 text-center text-slate-400">
                        <Shield size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Detailed module for <strong>{activeTab}</strong> coming soon.</p>
                    </div>
                );
        }
    };

    return (
        <div className="noc-details-page h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                        <ArrowLeft size={16} />
                    </div>
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">{nocData.project.name}</h1>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="badge badge-success flex items-center gap-1"><CheckCircle size={10} /> Active</span>
                        <span className="text-sm font-semibold text-slate-500">{nocData.master.nocNo}</span>
                        <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded border border-red-100">{nocData.master.areaType}</span>
                    </div>
                </div>
                <div className="ml-auto">
                    <button
                        className="btn-primary flex items-center gap-2 shadow-lg shadow-blue-500/20"
                        onClick={handleDownloadNOC}
                        disabled={isGeneratingPdf}
                    >
                        {isGeneratingPdf ? (
                            <><RefreshCw className="animate-spin" size={18} /> Generating Certificate...</>
                        ) : (
                            <><Download size={18} /> Download Signed NOC</>
                        )}
                    </button>
                </div>
            </div>

            {/* Hidden Certificate Container for PDF Generation */}
            <div style={{ position: 'absolute', top: -9999, left: -9999, visibility: 'hidden' }}>
                <div style={{ width: '210mm', height: 'auto', display: 'block', visibility: 'visible' }}>
                    <DigitalCertificate ref={certRef} data={nocData} />
                </div>
            </div>

            {/* Tabs */}
            <div className="glass-panel p-1 mb-6 flex overflow-x-auto gap-1 sticky top-0 z-10 bg-white/80 backdrop-blur-md">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                            ? 'bg-slate-800 text-white shadow-md'
                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                            }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto pb-10">
                {renderTabContent()}
            </div>

            <style jsx>{`
                .glass-card { background: rgba(255,255,255,0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.5); border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
                .glass-panel { background: rgba(255,255,255,0.4); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.5); border-radius: 20px; }
                .badge { padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
                .badge-success { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
                
                .modern-table th { background: rgba(255,255,255,0.5); padding: 12px 16px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 700; text-align: left; }
                .modern-table td { padding: 14px 16px; border-bottom: 1px solid rgba(0,0,0,0.03); font-size: 0.9rem; }
                .modern-table tr:last-child td { border-bottom: none; }
                
                .animated { animation: fadeUp 0.4s ease-out forwards; }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

const InfoRow = ({ label, value, isHighlight, isAlert }) => (
    <div className="flex flex-col">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{label}</span>
        <span className={`font-semibold text-sm ${isHighlight ? 'text-blue-700 font-bold bg-blue-50 px-2 py-1 rounded w-fit' :
            isAlert ? 'text-red-600 font-bold bg-red-50 px-2 py-1 rounded w-fit border border-red-100' : 'text-slate-800'
            }`}>
            {value || '--'}
        </span>
    </div>
);

const ComplianceItem = ({ text }) => (
    <li className="flex items-start gap-3">
        <div className="mt-0.5 text-green-500 rounded-full bg-green-50 p-0.5"><CheckCircle size={14} /></div>
        <span className="text-sm font-semibold text-slate-700 leading-snug">{text}</span>
    </li>
);

export default NOCDetails;
