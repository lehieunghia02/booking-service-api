const businessService = require('../services/businessService');
const businessController = require('../services/businessService');


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
