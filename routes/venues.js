const express = require('express');
const router = express.Router();
const venuesController = require('../controllers/venues')
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /venues  View all venues regardless of logged in status
router.get('/', venuesController.index);

// // POST /venues/:id - Add the logged in user's _id to a myFav array
// router.post('/:id', ensureLoggedIn, venuesController.addMyFav);

// GET /venues/new 
//MUST be below new route /	View a form for submitting a venue (be sure to define this route before the show route)
router.get('/new', ensureLoggedIn, venuesController.new);

// GET /venues/:id View the details of a venue
router.get('/:id', venuesController.show);

// // POST /venues - Handle the new venue form being submitted
// router.post('/', ensureLoggedIn, venuesController.create);

// // GET /venues/:id/edit  - View a form for editing a book (restrict to user who submitted the book)
// router.get('/:id/edit', venuesController.edit);

// // PUT /venues/:id - Handle the edit book form being submitted restricted to logged in users)
// router.post('/:id', ensureLoggedIn, venuesController.update);

// // DELETE /venues/:id - Delete a venue (restricted to logged in users)
// router.post('/:id', ensureLoggedIn, venuesController.delete);


  
module.exports = router;