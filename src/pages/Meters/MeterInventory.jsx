import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Tag, Calendar, CheckCircle, AlertCircle, Trash2, List, FileUp, Database, Download, Filter, Package, History, Ruler, Wifi, MapPin, Gauge } from 'lucide-react';

const MeterInventory = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [meters] = useState([
        { serialNo: 'SN-77881', modelId: 'M-101', manufacturer: 'FlowMaster', type: 'Electromagnetic', accuracy: 'Class B', pipeDia: '80mm', mfgDate: '2024-10-15', warranty: '2026-10-15', status: 'Registered' },
        { serialNo: 'SN-77882', modelId: 'M-101', manufacturer: 'FlowMaster', type: 'Electromagnetic', accuracy: 'Class B', pipeDia: '80mm', mfgDate: '2024-10-15', warranty: '2026-10-15', status: 'Installed' },
        { serialNo: 'SN-99042', modelId: 'M-102', manufacturer: 'AquaTech', type: 'Ultrasonic', accuracy: 'Class A', pipeDia: '50mm', mfgDate: '2024-11-02', warranty: '2026-11-02', status: 'Verified' },
    ]);

    return (
        <div className="meter-inventory-v2">
            <div className="page-header">
                <div className="title-area">
                    <h1>Digital Asset Inventory</h1>
                    <p>Centralized tracking of individual smart meter units and deployment lifecycle</p>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary-v2"><FileUp size={16} /> Bulk Template</button>
                    <button className="btn-primary-v2" onClick={() => setActiveTab('entry')}>
                        <Plus size={18} /> Add Individual Unit
                    </button>
                </div>
            </div>

            <div className="tabs-container">
                <div className="tabs-list">
                    <button className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')}>
                        <List size={16} /> Serial List
                    </button>
                    <button className={`tab-btn ${activeTab === 'entry' ? 'active' : ''}`} onClick={() => setActiveTab('entry')}>
                        <Package size={16} /> Meter Registration
                    </button>
                    <button className={`tab-btn ${activeTab === 'bulk' ? 'active' : ''}`} onClick={() => setActiveTab('bulk')}>
                        <Database size={16} /> Bulk Import
                    </button>
                    <button className={`tab-btn ${activeTab === 'archive' ? 'active' : ''}`} onClick={() => setActiveTab('archive')}>
                        <History size={16} /> Technical Archive
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'list' && (
                        <div className="tab-pane active animated">
                            <div className="inventory-controls">
                                <div className="search-bar">
                                    <Search size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search by Serial Number..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="filter-group">
                                    <select className="control-select">
                                        <option>All Models</option>
                                        <option>M-101</option>
                                        <option>M-102</option>
                                    </select>
                                    <button className="btn-filter"><Filter size={16} /></button>
                                </div>
                            </div>

                            <div className="inventory-grid">
                                {meters.map((meter) => (
                                    <div key={meter.serialNo} className={`asset-card ${meter.status.toLowerCase()}`}>
                                        <div className="asset-header">
                                            <div className="asset-identity">
                                                <Tag size={14} className="text-blue-500" />
                                                <span className="sn-font">{meter.serialNo}</span>
                                            </div>
                                            <span className={`status-pill-v2 ${meter.status.toLowerCase()}`}>{meter.status}</span>
                                        </div>
                                        <div className="asset-body">
                                            <div className="data-row">
                                                <span>Model ID</span>
                                                <strong>{meter.modelId}</strong>
                                            </div>
                                            <div className="data-row">
                                                <span>Type</span>
                                                <strong>{meter.type}</strong>
                                            </div>
                                            <div className="data-row">
                                                <span>Accuracy</span>
                                                <strong>{meter.accuracy}</strong>
                                            </div>
                                            <div className="data-row">
                                                <span>Pipe Dia</span>
                                                <strong>{meter.pipeDia}</strong>
                                            </div>
                                        </div>
                                        <div className="asset-actions">
                                            <button className="btn-details" onClick={() => navigate(`/meter-lifecycle?serial=${meter.serialNo}`)}>View Lifecycle</button>
                                            <button className="btn-options">•••</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'entry' && (
                        <div className="tab-pane active animated">
                            <div className="entry-form-container">
                                <h3>Meter Registration Form</h3>
                                <p className="form-subtitle">Registered Device Technical Specification</p>

                                {/* 1. Basic Details */}
                                <div className="form-section">
                                    <h4><Package size={16} /> Basic Details</h4>
                                    <div className="form-grid-cols">
                                        <div className="form-group">
                                            <label>Meter ID (System Generated)</label>
                                            <input type="text" value="MTR-2024-XXXX" disabled className="bg-slate-100 cursor-not-allowed" />
                                        </div>
                                        <div className="form-group">
                                            <label>Serial Number</label>
                                            <input type="text" placeholder="Scanning..." />
                                        </div>
                                        <div className="form-group">
                                            <label>Manufacturer Name</label>
                                            <select>
                                                <option>Select Manufacturer</option>
                                                <option>FlowMaster Pvt Ltd</option>
                                                <option>AquaTech Solutions</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Model Number</label>
                                            <input type="text" placeholder="e.g. FM-200" />
                                        </div>
                                        <div className="form-group">
                                            <label>Meter Type</label>
                                            <select>
                                                <option>Electromagnetic</option>
                                                <option>Ultrasonic</option>
                                                <option>Mechanical</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Accuracy Class</label>
                                            <select>
                                                <option>Class A</option>
                                                <option>Class B</option>
                                                <option>Class C</option>
                                            </select>
                                        </div>
                                        <div className="form-group full-width">
                                            <label>Certification (ISO / MID)</label>
                                            <input type="text" placeholder="e.g. ISO 4064:2014, MID 2014/32/EU" />
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Installation Details */}
                                <div className="form-section">
                                    <h4><Ruler size={16} /> Installation Details</h4>
                                    <div className="form-grid-cols">
                                        <div className="form-group">
                                            <label>Borewell / Pipeline ID</label>
                                            <input type="text" placeholder="e.g. BW-003" />
                                        </div>
                                        <div className="form-group">
                                            <label>Date of Installation</label>
                                            <input type="date" />
                                        </div>
                                        <div className="form-group">
                                            <label>GPS Coordinates</label>
                                            <input type="text" placeholder="Lat, Long" />
                                        </div>
                                        <div className="form-group">
                                            <label>Depth of Installation (m)</label>
                                            <input type="number" placeholder="e.g. 150" />
                                        </div>
                                        <div className="form-group">
                                            <label>Pipe Diameter</label>
                                            <select>
                                                <option>50 mm</option>
                                                <option>80 mm</option>
                                                <option>100 mm</option>
                                                <option>150 mm</option>
                                                <option>200 mm</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Connectivity */}
                                <div className="form-section">
                                    <h4><Wifi size={16} /> Connectivity</h4>
                                    <div className="form-grid-cols">
                                        <div className="form-group full-width">
                                            <label>Communication Mode</label>
                                            <div className="radio-group-v2">
                                                <label className="radio-card">
                                                    <input type="radio" name="conn" />
                                                    <span>Manual</span>
                                                </label>
                                                <label className="radio-card">
                                                    <input type="radio" name="conn" />
                                                    <span>AMR (Automated)</span>
                                                </label>
                                                <label className="radio-card">
                                                    <input type="radio" name="conn" defaultChecked />
                                                    <span>IoT / Telemetry</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>Telemetry Protocol</label>
                                            <select>
                                                <option>GSM / GPRS</option>
                                                <option>NB-IoT</option>
                                                <option>LoRa</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Data Frequency</label>
                                            <select>
                                                <option>15 Minutes</option>
                                                <option>Hourly</option>
                                                <option>Daily</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-actions-full">
                                    <button className="btn-cancel">Cancel</button>
                                    <button className="btn-save-v2">Register Asset</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'bulk' && (
                        <div className="tab-pane active animated">
                            <div className="bulk-portal">
                                <div className="upload-illustration">
                                    <FileUp size={48} className="text-blue-500" />
                                    <h3>Secure Batch Upload</h3>
                                    <p>Upload CSV or Excel files containing multiple asset identities.</p>
                                </div>
                                <div className="upload-requirements">
                                    <h4>Mandatory Columns:</h4>
                                    <ul>
                                        <li>serial_number (Primary Key)</li>
                                        <li>model_identifier</li>
                                        <li>meter_type</li>
                                        <li>accuracy_class</li>
                                        <li>pipe_diameter_mm</li>
                                    </ul>
                                </div>
                                <button className="btn-upload-v2"><Download size={16} /> Download Template</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'archive' && (
                        <div className="tab-pane active animated">
                            <div className="archive-placeholder">
                                <History size={32} />
                                <h3>Decommissioned Assets</h3>
                                <p>Historical records of meters that have reached End-of-Life (EoL) or were physically scrapped.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .meter-inventory-v2 { padding: 30px; background: #f8fafc; min-height: 100vh; font-family: 'Inter', sans-serif; }
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

                .inventory-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
                .search-bar { display: flex; align-items: center; gap: 12px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 18px; border-radius: 12px; width: 350px; }
                .search-bar input { border: none; background: transparent; outline: none; width: 100%; font-size: 0.95rem; color: #1e293b; }
                
                .filter-group { display: flex; gap: 10px; }
                .control-select { padding: 8px 15px; border-radius: 10px; border: 1px solid #e2e8f0; background: white; color: #475569; font-weight: 600; outline: none; }
                .btn-filter { width: 38px; height: 38px; border-radius: 10px; border: 1px solid #e2e8f0; background: white; color: #475569; display: flex; align-items: center; justify-content: center; cursor: pointer; }

                .inventory-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
                .asset-card { background: white; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; transition: all 0.2s; }
                .asset-card:hover { transform: translateY(-3px); border-color: #2563eb; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }
                
                .asset-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
                .asset-identity { display: flex; align-items: center; gap: 8px; }
                .sn-font { font-family: 'JetBrains Mono', monospace; font-weight: 800; color: #1e293b; font-size: 0.95rem; }
                
                .status-pill-v2 { padding: 3px 10px; border-radius: 5px; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; }
                .status-pill-v2.registered { background: #eff6ff; color: #2563eb; }
                .status-pill-v2.installed { background: #fef3c7; color: #92400e; }
                .status-pill-v2.verified { background: #dcfce7; color: #166534; }

                .asset-body { background: #f8fafc; border-radius: 10px; padding: 12px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
                .data-row { display: flex; justify-content: space-between; font-size: 0.85rem; }
                .data-row span { color: #64748b; font-weight: 600; }
                .data-row strong { color: #1e293b; }

                .asset-actions { display: flex; gap: 10px; }
                .btn-details { flex: 1; padding: 8px; background: #1e293b; color: white; border: none; border-radius: 8px; font-size: 0.8rem; font-weight: 700; cursor: pointer; }
                .btn-options { width: 34px; padding: 8px; background: #f1f5f9; border: none; border-radius: 8px; color: #475569; cursor: pointer; }

                .entry-form-container { max-width: 800px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 20px; border: 1px solid #e2e8f0; }
                .form-subtitle { color: #64748b; margin-bottom: 30px; }

                .form-section { margin-bottom: 30px; padding-bottom: 30px; border-bottom: 1px solid #f1f5f9; }
                .form-section h4 { margin: 0 0 20px 0; color: #1e293b; font-size: 0.95rem; display: flex; align-items: center; gap: 8px; }
                
                .form-grid-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .form-group { display: flex; flex-direction: column; gap: 6px; }
                .form-group.full-width { grid-column: span 2; }
                .form-group label { font-size: 0.85rem; font-weight: 700; color: #475569; }
                .form-group input, .form-group select { padding: 12px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 0.95rem; outline: none; transition: border-color 0.2s; width: 100%; }
                
                .radio-group-v2 { display: flex; gap: 10px; }
                .radio-card { flex: 1; border: 1px solid #e2e8f0; padding: 10px; border-radius: 8px; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s; }
                .radio-card:hover { border-color: #3b82f6; background: #eff6ff; }
                .radio-card span { font-size: 0.9rem; font-weight: 600; color: #1e293b; }

                .form-actions-full { display: flex; justify-content: flex-end; gap: 15px; margin-top: 20px; }
                .btn-cancel { padding: 12px 25px; background: white; border: 1px solid #cbd5e1; color: #64748b; border-radius: 10px; font-weight: 700; cursor: pointer; }
                .btn-save-v2 { padding: 12px 30px; background: #2563eb; color: white; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 1rem; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2); }

                .bulk-portal { text-align: center; padding: 40px; border: 2px dashed #cbd5e1; border-radius: 20px; max-width: 600px; margin: 0 auto; }
                .upload-illustration h3 { font-size: 1.5rem; color: #1e293b; margin: 15px 0 5px; }
                .upload-requirements { text-align: left; margin: 25px 0; background: #f1f5f9; padding: 20px; border-radius: 12px; }
                .upload-requirements h4 { margin: 0 0 10px 0; color: #1e293b; }
                .upload-requirements ul { padding-left: 20px; margin: 0; color: #475569; font-size: 0.9rem; line-height: 1.6; }
                .btn-upload-v2 { font-weight: 700; color: #2563eb; background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px; margin: 0 auto; }

                .archive-placeholder { text-align: center; padding: 100px 40px; color: #94a3b8; }
                .animated { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default MeterInventory;
