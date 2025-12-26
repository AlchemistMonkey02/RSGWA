import React, { useState, useEffect } from 'react';
import {
    ShieldCheck,
    AlertCircle,
    CheckCircle2,
    Sparkles,
    ChevronRight,
    Info
} from 'lucide-react';

const AIComplianceChecker = ({ formData, currentStep }) => {
    const [readinessScore, setReadinessScore] = useState(0);
    const [checks, setChecks] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        // Simulate AI analysis whenever form data or step changes
        setIsAnalyzing(true);
        const timer = setTimeout(() => {
            analyzeCompliance();
            setIsAnalyzing(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [formData, currentStep]);

    const analyzeCompliance = () => {
        let score = 0;
        let newChecks = [];

        // Simulate different checks based on current step or dummy logic
        if (currentStep === 1) {
            const hasType = !!formData.applicationType;
            newChecks.push({
                label: 'Application Type Selected',
                status: hasType ? 'pass' : 'fail',
                hint: 'Ensure you select the correct category (Industry/Mining/Infra).'
            });
            if (hasType) score += 50;
        }

        if (currentStep === 2) {
            const hasLocation = !!formData.district && !!formData.block;
            newChecks.push({
                label: 'GIS Location Precision',
                status: hasLocation ? 'pass' : 'warning',
                hint: 'High precision coordinates reduce processing time.'
            });
            if (hasLocation) score += 40;

            const isOE = formData.block === 'Jaipur'; // Mock OE block
            if (isOE) {
                newChecks.push({
                    label: 'Regulatory Constraint Check',
                    status: 'warning',
                    hint: 'This block is classified as Over-Exploited. Additional restoration documents required.'
                });
            } else {
                score += 30;
            }
        }

        // Default placeholder checks
        newChecks.push({
            label: 'Document Consistency',
            status: 'pass',
            hint: 'AI verified that uploaded ID matches applicant name.'
        });

        setReadinessScore(Math.min(score + 10, 100)); // Base 10 + logic
        setChecks(newChecks);
    };

    return (
        <div className="ai-compliance-panel">
            <div className="panel-header">
                <Sparkles size={20} color="#7c3aed" />
                <h3>AI Compliance Assistant</h3>
                {isAnalyzing && <span className="analyzing">Analyzing...</span>}
            </div>

            <div className="score-section">
                <div className="score-ring">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="circle"
                            strokeDasharray={`${readinessScore}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20.35" className="percentage">{readinessScore}%</text>
                    </svg>
                </div>
                <div className="score-text">
                    <h4>Application Readiness</h4>
                    <p>{readinessScore > 80 ? 'Excellent! Low chance of queries.' : 'Good, but some areas need attention.'}</p>
                </div>
            </div>

            <div className="check-list">
                {checks.map((check, i) => (
                    <div key={i} className={`check-item ${check.status}`}>
                        <div className="check-main">
                            {check.status === 'pass' && <CheckCircle2 size={16} color="#10b981" />}
                            {check.status === 'fail' && <AlertCircle size={16} color="#dc2626" />}
                            {check.status === 'warning' && <Info size={16} color="#f59e0b" />}
                            <span>{check.label}</span>
                        </div>
                        <p className="check-hint">{check.hint}</p>
                    </div>
                ))}
            </div>

            <button className="full-report-btn">
                View Detailed Guidelines <ChevronRight size={14} />
            </button>

            <style jsx>{`
        .ai-compliance-panel {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 2rem;
        }

        .panel-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .panel-header h3 {
          font-size: 1rem;
          font-weight: 700;
          margin: 0;
          color: #1e293b;
        }

        .analyzing {
          font-size: 0.75rem;
          color: #7c3aed;
          font-weight: 600;
          margin-left: auto;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .score-section {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          background: #f8fafc;
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
        }

        .score-ring { width: 60px; height: 60px; }

        .circular-chart { display: block; margin: 0 auto; max-width: 100%; max-height: 100%; }
        .circle-bg { fill: none; stroke: #e2e8f0; stroke-width: 3.8; }
        .circle { fill: none; stroke-width: 3.8; stroke-linecap: round; stroke: #7c3aed; transition: stroke-dasharray 0.5s ease; }
        .percentage { fill: #1e293b; font-size: 0.6rem; font-weight: 800; text-anchor: middle; }

        .score-text h4 { font-size: 0.9rem; margin: 0 0 0.25rem; color: #1e293b; }
        .score-text p { font-size: 0.75rem; margin: 0; color: #64748b; }

        .check-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .check-item {
          padding-left: 0.75rem;
          border-left: 3px solid transparent;
        }

        .check-item.pass { border-color: #10b981; }
        .check-item.fail { border-color: #dc2626; }
        .check-item.warning { border-color: #f59e0b; }

        .check-main {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: #334155;
          margin-bottom: 0.25rem;
        }

        .check-hint {
          font-size: 0.75rem;
          color: #64748b;
          margin: 0;
          padding-left: 2rem;
          line-height: 1.4;
        }

        .full-report-btn {
          width: 100%;
          background: #f1f5f9;
          border: none;
          padding: 0.75rem;
          border-radius: 8px;
          color: #475569;
          font-weight: 600;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .full-report-btn:hover {
          background: #e2e8f0;
        }
      `}</style>
        </div>
    );
};

export default AIComplianceChecker;
