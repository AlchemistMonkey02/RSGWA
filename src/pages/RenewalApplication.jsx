import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Save, Send, Upload, X, FileText, RefreshCw } from 'lucide-react';

const RenewalApplication = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedApplication, setSelectedApplication] = useState('');
    const [formData, setFormData] = useState({
        // Step 1: Select Existing Application
        existingAppId: '',

        // Step 2: Renewal Details
        renewalReason: '',
        renewalPeriod: '',
        renewalFromDate: '',
        renewalToDate: '',

        // Step 3: Updated Project Details
        updatedQuantum: '',
        currentExtraction: '',
        proposedExtraction: '',
        projectChanges: '',

        // Step 4: Updated Documents
        documents: {
            renewalApplication: null,
            lastComplianceReport: null,
            updatedProjectReport: null,
            noc: null
        },

        // Step 5: Declaration
        acceptTerms: false,
        applicantName: '',
        designation: '',
        date: ''
    });

    // Mock approved applications eligible for renewal
    const eligibleApplications = [
        { id: 'RJ-2022-APP-001', name: 'Metro Station', quantum: 38.5, approvalDate: '15-Dec-2022', expiryDate: '14-Dec-2025' },
        { id: 'RJ-2022-APP-005', name: 'Cement Factory', quantum: 55.0, approvalDate: '20-Nov-2022', expiryDate: '19-Nov-2025' },
        { id: 'RJ-2023-APP-010', name: 'Residential Complex', quantum: 8.5, approvalDate: '10-Jan-2023', expiryDate: '09-Jan-2026' }
    ];

    const steps = [
        { id: 1, title: 'Select Application', icon: <FileText size={20} /> },
        { id: 2, title: 'Renewal Details', icon: <RefreshCw size={20} /> },
        { id: 3, title: 'Updated Information', icon: <FileText size={20} /> },
        { id: 4, title: 'Document Upload', icon: <Upload size={20} /> },
        { id: 5, title: 'Declaration', icon: <Send size={20} /> }
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleFileChange = (e, docType) => {
        setFormData({
            ...formData,
            documents: {
                ...formData.documents,
                [docType]: e.target.files[0]
            }
        });
    };

    const removeFile = (docType) => {
        setFormData({
            ...formData,
            documents: {
                ...formData.documents,
                [docType]: null
            }
        });
    };

    const nextStep = () => {
        if (currentStep === 1 && !selectedApplication) {
            alert('Please select an application for renewal');
            return;
        }
        if (currentStep < 5) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const saveAsDraft = () => {
        alert('Renewal application saved as draft!');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.acceptTerms) {
            alert('Please accept the terms and conditions');
            return;
        }
        alert('Renewal application submitted successfully!');
    };

    const selectedApp = eligibleApplications.find(app => app.id === selectedApplication);

    return (
        <div className="renewal-application-container">
            {/* Alert */}
            <div className="alert-section">
                <p className="alert-text">
                    <strong>RAJASTHAN GROUND WATER AUTHORITY (RGWA)</strong>: Apply for renewal at least 60 days before expiry. Ensure all compliance reports are up to date.
                </p>
            </div>

            {/* Stepper */}
            <div className="stepper-container">
                {steps.map((step, index) => (
                    <div key={step.id} className="stepper-item-wrapper">
                        <div className={`stepper-item ${currentStep >= step.id ? 'active' : ''} ${currentStep === step.id ? 'current' : ''}`}>
                            <div className="step-number">
                                {currentStep > step.id ? '✓' : step.id}
                            </div>
                            <div className="step-info">
                                <span className="step-title">{step.title}</span>
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`stepper-line ${currentStep > step.id ? 'active' : ''}`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Form Content */}
            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    {/* Step 1: Select Existing Application */}
                    {currentStep === 1 && (
                        <div className="form-step">
                            <h3 className="step-heading">Select Application for Renewal</h3>

                            <div className="form-group">
                                <label>Choose Existing Application *</label>
                                <select
                                    value={selectedApplication}
                                    onChange={(e) => setSelectedApplication(e.target.value)}
                                    className="form-control"
                                    required
                                >
                                    <option value="">-- Select Application --</option>
                                    {eligibleApplications.map(app => (
                                        <option key={app.id} value={app.id}>
                                            {app.id} - {app.name} (Expires: {app.expiryDate})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedApp && (
                                <div className="app-details-box">
                                    <h4>Current Application Details</h4>
                                    <div className="details-grid">
                                        <div className="detail-item">
                                            <span className="label">Application Code:</span>
                                            <span className="value">{selectedApp.id}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="label">Project Name:</span>
                                            <span className="value">{selectedApp.name}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="label">Approved Quantum:</span>
                                            <span className="value">{selectedApp.quantum} KLD</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="label">Approval Date:</span>
                                            <span className="value">{selectedApp.approvalDate}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="label">Expiry Date:</span>
                                            <span className="value status-warning">{selectedApp.expiryDate}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 2: Renewal Details */}
                    {currentStep === 2 && (
                        <div className="form-step">
                            <h3 className="step-heading">Renewal Details</h3>

                            <div className="form-group">
                                <label>Reason for Renewal *</label>
                                <select
                                    name="renewalReason"
                                    value={formData.renewalReason}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                >
                                    <option value="">Select Reason</option>
                                    <option value="expiry">Approval Expiring</option>
                                    <option value="continuation">Project Continuation</option>
                                    <option value="expansion">Project Expansion</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Renewal Period Requested *</label>
                                <select
                                    name="renewalPeriod"
                                    value={formData.renewalPeriod}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                >
                                    <option value="">Select Period</option>
                                    <option value="1">1 Year</option>
                                    <option value="2">2 Years</option>
                                    <option value="3">3 Years</option>
                                    <option value="5">5 Years</option>
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Renewal From Date *</label>
                                    <input
                                        type="date"
                                        name="renewalFromDate"
                                        value={formData.renewalFromDate}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Renewal To Date *</label>
                                    <input
                                        type="date"
                                        name="renewalToDate"
                                        value={formData.renewalToDate}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Updated Project Details */}
                    {currentStep === 3 && (
                        <div className="form-step">
                            <h3 className="step-heading">Updated Project Information</h3>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Current Approved Quantum (KLD)</label>
                                    <input
                                        type="number"
                                        value={selectedApp?.quantum || ''}
                                        className="form-control"
                                        disabled
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Average Current Extraction (KLD) *</label>
                                    <input
                                        type="number"
                                        name="currentExtraction"
                                        value={formData.currentExtraction}
                                        onChange={handleChange}
                                        className="form-control"
                                        step="0.01"
                                        placeholder="Enter current extraction"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Proposed Quantum for Renewal (KLD) *</label>
                                <input
                                    type="number"
                                    name="proposedExtraction"
                                    value={formData.proposedExtraction}
                                    onChange={handleChange}
                                    className="form-control"
                                    step="0.01"
                                    placeholder="Enter proposed quantum"
                                    required
                                />
                                <small className="form-hint">If requesting increase, provide justification in project changes below</small>
                            </div>

                            <div className="form-group">
                                <label>Project Changes / Updates (if any) *</label>
                                <textarea
                                    name="projectChanges"
                                    value={formData.projectChanges}
                                    onChange={handleChange}
                                    className="form-control"
                                    rows="5"
                                    placeholder="Describe any changes in project scope, capacity, or operations since original approval"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 4: Document Upload */}
                    {currentStep === 4 && (
                        <div className="form-step">
                            <h3 className="step-heading">Upload Required Documents</h3>

                            {[
                                { key: 'renewalApplication', label: 'Renewal Application Letter *', required: true },
                                { key: 'lastComplianceReport', label: 'Last 6 Months Compliance Reports *', required: true },
                                { key: 'updatedProjectReport', label: 'Updated Project Report', required: false },
                                { key: 'noc', label: 'NOC from Local Authority (if applicable)', required: false }
                            ].map(doc => (
                                <div key={doc.key} className="form-group">
                                    <label>{doc.label}</label>
                                    <div className="file-upload-wrapper">
                                        {!formData.documents[doc.key] ? (
                                            <label className="file-upload-label">
                                                <Upload size={20} />
                                                <span>Choose File (PDF, max 5MB)</span>
                                                <input
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={(e) => handleFileChange(e, doc.key)}
                                                    className="file-input"
                                                    required={doc.required}
                                                />
                                            </label>
                                        ) : (
                                            <div className="file-selected">
                                                <FileText size={18} />
                                                <span>{formData.documents[doc.key].name}</span>
                                                <button type="button" onClick={() => removeFile(doc.key)} className="remove-file-btn">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Step 5: Declaration */}
                    {currentStep === 5 && (
                        <div className="form-step">
                            <h3 className="step-heading">Declaration & Submit</h3>

                            <div className="declaration-box">
                                <h4>Declaration</h4>
                                <p>I hereby declare that:</p>
                                <ul>
                                    <li>All compliance reports have been submitted on time</li>
                                    <li>The groundwater extraction has been within approved limits</li>
                                    <li>All information provided is true and correct to the best of my knowledge</li>
                                    <li>I understand that any false information may lead to rejection and legal action</li>
                                </ul>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Applicant Name *</label>
                                    <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} className="form-control" required />
                                </div>

                                <div className="form-group">
                                    <label>Designation *</label>
                                    <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="form-control" required />
                                </div>

                                <div className="form-group">
                                    <label>Date *</label>
                                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-control" required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="acceptTerms"
                                        checked={formData.acceptTerms}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span>I accept the terms and conditions and declare the above information is correct *</span>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="form-actions">
                        <div className="action-left">
                            {currentStep > 1 && (
                                <button type="button" onClick={prevStep} className="btn btn-secondary">
                                    <ChevronLeft size={18} />
                                    Previous
                                </button>
                            )}
                        </div>

                        <div className="action-right">
                            <button type="button" onClick={saveAsDraft} className="btn btn-outline">
                                <Save size={18} />
                                Save as Draft
                            </button>

                            {currentStep < 5 ? (
                                <button type="button" onClick={nextStep} className="btn btn-primary">
                                    Next
                                    <ChevronRight size={18} />
                                </button>
                            ) : (
                                <button type="submit" className="btn btn-success">
                                    <Send size={18} />
                                    Submit Renewal Application
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            <style jsx>{`
        .renewal-application-container {
          padding-bottom: 50px;
        }

        .alert-section {
          background: #fff3cd;
          border-left: 5px solid #ffc107;
          padding: 15px;
          margin-bottom: 25px;
          border-radius: 6px;
        }

        .alert-text {
          color: #856404;
          font-size: 0.9rem;
          margin: 0;
        }

        /* Stepper - Same as ApplicationForm */
        .stepper-container {
          display: flex;
          align-items: center;
          background: white;
          padding: 25px;
          border-radius: 8px;
          margin-bottom: 25px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          overflow-x: auto;
        }

        .stepper-item-wrapper {
          display: flex;
          align-items: center;
          flex: 1;
        }

        .stepper-item {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 150px;
        }

        .step-number {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: #e0e0e0;
          color: #666;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .stepper-item.active .step-number {
          background: #007bff;
          color: white;
        }

        .stepper-item.current .step-number {
          background: #28a745;
          color: white;
        }

        .step-info {
          display: flex;
          flex-direction: column;
        }

        .step-title {
          font-size: 0.85rem;
          font-weight: 500;
          color: #666;
        }

        .stepper-item.active .step-title,
        .stepper-item.current .step-title {
          color: #333;
          font-weight: 600;
        }

        .stepper-line {
          flex: 1;
          height: 2px;
          background: #e0e0e0;
          margin: 0 10px;
        }

        .stepper-line.active {
          background: #007bff;
        }

        /* Form Card */
        .form-card {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .form-step {
          min-height: 400px;
        }

        .step-heading {
          font-size: 1.4rem;
          color: #333;
          margin: 0 0 25px 0;
          padding-bottom: 15px;
          border-bottom: 2px solid #f0f0f0;
        }

        .app-details-box {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 6px;
          margin-top: 20px;
        }

        .app-details-box h4 {
          margin: 0 0 15px 0;
          color: #333;
          font-size: 1rem;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .detail-item .label {
          font-size: 0.85rem;
          color: #666;
          font-weight: 600;
        }

        .detail-item .value {
          font-size: 0.95rem;
          color: #333;
        }

        .status-warning {
          color: #dc3545;
          font-weight: 600;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
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

        .form-control:focus {
          outline: none;
          border-color: #007bff;
        }

        .form-control:disabled {
          background: #f8f9fa;
          cursor: not-allowed;
        }

        textarea.form-control {
          resize: vertical;
          font-family: inherit;
        }

        .form-hint {
          display: block;
          font-size: 0.8rem;
          color: #666;
          margin-top: 5px;
          font-style: italic;
        }

        /* File Upload */
        .file-upload-wrapper {
          border: 2px dashed #ddd;
          border-radius: 6px;
          padding: 20px;
          text-align: center;
          transition: border-color 0.2s;
        }

        .file-upload-wrapper:hover {
          border-color: #007bff;
        }

        .file-upload-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          color: #666;
        }

        .file-input {
          display: none;
        }

        .file-selected {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 4px;
        }

        .remove-file-btn {
          margin-left: auto;
          background: #dc3545;
          color: white;
          border: none;
          padding: 4px;
          border-radius: 4px;
          cursor: pointer;
        }

        /* Declaration */
        .declaration-box {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 6px;
          margin-bottom: 20px;
        }

        .declaration-box h4 {
          margin: 0 0 10px 0;
          color: #333;
        }

        .declaration-box p {
          margin: 0 0 10px 0;
          color: #666;
        }

        .declaration-box ul {
          margin: 0;
          padding-left: 20px;
          color: #666;
          line-height: 1.8;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-weight: 400;
        }

        .checkbox-label input[type="checkbox"] {
          cursor: pointer;
          width: 18px;
          height: 18px;
        }

        /* Form Actions */
        .form-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #f0f0f0;
        }

        .action-left, .action-right {
          display: flex;
          gap: 10px;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #007bff;
          color: white;
        }

        .btn-primary:hover {
          background: #0056b3;
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
        }

        .btn-secondary:hover {
          background: #5a6268;
        }

        .btn-success {
          background: #28a745;
          color: white;
        }

        .btn-success:hover {
          background: #218838;
        }

        .btn-outline {
          background: white;
          color: #007bff;
          border: 2px solid #007bff;
        }

        .btn-outline:hover {
          background: #007bff;
          color: white;
        }
      `}</style>
        </div>
    );
};

export default RenewalApplication;
