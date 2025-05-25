const express = require('express');
const router = express.Router();
const { forgotPassword, getInfoUser, updateInfoUser } = require('../controllers/userController');
const { authenticateJwt } = require('../middlewares/authMiddleware');

router.get('/profile', authenticateJwt, getInfoUser);
router.post('/forgot-password', forgotPassword);
router.put('/update-info', authenticateJwt, updateInfoUser);



module.exports = router;
