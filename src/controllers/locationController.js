const locationService = require('../services/locationService');
const User = require('../models/user');

/**
 * Lấy thông tin vị trí từ IP
 */
exports.getLocation = async (req, res) => {
  try {
    // Lấy thông tin vị trí từ middleware hoặc từ IP
    const location = req.userLocation || await locationService.getLocationFromIP(req.clientIp);
    console.log('Location:', location);
    res.status(200).json({
      success: true,
      data: location,
      isAuthenticated: !!req.user
    });
  } catch (error) {
    console.error('Error getting location:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting location',
      error: error.message
    });
  }
};

/**
 * Cập nhật vị trí cho user đã đăng nhập
 */
exports.updateUserLocation = async (req, res) => {
  try {
    // Kiểm tra xem user đã đăng nhập chưa
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: You must be logged in to update location'
      });
    }
    
    const { city, country, address, zipCode, coordinates } = req.body;
    
    if (!city || !country) {
      return res.status(400).json({
        success: false,
        message: 'City and country are required'
      });
    }
    
    // Cập nhật location cho user
    await User.findByIdAndUpdate(req.user._id, {
      location: {
        city,
        country,
        address: address || '',
        zipCode: zipCode || '',
        coordinates: coordinates || {
          latitude: null,
          longitude: null
        }
      }
    });
    
    return res.status(200).json({
      success: true,
      message: 'Location updated successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating location',
      error: error.message
    });
  }
};

/**
 * Lấy danh sách các thành phố phổ biến
 */
exports.getPopularCities = async (req, res) => {
  try {
    const popularCities = locationService.getPopularCities();
    
    return res.status(200).json({
      success: true,
      data: popularCities
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error getting popular cities',
      error: error.message
    });
  }
};