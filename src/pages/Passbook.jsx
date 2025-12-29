import React, { useState } from 'react';
import {
  BookOpen, Download, Filter, Calendar, Wallet,
  ArrowUpCircle, ArrowDownCircle, History,
  Search, CreditCard, Receipt, MoreHorizontal,
  LayoutDashboard, Globe, LogOut, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Passbook = ({ standalone = true, activeCompany }) => {
  const navigate = useNavigate();
  const [selectedApp, setSelectedApp] = useState(activeCompany?.id || 'RJ-2024-APP-011');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const applications = [
    { code: 'RJ-2024-APP-011', name: 'Jaipur Stones Unit', balance: '20,000' },
    { code: 'RJ-2024-APP-012', name: 'Bhiwadi Factory', balance: '5,000' }
  ];

  const passbookEntries = [
    { date: '10 Nov 2025', particular: 'Penalty (EC Order: #992)', debit: 245000, credit: 0, balance: 265000, status: 'Outstanding' },
    { date: '23 Dec 2025', particular: 'Approval Fee (NOC Renewal)', debit: 15000, credit: 0, balance: 20000, status: 'Pending' },
    { date: '22 Dec 2025', particular: 'Query Response Optimization', debit: 0, credit: 0, balance: 5000, status: 'Completed' },
    { date: '16 Dec 2025', particular: 'Processing Fee Payment', debit: 5000, credit: 0, balance: 5000, status: 'Paid' },
    { date: '15 Dec 2025', particular: 'Initial Application Deposit', debit: 0, credit: 0, balance: 0, status: 'Completed' }
  ];

  const handleLogout = () => {
    if (confirm('Exit Financial Ledger?')) navigate('/dashboard');
  };

  const LedgerContent = () => (
    <div className="ledger-layout">
      {/* Summary Cards */}
      <div className="stats-row animated">
        <div className="stat-card balance">
          <div className="card-lbl">Total Outstanding</div>
          <div className="card-val text-red">₹ {selectedApp === 'RJ-2024-APP-011' ? '2,65,000' : '5,000'}</div>
          <div className="card-footer">Next due: 30 Dec 2025</div>
        </div>
        <div className="stat-card">
          <div className="card-lbl">Total Paid (YTD)</div>
          <div className="card-val text-green">₹ 45,500</div>
          <div className="card-footer">12 Transactions</div>
        </div>
        <div className="stat-card">
          <div className="card-lbl">Refunds / Credits</div>
          <div className="card-val">₹ 0</div>
          <div className="card-footer">No active claims</div>
        </div>
      </div>

      <div className="ledger-card animated">
        <div className="l-header">
          <div className="l-title">
            <BookOpen size={20} />
            <span>Transaction History</span>
          </div>
          <div className="l-controls">
            <select value={selectedApp} onChange={e => setSelectedApp(e.target.value)} className="app-select">
              {applications.map(app => (
                <option key={app.code} value={app.code}>{app.code} - {app.name}</option>
              ))}
            </select>
            <button className="btn-export" onClick={() => alert('Exporting statement for ' + selectedApp)}>
              <Download size={16} /> Export Statement
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="ledger-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction Particulars</th>
                <th>Debit (₹)</th>
                <th>Credit (₹)</th>
                <th>Balance (₹)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {passbookEntries.map((entry, idx) => (
                <tr key={idx}>
                  <td>{entry.date}</td>
                  <td>
                    <div className="particular-cell">
                      {entry.debit > 0 ? <ArrowUpCircle size={16} className="text-red" /> : <ArrowDownCircle size={16} className="text-green" />}
                      <span>{entry.particular}</span>
                    </div>
                  </td>
                  <td className={entry.debit > 0 ? 'text-red font-bold' : ''}>{entry.debit || '-'}</td>
                  <td className={entry.credit > 0 ? 'text-green font-bold' : ''}>{entry.credit || '-'}</td>
                  <td className="font-bold">₹ {entry.balance.toLocaleString()}</td>
                  <td>
                    <span className={`status-tag ${entry.status.toLowerCase()}`}>
                      {entry.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-row"><MoreHorizontal size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
                .ledger-layout { max-width: 1200px; margin: 0 auto; }
                .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
                .stat-card { background: white; padding: 25px; border-radius: 20px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
                .stat-card.balance { background: #0f172a; color: white; border: none; }
                .card-lbl { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #94a3b8; margin-bottom: 10px; }
                .stat-card.balance .card-lbl { color: #3b82f6; }
                .card-val { font-size: 1.8rem; font-weight: 900; margin-bottom: 15px; }
                .card-footer { font-size: 0.8rem; font-weight: 600; opacity: 0.8; }
                .ledger-card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); overflow: hidden; }
                .l-header { padding: 25px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; background: #fcfdfe; }
                .l-title { display: flex; align-items: center; gap: 12px; font-weight: 800; color: #0f172a; font-size: 1.1rem; }
                .l-controls { display: flex; gap: 15px; }
                .app-select { padding: 10px 15px; border-radius: 12px; border: 1.5px solid #e2e8f0; outline: none; font-weight: 700; color: #334155; }
                .btn-export { background: #0f172a; color: white; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; }
                .ledger-table { width: 100%; border-collapse: collapse; min-width: 900px; }
                .ledger-table th { background: #f8fafc; padding: 15px 25px; text-align: left; font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; }
                .ledger-table td { padding: 18px 25px; border-bottom: 1px solid #f8fafc; font-size: 0.9rem; color: #334155; }
                .particular-cell { display: flex; align-items: center; gap: 12px; font-weight: 600; }
                .text-red { color: #ef4444; }
                .text-green { color: #10b981; }
                .font-bold { font-weight: 800; }
                .status-tag { padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
                .status-tag.completed { background: #ecfdf5; color: #059669; }
                .status-tag.paid { background: #eff6ff; color: #2563eb; }
                .status-tag.pending { background: #fff7ed; color: #c2410c; }
                .btn-row { width: 32px; height: 32px; border-radius: 8px; border: none; background: #f1f5f9; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; }
                .animated { animation: slideUp 0.4s ease-out; }
                @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

                /* STANDALONE CANVAS STYLES */
                .sys-canvas { display: flex; height: 100vh; background: #f1f5f9; overflow: hidden; font-family: 'Inter', sans-serif; }
                .sys-sidebar { background: #0f172a; color: white; transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; flex-direction: column; flex-shrink: 0; }
                .sys-sidebar.expanded { width: 260px; }
                .sys-sidebar.collapsed { width: 80px; }
                .sb-header { height: 80px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-bottom: 1px solid #1e293b; }
                .logo-box { width: 40px; height: 40px; background: #10b981; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.2rem; cursor: pointer; }
                .sb-toggle { background: transparent; border: none; color: #94a3b8; cursor: pointer; }
                .spin-180 { transform: rotate(180deg); }
                .sb-nav { padding: 20px 12px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
                .sb-item { display: flex; align-items: center; gap: 12px; padding: 12px; border: none; background: transparent; color: #94a3b8; border-radius: 10px; cursor: pointer; text-align: left; transition: all 0.2s; width: 100%; }
                .sb-item.active { background: #10b981; color: white; }
                .sb-footer { padding: 20px; border-top: 1px solid #1e293b; }
                .user-pill { display: flex; align-items: center; gap: 12px; background: #1e293b; padding: 10px; border-radius: 12px; }
                .avatar { width: 35px; height: 35px; background: #10b981; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; }
                .info { display: flex; flex-direction: column; overflow: hidden; }
                .info strong { font-size: 0.85rem; }
                .info span { font-size: 0.7rem; color: #94a3b8; }
                .sys-surface { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
                .sys-header { height: 80px; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(12px); border-bottom: 1px solid #e2e8f0; padding: 0 30px; display: flex; justify-content: space-between; align-items: center; z-index: 50; flex-shrink: 0; }
                .header-branding { display: flex; align-items: center; gap: 15px; }
                .emblem-img { height: 45px; }
                .branding-txt h2 { margin: 0; font-size: 1.1rem; color: #0f172a; font-weight: 800; }
                .branding-txt p { margin: 0; font-size: 0.7rem; color: #64748b; text-transform: uppercase; font-weight: 800; }
                .header-controls { display: flex; gap: 12px; }
                .help-btn, .logout-btn { width: 40px; height: 40px; border-radius: 8px; border: 1px solid #e2e8f0; background: white; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; }
                .sys-viewport { flex: 1; overflow-y: auto; background: #f8fafc; padding: 30px; }
            `}</style>
    </div>
  );

  if (!standalone) {
    return <LedgerContent />;
  }

  return (
    <div className="sys-canvas">
      <aside className={`sys-sidebar ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
        <div className="sb-header">
          <div className="sb-logo" onClick={() => navigate('/dashboard')}>
            <div className="logo-box">F</div>
            {isSidebarOpen && <span>Financials</span>}
          </div>
          <button className="sb-toggle" onClick={() => setSidebarOpen(!isSidebarOpen)}>
            <ChevronRight size={20} className={isSidebarOpen ? 'spin-180' : ''} />
          </button>
        </div>
        <nav className="sb-nav">
          <button className="sb-item active"><Wallet size={18} /> {isSidebarOpen && "My Ledger"}</button>
          <button className="sb-item"><History size={18} /> {isSidebarOpen && "Transactions"}</button>
          <button className="sb-item"><Receipt size={18} /> {isSidebarOpen && "Invoices"}</button>
        </nav>
        <div className="sb-footer">
          <div className="user-pill">
            <div className="avatar">RS</div>
            {isSidebarOpen && (
              <div className="info">
                <strong>Rajas Stones</strong>
                <span>PAYMENT AUTH #882</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="sys-surface">
        <header className="sys-header">
          <div className="header-branding">
            <img src="/rajasthan_emblem.png" alt="Emblem" className="emblem-img" />
            <div className="branding-txt">
              <h2>RGWA Financial Ledger</h2>
              <p>Digital Passbook & Transaction Vault</p>
            </div>
          </div>
          <div className="header-controls">
            <button className="help-btn"><CreditCard size={18} /></button>
            <button className="logout-btn" onClick={handleLogout}><LogOut size={18} /></button>
          </div>
        </header>

        <div className="sys-viewport">
          <LedgerContent />
        </div>
      </main>
    </div>
  );
};

export default Passbook;
