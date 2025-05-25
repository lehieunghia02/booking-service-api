const Business = require('../models/Business');

class BusinessService {
  constructor() {
    this.Business = Business;
  }

  // Tìm kiếm salon phổ biến dựa trên nhiều yếu tố
  async getPopularSalons(options = {}) {
    try {
      const { page = 1, limit = 10, category, location } = options;
      const skip = (page - 1) * limit;

      // Lấy thống kê để chuẩn hóa các giá trị
      const stats = await Business.aggregate([
        { $match: { is_active: true, is_deleted: false } },
        {
          $group: {
            _id: null,
            maxBookingCount: { $max: '$booking_count' },
            maxViewCount: { $max: '$view_count' },
            maxSearchCount: { $max: '$search_count' },
            maxRatingCount: { $max: '$rating_summary.total_ratings' },
            totalBusinesses: { $sum: 1 }
          }
        }
      ]);

      // Lấy giá trị tối đa hoặc mặc định
      const maxStats = stats.length > 0 ? stats[0] : {
        maxBookingCount: 1,
        maxViewCount: 1,
        maxSearchCount: 1,
        maxRatingCount: 1
      };

      // Tạo match query
      const matchQuery = {
        is_active: true,
        is_deleted: false
      };

      // Thêm điều kiện lọc theo category nếu có
      if (category) {
        matchQuery.categories = category;
      }

      // Thêm điều kiện lọc theo location nếu có
      if (location && location.city) {
        matchQuery['address.city'] = location.city;
      }

      // Tính toán độ phổ biến sử dụng MongoDB Aggregation
      const popularSalons = await Business.aggregate([
        // Lọc các salon hoạt động
        { $match: matchQuery },
        
        // Tính toán các chỉ số chuẩn hóa
        {
          $addFields: {
            // Xử lý booking count
            normalized_booking: {
              $cond: {
                if: { $gt: [maxStats.maxBookingCount, 0] },
                then: { 
                  $max: [
                    0.05, // Floor để không bị 0
                    { $divide: ['$booking_count', maxStats.maxBookingCount] }
                  ]
                },
                else: 0.05
              }
            },
            
            // Xử lý view count
            normalized_view: {
              $cond: {
                if: { $gt: [maxStats.maxViewCount, 0] },
                then: { 
                  $max: [
                    0.05,
                    { $divide: ['$view_count', maxStats.maxViewCount] }
                  ]
                },
                else: 0.05
              }
            },
            
            // Xử lý search count
            normalized_search: {
              $cond: {
                if: { $gt: [maxStats.maxSearchCount, 0] },
                then: { 
                  $max: [
                    0.05,
                    { $divide: ['$search_count', maxStats.maxSearchCount] }
                  ]
                },
                else: 0.05
              }
            },
            
            // Xử lý số lượng rating (độ tin cậy)
            rating_reliability: {
              $cond: {
                if: { $gt: [maxStats.maxRatingCount, 0] },
                then: { 
                  $max: [
                    0.05,
                    { $divide: ['$rating_summary.total_ratings', maxStats.maxRatingCount] }
                  ]
                },
                else: 0.05
              }
            },
            
            // Chuẩn hóa rating (đã ở thang 0-5)
            normalized_rating: {
              $cond: {
                if: { $gt: ['$rating_summary.total_ratings', 0] },
                then: { $divide: ['$rating_summary.average_rating', 5] },
                else: 0.6 // Mặc định 3/5 sao nếu chưa có đánh giá
              }
            },
            
            // Bonus cho salon mới (dưới 30 ngày)
            days_since_creation: {
              $divide: [
                { $subtract: [new Date(), '$createdAt'] },
                1000 * 60 * 60 * 24 // Đổi thành ngày
              ]
            }
          }
        },
        {
          $addFields: {
            time_bonus: {
              $max: [
                0,
                { 
                  $min: [
                    0.2, // Tối đa 20% bonus
                    { 
                      $multiply: [
                        0.2,
                        { 
                          $subtract: [
                            1,
                            { $divide: ['$days_since_creation', 30] } // Giảm dần trong 30 ngày
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            
            // Tính điểm popularity tổng hợp
            popularity_score: {
              $add: [
                { $multiply: ['$normalized_booking', 0.3] },     // 30% cho booking
                { $multiply: ['$normalized_search', 0.2] },      // 20% cho tìm kiếm
                { $multiply: ['$normalized_view', 0.1] },        // 10% cho lượt xem
                { $multiply: ['$normalized_rating', 0.25] },     // 25% cho rating trung bình
                { $multiply: ['$rating_reliability', 0.15] }     // 15% cho số lượng rating
                // time_bonus được thêm sau
              ]
            }
          }
        },
        {
          $addFields: {
            // Thêm time bonus vào popularity score
            popularity_score: { 
              $add: ['$popularity_score', '$time_bonus']
            }
          }
        },
        
        // Sắp xếp theo popularity score
        { $sort: { popularity_score: -1 } },
        
        // Phân trang
        { $skip: skip },
        { $limit: parseInt(limit) },
        
        // Chọn các trường để trả về
        {
          $project: {
            _id: 1,
            name: 1,
            description: 1,
            address: 1,
            images: 1,
            logo: 1,
            categories: 1,
            rating_summary: 1,
            popularity_score: 1,
            booking_count: 1,
            view_count: 1,
            search_count: 1
          }
        }
      ]);
      
      // Đếm tổng số salon thỏa mãn điều kiện
      const total = await Business.countDocuments(matchQuery);
      
      return {
        salons: popularSalons,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('Failed to fetch popular salons:', error);
      throw new Error('Failed to fetch popular salons');
    }
  }

  // Tăng view count khi người dùng xem salon
  async trackBusinessView(businessId) {
    try {
      await Business.findByIdAndUpdate(businessId, {
        $inc: { view_count: 1 }
      });
      return true;
    } catch (error) {
      console.error('Failed to track business view:', error);
      return false;
    }
  }

  // Tăng search count khi salon xuất hiện trong kết quả tìm kiếm
  async incrementSearchCount(businessId) {
    try {
      await Business.findByIdAndUpdate(businessId, {
        $inc: { search_count: 1 }
      });
      return true;
    } catch (error) {
      console.error('Failed to increment search count:', error);
      return false;
    }
  }
}

module.exports = new BusinessService();