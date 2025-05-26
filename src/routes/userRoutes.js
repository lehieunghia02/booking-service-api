const express = require('express');
const router = express.Router();
const { forgotPassword, getInfoUser, updateInfoUser } = require('../controllers/userController');
const { authenticateJwt } = require('../middlewares/authMiddleware');
const { addFavoriteBusiness, removeFavoriteBusiness } = require('../services/userService');

router.get('/profile', authenticateJwt, getInfoUser);
router.post('/forgot-password', forgotPassword);
router.put('/update-info', authenticateJwt, updateInfoUser);
router.post('/add-favorite-business', authenticateJwt, addFavoriteBusiness);
router.delete('/remove-favorite-business', authenticateJwt, removeFavoriteBusiness);



module.exports = router;
