const mongoose = require('mongoose');
const { ref } = require('process');
const BlogSchema = new mongoose.Schema({
  title: String,
  author: String,
  image: {String,ref},
  isPublished: Boolean,
  content: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = BlogSchema;
