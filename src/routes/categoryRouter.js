const express = require('express');
const router = express.Router();
const {getAllCategories, getCategoriesPopular} = require('../controllers/categoryController');

router.get('/', getAllCategories);
router.get('/popular', getCategoriesPopular);

module.exports = router;
