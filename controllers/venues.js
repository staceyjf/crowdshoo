const Venue = require('../models/venue');
const Ratings = require('../models/ratings');
const User = require('../models/user');

module.exports = {
    index,
    // allVenues,
    new: newVenue,
    show,
    create
    // edit,
    // update,
    // delete
};

// sharing between index & show - converts our ranking nums to stars
function rankingToStars(ratingNum) {
  const ranking = Math.round(ratingNum); // rounding it to the nearest integer
  const fullStars = '★'.repeat(ranking);
  const emptyStars = '☆'.repeat(5 - ranking); // filling up with empty stars to make a total of 5
  return fullStars + emptyStars;
}

async function index(req, res) {
    const venues = await Venue.find({});
    const ratings = await Ratings.find({}); // Retrieve all ratings
    
    // average ranking calculations
    const totalRatings = ratings.length;
    let totalRanking = 0;

    ratings.forEach((rating) => {
      totalRanking += rating.ranking;
    });

    let avgRanking = (totalRanking / totalRatings);
    let averageStarRanking = rankingToStars(avgRanking);

    // view to be rendered / object containing relevant data for the view engine
    res.render('venues/index', { 
      title: 'myFav favs', 
      venues, 
      averageStarRanking }); 
  }

async function show(req, res) {
    const venue = await Venue.findById(req.params.id).populate('users').populate('ratings');
    
    // find the associated review from the logged in user
    const userReview = await Ratings.findOne({ 
      venue: venue._id, 
      user: req.user._id
    });

    // pass through stars 
    let userRanking = userReview.ranking;
    let starRanking = rankingToStars(userRanking);

    res.render('venues/show', { 
      title: 'A myFav venue listing', 
      venue,
      userReview,
      starRanking
    });
  }

function newVenue(req, res) {
    // We'll want to be able to render an  
    // errorMsg if the create action fails
    res.render('venues/new', { 
      title: 'Add a new myFav venue', 
      errorMsg: '' });
  }

async function create(req, res) {
  try {
    const venue = await Venue.create(req.body); // creates a venue document

    // extract relevant inputs from req.body
    const ratingInput = {
      ranking: req.body.ranking,
      topTip: req.body.topTip,
      user: req.user._id,
      venue: venue._id
    };

    const venueName = req.body.venueName;
    if (!venueName) {
      throw new Error('Please add venue name');
    }

    // checking to see if venue and ranking have been added 
    if (!ratingInput.ranking || ratingInput.ranking < 1 || ratingInput.ranking > 5) {
      throw new Error('Invalid rating. Please select a rating between 1 and 5.');
    }

    // associating a review with a user and venue
    const rating = await Ratings.create(ratingInput); // create a new rating document associated with said user and venue

    // updating the rating and user arrays within the venue model
    venue.ratings = [rating._id]; // updated the rating array within venue model
    venue.users = [ratingInput.user];
    await venue.save(); // save venue document post the rating add

    // associating the user with a venue and a review arrays
    const user = await User.findById(req.user._id);
    user.venues.push(venue._id);
    user.ratings.push(rating._id);
    await user.save(); // save venue and ratings to the user document 

    // Always redirect after CUDing data
    res.redirect(`/venues/${venue._id}`, );  // redirecting to individual venue page
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('venues/new', { 
      title: 'Add a new myFav venue', 
      errorMsg: '' });
  }
}