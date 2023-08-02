const express = require('express');
const router = express.Router();
const footFallController = require('../controllers/footTrafficCtrl');

// // // /* GET / - GET single venue info from bestTime API */
// router.get('/', bestTimeController.fetchBestTime);

/* POST / - bestTime API */
router.get('/', footFallController.SingleVenue);

module.exports = router;