// src/pages/admin/ManageBlogs.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  TablePagination,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEditor, EditorContent } from '@tiptap/react';

import {
  Add as AddIcon,
  Close as CloseIcon,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  UploadFile,
  Publish as PublishIcon,
} from '@mui/icons-material';
import { getAllBlogsAdmin, createBlog, updateBlog, deleteBlog, archiveBlog } from '../../api/apiRoutes';
import BlogTable from '../../components/admin/BlogTable';
import toast from 'react-hot-toast';

const BACKEND_URL = 'http://localhost:5000';
const DRAFT_KEY = 'blog_draft_v2';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [editor, setEditor] = useState(null);
  // Add this state near the top with other useState
const [imagePopup, setImagePopup] = useState(null);

  const [form, setForm] = useState({
    title: '',
    author: '',
    categories: [],
    tags: [],
    image: null,
    slug: '',
  });
  const [imagePreview, setImagePreview] = useState('');

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((value) => setSearch(value), 300),
    []
  );

 const [editor, setEditor] = useState(null);


  // Initialize editor only when modal opens
  // useEffect(() => {
  //   if (open && !editor) {
  //     const newEditor = new Editor({
  //       element: document.createElement('div'),
  //       extensions: [StarterKit, Image],
  //       content: '',
  //       editorProps: {
  //         attributes: {
  //           class: 'prose prose-sm sm:prose lg:prose-lg focus:outline-none min-h-[280px] p-4',
  //         },
  //       },
  //     });
  //     setEditor(newEditor);
  //   }

  //   return () => {
  //     if (editor) {
  //       editor.destroy();
  //       setEditor(null);
  //     }
  //   };
  // }, [open]);

  //----------------------------
