import React, { useState } from 'react';
import {
  Users, ShieldCheck, Settings, BarChart3, Database, Bell, Search, Plus, ArrowUpRight, Lock, History, Save, AlertTriangle, FileText
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const adminStats = [
    { label: 'Total Active Users', value: '1,240', icon: <Users size={20} />, color: '#3b82f6' },
    { label: 'Registered Officers', value: '85', icon: <ShieldCheck size={20} />, color: '#10b981' },
    { label: 'Revenue (MTD)', value: '₹4.2 Cr', icon: <BarChart3 size={20} />, color: '#f59e0b' },
    { label: 'Audit Alerts', value: '12', icon: <Bell size={20} />, color: '#dc2626' }
  ];

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Administration Terminal</h1>
          <p>Global Configuration, Policy Management & User Control</p>
        </div>
        <div className="header-actions">
          <button className="btn-outline"><History size={18} /> Audit Logs</button>
          <button className="btn-primary"><Plus size={18} /> Create New User</button>
        </div>
      </header>

      {/* Stats */}
      <div className="stats-grid">
        {adminStats.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-grid">
        {/* User Management */}
        <div className="admin-card">
          <div className="card-header">
            <h3>User Role Management</h3>
            <div className="search-box">
              <Search size={16} />
              <input type="text" placeholder="Search users..." />
            </div>
          </div>
          <div className="user-table">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Region</th>
                  <th>Last Login</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="user-info">
                      <div className="avatar">RS</div>
                      <div>
                        <p className="name">Rajesh Sharma</p>
                        <p className="email">r.sharma@gov.in</p>
                      </div>
                    </div>
                  </td>
                  <td><span className="role-tag officer">Officer</span></td>
                  <td>Jaipur</td>
                  <td>2 hours ago</td>
                  <td><span className="status-dot active"></span> Active</td>
                </tr>
                <tr>
                  <td>
                    <div className="user-info">
                      <div className="avatar">AK</div>
                      <div>
                        <p className="name">Anil Kumar</p>
                        <p className="email">a.kumar@gov.in</p>
                      </div>
                    </div>
                  </td>
                  <td><span className="role-tag operator">Rig Operator</span></td>
                  <td>Jodhpur</td>
                  <td>1 day ago</td>
                  <td><span className="status-dot active"></span> Active</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* System Configuration */}
        <div className="config-panel">
          <div className="admin-card mb-20">
            <div className="card-header">
              <h3><Settings size={18} /> Rule Configuration</h3>
            </div>
            <div className="rule-form">
              <div className="form-group-sm">
                <label>Penalty Rate (Industrial)</label>
                <div className="input-suffix">
                  <input type="number" defaultValue="50" />
                  <span>₹/m³</span>
                </div>
              </div>
              <div className="form-group-sm">
                <label>Overshoot Threshold</label>
                <div className="input-suffix">
                  <input type="number" defaultValue="110" />
                  <span>% of Limit</span>
                </div>
              </div>
              <div className="form-group-sm">
                <label>Meter Accuracy Limit (Class B)</label>
                <div className="input-suffix">
                  <input type="number" defaultValue="2.0" />
                  <span>% Error</span>
                </div>
              </div>
              <button className="btn-save-sm"><Save size={14} /> Update Rules</button>
            </div>
          </div>

          <div className="admin-card">
            <h3>Advanced Settings</h3>
            <div className="config-items">
              <div className="config-item">
                <div className="icon-wrap"><Database size={18} /></div>
                <div className="item-text">
                  <h4>GIS Layers Control</h4>
                  <p>Manage WMS/WFS service endpoints.</p>
                </div>
                <ArrowUpRight size={16} />
              </div>
              <div className="config-item">
                <div className="icon-wrap"><Lock size={18} /></div>
                <div className="item-text">
                  <h4>Security Policies</h4>
                  <p>Manage 2FA & Session timeout rules.</p>
                </div>
                <ArrowUpRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-dashboard { padding: 30px; background: #f8fafc; min-height: 100vh; font-family: 'Inter', sans-serif; }
        .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .dashboard-header h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin: 0; }
        .dashboard-header p { color: #64748b; margin: 5px 0 0; }
        .header-actions { display: flex; gap: 15px; }
        
        .btn-outline, .btn-primary { padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .btn-outline { background: white; border: 1px solid #e2e8f0; color: #475569; }
        .btn-primary { background: #0f172a; color: white; border: none; }

        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: white; padding: 20px; border-radius: 12px; display: flex; align-items: center; gap: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .stat-icon { width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .stat-value { display: block; font-size: 1.5rem; font-weight: 800; color: #1e293b; }
        .stat-label { font-size: 0.85rem; color: #64748b; font-weight: 600; }

        .admin-grid { display: grid; grid-template-columns: 1fr 340px; gap: 25px; }
        .admin-card { background: white; padding: 25px; border-radius: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .card-header h3 { margin: 0; font-size: 1.1rem; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        
        .search-box { display: flex; align-items: center; gap: 8px; background: #f1f5f9; padding: 8px 15px; border-radius: 8px; width: 250px; }
        .search-box input { background: none; border: none; outline: none; width: 100%; font-size: 0.9rem; }

        .user-table table { width: 100%; border-collapse: collapse; }
        .user-table th { text-align: left; padding: 12px; color: #64748b; font-size: 0.75rem; text-transform: uppercase; font-weight: 700; border-bottom: 2px solid #f1f5f9; }
        .user-table td { padding: 15px 12px; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; }
        .user-info { display: flex; align-items: center; gap: 12px; }
        .avatar { width: 40px; height: 40px; background: #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #475569; }
        .name { margin: 0; font-weight: 600; color: #1e293b; }
        .email { margin: 0; font-size: 0.75rem; color: #64748b; }
        
        .role-tag.officer { background: #eff6ff; color: #1e40af; padding: 4px 10px; border-radius: 4px; font-weight: 600; font-size: 0.75rem; }
        .role-tag.operator { background: #f0fdf4; color: #166534; padding: 4px 10px; border-radius: 4px; font-weight: 600; font-size: 0.75rem; }
        .status-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; display: inline-block; margin-right: 6px; }

        .config-panel { display: flex; flex-direction: column; gap: 20px; }
        .mb-20 { margin-bottom: 20px; }
        
        .rule-form { display: flex; flex-direction: column; gap: 15px; }
        .form-group-sm label { display: block; font-size: 0.8rem; font-weight: 600; color: #475569; margin-bottom: 5px; }
        .input-suffix { display: flex; align-items: center; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding-right: 12px; }
        .input-suffix input { border: none; background: transparent; padding: 10px; flex: 1; outline: none; font-weight: 600; }
        .input-suffix span { font-size: 0.8rem; color: #64748b; font-weight: 600; }
        .btn-save-sm { background: #2563eb; color: white; border: none; padding: 10px; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 5px; }

        .config-items { display: flex; flex-direction: column; gap: 12px; }
        .config-item { display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #f1f5f9; border-radius: 10px; cursor: pointer; transition: all 0.2s; }
        .config-item:hover { background: #f8fafc; border-color: #cbd5e1; }
        .icon-wrap { width: 36px; height: 36px; background: #f1f5f9; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #475569; }
        .item-text h4 { margin: 0 0 2px 0; font-size: 0.9rem; color: #1e293b; }
        .item-text p { margin: 0; font-size: 0.75rem; color: #64748b; }

        @media (max-width: 1100px) {
            .admin-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
