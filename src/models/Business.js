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
}, {
  timestamps: true
})

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;  
  