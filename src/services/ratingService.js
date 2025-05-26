const Rating = require('../models/rating');
const Business = require('../models/Business');
const Booking = require('../models/Booking');

class RatingService {
  constructor() {
    this.rating = Rating;
    this.business = Business;
    this.booking = Booking;
  }
  async createRating(ratingData) {
    try {
      const hasBooking = await Booking.findOne({
        user: ratingData.user,
        business: ratingData.business,
        status: { $in: ['completed', 'confirmed'] }
      });

      // Tạo rating với trạng thái verified dựa trên booking
      const newRating = new Rating({
        ...ratingData,
        is_verified: !!hasBooking
      });

      // Lưu rating mới
      const savedRating = await newRating.save();

      // Cập nhật thông tin rating trong Business
      await this.updateBusinessRatingSummary(ratingData.business);

      return savedRating;
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error - user đã đánh giá business này
        throw new Error('You have already rated this business');
      }
      throw new Error(`Failed to create rating: ${error.message}`);
    }
  }
    // Cập nhật rating
  async updateRating(ratingId, ratingData, userId) {
    try {
      // Tìm rating và đảm bảo user có quyền sửa
      const rating = await Rating.findOne({ _id: ratingId, user: userId });
      
      if (!rating) {
        throw new Error('Rating not found or you do not have permission to update');
      }

      // Cập nhật thông tin rating
      Object.assign(rating, ratingData);
      await rating.save();

      // Cập nhật thông tin rating trong Business
      await this.updateBusinessRatingSummary(rating.business);

      return rating;
    } catch (error) {
      throw new Error(`Failed to update rating: ${error.message}`);
    }
  }
   // Xóa rating (soft delete)
  async deleteRating(ratingId, userId) {
    try {
      const rating = await Rating.findOne({ _id: ratingId, user: userId });
      
      if (!rating) {
        throw new Error('Rating not found or you do not have permission to delete');
      }

      // Soft delete
      rating.is_deleted = true;
      await rating.save();

      // Cập nhật thông tin rating trong Business
      await this.updateBusinessRatingSummary(rating.business);

      return { success: true };
    } catch (error) {
      throw new Error(`Failed to delete rating: ${error.message}`);
    }
  }
  // Lấy ratings của một business
  async getBusinessRatings(businessId, options = {}) {
    try {
      const { page = 1, limit = 10, sort = 'newest' } = options;
      const skip = (page - 1) * limit;

      // Sort options
      let sortOption = {};
      if (sort === 'newest') {
        sortOption = { createdAt: -1 };
      } else if (sort === 'highest') {
        sortOption = { stars: -1 };
      } else if (sort === 'lowest') {
        sortOption = { stars: 1 };
      }

      // Query với options
      const ratings = await Rating.find({ 
        business: businessId,
        is_deleted: false
      })
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .populate('user', 'first_name last_name avatar')
      .lean();

      // Đếm tổng số ratings
      const total = await Rating.countDocuments({ 
        business: businessId,
        is_deleted: false
      });

      return {
        ratings,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Failed to get business ratings: ${error.message}`);
    }
  }
  // Cập nhật tổng hợp rating cho business
  async updateBusinessRatingSummary(businessId) {
    try {
      // Tìm tất cả ratings của business (không bị xóa)
      const ratings = await Rating.find({ 
        business: businessId,
        is_deleted: false
      });

      // Tính toán phân phối rating
      const distribution = {
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0
      };

      let totalStars = 0;
      let reviewCount = 0;

      ratings.forEach(rating => {
        // Cập nhật phân phối
        distribution[rating.stars] = (distribution[rating.stars] || 0) + 1;
        
        // Tính tổng số sao
        totalStars += rating.stars;

        // Đếm số reviews có comment
        if (rating.comment && rating.comment.trim().length > 0) {
          reviewCount++;
        }
      });

      // Tính trung bình
      const averageRating = ratings.length > 0 ? totalStars / ratings.length : 0;

      // Cập nhật vào business
      await Business.findByIdAndUpdate(businessId, {
        'rating_summary.average_rating': parseFloat(averageRating.toFixed(1)),
        'rating_summary.total_ratings': ratings.length,
        'rating_summary.rating_distribution': distribution,
        'rating_summary.review_count': reviewCount
      });

      return true;
    } catch (error) {
      console.error(`Failed to update business rating summary: ${error.message}`);
      return false;
    }
  }
}
module.exports = new RatingService();
