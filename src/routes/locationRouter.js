const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');
const locationMiddleware = require('../middlewares/locationMiddleware');
const { authenticateJwt } = require('../middlewares/authMiddleware');

// Áp dụng middleware location cho tất cả routes
router.use(locationMiddleware.processLocation);

// API lấy thông tin vị trí hiện tại
router.get('/current', locationController.getLocation);

// API cập nhật vị trí (chỉ cho người dùng đã đăng nhập)
router.put('/update', authenticateJwt, locationController.updateUserLocation);

// API lấy danh sách các thành phố phổ biến
router.get('/popular-cities', locationController.getPopularCities);

module.exports = router;
