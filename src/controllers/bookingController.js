const bookingService = require('../services/bookingService');

const createBooking = async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    if(!booking){
      return res.status(400).json({
        status: '400',
        message: 'Booking not created'
      })
    }
    res.status(201).json({
      status: '200',
      message: 'Booking created successfully',
      data: booking
    })
  } catch (error) {
    res.status(500).json({
      status: '500',
      message: error.message
    })
  }
}

module.exports = {
  createBooking
}
