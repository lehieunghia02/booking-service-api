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
  
  async getCategoriesPopular(skip, limit) {
    try {
      // const categories = await Category.find(
      //   {is_popular: true, 
      //   is_active: true, 
      //   is_deleted: false}).skip(skip).limit(limit).sort({display_order: 1});

      const popularCategories = await Category.aggregate([
        {
          $lookup: {
            from: 'services',
            localField: '_id',
            foreignField: 'category',
            as: 'services'
          }
        },
        {
          $addFields: {
            service_count: {
              $size: '$services'
            },
            avg_rating: { $avg: '$services.rating' },
            popularity_score: {
              $add: [
                { $multiply: ['$booking_count', 0.4] },      // 40% cho booking
                { $multiply: ['$search_count', 0.3] },       // 30% cho tìm kiếm
                { $multiply: ['$view_count', 0.2] },         // 20% cho lượt xem
                { $multiply: [{ $avg: '$services.rating' }, 10 * 0.1] } // 10% cho rating
              ]
            }
          }
        },
        { $sort: { popularity_score: -1 } },
        { $limit: limit },
        { $skip: skip },
        {
          $project: {
            _id: 1,
            name: 1,
            image: 1,
            description: 1,
            popularity_score: 1,
            service_count: 1,
            avg_rating: 1,
            search_count: 1,
            view_count: 1,
            booking_count: 1
          }
        }
      ]);
      return popularCategories;
    } catch (error) {
      throw new Error('Failed to fetch popular categories');
    }
  }
  async getCategoryById(categoryId) {
    try {
      const category = await Category.findById(categoryId);
      return category;
    } catch (error) {
      throw new Error('Failed to fetch category by id');
    }
  }
  async incrementBookingCount(categoryId) {
    try {
      await Category.findByIdAndUpdate(categoryId, { $inc: { booking_count: 1 } });
    } catch (error) {
      throw new Error('Failed to increment booking count');
    }
  }
  async incrementSearchCount(categoryId) {
    try {
      await Category.findByIdAndUpdate(categoryId, { $inc: { search_count: 1 } });
    } catch (error) {
      throw new Error('Failed to increment search count');
    }
  }
  async getCategoriesPopular2(skip, limit) {
  try {
    // Lấy tất cả categories để tính max values cho chuẩn hóa
    const allStats = await Category.aggregate([
      {
        $group: {
          _id: null,
          maxBookingCount: { $max: '$booking_count' },
          maxSearchCount: { $max: '$search_count' },
          maxViewCount: { $max: '$view_count' },
          totalCategories: { $sum: 1 }
        }
      }
    ]);
    
    // Lấy giá trị tối đa hoặc dùng giá trị mặc định nếu không có dữ liệu
    const stats = allStats.length > 0 ? allStats[0] : {
      maxBookingCount: 1,
      maxSearchCount: 1,
      maxViewCount: 1,
      totalCategories: 1
    };
    
    // Chuẩn hóa dựa trên giá trị tối đa để tránh thiên vị
    const popularCategories = await Category.aggregate([
      {
        $lookup: {
          from: 'services',
          localField: '_id',
          foreignField: 'category',
          as: 'services'
        }
      },
      {
        $addFields: {
          service_count: { $size: '$services' },
          avg_rating: { 
            $cond: {
              if: { $gt: [{ $size: '$services' }, 0] },
              then: { $avg: '$services.rating' },
              else: 0
            }
          },
          // Chuẩn hóa các giá trị dựa trên max để có điểm từ 0-1
          normalized_booking: { 
            $cond: {
              if: { $gt: [stats.maxBookingCount, 0] },
              then: { $divide: ['$booking_count', stats.maxBookingCount] },
              else: 0
            }
          },
          normalized_search: { 
            $cond: {
              if: { $gt: [stats.maxSearchCount, 0] },
              then: { $divide: ['$search_count', stats.maxSearchCount] },
              else: 0
            }
          },
          normalized_view: { 
            $cond: {
              if: { $gt: [stats.maxViewCount, 0] },
              then: { $divide: ['$view_count', stats.maxViewCount] },
              else: 0
            }
          },
          // Ưu tiên thêm categories có nhiều dịch vụ
          service_factor: { 
            $cond: {
              if: { $gt: [{ $size: '$services' }, 0] },
              then: { $min: [{ $divide: [{ $size: '$services' }, 10] }, 1] }, // Tối đa 1
              else: 0
            }
          }
        }
      },
      {
        $addFields: {
          // Tính điểm popularity tổng hợp với trọng số
          popularity_score: {
            $add: [
              { $multiply: ['$normalized_booking', 0.4] },      // 40% cho booking
              { $multiply: ['$normalized_search', 0.3] },       // 30% cho tìm kiếm
              { $multiply: ['$normalized_view', 0.2] },         // 20% cho lượt xem
              { $multiply: ['$avg_rating', 0.1] },              // 10% cho rating
              { $multiply: ['$service_factor', 0.1] }           // 10% bonus cho số lượng dịch vụ
            ]
          }
        }
      },
      // Lọc các categories không active hoặc đã xóa
      { $match: { is_active: true, is_deleted: false } },
      // Sắp xếp theo điểm popularity giảm dần
      { $sort: { popularity_score: -1 } },
      // Phân trang
      { $skip: skip || 0 },
      { $limit: limit || 10 },
      // Chọn các trường cần thiết
      {
        $project: {
          _id: 1,
          name: 1,
          image: 1,
          description: 1,
          popularity_score: 1,
          service_count: 1,
          avg_rating: 1,
          booking_count: 1,
          search_count: 1,
          view_count: 1
        }
      }
    ]);
    
    return popularCategories;
  } catch (error) {
    console.error('Failed to fetch popular categories:', error);
    throw new Error('Failed to fetch popular categories');
  }
}
}
module.exports = new CategoryService();
