const mongoose = require('mongoose');

const individualSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  avatar: {
    type: String, 
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
  },
  
  ratings:[
  {
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required']
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must be at most 5']
    },
   
    comment: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now
    } 
  },
  ],
  categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Categories are required']
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'business',
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  is_active: {
    type: Boolean,
    default: true
  }, 
  avg_rating: {
    type: Number, 
    default: 0
  },
  total_rating: {
    type: Number,
    default: 0
  }
}, {timestamps: true});

const Individual = mongoose.model('Individual', individualSchema);
individualSchema.index({ name: 'text', description: 'text', email: 'text' });
individualSchema.index({ avg_rating: -1, total_rating: -1 });
individualSchema.index({ is_active: 1 });


module.exports = Individual;
    


