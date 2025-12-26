import React from 'react';
import { Users, Target, BookOpen, Shield, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';

const AboutUs = () => {
    const sections = [
        {
            id: 'mission',
            title: 'Our Mission',
            content: 'To ensure scientific, transparent, and sustainable management of groundwater resources in Rajasthan through technology-driven governance and public participation.',
            icon: <Target className="section-icon" color="#2563eb" />
        },
        {
            id: 'mandate',
            title: 'Our Mandate',
            content: 'Regulating groundwater abstraction, granting NOCs, monitoring water levels, and implementing recharge measures as per the State Groundwater Acts and Rules.',
            icon: <Shield className="section-icon" color="#059669" />
        }
    ];

    const organization = [
        { role: 'Chairman', name: 'Principal Secretary, PHED' },
        { role: 'Member Secretary', name: 'Chief Engineer, Ground Water Dept' },
        { role: 'Technical Members', name: 'Experts from Central Ground Water Board, Geological Survey of India' }
    ];

    return (
        <div className="about-page">
            {/* Header */}
            <section className="page-header">
                <div className="container">
                    <h1>About <span>RGWA</span></h1>
                    <p>Rajasthan Ground Water Authority: Guarding the State's Vital Water Resources.</p>
                </div>
            </section>

            {/* Content */}
            <section className="main-content">
                <div className="container">
                    <div className="grid-layout">
                        <div className="text-section">
                            <h2>Who We Are</h2>
                            <p>
                                Groundwater is a critical natural resource that supports drinking water supply,
                                agriculture, industrial growth, and infrastructure development. With increasing
                                pressure on groundwater due to urbanization and climate variability, RGWA was established
                                to provide a robust regulatory framework.
                            </p>

                            <div className="mission-mandate">
                                {sections.map(s => (
                                    <div key={s.id} className="info-box">
                                        <div className="icon-bg">{s.icon}</div>
                                        <div>
                                            <h3>{s.title}</h3>
                                            <p>{s.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h2>Organization Structure</h2>
                            <div className="org-list">
                                {organization.map((item, i) => (
                                    <div key={i} className="org-item">
                                        <span className="role">{item.role}</span>
                                        <span className="dot"></span>
                                        <span className="name">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="sidebar-section">
                            <div className="contact-card">
                                <h3>Get In Touch</h3>
                                <div className="contact-items">
                                    <div className="contact-item">
                                        <MapPin size={20} />
                                        <p>Jaipur Tower, MI Road, Jaipur, Rajasthan 302001</p>
                                    </div>
                                    <div className="contact-item">
                                        <Phone size={20} />
                                        <p>0141-236XXXX</p>
                                    </div>
                                    <div className="contact-item">
                                        <Mail size={20} />
                                        <p>info.rgwa@rajasthan.gov.in</p>
                                    </div>
                                </div>
                                <button className="btn-primary">Send Message</button>
                            </div>

                            <div className="links-card">
                                <h3>Related Links</h3>
                                <ul>
                                    <li>Acts & Rules <ChevronRight size={16} /></li>
                                    <li>Notifications <ChevronRight size={16} /></li>
                                    <li>SOPs & Guidelines <ChevronRight size={16} /></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .about-page {
          background: #f8fafc;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .page-header {
          background: #0f172a;
          color: white;
          padding: 5rem 0;
          text-align: center;
        }

        .page-header h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .page-header h1 span {
          color: #3b82f6;
        }

        .page-header p {
          font-size: 1.25rem;
          color: #94a3b8;
        }

        .main-content {
          padding: 5rem 0;
        }

        .grid-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
        }

        .text-section h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
          margin: 2.5rem 0 1.5rem;
        }

        .text-section h2:first-child {
          margin-top: 0;
        }

        .text-section p {
          font-size: 1.1rem;
          color: #475569;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .mission-mandate {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin: 3rem 0;
        }

        .info-box {
          display: flex;
          gap: 1.5rem;
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid #f1f5f9;
        }

        .icon-bg {
          width: 56px;
          height: 56px;
          background: #f8fafc;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-box h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .info-box p {
          margin: 0;
          font-size: 1rem;
        }

        .org-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .org-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          background: white;
          padding: 1.25rem;
          border-radius: 10px;
          border-left: 4px solid #3b82f6;
        }

        .role {
          font-weight: 700;
          color: #1e293b;
          width: 150px;
        }

        .dot {
          width: 6px;
          height: 6px;
          background: #cbd5e1;
          border-radius: 50%;
        }

        .name {
          color: #475569;
        }

        .contact-card, .links-card {
           background: white;
           padding: 2rem;
           border-radius: 20px;
           box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
           margin-bottom: 2rem;
        }

        .contact-card h3, .links-card h3 {
           font-size: 1.25rem;
           font-weight: 700;
           margin-bottom: 1.5rem;
           color: #1e293b;
        }

        .contact-items {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .contact-item {
          display: flex;
          gap: 1rem;
          color: #475569;
        }

        .contact-item p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .btn-primary {
          width: 100%;
          background: #3b82f6;
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .links-card ul {
          list-style: none;
          padding: 0;
        }

        .links-card li {
          padding: 0.75rem 0;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #475569;
          cursor: pointer;
          transition: color 0.2s;
        }

        .links-card li:hover {
          color: #3b82f6;
        }

        @media (max-width: 768px) {
          .grid-layout { grid-template-columns: 1fr; }
          .page-header h1 { font-size: 2.2rem; }
        }
      `}</style>
        </div>
    );
};

export default AboutUs;
