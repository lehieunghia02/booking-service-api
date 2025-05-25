const express = require('express');
const router = express.Router();
const {getAllCategories, getCategoriesPopular, getCategoryById} = require('../controllers/categoryController');
const { trackCategoryView } = require('../middlewares/categoryMiddleware');

router.get('/', getAllCategories);
router.get('/popular', getCategoriesPopular);
router.get('/:id', trackCategoryView, getCategoryById);

module.exports = router;
