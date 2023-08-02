const express = require('express');
const router = express.Router();
const bestTimeController = require('../controllers/bestTimeCtr');

// // // /* GET / - GET single venue info from bestTime API */
// router.get('/', bestTimeController.fetchBestTime);

// /* POST / - bestTime API */
router.get('/', bestTimeController.SingleVenue);

module.exports = router;