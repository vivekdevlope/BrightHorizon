// backend/models/blogModel.js
const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: 'General' },
featured: { type: Boolean, default: false },
  imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);