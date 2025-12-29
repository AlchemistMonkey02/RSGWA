import React, { useState } from 'react';
import { Wrench, Calculator, CheckSquare, FileText, DollarSign, RotateCcw, Building2, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Utility = ({ activeCompany, setActiveCompany }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('calculator');
  const [calcType, setCalcType] = useState('fresh');
  const [quantum, setQuantum] = useState('');
  const [projectType, setProjectType] = useState('');
  const [calculatedFee, setCalculatedFee] = useState(null);

  // New states for detailed eligibility form
  const [eligibilityData, setEligibilityData] = useState({
    applicationType: '',
    applicationPurpose: '',
    applicationCategory: '',
    waterQualityType: '',
    groundWaterUtilization: '',
    state: 'Rajasthan',
    district: '',
    assessmentUnit: ''
  });

  // Mock document checklist
  const documentChecklist = [
    { id: 1, document: 'Application Form (duly filled and signed)', required: true },
    { id: 2, document: 'Project Report with water requirement details', required: true },
    { id: 3, document: 'Site Plan with coordinates', required: true },
    { id: 4, document: 'NOC from Pollution Control Board', required: true },
    { id: 5, document: 'Environmental Clearance Certificate', required: false },
    { id: 6, document: 'Land Ownership Documents', required: true },
    { id: 7, document: 'Water Balance Calculations', required: true },
    { id: 8, document: 'Hydrogeological Report', required: false },
    { id: 9, document: 'Undertaking for Rainwater Harvesting', required: true },
    { id: 10, document: 'Processing Fee Payment Receipt', required: true }
  ];

  const handleCalculateFee = () => {
    if (!quantum || !projectType) {
      alert('Please fill all fields');
      return;
    }

    // Mock calculation
    const baseRate = projectType === 'Industrial' ? 500 : projectType === 'Infrastructure' ? 400 : 300;
    const processingFee = 5000;
    const approvalFee = parseFloat(quantum) * baseRate;
    const total = processingFee + approvalFee;

    setCalculatedFee({
      processingFee,
      approvalFee,
      total
    });
  };

  const handleCheckEligibility = () => {
    // Basic validation
    if (!eligibilityData.applicationType || !eligibilityData.district || !eligibilityData.assessmentUnit) {
      alert('Please fill all mandatory fields (marked with *)');
      return;
    }

    alert('Checking eligibility...\n\nYour application appears to be eligible based on the provided details.\n\nPlease proceed to the regular application form for full verification.');
  };

  const handleResetEligibility = () => {
    setEligibilityData({
      applicationType: '',
      applicationPurpose: '',
      applicationCategory: '',
      waterQualityType: '',
      groundWaterUtilization: '',
      state: 'Rajasthan',
      district: '',
      assessmentUnit: ''
    });
  };

  return (
    <div className="utility-container animated">
      {activeCompany && (
        <div className="active-context-bar animated">
          <div className="ac-left">
            <Building2 size={16} />
            <span>Acting as: <strong>{activeCompany.name}</strong></span>
            <span className="ac-id">{activeCompany.id}</span>
          </div>
          <button className="ac-switch" onClick={() => { setActiveCompany(null); navigate('/dashboard'); }}>
            <RefreshCw size={14} /> Switch Entity
          </button>
        </div>
      )}
      {/* Alert */}
      <div className="alert-section">
        <p className="alert-text">
          <strong>RAJASTHAN GROUND WATER AUTHORITY (RGWA)</strong>: Use utility tools to calculate fees, check eligibility, and view required documents.
        </p>
      </div>

      {/* Page Header */}
      <div className="page-header">
        <h2>Utility Tools</h2>
        <p className="subtitle">Calculators, checklists, and eligibility tools</p>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <button
          className={`tab ${activeTab === 'calculator' ? 'active' : ''}`}
          onClick={() => setActiveTab('calculator')}
        >
          <Calculator size={18} />
          Charge Calculator
        </button>
        <button
          className={`tab ${activeTab === 'eligibility' ? 'active' : ''}`}
          onClick={() => setActiveTab('eligibility')}
        >
          <CheckSquare size={18} />
          Eligibility Checker
        </button>
        <button
          className={`tab ${activeTab === 'checklist' ? 'active' : ''}`}
          onClick={() => setActiveTab('checklist')}
        >
          <FileText size={18} />
          Document Checklist
        </button>
      </div>

      {/* Tab Content */}
      <div className="section-card">
        {/* Charge Calculator */}
        {activeTab === 'calculator' && (
          <div className="tab-content">
            <h3 className="section-title">
              <DollarSign size={20} />
              Fee Calculator
            </h3>

            <div className="form-group">
              <label>Application Type *</label>
              <select value={calcType} onChange={(e) => setCalcType(e.target.value)} className="form-control">
                <option value="fresh">Fresh Application</option>
                <option value="renewal">Renewal Application</option>
              </select>
            </div>

            <div className="form-group">
              <label>Project Type *</label>
              <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="form-control">
                <option value="">Select Project Type</option>
                <option value="Industrial">Industrial</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Mining">Mining</option>
                <option value="Domestic">Domestic</option>
              </select>
            </div>

            <div className="form-group">
              <label>Proposed Quantum (KLD) *</label>
              <input
                type="number"
                value={quantum}
                onChange={(e) => setQuantum(e.target.value)}
                className="form-control"
                placeholder="Enter quantum in KLD"
                step="0.01"
              />
            </div>

            <button className="btn btn-primary" onClick={handleCalculateFee}>
              <Calculator size={18} />
              Calculate Fee
            </button>

            {calculatedFee && (
              <div className="fee-result">
                <h4>Fee Breakdown</h4>
                <div className="fee-item">
                  <span>Processing Fee:</span>
                  <span className="amount">₹ {calculatedFee.processingFee.toLocaleString()}</span>
                </div>
                <div className="fee-item">
                  <span>Approval Fee:</span>
                  <span className="amount">₹ {calculatedFee.approvalFee.toLocaleString()}</span>
                </div>
                <div className="fee-item total">
                  <span>Total Fee:</span>
                  <span className="amount">₹ {calculatedFee.total.toLocaleString()}</span>
                </div>
                <p className="note">*Note: Fees are indicative and subject to change as per RGWA guidelines</p>
              </div>
            )}
          </div>
        )}

        {/* Eligibility Checker Refined */}
        {activeTab === 'eligibility' && (
          <div className="tab-content wider-tab">
            <h3 className="section-title">
              <CheckSquare size={20} />
              Check Application Eligibility
            </h3>

            <div className="eligibility-form">
              {/* Application Information Section */}
              <div className="form-section">
                <h4 className="section-subtitle">Application Information</h4>
                <div className="grid-form">
                  <div className="form-group">
                    <label>Application Type:</label>
                    <select
                      value={eligibilityData.applicationType}
                      onChange={(e) => setEligibilityData({ ...eligibilityData, applicationType: e.target.value })}
                      className="form-control"
                    >
                      <option value="">--Select--</option>
                      <option value="Fresh">Fresh Application</option>
                      <option value="Renewal">Renewal Application</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Application Purpose:</label>
                    <select
                      value={eligibilityData.applicationPurpose}
                      onChange={(e) => setEligibilityData({ ...eligibilityData, applicationPurpose: e.target.value })}
                      className="form-control"
                    >
                      <option value="">--Select--</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Mining">Mining</option>
                      <option value="Drinking">Drinking & Domestic</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Application Type Category/ Type of Application:</label>
                    <select
                      value={eligibilityData.applicationCategory}
                      onChange={(e) => setEligibilityData({ ...eligibilityData, applicationCategory: e.target.value })}
                      className="form-control"
                    >
                      <option value="">--Select--</option>
                      <option value="Commercial">Commercial</option>
                      <option value="GovtBody">Govt Body</option>
                      <option value="Individuall">Individual</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Water Quality Section */}
              <div className="form-section">
                <h4 className="section-subtitle">Water Quality</h4>
                <div className="form-group">
                  <label>Water Quality Type :</label>
                  <select
                    value={eligibilityData.waterQualityType}
                    onChange={(e) => setEligibilityData({ ...eligibilityData, waterQualityType: e.target.value })}
                    className="form-control"
                  >
                    <option value="">--Select--</option>
                    <option value="FreshWater">Fresh Water</option>
                    <option value="SalineWater">Saline Water</option>
                  </select>
                </div>
              </div>

              {/* Ground Water Utilization Section */}
              <div className="form-section">
                <h4 className="section-subtitle">Ground Water Utilization</h4>
                <div className="form-group">
                  <label>Whether Ground Water Utilization for: *</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="utilization"
                        value="New"
                        checked={eligibilityData.groundWaterUtilization === 'New'}
                        onChange={(e) => setEligibilityData({ ...eligibilityData, groundWaterUtilization: e.target.value })}
                      />
                      New Industry
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="utilization"
                        value="Existing"
                        checked={eligibilityData.groundWaterUtilization === 'Existing'}
                        onChange={(e) => setEligibilityData({ ...eligibilityData, groundWaterUtilization: e.target.value })}
                      />
                      Existing Industry
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="utilization"
                        value="Expansion"
                        checked={eligibilityData.groundWaterUtilization === 'Expansion'}
                        onChange={(e) => setEligibilityData({ ...eligibilityData, groundWaterUtilization: e.target.value })}
                      />
                      Expansion Program of Existing Industry
                    </label>
                  </div>
                </div>
              </div>

              {/* Location Detail Section */}
              <div className="form-section">
                <h4 className="section-subtitle">Location Detail</h4>
                <div className="grid-form">
                  <div className="form-group">
                    <label>State: *</label>
                    <select
                      value={eligibilityData.state}
                      disabled
                      className="form-control"
                    >
                      <option value="Rajasthan">Rajasthan</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>District: *</label>
                    <select
                      value={eligibilityData.district}
                      onChange={(e) => setEligibilityData({ ...eligibilityData, district: e.target.value })}
                      className="form-control"
                    >
                      <option value="">--Select--</option>
                      <option value="Jaipur">Jaipur</option>
                      <option value="Jodhpur">Jodhpur</option>
                      <option value="Udaipur">Udaipur</option>
                      <option value="Kota">Kota</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Assessment unit: *</label>
                    <select
                      value={eligibilityData.assessmentUnit}
                      onChange={(e) => setEligibilityData({ ...eligibilityData, assessmentUnit: e.target.value })}
                      className="form-control"
                    >
                      <option value="">--Select--</option>
                      <option value="Unit1">Unit 1</option>
                      <option value="Unit2">Unit 2</option>
                      <option value="Unit3">Unit 3</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-actions-row">
                <button className="btn btn-primary" onClick={handleCheckEligibility}>
                  Check Eligibility
                </button>
                <button className="btn btn-secondary-outline" onClick={handleResetEligibility}>
                  <RotateCcw size={16} />
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Document Checklist */}
        {activeTab === 'checklist' && (
          <div className="tab-content">
            <h3 className="section-title">
              <FileText size={20} />
              Required Documents Checklist
            </h3>

            <div className="checklist-container">
              <table>
                <thead>
                  <tr>
                    <th>SR NO.</th>
                    <th>DOCUMENT NAME</th>
                    <th>REQUIRED</th>
                  </tr>
                </thead>
                <tbody>
                  {documentChecklist.map((doc) => (
                    <tr key={doc.id}>
                      <td>{doc.id}</td>
                      <td>{doc.document}</td>
                      <td>
                        <span className={`badge ${doc.required ? 'badge-danger' : 'badge-info'}`}>
                          {doc.required ? 'Mandatory' : 'Optional'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="checklist-note">
              <p><strong>Note:</strong> All mandatory documents must be submitted with your application. Optional documents may be required based on project type and location.</p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .utility-container {
          padding-bottom: 50px;
        }

        .active-context-bar {
            background: #f1f5f9;
            border-bottom: 1px solid #e2e8f0;
            padding: 8px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.8rem;
        }
        .ac-left { display: flex; align-items: center; gap: 12px; color: #475569; }
        .ac-left strong { color: #0f172a; }
        .ac-id { font-size: 0.7rem; color: #94a3b8; font-weight: 700; background: white; padding: 2px 6px; border-radius: 4px; border: 1px solid #e2e8f0; }
        .ac-switch { background: #0f172a; color: white; border: none; padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s; }
        .ac-switch:hover { background: #1e293b; transform: translateY(-1px); }

        .animated { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

        .alert-section {
          background: #d1ecf1;
          border-left: 5px solid #0c5460;
          padding: 15px;
          margin-bottom: 25px;
          border-radius: 6px;
        }

        .alert-text {
          color: #0c5460;
          font-size: 0.9rem;
          margin: 0;
        }

        .page-header {
          background: white;
          padding: 25px;
          border-radius: 8px;
          margin-bottom: 25px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .page-header h2 {
          font-size: 1.8rem;
          color: #333;
          margin: 0 0 8px 0;
        }

        .subtitle {
          color: #666;
          font-size: 0.95rem;
          margin: 0;
        }

        .tabs-container {
          display: flex;
          gap: 10px;
          margin-bottom: 25px;
        }

        .tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: white;
          border: 2px solid #ddd;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          color: #666;
          transition: all 0.2s;
        }

        .tab:hover {
          border-color: #007bff;
          color: #007bff;
        }

        .tab.active {
          background: #007bff;
          border-color: #007bff;
          color: white;
        }

        .section-card {
          background: white;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.2rem;
          color: #007bff;
          margin: 0 0 20px 0;
          padding-bottom: 15px;
          border-bottom: 2px solid #f0f0f0;
        }

        .tab-content {
          max-width: 600px;
        }
        
        .wider-tab {
          max-width: 900px;
        }

        .form-section {
          margin-bottom: 25px;
          padding: 20px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background: #fafafa;
        }

        .section-subtitle {
          margin: -20px -20px 20px -20px;
          padding: 10px 20px;
          background: #0f3c5f;
          color: white;
          font-size: 1rem;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }

        .grid-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: #555;
          margin-bottom: 8px;
        }

        .form-control {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 0.95rem;
        }

        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 5px 0;
        }

        .radio-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 400;
          cursor: pointer;
        }

        .radio-label input[type="radio"] {
          width: 18px;
          height: 18px;
        }

        .form-actions-row {
          display: flex;
          gap: 15px;
          margin-top: 25px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 25px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #007bff;
          color: white;
        }

        .btn-primary:hover {
          background: #0056b3;
        }

        .btn-secondary-outline {
          background: white;
          color: #666;
          border: 1px solid #ddd;
        }

        .btn-secondary-outline:hover {
          background: #f8f9fa;
          border-color: #999;
          color: #333;
        }

        .fee-result {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 6px;
          margin-top: 20px;
        }

        .fee-result h4 {
          margin: 0 0 15px 0;
          color: #333;
        }

        .fee-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #dee2e6;
        }

        .fee-item.total {
          border-bottom: none;
          border-top: 2px solid #007bff;
          margin-top: 10px;
          padding-top: 15px;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .fee-item .amount {
          color: #007bff;
          font-weight: 600;
        }

        .checklist-container {
          border: 1px solid #dee2e6;
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          background-color: #0f3c5f;
          color: white;
          padding: 12px 10px;
          font-size: 0.75rem;
          text-transform: uppercase;
          text-align: left;
          border: 1px solid #0f3c5f;
          font-weight: 600;
        }

        td {
          padding: 12px 10px;
          border: 1px solid #dee2e6;
          font-size: 0.85rem;
          color: #333;
        }

        tr:hover {
          background-color: #f8f9fa;
        }

        .badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .badge-danger {
          background: #f8d7da;
          color: #721c24;
        }

        .badge-info {
          background: #d1ecf1;
          color: #0c5460;
        }
      `}</style>
    </div>
  );
};

export default Utility;
