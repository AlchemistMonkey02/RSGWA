import React, { useState } from 'react';
import {
    ArrowLeft, ArrowRight, CheckCircle, UploadCloud,
    MapPin, Droplets, Building2, ClipboardCheck,
    ShieldCheck, HelpCircle, HardHat, Shovel,
    RotateCcw, Info, Wallet
} from 'lucide-react';

const UnifiedApplicationEngine = ({ selectedService, onCancel, onComplete, activeCompany }) => {
    const [currentStep, setCurrentStep] = useState(1);

    // Safety check to prevent crash if service is not yet selected
    if (!selectedService) return null;

    const [formData, setFormData] = useState({
        // Common Base Data
        companyName: activeCompany?.name || '',
        district: 'Jaipur',
        block: 'Phagi',
        zone: activeCompany?.zone || 'Safe',

        // Service Specific (Dynamic)
        landOwnership: '',
        latitude: '',
        longitude: '',

        // Industrial/Mining/Infra Specific
        waterDemand: '',
        processDescription: '',
        recyclingPlan: 'Yes',
        pitDepth: '', // Mining specific
        dewateringQty: '', // Mining specific
        projectPhase: 'Construction', // Infra specific

        // Rig Specific
        rigType: 'Direct Rotary',
        rigRegNumber: '',
        operatorExperience: '',

        // Compliance Specific
        meterReading: '',
        complianceMonth: 'January 2026',

        // Enforcement Specific
        violationType: 'Unauthorized Borewell',
        penaltyAcknowledged: false,

        // Lifecycle Specific
        amendmentReason: '',
        lastAuditDate: '',
        preExistingNocId: 'RJ-NOC-102', // Mock pre-fill

        // Detailed Industrial Data
        greenBeltArea: 0,
        roadArea: 0,
        rooftopArea: 0,
        industrialWater: 0,
        domesticWater: 0,
        greenbeltWater: 0,
        recycledWater: 0,
        wasteWaterGenerated: 0,

        // Device Integration
        selectedVendor: '',
        selectedDevice: '',
        telemetryEnabled: true
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newVal = type === 'checkbox' ? checked : value;

        setFormData(prev => {
            const updated = { ...prev, [name]: newVal };

            // Auto-GIS Logic: Derive zone from block
            if (name === 'block') {
                if (value === 'Indergarh') updated.zone = 'Semi-Critical';
                else if (value === 'Bhiwadi') updated.zone = 'Over-Exploited';
                else updated.zone = 'Safe';
            }

            return updated;
        });
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    // Determine dynamic steps based on service Category
    const getServiceType = () => {
        if (selectedService.id.includes('industrial') || selectedService.id.includes('abstraction-industry')) return 'industrial';
        if (selectedService.id.includes('abstraction')) return 'regulatory';
        if (selectedService.id.includes('rig') || selectedService.id.includes('drilling')) return 'infrastructure';
        if (selectedService.id.includes('compliance') || selectedService.id.includes('renewal')) return 'compliance';
        if (selectedService.id.includes('ec-orders') || selectedService.id.includes('violation')) return 'enforcement';
        if (selectedService.category === 'lifecycle') return 'lifecycle';
        return 'special';
    };

    const serviceType = getServiceType();

    const renderStepContent = () => {
        switch (currentStep) {
            case 1: // Common: Profile & Context
                return (
                    <div className="engine-step animated">
                        <div className="step-header">
                            <Building2 size={24} className="text-blue-500" />
                            <div>
                                <h3>Step 1: Applicant Profile & Context</h3>
                                <p>Verify your company details and project location</p>
                            </div>
                        </div>
                        <div className="form-grid">
                            <div className="field">
                                <label>Acting Entity</label>
                                <input type="text" value={formData.companyName} disabled className="bg-light" />
                            </div>
                            <div className="field">
                                <label>District</label>
                                <select name="district" value={formData.district} onChange={handleInputChange}>
                                    <option>Jaipur</option><option>Alwar</option><option>Bhiwadi</option>
                                </select>
                            </div>
                            <div className="field">
                                <label>Hydrological Zone</label>
                                <div className={`zone-pill ${formData.zone.toLowerCase()}`}>{formData.zone} Category Block</div>
                            </div>
                            <div className="field">
                                <label>Block / Tehsil</label>
                                <select name="block" value={formData.block} onChange={handleInputChange}>
                                    <option>Phagi</option><option>Indergarh</option><option>Keshoraipatan</option><option>Bhiwadi</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );

            case 2: // Dynamic: Technical Specifications
                return (
                    <div className="engine-step animated">
                        <div className="step-header">
                            {serviceType === 'regulatory' && <Droplets size={24} className="text-blue-500" />}
                            {serviceType === 'infrastructure' && <HardHat size={24} className="text-slate-600" />}
                            {serviceType === 'compliance' && <ClipboardCheck size={24} className="text-emerald-500" />}
                            <div>
                                <h3>Step 2: {selectedService.title} - Technical Data</h3>
                                <p>Provide specific parameters for this regulatory use-case</p>
                            </div>
                        </div>

                        <div className="form-grid">
                            {serviceType === 'industrial' && (
                                <>
                                    <div className="field full" style={{ gridColumn: 'span 2' }}>
                                        <label>Land Use Statistics (sqm)</label>
                                        <div className="tech-table-wrapper" style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                                            <table className="tech-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                                <thead style={{ background: '#f8fafc' }}>
                                                    <tr>
                                                        <th style={{ padding: '10px', textAlign: 'left', color: '#64748b' }}>Component</th>
                                                        <th style={{ padding: '10px', textAlign: 'left', color: '#64748b' }}>Area (sqm)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr><td style={{ padding: '8px 10px', borderTop: '1px solid #f1f5f9' }}>Green Belt</td><td style={{ padding: '8px 10px', borderTop: '1px solid #f1f5f9' }}><input type="number" name="greenBeltArea" onChange={handleInputChange} style={{ width: '100%', border: 'none', background: 'transparent' }} /></td></tr>
                                                    <tr><td style={{ padding: '8px 10px', borderTop: '1px solid #f1f5f9' }}>Roads / Paved</td><td style={{ padding: '8px 10px', borderTop: '1px solid #f1f5f9' }}><input type="number" name="roadArea" onChange={handleInputChange} style={{ width: '100%', border: 'none', background: 'transparent' }} /></td></tr>
                                                    <tr><td style={{ padding: '8px 10px', borderTop: '1px solid #f1f5f9' }}>Rooftop Area</td><td style={{ padding: '8px 10px', borderTop: '1px solid #f1f5f9' }}><input type="number" name="rooftopArea" onChange={handleInputChange} style={{ width: '100%', border: 'none', background: 'transparent' }} /></td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label>Industrial Process req (KLD)</label>
                                        <input type="number" name="industrialWater" onChange={handleInputChange} />
                                    </div>
                                    <div className="field">
                                        <label>Domestic req (KLD)</label>
                                        <input type="number" name="domesticWater" onChange={handleInputChange} />
                                    </div>
                                    <div className="field">
                                        <label>Wastewater Gen (KLD)</label>
                                        <input type="number" name="wasteWaterGenerated" onChange={handleInputChange} />
                                    </div>
                                    <div className="field">
                                        <label>Treated water reuse (KLD)</label>
                                        <input type="number" name="recycledWater" onChange={handleInputChange} />
                                    </div>
                                </>
                            )}

                            {serviceType === 'infrastructure' && (
                                <>
                                    <div className="field">
                                        <label>Rig Specification / Model</label>
                                        <input type="text" name="rigRegNumber" placeholder="Model or Registration No." onChange={handleInputChange} />
                                    </div>
                                    <div className="field">
                                        <label>Drilling Technology</label>
                                        <select name="rigType" value={formData.rigType} onChange={handleInputChange}>
                                            <option>Direct Rotary</option><option>DTH (Down-The-Hole)</option><option>Reverse Rotary</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {serviceType === 'compliance' && (
                                <>
                                    <div className="field">
                                        <label>Month of Reporting</label>
                                        <input type="text" value={formData.complianceMonth} disabled className="bg-light" />
                                    </div>
                                    <div className="field">
                                        <label>Main Flow Meter Reading (Cumulative)</label>
                                        <input type="number" name="meterReading" placeholder="Reading in KL" onChange={handleInputChange} />
                                    </div>
                                </>
                            )}

                            {serviceType === 'lifecycle' && (
                                <>
                                    <div className="field">
                                        <label>Existing NOC ID Reference</label>
                                        <input type="text" value={formData.preExistingNocId} disabled className="bg-light" />
                                    </div>
                                    {selectedService.id === 'noc-amendment' && (
                                        <div className="field full">
                                            <label>Justification for Amendment</label>
                                            <textarea
                                                name="amendmentReason"
                                                value={formData.amendmentReason}
                                                onChange={handleInputChange}
                                                placeholder="Please specify why the license needs modification (e.g., change in ownership, capacity expansion)..."
                                            ></textarea>
                                        </div>
                                    )}
                                    {selectedService.id === 'noc-renewal' && (
                                        <div className="field">
                                            <label>Date of Last Water Audit</label>
                                            <input type="date" name="lastAuditDate" onChange={handleInputChange} />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                );

            case 3: // Documentation & Payment Points
                return (
                    <div className="engine-step animated">
                        <div className="step-header">
                            <UploadCloud size={24} className="text-indigo-500" />
                            <div>
                                <h3>Step 3: Document Vault & Revenue Compliance</h3>
                                <p>Upload mandatory proof and verify processing charges</p>
                            </div>
                        </div>

                        <div className="upload-section">
                            <div className="upload-item">
                                <div className="u-icon"><ShieldCheck size={18} /></div>
                                <div className="u-info">
                                    <strong>Statutory Authorization</strong>
                                    <p>Consent to Establish / Mining Lease / RIICO Allotment</p>
                                </div>
                                <button className="btn-upload">Upload PDF</button>
                            </div>

                            {(parseInt(formData.industrialWater) + parseInt(formData.domesticWater) > 500) && (
                                <div className="upload-item" style={{ border: '1.5px solid #f97316', background: '#fff7ed' }}>
                                    <div className="u-icon" style={{ color: '#f97316' }}><ClipboardCheck size={18} /></div>
                                    <div className="u-info">
                                        <strong>Hydrogeological Report</strong>
                                        <p>Mandatory for abstraction &gt; 500 m³/day (Rekart Threshold)</p>
                                    </div>
                                    <button className="btn-upload" style={{ color: '#f97316', borderColor: '#f97316' }}>Upload PDF</button>
                                </div>
                            )}

                            <div className="upload-item">
                                <div className="u-icon"><MapPin size={18} /></div>
                                <div className="u-info">
                                    <strong>Site Layout & Location</strong>
                                    <p>GIS validated site plan with block markers</p>
                                </div>
                                <button className="btn-upload">Upload JPEG/PDF</button>
                            </div>

                            {/* Mandatory for Accumax Devices */}
                            {(formData.selectedDevice === 'M-ACC-EMF' || formData.selectedDevice === 'M-ACC-DWLR') && (
                                <>
                                    <div className="upload-item" style={{ border: '1.5px solid #3b82f6', background: '#eff6ff' }}>
                                        <div className="u-icon" style={{ color: '#3b82f6' }}><Shield size={18} /></div>
                                        <div className="u-info">
                                            <strong>NABL Calibration Certificate</strong>
                                            <p>Mandatory for CGWA Compliance (Accumax Series)</p>
                                        </div>
                                        <button className="btn-upload" style={{ color: '#3b82f6', borderColor: '#3b82f6' }}>Upload PDF</button>
                                    </div>
                                </>
                            )}

                            {/* Lifecycle documents */}
                            {selectedService.id === 'noc-renewal' && (
                                <div className="upload-item" style={{ border: '1.5px solid #10b981', background: '#ecfdf5' }}>
                                    <div className="u-icon" style={{ color: '#10b981' }}><ClipboardCheck size={18} /></div>
                                    <div className="u-info">
                                        <strong>Cumulative Water Audit Report</strong>
                                        <p>Mandatory for renewals as per 2023 Guidelines</p>
                                    </div>
                                    <button className="btn-upload" style={{ color: '#10b981', borderColor: '#10b981' }}>Upload PDF</button>
                                </div>
                            )}
                        </div>

                        <div className="revenue-summary">
                            <div className="rev-head"><Wallet size={16} /> Estimated Dues</div>
                            <div className="rev-list">
                                <div className="rev-item"><span>Processing Fee</span><strong>₹ 10,000</strong></div>
                                <div className="rev-item"><span>Annual Abstraction (Est)</span><strong>₹ 35,000</strong></div>
                                <div className="rev-item total"><span>Final Total Payable</span><strong>₹ 45,000</strong></div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="success-step animated">
                        <div className="success-icon"><CheckCircle size={80} className="text-emerald-500" /></div>
                        <div className="success-actions">
                            <button className="btn-primary" onClick={() => onComplete({
                                refId: `RAJ-GW-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                                serviceId: selectedService.id,
                                title: selectedService.title
                            })}>Back to Dashboard</button>
                            <button className="btn-outline">Download Acknowledgement</button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="engine-container">
            <div className="engine-sidebar">
                <div className="service-badge">
                    <div className="svc-icon">{selectedService.icon}</div>
                    <div className="svc-info">
                        <strong>{selectedService.title}</strong>
                        <span>Portal Engine v2.0</span>
                    </div>
                </div>

                <div className="engine-nav">
                    {[1, 2, 3].map(s => (
                        <div
                            key={s}
                            className={`nav-item ${currentStep === s ? 'active' : ''} ${currentStep > s ? 'done' : ''}`}
                            onClick={() => setCurrentStep(s)}
                        >
                            <div className="nav-num">{currentStep > s ? <CheckCircle size={16} /> : s}</div>
                            <span>{s === 1 ? 'Profile' : s === 2 ? 'Technical' : 'Compliance'}</span>
                        </div>
                    ))}
                </div>

                <div className="engine-help">
                    <div className="help-card">
                        <HelpCircle size={18} />
                        <p>Need help with <strong>{selectedService.title}</strong>? Contact our helpdesk at 1800-RAJ-GW.</p>
                    </div>
                </div>
            </div>

            <div className="engine-viewport">
                <div className="viewport-header">
                    <button onClick={onCancel} className="btn-icon-text"><ArrowLeft size={16} /> Exit Editor</button>
                    <div className="step-counter">Step {currentStep} of 3</div>
                </div>

                <div className="viewport-body">
                    {renderStepContent()}
                </div>

                {currentStep <= 3 && (
                    <div className="viewport-footer">
                        <button onClick={prevStep} disabled={currentStep === 1} className="btn-secondary">Back</button>
                        <button onClick={nextStep} className="btn-primary">
                            {currentStep === 3 ? 'Final Submit & Pay' : 'Save & Continue'} <ArrowRight size={18} />
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
                .engine-container { 
                    display: flex; 
                    height: 100%; 
                    background: white; 
                    border-radius: 32px; 
                    overflow: hidden; 
                    border: 1px solid var(--border-light); 
                    box-shadow: var(--shadow-premium); 
                }
                
                .engine-sidebar { 
                    width: 320px; 
                    background: #0f172a; /* Grey Black / Slate 900 */
                    border-right: 1px solid rgba(255,255,255,0.1); 
                    padding: 40px; 
                    display: flex; 
                    flex-direction: column; 
                    gap: 60px; 
                    color: white;
                }

                .service-badge { 
                    display: flex; 
                    gap: 16px; 
                    align-items: center; 
                    background: rgba(255,255,255,0.05); /* Glassy Dark */
                    padding: 16px;
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.1);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                }
                .svc-icon { 
                    width: 48px; 
                    height: 48px; 
                    background: rgba(255,255,255,0.1); 
                    border-radius: 14px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    color: white;
                }
                .svc-info strong { display: block; font-size: 1rem; color: white; font-weight: 850; letter-spacing: -0.5px; }
                .svc-info span { font-size: 0.7rem; color: rgba(255,255,255,0.5); font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
                
                .engine-nav { display: flex; flex-direction: column; gap: 24px; }
                .nav-item { 
                    display: flex; 
                    align-items: center; 
                    gap: 16px; 
                    color: rgba(255,255,255,0.6); 
                    font-weight: 700; 
                    font-size: 0.95rem; 
                    padding: 12px;
                    border-radius: 12px;
                    transition: all 0.3s;
                    cursor: pointer;
                    opacity: 1; 
                    border: 1px solid transparent;
                }
                .nav-item:hover { background: rgba(255,255,255,0.1); color: white; }
                
                .nav-item.active { 
                    background: white; /* Contrast pop against dark sidebar */
                    color: #0f172a; 
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                    transform: translateX(5px); 
                    border-color: white;
                }
                .nav-item.done { color: #34d399; }
                
                .nav-num { 
                    width: 36px; 
                    height: 36px; 
                    border-radius: 10px; 
                    border: 2px solid rgba(255,255,255,0.2); 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-size: 0.9rem; 
                    font-weight: 900;
                    background: transparent;
                    color: white;
                    transition: all 0.3s;
                }
                .nav-item.active .nav-num { 
                    border-color: #0f172a; 
                    background: #0f172a; 
                    color: white; 
                    box-shadow: none; 
                }
                .nav-item.done .nav-num { 
                    border-color: #34d399; 
                    background: #34d399; 
                    color: #064e3b; 
                }
                
                .engine-viewport { flex: 1; display: flex; flex-direction: column; background: white; }
                .viewport-header { 
                    padding: 24px 48px; 
                    border-bottom: 1px solid var(--border-light); 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                }
                .btn-icon-text { border: none; background: transparent; color: var(--text-muted); font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 10px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
                .step-counter { font-size: 0.75rem; font-weight: 900; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px; }
                
                .viewport-body { flex: 1; padding: 48px; overflow-y: auto; }
                .step-header { margin-bottom: 40px; }
                .step-header h3 { font-size: 1.8rem; font-weight: 850; color: var(--primary); margin: 0 0 8px 0; letter-spacing: -0.5px; }
                .step-header p { margin: 0; color: var(--text-muted); font-weight: 600; font-size: 1.05rem; }
                
                .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
                .field { display: flex; flex-direction: column; gap: 10px; }
                .field label { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
                .field input, .field select, .field textarea { 
                    padding: 14px 18px; 
                    border-radius: 12px; 
                    border: 1.5px solid #e2e8f0; 
                    outline: none; 
                    font-size: 1rem; 
                    font-weight: 600;
                    color: var(--text-main);
                    transition: all 0.2s;
                    background: #f1f5f9; /* Definitive Light Grey, not white */
                }
                .field input:focus, .field select:focus, .field textarea:focus { 
                    border-color: var(--accent); 
                    background: white; 
                    box-shadow: 0 0 0 4px var(--accent-glow); 
                }
                .field textarea { height: 120px; resize: none; grid-column: span 2; }
                .bg-light { background: #f1f5f9!important; cursor: not-allowed; color: #64748b; }
                
                .zone-pill { display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; border-radius: 14px; font-weight: 850; font-size: 0.9rem; background: #f1f5f9; color: #64748b; }
                .zone-pill.safe { background: hsla(158, 64%, 95%, 1); color: var(--success); border: 1px solid hsla(158, 64%, 52%, 0.2); }
                .zone-pill.semi-critical { background: #fff7ed; color: #f97316; border: 1px solid rgba(249, 115, 22, 0.2); }
                .zone-pill.over-exploited { background: #fef2f2; color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); }
                
                .upload-section { display: grid; gap: 20px; margin-bottom: 40px; }
                .upload-item { 
                    display: flex; 
                    align-items: center; 
                    gap: 20px; 
                    background: white; 
                    padding: 24px; 
                    border-radius: 20px; 
                    border: 2px dashed #cbd5e1; 
                    transition: all 0.3s;
                }
                .upload-item:hover { border-color: var(--accent); background: hsla(210, 40%, 96%, 0.5); }
                .u-icon { 
                    width: 48px; height: 48px; background: white; border-radius: 14px; 
                    display: flex; align-items: center; justify-content: center; 
                    color: var(--accent); box-shadow: 0 4px 8px rgba(0,0,0,0.02);
                }
                .u-info strong { display: block; font-size: 1rem; color: var(--primary); font-weight: 800; }
                .u-info p { margin: 4px 0 0; font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }
                .btn-upload { background: white; border: 1.5px solid var(--border-light); padding: 10px 20px; border-radius: 12px; font-weight: 800; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; }
                .btn-upload:hover { border-color: var(--accent); color: var(--accent); }
                
                .revenue-summary { 
                    background: var(--primary); 
                    color: white; 
                    border-radius: 28px; 
                    padding: 32px; 
                    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.1);
                    position: relative;
                    overflow: hidden;
                }
                .revenue-summary::before {
                    content: ''; position: absolute; top: 0; right: 0; width: 100px; height: 100px;
                    background: linear-gradient(135deg, transparent, rgba(37, 99, 235, 0.1));
                    border-radius: 0 0 0 100%;
                }
                .rev-head { font-size: 0.8rem; font-weight: 900; color: var(--info); text-transform: uppercase; margin-bottom: 24px; display: flex; align-items: center; gap: 10px; letter-spacing: 1px; }
                .rev-list { display: flex; flex-direction: column; gap: 16px; }
                .rev-item { display: flex; justify-content: space-between; font-size: 1rem; font-weight: 500; color: #94a3b8; }
                .rev-item.total { border-top: 1px solid var(--primary-light); padding-top: 20px; margin-top: 10px; font-size: 1.4rem; font-weight: 950; color: var(--success); }
                
                .viewport-footer { padding: 32px 48px; border-top: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; }
                .btn-primary { background: var(--accent); color: white; border: none; padding: 16px 32px; border-radius: 16px; font-weight: 800; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: all 0.3s; box-shadow: 0 8px 20px var(--accent-glow); }
                .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 24px var(--accent-glow); }
                .btn-secondary { background: var(--bg-body); color: var(--text-muted); border: 1px solid var(--border-light); padding: 16px 32px; border-radius: 16px; font-weight: 800; cursor: pointer; transition: all 0.2s; }
                .btn-secondary:hover { background: white; color: var(--text-main); }
                
                .success-step { text-align: center; padding: 80px 0; }
                .success-step h2 { font-size: 2.4rem; font-weight: 950; color: var(--primary); margin: 30px 0 12px; letter-spacing: -1px; }
                .success-step p { font-size: 1.15rem; color: var(--text-muted); max-width: 500px; margin: 0 auto; line-height: 1.7; }
                
                .animated { animation: premiumEntry 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
                @keyframes premiumEntry {
                    from { opacity: 0; transform: translateY(20px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
};

export default UnifiedApplicationEngine;
