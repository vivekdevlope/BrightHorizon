import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useAuth from '../../hooks/useAuth';
// [CHANGE THIS LINE] Import 'adminLogin' instead of 'login'
import { adminLogin } from '../../api/apiRoutes'; 

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { setUserAndToken } = useAuth(); 

  const from = location.state?.from?.pathname || '/admin/dashboard';

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
 setLoading(true);
  try {
    const { data } = await adminLogin({ email, password });
    console.log('Login success:', data); // Debug
     
    // Let useAuth handle storage
    setUserAndToken(data);
    navigate('/admin/dashboard');
    // navigate(from, { replace: true });
  } catch (err) {
    console.error('Login error:', err); // Debug
    setError(err.response?.data?.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          borderRadius: 2,
        }}
      >
        <LockOutlinedIcon sx={{ m: 1, bgcolor: 'primary.main', color: 'white', borderRadius: '50%', p: 1 }} />
        <Typography component="h1" variant="h5">
          Admin Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminLoginPage;