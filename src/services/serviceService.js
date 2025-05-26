const Service = require('../models/Service');

exports.getServicePopular2 = async() => {
  try {
    const services = await Service.find({isActive: true}).sort({viewCount: -1}).limit(10);
    return services;
  } catch (error) {
    throw new Error('Failed to get service popular');
  }
}

