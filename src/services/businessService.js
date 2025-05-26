const Business = require('../models/Business');

class BusinessService {
  constructor() {
    this.Business = Business;
  }

  async createBusiness(data){
    try {
      const business = await this.Business.create(data);
      return business;
    } catch (error) {
      console.error('Failed to create business:', error);
      throw new Error('Failed to create business');
    }
  }

  // Get business by ID
  async getBusinessById(id) {
    try {
      return await Business.findById(id);
    } catch (error) {
      console.error('Failed to get business by ID:', error);
      throw new Error('Failed to get business details');
    }
  }

  async getPopularSalons(options = {}) {
    try {
      const { page = 1, limit = 10, category } = options;
      const skip = (page - 1) * limit;

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

      const maxStats = stats.length > 0 ? stats[0] : {
        maxBookingCount: 1,
        maxViewCount: 1,
        maxSearchCount: 1,
        maxRatingCount: 1
      };

      const matchQuery = {
        is_active: true,
        is_deleted: false
      };

      if (category) {
        matchQuery.categories = category;
      }

      if (location && location.city) {
        matchQuery['address.city'] = location.city;
      }

      const popularSalons = await Business.aggregate([
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
            
            normalized_rating: {
              $cond: {
                if: { $gt: ['$rating_summary.total_ratings', 0] },
                then: { $divide: ['$rating_summary.average_rating', 5] },
                else: 0.6 // Mặc định 3/5 sao nếu chưa có đánh giá
              }
            },
            
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
                    0.2, 
                    { 
                      $multiply: [
                        0.2,
                        { 
                          $subtract: [
                            1,
                            { $divide: ['$days_since_creation', 30] } 
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            
            popularity_score: {
              $add: [
                { $multiply: ['$normalized_booking', 0.3] },     // 30% cho booking
                { $multiply: ['$normalized_search', 0.2] },      // 20% cho tìm kiếm
                { $multiply: ['$normalized_view', 0.1] },        // 10% cho lượt xem
                { $multiply: ['$normalized_rating', 0.25] },     // 25% cho rating trung bình
                { $multiply: ['$rating_reliability', 0.15] }     
              ]
            }
          }
        },
        {
          $addFields: {
            popularity_score: { 
              $add: ['$popularity_score', '$time_bonus']
            }
          }
        },
        
        { $sort: { popularity_score: -1 } },
        
        { $skip: skip },
        { $limit: parseInt(limit) },
        
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
  async getPopularSalonsByRatingCount(limit = 10)
  {
    try {
    const popularBusinesses = await Business.aggregate([
      {
        $match: {
          is_active: true,
          is_deleted: false
        }
      },
      {
        $addFields: {
          ratingCount: { $size: "$ratings" }
        }
      },
      {
        $sort: {
          ratingCount: -1
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      },
      //count total rating
      {
        $addFields: {
          total_rating: { $size: "$ratings" }
        }
      },
      //count avg rating 
      {
       $addFields: {
        ratingCount: { $size: "$ratings" },
        avg_rating: {
        $cond: {
          if: { $gt: [{ $size: "$ratings" }, 0] },
          then: {
            $round: [
              {
                $divide: [
                  { $sum: "$ratings.rating" },
                  { $size: "$ratings" }
                ]
              },
              1
            ]
          },
          else: 0
        }
  }
}

      },
      {
        $unwind: '$categories' 
      },     
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
          ratingCount: 1,
          categories: 1,
          total_rating: 1,
          avg_rating: 1
        }
      },
      {
        $limit: limit
      }
    ]);
    return popularBusinesses;

    }catch(error){
      console.error('Failed to fetch popular salons by rating count:', error);
      throw new Error('Failed to fetch popular salons by rating count');
    }
  }
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