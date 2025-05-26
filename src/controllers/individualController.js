const Individual = require('../models/Individual');
const { getIndividualPopularService } = require('../services/individualService');

const getIndividualPopular = async (req, res) => {
  try {
    const individuals = await getIndividualPopularService();
    if(!individuals){
      return res.status(404).json({
        status: '404',
        message: 'No individuals found'
      });
    }
    res.status(200).json({
      status: '200',
      message: 'Individuals fetched successfully',
      data: individuals 
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
}
const createIndividual = async (req, res) => {
  try {
    const invidial = await Individual.create(req.body);
    res.status(201).json({
      status: 'success',
      data: invidial
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
}
module.exports = {
  getIndividualPopular,
  createIndividual
}