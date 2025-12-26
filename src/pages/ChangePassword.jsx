import React, { useState } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Calculate password strength for new password
        if (name === 'newPassword') {
            calculatePasswordStrength(value);
        }
    };

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;
        setPasswordStrength(strength);
    };

    const getStrengthColor = () => {
        switch (passwordStrength) {
            case 0: return '#dc3545';
            case 1: return '#fd7e14';
            case 2: return '#ffc107';
            case 3: return '#28a745';
            case 4: return '#20c997';
            default: return '#ddd';
        }
    };

    const getStrengthLabel = () => {
        switch (passwordStrength) {
            case 0: return 'Very Weak';
            case 1: return 'Weak';
            case 2: return 'Fair';
            case 3: return 'Strong';
            case 4: return 'Very Strong';
            default: return '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            alert('New password and confirm password do not match!');
            return;
        }

        if (passwordStrength < 2) {
            alert('Please choose a stronger password!');
            return;
        }

        // Submit logic here
        alert('Password changed successfully!');
        setFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords({
            ...showPasswords,
            [field]: !showPasswords[field]
        });
    };

    const passwordRequirements = [
        { label: 'At least 8 characters', met: formData.newPassword.length >= 8 },
        { label: 'Contains uppercase and lowercase', met: /[a-z]/.test(formData.newPassword) && /[A-Z]/.test(formData.newPassword) },
        { label: 'Contains numbers', met: /\d/.test(formData.newPassword) },
        { label: 'Contains special characters', met: /[^a-zA-Z\d]/.test(formData.newPassword) }
    ];

    return (
        <div className="change-password-container">
            <div className="password-card">
                <h3 className="card-title">Change Password</h3>
                <p className="card-subtitle">Ensure your account is using a strong password to stay secure</p>

                <form onSubmit={handleSubmit}>
                    {/* Current Password */}
                    <div className="form-group">
                        <label>Current Password <span className="required">*</span></label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPasswords.current ? 'text' : 'password'}
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => togglePasswordVisibility('current')}
                            >
                                {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="form-group">
                        <label>New Password <span className="required">*</span></label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPasswords.new ? 'text' : 'password'}
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => togglePasswordVisibility('new')}
                            >
                                {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Password Strength Indicator */}
                        {formData.newPassword && (
                            <div className="password-strength">
                                <div className="strength-bar">
                                    <div
                                        className="strength-fill"
                                        style={{
                                            width: `${(passwordStrength / 4) * 100}%`,
                                            backgroundColor: getStrengthColor()
                                        }}
                                    />
                                </div>
                                <span className="strength-label" style={{ color: getStrengthColor() }}>
                                    {getStrengthLabel()}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="form-group">
                        <label>Confirm New Password <span className="required">*</span></label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPasswords.confirm ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => togglePasswordVisibility('confirm')}
                            >
                                {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {formData.confirmPassword && (
                            <span className={`match-indicator ${formData.newPassword === formData.confirmPassword ? 'match' : 'no-match'}`}>
                                {formData.newPassword === formData.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                            </span>
                        )}
                    </div>

                    {/* Password Requirements */}
                    <div className="requirements-box">
                        <h4>Password Requirements:</h4>
                        <ul className="requirements-list">
                            {passwordRequirements.map((req, index) => (
                                <li key={index} className={req.met ? 'met' : ''}>
                                    {req.met ? <Check size={16} /> : <X size={16} />}
                                    {req.label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Submit Button */}
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                            Update Password
                        </button>
                    </div>
                </form>
            </div>

            <style jsx>{`
        .change-password-container {
          max-width: 600px;
        }

        .password-card {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .card-title {
          font-size: 1.3rem;
          color: #333;
          margin: 0 0 8px 0;
        }

        .card-subtitle {
          color: #666;
          font-size: 0.9rem;
          margin: 0 0 25px 0;
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

        .required {
          color: #dc3545;
        }

        .password-input-wrapper {
          position: relative;
        }

        .form-control {
          width: 100%;
          padding: 10px 40px 10px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 0.95rem;
        }

        .form-control:focus {
          outline: none;
          border-color: #007bff;
        }

        .password-toggle {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          padding: 5px;
        }

        .password-strength {
          margin-top: 8px;
        }

        .strength-bar {
          height: 4px;
          background: #e0e0e0;
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 5px;
        }

        .strength-fill {
          height: 100%;
          transition: all 0.3s;
        }

        .strength-label {
          font-size: 0.8rem;
          font-weight: 600;
        }

        .match-indicator {
          display: block;
          margin-top: 5px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .match-indicator.match {
          color: #28a745;
        }

        .match-indicator.no-match {
          color: #dc3545;
        }

        .requirements-box {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 6px;
          margin-bottom: 20px;
        }

        .requirements-box h4 {
          font-size: 0.9rem;
          color: #333;
          margin: 0 0 10px 0;
        }

        .requirements-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .requirements-list li {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 5px 0;
          font-size: 0.85rem;
          color: #999;
        }

        .requirements-list li.met {
          color: #28a745;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
        }

        .btn {
          padding: 10px 30px;
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
      `}</style>
        </div>
    );
};

export default ChangePassword;
