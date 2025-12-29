import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/Layout/PublicLayout';
import PortalLayout from './components/Layout/PortalLayout';
import Home from './pages/Public/Home';
import AboutUs from './pages/Public/AboutUs';
import GroundwaterInfo from './pages/Public/GroundwaterInfo';
import Services from './pages/Public/Services';
import Downloads from './pages/Public/Downloads';
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
import RigRegistration from './pages/RigRegistration';
import NOCWorkflow from './pages/NOC/NOCWorkflow';
import ComplianceMonitoring from './pages/Meters/ComplianceMonitoring';
import BorewellDrillingPermission from './pages/BorewellDrillingPermission';
import WellConversion from './pages/WellConversion';
import EmergencyNOC from './pages/EmergencyNOC';
import TankerTransportNOC from './pages/TankerTransportNOC';
import ViolationRegularization from './pages/ViolationRegularization';
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
import Chatbot from './pages/Chatbot/Chatbot';
import ChatbotPage from './pages/Chatbot/ChatbotPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('APPLICANT'); // Default for demo: APPLICANT, OFFICER, ADMIN, RIG_OPERATOR, VENDOR
  const [userCompanies, setUserCompanies] = useState([
    {
      id: "COMP-9901",
      name: "Rajas Stones Pvt Ltd",
      zone: "Jaipur (Industrial)",
      kyc: "Verified",
      avatar: "RS",
      services: {
        noc: { registered: true, pending: false, route: "/noc-portal" },
        meters: { registered: false, pending: false, route: "/meter-registration-system" },
        rigs: { registered: false, pending: true, route: "/rig-registration" },
        modeling: { registered: true, pending: false, route: "/utility" },
        monitoring: { registered: false, pending: false, route: "/reports" }
      }
    },
    {
      id: "COMP-4402",
      name: "Bikaner Ceramic Works",
      zone: "Bikaner Rural",
      kyc: "Pending",
      avatar: "BC",
      services: {
        noc: { registered: false, pending: false, route: "/noc-portal" },
        meters: { registered: false, pending: false, route: "/meter-registration-system" },
        rigs: { registered: false, pending: false, route: "/rig-registration" },
        modeling: { registered: false, pending: false, route: "/utility" },
        monitoring: { registered: false, pending: false, route: "/reports" }
      }
    }
  ]);
  const [activeCompany, setActiveCompany] = useState(userCompanies[0]);

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
        <Route path="/downloads" element={<PublicLayout><Downloads /></PublicLayout>} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Secure Portal Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={
              <PortalLayout userRole={userRole} setUserRole={setUserRole}>
                {userRole === 'OFFICER' && <OfficerDashboard />}
                {userRole === 'ADMIN' && <AdminDashboard />}
                {userRole === 'RIG_OPERATOR' && <RigOperatorDashboard />}
                {userRole === 'APPLICANT' && <Dashboard activeCompany={activeCompany} setActiveCompany={setActiveCompany} userCompanies={userCompanies} setUserCompanies={setUserCompanies} />}
                {userRole === 'VENDOR' && <VendorDashboard />}
              </PortalLayout>
            } />
            <Route path="/apply" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><ApplicationForm /></PortalLayout>} />
            <Route path="/applications/:status" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><ApplicationsList /></PortalLayout>} />
            <Route path="/settings/*" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><AccountSettings /></PortalLayout>} />

            {/* Meter Management Routes */}
            <Route path="/meter-models" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><MeterModels /></PortalLayout>} />
            <Route path="/meter-inventory" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><MeterInventory /></PortalLayout>} />
            <Route path="/meter-installation" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><MeterInstallation /></PortalLayout>} />
            <Route path="/meter-verification" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><MeterVerification /></PortalLayout>} />
            <Route path="/meter-lifecycle" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><MeterLifecycle /></PortalLayout>} />
            <Route path="/vendor-registry" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><VendorRegistry /></PortalLayout>} />
            <Route path="/installer-network" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><InstallerCertification /></PortalLayout>} />
            <Route path="/compliance-monitor" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><ComplianceMonitoring /></PortalLayout>} />
            <Route path="/enforcement-charges" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><GroundwaterCharges /></PortalLayout>} />
            <Route path="/meter-registration-system" element={<MeterRegistrationSystem activeCompany={activeCompany} setActiveCompany={setActiveCompany} userRole={userRole} setUserRole={setUserRole} userCompanies={userCompanies} setUserCompanies={setUserCompanies} />} />
            <Route path="/noc-portal" element={<NOCWorkflow activeCompany={activeCompany} setActiveCompany={setActiveCompany} userRole={userRole} setUserRole={setUserRole} userCompanies={userCompanies} setUserCompanies={setUserCompanies} />} />
            <Route path="/rig-registration" element={<RigRegistration activeCompany={activeCompany} setActiveCompany={setActiveCompany} userRole={userRole} setUserRole={setUserRole} userCompanies={userCompanies} setUserCompanies={setUserCompanies} />} />
            <Route path="/borewell-drilling-permission" element={<BorewellDrillingPermission activeCompany={activeCompany} setActiveCompany={setActiveCompany} />} />
            <Route path="/well-conversion" element={<WellConversion activeCompany={activeCompany} setActiveCompany={setActiveCompany} />} />
            <Route path="/emergency-noc" element={<EmergencyNOC activeCompany={activeCompany} setActiveCompany={setActiveCompany} />} />
            <Route path="/tanker-transport-noc" element={<TankerTransportNOC activeCompany={activeCompany} setActiveCompany={setActiveCompany} />} />
            <Route path="/violation-regularization" element={<ViolationRegularization activeCompany={activeCompany} setActiveCompany={setActiveCompany} />} />

            <Route path="/compliance" element={<SelfCompliance />} />
            <Route path="/inspection" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><SelfInspection /></PortalLayout>} />
            <Route path="/renewal" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><RenewalApplication /></PortalLayout>} />
            <Route path="/query" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><RaisedQuery /></PortalLayout>} />
            <Route path="/eac" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><EAC /></PortalLayout>} />
            <Route path="/passbook" element={<Passbook />} />
            <Route path="/payment" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><PaymentDetails /></PortalLayout>} />
            <Route path="/reports" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><Reports activeCompany={activeCompany} setActiveCompany={setActiveCompany} userCompanies={userCompanies} /></PortalLayout>} />
            <Route path="/utility" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><Utility activeCompany={activeCompany} setActiveCompany={setActiveCompany} userCompanies={userCompanies} /></PortalLayout>} />
            <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
            <Route path="/issues" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><GenericPage title="Issue Reporting" /></PortalLayout>} />
            <Route path="/help" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><GenericPage title="Help" /></PortalLayout>} />
            <Route path="/chatbot" element={<PortalLayout userRole={userRole} setUserRole={setUserRole}><ChatbotPage /></PortalLayout>} />
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
