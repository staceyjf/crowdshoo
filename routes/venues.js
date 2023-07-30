const express = require('express');
const router = express.Router();
const venuesController = require('../controllers/venues')
const ensureLoggedIn = require('../config/ensureLoggedIn');

/*
params that can be extracted from the url - if you need to pass params to the function, you can do so using query params or URL
function to handle the request
*/

// GET /venues  View all venues submitted by a user
router.get('/', ensureLoggedIn, venuesController.index);

// // GET /venues/all View all venues regardless of logged in status
// router.get('/', venuesController.allVenues);

// GET /venues/new 
//MUST be below new route /	View a form for submitting a venue (be sure to define this route before the show route)
// it would mean that the route is designed to handle requests with the "/new" part as a dynamic parameter. In this context, "/new" is not a fixed part of the URL but a placeholder for a variable value that can change with each request.
router.get('/new', ensureLoggedIn, venuesController.new);

// GET /venues/:id View the details of a venue
router.get('/:id', ensureLoggedIn, venuesController.show);

// POST /venues - Handle the new venue form being submitted
router.post('/', ensureLoggedIn, venuesController.create);

// // GET /venues/:id/edit  - View a form for editing a book (restrict to user who submitted the book)
// router.get('/:id/edit', venuesController.edit);

// // PUT /venues/:id - Handle the edit book form being submitted restricted to logged in users)
// router.post('/:id', ensureLoggedIn, venuesController.update);

// // DELETE /venues/:id - Delete a venue (restricted to logged in users)
// router.post('/:id', ensureLoggedIn, venuesController.delete);


  
module.exports = router;