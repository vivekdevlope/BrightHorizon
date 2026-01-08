import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Alert,
  Skeleton,
  useTheme,
  alpha,
  Avatar,
  IconButton,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  Article as ArticleIcon,
  ContactMail as ContactMailIcon,
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { getBlogStats, getEnquiryStats } from '../../api/apiRoutes';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ blogs: 0, enquiries: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        setLoading(true);
        const [blogResponse, enquiryResponse] = await Promise.all([
          getBlogStats(),
          getEnquiryStats(),
        ]);
        if (isMounted) {
          setStats({
            blogs: blogResponse.data.totalBlogs || 0,
            enquiries: enquiryResponse.data.totalEnquiries || 0,
          });
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || 'Failed to load dashboard stats');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  // Re-usable modern stat card
  const StatCard = ({ title, value, icon: Icon, color }) => (
    <Card
      sx={{
        height: '100%',
        borderRadius: 4,
        overflow: 'hidden',
        background: alpha(theme.palette.background.paper, 0.85),
        backdropFilter: 'blur(12px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
        boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.08)}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.12)}`,
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: alpha(color, 0.15),
              display: 'flex',
              mr: 3,
            }}
          >
            <Icon sx={{ fontSize: 36, color }} />
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              fontWeight={600}
              letterSpacing="0.8px"
              textTransform="uppercase"
            >
              {title}
            </Typography>
          </Box>
        </Box>

        {loading ? (
          <Skeleton
            variant="text"
            width={140}
            height={80}
            animation="wave"
            sx={{ bgcolor: alpha(theme.palette.grey[500], 0.15), borderRadius: 2 }}
          />
        ) : (
          <Typography
            variant="h2"
            fontWeight={800}
            color={color}
            sx={{
              fontSize: { xs: '2.8rem', sm: '3.2rem' },
              lineHeight: 1,
              letterSpacing: '-1.5px',
            }}
          >
            {value.toLocaleString()}
          </Typography>
        )}
      </CardContent>

      {/* Gradient accent bar */}
      <Box
        sx={{
          height: 6,
          background: `linear-gradient(90deg, ${color}, ${alpha(color, 0.7)})`,
        }}
      />
    </Card>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
      }}
    >
      {/* ==== TOP BAR ==== */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          bgcolor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          backdropFilter: 'blur(8px)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: { xs: 2, md: 3 },
            maxWidth: 1400,
            mx: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton size="large">
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ letterSpacing: '-0.5px' }}
            >
              Platform Admin
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              {currentTime.toLocaleString()}
            </Typography>
            <Tooltip title="Admin User">
              <IconButton>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {/* ==== MAIN CONTENT ==== */}
      <Box sx={{ maxWidth: 1400, mx: 'auto', p: { xs: 3, md: 5 } }}>
        {/* Page Title */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h3"
            fontWeight={800}
            color="text.primary"
            sx={{
              fontSize: { xs: '2.2rem', md: '2.8rem' },
              letterSpacing: '-1px',
            }}
          >
            Dashboard Overview
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 1.5, fontSize: '1.1rem', fontWeight: 500 }}
          >
            Real-time insights into your platform performance.
          </Typography>
        </Box>

        {/* Error */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 4,
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
              bgcolor: alpha(theme.palette.error.main, 0.08),
              '& .MuiAlert-icon': { fontSize: 28 },
            }}
          >
            {error}
          </Alert>
        )}

        {/* Stats Grid */}
        <Grid container spacing={{ xs: 3, lg: 4 }}>
          <Grid item xs={12} md={6}>
            <StatCard
              title="Total Blogs"
              value={stats.blogs}
              icon={ArticleIcon}
              color={theme.palette.primary.main}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <StatCard
              title="Total Enquiries"
              value={stats.enquiries}
              icon={ContactMailIcon}
              color={theme.palette.success.main}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 6, borderColor: alpha(theme.palette.divider, 0.2) }} />

        {/* Footer note */}
        <Typography
          variant="caption"
          color="text.disabled"
          sx={{ display: 'block', textAlign: 'center', fontWeight: 500 }}
        >
          © {new Date().getFullYear()} Your Company • All metrics update in real-time
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminDashboard;