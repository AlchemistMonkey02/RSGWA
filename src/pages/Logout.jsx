import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Logout = ({ onLogout }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate clearing session/token
        const timer = setTimeout(() => {
            onLogout(); // Trigger logout state update in App
            navigate('/login'); // Redirect to login
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate, onLogout]);

    return (
        <div className="logout-container">
            <div className="logout-content">
                <div className="spinner-container">
                    <div className="main-spinner"></div>
                    <LogOut size={24} className="logout-icon" />
                </div>
                <h2>Logging Out...</h2>
                <p>Thank you for using RGWA Portal. Redirecting you to login page.</p>
            </div>

            <style jsx>{`
        .logout-container {
          height: calc(100vh - 100px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f4f7fa;
        }

        .logout-content {
          text-align: center;
          background: white;
          padding: 50px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          max-width: 400px;
        }

        .spinner-container {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .main-spinner {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 4px solid #f0f0f0;
          border-top: 4px solid #007bff;
          border-radius: 50%;
          animation: spin 1.5s linear infinite;
        }

        .logout-icon {
          color: #007bff;
          z-index: 1;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        h2 {
          color: #333;
          margin: 0 0 10px 0;
          font-size: 1.5rem;
        }

        p {
          color: #666;
          margin: 0;
          line-height: 1.6;
        }
      `}</style>
        </div>
    );
};

export default Logout;
