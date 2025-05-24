const categoryService = require('../services/categoryService');

const getAllCategories = async(req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const categories = await categoryService.getAllCategories(skip, limit);
    const totalPages = Math.ceil(categories.length / limit);
    
    if(!categories){
      return res.status(404).json({
        status: '404',
        message: 'No categories found'
      })
    }

    res.status(200).json({
      status: '200',
      message: 'Categories fetched successfully',
      data: categories,
      totalPages: totalPages,
      currentPage: page
    })
  } catch (error) {
    res.status(500).json({status: 'error', message: error.message});
  }
}
const getCategoriesPopular = async(req, res) => {
  try{
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10;
  
     const skip = (page - 1) * limit;
     const categories = await categoryService.getCategoriesPopular(skip, limit);
     const totalItems = categories.length;
     const totalPages = Math.ceil(totalItems / limit);

     if(!categories){
      return res.status(404).json({
        status: '404',
        message: 'No categories found'
      })
     }
     res.status(200).json({
      status: '200',
      message: 'Categories fetched successfully',
      data: categories,
      pagination:{
        totalPages: totalPages,
        currentPage: page, 
        totalItems: totalItems, 
        limit: limit,
        skip: skip
      }
     }) 
  } catch (error) {
    res.status(500).json({status: 'error', message: error.message});
  }
}
module.exports ={
  getAllCategories,
  getCategoriesPopular
}



