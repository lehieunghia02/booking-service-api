const businessService = require('../services/businessService');

exports.createBusiness = async (req, res) => {
  try {
    const business = await businessService.createBusiness(req.body);
    res.status(201).json({
      success: true,
      data: business
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

exports.getPopularSalonsByRatingCount = async (req, res) => {
  try {
    const { limit } = req.query;
    const popularSalons = await businessService.getPopularSalonsByRatingCount(limit);
    res.status(200).json({
      success: true,
      data: popularSalons
    });
  } catch(error){
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

exports.getPopularSalons = async (req, res) => {
  try 
  {
    const { page, limit, category } = req.query;

    const location = req.userLocation;

    const result = await businessService.getPopularSalons({
      page, limit, category, location
    }); 
    res.status(200).json({
      success: true, 
      data: result.salons, 
      pagination: result.pagination
    });
  } catch (error) {
    res.status(500).json({
      success: false, 
      message: error.message
    });
  }
}

exports.getSalonDetails = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Tăng view_count (không chờ đợi kết quả)
    businessService.trackBusinessView(id).catch(err => 
      console.error('Error tracking business view:', err)
    );
    
    // Lấy thông tin chi tiết salon
    const salon = await businessService.getBusinessById(id);
    
    if (!salon) {
      return res.status(404).json({
        success: false,
        message: 'Salon not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: salon
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
