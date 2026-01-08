import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/user/Home';
import Blogs from '../pages/user/Blogs';
// import BlogDetail from '../pages/user/BlogDetail'; // Add if needed
import Contact from '../pages/user/Contact';
// import Login from '../pages/user/Login';
// import UserProfile from '../components/user/UserProfile';
import About from '../pages/user/About';
import Services from '../pages/user/services/Services';
// import EditProfile from '../pages/user/EditProfile';
import Introduction from '../pages/user/Introduction';
import Vision from '../pages/user/Vision';
import Mission from '../pages/user/Mision';


import Technologies from '../pages/user/Technologies';
import OurClients from '../pages/user/OurClients';
import BlogDetails from '../pages/user/BlogDetails';
import NotFound from '../pages/user/NotFound';
import SapBtpDevelopment from '../pages/user/services/SapBtpDevelopment';
import SapCpi from '../pages/user/services/SapCpi';
import SapFiori from '../pages/user/services/SapFiori';
import SapAnalyticsCloud from '../pages/user/services/SapAnalyticsCloud';
import SapErp from '../pages/user/services/SapErp';
import SapCrm from '../pages/user/services/SapCrm';
import SapBasis from '../pages/user/services/SapBasis';
import OnPremiseAnalytics from '../pages/user/services/OnPremiseAnalytics';
import CloudAnalyticalServices from '../pages/user/services/CloudAnalyticalServices';
import ProductEngineering from '../pages/user/services/ProductEngineering';
import MobileDevelopment from '../pages/user/services/MobileDevelopment';
import StaffingAugmentation from '../pages/user/services/StaffingAugmentation';
import ApplicationSupport from '../pages/user/services/ApplicationSupport';
import ApplicationDevelopment from '../pages/user/services/ApplicationDevelopment';
import SapCloudPlatform from '../pages/user/services/SapCloudPlatform';
import SapMigration from '../pages/user/services/SapMigration';

const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/blogs" element={<Blogs />} />
    <Route path="/blog/:id" element={<BlogDetails />} />
    <Route path="/contact" element={<Contact />} />

    <Route path="/about" element={<About />} />
     <Route path="/introduction" element={<Introduction />} />
     <Route path="/vision" element={<Vision />} />
     <Route path="/mission" element={<Mission />} />
    <Route path="/services" element={<Services />} />
    <Route path="/services/sap-btp" element={<SapBtpDevelopment/>} />
    <Route path="/services/sap-cpi" element={<SapCpi/>} />
    <Route path="/services/sap-fiori" element={<SapFiori/>} />
    <Route path="/services/sap-cloud-platform" element={<SapCloudPlatform/>} />
    <Route path="/services/sap-analytics-cloud" element={<SapAnalyticsCloud/>} />
    <Route path="/services/sap-erp" element={<SapErp/>} />
    <Route path="/services/sap-migration" element={<SapMigration />} />
    <Route path="/services/sap-crm" element={<SapCrm/>} />
    <Route path="/services/sap-basis" element={<SapBasis/>} />
    <Route path="/services/on-premise-analytics" element={<OnPremiseAnalytics/>} />
    <Route path="/services/cloud-analytical-services" element={<CloudAnalyticalServices/>} />
    <Route path="/services/product-engineering" element={<ProductEngineering/>} />
    <Route path="/services/mobile-development" element={<MobileDevelopment/>} />
    <Route path="/services/staffing-augmentation" element={<StaffingAugmentation/>} />
    <Route path="/services/application-support" element={<ApplicationSupport/>} />
    <Route path="/services/application-development" element={<ApplicationDevelopment/>} />
    <Route path="/technologies" element={<Technologies />} />
    <Route path="/our-clients" element={<OurClients />} />
    <Route path="*" element={<NotFound/>} />

  </Routes>
);

export default UserRoutes;