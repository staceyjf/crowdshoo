const Venue = require('../models/venue');
const Ratings = require('../models/ratings');
const User = require('../models/user'); // do i need the user model?

module.exports = {
    index,
    // addMyFav,
    new: newVenue,
    show
    // create,
    // edit,
    // update,
    // delete
};

async function index(req, res) {
  const venues = await Venue.find({});
  // view to be rendered / object containing relevant data for the view engine
  res.render('venues/index', { title: 'myFav community favs', venues }); 
}
async function show(req, res) {
    // CHECK IF THERE IS RIGHT TO POPULATE BOTH THE USER AND RATINGS IN THE VENUE MODEL
    const venue = await Venue.findById(req.params.id).populate('user').populate('ratings');
    // example of nin and sort his line uses Mongoose to find all performer documents whose _id is not present in the movie.cast array. In other words, it retrieves all performers who are not part of the cast for the movie. The results are sorted by the 'name' field.
    // const performers = await Performer.find({ _id: { $nin: movie.cast } }).sort('name');
    res.render('venues/show', { title: 'A myFav venue listing', venue});
  }

function newVenue(req, res) {
    // We'll want to be able to render an  
    // errorMsg if the create action fails
    res.render('venues/new', { title: 'Add a new myFav venue', errorMsg: '' });
  }