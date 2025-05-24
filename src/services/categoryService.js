const Category = require('../models/Category');


class CategoryService {
  constructor() {
    this.Category = Category;
  }
  async getAllCategories(skip, limit) {
    try {
      const categories = await Category.find().skip(skip).limit(limit).sort({ display_order: 1 });
      return categories;
    } catch (error) {
      throw new Error('Failed to fetch categories');
    }
  }
  async getAllCategoriesPopulars() {
    try {
      const categories = await Category.find({ is_popular: true }).sort({ display_order: 1 });
      return categories;
    } catch (error) {
      throw new Error('Failed to fetch popular categories');
    }
  }
  async getCategoriesPopular(skip, limit){
    try {
      const categories = await Category.find(
        {is_popular: true, 
        is_active: true, 
        is_deleted: false}).skip(skip).limit(limit).sort({display_order: 1});
      return categories;
    } catch (error) {
      throw new Error('Failed to fetch popular categories');
    }
  }
}
module.exports = new CategoryService();
