import React from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  InputAdornment,
} from '@mui/material';
import {
  Person,
  Email,
  Business,
  Category,
  Message,
  Send as SendIcon,
  Phone,
  LocationOn,
  Language,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createEnquiry } from '../../api/apiRoutes';


import wLogo from "../../assets/logo/bosch.png";
import aLogo from "../../assets/logo/EGA.png";
import bLogo from "../../assets/logo/genetech.png";
import cLogo from "../../assets/logo/interst.png";
import dLogo from "../../assets/logo/john dere.jpg";
import eLogo from "../../assets/logo/morgan.jpg";
import fLogo from "../../assets/logo/newell.png";
import gLogo from "../../assets/logo/saudia ceramics.jpg";
import hLogo from "../../assets/logo/ssmc.jpg";
import iLogo from "../../assets/logo/stanley.png";
import jLogo from "../../assets/logo/vista.png";
import contactImage from "../../assets/client/contact.jpg";
import { blue } from '@mui/material/colors';


// === Schema (unchanged) ===
const schema = z.object({
  fullName: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email'),
  company: z.string().min(1, 'Company is required'),
  interestedIn: z.string().min(1, 'Please select an option'),
  message: z.string().min(10, 'Message should be at least 10 characters'),
});

const interests = [
  'Web Development',
  'Mobile Apps',
  'UI/UX Design',
  'Cloud Solutions',
  'AI & Automation',
  'Consulting',
  'Other',
];

const Contact = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      company: '',
      interestedIn: '',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await createEnquiry(data);
      reset();
      toast.success('Message recieved! We’ll contact you soon.', {
        style: {
          borderRadius: '14px',
          background: '#ffffff',
          color: '#0f172a',
          fontWeight: 600,
          border: '1px solid #e2e8f0',
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Oops! Try again.', {
        style: {
          borderRadius: '14px',
          background: '#fef2f2',
          color: '#991b1b',
          border: '1px solid #fecaca',
        },
      });
    }
  };

  return (

    <>

    {/* === TOP IMAGE BANNER === */}
{/* === FULL-SCREEN BACKGROUND BANNER === */}
<Box className='h-screen'
  sx={{
    position: 'relative',
    width: '100%',
    minHeight: { xs: '50vh', sm: '60vh', md: '95vh' },
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    pb: { xs: 6, sm: 8, md: 10 },
    mt: { xs: 8, md: -20 },
    overflow: 'hidden',
  }}
>
  {/* Fixed Full-Screen Background */}
  <Box className='h-screen'
    sx={{
      position: 'fixed',
      inset: 0,
      zIndex: -10,
      backgroundImage:
        "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    {/* Dark Gradient Overlay */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4), transparent)',
      }}
    />
  </Box>

  {/* Banner Text */}
  <Typography
    variant="h2"
    sx={{
      fontWeight: 700,
      fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' },
      color: 'white',
      textAlign: 'center',
      textShadow: '0 4px 12px rgba(0,0,0,0.8)',
      px: { xs: 2, md: 4 },
      mb: { xs: 2, md: 4 },
      zIndex: 1,
    }}
  >
    We are Here to Build Something Extraordinary Together
  </Typography>
</Box>
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f8fafc 0%, #e0e7ff 100%)',
        py: { xs: 8, md: 12 },
      }}
    >
      {/* === TOP IMAGE BANNER === */}
{/* <Box
  sx={{
    position: 'relative',
    width: '100%',
    height: { xs: '45vh', md: '75vh' },
    backgroundImage: `url(${contactImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'flex-end', // text near bottom
    justifyContent: 'center',
    pb: { xs: 6, md:10 },
    mt: { xs: 8, md: -20 }, // 👈 prevents navbar from overlapping
  }}
>
  <Typography
    variant="h2"
    sx={{
      fontWeight: 600,
      fontSize: { xs: '2.5rem', md: '3.8rem' },
      color: 'white',
      textShadow: '0 4px 10px rgba(0,0,0,0.9)',
      textAlign: 'center',
    }}
  >
    We’re Here to Build Something Extraordinary Together
  </Typography>
</Box> */}



      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 mt-16"
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.8rem', md: '4.5rem' },
              color: '#1e40af',
              mb: 2,
            }}
          >
            Let’s get in touch!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: 720,
              mx: 'auto',
              color: '#64748b',
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.7,
            }}
          >
            Our ideas for business success are available to you, wherever you are
            located.
          </Typography>
        </motion.div>

        {/* Form + Image */}
      <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, delay: 0.2 }}
  className="w-full max-w-3xl mx-auto"
