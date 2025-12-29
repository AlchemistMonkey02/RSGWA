import React, { useState } from 'react';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { User, Lock, Bell } from 'lucide-react';
import UserProfile from './UserProfile';
import ChangePassword from './ChangePassword';
import NotificationSettings from './NotificationSettings';

const AccountSettings = () => {
  return (
    <div className="account-settings-container">
      {/* Page Header */}
      <div className="page-header">
        <h1>Account Settings</h1>
        <p className="subtitle">Manage your personal preferences and security</p>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-container">
        <NavLink
          to="/settings/profile"
          className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
        >
          <User size={18} />
          <span>User Profile</span>
        </NavLink>
        <NavLink
          to="/settings/password"
          className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
        >
          <Lock size={18} />
          <span>Change Password</span>
        </NavLink>
        <NavLink
          to="/settings/notifications"
          className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
        >
          <Bell size={18} />
          <span>Notifications</span>
        </NavLink>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        <Routes>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="password" element={<ChangePassword />} />
          <Route path="notifications" element={<NotificationSettings />} />
        </Routes>
      </div>

      <style jsx>{`
        .account-settings-container {
          padding-bottom: 50px;
        }

        .page-header {
          background: white;
          padding: 25px;
          border-radius: 8px;
          margin-bottom: 25px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .page-header h1 {
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
          background: white;
          border-radius: 8px;
          padding: 10px;
          margin-bottom: 25px;
          display: flex;
          gap: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 6px;
          text-decoration: none;
          color: #666;
          font-weight: 500;
          transition: all 0.2s;
          border: 2px solid transparent;
        }

        .tab:hover {
          background: #f8f9fa;
          color: #007bff;
        }

        .tab.active {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }

        .tab-content {
          min-height: 400px;
        }
      `}</style>
    </div>
  );
};

export default AccountSettings;
