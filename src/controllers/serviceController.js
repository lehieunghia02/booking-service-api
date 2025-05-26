  const Service = require('../models/Service'); 
  const {getServicePopular2} = require('../services/serviceService');
exports.createService = async(req, res) => {
  try {
    const {name, category, duration, image, price, description} = req.body;
    const service = await Service.create({name, category, duration, image, price, description});
    res.status(201).json({  
      status: '201',
      message: 'Create service successfully',
      result: service
    })
  } catch (error) {
    res.status(500).json({
      status: '500',  
      message: error.message || 'Create service failed'
    })
  }
}
exports.getServicePopular = async(req, res) => {
  try {
    const services = await Service.find({isActive: true}).sort({viewCount: -1}).limit(10);
    res.status(200).json({  
      status: '200',
      message: 'Get service popular successfully',
      result: services
    })
  }catch(error){
    res.status(500).json({
      status: '500',
      message: error.message || 'Get service popular failed'
    })
  }
}



