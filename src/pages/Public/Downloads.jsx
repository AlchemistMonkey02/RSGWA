import React from 'react';
import {
    FileText,
    Download,
    Book,
    Layers,
    ExternalLink,
    ChevronRight,
    ShieldCheck,
    Search
} from 'lucide-react';

const PublicDownloads = () => {
    const documents = [
        {
            category: 'Acts & Rules',
            items: [
                { name: 'Rajasthan Ground Water (Regulation and Management) Act, 2025', size: '2.4 MB', type: 'PDF' },
                { name: 'RGWA Rules & Implementation Guidelines', size: '1.8 MB', type: 'PDF' }
            ]
        },
        {
            category: 'Guidelines & SOPs',
            items: [
                { name: 'SOP for Online NOC Application (Industrial)', size: '1.2 MB', type: 'PDF' },
                { name: 'Rainwater Harvesting Design Manual', size: '4.5 MB', type: 'PDF' },
                { name: 'Digital Signature & OTP Verification Guide', size: '0.8 MB', type: 'PDF' }
            ]
        },
        {
            category: 'Notifications & Orders',
            items: [
                { name: 'Notification on Change in Restoration Charges', size: '0.5 MB', type: 'PDF' },
                { name: 'Order for Rig Registration extension', size: '0.4 MB', type: 'PDF' }
            ]
        }
    ];

    return (
        <div className="downloads-page">
            <section className="page-header">
                <div className="container">
                    <h1>Downloads & <span>Resources</span></h1>
                    <p>Access official documents, guidelines, and regulatory frameworks.</p>
                </div>
            </section>

            <section className="main-content">
                <div className="container">
                    <div className="search-bar">
                        <Search size={20} />
                        <input type="text" placeholder="Search for documents, acts, or notices..." />
                    </div>

                    <div className="docs-grid">
                        {documents.map((group, i) => (
                            <div key={i} className="doc-group">
                                <h3>{group.category}</h3>
                                <div className="doc-list">
                                    {group.items.map((doc, j) => (
                                        <div key={j} className="doc-item">
                                            <div className="doc-info">
                                                <FileText className="file-icon" size={24} />
                                                <div>
                                                    <h4>{doc.name}</h4>
                                                    <span className="doc-meta">{doc.type} • {doc.size}</span>
                                                </div>
                                            </div>
                                            <button className="download-btn">
                                                <Download size={18} />
                                                <span>Download</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="quick-help-card">
                        <div className="help-text">
                            <h3>Can't find what you're looking for?</h3>
                            <p>Visit our Help Center or contact our regional offices regarding specific technical documents.</p>
                        </div>
                        <button className="btn-primary">Visit Help Center <ChevronRight size={18} /></button>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .downloads-page {
          background: #f8fafc;
          min-height: 100vh;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .page-header {
           background: #1e293b;
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
          padding: 4rem 0;
        }

        .search-bar {
          background: white;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          margin-bottom: 3rem;
          border: 1px solid #e2e8f0;
        }

        .search-bar input {
           border: none;
           outline: none;
           font-size: 1.1rem;
           width: 100%;
           color: #1e293b;
        }

        .docs-grid {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .doc-group h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1.5rem;
          padding-left: 0.5rem;
          border-left: 4px solid #3b82f6;
        }

        .doc-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .doc-item {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s;
        }

        .doc-item:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
          border-color: #3b82f6;
        }

        .doc-info {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .file-icon {
          color: #ef4444;
        }

        .doc-info h4 {
          margin: 0 0 0.25rem;
          font-size: 1.05rem;
          font-weight: 600;
          color: #334155;
        }

        .doc-meta {
          font-size: 0.85rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .download-btn {
          background: #f1f5f9;
          border: none;
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          color: #3b82f6;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .download-btn:hover {
          background: #3b82f6;
          color: white;
        }

        .quick-help-card {
           background: linear-gradient(to right, #2563eb, #1e40af);
           padding: 3rem;
           border-radius: 20px;
           color: white;
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-top: 5rem;
        }

        .help-text h3 {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
        }

        .help-text p {
           font-size: 1.1rem;
           color: #bfdbfe;
           margin: 0;
        }

        .btn-primary {
          background: white;
          color: #2563eb;
          border: none;
          padding: 1rem 2rem;
          border-radius: 10px;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        @media (max-width: 768px) {
          .doc-item { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
          .download-btn { width: 100%; justify-content: center; }
          .quick-help-card { flex-direction: column; text-align: center; gap: 2rem; }
        }
      `}</style>
        </div>
    );
};

export default PublicDownloads;
