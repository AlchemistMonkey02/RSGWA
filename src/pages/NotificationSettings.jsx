import React, { useState } from 'react';
import { Mail, MessageSquare, Bell, CheckCircle } from 'lucide-react';

const NotificationSettings = () => {
    const [settings, setSettings] = useState({
        emailNotifications: {
            applicationStatus: true,
            paymentUpdates: true,
            systemAlerts: false,
            newsletter: false
        },
        smsNotifications: {
            applicationStatus: true,
            paymentUpdates: false,
            systemAlerts: true
        },
        pushNotifications: {
            applicationStatus: true,
            paymentUpdates: true,
            systemAlerts: true
        }
    });

    const handleToggle = (category, setting) => {
        setSettings({
            ...settings,
            [category]: {
                ...settings[category],
                [setting]: !settings[category][setting]
            }
        });
    };

    const handleSave = () => {
        alert('Notification preferences saved successfully!');
    };

    return (
        <div className="notification-settings-container">
            <div className="settings-card">
                <h3 className="card-title">Notification Preferences</h3>
                <p className="card-subtitle">Choose how you want to receive updates and alerts</p>

                {/* Email Notifications */}
                <div className="notification-section">
                    <div className="section-header">
                        <Mail size={20} />
                        <h4>Email Notifications</h4>
                    </div>

                    <div className="settings-list">
                        <div className="setting-item">
                            <div className="setting-info">
                                <strong>Application Status Updates</strong>
                                <p>Get notified when your application status changes</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications.applicationStatus}
                                    onChange={() => handleToggle('emailNotifications', 'applicationStatus')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <strong>Payment Updates</strong>
                                <p>Receive confirmation for payments and transactions</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications.paymentUpdates}
                                    onChange={() => handleToggle('emailNotifications', 'paymentUpdates')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <strong>System Alerts</strong>
                                <p>Important system updates and maintenance notifications</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications.systemAlerts}
                                    onChange={() => handleToggle('emailNotifications', 'systemAlerts')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <strong>Newsletter</strong>
                                <p>Monthly updates and tips from RGWA</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications.newsletter}
                                    onChange={() => handleToggle('emailNotifications', 'newsletter')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* SMS Notifications */}
                <div className="notification-section">
                    <div className="section-header">
                        <MessageSquare size={20} />
                        <h4>SMS Notifications</h4>
                    </div>

                    <div className="settings-list">
                        <div className="setting-item">
                            <div className="setting-info">
                                <strong>Application Status Updates</strong>
                                <p>SMS alerts for application status changes</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.smsNotifications.applicationStatus}
                                    onChange={() => handleToggle('smsNotifications', 'applicationStatus')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <strong>Payment Updates</strong>
                                <p>SMS confirmation for successful payments</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.smsNotifications.paymentUpdates}
                                    onChange={() => handleToggle('smsNotifications', 'paymentUpdates')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <strong>System Alerts</strong>
                                <p>Critical system alerts via SMS</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.smsNotifications.systemAlerts}
                                    onChange={() => handleToggle('smsNotifications', 'systemAlerts')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Push Notifications */}
                <div className="notification-section">
                    <div className="section-header">
                        <Bell size={20} />
                        <h4>Push Notifications</h4>
                    </div>

                    <div className="settings-list">
                        <div className="setting-item">
                            <div className="setting-info">
                                <strong>Application Status Updates</strong>
                                <p>Browser push notifications for status changes</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.pushNotifications.applicationStatus}
                                    onChange={() => handleToggle('pushNotifications', 'applicationStatus')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <strong>Payment Updates</strong>
                                <p>Instant payment confirmations</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.pushNotifications.paymentUpdates}
                                    onChange={() => handleToggle('pushNotifications', 'paymentUpdates')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <strong>System Alerts</strong>
                                <p>Real-time system notifications</p>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.pushNotifications.systemAlerts}
                                    onChange={() => handleToggle('pushNotifications', 'systemAlerts')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="form-actions">
                    <button className="btn btn-primary" onClick={handleSave}>
                        <CheckCircle size={16} />
                        Save Preferences
                    </button>
                </div>
            </div>

            <style jsx>{`
        .notification-settings-container {
          max-width: 800px;
        }

        .settings-card {
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
          margin: 0 0 30px 0;
        }

        .notification-section {
          margin-bottom: 30px;
          padding-bottom: 30px;
          border-bottom: 1px solid #f0f0f0;
        }

        .notification-section:last-of-type {
          border-bottom: none;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          color: #007bff;
        }

        .section-header h4 {
          font-size: 1.1rem;
          margin: 0;
        }

        .settings-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 6px;
        }

        .setting-info {
          flex: 1;
        }

        .setting-info strong {
          display: block;
          color: #333;
          margin-bottom: 4px;
        }

        .setting-info p {
          margin: 0;
          font-size: 0.85rem;
          color: #666;
        }

        /* Toggle Switch */
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 26px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.3s;
          border-radius: 26px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.3s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #007bff;
        }

        input:checked + .slider:before {
          transform: translateX(24px);
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 8px;
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

export default NotificationSettings;
