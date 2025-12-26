import React from 'react';
import {
  FileText,
  Building2,
  MessageSquare,
  Droplets,
  CheckCircle2,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PublicServices = () => {
  const navigate = useNavigate();

  const onlineServices = [
    {
      title: 'ISSUANCE OF NOC & REGISTRATION FOR WELL',
      icon: <FileText size={60} />,
      links: [
        { text: 'Login for Existing Users', path: '/login' },
        { text: 'Create New User', path: '/login' },
        { text: 'Instructions', path: '/downloads' }
      ]
    },
    {
      title: 'REGISTRATION OF DRILLING AGENCY',
      icon: <Building2 size={60} />,
      links: [
        { text: 'Login for Existing Users', path: '/login' },
        { text: 'Create New User', path: '/login' },
        { text: 'List of Registered Drilling Agencies', path: '/downloads' },
        { text: 'Instructions', path: '/downloads' }
      ]
    },
    {
      title: 'LODGE GRIEVANCE',
      icon: <MessageSquare size={60} />,
      links: [
        { text: 'Lodge New Grievance', path: '/login' },
        { text: 'Track Status of Lodged Grievance', path: '/login' },
        { text: 'Reply to Query Raised by Department', path: '/login' },
        { text: 'Submit Feedback on Redressed Grievances', path: '/login' },
        { text: 'Instructions', path: '/downloads' }
      ]
    },
    {
      title: 'RAIN WATER HARVESTING',
      icon: <Droplets size={60} />,
      links: [
        { text: 'Rain Water Harvesting Calculator', path: '/utility' },
        { text: 'Ground Water Map', path: '/maps-data' },
        { text: 'Technical Designs', path: '/downloads' }
      ]
    }
  ];

  const activities = [
    { id: 1, title: 'Aquifer Mapping', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600' },
    { id: 2, title: 'Aquifer Rejuvenation', img: 'https://images.unsplash.com/photo-1434725039720-abb26e22ebe5?auto=format&fit=crop&q=80&w=600' },
    { id: 3, title: 'Exploratory Drilling', img: 'https://images.unsplash.com/photo-1541913057815-9984b24275ee?auto=format&fit=crop&q=80&w=600' },
    { id: 4, title: 'Geophysical Exploration', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600' },
    { id: 5, title: 'Ground Water Quality', img: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=600' },
    { id: 6, title: 'Ground Water Resource Assessment', img: 'https://images.unsplash.com/photo-1473081556163-2a17de41fc97?auto=format&fit=crop&q=80&w=600' },
    { id: 7, title: 'PMKSY-HKKP-Ground Water', img: 'https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?auto=format&fit=crop&q=80&w=600' },
    { id: 8, title: 'Ground Water Regulation', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600' },
    { id: 9, title: 'Ground Water Level Monitoring', img: 'https://images.unsplash.com/photo-1508817637318-77114b09ec2a?auto=format&fit=crop&q=80&w=600' },
    { id: 10, title: 'Ground Water Modeling', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600' },
    { id: 11, title: 'Technical Assistance', img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=600' },
    { id: 12, title: 'Training and Capacity Building', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600' },
    { id: 13, title: 'Research and Innovation', img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600' },
    { id: 14, title: 'Technical Collaborations', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600' },
    { id: 15, title: 'Outreach Activities', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600' },
    { id: 16, title: 'Participatory Ground Water Management', img: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=600' }
  ];

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container">
          <h1>Services & Activities</h1>
          <p>Transparent and efficient groundwater governance for the state of Rajasthan.</p>
        </div>
      </section>

      <section className="online-services">
        <div className="container">
          <div className="section-banner">
            <h2>ONLINE SERVICES OF DEPARTMENT</h2>
          </div>

          <div className="services-grid-wrapper">
            <div className="services-grid">
              {onlineServices.map((service, i) => (
                <div key={i} className="service-card">
                  <div className="card-header">
                    <h3>{service.title}</h3>
                  </div>
                  <div className="card-content">
                    <div className="service-links-container">
                      <ul className="service-links">
                        {service.links.map((link, j) => (
                          <li key={j} onClick={() => navigate(link.path)}>
                            <CheckCircle2 size={16} className="check-icon" />
                            {link.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="card-icon-container">
                      {service.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="activities-section">
        <div className="container">
          <h2 className="activities-title">Activities</h2>
          <div className="activities-grid">
            {activities.map((activity) => (
              <div key={activity.id} className="activity-card">
                <div className="activity-img-wrapper">
                  <img
                    src={activity.img}
                    alt={activity.title}
                    className="activity-img"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600';
                    }}
                  />
                  <div className="activity-number">{activity.id}</div>
                  <div className="activity-label-bar">
                    {activity.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="side-grievance-tab" onClick={() => navigate('/login')}>
        <span>Lodge a Grievance</span>
      </div>

      <style jsx>{`
                .services-page {
                    background: #f9f9f9;
                    padding-bottom: 5rem;
                    min-height: 100vh;
                }

                .container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }

                .services-hero {
                    background: linear-gradient(rgba(15, 60, 95, 0.9), rgba(15, 60, 95, 0.9)), 
                                url('https://images.unsplash.com/photo-1473081556163-2a17de41fc97?auto=format&fit=crop&q=80&w=1600');
                    background-size: cover;
                    background-position: center;
                    color: white;
                    padding: 50px 0;
                    text-align: center;
                    margin-bottom: 30px;
                }

                .services-hero h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 10px; }
                .services-hero p { font-size: 1.1rem; opacity: 0.9; }

                .online-services { padding: 20px 0 40px; }
                
                .section-banner {
                    background: #d35400;
                    color: white;
                    padding: 12px 0;
                    text-align: center;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    margin-bottom: 30px;
                }

                .section-banner h2 {
                    margin: 0;
                    font-size: 1.4rem;
                    font-weight: 800;
                    letter-spacing: 1px;
                }

                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 30px;
                }

                .service-card {
                    background: white;
                    border: 1px solid #ddd;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                    display: flex;
                    flex-direction: column;
                }

                .card-header {
                    background: #16a085;
                    color: white;
                    padding: 15px 20px;
                }

                .card-header h3 { margin: 0; font-size: 1rem; font-weight: 800; }

                .card-content {
                    padding: 20px;
                    display: flex;
                    justify-content: space-between;
                    min-height: 150px;
                    position: relative;
                }

                .service-links { list-style: none; padding: 0; margin: 0; }
                .service-links li {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 8px 0;
                    color: #444;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                }

                .service-links li:hover { color: #16a085; text-decoration: underline; }
                .check-icon { color: #e67e22; }

                .card-icon-container {
                    opacity: 0.1;
                    display: flex;
                    align-items: center;
                    padding-left: 20px;
                }

                .activities-section { 
                    padding: 60px 0;
                    background: #fff;
                }
                .activities-title {
                    font-size: 2.2rem;
                    font-weight: 800;
                    color: #1e293b;
                    margin-bottom: 40px;
                    padding-left: 5px;
                    border-left: 5px solid #e67e22;
                }

                .activities-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 25px;
                }

                .activity-card {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                    transition: all 0.3s;
                    display: flex;
                    flex-direction: column;
                }

                .activity-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 12px 25px rgba(0,0,0,0.1);
                }

                .activity-img-wrapper {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16 / 10;
                    background: #f1f5f9;
                    overflow: hidden;
                }

                .activity-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s;
                }

                .activity-card:hover .activity-img {
                    transform: scale(1.1);
                }

                .activity-number {
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: #fff;
                    color: #1e293b;
                    padding: 4px 12px;
                    font-weight: 800;
                    font-size: 1.2rem;
                    border-bottom-right-radius: 8px;
                    box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
                    z-index: 5;
                }

                .activity-label-bar {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    background: linear-gradient(transparent, rgba(0,0,0,0.85));
                    color: white;
                    padding: 20px 15px 10px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    z-index: 5;
                }

                .side-grievance-tab {
                    position: fixed;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    background: white;
                    border: 1px solid #ddd;
                    border-right: none;
                    padding: 15px 8px;
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 0.8rem;
                    color: #333;
                    box-shadow: -2px 0 10px rgba(0,0,0,0.1);
                    z-index: 100;
                    white-space: nowrap;
                }

                .side-grievance-tab:hover { background: #fdfdfd; color: #16a085; }

                @media (max-width: 1200px) {
                    .activities-grid { grid-template-columns: repeat(3, 1fr); }
                }

                @media (max-width: 900px) {
                    .activities-grid { grid-template-columns: repeat(2, 1fr); }
                    .services-grid { grid-template-columns: 1fr; }
                }

                @media (max-width: 500px) {
                    .activities-grid { grid-template-columns: 1fr; }
                }
            `}</style>
    </div>
  );
};

export default PublicServices;
