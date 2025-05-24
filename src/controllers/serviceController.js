const Service = require('../models/Service'); 
const serviceService = require('../services/serviceService');

const createService = async(req, res) => {
  try {
    const {name, category, duration, image, price, description} = req.body;
    const service = await Service.create({name, category, duration, image, price, description});
    res.status(201).json({
      status: '201',
      message: 'Create service successfully',
      result: service
    })
  } catch (error) {
    return res.status(500).json({
      status: '500',
      message: error.message || 'Create service failed'
    })
  }
}