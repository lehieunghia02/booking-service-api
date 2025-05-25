const Booking = require('../models/Booking');
const { Business } = require('./businessService');
const categoryService = require('./categoryService');

const createBooking = async (bookingData) => {
  try {
    //Login create booking present 
    const booking = await new Booking(bookingData).save();


    //Tăng booking count cho business 
    await Business.findByIdAndUpdate(bookingData.business, {
      $inc: { booking_count: 1 }
    });

    //Tăng booking count cho category 
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

