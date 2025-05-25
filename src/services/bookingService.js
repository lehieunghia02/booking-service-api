const Booking = require('../models/Booking');
const categoryService = require('./categoryService');

const createBooking = async (bookingData) => {
  try {
    const booking = await Booking.create(bookingData);

    const service = await Service.findById(bookingData.service);
    if(service && service.category){
      await categoryService.incrementBookingCount(service.category);
    }
    return booking; 
  } catch (error) {
    throw new Error('Failed to create booking');
  }
}

module.exports = {
  createBooking
}

