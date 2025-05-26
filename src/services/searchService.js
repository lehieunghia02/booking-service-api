const Individual = require("../models/Individual");
const Business = require("../models/Business");
const Service = require("../models/Service");
const searchService = () => {
  const findAll = async (query) => {
    try {
      const { business, individual, category, location, name } = query;
      const query = {};
      if (business) query.business = business;
      if (individual) query.individual = individual;
      if (category) query.category = category;
      if (location) query.location = location;
      if (name) query.name = name;

      const businesses = await Business.find(query);
      const individuals = await Individual.find(query);
      const services = await Service.find(query);

      return { businesses, individuals, services };
    } catch (error) {
      throw error;
    }
  }
  return {
    findAll
  }
}

module.exports = searchService();
