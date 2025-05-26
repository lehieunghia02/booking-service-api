const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');


router.get('/popular-salons', businessController.getPopularSalonsByRatingCount);
router.get('/:id', businessController.getSalonDetails);
router.post('/', businessController.createBusiness);


module.exports = router;
