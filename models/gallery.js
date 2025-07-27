const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = GallerySchema;
