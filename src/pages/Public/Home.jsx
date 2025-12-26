import React from 'react';
import {
    ArrowRight,
    Search,
    Calculator,
    FileCheck,
    Droplets,
    ShieldCheck,
    BarChart3,
    Globe,
    Newspaper,
    Calendar,
    ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const services = [
        {
            title: "Apply for NOC",
            description: "Submit applications for Industry, Mining, or Infrastructure abstraction.",
            icon: <FileCheck className="service-icon" />,
            link: "/login",
            color: "#2563eb"
        },
        {
            title: "Eligibility Checker",
            description: "Check if you are eligible for groundwater abstraction in your area.",
            icon: <Search className="service-icon" />,
            link: "/utility",
            color: "#059669"
        },
        {
            title: "Charge Calculator",
            description: "Calculate annual groundwater abstraction and restoration charges.",
            icon: <Calculator className="service-icon" />,
            link: "/utility",
            color: "#d97706"
        },
        {
            title: "Rig Registration",
            description: "Register drilling rigs and apply for drilling permits online.",
            icon: <Droplets className="service-icon" />,
            link: "/login",
            color: "#7c3aed"
        }
    ];

    const newsItems = [
        {
            date: "Oct 24, 2025",
            title: "Revision of Groundwater Abstraction Charges for OE Blocks",
            category: "Notification"
        },
        {
            date: "Oct 20, 2025",
            title: "Last date for Rig Registration extended to Dec 31st",
            category: "Announcement"
        },
        {
            date: "Oct 15, 2025",
            title: "Public Hearing on New Groundwater Policy in Jodhpur District",
            category: "Events"
        }
    ];

    const stats = [
        { label: "Total Applications", value: "12,450+", icon: <BarChart3 size={20} /> },
        { label: "Approved NOCs", value: "8,920+", icon: <ShieldCheck size={20} /> },
        { label: "Registered Rigs", value: "1,500+", icon: <Droplets size={20} /> },
        { label: "Assessment Units", value: "295", icon: <Globe size={20} /> }
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="container">
                    <div className="hero-content">
                        <span className="badge">Official Governance Portal</span>
                        <h1>Sustainable Management of <span>Groundwater Resources</span></h1>
                        <p>
                            The Rajasthan Ground Water Authority (RGWA) is dedicated to ensuring the scientific,
                            transparent, and technology-driven governance of groundwater abstraction across the state.
                        </p>
                        <div className="hero-actions">
                            <button className="btn-primary" onClick={() => navigate('/login')}>
                                Get Started <ArrowRight size={18} />
                            </button>
                            <button className="btn-secondary" onClick={() => navigate('/about')}>
                                Learn More
                            </button>
                        </div>
                    </div>
                    <div className="hero-floating-card">
                        <div className="card-header">
                            <ShieldCheck size={24} color="#2563eb" />
                            <h3>Guided NOC Support</h3>
                        </div>
                        <p>New AI-based compliance system now active for error-free applications.</p>
                        <button className="text-btn">Explore Features <ChevronRight size={16} /></button>
                    </div>
                </div>
            </section>

            {/* Quick Services */}
            <section className="services-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Services</h2>
                        <p>Access key groundwater regulatory services at your fingertips.</p>
                    </div>
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <div key={index} className="service-card" onClick={() => navigate(service.link)}>
                                <div className="service-icon-wrapper" style={{ backgroundColor: `${service.color}15`, color: service.color }}>
                                    {service.icon}
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <div className="card-arrow">
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* News & Stats Section */}
            <section className="news-stats-section">
                <div className="container">
                    <div className="grid-2">
                        {/* Latest News */}
                        <div className="news-card">
                            <div className="card-title">
                                <Newspaper size={20} />
                                <h3>Latest Updates</h3>
                            </div>
                            <div className="news-list">
                                {newsItems.map((news, index) => (
                                    <div key={index} className="news-item">
                                        <div className="news-meta">
                                            <span className="news-date">{news.date}</span>
                                            <span className="news-tag">{news.category}</span>
                                        </div>
                                        <h4>{news.title}</h4>
                                    </div>
                                ))}
                            </div>
                            <button className="view-all-btn">View All Updates <ChevronRight size={16} /></button>
                        </div>

                        {/* Quick Stats */}
                        <div className="stats-container">
                            <h3>System Overview</h3>
                            <p>Real-time data from the RGWA Governance Engine.</p>
                            <div className="stats-grid">
                                {stats.map((stat, index) => (
                                    <div key={index} className="stat-box">
                                        <div className="stat-icon">{stat.icon}</div>
                                        <div className="stat-info">
                                            <span className="stat-value">{stat.value}</span>
                                            <span className="stat-label">{stat.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="promo-banner">
                                <div className="promo-text">
                                    <h4>Check Your Eligibility</h4>
                                    <p>Instantly know if your block is Safe, Critical, or OE.</p>
                                </div>
                                <button className="btn-white" onClick={() => navigate('/utility')}>Check Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Preview Section */}
            <section className="map-preview">
                <div className="container">
                    <div className="map-content">
                        <h2>Groundwater Spatial Intelligence</h2>
                        <p>Access GIS-based block classification maps and aquifer data through our interactive viewer.</p>
                        <ul className="map-features">
                            <li><Droplets size={16} /> Block-wise Stress Levels</li>
                            <li><BarChart3 size={16} /> Water Level Trends</li>
                            <li><ShieldCheck size={16} /> Recharge Potential</li>
                        </ul>
                        <button className="btn-primary">Open Interactive Map</button>
                    </div>
                    <div className="map-visual">
                        <div className="map-placeholder">
                            <Globe size={120} color="#cbd5e1" />
                            <p>GIS Map Preview</p>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .home-page {
          overflow-x: hidden;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* Hero Section */
        .hero {
          position: relative;
          background: url('https://images.unsplash.com/photo-1541844053589-3d6231055543?auto=format&fit=crop&q=80&w=2000') center/cover;
          padding: 8rem 0 10rem;
          color: white;
          overflow: hidden;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to right, rgba(15, 23, 42, 0.95) 30%, rgba(15, 23, 42, 0.4));
        }

        .hero .container {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 4rem;
        }

        .hero-content {
          flex: 1;
          max-width: 650px;
        }

        .badge {
          background: rgba(37, 99, 235, 0.2);
          color: #60a5fa;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid rgba(37, 99, 235, 0.3);
          margin-bottom: 2rem;
          display: inline-block;
        }

        .hero h1 {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .hero h1 span {
          background: linear-gradient(to right, #60a5fa, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero p {
          font-size: 1.25rem;
          color: #94a3b8;
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
        }

        .btn-primary {
          background: #2563eb;
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-primary:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2);
        }

        .btn-secondary {
          background: rgba(255,255,255,0.1);
          color: white;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.2);
        }

        .hero-floating-card {
           background: white;
           padding: 2rem;
           border-radius: 20px;
           width: 320px;
           color: #1e293b;
           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
           animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .card-header h3 {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .hero-floating-card p {
          font-size: 0.95rem;
          color: #64748b;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .text-btn {
          background: none;
          border: none;
          color: #2563eb;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          padding: 0;
        }

        /* Services Section */
        .services-section {
          padding: 6rem 0;
          background: white;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1.1rem;
          color: #64748b;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .service-card {
          padding: 2.5rem;
          background: #f8fafc;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s;
          cursor: pointer;
          position: relative;
        }

        .service-card:hover {
          background: white;
          border-color: #2563eb;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          transform: translateY(-5px);
        }

        .service-icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        :global(.service-icon) {
          width: 32px;
          height: 32px;
        }

        .service-card h3 {
          font-size: 1.35rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
        }

        .service-card p {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .card-arrow {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          color: #cbd5e1;
          transition: transform 0.3s, color 0.3s;
        }

        .service-card:hover .card-arrow {
          transform: translateX(5px);
          color: #2563eb;
        }

        /* News & Stats Section */
        .news-stats-section {
          padding: 6rem 0;
          background: #f1f5f9;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        .news-card {
           background: white;
           padding: 2.5rem;
           border-radius: 20px;
           box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
           display: flex;
           flex-direction: column;
        }

        .card-title {
           display: flex;
           align-items: center;
           gap: 1rem;
           margin-bottom: 2rem;
           color: #2563eb;
        }

        .card-title h3 {
           font-size: 1.5rem;
           font-weight: 700;
           color: #1e293b;
        }

        .news-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          flex: 1;
        }

        .news-item {
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .news-item:last-child {
          border-bottom: none;
        }

        .news-meta {
           display: flex;
           gap: 1rem;
           margin-bottom: 0.5rem;
           font-size: 0.85rem;
        }

        .news-date {
          color: #94a3b8;
        }

        .news-tag {
          background: #e0f2fe;
          color: #0369a1;
          padding: 0.1rem 0.6rem;
          border-radius: 4px;
          font-weight: 600;
        }

        .news-item h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #334155;
          line-height: 1.4;
          cursor: pointer;
          transition: color 0.2s;
        }

        .news-item h4:hover {
          color: #2563eb;
        }

        .view-all-btn {
          margin-top: 2rem;
          background: none;
          border: 1px solid #e2e8f0;
          padding: 0.75rem;
          border-radius: 8px;
          color: #475569;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .stats-container {
          display: flex;
          flex-direction: column;
        }

        .stats-container h3 {
          font-size: 1.8rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .stats-container p {
          color: #64748b;
          margin-bottom: 2.5rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .stat-box {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          background: #f1f5f9;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2563eb;
        }

        .stat-info {
           display: flex;
           flex-direction: column;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1e293b;
        }

        .stat-label {
          font-size: 0.85rem;
          color: #64748b;
        }

        .promo-banner {
          background: linear-gradient(135deg, #1e293b, #0f172a);
          padding: 2rem;
          border-radius: 16px;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }

        .promo-text h4 {
           font-size: 1.25rem;
           font-weight: 700;
           margin-bottom: 0.5rem;
        }

        .promo-text p {
           margin-bottom: 0;
           color: #94a3b8;
           font-size: 0.95rem;
        }

        .btn-white {
          background: white;
          color: #1e293b;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }

        /* Map Preview Section */
        .map-preview {
          padding: 8rem 0;
          background: white;
        }

        .map-preview .container {
          display: flex;
          align-items: center;
          gap: 5rem;
        }

        .map-content {
          flex: 1;
        }

        .map-content h2 {
           font-size: 2.5rem;
           font-weight: 800;
           color: #1e293b;
           margin-bottom: 1.5rem;
        }

        .map-content p {
          font-size: 1.15rem;
          color: #64748b;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .map-features {
          list-style: none;
          padding: 0;
          margin-bottom: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .map-features li {
           display: flex;
           align-items: center;
           gap: 1rem;
           color: #334155;
           font-weight: 600;
        }

        .map-features li :global(svg) {
           color: #2563eb;
        }

        .map-visual {
          flex: 1.2;
        }

        .map-placeholder {
          background: #f8fafc;
          border: 2px dashed #e2e8f0;
          border-radius: 24px;
          aspect-ratio: 16/10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
        }

        .map-placeholder p {
          font-weight: 600;
          color: #94a3b8;
        }

        @media (max-width: 1024px) {
          .hero h1 { font-size: 2.8rem; }
          .grid-2 { grid-template-columns: 1fr; }
          .map-preview .container { flex-direction: column; text-align: center; }
          .map-features { align-items: center; }
        }

        @media (max-width: 768px) {
           .hero { padding: 6rem 0; }
           .hero .container { flex-direction: column; text-align: center; }
           .hero-content { max-width: 100%; }
           .hero-actions { justify-content: center; }
           .hero-floating-card { display: none; }
           .stats-grid { grid-template-columns: 1fr; }
           .promo-banner { flex-direction: column; gap: 1.5rem; text-align: center; }
        }
      `}</style>
        </div>
    );
};

export default Home;
