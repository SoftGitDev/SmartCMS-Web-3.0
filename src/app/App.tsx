import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Onboarding from './pages/onboarding/Onboarding';
import { ToastContainer } from 'react-toastify';
import Login from './pages/authentication/pages/Login';
import OtpVerificationForm from './pages/authentication/pages/OtpVerificationForm';
import Forgotpwd from './pages/authentication/pages/Forgotpwd';
import ReserPwd from './pages/authentication/pages/ReserPwd';
import GAuthSetup from './pages/authentication/pages/GAuthSetup';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import APIConfiguration from './pages/administrator/apiconfiguration/APIConfiguration';
import MailSmsConfigMain from './pages/administrator/mail-sms-config/MailSmsConfigMain';
import Bank from './pages/administrator/bank/Bank';
import Branch from './pages/administrator/branch/Branch';
import Usermanagement from './pages/administrator/usermanagement/Usermanagement';
import BankMst from './pages/administrator/bankManagement/BankMst';
import Miscellaneous from './pages/miscellaneous.tsx/Miscellaneous';
import Appconfig from './pages/administrator/appconfig/Appconfig';
import ProductConfig from './pages/administrator/productConfig/ProductConfig';
import Ticket from './pages/tickets/Ticket';
import UserProfile from './pages/userProfile/UserProfile';
import Services from './pages/services/Services';
import DebugLog from './pages/logs/DebugLog';
import AccessLog from './pages/logs/AccessLog';
import Auditlog from './pages/logs/Auditlog';
import Ticketdtl from './pages/tickets/Ticketdtl';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* On Boarding */}
        <Route path="/Onboarding" element={<Onboarding />} />

        {/* Authentication Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forgotpwd" element={<Forgotpwd />} />
        <Route path="/reserPwd" element={<ReserPwd />} />
        <Route path="/gauthsetup" element={<GAuthSetup />} />
        <Route path="/otp" element={<OtpVerificationForm />} />

        {/* Protected Routes  */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />

          {/* Administrator */}
          <Route path="organization-management" element={<BankMst />} />
          <Route path="organization" element={<Bank />} />
          <Route path="branch" element={<Branch />} />
          <Route path="user-management" element={<Usermanagement />} />
          <Route path="app-config" element={<Appconfig />} />
          <Route path="product-config" element={<ProductConfig />} />
          <Route path="communication-config" element={<MailSmsConfigMain />} />
          <Route path="api-configurations" element={<APIConfiguration />} />

          {/* Miscellaneous */}
          <Route path="miscellaneous" element={<Miscellaneous />} />

          {/* Ticket */}
          <Route path="tickets" element={<Ticket />} />
          <Route path="tickets/ticketdtl" element={<Ticketdtl />} />
          {/* Services */}
          <Route path="services" element={<Services />} />

          {/* Logs */}
          <Route path="logs/debug" element={<DebugLog />} />
          <Route path="logs/access" element={<AccessLog />} />
          <Route path="logs/audit" element={<Auditlog />} />

          {/* Header Profile Screen */}
          <Route path="profile" element={<UserProfile />} />


        </Route>
      </Routes>
      {/* Toster */}
      <ToastContainer />

    </BrowserRouter>
  );
}

export default App;
