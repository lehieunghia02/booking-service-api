const express = require('express');
const router = express.Router();
const popularServiceController = require('../controllers/popularServiceController');

// Get popular services by location
router.get('/', popularServiceController.getPopularServicesByLocation);

module.exports = router;