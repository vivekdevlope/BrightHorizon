// backend/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const Admin = require("../models/adminModel");
const Blog = require("../models/blogModel");
const Enquiry = require("../models/enquiryModel");
const { protect, admin } = require("../middleware/authMiddleware");

// =======================
// Multer setup for blog images
// =======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// =======================
// ADMIN REGISTER (hidden, use only in Postman)
// =======================
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Admin created", admin });
  } catch (err) {
    res.status(500).json({ message: "Server error while creating admin" });
  }
});

// =======================
// ADMIN LOGIN
// =======================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  try {
    const adminUser = await Admin.findOne({ email });
    if (!adminUser) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: adminUser._id, role: "admin", email: adminUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, role: "admin", email: adminUser.email });
  } catch (err) {
    res.status(500).json({ message: "Server error while logging in" });
  }
});

// =======================
// BLOG STATS
// =======================
router.get("/blog-stats", protect, admin, async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    res.json({ totalBlogs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =======================
// ENQUIRY STATS
// =======================
router.get("/enquiry-stats", protect, admin, async (req, res) => {
  try {
    const totalEnquiries = await Enquiry.countDocuments();
    res.json({ totalEnquiries });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =======================
// BLOG CRUD (Admin)
// =======================

// GET all blogs (admin)
router.get("/blogs", protect, admin, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ blogs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE blog
router.post("/blogs", protect, admin, upload.single("image"), async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const blog = await Blog.create({ title, author, description, imageUrl });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE blog
router.put("/blogs/:id", protect, admin, upload.single("image"), async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const updateData = { title, author, description };
    if (req.file) updateData.imageUrl = `/uploads/${req.file.filename}`;

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE blog
router.delete("/blogs/:id", protect, admin, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ARCHIVE blog
router.put("/blogs/:id/archive", protect, admin, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, { archived: true }, { new: true });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
