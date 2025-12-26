import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/Layout/PublicLayout';
import PortalLayout from './components/Layout/PortalLayout';
import Home from './pages/Public/Home';
import AboutUs from './pages/Public/AboutUs';
import GroundwaterInfo from './pages/Public/GroundwaterInfo';
import Services from './pages/Public/Services';
import Downloads from './pages/Public/Downloads';
import PublicGISViewer from './components/PublicGISViewer';
import Dashboard from './pages/Dashboard';
import OfficerDashboard from './pages/Officer/OfficerDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import RigOperatorDashboard from './pages/RigOperator/RigOperatorDashboard';
import VendorDashboard from './pages/Vendor/VendorDashboard';
import MeterModels from './pages/Meters/MeterModels';
import MeterInventory from './pages/Meters/MeterInventory';
import MeterInstallation from './pages/Meters/MeterInstallation';
import MeterVerification from './pages/Meters/MeterVerification';
import MeterLifecycle from './pages/Meters/MeterLifecycle';
import VendorRegistry from './pages/Meters/VendorRegistry';
import InstallerCertification from './pages/Meters/InstallerCertification';
import MeterRegistrationSystem from './pages/Meters/MeterRegistrationSystem';
import ComplianceMonitoring from './pages/Meters/ComplianceMonitoring';
import ApplicationForm from './pages/ApplicationForm';
import AccountSettings from './pages/AccountSettings';
import GenericPage from './pages/GenericPage';
import ApplicationsList from './pages/ApplicationsList';
import SelfCompliance from './pages/SelfCompliance';
import SelfInspection from './pages/SelfInspection';
import RenewalApplication from './pages/RenewalApplication';
import RaisedQuery from './pages/RaisedQuery';
import Passbook from './pages/Passbook';
import PaymentDetails from './pages/PaymentDetails';
import Reports from './pages/Reports';
import EAC from './pages/EAC';
import Utility from './pages/Utility';
import Login from './pages/Login';
import Logout from './pages/Logout';
import GroundwaterCharges from './pages/Billing/GroundwaterCharges';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('APPLICANT'); // Default for demo: APPLICANT, OFFICER, ADMIN, RIG_OPERATOR, VENDOR

  const handleLogin = (role = 'APPLICANT') => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><AboutUs /></PublicLayout>} />
        <Route path="/groundwater-info" element={<PublicLayout><GroundwaterInfo /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/maps-data" element={<PublicLayout><PublicGISViewer /></PublicLayout>} />
        <Route path="/downloads" element={<PublicLayout><Downloads /></PublicLayout>} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Secure Portal Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={
              <PortalLayout userRole={userRole}>
                {userRole === 'OFFICER' && <OfficerDashboard />}
                {userRole === 'ADMIN' && <AdminDashboard />}
                {userRole === 'RIG_OPERATOR' && <RigOperatorDashboard />}
                {userRole === 'APPLICANT' && <Dashboard />}
                {userRole === 'VENDOR' && <VendorDashboard />}
              </PortalLayout>
            } />
            <Route path="/apply" element={<PortalLayout userRole={userRole}><ApplicationForm /></PortalLayout>} />
            <Route path="/applications/:status" element={<PortalLayout userRole={userRole}><ApplicationsList /></PortalLayout>} />
            <Route path="/settings/*" element={<PortalLayout userRole={userRole}><AccountSettings /></PortalLayout>} />

            {/* Meter Management Routes */}
            <Route path="/meter-models" element={<PortalLayout userRole={userRole}><MeterModels /></PortalLayout>} />
            <Route path="/meter-inventory" element={<PortalLayout userRole={userRole}><MeterInventory /></PortalLayout>} />
            <Route path="/meter-installation" element={<PortalLayout userRole={userRole}><MeterInstallation /></PortalLayout>} />
            <Route path="/meter-verification" element={<PortalLayout userRole={userRole}><MeterVerification /></PortalLayout>} />
            <Route path="/meter-lifecycle" element={<PortalLayout userRole={userRole}><MeterLifecycle /></PortalLayout>} />
            <Route path="/vendor-registry" element={<PortalLayout userRole={userRole}><VendorRegistry /></PortalLayout>} />
            <Route path="/installer-network" element={<PortalLayout userRole={userRole}><InstallerCertification /></PortalLayout>} />
            <Route path="/compliance-monitor" element={<PortalLayout userRole={userRole}><ComplianceMonitoring /></PortalLayout>} />
            <Route path="/enforcement-charges" element={<PortalLayout userRole={userRole}><GroundwaterCharges /></PortalLayout>} />
            <Route path="/meter-registration-system" element={<PortalLayout userRole={userRole}><MeterRegistrationSystem /></PortalLayout>} />

            <Route path="/compliance" element={<PortalLayout userRole={userRole}><SelfCompliance /></PortalLayout>} />
            <Route path="/inspection" element={<PortalLayout userRole={userRole}><SelfInspection /></PortalLayout>} />
            <Route path="/renewal" element={<PortalLayout userRole={userRole}><RenewalApplication /></PortalLayout>} />
            <Route path="/query" element={<PortalLayout userRole={userRole}><RaisedQuery /></PortalLayout>} />
            <Route path="/eac" element={<PortalLayout userRole={userRole}><EAC /></PortalLayout>} />
            <Route path="/passbook" element={<PortalLayout userRole={userRole}><Passbook /></PortalLayout>} />
            <Route path="/payment" element={<PortalLayout userRole={userRole}><PaymentDetails /></PortalLayout>} />
            <Route path="/reports" element={<PortalLayout userRole={userRole}><Reports /></PortalLayout>} />
            <Route path="/utility" element={<PortalLayout userRole={userRole}><Utility /></PortalLayout>} />
            <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
            <Route path="/issues" element={<PortalLayout userRole={userRole}><GenericPage title="Issue Reporting" /></PortalLayout>} />
            <Route path="/help" element={<PortalLayout userRole={userRole}><GenericPage title="Help" /></PortalLayout>} />
          </>
        ) : (
          <Route path="/portal/*" element={<Navigate to="/login" replace />} />
        )}

        {/* Redirects */}
        <Route path="/portal" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
