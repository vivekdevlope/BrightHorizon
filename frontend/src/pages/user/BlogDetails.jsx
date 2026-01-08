import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Chip,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const IMAGE_HEIGHT = 400;

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        console.log("Fetched Blog:", res.data);

        if (res.data.blog) setBlog(res.data.blog);
        else if (res.data.data) setBlog(res.data.data);
        else setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (!blog)
    return (
      <Typography variant="h6" align="center" color="error" sx={{ mt: 10 }}>
        Blog not found.
      </Typography>
    );

  return (
    <Box sx={{ backgroundColor: "#f9fafb", minHeight: "100vh", py: 10 }}>
      <Card
        sx={{
          maxWidth: 900,
          mx: "auto",
          borderRadius: 4,
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          overflow: "hidden",
          backgroundColor: "white",
        }}
      >
        {/* Image Section */}
        <Box sx={{ position: "relative", height: IMAGE_HEIGHT, overflow: "hidden" }}>
          {blog.imageUrl ? (
            <CardMedia
              component="img"
              image={
                blog.imageUrl.startsWith("http")
                  ? blog.imageUrl
                  : `http://localhost:5000${blog.imageUrl}`
              }
              alt={blog.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.6s ease",
                "&:hover": { transform: "scale(1.08)" },
              }}
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "linear-gradient(135deg, #e0e7ff, #c7d2fe)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="#6366f1" fontWeight="bold" variant="h6">
                No Image
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.6))",
            }}
          />
        </Box>

        {/* Content Section */}
        <CardContent sx={{ p: 5 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#1e293b" }}
          >
            {blog.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            {blog.category && <Chip label={blog.category} color="primary" />}
            <Typography variant="body2" color="text.secondary">
              By {blog.author || "Admin"} •{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </Typography>
          </Box>

          {/* Blog Content */}
        {/* Blog Content */}
<Box sx={{ mb: 4 }}>
  {blog.content ? (
    <Typography
      variant="body1"
      sx={{
        lineHeight: 1.8,
        color: "#334155",
      }}
      component="div"
      dangerouslySetInnerHTML={{
        __html: blog.content.replace(/<p>(\s|&nbsp;)*<\/p>/g, ""),
      }}
    />
  ) : blog.description ? (
    <Typography
      variant="body1"
      sx={{
        lineHeight: 1.8,
        color: "#334155",
      }}
      component="div"
      dangerouslySetInnerHTML={{
        __html: blog.description.replace(/<p>(\s|&nbsp;)*<\/p>/g, ""),
      }}
    />
  ) : blog.body ? (
    <Typography
      variant="body1"
      sx={{
        lineHeight: 1.8,
        color: "#334155",
      }}
      component="div"
      dangerouslySetInnerHTML={{
        __html: blog.body.replace(/<p>(\s|&nbsp;)*<\/p>/g, ""),
      }}
    />
  ) : (
    <Typography variant="body2" color="text.secondary">
      No content available for this blog.
    </Typography>
  )}
</Box>


          {/* ✅ Go Back Button */}
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(-1)}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,
                px: 4,
                py: 1.3,
                bgcolor: "#1e40af",
                "&:hover": { bgcolor: "#1e3a8a" },
              }}
            >
              ← Go Back
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BlogDetails;
