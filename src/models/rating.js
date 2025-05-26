const mongoose = require('mongoose');


const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'User is required']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'], 
    min: 1, 
    max: 5
  }, 
   service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'service'
  },
    booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'booking'
  },
  stars: {
    type: Number,
    required: [true, 'Stars is required'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true,
  },
  is_verified: {
    type: Boolean, 
    default: false
  }, 
  is_deleted: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true
});

// Index để tìm kiếm nhanh và ngăn người dùng đánh giá một salon nhiều lần
ratingSchema.index({user: 1, business: 1, is_deleted: 1});

ratingSchema.index({business:1, is_deleted:1});

module.exports = mongoose.model('rating', ratingSchema);
