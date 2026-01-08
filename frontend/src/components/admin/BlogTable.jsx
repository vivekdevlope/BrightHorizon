// src/components/admin/BlogTable.jsx
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Tooltip,
  Avatar,
  Dialog,
  DialogContent,
  Typography,
  Chip,
  TextField,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
  Unarchive as UnarchiveIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  ZoomIn as ZoomInIcon,
} from '@mui/icons-material';
import { updateBlog, deleteBlog, archiveBlog } from '../../api/apiRoutes';
import toast from 'react-hot-toast';

const BACKEND_URL = 'http://localhost:5000';

const BlogTable = ({ blogs, onEdit, onDelete, onArchive, onRefresh }) => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [imagePreview, setImagePreview] = useState(null); // For full-size popup

  const handleEdit = (blog) => {
    setEditId(blog._id);
    setEditData({ title: blog.title, author: blog.author });
  };

  const handleUpdate = async () => {
    try {
      await updateBlog(editId, editData);
      toast.success('Updated!');
      setEditId(null);
      onRefresh();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const handleArchiveToggle = async (id, currentStatus) => {
    const action = currentStatus ? 'unarchive' : 'archive';
    const confirmMsg = currentStatus
      ? 'Unarchive this blog? It will appear publicly again.'
      : 'Archive this blog? It will be hidden from the frontend.';

    if (!window.confirm(confirmMsg)) return;

    try {
      await archiveBlog(id);
      toast.success(`Blog ${action}d!`);

      // Optimistic update
      onArchive(id);
    } catch (err) {
      toast.error(`Failed to ${action} blog`);
    }
  };

  return (
    <>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell><strong>Image</strong></TableCell>
            <TableCell><strong>Title</strong></TableCell>
            <TableCell><strong>Author</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell align="center"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map((blog) => {
            const isArchived = blog.isArchived || blog.archived;

            return (
              <TableRow
                key={blog._id}
                hover={!isArchived}
                sx={{
                  opacity: isArchived ? 0.5 : 1,
                  backgroundColor: isArchived ? '#fafafa' : 'inherit',
                  textDecoration: isArchived ? 'line-through' : 'none',
                  '&:hover': { backgroundColor: isArchived ? '#f5f5f5' : 'action.hover' },
                }}
              >
                {/* Image with Click to Zoom */}
                <TableCell>
                  {blog.imageUrl ? (
                    <Box
                      sx={{ position: 'relative', cursor: 'pointer' }}
                      onClick={() => setImagePreview(`${BACKEND_URL}${blog.imageUrl}`)}
                    >
                      <Avatar
                        variant="rounded"
                        src={`${BACKEND_URL}${blog.imageUrl}`}
                        alt={blog.title}
                        sx={{ width: 60, height: 60, borderRadius: 2 }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          bgcolor: 'rgba(0,0,0,0.3)',
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.2s',
                          '&:hover': { opacity: 1 },
                        }}
                      >
                        <ZoomInIcon sx={{ color: 'white', fontSize: 28 }} />
                      </Box>
                    </Box>
                  ) : (
                    <Avatar variant="rounded" sx={{ width: 60, height: 60, bgcolor: 'grey.300' }}>
                      No Img
                    </Avatar>
                  )}
                </TableCell>

                {/* Title */}
                <TableCell>
                  {editId === blog._id ? (
                    <TextField
                      size="small"
                      value={editData.title || ''}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      sx={{ width: 200 }}
                    />
                  ) : (
                    <Typography variant="body2" fontWeight="medium" noWrap sx={{ maxWidth: 220 }}>
                      {blog.title}
                    </Typography>
                  )}
                </TableCell>

                {/* Author */}
                <TableCell>
                  {editId === blog._id ? (
                    <TextField
                      size="small"
                      value={editData.author || ''}
                      onChange={(e) => setEditData({ ...editData, author: e.target.value })}
                      sx={{ width: 120 }}
                    />
                  ) : (
                    <Typography variant="body2">{blog.author}</Typography>
                  )}
                </TableCell>

                {/* Description */}
                <TableCell>
                  <Tooltip title={blog.description || ''}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        maxWidth: 280,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      dangerouslySetInnerHTML={{ __html: blog.description?.slice(0, 100) || '—' }}
                    >
                    </Typography>
                  </Tooltip>
                </TableCell>

                {/* Date */}
                <TableCell>
                  <Typography variant="body2">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Typography>
                </TableCell>

                {/* Actions */}
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center', flexWrap: 'nowrap' }}>
                    {editId === blog._id ? (
                      <>
                        <IconButton size="small" color="primary" onClick={handleUpdate}>
                          <SaveIcon />
                        </IconButton>
                        <IconButton size="small" onClick={() => setEditId(null)}>
                          <CancelIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => onEdit(blog)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => onDelete(blog._id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
{/* 
                        <Tooltip title={isArchived ? 'Unarchive' : 'Archive'}>
                          <IconButton
                            size="small"
                            color={isArchived ? 'success' : 'warning'}
                            onClick={() => handleArchiveToggle(blog._id, isArchived)}
                          >
                            {isArchived ? <UnarchiveIcon fontSize="small" /> : <ArchiveIcon fontSize="small" />}
                          </IconButton>
                        </Tooltip> */}

                        {isArchived && (
                          <Chip
                            label="ARCHIVED"
                            size="small"
                            color="default"
                            sx={{ ml: 0.5, fontSize: '0.65rem' }}
                          />
                        )}
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Full Image Preview Dialog */}
      <Dialog
        open={!!imagePreview}
        onClose={() => setImagePreview(null)}
        maxWidth="md"
        PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden' } }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <img
            src={imagePreview}
            alt="Full size"
            style={{
              width: '100%',
              maxHeight: '90vh',
              objectFit: 'contain',
            }}
          />
          <IconButton
            onClick={() => setImagePreview(null)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <CancelIcon />
          </IconButton>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BlogTable;