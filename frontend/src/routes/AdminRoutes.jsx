// src/routes/AdminRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageBlogs from '../pages/admin/ManageBlogs';
import ViewEnquiries from '../pages/admin/ViewEnquiries';
import AuthGuard from '../components/admin/AuthGuard';

const AdminRoutes = () => (
  <Routes>
    {/* Login */}
    <Route path="/" element={<AdminLoginPage />} />

    {/* Protected Pages */}
    <Route
      element={
        <AuthGuard>
          <AdminLayout />
        </AuthGuard>
      }
    >
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="manage-blogs" element={<ManageBlogs />} />
      <Route path="view-enquiries" element={<ViewEnquiries />} />
    </Route>

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/admin" replace />} />
  </Routes>
);

export default AdminRoutes;