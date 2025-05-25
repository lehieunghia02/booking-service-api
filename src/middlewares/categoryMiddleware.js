const Category = require('../models/Category');

const trackCategoryView = async (req, res, next) => {
  console.log('trackCategoryView');
    try {
    const categoryId = req.params.id;
    await Category.findByIdAndUpdate(
      categoryId,
      { $inc: { view_count: 1 } }
    );
    next();
  } catch (error) {
    next(error);
  } 
}

module.exports = {
  trackCategoryView
}
  