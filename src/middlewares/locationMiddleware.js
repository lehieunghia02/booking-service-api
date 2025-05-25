const { getLocationFromIP, updateUserAccessLocation } = require('../services/locationService');
const requestIp = require('request-ip');
const User = require('../models/user');

/**
 * Middleware xử lý thông tin vị trí
 * - Lấy IP của người dùng
 * - Lấy thông tin địa lý từ IP hoặc từ profile user
 * - Lưu thông tin vào req để sử dụng trong các route
 */
exports.processLocation = async (req, res, next) => {
  try {
    // Lấy IP của client
    const clientIp = requestIp.getClientIp(req); 
    req.clientIp = clientIp;

    // Nếu đã đăng nhập và có thông tin location
    if (req.user && req.user.location && req.user.location.city) {
      req.userLocation = req.user.location;
      
      // Ghi lại thông tin truy cập từ IP này nếu khác với lần cuối
      const ipLocation = await getLocationFromIP(clientIp);
      if (ipLocation && ipLocation.city && req.user.accessLocations) {
        // Kiểm tra xem có cần cập nhật không
        const lastAccess = req.user.accessLocations && req.user.accessLocations.length > 0 
          ? req.user.accessLocations[req.user.accessLocations.length - 1] 
          : null;
          
        if (!lastAccess || lastAccess.ipAddress !== clientIp) {
          await updateUserAccessLocation(req.user._id, ipLocation, User);
        }
      }
    } else {
      // Chưa đăng nhập hoặc không có location, lấy từ IP
      const ipLocation = await getLocationFromIP(clientIp);
      if (ipLocation) {
        req.userLocation = ipLocation;
        
        // Nếu đã đăng nhập nhưng chưa có location, cập nhật
        if (req.user) {
          await updateUserAccessLocation(req.user._id, ipLocation, User);
        }
      }
    }
    
    next();
  } catch (error) {
    console.error('Error in location middleware:', error);
    next(); // Tiếp tục request kể cả khi có lỗi
  }
};
