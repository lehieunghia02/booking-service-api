const geoip = require('geoip-lite');

/**
 * Lấy thông tin địa lý từ địa chỉ IP
 * @param {string} ipAddress - Địa chỉ IP của người dùng
 * @returns {Object|null} - Thông tin địa lý hoặc null nếu không tìm thấy
 */
exports.getLocationFromIP = (ipAddress) => {
  try {
    // Loại bỏ IPv6 prefix nếu có

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Thay thế IP localhost với IP thật cho mục đích testing
    const lookupIp = ip === '127.0.0.1' || ip === '::1' ? '8.8.8.8' : ip;
    
    // Lookup thông tin địa lý
    const geo = geoip.lookup(lookupIp);
    
    if (geo) {
      return {
        city: geo.city || 'Unknown',
        country: geo.country || 'Unknown',
        coordinates: {
          latitude: geo.ll ? geo.ll[0] : null,
          longitude: geo.ll ? geo.ll[1] : null
        },
        region: geo.region || '',
        timezone: geo.timezone || '',
        ipAddress: ip
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting location from IP:', error);
    return null;
  }
};

/**
 * Cập nhật vị trí truy cập cho user
 * @param {string} userId - ID của user
 * @param {Object} locationData - Dữ liệu vị trí
 * @returns {Promise<boolean>} - Kết quả cập nhật
 */
exports.updateUserAccessLocation = async (userId, locationData, User) => {
  try {
    await User.findByIdAndUpdate(userId, {
      $push: { 
        accessLocations: {
          city: locationData.city,
          country: locationData.country,
          coordinates: locationData.coordinates,
          ipAddress: locationData.ipAddress,
          timestamp: new Date()
        }
      }
    });
    return true;
  } catch (error) {
    console.error('Error updating user access location:', error);
    return false;
  }
};

/**
 * Lấy danh sách các thành phố phổ biến
 * @returns {Array} - Danh sách các thành phố phổ biến
 */
exports.getPopularCities = () => {
  return [
    { name: 'Hà Nội', country: 'Vietnam' },
    { name: 'Hồ Chí Minh', country: 'Vietnam' },
    { name: 'Đà Nẵng', country: 'Vietnam' },
    { name: 'Hải Phòng', country: 'Vietnam' },
    { name: 'Nha Trang', country: 'Vietnam' }
  ];
};