import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  MenuItem,
  Typography,
} from '@mui/material';
import { createEnquiry } from '../../api/apiRoutes';

const UserEnquiryForm = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    company: '',
    interestedIn: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const interests = [
    'Web Development',
    'Mobile Apps',
    'UI/UX Design',
    'Cloud Solutions',
    'AI & Automation',
    'Consulting',
    'Other',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      await createEnquiry({
        fullName: form.fullName.trim() || form.name.trim(),
        email: form.email.trim(),
        company: form.company || '',
        interestedIn: form.interestedIn || '',
        message: form.message.trim(),
      });

      setSuccess('Your enquiry has been sent successfully!');
      setForm({
        fullName: '',
        email: '',
        company: '',
        interestedIn: '',
        message: '',
      });
    } catch (err) {
      console.error('Enquiry submit error:', err);
      
      setError(err.response?.data?.message || 'Failed to send enquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 3,
        maxWidth: 600,
        mx: 'auto',
        p: 3,
        bgcolor: 'rgba(255,255,255,0.03)',
        borderRadius: 2,
        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#00b7ff' }}>
        Send Us an Enquiry
      </Typography>

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        fullWidth
        label="Full Name"
        margin="normal"
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        required
      />

      <TextField
        fullWidth
        label="Email"
        type="email"
        margin="normal"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <TextField
        fullWidth
        label="Company"
        margin="normal"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        required
      />

      <TextField
        fullWidth
        select
        label="Interested In"
        margin="normal"
        value={form.interestedIn}
        onChange={(e) => setForm({ ...form, interestedIn: e.target.value })}
        required
      >
        {interests.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label="Your Message"
        multiline
        rows={4}
        margin="normal"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        required
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          py: 1.2,
          fontWeight: 600,
          background: 'linear-gradient(45deg, #00ff88, #00b7ff)',
        }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Send Enquiry'}
      </Button>
    </Box>
  );
};

export default UserEnquiryForm;
