const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const { processLocation } = require('../middlewares/locationMiddleware');


router.get('/popular-salons', processLocation, businessController.getPopularSalons);
router.get('/:id', businessController.getSalonDetails);

module.exports = router;
