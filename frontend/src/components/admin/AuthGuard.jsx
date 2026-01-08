// src/components/admin/AuthGuard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AuthGuard = ({ children }) => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Wait for user to be loaded from localStorage
    if (user !== null || !localStorage.getItem('adminToken')) {
      setIsChecking(false);
    }
  }, [user]);

  useEffect(() => {
    if (!isChecking && !isAdmin()) {
      navigate('/admin', { replace: true });
    }
  }, [isChecking, isAdmin, navigate]);

  if (isChecking) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return isAdmin() ? children : null;
};

export default AuthGuard;