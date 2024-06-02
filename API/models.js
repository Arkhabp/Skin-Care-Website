const mongoose = require('mongoose');

// Skincare Category Schema
const skincareCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// Skincare Category Model
const SkincareCategory = mongoose.model('SkincareCategory', skincareCategorySchema);

module.exports = SkincareCategory;