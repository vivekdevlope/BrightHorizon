import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const NotFound = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      {/* Animated Background Particles */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: ["-100%", "120%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
            style={{
              position: "absolute",
              left: `${15 + i * 13}%`,
              width: 4,
              height: 4,
              background: "rgba(79, 70, 229, 0.3)",
              borderRadius: "50%",
              filter: "blur(1px)",
            }}
          />
        ))}
      </Box>

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            textAlign: "center",
            p: { xs: 3, sm: 4 },
          }}
        >
          {/* Large Animated 404 */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "6rem", sm: "9rem", md: "11rem" },
                fontWeight: 900,
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.05em",
                lineHeight: 1,
                mb: 2,
                textShadow: "0 10px 30px rgba(79, 70, 229, 0.2)",
              }}
            >
              404
            </Typography>
          </motion.div>

          {/* Error Icon */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ErrorOutlineIcon
              sx={{
                fontSize: { xs: 60, sm: 80 },
                color: "#c7d2fe",
                mb: 2,
              }}
            />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#1e293b",
                mb: 1.5,
                fontSize: { xs: "1.75rem", sm: "2.125rem" },
              }}
            >
              Page Not Found
            </Typography>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#64748b",
                mb: 4,
                maxWidth: 480,
                mx: "auto",
                fontSize: { xs: "1rem", sm: "1.1rem" },
                lineHeight: 1.7,
              }}
            >
              The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
            </Typography>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              component={Link}
              to="/"
              size="large"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1.1rem",
                px: 4,
                py: 1.5,
                borderRadius: 3,
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)",
                  boxShadow: "0 15px 35px rgba(79, 70, 229, 0.4)",
                  transform: "translateY(-2px)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              Back to Home
            </Button>
          </motion.div>

          {/* Optional: Fun micro-copy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{ marginTop: "2.5rem" }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "#94a3b8",
                fontStyle: "italic",
                fontSize: "0.875rem",
              }}
            >
              Psst... maybe try searching from the homepage?
            </Typography>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;