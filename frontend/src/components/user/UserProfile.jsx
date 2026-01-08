// src/pages/user/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Grid,
  Paper,
  Avatar,
  Typography,
  Button,
  Skeleton,
  Chip,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Shield as ShieldIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { getProfile } from '../../api/apiRoutes';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await getProfile();
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Avatar initials
  const getInitials = (name = '') => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'grey.50',
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ maxWidth: 900, margin: '0 auto' }}
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="h3"
            fontWeight={700}
            textAlign="center"
            gutterBottom
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            My Profile
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" mb={5}>
            Manage your personal information and account settings.
          </Typography>
        </motion.div>

        {/* Main Card */}
        <Paper
          elevation={6}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            bgcolor: 'background.paper',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          }}
        >
          {/* Avatar Section */}
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              position: 'relative',
            }}
          >
            {loading ? (
              <Skeleton variant="circular" width={120} height={120} sx={{ mx: 'auto', bgcolor: 'whiteAlpha.200' }} />
            ) : (
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  fontSize: '3rem',
                  fontWeight: 600,
                  bgcolor: 'white',
                  color: 'primary.main',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }}
              >
                {profile?.avatar ? (
                  <img src={profile.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  getInitials(profile?.name)
                )}
              </Avatar>
            )}

            <Typography variant="h5" fontWeight={600} mt={2}>
              {loading ? <Skeleton width={180} /> : profile?.name}
            </Typography>
            <Chip
              icon={<ShieldIcon />}
              label={loading ? <Skeleton width={80} /> : profile?.role || 'User'}
              color="secondary"
              size="small"
              sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.2)' }}
            />
          </Box>

          <Divider />

          {/* Info Grid */}
          <Box sx={{ p: { xs: 3, md: 4 } }}>
            <Grid container spacing={3}>
              {/* Email */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div variants={itemVariants}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <EmailIcon color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Email Address
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {loading ? <Skeleton width={200} /> : profile?.email}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>

              {/* Role */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div variants={itemVariants}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PersonIcon color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Account Type
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {loading ? <Skeleton width={120} /> : profile?.role || 'Standard User'}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>

            {/* Stats (optional future use) */}
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: 'primary.50',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h4" fontWeight={700} color="primary">
                    {loading ? <Skeleton /> : '12'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Blogs Written
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: 'secondary.50',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h4" fontWeight={700} color="secondary">
                    {loading ? <Skeleton /> : '48'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Comments
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: 'success.50',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h4" fontWeight={700} color="success.main">
                    {loading ? <Skeleton /> : '5'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Likes
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: 'warning.50',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h4" fontWeight={700} color="warning.main">
                    {loading ? <Skeleton /> : '2'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Drafts
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<EditIcon />}
                  onClick={() => navigate('/profile/edit')}
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    boxShadow: 3,
                  }}
                >
                  Edit Profile
                </Button>
              </motion.div>
            </Box>
          </Box>
        </Paper>

        {/* Footer Note */}
        <motion.div variants={itemVariants} style={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="body2" color="text.disabled">
            Last updated:{' '}
            {loading ? (
              <Skeleton width={100} />
            ) : (
              new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
            )}
          </Typography>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default UserProfile;