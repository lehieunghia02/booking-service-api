const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');


// Unified search route
router.get('/', searchController.unifiedSearch);

module.exports = router;