// src/pages/user/Blogs.jsx
import React, { useEffect, useContext, useState, useMemo } from "react";
import { BlogContext } from "../../context/BlogContext";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Box,
  Chip,
  Avatar,
  Stack,
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  InputAdornment,
  Pagination,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Fade,
  Container,
  Paper,
} from "@mui/material";
import {
  AccessTime,
  Person,
  Search as SearchIcon,
  Refresh,
  Share,
} from "@mui/icons-material";
import { format } from "date-fns";
import toast from "react-hot-toast";

const CARD_HEIGHT = 540;
const IMAGE_HEIGHT = 230;
const BLOGS_PER_PAGE = 6;

const Blogs = () => {
  const { blogs, loading, fetchBlogs } = useContext(BlogContext);
  const { user } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, selectedTag, searchQuery, sortBy]);

  const categories = useMemo(() => {
    const cats = ["all", ...new Set(blogs.flatMap((b) => b.categories || []))];
    return cats.sort();
  }, [blogs]);

  const tags = useMemo(() => {
    const all = blogs.flatMap((b) => b.tags || []);
    return [...new Set(all)].sort();
  }, [blogs]);

  const estimateReadingTime = (blog) => {
    const text = blog.content ?? blog.description ?? "";
    const words = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const filteredBlogs = useMemo(() => {
    let list = [...blogs];

    if (selectedCategory !== "all") {
      list = list.filter((b) => b.categories?.includes(selectedCategory));
    }

    if (selectedTag) {
      list = list.filter((b) => b.tags?.includes(selectedTag));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (b) =>
          b.title?.toLowerCase().includes(q) ||
          b.author?.toLowerCase().includes(q) ||
          b.description?.toLowerCase().includes(q) ||
          b.content?.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      return sortBy === "newest" ? db - da : da - db;
    });

    return list;
  }, [blogs, selectedCategory, selectedTag, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
  const paginatedBlogs = useMemo(() => {
    const start = (page - 1) * BLOGS_PER_PAGE;
    return filteredBlogs.slice(start, start + BLOGS_PER_PAGE);
  }, [filteredBlogs, page]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedTag("");
    setSearchQuery("");
    setSortBy("newest");
  };

  const shareBlog = (blogId) => {
    const base = window.location.origin;
    const url = `${base}/blog/${blogId}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  if (loading) {
    return (
      <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Skeleton variant="rectangular" height={IMAGE_HEIGHT} sx={{ borderRadius: 4 }} />
                <Skeleton height={32} sx={{ mt: 2, borderRadius: 2 }} />
                <Skeleton height={20} width="70%" sx={{ mt: 1 }} />
                <Skeleton height={80} sx={{ mt: 2 }} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>
    {/* ────────────────────── HERO SECTION (with image) ────────────────────── */}
<Box
  sx={{
    position: "relative",
    py: { xs: 0, md: 0 },
    pb: { xs: 10, md: 14 },
    textAlign: "center",
    overflow: "hidden",
    minHeight: "80vh",
    mt: "-5vw",
    // Removed mt & pt – using flex centering instead
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      backgroundImage: "url('https://images.pexels.com/photos/272337/pexels-photo-272337.jpeg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.9,
      pb: 9,
      zIndex: 0, // ← FIXED: Now behind text
    },
  }}
>
  <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
    <Typography
      variant="h3"
      fontWeight={900}
      sx={{
        mb: 2,
        fontSize: { xs: "2.5rem", md: "4rem" },
        letterSpacing: "-0.5px",
        color: "white",
        textShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      Explore Our Blogs
    </Typography>
    <Typography
      variant="h6"
      sx={{
        opacity: 0.95,
        maxWidth: 720,
        mx: "auto",
        fontWeight: 500,
        color: "white",
        textShadow: "0 1px 6px rgba(0,0,0,0.4)",
      }}
    >
      Insights, innovations, and stories from BrightHorizon Infotech
    </Typography>
  </Container>
</Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* FILTER BAR */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 4,
            p: { xs: 3, md: 4 },
            mb: 6,
            bgcolor: "white",
            border: "1px solid #e2e8f0",
          }}
        >
          {/* Search + Sort */}
    <Stack
  direction={{ xs: "column", md: "row" }}
  spacing={{ xs: 2, md: 3 }}
  alignItems="center"
  justifyContent="space-between"
  sx={{
    mb: 3,
    p: { xs: 1, md: 0 },
    bgcolor: "transparent",
    borderRadius: 3,
    transition: "all 0.3s ease",
  }}
>
  {/* Search Box – Sleek, Floating Label, Minimal */}
  <Box
    sx={{
      position: "relative",
      width: { xs: "100%", md: 400 },
      maxWidth: 500,
    }}
  >
    <TextField
      fullWidth
      placeholder="Search blogs by title, author, or content..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      variant="outlined"
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          height: 48,
          borderRadius: 3,
          bgcolor: "#ffffff",
          fontSize: "0.95rem",
          fontWeight: 500,
          border: "1px solid #e2e8f0",
          transition: "all 0.25s ease",
          "&:hover": {
            borderColor: "#94a3b8",
            boxShadow: "0 0 0 3px rgba(148, 163, 184, 0.15)",
          },
          "&.Mui-focused": {
            borderColor: "#3b82f6",
            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.25)",
          },
        },
        "& .MuiInputBase-input": {
          py: 1.5,
          pl: 1,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
    />
  </Box>

  {/* Sort Dropdown – Clean, Elevated, Modern */}
  <FormControl
    size="small"
    sx={{
      minWidth: { xs: "100%", md: 180 },
      maxWidth: { xs: "100%", md: 200 },
    }}
  >
    <InputLabel
      sx={{
        fontWeight: 600,
        color: "#475569",
        fontSize: "0.9rem",
        "&.Mui-focused": { color: "#3b82f6" },
      }}
    >
      Sort By
    </InputLabel>
    <Select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      label="Sort By"
      sx={{
        height: 48,
        borderRadius: 3,
        bgcolor: "#ffffff",
        fontSize: "0.9rem",
        fontWeight: 500,
        border: "1px solid #e2e8f0",
        transition: "all 0.25s ease",
        "&:hover": {
          borderColor: "#94a3b8",
          boxShadow: "0 0 0 3px rgba(148, 163, 184, 0.15)",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#3b82f6",
          boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.25)",
        },
        "& .MuiSelect-select": {
          py: 1.5,
          display: "flex",
          alignItems: "center",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            mt: 1,
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            border: "1px solid #e2e8f0",
          },
        },
      }}
    >
      <MenuItem value="newest" sx={{ fontWeight: 500 }}>
        Newest First
      </MenuItem>
      <MenuItem value="oldest" sx={{ fontWeight: 500 }}>
        Oldest First
      </MenuItem>
    </Select>
  </FormControl>
</Stack>


          {/* Categories */}
          {/* <Box sx={{ mb: 3 }}>
            <ToggleButtonGroup
              value={selectedCategory}
              exclusive
              onChange={(_e, cat) => cat && setSelectedCategory(cat)}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                justifyContent: "center",
                "& .MuiToggleButton-root": {
                  borderRadius: 3,
                  textTransform: "none",
                  px: 3,
                  py: 1.2,
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  border: "1px solid #cbd5e1",
                  bgcolor: "#ffffff",
                  color: "#475569",
                  "&.Mui-selected": {
                    bgcolor: "#1e40af",
                    color: "white",
                    borderColor: "#1e40af",
                    "&:hover": { bgcolor: "#1e3a8a" },
                  },
                  "&:hover": { bgcolor: "#f8fafc" },
                },
              }}
            >
              {categories.map((cat) => (
                <ToggleButton key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box> */}

          {/* Tags */}
          {tags.length > 0 && (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 600 }}>
                Filter by Tags
              </Typography>
              <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={1}>
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                    color={selectedTag === tag ? "primary" : "default"}
                    size="small"
                    sx={{
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      height: 28,
                      transition: "all 0.2s",
                      bgcolor: selectedTag === tag ? "#3b82f6" : "#f1f5f9",
                      color: selectedTag === tag ? "white" : "#475569",
                      "&:hover": {
                        bgcolor: selectedTag === tag ? "#2563eb" : "#e2e8f0",
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Paper>

        {/* BLOG GRID – 3 PER ROW */}
      <Grid container spacing={4} justifyContent="center">
  {paginatedBlogs.length === 0 ? (
    <Box sx={{ textAlign: "center", py: 10, width: "100%" }}>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
        No blogs match your filters.
      </Typography>
      <Button onClick={clearFilters} variant="contained" sx={{ borderRadius: 3 }}>
        Clear Filters
      </Button>
    </Box>
  ) : (
    paginatedBlogs.map((blog, index) => (
      <Grid item xs={12} md={4} key={blog._id}>
        <Fade in timeout={300 + index * 100}>
          <Card
            sx={{
              height: CARD_HEIGHT,
              maxWidth: 360,                    // Fixed width
              mx: "auto",                       // Center card
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              bgcolor: "white",
              "&:hover": {
                transform: "translateY(-12px)",
                boxShadow: "0 24px 60px rgba(30,64,175,0.18)",
              },
            }}
          >
            {/* Image */}
            <Box sx={{ height: IMAGE_HEIGHT, overflow: "hidden" }}>
              {blog.imageUrl ? (
                <CardMedia
                  component="img"
                  image={`http://localhost:5000${blog.imageUrl}`}
                  alt={blog.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                    "&:hover": { transform: "scale(1.08)" },
                  }}
                />
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    bgcolor: "#e0e7ff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6366f1",
                  }}
                >
                  <Typography variant="h5" fontWeight="bold">BH</Typography>
                  <Typography variant="caption">Blog</Typography>
                </Box>
              )}
            </Box>

            {/* Content */}
            <CardContent
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                height: CARD_HEIGHT - IMAGE_HEIGHT,  // Fixed content height
                justifyContent: "space-between",
              }}
            >
              {/* Title – max 2 lines */}
              <Typography
                variant="h6"
                fontWeight={800}
                sx={{
                  mb: 1.5,
                  lineHeight: 1.3,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "#1e293b",
                }}
              >
                {blog.title}
              </Typography>

              {/* Author + Read Time */}
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar sx={{ bgcolor: "#1e40af", width: 34, height: 34, fontSize: "0.9rem" }}>
                    {blog.author?.[0] || <Person />}
                  </Avatar>
                  <Typography variant="body2" fontWeight={600} color="#475569">
                    {blog.author}
                  </Typography>
                </Stack>

                <Chip
                  icon={<AccessTime fontSize="small" />}
                  label={`${estimateReadingTime(blog)} min read`}
                  size="small"
                  sx={{
                    bgcolor: "#f0f9ff",
                    color: "#0369a1",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                />
              </Stack>

              {/* Description – max 3 lines + ellipsis */}
             <Typography
  variant="body2"
  color="text.secondary"
  sx={{
    mb: 2,
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineHeight: 1.6,
  }}
  component="div" // Important: allows HTML content inside Typography
  dangerouslySetInnerHTML={{ __html: blog.description }}
/>


              {/* Tags */}
              {blog.tags?.length > 0 && (
                <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ mb: 2 }}>
                  {blog.tags.slice(0, 3).map((t) => (
                    <Chip
                      key={t}
                      label={t}
                      size="small"
                      sx={{
                        fontSize: "0.7rem",
                        height: 24,
                        bgcolor: "#e0f2fe",
                        color: "#0369a1",
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Stack>
              )}

              {/* Action Buttons */}
              <Stack direction="row" spacing={1}>
                <Button
                  fullWidth
                  component={Link}
                  to={user ? `/blog/${blog._id}` : "/login"}
                  variant="contained"
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    py: 1.3,
                    bgcolor: "#1e40af",
                    "&:hover": { bgcolor: "#1e3a8a" },
                  }}
                >
                  {user ? "Read More" : "Login to Read"}
                </Button>

                <Tooltip title="Copy link">
                  <IconButton
                    onClick={() => shareBlog(blog._id)}
                    sx={{
                      bgcolor: "#f1f5f9",
                      "&:hover": { bgcolor: "#e2e8f0" },
                      borderRadius: 2,
                    }}
                  >
                    <Share fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </CardContent>
          </Card>
        </Fade>
      </Grid>
    ))
  )}
</Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_e, val) => setPage(val)}
              color="primary"
              size="large"
              sx={{
                "& .MuiPaginationItem-root": {
                  borderRadius: 3,
                  fontWeight: 600,
                  mx: 0.3,
                },
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Blogs;