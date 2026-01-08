// src/components/admin/DashboardSidebar.jsx
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Article as ArticleIcon,
  ContactMail as ContactMailIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const drawerWidth = 240;

const DashboardSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'primary.main',
          color: 'white',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ color: 'white' }}>
          Admin Panel
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {/* Dashboard */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/dashboard">
              <ListItemIcon sx={{ color: 'white' }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          {/* Manage Blogs */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/manage-blogs">
              <ListItemIcon sx={{ color: 'white' }}>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Blogs" />
            </ListItemButton>
          </ListItem>

          {/* View Enquiries */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/view-enquiries">
              <ListItemIcon sx={{ color: 'white' }}>
                <ContactMailIcon />
              </ListItemIcon>
              <ListItemText primary="View Enquiries" />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={{ color: 'white' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default DashboardSidebar;