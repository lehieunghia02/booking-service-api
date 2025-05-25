const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const { authenticateJwt } = require('../middlewares/authMiddleware');

//Private route 
router.post('/', authenticateJwt, ratingController.createRating);
router.put('/:id', authenticateJwt, ratingController.updateRating); 
router.delete('/:id', authenticateJwt, ratingController.deleteRating); 

//Public route 
router.get('/business/:businessId', ratingController.getBusinessRatings); 

module.exports = router;
