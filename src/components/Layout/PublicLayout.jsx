import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';

const PublicLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Groundwater Info', path: '/groundwater-info' },
    { name: 'Services', path: '/services' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Help & Support', path: '/help' },
  ];

  return (
    <div className="public-layout">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="contact-info">
            <span><Phone size={14} /> +91 141 1234567</span>
            <span><Mail size={14} /> support.rgwa@rajasthan.gov.in</span>
          </div>
          <div className="top-links">
            <Link to="/news">Latest News</Link>
            <Link to="/tenders">Tenders</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="public-header">
        <div className="container">
          <div className="logo-section" onClick={() => navigate('/')}>
            <div className="logo-icon">RGWA</div>
            <div className="logo-text">
              <h1>RAJASTHAN GROUND WATER AUTHORITY</h1>
              <p>Government of Rajasthan</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="nav-link">
                {link.name}
              </Link>
            ))}
            <button className="login-btn" onClick={() => navigate('/login')}>
              <LogIn size={18} />
              <span>Login / Register</span>
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav className="mobile-nav">
          <div className="container">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button className="mobile-login-btn" onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>
              <LogIn size={18} />
              <span>Login / Register</span>
            </button>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="public-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="public-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>RGWA</h3>
              <p>Ensuring sustainable groundwater management for a resilient Rajasthan.</p>
              <div className="social-links">
                {/* Icons placeholder */}
              </div>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/services">Our Services</Link></li>
                <li><Link to="/downloads">Downloads</Link></li>
                <li><Link to="/help">Help Desk</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact Us</h4>
              <p><MapPin size={16} /> 702-703, Jaipur Tower, Jaipur, Rajasthan</p>
              <p><Phone size={16} /> 0141-236XXXX</p>
              <p><Mail size={16} /> info.rgwa@rajasthan.gov.in</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Rajasthan Ground Water Authority. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .public-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
          background-color: #f8fafc;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .top-bar {
          background-color: #0f172a;
          color: white;
          padding: 0.5rem 0;
          font-size: 0.8rem;
        }

        .contact-info {
          display: flex;
          gap: 1.5rem;
        }

        .contact-info span {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .top-links {
          display: flex;
          gap: 1rem;
        }

        .top-links a {
          color: #94a3b8;
          text-decoration: none;
        }

        .top-links a:hover {
          color: white;
        }

        .public-header {
          background: white;
          padding: 1rem 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
        }

        .logo-icon {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          font-weight: 800;
          font-size: 1.2rem;
        }

        .logo-text h1 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .logo-text p {
          font-size: 0.8rem;
          color: #64748b;
          margin: 0;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .nav-link {
          text-decoration: none;
          color: #475569;
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: #2563eb;
        }

        .login-btn {
          background: #2563eb;
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 6px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .login-btn:hover {
          background: #1d4ed8;
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #1e293b;
        }

        .mobile-nav {
          background: white;
          border-top: 1px solid #f1f5f9;
          padding: 1rem 0;
          display: flex;
          flex-direction: column;
        }

        .mobile-nav .container {
          flex-direction: column;
          align-items: stretch;
          gap: 1rem;
        }

        .mobile-nav-link {
          text-decoration: none;
          color: #475569;
          font-weight: 500;
          padding: 0.5rem 0;
        }

        .mobile-login-btn {
          background: #2563eb;
          color: white;
          border: none;
          padding: 0.75rem;
          border-radius: 6px;
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
        }

        .public-content {
          flex: 1;
        }

        .public-footer {
          background: #0f172a;
          color: #f8fafc;
          padding: 4rem 0 2rem;
          margin-top: 4rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-section h3, .footer-section h4 {
          color: white;
          margin-bottom: 1.5rem;
        }

        .footer-section p {
          color: #94a3b8;
          line-height: 1.6;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
        }

        .footer-section ul li {
          margin-bottom: 0.75rem;
        }

        .footer-section ul li a {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-section ul li a:hover {
          color: #2563eb;
        }

        .footer-bottom {
          border-top: 1px solid #1e293b;
          padding-top: 2rem;
          text-align: center;
          color: #64748b;
          font-size: 0.9rem;
        }

        @media (max-width: 1024px) {
          .desktop-nav {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
        }

        @media (max-width: 640px) {
          .top-bar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default PublicLayout;
