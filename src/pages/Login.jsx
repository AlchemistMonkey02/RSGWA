import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Lock, Eye, EyeOff } from 'lucide-react';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [role, setRole] = useState('APPLICANT');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin(role); // Pass selected role to App
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-circle">
            <span className="logo-icon">RGWA</span>
          </div>
          <h2>Rajasthan Ground Water Authority</h2>
          <p>Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email / User ID</label>
            <div className="input-with-icon">
              <User size={18} className="field-icon" />
              <input
                type="text"
                placeholder="Enter your email or user ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="field-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>User Role</label>
            <select
              className="role-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="APPLICANT">Applicant / General Public</option>
              <option value="OFFICER">Evaluation Officer</option>
              <option value="ADMIN">System Administrator</option>
              <option value="VENDOR">Water Meter Vendor</option>
              <option value="RIG_OPERATOR">Rig Operator / Owner</option>
            </select>
          </div>

          <div className="form-footer">
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className={`login-button ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              <>
                <LogIn size={20} />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="login-help">
          <p>Don't have an account? <a href="#">Register Now</a></p>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f3c5f 0%, #17a2b8 100%);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 2000;
        }

        .login-card {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .login-header {
          margin-bottom: 30px;
        }

        .logo-circle {
          width: 80px;
          height: 80px;
          background: #007bff;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-weight: bold;
          font-size: 1.2rem;
          box-shadow: 0 4px 10px rgba(0,123,255,0.3);
        }

        .login-header h2 {
          font-size: 1.4rem;
          color: #333;
          margin: 0 0 10px 0;
          font-weight: 700;
        }

        .login-header p {
          color: #666;
          font-size: 0.95rem;
          margin: 0;
        }

        .login-form {
          text-align: left;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: #444;
          margin-bottom: 8px;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field-icon {
          position: absolute;
          left: 12px;
          color: #999;
        }

        .input-with-icon input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 0.95rem;
          transition: border-color 0.2s;
        }

        .input-with-icon input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
        }

        .toggle-password {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #999;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0;
        }

        .toggle-password:hover {
          color: #666;
        }

        .form-footer {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 25px;
        }

        .forgot-password {
          font-size: 0.85rem;
          color: #007bff;
          text-decoration: none;
          font-weight: 500;
        }

        .forgot-password:hover {
          text-decoration: underline;
        }

        .login-button {
          width: 100%;
          padding: 14px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .login-button:hover {
          background: #0056b3;
        }

        .login-button.loading {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .login-help {
          margin-top: 30px;
          font-size: 0.9rem;
          color: #666;
        }

        .login-help a {
          color: #007bff;
          text-decoration: none;
          font-weight: 600;
        }

        .role-select {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 0.95rem;
          background-color: white;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
        }

        .role-select:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
        }
      `}</style>
    </div>
  );
};

export default Login;
