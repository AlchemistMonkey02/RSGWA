import React from 'react';
import { User, Menu, ChevronDown, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ userRole, setUserRole }) => {
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
    navigate('/dashboard');
  };

  return (
    <header className="header">
      <div className="header-content flex items-center justify-between">
        <div className="flex items-center">
          <button className="menu-btn">
            <Menu size={20} />
          </button>
          <div className="welcome-section">
            <span className="welcome-text">Welcome : <strong>{userRole === 'APPLICANT' ? 'User' : userRole.charAt(0).toUpperCase() + userRole.slice(1).toLowerCase()}</strong></span>
            <div className="role-switcher-wrap">
              <select className="role-dropdown" value={userRole} onChange={handleRoleChange}>
                <option value="APPLICANT">Switch to Applicant</option>
                <option value="OFFICER">Switch to Officer</option>
                <option value="ADMIN">Switch to Admin</option>
              </select>
              <ChevronDown size={14} className="dropdown-arrow" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="session-timer-box">
            <Clock size={16} />
            <span className="session-timer">Session Out Time 58 : 28</span>
          </div>
          <div className="user-profile">
            <User size={20} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .header {
          height: 60px;
          background: white;
          padding: 0 25px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.04);
          position: sticky;
          top: 0;
          z-index: 900;
          border-bottom: 1px solid #f1f5f9;
        }
        .header-content {
          height: 100%;
        }
        .menu-btn {
          background: none;
          border: none;
          cursor: pointer;
          margin-right: 15px;
          display: none;
        }
        .welcome-section {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .welcome-text {
          font-size: 0.9rem;
          color: #64748b;
        }
        .welcome-text strong {
          color: #0f172a;
          font-weight: 700;
        }
        .role-switcher-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .role-dropdown {
          appearance: none;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 6px 30px 6px 12px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          outline: none;
          transition: all 0.2s;
        }
        .role-dropdown:hover {
          border-color: #cbd5e1;
          background: #f1f5f9;
        }
        .dropdown-arrow {
          position: absolute;
          right: 10px;
          pointer-events: none;
          color: #64748b;
        }
        .session-timer-box {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #64748b;
          font-size: 0.85rem;
          background: #fdf2f2;
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid #fee2e2;
        }
        .session-timer {
          font-weight: 600;
        }
        .user-profile {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: #eff6ff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3b82f6;
          cursor: pointer;
          border: 1px solid #dbeafe;
          transition: all 0.2s;
        }
        .user-profile:hover {
          background: #dbeafe;
          transform: scale(1.05);
        }
        
        @media (max-width: 768px) {
          .menu-btn { display: block; }
          .session-timer-box { display: none; }
        }
      `}</style>
    </header>
  );
};

export default Header;
