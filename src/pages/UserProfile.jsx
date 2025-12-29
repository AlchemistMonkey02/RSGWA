import React, { useState } from 'react';
import { Save, X, Edit2, Edit, Send, Check, Calendar } from 'lucide-react';

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: 'Dr. Saket Sharma',
        mobile: '9314887830',
        pan: 'AAFCS5921E',
        aadhaar: 'XXXX-XXXX-8830',
        dob: '1985-05-15',
        email: 'sakethospitaljaipur@gmail.com',
        address: 'Sector 10, Meera Marg, Agarwal Farm, Mansarovar',
        state: 'RAJASTHAN',
        district: 'JAIPUR',
        pincode: '302020'
    });

    const [originalData, setOriginalData] = useState({ ...formData });

    // OTP states
    const [otpModal, setOtpModal] = useState({
        show: false,
        field: '',
        sentTo: '',
        otp: '',
        verified: false
    });

    const [otpVerifications, setOtpVerifications] = useState({
        mobile: false,
        email: false,
        pan: false
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const checkIfSensitiveFieldChanged = () => {
        const changes = [];
        if (formData.mobile !== originalData.mobile) changes.push('mobile');
        if (formData.email !== originalData.email) changes.push('email');
        if (formData.pan !== originalData.pan) changes.push('pan');
        return changes;
    };

    const sendOTP = (field) => {
        let sentTo = '';
        if (field === 'mobile') {
            sentTo = originalData.mobile;
        } else if (field === 'email') {
            sentTo = originalData.email;
        } else if (field === 'pan') {
            sentTo = originalData.mobile;
        }

        const mockOTP = Math.floor(100000 + Math.random() * 900000).toString();

        setOtpModal({
            show: true,
            field: field,
            sentTo: sentTo,
            otp: '',
            verified: false,
            generatedOTP: mockOTP
        });

        alert(`Verification code sent to ${sentTo}. (Demo Code: ${mockOTP})`);
    };

    const verifyOTP = () => {
        if (otpModal.otp === otpModal.generatedOTP) {
            setOtpVerifications({
                ...otpVerifications,
                [otpModal.field]: true
            });
            setOtpModal({ ...otpModal, show: false, verified: true });
            alert(`${otpModal.field.toUpperCase()} verified successfully!`);
        } else {
            alert('Invalid code. Please try again.');
        }
    };

    const handleUpdate = () => {
        const changedFields = checkIfSensitiveFieldChanged();

        if (changedFields.length > 0) {
            const allVerified = changedFields.every(field => otpVerifications[field]);

            if (!allVerified) {
                const unverifiedField = changedFields.find(field => !otpVerifications[field]);
                alert(`Please verify your ${unverifiedField.toUpperCase()} identity via secure channel before updating.`);
                sendOTP(unverifiedField);
                return;
            }
        }

        setOriginalData({ ...formData });
        setIsEditing(false);
        setOtpVerifications({ mobile: false, email: false, pan: false });
        alert('Your personal profile has been updated successfully!');
    };

    const handleCancel = () => {
        setFormData({ ...originalData });
        setIsEditing(false);
        setOtpVerifications({ mobile: false, email: false, pan: false });
    };

    const handleEdit = () => {
        setIsEditing(true);
        setOtpVerifications({ mobile: false, email: false, pan: false });
    };

    return (
        <div className="user-profile-container animated fadeIn">
            {/* Alert Section */}
            <div className="alert-section">
                <p className="alert-text">
                    <strong>Identity Notice:</strong> Updating sensitive fields (Mobile, PAN, Email) requires secure multi-factor verification as per RGWA Privacy Policy 2024.
                </p>
            </div>

            {/* Editable Form Section */}
            <div className="profile-form-card">
                <div className="form-row">
                    <div className="form-group">
                        <label>FULL NAME*</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>MOBILE NUMBER*</label>
                        <div className="input-with-verify">
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="form-control"
                            />
                            {isEditing && formData.mobile !== originalData.mobile && (
                                <button
                                    type="button"
                                    className={`verify-btn ${otpVerifications.mobile ? 'verified' : ''}`}
                                    onClick={() => sendOTP('mobile')}
                                    disabled={otpVerifications.mobile}
                                >
                                    {otpVerifications.mobile ? <><Check size={14} /> Verified</> : <><Send size={14} /> Verify</>}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>AADHAAR NUMBER (ID)*</label>
                        <input
                            type="text"
                            name="aadhaar"
                            value={formData.aadhaar}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="form-control"
                            placeholder="XXXX-XXXX-XXXX"
                        />
                    </div>

                    <div className="form-group">
                        <label>PAN CARD NO*</label>
                        <div className="input-with-verify">
                            <input
                                type="text"
                                name="pan"
                                value={formData.pan}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="form-control"
                            />
                            {isEditing && formData.pan !== originalData.pan && (
                                <button
                                    type="button"
                                    className={`verify-btn ${otpVerifications.pan ? 'verified' : ''}`}
                                    onClick={() => sendOTP('pan')}
                                    disabled={otpVerifications.pan}
                                >
                                    {otpVerifications.pan ? <><Check size={14} /> Verified</> : <><Send size={14} /> Verify</>}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group full-width">
                        <label>PERSONAL E-MAIL*</label>
                        <div className="input-with-verify">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="form-control"
                            />
                            {isEditing && formData.email !== originalData.email && (
                                <button
                                    type="button"
                                    className={`verify-btn ${otpVerifications.email ? 'verified' : ''}`}
                                    onClick={() => sendOTP('email')}
                                    disabled={otpVerifications.email}
                                >
                                    {otpVerifications.email ? <><Check size={14} /> Verified</> : <><Send size={14} /> Verify</>}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>DATE OF BIRTH*</label>
                        <div className="input-with-icon">
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="form-control"
                            />
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label>RESIDENTIAL ADDRESS*</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>STATE*</label>
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="form-control"
                        >
                            <option value="RAJASTHAN">RAJASTHAN</option>
                            <option value="DELHI">DELHI</option>
                            <option value="MAHARASHTRA">MAHARASHTRA</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>DISTRICT*</label>
                        <select
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="form-control"
                        >
                            <option value="JAIPUR">JAIPUR</option>
                            <option value="JODHPUR">JODHPUR</option>
                            <option value="UDAIPUR">UDAIPUR</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>PIN CODE*</label>
                        <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="form-control"
                            maxLength="6"
                        />
                    </div>
                </div>

                <div className="form-actions">
                    {!isEditing ? (
                        <button className="btn btn-primary" onClick={handleEdit}>
                            <Edit2 size={16} />
                            Edit Profile Details
                        </button>
                    ) : (
                        <>
                            <button className="btn btn-success" onClick={handleUpdate}>
                                Save Changes
                            </button>
                            <button className="btn btn-secondary" onClick={handleCancel}>
                                <X size={16} />
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* OTP Modal */}
            {otpModal.show && (
                <div className="modal-overlay" onClick={() => setOtpModal({ ...otpModal, show: false })}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Secure Verification</h3>
                        <p className="modal-subtitle">
                            A code has been sent to <strong>{otpModal.sentTo}</strong> to verify this change.
                        </p>

                        <div className="otp-input-group">
                            <label>Enter Verification Code</label>
                            <input
                                type="text"
                                value={otpModal.otp}
                                onChange={(e) => setOtpModal({ ...otpModal, otp: e.target.value })}
                                placeholder="XXXXXX"
                                maxLength="6"
                                className="otp-input"
                                autoFocus
                            />
                        </div>

                        <div className="modal-actions">
                            <button className="btn btn-primary" onClick={verifyOTP}>
                                Verify & Proceed
                            </button>
                            <button className="btn btn-link" onClick={() => sendOTP(otpModal.field)}>
                                Resend Code
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* User Details Table */}
            <div className="table-section">
                <h3 className="section-title">Verified Individual Profile</h3>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>FULL NAME</th>
                                <th>MOBILE</th>
                                <th>PAN CARD</th>
                                <th>AADHAAR</th>
                                <th>DOB</th>
                                <th>RESIDENTIAL ADDRESS</th>
                                <th>STATE</th>
                                <th>DISTRICT</th>
                                <th>PIN</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{formData.fullName}</td>
                                <td>{formData.mobile}</td>
                                <td>{formData.pan}</td>
                                <td>{formData.aadhaar}</td>
                                <td>{formData.dob}</td>
                                <td>{formData.address}</td>
                                <td>{formData.state}</td>
                                <td>{formData.district}</td>
                                <td>{formData.pincode}</td>
                                <td style={{ minWidth: '100px' }}>
                                    <button className="btn-edit" onClick={handleEdit}>
                                        <Edit size={14} />
                                        Update
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx>{`
        .user-profile-container {
          padding-bottom: 20px;
        }

        .animated { animation-duration: 0.6s; animation-fill-mode: both; }
        .fadeIn { animation-name: fadeIn; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .alert-section {
          background: #eef2ff;
          border-left: 5px solid #4f46e5;
          padding: 16px;
          margin-bottom: 25px;
          border-radius: 8px;
        }

        .alert-text {
          color: #3730a3;
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.5;
        }

        .profile-form-card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
          margin-bottom: 35px;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
          margin-bottom: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748b;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .input-with-verify {
          position: relative;
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .form-control {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.95rem;
          transition: all 0.2s;
          background: #f8fafc;
        }

        .form-control:focus {
          outline: none;
          border-color: #4f46e5;
          background: white;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .form-control:disabled {
          background-color: #f1f5f9;
          cursor: not-allowed;
          color: #475569;
        }

        .verify-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 18px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .verify-btn:not(.verified) {
          background: #4f46e5;
          color: white;
        }

        .verify-btn:not(.verified):hover {
          background: #4338ca;
          transform: translateY(-1px);
        }

        .verify-btn.verified {
          background: #10b981;
          color: white;
          cursor: default;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-start;
          margin-top: 15px;
          padding-top: 20px;
          border-top: 1px solid #f1f5f9;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #4f46e5;
          color: white;
          box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);
        }

        .btn-primary:hover {
          background: #4338ca;
          transform: translateY(-1px);
          box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3);
        }

        .btn-success {
          background: #10b981;
          color: white;
        }

        .btn-success:hover {
          background: #059669;
        }

        .btn-secondary {
          background: #94a3b8;
          color: white;
        }

        .btn-secondary:hover {
          background: #64748b;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 40px;
          border-radius: 20px;
          max-width: 450px;
          width: 90%;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          text-align: center;
        }

        .modal-content h3 {
          margin: 0 0 12px 0;
          color: #1e293b;
          font-size: 1.5rem;
          font-weight: 800;
        }

        .modal-subtitle {
          color: #64748b;
          font-size: 0.95rem;
          margin: 0 0 30px 0;
          line-height: 1.5;
        }

        .otp-input-group { margin-bottom: 30px; }
        .otp-input-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 700;
          color: #64748b;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .otp-input {
          width: 100%;
          padding: 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 2rem;
          text-align: center;
          font-weight: 800;
          letter-spacing: 12px;
          color: #4f46e5;
        }

        .otp-input:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
        }

        .modal-actions {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .btn-link {
          background: none;
          border: none;
          color: #4f46e5;
          text-decoration: none;
          padding: 10px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
        }

        .btn-link:hover { color: #3730a3; text-decoration: underline; }

        /* Table Section */
        .table-section {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        }

        .section-title {
          color: #1e293b;
          margin: 0 0 20px 0;
          font-weight: 800;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .table-container {
          overflow-x: auto;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1300px;
        }

        th {
          background-color: #1e293b;
          color: white;
          padding: 16px 15px;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-align: left;
          font-weight: 700;
        }

        td {
          padding: 16px 15px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 0.9rem;
          color: #475569;
        }

        .btn-edit {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f1f5f9;
          color: #4f46e5;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 700;
          transition: all 0.2s;
        }

        .btn-edit:hover { background: #eef2ff; transform: scale(1.05); }
      `}</style>
        </div>
    );
};

export default UserProfile;
