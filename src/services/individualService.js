const Individual = require('../models/Individual');

const createIndividual = async (name, email, password, phone, address, city, state, zip, country, businessId) => {
  const individual = await Individual.create({name, email, password, phone, address, city, state, zip, country, businessId});
  return individual;
}
const getIndividualPopularService = async (limit = 5) => {
  try {
    const individuals = await Individual.aggregate([
      // Match active individuals
      {
        $match: {
          is_active: true
        }
      },
      // Calculate ratings
      {
        $addFields: {
          ratingCount: { $size: "$ratings" },
          avg_rating: {
            $round: [
              {
                $cond: {
                  if: { $gt: [{ $size: "$ratings" }, 0] },
                  then: { 
                    $divide: [
                      { $sum: "$ratings.rating" }, 
                      { $size: "$ratings" }
                    ]
                  },
                  else: 0
                }
              },
              1 // Round to 1 decimal place
            ]
          }
        }
      },
      // Lookup categories
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categoriesInfo'
        }
      },
      {
        $unwind: {
          path: '$categoriesInfo',
          preserveNullAndEmptyArrays: true
        }
      },
    
      {
        $lookup: {
          from: 'businesses',
          localField: 'business',
          foreignField: '_id',
          as: 'businessInfo'
        }
      },
      {
        $unwind: {
          path: '$businessInfo',
          preserveNullAndEmptyArrays: true
        }
      },
      // Sort by average rating
      {
        $sort: {
          avg_rating: -1,
          ratingCount: -1 // Secondary sort by number of ratings
        }
      },
      // Project final fields
      {
        $project: {
          _id: 1,
          individual_name: "$name",
          description: 1,
          category_name: "$categoriesInfo.name",
          business_name: "$businessInfo.name" || "",
          business_address: "$businessInfo.address" || "",
        

          avg_rating: 1,
          total_rating: 1,
          avatar_url: "$avatar",
        }
      },
      // Limit results
      {
        $limit: limit
      }
    ]);

    return individuals;
  } catch (error) {
    throw new Error(`Failed to fetch popular individuals: ${error.message}`);
  }
};

const updateIndividual = async (id, data) => {
  const individual = await Individual.findByIdAndUpdate(id, data, {new: true});
  return individual;
}
module.exports = {
  createIndividual,
  getIndividualPopularService,
  updateIndividual
}