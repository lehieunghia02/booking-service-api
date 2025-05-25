const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  },
  services: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Service',
    required: true,
  },
  images: {
    type: String,
    required: false,
  },
  rating_summary: {
    average_rating: {
      type: Number,
      default: 0
    },
    total_ratings: {
      type: Number,
      default: 0
    },
    rating_distribution: {
      1: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      5: { type: Number, default: 0 }
    },
    review_count: {
      type: Number,
      default: 0 
    }
  },
  search_count: {
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
  }
}, {
  timestamps: true
})

const Business = mongoose.model('business', businessSchema);

module.exports = Business;
