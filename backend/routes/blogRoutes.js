// backend/routes/blogRoutes.js
const express = require("express");
const router = express.Router();
const Blog = require("../models/blogModel");

// ✅ PUBLIC: Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ blogs }); // returns { blogs: [...] }
  } catch (err) {
    console.error("Get blogs error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ PUBLIC: Get a single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog); // directly send the single blog object
  } catch (err) {
    console.error("Get single blog error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
