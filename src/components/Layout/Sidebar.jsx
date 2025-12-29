import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  FilePlus,
  CheckSquare,
  RefreshCw,
  HelpCircle,
  LogOut,
  FileText,
  CreditCard,
  BarChart2,
  Wrench,
  AlertCircle,
  BookOpen,
  ClipboardCheck,
  Activity,
  Users,
  ShieldAlert,
  Package
} from 'lucide-react';

const Sidebar = ({ userRole }) => {
  const applicantItems = [
    { label: 'Authority Hub', icon: <LayoutDashboard size={18} />, path: '/dashboard' },
  ];

  const vendorItems = [
    { label: 'Vendor Overview', icon: <LayoutDashboard size={18} />, path: '/dashboard' },
    { label: 'Meter Models (MDL)', icon: <BookOpen size={18} />, path: '/meter-models' },
    { label: 'Inventory (SN)', icon: <ClipboardCheck size={18} />, path: '/meter-inventory' },
    { label: 'Installer Network', icon: <Users size={18} />, path: '/installer-network' },
    { label: 'Installation Desk', icon: <Wrench size={18} />, path: '/meter-installation' },
    { label: 'Service Reports', icon: <BarChart2 size={18} />, path: '/reports' },
  ];

  const officerItems = [
    { label: 'Officer Console', icon: <LayoutDashboard size={18} />, path: '/dashboard' },
    { label: 'Compliance Monitor', icon: <ShieldAlert size={18} />, path: '/compliance-monitor' },
    { label: 'Vendor Registry', icon: <Package size={18} />, path: '/vendor-registry' },
    { label: 'Meter Verification', icon: <ClipboardCheck size={18} />, path: '/meter-verification' },
    { label: 'Lifecycle Monitor', icon: <Activity size={18} />, path: '/meter-lifecycle' },
    { label: 'Scrutiny Queries', icon: <HelpCircle size={18} />, path: '/query' },
  ];

  const commonFooter = [
    { label: 'Issue Reporting', icon: <AlertCircle size={18} />, path: '/issues' },
    { label: 'Settings & Security', icon: <Settings size={18} />, path: '/settings' },
    { label: 'Help Center', icon: <HelpCircle size={18} />, path: '/help' },
    { label: 'Log Out', icon: <LogOut size={18} />, path: '/logout' },
  ];

  let menuItems = [];
  if (userRole === 'APPLICANT') menuItems = [...applicantItems];
  else if (userRole === 'VENDOR') menuItems = [...vendorItems];
  else if (userRole === 'OFFICER') menuItems = [...officerItems];
  else menuItems = [{ label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/dashboard' }];

  // Append footer to all roles
  menuItems = [...menuItems, { type: 'divider' }, ...commonFooter];

  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="logo-text">
          <h2 style={{ color: '#007bff', fontSize: '1.2rem', lineHeight: '1.4' }}>RAJASTHAN GROUND WATER AUTHORITY</h2>
          <h3 style={{ color: '#28a745', fontSize: '0.9rem', marginTop: '5px' }}>RGWA Portal</h3>
        </div>
      </div>

      <nav className="nav-menu">
        {menuItems.map((item, index) => (
          item.type === 'divider' ? (
            <div key={`div-${index}`} className="sidebar-divider" />
          ) : (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          )
        ))}
      </nav>

      <style jsx>{`
        .sidebar {
          width: 280px;
          background: white;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          box-shadow: 2px 0 5px rgba(0,0,0,0.05);
          overflow-y: auto;
          z-index: 1000;
        }
        .logo-container {
          padding: 20px;
          border-bottom: 1px solid #eee;
          text-align: center;
        }
        .nav-menu {
          padding: 10px 0;
        }
        .nav-item {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          color: #555;
          text-decoration: none;
          transition: background 0.2s;
          font-size: 0.9rem;
        }
        .nav-item:hover {
          background: #f8f9fa;
          color: #007bff;
        }
        .nav-item.active {
          background: #e3f2fd;
          color: #007bff;
          border-left: 4px solid #007bff;
        }
        .nav-icon {
          margin-right: 12px;
          display: flex;
        }
        .sidebar-divider {
          height: 1px;
          background: #eee;
          margin: 15px 20px;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
