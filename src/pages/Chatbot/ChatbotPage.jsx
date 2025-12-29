import React from 'react';
import Chatbot from './Chatbot';
import { MessageCircle, Bot, FileText, HelpCircle } from 'lucide-react';

const ChatbotPage = () => {
  return (
    <div className="chatbot-page-container">
      <div className="chatbot-page-header">
        <div className="header-content">
          <div className="header-icon">
            <Bot size={32} />
          </div>
          <div>
            <h1>Groundwater Assistant</h1>
            <p>Your 24/7 guide for NOC, Compliance, and Regulatory Services</p>
          </div>
        </div>
      </div>

      <div className="chatbot-page-info">
        <div className="info-card">
          <FileText size={24} />
          <h3>What I Can Help With</h3>
          <ul>
            <li>Apply for Groundwater NOC</li>
            <li>Check Eligibility & Requirements</li>
            <li>Track Application Status</li>
            <li>Register Rigs & Meters</li>
            <li>Understand Fees & Charges</li>
            <li>Compliance & Monitoring</li>
          </ul>
        </div>
        <div className="info-card">
          <HelpCircle size={24} />
          <h3>How It Works</h3>
          <ul>
            <li>Ask questions in natural language</li>
            <li>Get step-by-step guidance</li>
            <li>Follow workflow-based assistance</li>
            <li>Access knowledge base instantly</li>
          </ul>
        </div>
      </div>

      <div className="chatbot-page-main">
        <Chatbot />
      </div>

      <style jsx>{`
        .chatbot-page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
          padding: 40px 20px;
        }

        .chatbot-page-header {
          max-width: 1200px;
          margin: 0 auto 40px;
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .header-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .chatbot-page-header h1 {
          margin: 0 0 8px;
          font-size: 2rem;
          font-weight: 800;
          color: #0f172a;
        }

        .chatbot-page-header p {
          margin: 0;
          color: #64748b;
          font-size: 1.1rem;
        }

        .chatbot-page-info {
          max-width: 1200px;
          margin: 0 auto 40px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .info-card {
          background: white;
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .info-card svg {
          color: #3b82f6;
          margin-bottom: 16px;
        }

        .info-card h3 {
          margin: 0 0 16px;
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
        }

        .info-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .info-card li {
          padding: 8px 0;
          color: #475569;
          font-size: 0.95rem;
          position: relative;
          padding-left: 24px;
        }

        .info-card li:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #10b981;
          font-weight: 700;
        }

        .chatbot-page-main {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .chatbot-page-container {
            padding: 20px 10px;
          }

          .chatbot-page-header {
            padding: 24px;
          }

          .header-content {
            flex-direction: column;
            text-align: center;
          }

          .chatbot-page-info {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatbotPage;