useEffect(() => {
  const newEditor = new Editor({
    element: document.createElement('div'),
    extensions: [StarterKit, Image],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg focus:outline-none min-h-[280px] p-4',
      },
    },
  });
  setEditor(newEditor);

  return () => {
    newEditor.destroy();
  };
}, []);



  // Load draft
  useEffect(() => {
    if (open && !editingBlog) {
      const draft = localStorage.getItem(DRAFT_KEY);
      if (draft) {
        try {
          const { form: savedForm, imagePreview: savedPreview } = JSON.parse(draft);
          setForm(savedForm);
          setImagePreview(savedPreview);
          if (editor) editor.commands.setContent(savedForm.content || '');
        } catch (e) {
          localStorage.removeItem(DRAFT_KEY);
        }
      }
    }
  }, [open, editingBlog, editor]);

  // Auto-save draft
  useEffect(() => {
    if (open && !editingBlog && form.title) {
      const timeout = setTimeout(() => {
        const draft = {
          form: { ...form, content: editor?.getHTML() },
          imagePreview,
        };
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [form, imagePreview, editor, open, editingBlog]);

  // Sync editor when editing
  useEffect(() => {
    if (!editor) return;

    if (editingBlog) {
      editor.commands.setContent(editingBlog.description || '');
      setForm({
        title: editingBlog.title || '',
        author: editingBlog.author || '',
        categories: editingBlog.categories || [],
        tags: editingBlog.tags || [],
        image: null,
        slug: editingBlog.slug || '',
      });
      setImagePreview(editingBlog.imageUrl ? `${BACKEND_URL}${editingBlog.imageUrl}` : '');
    } else {
      editor.commands.clearContent();
      setForm({ title: '', author: '', categories: [], tags: [], image: null, slug: '' });
      setImagePreview('');
    }
  }, [editingBlog, editor]);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await getAllBlogsAdmin();
        setBlogs(res.data.blogs || []);
      } catch (err) {
        toast.error('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Search
  const filteredBlogs = useMemo(() => {
    const q = search.toLowerCase();
    return blogs.filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q) ||
        b.description?.toLowerCase().includes(q)
    );
  }, [search, blogs]);

  const paginatedBlogs = filteredBlogs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Auto slug
  useEffect(() => {
    if (form.title && !editingBlog) {
      const slug = form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setForm((f) => ({ ...f, slug }));
    }
  }, [form.title, editingBlog]);

  // Image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error('Max 5MB');
    if (!file.type.startsWith('image/')) return toast.error('Invalid image');

    setForm({ ...form, image: file });
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  // Submit
  const handleSubmit = async () => {
    setError('');
    const content = editor?.getHTML() || '';
    const text = editor?.getText().trim();

    if (!form.title || !form.author || !text || (!editingBlog && !form.image)) {
      return toast.error('Fill all required fields');
    }

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('author', form.author);
    formData.append('description', content);
    formData.append('categories', JSON.stringify(form.categories));
    formData.append('tags', JSON.stringify(form.tags));
    formData.append('slug', form.slug);
    if (form.image) formData.append('image', form.image);

    try {
      setLoading(true);
      if (editingBlog) {
        await updateBlog(editingBlog._id, formData);
        toast.success('Updated!');
      } else {
        await createBlog(formData);
        toast.success('Published!');
        localStorage.removeItem(DRAFT_KEY);
      }
      closeModal();
      const res = await getAllBlogsAdmin();
      setBlogs(res.data.blogs || []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  // Modal
  // const openModal = (blog = null) => {
  //   setEditingBlog(blog);
  //   setError('');
  //   setOpen(true);
  // };

  //-------------------------

  const openModal = (blog = null) => {
  setEditingBlog(blog);
  setError('');
  setOpen(true);

  if (blog) {
    editor?.commands.setContent(blog.description || '');
    setForm({
      title: blog.title || '',
      author: blog.author || '',
      categories: blog.categories || [],
      tags: blog.tags || [],
      image: null,
      slug: blog.slug || '',
    });
    setImagePreview(blog.imageUrl ? `${BACKEND_URL}${blog.imageUrl}` : '');
  } else {
    editor?.commands.clearContent();
    setForm({ title: '', author: '', categories: [], tags: [], image: null, slug: '' });
    setImagePreview('');
  }
};



  // const closeModal = () => {
  //   setOpen(false);
  //   setEditingBlog(null);
  //   setForm({ title: '', author: '', categories: [], tags: [], image: null, slug: '' });
  //   setImagePreview('');
  //   localStorage.removeItem(DRAFT_KEY);
  // };

  //----------------------------

  const closeModal = () => {
  setOpen(false);
  setEditingBlog(null);
  editor?.commands.clearContent();
  setForm({ title: '', author: '', categories: [], tags: [], image: null, slug: '' });
  setImagePreview('');
  localStorage.removeItem(DRAFT_KEY);
};



  if (loading && !open) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 5 }} />;
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Manage Blogs</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => openModal()}>
          Add Blog
        </Button>
      </Box>

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Search blogs..."
        onChange={(e) => debouncedSearch(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
        }}
      />

      {/* Table */}
      {filteredBlogs.length === 0 ? (
        <Alert severity="info">No blogs found.</Alert>
      ) : (
        <>
          <BlogTable
            blogs={paginatedBlogs}
            onEdit={openModal}
            onDelete={async (id) => {
              if (window.confirm('Delete?')) {
                await deleteBlog(id);
                const res = await getAllBlogsAdmin();
                setBlogs(res.data.blogs || []);
              }
            }}
            onArchive={async (id) => {
              if (window.confirm('Archive?')) {
                await archiveBlog(id);
                const res = await getAllBlogsAdmin();
                setBlogs(res.data.blogs || []);
              }
            }}
            onRefresh={async () => {
              const res = await getAllBlogsAdmin();
              setBlogs(res.data.blogs || []);
            }}
          />
          <TablePagination
            component="div"
            count={filteredBlogs.length}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </>
      )}

      {/* MODAL */}
  <Dialog
  open={open}
  onClose={closeModal}
  maxWidth="xl"
  fullWidth
  PaperProps={{
    sx: {
      borderRadius: 6,
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #f5f7ff 0%, #ffffff 100%)',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.12)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      maxHeight: '95vh',
    },
  }}
>
  {/* Header */}
  <DialogTitle
    sx={{
      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      color: 'white',
      py: 4,
      textAlign: 'center',
      fontWeight: 800,
      fontSize: '2rem',
      letterSpacing: '0.8px',
      position: 'relative',
      boxShadow: '0 6px 20px rgba(79, 70, 229, 0.3)',
    }}
  >
    {editingBlog ? 'Edit Blog Post' : 'Create New Blog'}
    <IconButton
      onClick={closeModal}
      sx={{
        position: 'absolute',
        right: 24,
        top: '50%',
        transform: 'translateY(-50%)',
        bgcolor: 'rgba(255,255,255,0.2)',
        color: 'white',
        '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
        transition: 'all 0.3s ease',
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  <DialogContent sx={{ p: 6, bgcolor: '#fafbff' }}>
    <Grid container spacing={6}>
      {/* Left: Form */}
      <Grid item xs={12} lg={7}>
        {/* Title */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight={700} color="#1e293b" gutterBottom>
            Blog Title
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter a compelling title..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            variant="outlined"
            InputProps={{
              sx: {
                borderRadius: 4,
                bgcolor: 'white',
                fontSize: '1.1rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#e2e8f0' },
                  '&:hover fieldset': { borderColor: '#94a3b8' },
                },
              },
            }}
          />
        </Box>

        {/* Author + Categories */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight={700} color="#1e293b" gutterBottom>
              Author
            </Typography>
            <TextField
              fullWidth
              placeholder="John Doe"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              required
              variant="outlined"
              InputProps={{
                sx: {
                  borderRadius: 4,
                  bgcolor: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight={700} color="#1e293b" gutterBottom>
              Categories
            </Typography>
            <FormControl fullWidth>
              <Select
                multiple
                value={form.categories || []}
                onChange={(e) => setForm({ ...form, categories: e.target.value })}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected.length) return <span style={{ color: '#94a3b8' }}>Select categories</span>;
                  return (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" color="secondary" />
                      ))}
                    </Box>
                  );
                }}
                sx={{
                  borderRadius: 4,
                  bgcolor: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' },
                }}
              >
                {['Technology', 'Design', 'Business', 'Lifestyle', 'Travel', 'Food', 'Health'].map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    <Checkbox checked={(form.categories || []).includes(cat)} size="small" />
                    <ListItemText primary={cat} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Rich Text Editor */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight={700} color="#1e293b" gutterBottom>
            Blog Content
          </Typography>
          <Box
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
              bgcolor: 'white',
            }}
          >
            <EditorContent
              editor={editor}
              style={{
                minHeight: 320,
                padding: '20px',
                fontSize: '1rem',
                lineHeight: 1.8,
              }}
            />
            <Box
              sx={{
                p: 2,
                bgcolor: '#f8fafc',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'center',
                gap: 1.5,
              }}
            >
              <IconButton
                size="small"
                onClick={() => editor.chain().focus().toggleBold().run()}
                sx={{
                  bgcolor: editor?.isActive('bold') ? '#e0e7ff' : 'transparent',
                  color: editor?.isActive('bold') ? '#4f46e5' : '#64748b',
                  '&:hover': { bgcolor: '#e0e7ff' },
                }}
              >
                <FormatBold />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                sx={{
                  bgcolor: editor?.isActive('italic') ? '#e0e7ff' : 'transparent',
                  color: editor?.isActive('italic') ? '#4f46e5' : '#64748b',
                }}
              >
                <FormatItalic />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                sx={{
                  bgcolor: editor?.isActive('bulletList') ? '#e0e7ff' : 'transparent',
                  color: editor?.isActive('bulletList') ? '#4f46e5' : '#64748b',
                }}
              >
                <FormatListBulleted />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Image Upload */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={700} color="#1e293b" gutterBottom>
            Featured Image
          </Typography>
          <Box
            sx={{
              border: '2px dashed',
              borderColor: form.image ? '#10b981' : '#cbd5e1',
              borderRadius: 4,
              p: 5,
              textAlign: 'center',
              bgcolor: form.image ? '#ecfdf5' : '#f8fafc',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#4f46e5',
                bgcolor: '#f0f4ff',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(79, 70, 229, 0.15)',
              },
            }}
            onClick={() => document.getElementById('image-upload').click()}
          >
            <input id="image-upload" type="file" hidden accept="image/*" onChange={handleImageChange} />
            {form.image ? (
              <Box>
                <Typography color="#059669" fontWeight="bold" sx={{ mb: 1 }}>
                  {form.image.name}
                </Typography>
                <Typography variant="caption" color="#065f46">
                  Click to change
                </Typography>
              </Box>
            ) : (
              <Box>
                <UploadFile sx={{ fontSize: 48, color: '#94a3b8', mb: 2 }} />
                <Typography color="#64748b" fontWeight="medium" sx={{ mb: 1 }}>
                  Drop your image here or click to browse
                </Typography>
                <Typography variant="caption" color="#94a3b8">
                  Max 5MB • JPG, PNG, WebP
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Grid>

      {/* Right: Live Preview */}
      <Grid item xs={12} lg={5}>
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 5,
            p: 4,
            boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
            height: '100%',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom color="#1e293b">
            Live Preview
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            {imagePreview && (
              <Box sx={{ mb: 3, textAlign: 'center' }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: '100%',
                    maxHeight: 220,
                    objectFit: 'cover',
                    borderRadius: 16,
                    boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
                  }}
                />
              </Box>
            )}

            <Typography variant="h4" fontWeight="bold" gutterBottom color="#1e293b" sx={{ mb: 1 }}>
              {form.title || 'Your Blog Title Will Appear Here'}
            </Typography>

            <Typography variant="subtitle2" color="#64748b" gutterBottom sx={{ mb: 2 }}>
              By <strong>{form.author || 'Author Name'}</strong> • {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </Typography>

            {(form.categories || []).length > 0 && (
              <Box sx={{ mb: 3 }}>
                {form.categories.map((cat) => (
                  <Chip
                    key={cat}
                    label={cat}
                    size="small"
                    sx={{
                      mr: 1,
                      mb: 1,
                      bgcolor: '#e0e7ff',
                      color: '#4f46e5',
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Box>
            )}

            {/* <Typography
              variant="body1"
              color="#475569"
              sx={{
                lineHeight: 1.8,
                fontSize: '1rem',
              }}
            >
              {editor?.getText().slice(0, 300) || 'Start writing your blog content to see it appear here in real-time. The rich text editor supports formatting, lists, and more.'}
              {editor?.getText().length > 300 && '...'}
            </Typography> */}
            <Typography
  variant="body1"
  color="#475569"
  sx={{
    lineHeight: 1.8,
    fontSize: '1rem',
  }}
>
  {editor?.getText().slice(0, 300) || 'Start writing your blog content to see it appear here in real-time. The rich text editor supports formatting, lists, and more.'}
  {editor?.getText()?.length > 300 && '...'}
</Typography>

          </Box>
        </Box>
      </Grid>
    </Grid>
  </DialogContent>

  {/* Actions */}
  <DialogActions
    sx={{
      p: 5,
      bgcolor: '#f8fafc',
      justifyContent: 'space-between',
      borderTop: '1px solid #e2e8f0',
      gap: 3,
    }}
  >
    <Button
      onClick={closeModal}
      variant="outlined"
      size="large"
      sx={{
        px: 5,
        py: 1.5,
        borderRadius: 4,
        fontWeight: 600,
        textTransform: 'none',
        borderColor: '#cbd5e1',
        color: '#64748b',
        '&:hover': {
          borderColor: '#94a3b8',
          bgcolor: '#f1f5f9',
        },
      }}
    >
      Cancel
    </Button>

    <Button
      onClick={handleSubmit}
      variant="contained"
      size="large"
      disabled={loading || !form.title || !form.author || !editor?.getHTML() || (!editingBlog && !form.image)}
      startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <PublishIcon />}
      sx={{
        px: 7,
        py: 1.8,
        fontWeight: 700,
        textTransform: 'none',
        fontSize: '1.05rem',
        borderRadius: 4,
        bgcolor: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        boxShadow: '0 10px 25px rgba(79, 70, 229, 0.3)',
        '&:hover': {
          bgcolor: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
          transform: 'translateY(-3px)',
          boxShadow: '0 15px 30px rgba(79, 70, 229, 0.4)',
        },
        '&:disabled': {
          bgcolor: '#cbd5e1',
          color: '#94a3b8',
        },
        transition: 'all 0.3s ease',
      }}
    >
      {loading ? 'Publishing...' : editingBlog ? 'Update Post' : 'Publish Blog'}
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

// Debounce
function debounce(func, wait) {
  let timeout;
  return (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(value), wait);
  };
}

export default ManageBlogs;