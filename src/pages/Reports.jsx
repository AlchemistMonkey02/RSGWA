import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  FileText, Download, Filter, TrendingUp, PieChart as PieIcon,
  Activity, Calendar, CheckCircle2, XCircle, Clock
} from 'lucide-react';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [daterange, setDaterange] = useState('6m');

  // Mock Data for Charts
  const statusData = [
    { name: 'Approved', value: 45, color: '#10b981' },
    { name: 'Pending', value: 25, color: '#f59e0b' },
    { name: 'Rejected', value: 10, color: '#ef4444' },
    { name: 'Clarification', value: 20, color: '#3b82f6' },
  ];

  const monthlyData = [
    { name: 'Jul', applications: 40, approvals: 24 },
    { name: 'Aug', applications: 30, approvals: 18 },
    { name: 'Sep', applications: 55, approvals: 35 },
    { name: 'Oct', applications: 45, approvals: 28 },
    { name: 'Nov', applications: 60, approvals: 40 },
    { name: 'Dec', applications: 75, approvals: 55 },
  ];

  const generatedFiles = [
    { id: 'RPT-001', name: 'NOC_Status_Report_Dec2024.pdf', type: 'Compliance', date: '2024-12-25', size: '2.4 MB' },
    { id: 'RPT-002', name: 'Revenue_Collection_Q3.xlsx', type: 'Financial', date: '2024-12-20', size: '1.1 MB' },
    { id: 'RPT-003', name: 'Waitlist_Analysis_2024.pdf', type: 'Operational', date: '2024-12-15', size: '3.5 MB' },
  ];

  const StatCard = ({ title, value, sub, icon: Icon, color }) => (
    <div className="stat-card">
      <div className="sc-icon" style={{ background: `${color}20`, color: color }}>
        <Icon size={24} />
      </div>
      <div className="sc-content">
        <h3>{value}</h3>
        <label>{title}</label>
        <span>{sub}</span>
      </div>
    </div>
  );

  return (
    <div className="reports-page">
      <div className="page-header">
        <div className="ph-left">
          <h1>Analytics & Reports</h1>
          <p>Visual insights into application lifecycle and compliance trends.</p>
        </div>
        <div className="ph-actions">
          <div className="date-toggle">
            <button className={daterange === '3m' ? 'active' : ''} onClick={() => setDaterange('3m')}>3M</button>
            <button className={daterange === '6m' ? 'active' : ''} onClick={() => setDaterange('6m')}>6M</button>
            <button className={daterange === '1y' ? 'active' : ''} onClick={() => setDaterange('1y')}>1Y</button>
          </div>
          <button className="btn-primary-v2">
            <Download size={18} /> Export Data
          </button>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="stats-grid">
        <StatCard title="Total Applications" value="1,245" sub="+12% from last month" icon={FileText} color="#3b82f6" />
        <StatCard title="Compliance Rate" value="88.2%" sub="Active monitoring" icon={Activity} color="#10b981" />
        <StatCard title="Avg. Processing Time" value="14 Days" sub="-2 days improvement" icon={Clock} color="#8b5cf6" />
        <StatCard title="Pending Actions" value="42" sub="Requires immediate attention" icon={Filter} color="#f59e0b" />
      </div>

      <div className="layout-grid">
        {/* Visualizations Column */}
        <div className="charts-column">
          <div className="chart-card">
            <div className="card-header">
              <h3><TrendingUp size={18} /> Monthly Application Trends</h3>
            </div>
            <div className="chart-area">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    cursor={{ fill: '#f8fafc' }}
                  />
                  <Legend />
                  <Bar dataKey="applications" name="Received" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="approvals" name="Approved" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-row-split">
            <div className="chart-card">
              <div className="card-header">
                <h3><PieIcon size={18} /> Application Status</h3>
              </div>
              <div className="chart-area-pie">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card report-generator">
              <div className="card-header">
                <h3>Generate Custom Report</h3>
              </div>
              <div className="generator-form">
                <div className="form-group-v2">
                  <label>Report Type</label>
                  <select><option>Comprehensive Compliance</option><option>Financial Summary</option><option>Operational Audit</option></select>
                </div>
                <div className="form-group-v2">
                  <label>Region / District</label>
                  <select><option>All Districts</option><option>Jaipur</option><option>Jodhpur</option></select>
                </div>
                <button className="btn-generate-lg">Generate Report</button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Files Column */}
        <div className="files-column">
          <div className="files-card">
            <div className="card-header">
              <h3>Ready Downloads</h3>
            </div>
            <div className="files-list">
              {generatedFiles.map(file => (
                <div key={file.id} className="file-item">
                  <div className="file-icon">
                    <FileText size={20} />
                  </div>
                  <div className="file-info">
                    <h4>{file.name}</h4>
                    <span>{file.date} • {file.size}</span>
                  </div>
                  <button className="btn-dl"><Download size={16} /></button>
                </div>
              ))}
            </div>
            <div className="card-footer">
              <button className="btn-link">View All Archive</button>
            </div>
          </div>

          <div className="tips-card">
            <h4>Insights</h4>
            <p>Application volume peaking in <strong>December</strong>. Recommend allocating more officers for scrutiny.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
                .reports-page { padding: 30px; background: #f8fafc; min-height: 100vh; font-family: 'Inter', sans-serif; }
                
                .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
                .ph-left h1 { margin: 0; font-size: 1.8rem; color: #1e293b; font-weight: 800; }
                .ph-left p { margin: 5px 0 0; color: #64748b; font-size: 0.95rem; }
                
                .ph-actions { display: flex; gap: 15px; align-items: center; }
                .date-toggle { background: white; border: 1px solid #e2e8f0; padding: 4px; border-radius: 8px; display: flex; }
                .date-toggle button { background: none; border: none; padding: 6px 12px; font-size: 0.8rem; font-weight: 600; color: #64748b; cursor: pointer; border-radius: 6px; transition: all 0.2s; }
                .date-toggle button.active { background: #f1f5f9; color: #0f172a; }
                
                .btn-primary-v2 { background: #0f172a; color: white; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer; }

                .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
                .stat-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); display: flex; align-items: flex-start; gap: 15px; border: 1px solid #f1f5f9; }
                .sc-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .sc-content h3 { margin: 0; font-size: 1.5rem; color: #1e293b; font-weight: 800; }
                .sc-content label { display: block; font-size: 0.85rem; color: #64748b; font-weight: 600; margin-bottom: 4px; }
                .sc-content span { font-size: 0.75rem; color: #10b981; font-weight: 600; } /* Dynamic color based on trend possible */

                .layout-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 25px; }
                .charts-column { display: flex; flex-direction: column; gap: 25px; }
                
                .chart-card { background: white; padding: 25px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; }
                .card-header { margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
                .card-header h3 { margin: 0; font-size: 1rem; color: #1e293b; display: flex; align-items: center; gap: 10px; }
                
                .chart-row-split { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }

                .generator-form { display: flex; flex-direction: column; gap: 15px; }
                .form-group-v2 label { display: block; font-size: 0.8rem; color: #64748b; font-weight: 600; margin-bottom: 6px; }
                .form-group-v2 select { width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; background: #f8fafc; }
                .btn-generate-lg { width: 100%; background: #2563eb; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer; margin-top: 10px; }

                .files-column { display: flex; flex-direction: column; gap: 25px; }
                .files-card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; flex: 1; }
                .files-list { display: flex; flex-direction: column; gap: 15px; margin-top: 10px; }
                .file-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; }
                .file-icon { color: #f59e0b; }
                .file-info { flex: 1; }
                .file-info h4 { margin: 0; font-size: 0.85rem; color: #334155; }
                .file-info span { font-size: 0.75rem; color: #94a3b8; }
                .btn-dl { background: white; border: 1px solid #e2e8f0; padding: 6px; border-radius: 6px; cursor: pointer; color: #64748b; }
                .btn-dl:hover { color: #2563eb; border-color: #2563eb; }

                .card-footer { text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #f1f5f9; }
                .btn-link { background: none; border: none; color: #2563eb; font-weight: 600; font-size: 0.85rem; cursor: pointer; }

                .tips-card { background: #eff6ff; padding: 20px; border-radius: 16px; border: 1px solid #dbeafe; }
                .tips-card h4 { margin: 0 0 8px 0; color: #1e40af; font-size: 0.9rem; }
                .tips-card p { margin: 0; font-size: 0.85rem; color: #1e3a8a; line-height: 1.5; }
            `}</style>
    </div>
  );
};

export default Reports;
