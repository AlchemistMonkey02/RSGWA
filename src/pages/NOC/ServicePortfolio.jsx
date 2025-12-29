import React from 'react';
import {
    Building2, Shovel, HardHat, GraduationCap,
    RotateCcw, ClipboardCheck, Gauge, Gavel,
    AlertTriangle, Truck, PlusCircle, Droplets,
    Search, ArrowRight, Info
} from 'lucide-react';

const ServicePortfolio = ({ onApply }) => {
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

    return (
        <div className="portfolio-container animated">
            <div className="portfolio-header">
                <div className="header-info">
                    <h1>Master Services Portfolio</h1>
                    <p>Unified Ground Water Regulatory Platform • Rajasthan State</p>
                </div>
                <div className="search-bar">
                    <Search size={18} />
                    <input type="text" placeholder="Search for a service (e.g. Mining, Rig, Renewal)..." />
                </div>
            </div>

            <div className="categories-grid">
                {serviceCategories.map((cat, idx) => (
                    <div key={idx} className="category-section">
                        <div className="category-head">
                            <h2>{cat.title}</h2>
                            <p>{cat.description}</p>
                        </div>
                        <div className="services-list">
                            {cat.services.map((svc) => (
                                <div key={svc.id} className="service-card" onClick={() => onApply(svc)}>
                                    <div className="svc-icon-box">
                                        {svc.icon}
                                    </div>
                                    <div className="svc-details">
                                        <h3>{svc.title}</h3>
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

            <style jsx>{`
        .portfolio-container { max-width: 1400px; margin: 0 auto; color: #1e293b; }
        .portfolio-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; background: white; padding: 30px; border-radius: 24px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .header-info h1 { font-size: 2rem; font-weight: 800; margin: 0; color: #0f172a; }
        .header-info p { margin: 5px 0 0; color: #64748b; font-weight: 600; font-size: 0.9rem; }
        .search-bar { position: relative; width: 400px; }
        .search-bar svg { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #94a3b8; }
        .search-bar input { width: 100%; padding: 14px 15px 14px 45px; border-radius: 12px; border: 1.5px solid #e2e8f0; outline: none; font-size: 0.95rem; background: #f8fafc; }
        .search-bar input:focus { border-color: #2563eb; background: white; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }

        .category-section { margin-bottom: 40px; }
        .category-head { margin-bottom: 20px; border-left: 4px solid #2563eb; padding-left: 15px; }
        .category-head h2 { font-size: 1.25rem; font-weight: 800; color: #0f172a; margin: 0; }
        .category-head p { margin: 5px 0 0; color: #64748b; font-size: 0.85rem; font-weight: 600; }

        .services-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
        .service-card { background: white; border-radius: 20px; padding: 25px; border: 1px solid #e2e8f0; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; display: flex; flex-direction: column; }
        .service-card:hover { transform: translateY(-5px); border-color: #2563eb; box-shadow: 0 12px 20px -5px rgba(0,0,0,0.1); }
        .service-card:hover .svc-apply-btn { background: #2563eb; color: white; border-color: #2563eb; }
        
        .svc-icon-box { width: 50px; height: 50px; background: #f8fafc; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 15px; border: 1px solid #f1f5f9; }
        .svc-icon-box :global(svg) { width: 24px; height: 24px; }
        
        .svc-details { flex: 1; }
        .svc-details h3 { font-size: 1.05rem; font-weight: 800; color: #0f172a; margin: 0 0 10px; line-height: 1.3; }
        .svc-purpose, .svc-who { font-size: 0.8rem; margin: 0 0 5px; color: #64748b; }
        .svc-purpose strong, .svc-who strong { color: #475569; font-weight: 700; }
        
        .svc-apply-btn { margin-top: 20px; width: 100%; padding: 10px; border-radius: 10px; border: 1.5px solid #e2e8f0; background: #f8fafc; color: #475569; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; }

        .animated { animation: slideUp 0.4s ease-out; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
        </div>
    );
};

export default ServicePortfolio;
