import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Save, Send, Upload, X, FileText, Sparkles, MapPin } from 'lucide-react';
import AIComplianceChecker from '../components/AIComplianceChecker';

const ApplicationForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Application Type
        applicationType: '',
        projectName: '',
        purpose: '',

        // Step 2: Project Details
        state: '',
        district: '',
        tehsil: '',
        village: '',
        pincode: '',
        latitude: '',
        longitude: '',
        plotNumber: '',
        surveyNumber: '',
        totalArea: '',

        // Step 3: Water Requirement
        quantumKLD: '',
        extractionPurpose: '',
        sourceType: '',
        existingWells: '',
        proposedWells: '',
        depthOfWells: '',

        // Meter Details
        meterModel: '',
        meterSerial: '',

        // Step 4: Documents
        documents: {
            projectReport: null,
            sitePlan: null,
            noc: null,
            others: null
        },

        // Step 5: Declaration
        acceptTerms: false,
        applicantName: '',
        designation: '',
        date: ''
    });

    const steps = [
        { id: 1, title: 'Application Type', icon: <FileText size={20} /> },
        { id: 2, title: 'Project Details', icon: <FileText size={20} /> },
        { id: 3, title: 'Water Requirement', icon: <FileText size={20} /> },
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
        if (currentStep < 5) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const saveAsDraft = () => {
        alert('Application saved as draft!');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.acceptTerms) {
            alert('Please accept the terms and conditions');
            return;
        }
        alert('Application submitted successfully!');
    };

    return (
        <div className="application-form-container">
            {/* Alert */}
            <div className="alert-section">
                <p className="alert-text">
                    <strong>RAJASTHAN GROUND WATER AUTHORITY (RGWA)</strong>: Please fill all mandatory fields marked with (*). Save your progress using "Save as Draft" button.
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
            <div className="layout-grid">
                <div className="form-card">
                    <form onSubmit={handleSubmit}>
                        {/* Step 1: Application Type */}
                        {currentStep === 1 && (
                            <div className="form-step">
                                <h3 className="step-heading">Application Type</h3>

                                <div className="form-group">
                                    <label>Select Application Type *</label>
                                    <div className="radio-group">
                                        {['Industrial', 'Infrastructure', 'Mining', 'Domestic'].map(type => (
                                            <label key={type} className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="applicationType"
                                                    value={type}
                                                    checked={formData.applicationType === type}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <span>{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Project Name *</label>
                                    <input
                                        type="text"
                                        name="projectName"
                                        value={formData.projectName}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter project name"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Purpose of Groundwater Extraction *</label>
                                    <select
                                        name="purpose"
                                        value={formData.purpose}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    >
                                        <option value="">Select Purpose</option>
                                        <option value="drinking">Drinking Water Supply</option>
                                        <option value="industrial">Industrial Use</option>
                                        <option value="irrigation">Irrigation</option>
                                        <option value="construction">Construction</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Project Details */}
                        {currentStep === 2 && (
                            <div className="form-step">
                                <h3 className="step-heading">Project Location Details</h3>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>State *</label>
                                        <select name="state" value={formData.state} onChange={handleChange} className="form-control" required>
                                            <option value="">Select State</option>
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>District *</label>
                                        <select name="district" value={formData.district} onChange={handleChange} className="form-control" required>
                                            <option value="">Select District</option>
                                            <option value="Jaipur">Jaipur</option>
                                            <option value="Jodhpur">Jodhpur</option>
                                            <option value="Udaipur">Udaipur</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Tehsil *</label>
                                        <input type="text" name="tehsil" value={formData.tehsil} onChange={handleChange} className="form-control" required />
                                    </div>

                                    <div className="form-group">
                                        <label>Village *</label>
                                        <input type="text" name="village" value={formData.village} onChange={handleChange} className="form-control" required />
                                    </div>

                                    <div className="form-group">
                                        <label>PIN Code *</label>
                                        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="form-control" maxLength="6" required />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Latitude *</label>
                                        <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} className="form-control" placeholder="e.g., 26.9124" required />
                                    </div>

                                    <div className="form-group">
                                        <label>Longitude *</label>
                                        <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} className="form-control" placeholder="e.g., 75.7873" required />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Plot Number</label>
                                        <input type="text" name="plotNumber" value={formData.plotNumber} onChange={handleChange} className="form-control" />
                                    </div>

                                    <div className="form-group">
                                        <label>Survey Number</label>
                                        <input type="text" name="surveyNumber" value={formData.surveyNumber} onChange={handleChange} className="form-control" />
                                    </div>

                                    <div className="form-group">
                                        <label>Total Area (in hectares) *</label>
                                        <input type="number" name="totalArea" value={formData.totalArea} onChange={handleChange} className="form-control" step="0.01" required />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Water Requirement */}
                        {currentStep === 3 && (
                            <div className="form-step">
                                <h3 className="step-heading">Water Requirement Details</h3>

                                <div className="form-group">
                                    <label>Quantum of Groundwater Required (KLD) *</label>
                                    <input
                                        type="number"
                                        name="quantumKLD"
                                        value={formData.quantumKLD}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter quantity in KLD"
                                        step="0.01"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Purpose of Extraction *</label>
                                    <textarea
                                        name="extractionPurpose"
                                        value={formData.extractionPurpose}
                                        onChange={handleChange}
                                        className="form-control"
                                        rows="3"
                                        placeholder="Describe the purpose"
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Source Type *</label>
                                        <select name="sourceType" value={formData.sourceType} onChange={handleChange} className="form-control" required>
                                            <option value="">Select Source</option>
                                            <option value="borewell">Borewell</option>
                                            <option value="openwell">Open Well</option>
                                            <option value="tubewell">Tube Well</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Number of Existing Wells</label>
                                        <input type="number" name="existingWells" value={formData.existingWells} onChange={handleChange} className="form-control" />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Number of Proposed Wells *</label>
                                        <input type="number" name="proposedWells" value={formData.proposedWells} onChange={handleChange} className="form-control" required />
                                    </div>

                                    <div className="form-group">
                                        <label>Depth of Wells (in meters) *</label>
                                        <input type="number" name="depthOfWells" value={formData.depthOfWells} onChange={handleChange} className="form-control" step="0.1" required />
                                    </div>
                                </div>

                                <div className="meter-selection-block">
                                    <h4><Activity size={18} /> Mandatory Water Meter Selection</h4>
                                    <p className="text-secondary mb-4">As per RGWA guidelines, all abstraction points must be fitted with government-approved digital flow meters.</p>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Select Approved Meter Model *</label>
                                            <select name="meterModel" value={formData.meterModel} onChange={handleChange} className="form-control" required>
                                                <option value="">-- Select Model --</option>
                                                <option value="M-101">FlowMaster FM-200 (Digital)</option>
                                                <option value="M-102">AquaTech AT-Ultra (Ultrasonic)</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Meter Serial Number *</label>
                                            <input
                                                type="text"
                                                name="meterSerial"
                                                value={formData.meterSerial}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Enter Serial (e.g. SN-XXXXX)"
                                                required
                                            />
                                            <span className="input-hint">Meter must be pre-registered by an authorized vendor.</span>
                                        </div>
                                    </div>
                                </div>

                                <style jsx>{`
                                    .meter-selection-block {
                                        margin-top: 30px;
                                        padding: 20px;
                                        background: #f0f7ff;
                                        border: 1px solid #c2e0ff;
                                        border-radius: 12px;
                                    }
                                    .meter-selection-block h4 {
                                        display: flex;
                                        align-items: center;
                                        gap: 10px;
                                        color: #0056b3;
                                        margin-bottom: 10px;
                                    }
                                    .input-hint {
                                        font-size: 0.75rem;
                                        color: #64748b;
                                        margin-top: 5px;
                                        display: block;
                                    }
                                `}</style>
                            </div>
                        )}

                        {/* Step 4: Document Upload */}
                        {currentStep === 4 && (
                            <div className="form-step">
                                <h3 className="step-heading">Upload Documents</h3>

                                {[
                                    { key: 'projectReport', label: 'Project Report *', required: true },
                                    { key: 'sitePlan', label: 'Site Plan *', required: true },
                                    { key: 'noc', label: 'NOC from Local Authority', required: false },
                                    { key: 'others', label: 'Other Supporting Documents', required: false }
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
                                    <p>I hereby declare that the information provided above is true and correct to the best of my knowledge. I understand that any false information may lead to rejection of the application and legal action.</p>
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
                                        <span>I accept the terms and conditions *</span>
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
                                        Submit Application
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                {/* AI Assistant Sidebar */}
                <div className="assistant-sidebar">
                    <AIComplianceChecker formData={formData} currentStep={currentStep} />
                </div>
            </div>

            <style jsx>{`
        .application-form-container {
          padding-bottom: 50px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .layout-grid {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 25px;
          align-items: flex-start;
        }

        @media (max-width: 1024px) {
          .layout-grid {
            grid-template-columns: 1fr;
          }
        }

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

        /* Stepper */
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

        textarea.form-control {
          resize: vertical;
          font-family: inherit;
        }

        .radio-group {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .radio-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-weight: 400;
        }

        .radio-label input[type="radio"] {
          cursor: pointer;
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
          margin: 0;
          color: #666;
          line-height: 1.6;
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

export default ApplicationForm;
