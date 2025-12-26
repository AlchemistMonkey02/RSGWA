import React from 'react';

const GenericPage = ({ title }) => {
    return (
        <div className="generic-page-container">
            <div className="alert-section">
                <p className="alert-text">
                    The Issue Reporting Module is now live. All users are requested to report their issues exclusively through the Issue Reporting Module.
                    <br />
                    Please note that issues submitted via WhatsApp, email, or any other channels will not be entertained.
                </p>
            </div>

            <div className="content-section">
                <h2 className="section-title">{title}</h2>

                <div className="placeholder-content">
                    <div className="empty-state">
                        <p>Content for {title} will be available soon.</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .generic-page-container {
          padding-bottom: 50px;
        }
        .alert-section {
          background: #fff0f0;
          border-left: 5px solid #dc3545;
          padding: 15px;
          margin-bottom: 25px;
          border-radius: 4px;
        }
        .alert-text {
          color: #dc3545;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        
        .section-title {
          color: #007bff;
          margin-bottom: 20px;
          font-weight: 500;
          font-size: 1.5rem;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        
        .placeholder-content {
          background: white;
          border-radius: 8px;
          padding: 50px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .empty-state {
          display: inline-block;
          padding: 20px 40px;
          background: #f8f9fa;
          border-radius: 8px;
          color: #6c757d;
        }
      `}</style>
        </div>
    );
};

export default GenericPage;
