const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  
  res.status(200).json([]);
});


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