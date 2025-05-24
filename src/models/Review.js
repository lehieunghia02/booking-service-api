const mongoose = require('mongoose');
/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - user
 *         - business
 *         - rating
 */
const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'], 
    min: 1, 
    max: 5
  }, 
   service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
    booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'], 
    min: 1, 
    max: 5
  }, 
  comment: {
    type: String
  },
  images: [{
    type: String
  }],
},
{
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
