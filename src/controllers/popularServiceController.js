const Business = require('../models/Business');
const Service = require('../models/Service');

const popularServiceController = {
  async getPopularServicesByLocation(req, res) {
    try {
      const {
        location, 
        limit = 10, 
        page = 1, 
        category, 
        minRating = 0 
      } = req.query;
      
      const businessQuery = {
        is_active: true,
        is_deleted: false
      };

      if (location) {
        businessQuery.location = { 
          $regex: new RegExp(location, 'i') 
        };
      }

      if (minRating) {
        businessQuery.avg_rating = { $gte: parseFloat(minRating) };
      }

      const businesses = await Business.find(businessQuery)
        .populate({
          path: 'services',
          model: 'service',
          match: { 
            isActive: true,
            ...(category && { category: category })
          },
          populate: {
            path: 'category',
            model: 'Category'
          }
        })
        .sort({ avg_rating: -1 })
        .lean();

      const servicePopularity = {};
      businesses.forEach(business => {
        if (business.services) {
          business.services.forEach(service => {
            if (!servicePopularity[service._id]) {
              servicePopularity[service._id] = {
                count: 1,
                service: service,
                totalBusinessRating: business.avg_rating || 0,
                businessCount: 1
              };
            } else {
              servicePopularity[service._id].count += 1;
              servicePopularity[service._id].totalBusinessRating += business.avg_rating || 0;
              servicePopularity[service._id].businessCount += 1;
            }
          });
        }
      });

      let popularServices = Object.values(servicePopularity)
        .map(item => ({
          ...item.service,
          popularity: {
            businessCount: item.businessCount,
            averageBusinessRating: item.totalBusinessRating / item.businessCount,
            occurrenceCount: item.count
          }
        }))
        .sort((a, b) => {
          if (b.popularity.occurrenceCount !== a.popularity.occurrenceCount) {
            return b.popularity.occurrenceCount - a.popularity.occurrenceCount;
          }
          return b.popularity.averageBusinessRating - a.popularity.averageBusinessRating;
        });

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const total = popularServices.length;
      popularServices = popularServices.slice(startIndex, endIndex);

      return res.status(200).json({
        success: true,
        data: {
          services: popularServices,
          pagination: {
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            pages: Math.ceil(total / limit)
          },
          location: location || 'All locations',
          filters: {
            category: category || 'All categories',
            minRating: minRating
          }
        }
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = popularServiceController;