const mongoose = require('mongoose');
const Rating = require('./rating');
const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  // location: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Location',
  //   //required: true,
  // },
  location: {
    type: String,
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
 
  categories: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Category',
    required: false,
  },
  address: {
    type: String,
    required: true,
    default: ""
  },
  // business_hours: {
  //   monday: { open: String, close: String },
  //   tuesday: { open: String, close: String },
  //   wednesday: { open: String, close: String },
  //   thursday: { open: String, close: String },
  //   friday: { open: String, close: String },
  //   saturday: { open: String, close: String },
  //   sunday: { open: String, close: String }
  // },
  
  // rating_summary: {
  //   average_rating: {
  //     type: Number,
  //     default: 0,
  //     min: 0,
  //     max: 5
  //   },
  //   total_ratings: {
  //     type: Number,
  //     default: 0
  //   },
  //   review_count: {
  //     type: Number,
  //     default: 0 
  //   }
  // },
  
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
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
});

businessSchema.index({ name: 'text', description: 'text' });
businessSchema.index({ categories: 1 });
businessSchema.index({ is_active: 1, is_deleted: 1 });
businessSchema.index({ booking_count: -1 });
businessSchema.index({ view_count: -1 });
businessSchema.index({ search_count: -1 });
businessSchema.index({ 'rating_summary.average_rating': -1 });

const Business = mongoose.model('business', businessSchema);

module.exports = Business;