>
  <Box
     component="form"
  onSubmit={handleSubmit(onSubmit)}
  sx={{
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    borderRadius: 6,
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.12)',
    p: { xs: 5, md: 7 },
    pl: { xs: 4, md: 13 }, // 👈 this moves form content toward center
    border: '1px solid rgba(255, 255, 255, 0.4)',
    width: '98%',
    maxWidth: 900,
    mx: 'auto',
    }}
  >
    <Grid container spacing={5} alignItems="flex-start">
      {/* ROW 1: Name + Email */}
      <Grid item  xs={12} sm={6} md={9}>
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Name"
               placeholder="Enter your full name....."
              variant="outlined"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: '#94a3b8', fontSize: 22 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                  backgroundColor: '#ffffff',
                  fontSize: '1.05rem',
                  height: 66,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 6px 18px rgba(0,0,0,0.09)',
                    backgroundColor: '#f9fafb',
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.25)',
                  },
                },
                '& .MuiInputLabel-root': {
                  fontWeight: 600,
                  color: '#475569',
                  fontSize: '1rem',
                  top: 2,
                },
              }}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={11}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
               placeholder="Enter your email....."
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#94a3b8', fontSize: 22 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                  backgroundColor: '#ffffff',
                  fontSize: '1.05rem',
                  height: 66,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 6px 18px rgba(0,0,0,0.09)',
                    backgroundColor: '#f9fafb',
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.25)',
                  },
                },
                '& .MuiInputLabel-root': {
                  fontWeight: 600,
                  color: '#475569',
                  fontSize: '1rem',
                  top: 2,
                },
              }}
            />
          )}
        />
      </Grid>

      {/* ROW 2: Company + Interested In */}
<Grid item xs={12} sm={6} md={9}>
  <Controller
    name="company"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        fullWidth
        label="Company"
        variant="outlined"
         placeholder="Company Name"
        error={!!errors.company}
        helperText={errors.company?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Business sx={{ color: '#94a3b8', fontSize: 22 }} />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            backgroundColor: '#ffffff',
            fontSize: '1.05rem',
            height: 66,
            boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 6px 18px rgba(0,0,0,0.09)',
              backgroundColor: '#f9fafb',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.25)',
            },
          },
          '& .MuiInputLabel-root': {
            fontWeight: 600,
            color: '#475569',
            fontSize: '1rem',
            top: 2,
          },
        }}
      />
    )}
  />
</Grid>

{/* Interested In Field */}
<Grid item xs={12} sm={6} md={11} >   {/* changed to sm={6} to match Company width */}
  <Controller
    name="interestedIn"
    control={control}
    defaultValue=""               // start empty (or previously saved value)
    render={({ field }) => (
      <TextField
        {...field}
        fullWidth
        label="Interested In"
        placeholder="Type your interest here..."
        variant="outlined"
        error={!!errors.interestedIn}
        helperText={errors.interestedIn?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Category sx={{ color: '#94a3b8', fontSize: 22 }} />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            backgroundColor: '#ffffff',
            fontSize: '1.05rem',
            height: 66,
            boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 6px 18px rgba(0,0,0,0.09)',
              backgroundColor: '#f9fafb',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.25)',
            },
          },
          '& .MuiInputLabel-root': {
            fontWeight: 600,
            color: '#475569',
            fontSize: '1rem',
            top: 2,
          },
        }}
      />
    )}
  />
</Grid>

      {/* ROW 3: Message */}
{/* ---------- MESSAGE BOX (full width) ---------- */}
<Grid item xs={12} sx={{ flexBasis: '100% !important', maxWidth: '90% !important' }}>
  <Controller
    name="message"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        multiline
        rows={5}
        fullWidth
        label="Message"
        variant="outlined"
        placeholder="Write your message here..."
        error={!!errors.message}
        helperText={errors.message?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Message sx={{ color: '#94a3b8', mt: 1.9 }} />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            backgroundColor: '#ffffff',
            fontSize: '1.05rem',
            boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
            transition: 'all 0.3s ease',
            display: 'flex',          // needed for multiline alignment
            alignItems: 'flex-start', // <-- this moves icon to top
            '& textarea': {
              lineHeight: 1.7,
              py: 1,
            },
            '&:hover': {
              boxShadow: '0 6px 18px rgba(0,0,0,0.09)',
              backgroundColor: '#f9fafb',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.25)',
            },
          },
          '& .MuiInputLabel-root': {
            fontWeight: 600,
            color: '#475569',
            fontSize: '1rem',
            top: 2,
          },
        }}
      />
    )}
  />
</Grid>

{/* ---------- SUBMIT BUTTON (full width, next row, centered) ---------- */}
<Grid
  item
  xs={12}
  sx={{
    flexBasis: '100% !important',
    maxWidth: '90% !important',
    // ensure this grid item doesn't try to put children inline with siblings
    display: 'block',
  }}
