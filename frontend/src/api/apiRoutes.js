// frontend/src/api/apiRoutes.js
import api from './axiosConfig'; // your configured Axios instance

// ===== User APIs =====
// export const register = (data) => api.post('/users/register', data);
// export const login = (data) => api.post('/users/login', data);
// export const getProfile = () => api.get('/users/profile');

// ===== Admin Login =====
export const adminLogin = (data) => api.post('/admin/login', data);

// ===== Enquiry APIs =====
export const createEnquiry = (data) => api.post(`/enquiries`, data);
export const getEnquiries = () => api.get('/enquiries');
export const deleteEnquiry = (id) => api.delete(`/enquiries/${id}`);

// ===== Blog APIs =====
export const getBlogs = () => api.get('/blogs'); // public blogs
export const getAllBlogsAdmin = () => api.get('/admin/blogs'); // admin-only

// [NEW] Add this function to get one blog
export const getBlogById = (id) => api.get(`/blogs/${id}`);

export const createBlog = (data) => api.post('/admin/blogs', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

export const updateBlog = (id, data) => api.put(`/admin/blogs/${id}`, data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

export const archiveBlog = (id) => api.put(`/admin/blogs/${id}/archive`);
export const deleteBlog = (id) => api.delete(`/admin/blogs/${id}`);

// ===== Stats APIs =====
export const getBlogStats = () => api.get('/admin/blog-stats');
export const getEnquiryStats = () => api.get('/admin/enquiry-stats');