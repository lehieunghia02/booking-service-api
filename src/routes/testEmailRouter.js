const express = require('express');
const router = express.Router();
const { testEmail } = require('../controllers/testEmailController');

router.get('/', testEmail);

module.exports = router;
