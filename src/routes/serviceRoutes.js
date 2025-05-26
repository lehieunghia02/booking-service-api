const express = require('express');
const router = express.Router();
const {getServicePopular} = require('../controllers/serviceController');

router.get('/popular', getServicePopular);


router.get('/:id', (req, res) => {
 
  res.status(200).json({});
});

router.post('/', (req, res) => {

  res.status(201).json({});
});

router.put('/:id', (req, res) => {
 
  res.status(200).json({});
});

router.delete('/:id', (req, res) => {
 
  res.status(200).json({ message: 'Service deleted' });
});

module.exports = router; 