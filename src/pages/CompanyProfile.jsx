import React, { useState } from 'react';
import { Save, X, Edit2, Edit, Send, Check } from 'lucide-react';

const CompanyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: 'Saket Hospital',
    mobile: '9314887830',
    pan: 'AAFCS5921E',
    gst: '',
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
      sentTo = originalData.mobile; // PAN changes send OTP to registered mobile
    }

    // Simulate sending OTP
    const mockOTP = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`OTP for ${field}: ${mockOTP} sent to ${sentTo}`);

    setOtpModal({
      show: true,
      field: field,
      sentTo: sentTo,
      otp: '',
      verified: false,
      generatedOTP: mockOTP // In production, this would be server-side
    });

    alert(`OTP sent to ${sentTo}. (Demo OTP: ${mockOTP})`);
  };

  const verifyOTP = () => {
    // In production, verify with server
    if (otpModal.otp === otpModal.generatedOTP) {
      setOtpVerifications({
        ...otpVerifications,
        [otpModal.field]: true
      });
      setOtpModal({ ...otpModal, show: false, verified: true });
      alert(`${otpModal.field.toUpperCase()} verified successfully!`);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleUpdate = () => {
    const changedFields = checkIfSensitiveFieldChanged();

    if (changedFields.length > 0) {
      // Check if all changed sensitive fields are verified
      const allVerified = changedFields.every(field => otpVerifications[field]);

      if (!allVerified) {
        const unverifiedField = changedFields.find(field => !otpVerifications[field]);
        alert(`Please verify ${unverifiedField.toUpperCase()} with OTP before updating.`);
        sendOTP(unverifiedField);
        return;
      }
    }

    // All verifications passed, update profile
    setOriginalData({ ...formData });
    setIsEditing(false);
    setOtpVerifications({ mobile: false, email: false, pan: false });
    alert('Profile updated successfully!');
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
    <div className="company-profile-container">
      {/* Alert Section */}
      <div className="alert-section">
        <p className="alert-text">
          <strong>Kind Attention:</strong> Any document shared via mail will not be accepted for application processing. Kindly upload all the documents required or enquired by CGWA shall be uploaded in the BhuNeer APP portal only.
        </p>
      </div>

      {/* Editable Form Section */}
      <div className="profile-form-card">
        <div className="form-row">
          <div className="form-group">
            <label>COMPANY NAME*</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              disabled={!isEditing}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>COMPANY PHONE NUMBER*</label>
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
            <label>COMPANY GST NO</label>
            <input
              type="text"
              name="gst"
              value={formData.gst}
              onChange={handleChange}
              disabled={!isEditing}
              className="form-control"
              placeholder="Optional"
            />
          </div>

          <div className="form-group">
            <label>COMPANY PAN CARD NO*</label>
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
            <label>E-MAIL*</label>
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

          <div className="form-group full-width">
            <label>POSTAL ADDRESS*</label>
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
              Edit Information
            </button>
          ) : (
            <>
              <button className="btn btn-success" onClick={handleUpdate}>
                Update
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
            <h3>Verify {otpModal.field.toUpperCase()}</h3>
            <p className="modal-subtitle">
              OTP has been sent to <strong>{otpModal.sentTo}</strong>
            </p>

            <div className="otp-input-group">
              <label>Enter OTP</label>
              <input
                type="text"
                value={otpModal.otp}
                onChange={(e) => setOtpModal({ ...otpModal, otp: e.target.value })}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                className="otp-input"
                autoFocus
              />
            </div>

            <div className="modal-actions">
              <button className="btn btn-primary" onClick={verifyOTP}>
                Verify OTP
              </button>
              <button className="btn btn-link" onClick={() => sendOTP(otpModal.field)}>
                Resend OTP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Company Details Table */}
      <div className="table-section">
        <h3 className="section-title">Company details</h3>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>COMPANY NAME</th>
                <th>COMPANY<br />MOBILE NO</th>
                <th>COMPANY PAN<br />CARD NO</th>
                <th>COMPANY<br />GST NO</th>
                <th>COMPANY EMAIL</th>
                <th>ADDRESS</th>
                <th>STATE NAME</th>
                <th>DISTRICT<br />NAME</th>
                <th>PIN<br />CODE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{formData.companyName}</td>
                <td>{formData.mobile}</td>
                <td>{formData.pan}</td>
                <td>{formData.gst || '-'}</td>
                <td>{formData.email}</td>
                <td>{formData.address}</td>
                <td>{formData.state}</td>
                <td>{formData.district}</td>
                <td>{formData.pincode}</td>
                <td>
                  <button className="btn-edit" onClick={handleEdit}>
                    <Edit size={14} />
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .company-profile-container {
          padding-bottom: 20px;
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

        .profile-form-card {
          background: white;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          margin-bottom: 30px;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #555;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .input-with-verify {
          position: relative;
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .form-control {
          flex: 1;
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 0.95rem;
          transition: border-color 0.2s;
        }

        .form-control:focus {
          outline: none;
          border-color: #007bff;
        }

        .form-control:disabled {
          background-color: #f8f9fa;
          cursor: not-allowed;
        }

        .verify-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .verify-btn:not(.verified) {
          background: #ffc107;
          color: #000;
        }

        .verify-btn:not(.verified):hover {
          background: #e0a800;
        }

        .verify-btn.verified {
          background: #28a745;
          color: white;
          cursor: default;
        }

        .form-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-start;
          margin-top: 10px;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
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

        .btn-success {
          background: #28a745;
          color: white;
        }

        .btn-success:hover {
          background: #218838;
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
        }

        .btn-secondary:hover {
          background: #5a6268;
        }

        /* OTP Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 30px;
          border-radius: 8px;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        .modal-content h3 {
          margin: 0 0 10px 0;
          color: #333;
        }

        .modal-subtitle {
          color: #666;
          font-size: 0.9rem;
          margin: 0 0 20px 0;
        }

        .otp-input-group {
          margin-bottom: 20px;
        }

        .otp-input-group label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: #555;
          margin-bottom: 8px;
        }

        .otp-input {
          width: 100%;
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 6px;
          font-size: 1.2rem;
          text-align: center;
          letter-spacing: 5px;
        }

        .otp-input:focus {
          outline: none;
          border-color: #007bff;
        }

        .modal-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .btn-link {
          background: none;
          color: #007bff;
          text-decoration: underline;
          padding: 8px;
        }

        .btn-link:hover {
          color: #0056b3;
        }

        /* Table Section */
        .table-section {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .section-title {
          color: #007bff;
          margin: 0 0 15px 0;
          font-weight: 500;
          font-size: 1.1rem;
        }

        .table-container {
          overflow-x: auto;
          border: 1px solid #dee2e6;
          border-radius: 4px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1200px;
        }

        th {
          background-color: #0f3c5f;
          color: white;
          padding: 12px 10px;
          font-size: 0.75rem;
          text-transform: uppercase;
          text-align: left;
          vertical-align: top;
          border: 1px solid #0f3c5f;
          font-weight: 600;
        }

        td {
          padding: 12px 10px;
          border: 1px solid #dee2e6;
          font-size: 0.85rem;
          color: #333;
          vertical-align: top;
        }

        .btn-edit {
          display: flex;
          align-items: center;
          gap: 5px;
          background: #007bff;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: background 0.2s;
        }

        .btn-edit:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default CompanyProfile;
