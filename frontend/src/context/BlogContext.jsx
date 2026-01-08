// src/context/BlogContext.jsx
import React, { createContext, useState, useCallback } from 'react';
import { getBlogs, getAllBlogsAdmin } from '../api/apiRoutes';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = useCallback(async (isAdmin = false) => {
    setLoading(true);
    try {
      const res = isAdmin ? await getAllBlogsAdmin() : await getBlogs();
      const blogList = res.data.blogs || [];
      setBlogs(Array.isArray(blogList) ? blogList : []);
    } catch (err) {
      console.error('Fetch error:', err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <BlogContext.Provider value={{ blogs, loading, fetchBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};