>
  <motion.div
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.96 }}
    style={{
      width: '100%',
      maxWidth: 560,
      margin: '32px auto 0', // centers horizontally and gives top spacing
    }}
  >
    <Button
      type="submit"
      variant="contained"
      size="large"
      fullWidth
      startIcon={<SendIcon />}
      disabled={isSubmitting}
      sx={{
        py: 3,
        fontSize: '1.25rem',
        fontWeight: 700,
        textTransform: 'none',
        borderRadius: 4,
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        boxShadow: '0 14px 35px rgba(30, 64, 175, 0.4)',
        '&:hover': {
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
          boxShadow: '0 20px 45px rgba(30, 64, 175, 0.5)',
          transform: 'translateY(-3px)',
        },
        '&:active': {
          transform: 'translateY(1px)',
        },
        '&:disabled': {
          background: '#94a3b8',
          boxShadow: 'none',
          color: '#e2e8f0',
        },
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
    </Button>
  </motion.div>
</Grid>

    </Grid>
  </Box>
</motion.div>

        {/* Contact Information Section */}
<Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    px: { xs: 2, sm: 3, md: 4 },
    py: { xs: 8, md: 12 },
    width: '100%',
    backgroundColor: 'transparent',
  }}
>
  <Box
    sx={{
      width: '100%',
      maxWidth: 1200, // limits total section width
      mx: 'auto',     // centers the entire grid
    }}
  >
    <Typography
    variant="h3"
    align="center"
    sx={{
      fontWeight: 900,
      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      mb: { xs: 6, md: 8 },
      fontSize: { xs: '2.5rem', md: '2.5rem' },
      letterSpacing: '1px',
    }}
  >
    Bright Horizon Info Tech <br /> Private Limited
  </Typography>
    <Grid
      container
      spacing={3}
      alignItems="stretch"
      justifyContent="center" // centers grid items horizontally
    >
      {/* ---------- LEFT – CONTACT INFO ---------- */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            background: 'rgba(255,255,255,0.97)',
            borderRadius: 4,
            boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
            p: { xs: 4, md: 5 },
            height: '100%',
            width: '100%',
            border: '1px solid rgba(30,64,175,0.08)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
              transform: 'translateY(-4px)',
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 4,
              fontSize: { xs: '1.5rem', md: '1.75rem' },
            }}
          >
            Get in Touch
          </Typography>

          {/* PHONE */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 2.5,
              p: 1.5,
              borderRadius: 2,
              transition: '0.3s',
              '&:hover': { backgroundColor: 'rgba(30,64,175,0.05)' },
            }}
          >
            <Box
              sx={{
                color: '#1e40af',
                bgcolor: 'rgba(30,64,175,0.1)',
                p: 1,
                borderRadius: 2,
                display: 'flex',
              }}
            >
              <Phone sx={{ fontSize: 20 }} />
            </Box>
            <Typography variant="body1">
              Mobile: <strong style={{ color: '#1f2937' }}>+91 8179401321</strong>
            </Typography>
          </Box>

          {/* EMAIL */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 2.5,
              p: 1.5,
              borderRadius: 2,
              transition: '0.3s',
              '&:hover': { backgroundColor: 'rgba(30,64,175,0.05)' },
            }}
          >
            <Box
              sx={{
                color: '#1e40af',
                bgcolor: 'rgba(30,64,175,0.1)',
                p: 1,
                borderRadius: 2,
                display: 'flex',
              }}
            >
              <Email sx={{ fontSize: 20 }} />
            </Box>
            <Typography variant="body1">
              <a
                href="mailto:info@brighthorizon.co.in"
                style={{
                  color: '#1f2937',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                info@brighthorizon.co.in
              </a>
            </Typography>
          </Box>

          {/* ADDRESS */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              mb: 2.5,
              p: 1.5,
              borderRadius: 2,
              transition: '0.3s',
            }}
          >
            <Box
              sx={{
                color: '#1e40af',
                bgcolor: 'rgba(30,64,175,0.1)',
                p: 1,
                borderRadius: 2,
                display: 'flex',
                mt: 0.5,
              }}
            >
              <LocationOn sx={{ fontSize: 20 }} />
            </Box>
            <Typography sx={{ fontSize: '0.95rem', color: '#4b5563' }}>
              <strong style={{ color: '#1f2937' }}>Office:</strong> 1-98/5/2A,
              Spacion Business Center,<br />
              Madhapur, Hitech City, Hyderabad, India.<br/>
              CIN: U62011TS2025PTC20108
            </Typography>
          </Box>

          {/* WEBSITE */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 1.5,
              borderRadius: 2,
              transition: '0.3s',
              '&:hover': { backgroundColor: 'rgba(30,64,175,0.05)' },
            }}
          >
            <Box
              sx={{
                color: '#1e40af',
                bgcolor: 'rgba(30,64,175,0.1)',
                p: 1,
                borderRadius: 2,
                display: 'flex',
              }}
            >
              <Language sx={{ fontSize: 20 }} />
            </Box>
            <Typography variant="body1">
              <a
                href="https://www.BrightHorizon.co.in"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#1f2937',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                www.BrightHorizon.co.in
              </a>
            </Typography>
          </Box>
        </Box>
      </Grid>



      

      {/* ---------- RIGHT – GOOGLE MAP ---------- */}
{/* ---------- RIGHT – GOOGLE MAP ---------- */}
<Grid item xs={12} md={6}>
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    style={{ height: '100%' }} // ensures motion.div stretches
  >
    <Box
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
        height: '100%',
        minHeight: { xs: 320, md: 460 },
        border: '1px solid rgba(0,0,0,0.08)',
        display: 'flex',             // make Box a flex container
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 24px 55px rgba(0,0,0,0.18)',
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Box
        sx={{
          flexGrow: 1,               // takes all available vertical space
          width: '100%',
        }}
      >
        <iframe
          title="Bright Horizon Office - Spacion Business Center, Hyderabad"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3618447346435!2d78.3833379!3d17.4423869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e1cce19e45%3A0x8afe79bd4bbf5d0b!2s1-98%2F5%2F2A%2C%20Spacion%20Business%20Center%2C%20Madhapur%2C%20Hitech%20city%20Lingampalli%2C%20Hyderabad%2C%20Telangana%2C%20India!5e0!3m2!1sen!2sin!4v1762596618103!5m2!1sen!2sin"
          style={{
            border: 0,
            width: '100%',
            height: '100%', // keeps it full height
            display: 'block',
          }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Box>
    </Box>
  </motion.div>
</Grid>

    </Grid>
  </Box>
</Box>


        {/* === CONTACT INFORMATION (NEW) === */}
        <Box
          sx={{
            mt: { xs: 12, md: 16 },
            p: { xs: 4, md: 6 },
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 3,
            boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: '#1e40af',
              mb: 3,
            }}
          >
            THANK YOU 
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <Phone sx={{ color: '#1e40af' }} />
                <Typography variant="body1" color="text.primary">
                  Mobile: <strong>+918179401321</strong>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <Email sx={{ color: '#1e40af' }} />
                <Typography variant="body1" color="text.primary">
                  <a href="mailto:info@brighthorizon.co.in" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <strong>info@brighthorizon.co.in | CIN: U62011TS2025PTC20108</strong>
                  </a>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <LocationOn sx={{ color: '#1e40af' }} />
                <Typography variant="body1" color="text.primary" sx={{ fontSize: '0.9rem' }}>
                  <strong>Bright Horizon InfoTech </strong>
                  <strong>Office:</strong> 1-98/5/2A, Spacion Business Center, Madhapur, Hitech 
                  city Lingampalli, Hyderabad, Telangana, India
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <Language sx={{ color: '#1e40af' }} />
                <Typography variant="body1" color="text.primary">
                  <a href="https://www.BrightHorizon.co.in" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <strong>www.BrightHorizon.co.in</strong>
                  </a>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>


        {/* Client Logos */}
      <Box sx={{ mt: { xs: 12, md: 16 }, overflow: 'hidden' }}>
  <Typography
    variant="h5"
    textAlign="center"
    fontWeight={700}
    color="text.primary"
    mb={6}
  >
    Trusted by Leading Enterprises
  </Typography>

  <motion.div
    animate={{ x: ['0%', '-50%'] }} // scroll half width for seamless loop
    transition={{
      duration: 25,
      repeat: Infinity,
      ease: 'linear',
    }}
    style={{ display: 'flex', gap: '60px', width: 'max-content' }}
  >
    {[...Array(2)].map((_, loopIndex) =>
      [
        wLogo,
        aLogo,
        bLogo,
        cLogo,
        dLogo,
        eLogo,
        fLogo,
        gLogo,
        hLogo,
        iLogo,
        jLogo,
      ].map((logo, i) => (
        <Box
          key={loopIndex + '-' + i}
          component="img"
          src={logo}
          alt={`logo-${i}`}
          sx={{
            height: 60,         // uniform height
            maxHeight: 60,
            width: 'auto',      // auto width to preserve aspect ratio
            maxWidth: 120,      // limit wide logos like jLogo
            objectFit: 'contain',
            opacity: 0.9,
            transition: 'all 0.3s',
            '&:hover': { opacity: 1, transform: 'scale(1.05)' },
          }}
        />
      ))
    )}
  </motion.div>
</Box>

      </Container>
    </Box>
    </>
  );
};

export default Contact;