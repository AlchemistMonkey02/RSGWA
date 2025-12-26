import React from 'react';
import { Info, Droplets, Map, BarChart, BookOpen, ChevronRight, Globe, Layers } from 'lucide-react';

const GroundwaterInfo = () => {
    const topics = [
        {
            title: 'Aquifer Systems',
            description: 'Rajasthan has diverse hydrogeological settings ranging from crystalline rocks to alluvial formations.',
            icon: <Layers size={24} color="#3b82f6" />
        },
        {
            title: 'Water Level Monitoring',
            description: 'The department monitors groundwater levels across the state through a network of piezometers and observation wells.',
            icon: <BarChart size={24} color="#10b981" />
        },
        {
            title: 'Block Categorization',
            description: 'Blocks are classified as Safe, Semi-Critical, Critical, or Over-Exploited based on the stage of groundwater extraction.',
            icon: <Info size={24} color="#f59e0b" />
        },
        {
            title: 'Rainwater Harvesting',
            description: 'Promoting artificial recharge techniques to replenish depleted aquifers and ensure long-term sustainability.',
            icon: <Droplets size={24} color="#06b6d4" />
        }
    ];

    return (
        <div className="info-page">
            {/* Header */}
            <section className="page-header">
                <div className="container">
                    <h1>Groundwater <span>Information</span></h1>
                    <p>Scientific data and resources to understand Rajasthan's hydrogeology.</p>
                </div>
            </section>

            {/* Topics Grid */}
            <section className="topics-section">
                <div className="container">
                    <div className="topics-grid">
                        {topics.map((topic, i) => (
                            <div key={i} className="topic-card">
                                <div className="topic-icon">{topic.icon}</div>
                                <h3>{topic.title}</h3>
                                <p>{topic.description}</p>
                                <button className="read-more">Learn More <ChevronRight size={16} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visual Content Section */}
            <section className="data-visual-section">
                <div className="container">
                    <div className="visual-wrapper">
                        <div className="visual-text">
                            <h2>Assessment Methodology</h2>
                            <p>
                                As per the GEC-2015 methodology, the unit of assessment is the Block/Tehsil.
                                Groundwater resources are assessed periodically to determine the state's water budget.
                            </p>
                            <div className="method-steps">
                                <div className="step">
                                    <span className="step-num">01</span>
                                    <p>Data Collection from Piezometers</p>
                                </div>
                                <div className="step">
                                    <span className="step-num">02</span>
                                    <p>Draft Recharge Estimation</p>
                                </div>
                                <div className="step">
                                    <span className="step-num">03</span>
                                    <p>Categorization & Finalization</p>
                                </div>
                            </div>
                        </div>
                        <div className="visual-image">
                            <div className="placeholder-gfx">
                                <Globe size={100} color="#cbd5e1" />
                                <span>Resource Visualization</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .info-page {
          background: #fff;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .page-header {
          background: linear-gradient(135deg, #1e293b, #0f172a);
          color: white;
          padding: 6rem 0;
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
          font-size: 1.2rem;
          color: #94a3b8;
        }

        .topics-section {
          padding: 5rem 0;
          background: #f8fafc;
        }

        .topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .topic-card {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s;
          border: 1px solid #f1f5f9;
        }

        .topic-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .topic-icon {
          width: 56px;
          height: 56px;
          background: #f1f5f9;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .topic-card h3 {
          font-size: 1.35rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
        }

        .topic-card p {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .read-more {
          background: none;
          border: none;
          color: #3b82f6;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          padding: 0;
        }

        .data-visual-section {
          padding: 8rem 0;
        }

        .visual-wrapper {
          display: flex;
          align-items: center;
          gap: 5rem;
        }

        .visual-text {
          flex: 1;
        }

        .visual-text h2 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
        }

        .visual-text p {
           font-size: 1.15rem;
           color: #64748b;
           line-height: 1.7;
           margin-bottom: 3rem;
        }

        .method-steps {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .step-num {
          font-size: 1.25rem;
          font-weight: 800;
          color: #3b82f6;
          background: #eff6ff;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .step p {
          margin: 0;
          font-weight: 600;
          color: #1e293b;
        }

        .visual-image {
          flex: 1;
        }

        .placeholder-gfx {
           background: #f8fafc;
           border-radius: 20px;
           aspect-ratio: 1/1;
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           gap: 1.5rem;
           border: 2px dashed #e2e8f0;
        }

        .placeholder-gfx span {
           font-weight: 600;
           color: #94a3b8;
        }

        @media (max-width: 768px) {
          .visual-wrapper { flex-direction: column; text-align: center; }
          .page-header h1 { font-size: 2.2rem; }
        }
      `}</style>
        </div>
    );
};

export default GroundwaterInfo;
