// Purpose: Root application component responsible for initializing the application and rendering the main layout.
// Created By: Harish
// Created Date: 05-06-2026

import React from 'react';
import '../assets/styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Onboarding from '../features/onboarding/screens/Onboarding';
import Login from '../features/authentication/screens/Login';
import Forgotpwd from '../features/authentication/screens/Forgotpwd';
import ReserPwd from '../features/authentication/screens/ReserPwd';
import GAuthSetup from '../features/authentication/screens/GAuthSetup';
import OtpVerificationForm from '../features/authentication/screens/OtpVerificationForm';
import Layout from './layouts/Layout';
import Dashboard from '../features/dashboard/screens/Dashboard';
import Organization from '../features/organization/screens/Organization';
import Branch from '../features/branch/screens/Branch';
import AppConfig from '../features/appConfig/screens/AppConfig';
import ProductConfig from '../features/productConfig/screens/ProductConfig';
import ChannelConfig from '../features/channelConfig/screens/ChannelConfig';
import APIConfig from '../features/apiConfig/screens/APIConfig';
import UserProfile from '../features/userProfile/screens/UserProfile';
import Auditlog from '../features/auditlog/screens/Auditlog';
import AccessLog from '../features/accessLog/screens/AccessLog';
import DebugLog from '../features/debugLog/screens/DebugLog';
import Circular from '../features/circular/screens/Circular';
import Announcement from '../features/announcement/screens/Announcement';
import Article from '../features/article/screens/Article';
import EmailDashboard from '../features/email/screens/Email';
import Services from '../features/services/screens/Services';
import Ticketdtl from '../features/tickets/screens/Ticketdtl';
import Ticket from '../features/tickets/screens/Ticket';
import Miscellaneous from '../features/miscellaneous.tsx/screens/Miscellaneous';
import IntergratedService from '../features/integratedService/screens/IntegratedServices';
import ManageServices from '../features/manageServices/screens/ManageServices';
import Usermanagement from '../features/usermanagement/screens/Usermanagement';
import OrganizationMst from '../features/organizationMange/screens/OrganizationMst';
import Customers from '../features/customers/screens/Customers';

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
                    <Route path="organization-management" element={<OrganizationMst />} />
                    <Route path="organization" element={<Organization />} />
                    <Route path="branch" element={<Branch />} />
                    <Route path="user-management" element={<Usermanagement />} />
                    <Route path="app-config" element={<AppConfig />} />
                    <Route path="product-config" element={<ProductConfig />} />
                    <Route path="communication-config" element={<ChannelConfig />} />
                    <Route path="api-configurations" element={<APIConfig />} />
                    <Route path="manageservices" element={<ManageServices />} />
                    <Route path="manageticketservices" element={<IntergratedService />} />
                    <Route path="customers" element={<Customers />} />



                    {/* Miscellaneous */}
                    <Route path="miscellaneous" element={<Miscellaneous />} />

                    {/* Ticket */}
                    <Route path="tickets" element={<Ticket />} />
                    <Route path="tickets/ticketdtl" element={<Ticketdtl />} />
                    {/* Services */}
                    <Route path="services" element={<Services />} />

                    {/* email */}
                    <Route path="email" element={<EmailDashboard />} />


                    {/* Knowledge Base */}
                    <Route path="article" element={<Article />} />
                    <Route path="announcement" element={<Announcement />} />
                    <Route path="circular" element={<Circular />} />

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
