import React from 'react';
import { User, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content flex items-center justify-between">
        <div className="flex items-center">
          <button className="menu-btn">
            <Menu size={20} />
          </button>
          <span className="welcome-text">Welcome : <strong>User</strong></span>
        </div>

        <div className="flex items-center gap-4">
          <span className="session-timer">Session Out Time 58 : 28</span>
          <div className="user-profile">
            <User size={20} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .header {
          height: 60px;
          background: white;
          padding: 0 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 900;
        }
        .header-content {
          height: 100%;
        }
        .menu-btn {
          background: none;
          border: none;
          cursor: pointer;
          margin-right: 15px;
          display: none; /* Hidden on desktop if sidebar is fixed */
        }
        .welcome-text {
          font-size: 0.95rem;
          color: #333;
        }
        .session-timer {
          font-size: 0.9rem;
          color: #666;
        }
        .user-profile {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: #eee;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          cursor: pointer;
        }
      `}</style>
    </header>
  );
};

export default Header;
