const express = require('express');
const router = express.Router();
const { getIndividualPopular, createIndividual } = require('../controllers/individualController');
const { authenticateJwt } = require('../middlewares/authMiddleware');



router.get('/popular', getIndividualPopular); 
router.post('/', createIndividual);
module.exports = router;
