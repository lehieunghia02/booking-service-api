const Individual = require('../models/Individual');
const Business = require('../models/Business');
const Service = require('../models/Service');

const searchController = {
  async unifiedSearch(req, res) {
    try {
      const {
        query = '', // Search text
        location = '', // Location filter
        category, // Category filter
        minPrice, // Min price for services
        maxPrice, // Max price for services
        rating, // Minimum rating filter
        type, // Optional: filter by type (individual/business/service)
        limit = 10,
        page = 1
      } = req.query;

      const results = {
        individuals: [],
        businesses: [],
        services: [],
        total: 0
      };

      // Search criteria for each model
      const baseSearchCriteria = query ? { $text: { $search: query } } : {};

      // Only search specified type or all if not specified
      const searchPromises = [];

      if (!type || type === 'individual') {
        const individualCriteria = {
          ...baseSearchCriteria,
          is_active: true
        };
        if (rating) {
          individualCriteria.avg_rating = { $gte: parseFloat(rating) };
        }
        if (category) {
          individualCriteria.categories = category;
        }

        searchPromises.push(
          Individual.find(individualCriteria)
            .populate('categories')
            .sort({ avg_rating: -1, total_rating: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .then(data => {
              results.individuals = data;
              return Individual.countDocuments(individualCriteria);
            })
            .then(count => {
              results.total += count;
            })
        );
      }

      if (!type || type === 'business') {
        const businessCriteria = {
          ...baseSearchCriteria,
          is_active: true,
          is_deleted: false
        };
        if (rating) {
          businessCriteria.avg_rating = { $gte: parseFloat(rating) };
        }
        if (category) {
          businessCriteria.categories = category;
        }
        if (location) {
          businessCriteria.location = { $regex: location, $options: 'i' };
        }

        searchPromises.push(
          Business.find(businessCriteria)
            .populate(['categories', 'services'])
            .sort({ avg_rating: -1, total_rating: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .then(data => {
              results.businesses = data;
              return Business.countDocuments(businessCriteria);
            })
            .then(count => {
              results.total += count;
            })
        );
      }

      if (!type || type === 'service') {
        const serviceCriteria = {
          ...baseSearchCriteria,
          isActive: true
        };
        if (category) {
          serviceCriteria.category = category;
        }
        if (minPrice || maxPrice) {
          serviceCriteria.price = {};
          if (minPrice) serviceCriteria.price.$gte = parseFloat(minPrice);
          if (maxPrice) serviceCriteria.price.$lte = parseFloat(maxPrice);
        }

        searchPromises.push(
          Service.find(serviceCriteria)
            .populate('category')
            .sort({ price: 1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .then(data => {
              results.services = data;
              return Service.countDocuments(serviceCriteria);
            })
            .then(count => {
              results.total += count;
            })
        );
      }

      // Wait for all searches to complete
      await Promise.all(searchPromises);

      // Format response
      const response = {
        success: true,
        data: {
          ...results,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: results.total,
            pages: Math.ceil(results.total / limit)
          }
        }
      };

      // Add metadata about result counts
      response.data.counts = {
        individuals: results.individuals.length,
        businesses: results.businesses.length,
        services: results.services.length,
        total: results.total
      };

      return res.status(200).json(response);

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = searchController;