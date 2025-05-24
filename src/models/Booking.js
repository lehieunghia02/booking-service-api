const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  }, 
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Service is required'] 
  },
  business : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',  
    required: [true, 'Business is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required ']
  }, 
  start_time: {
    type: String,
    require: [true, 'Start time is required']
  },
  end_time: {
    type: String,
  },
  status: {
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'],
    default: 'pending'
  },
  notes: {
    type: String
  }, 
  payment_status: {
    type: String, 
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  }, 
  payment_method: {
    type: String, 
    enum: ['cash', 'card', 'transfer'],
    default: 'cash'
  }, 
  total_price: {
    type: Number,
    required: [true, 'Total price is required']
  },
  payment_details: {
    type: Object
  }
},
{
  timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
