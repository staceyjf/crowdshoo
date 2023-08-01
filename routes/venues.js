const express = require('express');
const router = express.Router();
const venuesController = require('../controllers/venues')
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /venues  View all venues regardless of logged in status
router.get('/', venuesController.index);

// // GET /venues/myFavs View a map of the logged in user's favourite venues
router.get('/myFavs', ensureLoggedIn, venuesController.myFavs);

// GET /venues/new View a form for submitting a venue (be sure to define this route before the show route)
//MUST be below new route 
// it would mean that the route is designed to handle requests with the "/new" part as a dynamic parameter. In this context, "/new" is not a fixed part of the URL but a placeholder for a variable value that can change with each request.
router.get('/new', ensureLoggedIn, venuesController.new);

// GET /venues/:id View the details of a venue
router.get('/:id', ensureLoggedIn, venuesController.show);

// POST /venues - Handle the new venue form being submitted
router.post('/', ensureLoggedIn, venuesController.create);

// // DELETE /venues/:id - Delete a venue (restricted to logged in users)
// router.delete('/:id', ensureLoggedIn, venuesController.delete);

module.exports = router;