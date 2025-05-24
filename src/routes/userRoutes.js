const express = require('express');
const router = express.Router();
const { forgotPassword, getInfoUser } = require('../controllers/userController');
const { authenticateJwt } = require('../middlewares/authMiddleware');

router.get('/profile', authenticateJwt, getInfoUser);
router.post('/forgot-password', forgotPassword);

module.exports = router;
