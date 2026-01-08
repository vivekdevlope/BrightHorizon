// src/components/admin/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import DashboardSidebar from './DashboardSidebar';
import AdminNavbar from './AdminNavbar';

const drawerWidth = 240;

const AdminLayout = () => (
  <Box sx={{ display: 'flex' }}>
    <DashboardSidebar />
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        minHeight: '100vh',
      }}
    >
      <AdminNavbar />
      <Outlet />
    </Box>
  </Box>
);

export default AdminLayout;