import React, { useState } from 'react';
import { Landmark, FileText, AlertCircle, CheckCircle2, History, Calculator, BadgeIndianRupee, TrendingUp, Download, Send, Filter, Search, Scale } from 'lucide-react';

const GroundwaterCharges = () => {
    const [activeTab, setActiveTab] = useState('generate');
    const [selectedBill, setSelectedBill] = useState(null);

    // Mock Data for Pending Billing Cycles
    const [pendingCycles] = useState([
        { id: 'CYC-2024-Q4', period: 'Oct - Dec 2024', industries: 142, totalAbstraction: '4.2M m³', projectedRevenue: '₹ 84.5 Lakhs', status: 'Pending Generation' },
        { id: 'CYC-2024-Q3', period: 'Jul - Sep 2024', industries: 0, totalAbstraction: '-', projectedRevenue: '-', status: 'Generated' },
    ]);

    // Mock Data for Generated Bills (Invoice Registry)
    const [invoices] = useState([
        { id: 'INV-2024-001', industry: 'Adani Cement Ltd.', nocId: 'NOC/IND/2024/11', consumption: '12,500 m³', rate: '₹ 10/m³', amount: 125000, penalty: 0, status: 'Paid', date: '2024-10-15' },
        { id: 'INV-2024-002', industry: 'Green Textiles', nocId: 'NOC/IND/2024/45', consumption: '8,200 m³', rate: '₹ 10/m³', amount: 82000, penalty: 25000, status: 'Unpaid', date: '2024-10-16', penaltyReason: 'Over-extraction (110%)' },
        { id: 'INV-2024-003', industry: 'Rajasthan Foods', nocId: 'NOC/IND/2024/88', consumption: '5,000 m³', rate: '₹ 8/m³', amount: 40000, penalty: 0, status: 'Overdue', date: '2024-10-01' },
    ]);

    // Tariff Configuration (Mock)
    const tariffs = {
        safe: 5,
        semiCritical: 10,
        critical: 20,
        overExploited: 40
    };

    const CalculatorModule = () => {
        const [calcInput, setCalcInput] = useState({ usage: '', zone: 'semiCritical', isOver: false });
        const [calcResult, setCalcResult] = useState(null);

        const calculate = () => {
            const usage = parseFloat(calcInput.usage) || 0;
            const rate = tariffs[calcInput.zone];
            let baseParams = { usage, rate, total: usage * rate };

            let penaltyParams = { amount: 0, reason: null };
            if (calcInput.isOver) {
                // 100% Surcharge for over-extraction
                penaltyParams.amount = baseParams.total * 1.0;
                penaltyParams.reason = '100% Surcharge (Violation of NOC)';
            }

            setCalcResult({ base: baseParams, penalty: penaltyParams });
        };

        return (
            <div className="calculator-box">
                <div className="calc-header">
                    <Calculator size={20} className="text-blue-600" />
                    <h3>Tariff & Penalty Simulator</h3>
                </div>
                <div className="calc-body">
                    <div className="form-group-sm">
                        <label>Water Abstraction (m³)</label>
                        <input
                            type="number"
                            value={calcInput.usage}
                            onChange={(e) => setCalcInput({ ...calcInput, usage: e.target.value })}
                            placeholder="e.g. 5000"
                        />
                    </div>
                    <div className="form-group-sm">
                        <label>Assessment Zone</label>
                        <select
                            value={calcInput.zone}
                            onChange={(e) => setCalcInput({ ...calcInput, zone: e.target.value })}
                        >
                            <option value="safe">Safe (₹5/m³)</option>
                            <option value="semiCritical">Semi-Critical (₹10/m³)</option>
                            <option value="critical">Critical (₹20/m³)</option>
                            <option value="overExploited">Over-Exploited (₹40/m³)</option>
                        </select>
                    </div>
                    <div className="form-checkbox">
                        <input
                            type="checkbox"
                            id="overExtract"
                            checked={calcInput.isOver}
                            onChange={(e) => setCalcInput({ ...calcInput, isOver: e.target.checked })}
                        />
                        <label htmlFor="overExtract">Apply Excess Abstraction Penalty</label>
                    </div>
                    <button className="btn-calc" onClick={calculate}>Calculate Charges</button>

                    {calcResult && (
                        <div className="calc-result animated">
                            <div className="res-row">
                                <span>Base Charge:</span>
                                <strong>₹ {calcResult.base.total.toLocaleString()}</strong>
                            </div>
                            {calcResult.penalty.amount > 0 && (
                                <div className="res-row penalty">
                                    <span>Penalty ({calcResult.penalty.reason}):</span>
                                    <strong>+ ₹ {calcResult.penalty.amount.toLocaleString()}</strong>
                                </div>
                            )}
                            <div className="res-row total">
                                <span>Net Payable:</span>
                                <strong>₹ {(calcResult.base.total + calcResult.penalty.amount).toLocaleString()}</strong>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="gw-charges-page">
            <div className="page-header">
                <div className="title-area">
                    <h1>Revenue & Enforcement Console</h1>
                    <p>Manage abstraction charges, generate invoices, and enforce environmental penalties.</p>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary-v2">
                        <Scale size={16} /> Tariff Sheet
                    </button>
                    <button className="btn-primary-v2">
                        <History size={16} /> Financial Reports
                    </button>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="left-panel">
                    <div className="tabs-container">
                        <div className="tabs-list">
                            <button className={`tab-btn ${activeTab === 'generate' ? 'active' : ''}`} onClick={() => setActiveTab('generate')}>
                                <FileText size={16} /> Cycle Managment
                            </button>
                            <button className={`tab-btn ${activeTab === 'registry' ? 'active' : ''}`} onClick={() => setActiveTab('registry')}>
                                <BadgeIndianRupee size={16} /> Invoice Registry
                            </button>
                        </div>

                        <div className="tab-content">
                            {activeTab === 'generate' && (
                                <div className="tab-pane active animated">
                                    <div className="section-title">
                                        <h3>Active Billing Cycles</h3>
                                        <span className="badge-live">Live System</span>
                                    </div>
                                    <div className="cycles-list">
                                        {pendingCycles.map(cycle => (
                                            <div key={cycle.id} className="cycle-card">
                                                <div className="cc-header">
                                                    <div className="cc-icon"><TrendingUp size={20} /></div>
                                                    <div>
                                                        <h4>{cycle.period}</h4>
                                                        <span className="cycle-id">{cycle.id}</span>
                                                    </div>
                                                </div>
                                                <div className="cc-stats">
                                                    <div className="stat">
                                                        <label>Eligible Units</label>
                                                        <span>{cycle.industries}</span>
                                                    </div>
                                                    <div className="stat">
                                                        <label>Total Drawal</label>
                                                        <span>{cycle.totalAbstraction}</span>
                                                    </div>
                                                    <div className="stat">
                                                        <label>Est. Revenue</label>
                                                        <span>{cycle.projectedRevenue}</span>
                                                    </div>
                                                </div>
                                                <div className="cc-actions">
                                                    {cycle.status === 'Pending Generation' ? (
                                                        <button className="btn-generate">Generate Invoices</button>
                                                    ) : (
                                                        <button className="btn-view" disabled>Completed</button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'registry' && (
                                <div className="tab-pane active animated">
                                    <div className="registry-controls">
                                        <div className="search-bar">
                                            <Search size={16} />
                                            <input type="text" placeholder="Search Invoice or Industry..." />
                                        </div>
                                        <button className="btn-filter"><Filter size={16} /> Filter</button>
                                    </div>
                                    <table className="modern-table">
                                        <thead>
                                            <tr>
                                                <th>Invoice No</th>
                                                <th>Industry</th>
                                                <th>Consumption</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invoices.map(inv => (
                                                <tr key={inv.id}>
                                                    <td className="mono-font">{inv.id}</td>
                                                    <td>
                                                        <div className="ind-col">
                                                            <strong>{inv.industry}</strong>
                                                            <span>{inv.nocId}</span>
                                                        </div>
                                                    </td>
                                                    <td>{inv.consumption}</td>
                                                    <td>
                                                        <div className="amt-col">
                                                            <span>₹ {inv.amount.toLocaleString()}</span>
                                                            {inv.penalty > 0 && <span className="penalty-tag">+{inv.penalty / 1000}k Fine</span>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className={`status-pill ${inv.status.toLowerCase()}`}>
                                                            {inv.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="btn-icon"><Download size={16} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="right-panel">
                    <CalculatorModule />

                    <div className="info-card">
                        <div className="ic-header">
                            <Landmark size={20} className="text-purple-600" />
                            <h3>Regulatory Context</h3>
                        </div>
                        <ul className="info-list">
                            <li><strong>Conservation Charge:</strong> Mandated by RGWA Notification 2024 for all commercial users.</li>
                            <li><strong>Late Fee:</strong> 12% p.a. interest chargeable on payments delayed beyond 30 days.</li>
                            <li><strong>Penalty:</strong> 200% charge for water extracted beyond NOC limits or for non-functional telemetry.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .gw-charges-page { padding: 30px; background: #f8fafc; min-height: 100vh; font-family: 'Inter', sans-serif; }
                .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
                .title-area h1 { font-size: 1.8rem; color: #1e293b; margin: 0; font-weight: 800; }
                .title-area p { color: #64748b; margin: 4px 0 0; font-size: 0.95rem; }

                .header-actions { display: flex; gap: 12px; }
                .btn-secondary-v2 { padding: 10px 18px; background: white; border: 1px solid #e2e8f0; color: #475569; border-radius: 10px; font-weight: 700; display: flex; align-items: center; gap: 8px; cursor: pointer; }
                .btn-primary-v2 { padding: 10px 18px; background: #1e293b; color: white; border: none; border-radius: 10px; font-weight: 700; display: flex; align-items: center; gap: 8px; cursor: pointer; }

                .dashboard-grid { display: grid; grid-template-columns: 1fr 340px; gap: 25px; }

                .tabs-container { background: white; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); min-height: 600px; }
                .tabs-list { display: flex; background: #f1f5f9; padding: 6px; gap: 4px; border-radius: 16px 16px 0 0; }
                .tab-btn { flex: 1; padding: 12px; border: none; background: transparent; border-radius: 10px; font-weight: 700; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; }
                .tab-btn.active { background: white; color: #2563eb; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }

                .tab-content { padding: 25px; }

                .section-title { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                .section-title h3 { font-size: 1.1rem; color: #334155; margin: 0; }
                .badge-live { background: #dcfce7; color: #166534; font-size: 0.7rem; padding: 2px 8px; border-radius: 10px; font-weight: 800; text-transform: uppercase; }

                .cycles-list { display: grid; gap: 15px; }
                .cycle-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; display: flex; align-items: center; justify-content: space-between; }
                .cc-header { display: flex; align-items: center; gap: 15px; width: 30%; }
                .cc-icon { width: 40px; height: 40px; background: #eff6ff; color: #2563eb; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
                .cc-header h4 { margin: 0; color: #1e293b; font-size: 1rem; }
                .cycle-id { font-size: 0.75rem; color: #94a3b8; font-family: monospace; }
                
                .cc-stats { display: flex; gap: 30px; width: 40%; }
                .stat { display: flex; flex-direction: column; }
                .stat label { font-size: 0.7rem; color: #64748b; text-transform: uppercase; font-weight: 700; }
                .stat span { font-size: 0.95rem; color: #1e293b; font-weight: 600; }

                .cc-actions { width: 25%; text-align: right; }
                .btn-generate { background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2); }
                .btn-view { background: #e2e8f0; color: #94a3b8; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: not-allowed; }

                .registry-controls { display: flex; gap: 10px; margin-bottom: 20px; }
                .search-bar { flex: 1; display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 15px; border-radius: 8px; }
                .search-bar input { background: transparent; border: none; outline: none; width: 100%; font-size: 0.9rem; }
                .btn-filter { display: flex; align-items: center; gap: 8px; padding: 0 15px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; font-weight: 600; color: #475569; }

                .modern-table { width: 100%; border-collapse: collapse; }
                .modern-table th { text-align: left; padding: 12px; background: #f8fafc; color: #64748b; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }
                .modern-table td { padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.9rem; }
                .mono-font { font-family: monospace; color: #2563eb; font-weight: 600; font-size: 0.8rem; }
                
                .ind-col { display: flex; flex-direction: column; }
                .ind-col strong { font-size: 0.9rem; color: #0f172a; }
                .ind-col span { font-size: 0.75rem; color: #94a3b8; }

                .amt-col { display: flex; flex-direction: column; align-items: flex-start; }
                .penalty-tag { font-size: 0.7rem; color: #dc2626; background: #fef2f2; padding: 1px 4px; border-radius: 4px; font-weight: 700; margin-top: 2px; }

                .status-pill { padding: 4px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
                .status-pill.paid { background: #dcfce7; color: #166534; }
                .status-pill.unpaid { background: #eff6ff; color: #1e40af; }
                .status-pill.overdue { background: #fef2f2; color: #991b1b; }

                .btn-icon { background: none; border: none; color: #94a3b8; cursor: pointer; transition: color 0.2s; }
                .btn-icon:hover { color: #2563eb; }

                /* Right Panel Modules */
                .right-panel { display: flex; flex-direction: column; gap: 20px; }
                
                .calculator-box { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
                .calc-header { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #f1f5f9; }
                .calc-header h3 { margin: 0; font-size: 0.95rem; color: #334155; }
                
                .calc-body { display: flex; flex-direction: column; gap: 12px; }
                .form-group-sm label { display: block; font-size: 0.75rem; font-weight: 700; color: #64748b; margin-bottom: 4px; }
                .form-group-sm input, .form-group-sm select { width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.9rem; }
                .form-checkbox { display: flex; align-items: center; gap: 8px; }
                .form-checkbox label { font-size: 0.8rem; color: #475569; }
                
                .btn-calc { width: 100%; padding: 10px; background: #0f172a; color: white; border: none; border-radius: 8px; font-weight: 600; font-size: 0.9rem; cursor: pointer; margin-top: 5px; }

                .calc-result { background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px dashed #cbd5e1; margin-top: 10px; }
                .res-row { display: flex; justify-content: space-between; font-size: 0.9rem; color: #475569; margin-bottom: 6px; }
                .res-row.penalty { color: #dc2626; }
                .res-row.total { border-top: 1px solid #e2e8f0; padding-top: 8px; margin-top: 8px; margin-bottom: 0; color: #0f172a; font-size: 1rem; }

                .info-card { background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 12px; padding: 20px; }
                .ic-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
                .ic-header h3 { margin: 0; font-size: 0.95rem; color: #581c87; }
                .info-list { margin: 0; padding-left: 20px; color: #6b21a8; font-size: 0.85rem; line-height: 1.5; }
                .info-list li { margin-bottom: 6px; }

                .animated { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default GroundwaterCharges;
