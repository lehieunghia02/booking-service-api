const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  is_popular: {
    type: Boolean,
    default: false
  },
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  display_order: {
    type: Number,
    default: 0
  },
  is_active: {
    type: Boolean,
    default: true
  }, 
  is_deleted: {
    type: Boolean,
    default: false
  },
 }, { timestamps: true });

// Tạo index
categorySchema.index({ name: 'text' });
categorySchema.index({ is_popular: 1 });
categorySchema.index({ display_order: 1 });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;