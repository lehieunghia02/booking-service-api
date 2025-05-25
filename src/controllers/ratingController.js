const ratingService = require('../services/ratingService');

exports.createRating = async (req, res) => {
  try 
  {
    // Lấy thông tin từ request
    const { business, service, stars, comment, images } = req.body;
    
    //Tạo rating data từ request 
    const ratingData = {
      user: req.user._id,
      business,
      service,
      stars,
      comment,
      images
    };
 // Gọi service để tạo rating
    const rating = await ratingService.createRating(ratingData);
 res.status(201).json({
      success: true,
      data: rating
    });

  }catch(error)
  {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
exports.updateRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { stars, comment, images } = req.body;

    const updatedRating = await ratingService.updateRating(id, {
      stars, comment, images
    }, req.user._id);

    res.status(200).json({
      success: true,
      data: updatedRating
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.deleteRating = async (req, res) => {
  try {
    const { id } = req.params;
    await ratingService.deleteRating(id, req.user._id);

    res.status(200).json({
      success: true,
      message: 'Rating deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.getBusinessRatings = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { page, limit, sort } = req.query;

    const result = await ratingService.getBusinessRatings(businessId, {
      page, limit, sort
    });

    res.status(200).json({
      success: true,
      data: result.ratings,
      pagination: result.pagination
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};