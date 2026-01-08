const Blog = require('../models/blogModel');

const getBlogs = async (req, res) => {
  const blogs = await Blog.find({ archived: false });
  res.json(blogs);
};

const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog && !blog.archived) {
    res.json(blog);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
};

const createBlog = async (req, res) => {
  const { title, content, image, author } = req.body;
  const blog = new Blog({ title, content, image, author });
  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
};

const updateBlog = async (req, res) => {
  const { title, content, image, author } = req.body;
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.image = image || blog.image;
    blog.author = author || blog.author;
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
};

const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    await blog.remove();
    res.json({ message: 'Blog removed' });
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
};

const archiveBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    blog.archived = true;
    await blog.save();
    res.json({ message: 'Blog archived' });
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
};

const getAllBlogsAdmin = async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
};

module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog, archiveBlog, getAllBlogsAdmin };