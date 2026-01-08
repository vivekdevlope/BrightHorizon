// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import ScrollToTop from './components/common/ScrollToTop';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Hide user navbar & footer in admin */}
      {!isAdminRoute && <Navbar />}
       <ScrollToTop />
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} /> {/* Only this */}
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
      <BlogProvider>
        <AppContent />
      </BlogProvider>
    </AuthProvider>
  </Router>
);

export default App;