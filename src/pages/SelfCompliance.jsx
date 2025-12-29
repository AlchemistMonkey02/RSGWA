import React, { useState } from 'react';
import {
  Search, Upload, Send, FileText, Calendar, Download, Eye,
  CheckCircle, AlertCircle, Clock, Droplets, ArrowRight,
  Filter, ShieldCheck, Activity,
  LayoutDashboard, FileCheck, Globe, LogOut, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SelfCompliance = ({ standalone = true }) => {
  const navigate = useNavigate();
  const [selectedApplication, setSelectedApplication] = useState('RJ-2024-APP-011');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [complianceData, setComplianceData] = useState({
    month: 'December',
    year: '2025',
    extraction: '32.5',
    piezometer: '12.4',
    remarks: ''
  });

  const [approvedApplications] = useState([
    { id: 'RJ-2024-APP-011', name: 'Jaipur Unit - 1', quantum: 38.5, location: 'Jaipur' },
    { id: 'RJ-2024-APP-012', name: 'Bhiwadi Ext.', quantum: 55.0, location: 'Alwar' }
  ]);

  const [complianceHistory, setComplianceHistory] = useState([
    { id: 1, month: 'November', year: '2025', extraction: 35.2, status: 'Submitted', date: '05 Dec 2025' },
    { id: 2, month: 'October', year: '2025', extraction: 37.8, status: 'Verified', date: '03 Nov 2025' },
    { id: 3, month: 'September', year: '2025', extraction: 36.5, status: 'Verified', date: '02 Oct 2025' }
  ]);

  const selectedApp = approvedApplications.find(app => app.id === selectedApplication) || approvedApplications[0];

  const averageCompliance = React.useMemo(() => {
    if (complianceHistory.length === 0) return 100;
    const totalQuantum = selectedApp.quantum * complianceHistory.length;
    const totalExtraction = complianceHistory.reduce((sum, item) => sum + item.extraction, 0);
    return Math.min(100, Math.round((1 - (totalExtraction / totalQuantum)) * 100 + 90));
  }, [complianceHistory, selectedApp]);

  const currentUsage = complianceHistory[0]?.extraction || 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplianceData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!complianceData.extraction || !complianceData.piezometer) {
      alert('Please fill in all required fields');
      return;
    }

    const newReport = {
      id: Date.now(),
      month: complianceData.month,
      year: complianceData.year,
      extraction: parseFloat(complianceData.extraction),
      status: 'Submitted',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    setComplianceHistory([newReport, ...complianceHistory]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setComplianceData(prev => ({ ...prev, remarks: '', extraction: '', piezometer: '' }));
    setSelectedFile(null);
  };

  const handleLogout = () => {
    if (confirm('Logout of Compliance Vault?')) navigate('/');
  };

  const DashboardContent = () => (
    <div className="compliance-layout">
      {showSuccess && (
        <div className="success-toast animated">
          <CheckCircle size={18} />
          <span>Report submitted successfully!</span>
        </div>
      )}

      <div className="stats-row animated">
        <div className="stat-card">
          <ShieldCheck size={24} className="text-green" />
          <div>
            <strong>{averageCompliance}%</strong>
            <span>Average Compliance</span>
          </div>
        </div>
        <div className="stat-card">
          <Droplets size={24} className="text-blue" />
          <div>
            <strong>{currentUsage} KLD</strong>
            <span>Last Reported Usage</span>
          </div>
        </div>
        <div className="stat-card">
          <AlertCircle size={24} className="text-yellow" />
          <div>
            <strong>15 Days</strong>
            <span>Audit Deadline</span>
          </div>
        </div>
      </div>

      <div className="main-grid">
        <div className="entry-card animated">
          <div className="p-header">Compliance Data Entry</div>
          <form className="p-body" onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label>Select Approved NOC</label>
              <select
                value={selectedApplication}
                onChange={e => setSelectedApplication(e.target.value)}
                className="custom-select"
              >
                {approvedApplications.map(app => (
                  <option key={app.id} value={app.id}>{app.id} - {app.name}</option>
                ))}
              </select>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label>Compliance Month</label>
                <select name="month" value={complianceData.month} onChange={handleInputChange} className="form-control">
                  <option>December</option><option>November</option><option>October</option>
                </select>
              </div>
              <div className="form-group">
                <label>Extraction Volume (KLD)</label>
                <div className="input-with-unit">
                  <input type="number" name="extraction" value={complianceData.extraction} onChange={handleInputChange} placeholder="0.0" step="0.1" />
                  <span>KLD</span>
                </div>
              </div>
              <div className="form-group">
                <label>Piezometer Reading (m)</label>
                <input type="number" name="piezometer" value={complianceData.piezometer} onChange={handleInputChange} placeholder="0.0" step="0.1" />
              </div>
              <div className="form-group">
                <label>Approved Limit</label>
                <input type="text" value={`${selectedApp.quantum} KLD`} disabled className="bg-light" />
              </div>
            </div>

            <div
              className={`upload-zone ${dragActive ? 'active' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files[0]) setSelectedFile(e.dataTransfer.files[0]); }}
            >
              <Upload size={24} />
              {selectedFile ? (
                <div className="file-info">
                  <p><strong>{selectedFile.name}</strong></p>
                  <span>{(selectedFile.size / 1024).toFixed(1)} KB</span>
                </div>
              ) : (
                <>
                  <p>Drag & drop meter verification certificate</p>
                  <span>PDF only, max 5MB</span>
                </>
              )}
              <input type="file" id="file-upload" hidden accept=".pdf" onChange={handleFileChange} />
              <button type="button" className="btn-outline-sm" onClick={() => document.getElementById('file-upload').click()}>
                {selectedFile ? 'Change File' : 'Browse Files'}
              </button>
            </div>

            <button type="submit" className="btn-primary w-full mt-4">
              <Send size={18} /> Submit Compliance Report
            </button>
          </form>
        </div>

        <div className="history-card animated">
          <div className="p-header">Audit Trail & History</div>
          <div className="history-list">
            {complianceHistory.map((item) => (
              <div key={item.id} className="history-item">
                <div className="item-main">
                  <div className="item-meta">
                    <strong>{item.month} {item.year}</strong>
                    <span>{item.date}</span>
                  </div>
                  <div className={`status-pill ${item.status.toLowerCase()}`}>
                    {item.status}
                  </div>
                </div>
                <div className="item-footer">
                  <span>Extraction: {item.extraction} KLD</span>
                  <div className="item-actions">
                    <button className="btn-icon"><Eye size={14} /></button>
                    <button className="btn-icon"><Download size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-secondary w-full">View Full Archive</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={standalone ? "sys-canvas" : "hub-integrated-content"}>
      {standalone ? (
        <>
          <aside className={`sys-sidebar ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
            <div className="sb-header">
              <div className="sb-logo" onClick={() => navigate('/dashboard')}>
                <div className="logo-box">C</div>
                {isSidebarOpen && <span>Compliance</span>}
              </div>
              <button className="sb-toggle" onClick={() => setSidebarOpen(!isSidebarOpen)}>
                <ChevronRight size={20} className={isSidebarOpen ? 'spin-180' : ''} />
              </button>
            </div>
            <nav className="sb-nav">
              <button className="sb-item active"><FileCheck size={18} /> {isSidebarOpen && "Report Portal"}</button>
              <button className="sb-item"><Clock size={18} /> {isSidebarOpen && "Audit History"}</button>
              <button className="sb-item"><Globe size={18} /> {isSidebarOpen && "Guidelines"}</button>
            </nav>
            <div className="sb-footer">
              <div className="user-pill">
                <div className="avatar">RS</div>
                {isSidebarOpen && (
                  <div className="info">
                    <strong>Rajas Stones</strong>
                    <span>COMPLIANCE OFFICER</span>
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
                  <h2>RGWA Compliance Vault</h2>
                  <p>Monthly Self-Reporting & Audit Logs</p>
                </div>
              </div>
              <div className="header-controls">
                <button className="help-btn"><Activity size={18} /></button>
                <button className="logout-btn" onClick={handleLogout}><LogOut size={18} /></button>
              </div>
            </header>

            <div className="sys-viewport">
              <DashboardContent />
            </div>
          </main>
        </>
      ) : (
        <DashboardContent />
      )}

      <style jsx>{`
        .sys-canvas { display: flex; height: 100vh; background: #f1f5f9; overflow: hidden; font-family: 'Inter', sans-serif; }
        .sys-sidebar { background: #0f172a; color: white; transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; flex-direction: column; flex-shrink: 0; }
        .sys-sidebar.expanded { width: 260px; }
        .sys-sidebar.collapsed { width: 80px; }
        .sb-header { height: 80px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-bottom: 1px solid #1e293b; }
        .logo-box { width: 40px; height: 40px; background: #f59e0b; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.2rem; cursor: pointer; }
        .sb-toggle { background: transparent; border: none; color: #94a3b8; cursor: pointer; }
        .spin-180 { transform: rotate(180deg); }
        .sb-nav { padding: 20px 12px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .sb-item { display: flex; align-items: center; gap: 12px; padding: 12px; border: none; background: transparent; color: #94a3b8; border-radius: 10px; cursor: pointer; text-align: left; transition: all 0.2s; width: 100%; }
        .sb-item:hover { background: #1e293b; color: white; }
        .sb-item.active { background: #2563eb; color: white; }
        .sb-footer { padding: 20px; border-top: 1px solid #1e293b; }
        .user-pill { display: flex; align-items: center; gap: 12px; background: #1e293b; padding: 10px; border-radius: 12px; }
        .avatar { width: 35px; height: 35px; background: #3b82f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; }
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

        .compliance-layout { max-width: 1200px; margin: 0 auto; }
        .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: white; padding: 20px; border-radius: 16px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .stat-card strong { display: block; font-size: 1.4rem; color: #0f172a; font-weight: 800; }
        .stat-card span { font-size: 0.8rem; color: #64748b; font-weight: 600; }
        .text-green { color: #10b981; }
        .text-blue { color: #2563eb; }
        .text-yellow { color: #f59e0b; }

        .main-grid { display: grid; grid-template-columns: 1fr 340px; gap: 25px; }
        .entry-card, .history-card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .p-header { background: #f8fafc; padding: 15px 25px; border-bottom: 1px solid #e2e8f0; font-weight: 800; color: #1e293b; font-size: 0.9rem; text-transform: uppercase; }
        .p-body { padding: 25px; }

        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .form-group label { display: block; font-size: 0.8rem; font-weight: 700; color: #475569; margin-bottom: 8px; text-transform: uppercase; }
        .form-control, .custom-select { width: 100%; padding: 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 0.95rem; outline: none; background: white; }
        .bg-light { background: #f1f5f9; cursor: not-allowed; }
        .input-with-unit { position: relative; }
        .input-with-unit input { width: 100%; padding: 12px 60px 12px 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; }
        .input-with-unit span { position: absolute; right: 15px; top: 12px; font-weight: 800; color: #94a3b8; font-size: 0.85rem; }

        .upload-zone { border: 2px dashed #e2e8f0; border-radius: 16px; padding: 30px; text-align: center; color: #64748b; margin: 25px 0; background: #f8fafc; transition: all 0.2s; }
        .upload-zone.active { border-color: #2563eb; background: #eff6ff; }
        .upload-zone p { margin: 10px 0 5px; font-weight: 700; color: #1e293b; }
        .upload-zone span { font-size: 0.75rem; display: block; margin-bottom: 15px; }
        .btn-outline-sm { padding: 6px 15px; background: white; border: 1.5px solid #cbd5e1; border-radius: 8px; font-weight: 800; font-size: 0.75rem; cursor: pointer; }

        .btn-primary { background: #2563eb; color: white; border: none; padding: 14px; border-radius: 12px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer; }
        .btn-secondary { background: #f1f5f9; color: #475569; border: none; padding: 12px; border-radius: 12px; font-weight: 700; cursor: pointer; margin-top: 15px; }
        .btn-icon { width: 32px; height: 32px; border-radius: 8px; border: none; background: #f1f5f9; color: #475569; display: flex; align-items: center; justify-content: center; cursor: pointer; }

        .history-list { display: flex; flex-direction: column; }
        .history-item { padding: 20px; border-bottom: 1px solid #f1f5f9; }
        .item-main { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
        .item-meta strong { display: block; font-size: 0.95rem; color: #0f172a; }
        .item-meta span { font-size: 0.75rem; color: #94a3b8; font-weight: 600; }
        .status-pill { padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
        .status-pill.submitted { background: #eff6ff; color: #2563eb; }
        .status-pill.verified { background: #ecfdf5; color: #059669; }
        .item-footer { display: flex; justify-content: space-between; align-items: center; }
        .item-footer span { font-size: 0.8rem; font-weight: 700; color: #64748b; }
        .item-actions { display: flex; gap: 8px; }

        .success-toast { position: fixed; top: 100px; right: 30px; background: #059669; color: white; padding: 12px 24px; border-radius: 12px; display: flex; align-items: center; gap: 12px; font-weight: 700; z-index: 1000; }
        .file-info { margin-bottom: 10px; }
        .file-info p { margin: 0; color: #1e293b; font-weight: 800; }
        .file-info span { font-size: 0.75rem; color: #64748b; }
        .animated { animation: slideUp 0.4s ease-out; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .w-full { width: 100%; }
        .mt-4 { margin-top: 1rem; }
        .mb-4 { margin-bottom: 1rem; }
      `}</style>
    </div>
  );
};

export default SelfCompliance;
