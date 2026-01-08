// src/components/admin/AdminNavbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // ← ADD THIS
import useAuth from '../../hooks/useAuth';

const AdminNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate(); // ← ADD THIS

  const handleLogout = () => {
    logout(); // Clear token + user state
    navigate('/admin', { replace: true }); // ← REDIRECT TO LOGIN
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;