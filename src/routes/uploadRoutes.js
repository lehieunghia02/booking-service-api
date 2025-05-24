const express = require('express');
const router = express.Router();
const { uploadSingle, uploadMultiple } = require('../middlewares/uploadMiddleware');
const uploadController = require('../controllers/uploadController');

// Các route công khai - không yêu cầu xác thực
router.post('/public/image', uploadSingle, uploadController.uploadImage);
router.post('/public/images', uploadMultiple, uploadController.uploadMultipleImages);

// Các route yêu cầu xác thực
// router.use(protect);
router.post('/image', uploadSingle, uploadController.uploadImage);
router.post('/images', uploadMultiple, uploadController.uploadMultipleImages);
router.delete('/image/:fileName', uploadController.deleteImage);

module.exports = router;