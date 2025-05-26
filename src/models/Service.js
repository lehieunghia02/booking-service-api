const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name service is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description service is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price service is required'],
    min: [0, 'Price service cannot be negative']
  },
  duration: {
    type: Number,
    required: [true, 'Time service is required'],
    min: [1, 'Time service must be at least 1 minute']
  },
  image: {
    type: String,
  },
  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

serviceSchema.index({ name: 'text', description: 'text' });
serviceSchema.index({ price: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ isActive: 1 });
const ServiceModel = mongoose.model('service', serviceSchema);

module.exports = ServiceModel;
