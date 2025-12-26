import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const PortalLayout = ({ children, userRole }) => {
  return (
    <div className="layout">
      <Sidebar userRole={userRole} />
      <div className="main-content">
        <Header />
        <main className="page-content">
          {children}
        </main>
      </div>

      <style jsx>{`
        .layout {
          display: flex;
          min-height: 100vh;
        }
        .main-content {
          margin-left: 280px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .page-content {
          padding: 20px;
          flex: 1;
          overflow-y: auto;
        }
        
        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
          }
          /* Add mobile sidebar toggle logic later */
        }
      `}</style>
    </div>
  );
};

export default PortalLayout;
