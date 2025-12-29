import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Droplets, ArrowRight, ArrowLeft, Activity, AlertTriangle,
  FileCheck, ShieldCheck, Ruler, Truck, Wallet, BarChart3,
  Clock, Bell, Settings, ChevronRight, CheckCircle2,
  XCircle, Info, Calculator, Globe, Plus, X, Building2, Shield,
  Shovel, HardHat, GraduationCap, RotateCcw, Gauge, Gavel, PlusCircle, Search, ClipboardCheck
} from 'lucide-react';

const Dashboard = ({ activeCompany, setActiveCompany, userCompanies, setUserCompanies }) => {
  const navigate = useNavigate();

  // Multi-Entity Mock Data
  // Multi-Entity state now managed at App level


  const [vaultDocs, setVaultDocs] = useState([
    { id: 1, name: "Group PAN Card.pdf", type: "KYC", size: "1.2 MB", date: "2024-11-20" },
    { id: 2, name: "Industrial Lease Agreement.pdf", type: "Legal", size: "3.5 MB", date: "2024-12-05" }
  ]);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedComp, setSelectedComp] = useState(null);
  const [registerModal, setRegisterModal] = useState(false);
  const [newCompName, setNewCompName] = useState("");
  const [newCompZone, setNewCompZone] = useState("Jaipur (Industrial)");
  const [serviceSearchQuery, setServiceSearchQuery] = useState('');

  // Service to Route Mapping
  const getServiceRoute = (serviceId) => {
    const routeMap = {
      // Regulatory NOC Services
      'abstraction-industry': '/noc-portal',
      'abstraction-mining': '/noc-portal',
      'abstraction-infra': '/noc-portal',
      'abstraction-commercial': '/noc-portal',
      
      // Drilling & Infrastructure
      'rig-registration': '/rig-registration',
      'drilling-permission': '/borewell-drilling-permission',
      'well-conversion': '/well-conversion',
      
      // Compliance & Monitoring
      'noc-renewal': '/renewal',
      'compliance-reporting': '/compliance',
      'meter-installation': '/meter-registration-system',
      
      // Enforcement & Legal
      'ec-orders': '/eac',
      'violation-regularization': '/violation-regularization',
      
      // Special Permissions
      'emergency-noc': '/emergency-noc',
      'tanker-noc': '/tanker-transport-noc'
    };
    
    return routeMap[serviceId] || '/noc-portal'; // Default to noc-portal
  };


  return (
    <div className="discovery-hub animated">
      <div className="hub-header-v3">
        <div className="hh-left">
          <h1>Corporate Management Hub</h1>
          <p>Central Command & Authority Service Portal</p>
        </div>

        <div className="header-context-switcher">
          <div className="ac-label">
            <Building2 size={16} />
            <span>Acting as:</span>
          </div>
          <select
            value={activeCompany?.id || ""}
            onChange={(e) => setActiveCompany(userCompanies.find(c => c.id === e.target.value))}
            className="company-dropdown"
          >
            {!activeCompany && <option value="">Select Business Entity...</option>}
            {userCompanies.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.id})</option>
            ))}
          </select>
          <button className="btn-add-entity-sm" onClick={() => setRegisterModal(true)}><Plus size={16} /></button>
        </div>
      </div>

      <div className="hub-layout-v3">
        <aside className="hub-side-v3">
          <div className="portfolio-summary card-v3">
            <h3><Info size={18} /> Entity Status</h3>
            {activeCompany ? (
              <>
                <div className="stat-row">
                  <div className="s-item"><label>Active Services</label><strong>2/5</strong></div>
                  <div className="s-item"><label>Compliance</label><strong className="text-green">94%</strong></div>
                </div>
                <div className="progress-mini">
                  <div className="pm-fill" style={{ width: '94%' }}></div>
                </div>
                <p className="p-desc"><strong>{activeCompany.name}</strong> is fully compliant with all current RGWA protocols.</p>
              </>
            ) : (
              <p className="no-context-txt">Please select an entity from the header to view specific compliance stats.</p>
            )}
          </div>

          <div className="vault-box-v3 card-v3">
            <div className="v-header">
              <h3><Shield size={18} /> Corporate Vault</h3>
              <button className="v-add"><Plus size={14} /></button>
            </div>
            <div className="v-list">
              {vaultDocs.map(doc => (
                <div key={doc.id} className="v-item">
                  <FileText size={16} />
                  <span>{doc.name}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="entity-selection-main">

          {/* Master Services Portfolio Section */}
          <div className="services-portfolio-section card-v3">
            <div className="portfolio-header-section">
              <div>
                <h2 className="portfolio-title">Master Services Portfolio</h2>
                <p className="portfolio-subtitle">Unified Ground Water Regulatory Platform • Rajasthan State</p>
              </div>
              <div className="search-bar-container">
                <Search size={18} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search for a service (e.g. Mining, Rig, Renewal)..." 
                  value={serviceSearchQuery}
                  onChange={(e) => setServiceSearchQuery(e.target.value)}
                  className="service-search-input"
                />
              </div>
            </div>

            {(() => {
              const serviceCategories = [
                {
                  title: "Regulatory NOC Services",
                  description: "Statutory permissions required before starting abstraction",
                  services: [
                    { id: 'abstraction-industry', title: "Groundwater Abstraction - Industry", icon: <Building2 className="text-blue-500" />, purpose: "Industrial process water", who: "Factories, Manufacturing Units" },
                    { id: 'abstraction-mining', title: "Groundwater Abstraction - Mining", icon: <Shovel className="text-amber-600" />, purpose: "Dewatering & processing", who: "Mining Lease Holders" },
                    { id: 'abstraction-infra', title: "Infrastructure Projects", icon: <HardHat className="text-orange-500" />, purpose: "Construction & Operation", who: "Roads, Railways, Housing" },
                    { id: 'abstraction-commercial', title: "Commercial / Institutional", icon: <GraduationCap className="text-purple-500" />, purpose: "Occupancy-based demand", who: "Hotels, Hospitals, Schools" },
                  ]
                },
                {
                  title: "Drilling & Infrastructure",
                  description: "Permissions for rigs and drilling activity",
                  services: [
                    { id: 'rig-registration', title: "Rig Registration NOC", icon: <RotateCcw className="text-slate-600" />, purpose: "Authorize drilling rigs", who: "Drilling Contractors" },
                    { id: 'drilling-permission', title: "Borewell Drilling Permission", icon: <PlusCircle className="text-emerald-500" />, purpose: "Prior permission to drill", who: "Borewell owners" },
                    { id: 'well-conversion', title: "Well Conversion/Deepening", icon: <ArrowRight className="text-cyan-500" />, purpose: "Shallow to deep conversion", who: "Existing well owners" },
                  ]
                },
                {
                  title: "Compliance & Monitoring",
                  description: "Ongoing regulatory requirements",
                  services: [
                    { id: 'noc-renewal', title: "NOC Renewal Service", icon: <RotateCcw className="text-blue-600" />, purpose: "Extend NOC validity", who: "Existing NOC holders" },
                    { id: 'compliance-reporting', title: "Compliance Reporting", icon: <ClipboardCheck className="text-indigo-500" />, purpose: "Data submission", who: "All NOC holders" },
                    { id: 'meter-installation', title: "Meter Validation NOC", icon: <Gauge className="text-rose-500" />, purpose: "Verify meter accuracy", who: "Large abstractors" },
                  ]
                },
                {
                  title: "Enforcement & Legal",
                  description: "Violation handling and regularization",
                  services: [
                    { id: 'ec-orders', title: "Penalty & EC Orders", icon: <Gavel className="text-red-600" />, purpose: "Environmental compensation", who: "Violators/Notice seekers" },
                    { id: 'violation-regularization', title: "Violation Regularization", icon: <AlertTriangle className="text-yellow-600" />, purpose: "Amnesty & Legalization", who: "Unauthorized users" },
                  ]
                },
                {
                  title: "Special Permissions",
                  description: "Emergency and bulk transportation",
                  services: [
                    { id: 'emergency-noc', title: "Emergency NOC", icon: <AlertTriangle className="text-red-500" />, purpose: "Drought/Emergency use", who: "Critical sector users" },
                    { id: 'tanker-noc', title: "Tanker/Transportation NOC", icon: <Truck className="text-sky-500" />, purpose: "Bulk water supply", who: "Suppliers/Transporters" },
                  ]
                }
              ];

              // Filter services based on search query
              const filteredCategories = serviceCategories.map(cat => ({
                ...cat,
                services: cat.services.filter(svc => 
                  svc.title.toLowerCase().includes(serviceSearchQuery.toLowerCase()) ||
                  svc.purpose.toLowerCase().includes(serviceSearchQuery.toLowerCase()) ||
                  svc.who.toLowerCase().includes(serviceSearchQuery.toLowerCase())
                )
              })).filter(cat => cat.services.length > 0);

              return (
                <div className="categories-grid">
                  {filteredCategories.map((cat, idx) => (
                    <div key={idx} className="category-section">
                      <div className="category-head">
                        <h3 className="category-title">{cat.title}</h3>
                        <p className="category-description">{cat.description}</p>
                      </div>
                      <div className="services-list-grid">
                        {cat.services.map((svc) => (
                          <div 
                            key={svc.id} 
                            className="service-card-item" 
                            onClick={() => {
                              if (activeCompany) {
                                const route = getServiceRoute(svc.id);
                                // If route is /noc-portal, pass service ID as URL parameter
                                if (route === '/noc-portal') {
                                  navigate(`/noc-portal?service=${svc.id}`);
                                } else {
                                  navigate(route);
                                }
                              } else {
                                alert('Please select an entity first to apply for services');
                              }
                            }}
                            style={{ cursor: activeCompany ? 'pointer' : 'not-allowed', opacity: activeCompany ? 1 : 0.6 }}
                          >
                            <div className="svc-icon-box">
                              {svc.icon}
                            </div>
                            <div className="svc-details">
                              <h4 className="svc-title">{svc.title}</h4>
                              <p className="svc-purpose"><strong>Purpose:</strong> {svc.purpose}</p>
                              <p className="svc-who"><strong>Who Applies:</strong> {svc.who}</p>
                            </div>
                            <button className="svc-apply-btn">
                              Apply <ArrowRight size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </main>
      </div>

      {registerModal && (
        <div className="modal-overlay" onClick={() => setRegisterModal(false)}>
          <div className="registration-modal animated" onClick={e => e.stopPropagation()}>
            <div className="rm-header">
              <div className="rm-title">
                <div className="rm-icon" style={{ color: '#0f172a' }}><Building2 size={24} /></div>
                <div>
                  <h3>Register New Business Entity</h3>
                  <p>Expand your corporate portfolio for groundwater management</p>
                </div>
              </div>
              <button className="btn-close" onClick={() => setRegisterModal(false)}><X size={20} /></button>
            </div>
            <div className="rm-body">
              <div className="alert-info">
                <ShieldCheck size={16} />
                <span>All new registrations undergo mandatory statutory KYC verification by RGWA.</span>
              </div>
              <div className="form-grid">
                <div className="input-grp full">
                  <label>Legal Entity Name*</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Industrial Works Pvt Ltd"
                    value={newCompName}
                    onChange={(e) => setNewCompName(e.target.value)}
                  />
                </div>
                <div className="input-grp">
                  <label>Industrial Zone / Cluster*</label>
                  <select value={newCompZone} onChange={(e) => setNewCompZone(e.target.value)}>
                    <option>Jaipur (Industrial)</option>
                    <option>Bikaner Rural</option>
                    <option>Jodhpur SEZ</option>
                    <option>Udaipur (South)</option>
                    <option>Neemrana Industrial Park</option>
                  </select>
                </div>
                <div className="input-grp">
                  <label>Registration Type</label>
                  <select>
                    <option>Private Limited</option>
                    <option>Partnership Firm</option>
                    <option>Proprietorship</option>
                    <option>Public Sector Undertaking</option>
                  </select>
                </div>
              </div>
              <div className="consent-box">
                <input type="checkbox" id="reg-consent" />
                <label htmlFor="reg-consent">I confirm that I am the authorized signatory for this legal entity.</label>
              </div>
            </div>
            <div className="rm-footer">
              <button className="btn-cancel" onClick={() => setRegisterModal(false)}>Cancel</button>
              <button
                className="btn-finalize"
                style={{ background: '#0f172a' }}
                onClick={() => {
                  if (!newCompName) {
                    alert("Please enter a legal entity name.");
                    return;
                  }
                  const newId = `COMP-${Math.floor(1000 + Math.random() * 9000)}`;
                  const newCompany = {
                    id: newId,
                    name: newCompName,
                    zone: newCompZone,
                    kyc: "Pending",
                    avatar: newCompName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
                    services: {
                      noc: { registered: false, pending: false, route: "/noc-portal" },
                      meters: { registered: false, pending: false, route: "/meter-registration-system" },
                      rigs: { registered: false, pending: false, route: "/rig-registration" },
                      modeling: { registered: false, pending: false, route: "/utility" },
                      monitoring: { registered: false, pending: false, route: "/reports" }
                    }
                  };
                  setUserCompanies([...userCompanies, newCompany]);
                  setActiveCompany(newCompany);
                  setRegisterModal(false);
                  setNewCompName("");
                  alert(`Entity registered successfully! Identity ID: ${newId}. You are now acting as this entity.`);
                }}
              >
                Register & Initialize Portfolio
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .discovery-hub { padding: 40px; background: #f8fafc; min-height: 100vh; font-family: 'Inter', sans-serif; }
        
        /* HEADER */
        .hub-header-v3 { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .hub-header-v3 h1 { font-size: 2.4rem; font-weight: 800; color: #0f172a; margin: 0 0 5px 0; letter-spacing: -0.03em; }
        .hub-header-v3 p { color: #64748b; font-size: 1.1rem; }
        
        .header-context-switcher { background: white; border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 6px 6px 6px 20px; display: flex; align-items: center; gap: 15px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .ac-label { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
        .company-dropdown { border: none; background: transparent; font-size: 1rem; font-weight: 700; color: #0f172a; outline: none; padding-right: 15px; cursor: pointer; min-width: 280px; }
        .btn-add-entity-sm { width: 40px; height: 40px; background: #0f172a; color: white; border: none; border-radius: 12px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
        .btn-add-entity-sm:hover { background: #1e293b; transform: scale(1.05); }

        /* LAYOUT */
        .hub-layout-v3 { display: grid; grid-template-columns: 320px 1fr; gap: 40px; max-width: 1700px; margin: 0 auto; }
        .hub-side-v3 { display: flex; flex-direction: column; gap: 25px; }
        .card-v3 { background: white; border-radius: 24px; padding: 25px; border: 1.5px solid #e2e8f0; }

        /* SIDEBAR COMPONENTS */
        .portfolio-summary h3, .vault-box-v3 h3 { margin: 0 0 20px 0; font-size: 1rem; color: #0f172a; display: flex; align-items: center; gap: 10px; }
        .stat-row { display: flex; gap: 20px; margin-bottom: 20px; }
        .s-item label { display: block; font-size: 0.7rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-bottom: 5px; }
        .s-item strong { font-size: 1.5rem; color: #0f172a; font-weight: 800; }
        .progress-mini { height: 6px; background: #f1f5f9; border-radius: 10px; overflow: hidden; margin-bottom: 15px; }
        .pm-fill { height: 100%; background: #10b981; }
        .p-desc { font-size: 0.85rem; color: #64748b; margin: 0; }

        .v-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .v-add { background: #f1f5f9; border: none; width: 24px; height: 24px; border-radius: 6px; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .v-list { display: flex; flex-direction: column; gap: 10px; }
        .v-item { display: flex; align-items: center; gap: 10px; padding: 10px; background: #f8fafc; border-radius: 10px; border: 1.5px solid #f1f5f9; font-size: 0.8rem; color: #475569; }

        .company-grid-v3.full-width { grid-template-columns: repeat(2, 1fr); gap: 30px; }
        .company-card-v3 { background: white; border-radius: 28px; padding: 35px; border: 1.5px solid #e2e8f0; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; height: fit-content; }
        .company-card-v3.main-panel { background: white; border-color: #3b82f6; box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.1); }
        .company-card-v3:hover { border-color: #cbd5e1; transform: translateY(-5px); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.08); }
        
        .cc-header { display: flex; align-items: center; gap: 20px; margin-bottom: 25px; }
        .cc-avatar { width: 56px; height: 56px; background: #0f172a; color: white; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; font-weight: 800; }
        .cc-title { flex: 1; }
        .cc-title h3 { margin: 0; font-size: 1.5rem; color: #0f172a; letter-spacing: -0.01em; }
        .cc-id { font-size: 0.85rem; color: #64748b; font-weight: 500; }
        
        .cc-kyc { font-size: 0.75rem; font-weight: 700; padding: 6px 14px; border-radius: 50px; display: flex; align-items: center; gap: 6px; }
        .cc-kyc.verified { background: #ecfdf5; color: #059669; }
        .cc-kyc.pending { background: #fff7ed; color: #c2410c; }

        .btn-manage-entity { background: #0f172a; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all 0.2s; width: 100%; justify-content: center; margin-top: 10px; }
        .btn-manage-entity:hover { background: #1e293b; transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }

        .entity-selection-main { flex: 1; }

        .animated { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        /* MODAL STYLES */
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .registration-modal { background: white; width: 600px; border-radius: 32px; padding: 40px; box-shadow: 0 40px 80px -15px rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.2); }
        
        .rm-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
        .rm-title { display: flex; gap: 20px; align-items: center; }
        .rm-icon { width: 50px; height: 50px; background: #f8fafc; border-radius: 14px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .rm-title h3 { margin: 0; font-size: 1.5rem; color: #0f172a; font-weight: 800; }
        .rm-title p { margin: 4px 0 0; color: #64748b; font-size: 0.95rem; }
        .btn-close { background: transparent; border: none; color: #94a3b8; cursor: pointer; }

        .alert-info { background: #eff6ff; color: #2563eb; padding: 12px 18px; border-radius: 12px; display: flex; align-items: center; gap: 12px; font-size: 0.85rem; font-weight: 600; margin-bottom: 30px; border: 1px solid #dbeafe; }
        
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; }
        .input-grp { display: flex; flex-direction: column; gap: 8px; }
        .input-grp.full { grid-column: span 2; }
        .input-grp label { font-size: 0.8rem; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; }
        .input-grp input, .input-grp select { padding: 12px 16px; border-radius: 12px; border: 1.5px solid #e2e8f0; font-family: inherit; font-size: 0.95rem; outline: none; transition: all 0.2s; }
        .input-grp input:focus { border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }

        .consent-box { display: flex; gap: 12px; align-items: flex-start; }
        .consent-box input { margin-top: 4px; }
        .consent-box label { font-size: 0.85rem; color: #64748b; line-height: 1.5; font-weight: 500; cursor: pointer; }

        .rm-footer { display: flex; justify-content: flex-end; gap: 15px; margin-top: 40px; }
        .btn-cancel { background: transparent; border: none; font-weight: 700; color: #64748b; cursor: pointer; padding: 12px 20px; }
        .btn-finalize { background: #0f172a; color: white; border: none; padding: 14px 28px; border-radius: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .btn-finalize:hover { background: #1e293b; transform: translateY(-2px); }

        /* Services Portfolio Styles */
        .services-portfolio-section {
          margin-top: 40px;
        }
        .portfolio-header-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 20px;
        }
        .portfolio-title {
          font-size: 2rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 5px 0;
        }
        .portfolio-subtitle {
          color: #64748b;
          font-size: 0.95rem;
          font-weight: 600;
          margin: 0;
        }
        .search-bar-container {
          position: relative;
          width: 100%;
          max-width: 400px;
        }
        .search-bar-container .search-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          z-index: 1;
        }
        .service-search-input {
          width: 100%;
          padding: 14px 15px 14px 45px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          outline: none;
          font-size: 0.95rem;
          background: #f8fafc;
          transition: all 0.2s;
          font-family: inherit;
        }
        .service-search-input:focus {
          border-color: #3b82f6;
          background: white;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }

        .categories-grid {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .category-section {
          margin-bottom: 0;
        }
        .category-head {
          margin-bottom: 20px;
          border-left: 4px solid #2563eb;
          padding-left: 15px;
        }
        .category-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .category-description {
          margin: 5px 0 0;
          color: #64748b;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .services-list-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        .service-card-item {
          background: white;
          border-radius: 20px;
          padding: 25px;
          border: 1px solid #e2e8f0;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .service-card-item:hover {
          transform: translateY(-5px);
          border-color: #2563eb;
          box-shadow: 0 12px 20px -5px rgba(0,0,0,0.1);
        }
        .service-card-item:hover .svc-apply-btn {
          background: #2563eb;
          color: white;
          border-color: #2563eb;
        }
        
        .svc-icon-box {
          width: 50px;
          height: 50px;
          background: #f8fafc;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
          border: 1px solid #f1f5f9;
        }
        .svc-icon-box :global(svg) {
          width: 24px;
          height: 24px;
        }
        
        .svc-details {
          flex: 1;
        }
        .svc-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 10px;
          line-height: 1.3;
        }
        .svc-purpose, .svc-who {
          font-size: 0.8rem;
          margin: 0 0 5px;
          color: #64748b;
        }
        .svc-purpose strong, .svc-who strong {
          color: #475569;
          font-weight: 700;
        }
        
        .svc-apply-btn {
          margin-top: 20px;
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          color: #475569;
          font-weight: 700;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          cursor: pointer;
          font-family: inherit;
        }

        @media (max-width: 1400px) {
          .hub-layout-v3 { grid-template-columns: 1fr; }
          .hub-side-v3 { display: grid; grid-template-columns: 1fr 1fr; }
          .company-grid-v3 { grid-template-columns: 1fr; }
          .portfolio-header-section {
            flex-direction: column;
            align-items: flex-start;
          }
          .search-bar-container {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
