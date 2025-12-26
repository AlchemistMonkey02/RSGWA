import React, { useState } from 'react';
import { Plus, Info, CheckCircle, AlertCircle, FileText, Bookmark, ShieldCheck, Search, Download, List, Settings, Hammer, ExternalLink, X, Cpu, Activity, BadgeCheck } from 'lucide-react';

const MeterModels = () => {
    const [activeTab, setActiveTab] = useState('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedModel, setSelectedModel] = useState(null);

    const [models] = useState([
        {
            id: 'M-101',
            manufacturer: 'FlowMaster Ltd.',
            model: 'FM-200',
            type: 'Electromagnetic',
            usage: 'Groundwater',
            size: 'DN50',
            flow: '5-50 m³/h',
            status: 'Approved',
            approvalDate: '15 Jan 2024',
            certificate: 'ISO-4064-2024-001',
            ipRating: 'IP68',
            comms: 'NB-IoT / LoRaWAN',
            batteryLife: '10 Years',
            accuracy: 'Class 1.0 (±1%)'
        },
        {
            id: 'M-102',
            manufacturer: 'AquaTech',
            model: 'AT-Ultra',
            type: 'Ultrasonic',
            usage: 'Surface Water',
            size: 'DN80',
            flow: '10-100 m³/h',
            status: 'Pending',
            approvalDate: '-',
            certificate: 'Pending Review',
            ipRating: 'IP67',
            comms: 'GPRS / 4G',
            batteryLife: '5 Years',
            accuracy: 'Class 2.0 (±2%)'
        },
        {
            id: 'M-103',
            manufacturer: 'Zenner India',
            model: 'Woltman-W',
            type: 'Mechanical',
            usage: 'Groundwater',
            size: 'DN100',
            flow: '20-150 m³/h',
            status: 'Approved',
            approvalDate: '20 Nov 2023',
            certificate: 'ISO-4064-2023-089',
            ipRating: 'IP68',
            comms: 'LoRaWAN',
            batteryLife: '12 Years',
            accuracy: 'Class 1.5 (±1.5%)'
        },
    ]);

    const ModelDetailModal = ({ model, onClose }) => {
        if (!model) return null;

        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <div className="mh-left">
                            <span className="id-badge">{model.id}</span>
                            <h2>{model.model}</h2>
                            <p>{model.manufacturer}</p>
                        </div>
                        <button className="btn-close" onClick={onClose}><X size={24} /></button>
                    </div>

                    <div className="modal-body">
                        <div className="specs-grid">
                            <div className="spec-card main">
                                <h3><Cpu size={18} /> Technical Specifications</h3>
                                <div className="kv-grid">
                                    <div className="kv-item">
                                        <label>Technology</label>
                                        <span>{model.type}</span>
                                    </div>
                                    <div className="kv-item">
                                        <label>Pipe Size</label>
                                        <span>{model.size}</span>
                                    </div>
                                    <div className="kv-item">
                                        <label>Flow Range</label>
                                        <span>{model.flow}</span>
                                    </div>
                                    <div className="kv-item">
                                        <label>IP Rating</label>
                                        <span>{model.ipRating}</span>
                                    </div>
                                    <div className="kv-item">
                                        <label>Connectivity</label>
                                        <span>{model.comms}</span>
                                    </div>
                                    <div className="kv-item">
                                        <label>Battery Life</label>
                                        <span>{model.batteryLife}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="spec-card side">
                                <h3><BadgeCheck size={18} /> Compliance & Status</h3>
                                <div className="status-box">
                                    <span className={`status-pill large ${model.status.toLowerCase()}`}>
                                        {model.status}
                                    </span>
                                    {model.status === 'Approved' &&
                                        <span className="app-date">Allowed since {model.approvalDate}</span>
                                    }
                                </div>
                                <div className="cert-info">
                                    <div className="ci-row">
                                        <FileText size={16} />
                                        <span>Cert No: {model.certificate}</span>
                                    </div>
                                    <div className="ci-row">
                                        <Activity size={16} />
                                        <span>Accuracy: {model.accuracy}</span>
                                    </div>
                                </div>
                                <button className="btn-download-cert">
                                    <Download size={16} /> Download NABL Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="meter-models-v2">
            <div className="page-header">
                <div className="title-area">
                    <h1>Meter Model Registry (MDL)</h1>
                    <p>Standardized type-approval console for regulatory compliance of smart water meters</p>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary-v2"><Download size={16} /> Compliance Specs</button>
                    <button className="btn-primary-v2" onClick={() => setActiveTab('register')}>
                        <Plus size={18} /> Register New Model
                    </button>
                </div>
            </div>

            <div className="tabs-container">
                <div className="tabs-list">
                    <button
                        className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
                        onClick={() => setActiveTab('list')}
                    >
                        <List size={16} /> Approved Models
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                        onClick={() => setActiveTab('register')}
                    >
                        <FileText size={16} /> Model Registration
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'standards' ? 'active' : ''}`}
                        onClick={() => setActiveTab('standards')}
                    >
                        <ShieldCheck size={16} /> Compliance Standards
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'list' && (
                        <div className="tab-pane active animated">
                            <div className="list-controls">
                                <div className="search-bar">
                                    <Search size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search by Manufacturer, Model or ID..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="stats-strip">
                                    <div className="stat-item">
                                        <strong>{models.length}</strong>
                                        <span>Total Models</span>
                                    </div>
                                    <div className="stat-item">
                                        <strong>{models.filter(m => m.status === 'Approved').length}</strong>
                                        <span>Approved</span>
                                    </div>
                                </div>
                            </div>

                            <div className="table-wrapper">
                                <table className="modern-table">
                                    <thead>
                                        <tr>
                                            <th>Model Identity</th>
                                            <th>Technology</th>
                                            <th>Intended Use</th>
                                            <th>Tech Specs</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {models.map((m) => (
                                            <tr key={m.id} onClick={() => setSelectedModel(m)} className="clickable-row">
                                                <td>
                                                    <div className="model-id-cell">
                                                        <span className="id-tag">{m.id}</span>
                                                        <div className="model-names">
                                                            <strong>{m.model}</strong>
                                                            <span>{m.manufacturer}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{m.type}</td>
                                                <td>{m.usage}</td>
                                                <td>
                                                    <div className="spec-tags">
                                                        <span>{m.size}</span>
                                                        <span>{m.flow}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`status-pill ${m.status.toLowerCase()}`}>
                                                        {m.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="action-btns">
                                                        <button
                                                            className="btn-icon"
                                                            title="View Details"
                                                            onClick={(e) => { e.stopPropagation(); setSelectedModel(m); }}
                                                        >
                                                            <Info size={16} />
                                                        </button>
                                                        <button
                                                            className="btn-icon"
                                                            title="View Certificate"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <FileText size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'register' && (
                        <div className="tab-pane active animated">
                            <div className="form-portal">
                                <div className="form-info">
                                    <Bookmark size={24} className="text-blue-600" />
                                    <h3>Type Approval Application</h3>
                                    <p>Manufacturers must submit technical diagrams and NABL test reports for type approval according to RGWA-2024 guidelines.</p>
                                </div>
                                <div className="registration-form-grid">
                                    <div className="form-group">
                                        <label>Manufacturer Name</label>
                                        <input type="text" placeholder="e.g. Zenner India Ltd." />
                                    </div>
                                    <div className="form-group">
                                        <label>Model Identifier</label>
                                        <input type="text" placeholder="e.g. WMT-400" />
                                    </div>
                                    <div className="form-group">
                                        <label>Measurement Technology</label>
                                        <select>
                                            <option>Electromagnetic</option>
                                            <option>Ultrasonic</option>
                                            <option>Mechanical (Woltman)</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Accuracy Class</label>
                                        <select>
                                            <option>Class 1.0 (ISO 4064)</option>
                                            <option>Class 2.0 (ISO 4064)</option>
                                        </select>
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Technical Datasheet (PDF)</label>
                                        <div className="file-drop-zone">
                                            <Plus size={24} />
                                            <span>Upload NABL Calibration Certificate</span>
                                        </div>
                                    </div>
                                    <div className="form-actions-v2">
                                        <button className="btn-submit-v2">Submit for Scrutiny</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'standards' && (
                        <div className="tab-pane active animated">
                            <div className="standards-grid">
                                <div className="standard-card">
                                    <Settings size={24} />
                                    <h4>ISO 4064 Compliant</h4>
                                    <p>All meters must meet the metrological requirements for water meters for cold potable water and hot water.</p>
                                </div>
                                <div className="standard-card">
                                    <Hammer size={24} />
                                    <h4>IP68 Immersion Proof</h4>
                                    <p>Mandatory protection against dust and continuous immersion in water for pit-installed meters.</p>
                                </div>
                                <div className="standard-card">
                                    <ExternalLink size={24} />
                                    <h4>NB-IoT / LoRaWAN</h4>
                                    <p>Encryption-ready data transmission protocols required for real-time monitoring integration.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {selectedModel && <ModelDetailModal model={selectedModel} onClose={() => setSelectedModel(null)} />}

            <style jsx>{`
                .meter-models-v2 { padding: 30px; background: #f8fafc; min-height: 100vh; }
                .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
                .title-area h1 { font-size: 2rem; color: #1e293b; margin: 0; font-weight: 800; }
                .title-area p { color: #64748b; margin: 4px 0 0; font-size: 1rem; }

                .header-actions { display: flex; gap: 12px; }
                .btn-primary-v2 { padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 10px; font-weight: 700; display: flex; align-items: center; gap: 8px; cursor: pointer; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2); transition: all 0.2s; }
                .btn-primary-v2:hover { background: #1d4ed8; transform: translateY(-1px); }
                .btn-secondary-v2 { padding: 10px 20px; background: white; border: 1px solid #e2e8f0; color: #475569; border-radius: 10px; font-weight: 700; display: flex; align-items: center; gap: 8px; cursor: pointer; }

                .tabs-container { background: white; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
                .tabs-list { display: flex; background: #f1f5f9; padding: 6px; gap: 4px; border-radius: 16px 16px 0 0; }
                .tab-btn { flex: 1; padding: 12px; border: none; background: transparent; border-radius: 10px; font-weight: 700; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; }
                .tab-btn:hover { background: #e2e8f0; color: #1e293b; }
                .tab-btn.active { background: white; color: #2563eb; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }

                .tab-content { padding: 30px; }
                
                .list-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
                .search-bar { display: flex; align-items: center; gap: 12px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 18px; border-radius: 12px; width: 400px; }
                .search-bar input { border: none; background: transparent; outline: none; width: 100%; font-size: 0.95rem; color: #1e293b; }
                
                .stats-strip { display: flex; gap: 20px; }
                .stat-item { text-align: right; }
                .stat-item strong { display: block; font-size: 1.25rem; color: #1e293b; line-height: 1; }
                .stat-item span { font-size: 0.75rem; color: #64748b; font-weight: 600; text-transform: uppercase; }

                .table-wrapper { border: 1px solid #f1f5f9; border-radius: 12px; overflow: hidden; }
                .modern-table { width: 100%; border-collapse: collapse; }
                .modern-table th { text-align: left; padding: 15px; background: #f8fafc; color: #64748b; font-size: 0.8rem; text-transform: uppercase; font-weight: 800; border-bottom: 1px solid #f1f5f9; }
                .modern-table td { padding: 15px; border-bottom: 1px solid #f1f5f9; font-size: 0.95rem; color: #475569; }
                .clickable-row { cursor: pointer; transition: background 0.1s; }
                .clickable-row:hover { background: #f8fafc; }

                .model-id-cell { display: flex; align-items: center; gap: 12px; }
                .id-tag { background: #eff6ff; color: #2563eb; padding: 4px 8px; border-radius: 6px; font-weight: 800; font-size: 0.75rem; font-family: monospace; }
                .model-names { display: flex; flex-direction: column; }
                .model-names strong { color: #1e293b; }
                .model-names span { font-size: 0.8rem; color: #94a3b8; }

                .spec-tags { display: flex; gap: 8px; }
                .spec-tags span { background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; }

                .status-pill { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }
                .status-pill.approved { background: #dcfce7; color: #166534; }
                .status-pill.pending { background: #fffbeb; color: #9a3412; }

                .action-btns { display: flex; gap: 8px; }
                .btn-icon { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; display: flex; align-items: center; justify-content: center; color: #64748b; cursor: pointer; transition: all 0.2s; }
                .btn-icon:hover { color: #2563eb; border-color: #2563eb; background: #eff6ff; }

                .form-portal { max-width: 800px; margin: 0 auto; background: #f8fafc; padding: 30px; border-radius: 20px; border: 1px solid #e2e8f0; }
                .form-info { margin-bottom: 30px; text-align: center; }
                .form-info h3 { font-size: 1.5rem; color: #1e293b; margin: 15px 0 5px; }
                .form-info p { color: #64748b; font-size: 0.95rem; }

                .registration-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .form-group { display: flex; flex-direction: column; gap: 8px; }
                .form-group.full-width { grid-column: span 2; }
                .form-group label { font-size: 0.85rem; font-weight: 700; color: #475569; }
                .form-group input, .form-group select { padding: 12px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 1rem; outline: none; transition: border-color 0.2s; }
                .form-group input:focus { border-color: #2563eb; }

                .file-drop-zone { border: 2px dashed #cbd5e1; border-radius: 12px; padding: 30px; display: flex; flex-direction: column; align-items: center; gap: 10px; color: #94a3b8; cursor: pointer; transition: all 0.2s; background: white; }
                .file-drop-zone:hover { border-color: #2563eb; color: #2563eb; background: #eff6ff; }

                .form-actions-v2 { grid-column: span 2; margin-top: 10px; }
                .btn-submit-v2 { width: 100%; padding: 15px; background: #1e293b; color: white; border: none; border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

                .standards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
                .standard-card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 30px; border-radius: 20px; transition: all 0.3s; }
                .standard-card:hover { transform: translateY(-5px); border-color: #2563eb; box-shadow: 0 10px 20px -10px rgba(37,99,235,0.2); }
                .standard-card h4 { font-size: 1.25rem; color: #1e293b; margin: 15px 0 10px; }
                .standard-card p { color: #64748b; font-size: 0.95rem; line-height: 1.6; }

                /* Modal Specific Styles */
                 .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); display: flex; justify-content: center; align-items: center; z-index: 1000; animation: fadeIn 0.2s ease-out; }
                .modal-content { background: white; width: 700px; max-width: 95vw; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: 1px solid #e2e8f0; }
                
                .modal-header { padding: 25px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: flex-start; background: #fff; }
                .id-badge { background: #eff6ff; color: #2563eb; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 800; font-family: monospace; display: inline-block; margin-bottom: 8px; }
                .mh-left h2 { margin: 0; font-size: 1.5rem; color: #1e293b; }
                .mh-left p { margin: 4px 0 0; color: #64748b; font-size: 1rem; }

                .btn-close { border: none; background: transparent; color: #94a3b8; cursor: pointer; padding: 5px; border-radius: 8px; transition: all 0.2s; }
                .btn-close:hover { background: #f1f5f9; color: #ef4444; }

                .modal-body { padding: 30px; background: #f8fafc; }
                .specs-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; }
                
                .spec-card { background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; }
                .spec-card h3 { font-size: 1rem; color: #334155; margin: 0 0 20px 0; display: flex; align-items: center; gap: 10px; pb-2 border-bottom: 1px solid #f1f5f9; }
                
                .kv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .kv-item { display: flex; flex-direction: column; gap: 4px; }
                .kv-item label { font-size: 0.75rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; }
                .kv-item span { font-size: 0.95rem; color: #1e293b; font-weight: 600; }

                .status-box { margin-bottom: 20px; }
                .status-pill.large { font-size: 0.9rem; padding: 6px 14px; }
                .app-date { display: block; font-size: 0.8rem; color: #166534; margin-top: 8px; font-weight: 600; }

                .cert-info { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
                .ci-row { display: flex; align-items: center; gap: 10px; color: #475569; font-size: 0.85rem; }

                .btn-download-cert { width: 100%; padding: 12px; background: #1e293b; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.9rem; transition: all 0.2s; }
                .btn-download-cert:hover { background: #0f172a; }

                .animated { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default MeterModels;
