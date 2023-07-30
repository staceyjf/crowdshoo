const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/ratings')
const ensureLoggedIn = require('../config/ensureLoggedIn');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
