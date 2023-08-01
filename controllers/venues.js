const Venue = require('../models/venue');
const Ratings = require('../models/ratings');
const User = require('../models/user');

module.exports = {
    index,
    myFavs,
    new: newVenue,
    show,
    create
};

// sharing between index & show - converts our ranking nums to stars
function rankingNumsToStars(ratingNum) {
  const ranking = Math.round(ratingNum); // rounding it to the nearest integer
  const fullStars = '★'.repeat(ranking);
  const emptyStars = '☆'.repeat(5 - ranking); // filling up with empty stars to make a total of 5
  return fullStars + emptyStars;
}

// this shows every venue regardless of user
async function index(req, res) {
  try {
    const allVenues = await Venue.find({}); // Retrieves all the venues across all users

    // for each venue, calculation an average ranking score across all users for that venue
    const avgStars_CatByVenueName = [];
    for (let i = 0; i < allVenues.length; i++) {
      // find the venue and the ratingId
      const venueObj = allVenues[i];
      const ratingArr = venueObj.ratings;

      let totalRanking = 0;
      for (let x = 0; x < ratingArr.length; x++ ) {
         // find all related rating objects in ratings collections
        const ratingId = ratingArr[x];
        const ratingObj = await Ratings.findById(ratingId);
        // calculate a total ranking score by adding the ranking each loop
        totalRanking += ratingObj.ranking
      }

      // for that total ranking score, find the avg and convert the number to stars
      const averageRanking = totalRanking / ratingArr.length;
      avgStars_CatByVenueName.push({
        venueName: venueObj.venueName,
        myFavCat: venueObj.myFavCategory,
        stars: rankingNumsToStars(averageRanking),
      });
    }

    res.render('venues/allVenues', {
      title: 'Venues from all users',
      allVenues,
      avgStars_CatByVenueName,
    });
  } catch (err) {
    console.log(err);
  }
}

// shows favorite places that are associated with an individual user 
async function myFavs(req, res) { 
  const user = await User.findById(req.user._id); // find user

  const name_Cat_RankingByVenue = [];
  const allRatings = user.ratings; // find ratings related to user

  for (let i = 0; i < allRatings.length; i++) {
    const rating = await Ratings.findById(allRatings[i]); // for each rating,
    const venueId = rating.venue; 
    const venue = await Venue.findById(venueId); // find the venue obj
    name_Cat_RankingByVenue.push({ // push relevant into obj for .ejs
      venueId: venue._id,
      venueName: venue.venueName,
      myFavCat: venue.myFavCategory,
      stars: rankingNumsToStars(rating.ranking),
      topTips:rating.topTip
    });
  }
  
  res.render('venues/myFavs', {
    title: 'A myFav venue map', 
    name_Cat_RankingByVenue
    });
};

async function show(req, res) {
    const venue = await Venue.findById(req.params.id).populate('users').populate('ratings');
    
    // find the associated review from the logged in user. There will always be a star ranking as this was a required field.
    const userReview = await Ratings.findOne({ 
      venue: venue._id, 
      user: req.user._id
    });

    // pass through stars 
    let userRanking = userReview.ranking;
    let starRanking = rankingNumsToStars(userRanking);

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

async function create(req, res) { // adds the venue to the all venues
  try {
     /* Step 1: check to see if the event document already exists */
    let venue;
    let addedVenueName = req.body.venueName;
    // let addedVenueName = new RegExp(req.body.venueName, "i");
    console.log(req.user._id);

    // check if the venue is already in the venue collection 
    const checkVenue = await Venue.findOne({ venueName: addedVenueName });

    // if the event name is new, add new document. If it is not, update document
    if (!checkVenue) { 
        venue = await Venue.create(req.body); // creates a venue document
        console.log('venue created');
        await venue.save(); // save venue document post the rating add
    } else {
        venue = await Venue.findOne({ venueName: addedVenueName })
        console.log('venue found')
    }

    console.log(venue);

    /* Step 2: update the review collection */
    // extract relevant inputs from req.body for the ratings model
    const ratingInput = {
      ranking: req.body.ranking,
      topTip: req.body.topTip,
      user: req.user._id,
      venue: venue._id
    };
    console.log(ratingInput);

    // associating a review with a user and venue - will always need a review doc to be created as they are unique
    const rating = await Ratings.create(ratingInput); 
    console.log(rating._id);

    /* Step 3: adding the venues and ratings in the user collection */
    const user = await User.findById(req.user._id);
    user.venues.push(venue._id);
    user.ratings.push(rating._id);
    await user.save(); 

    /* Step 3: adding the rating and user to the relevant arrays */
    venue.ratings.push(rating._id); 
    venue.users.push(req.user._id); 
    await venue.save(); 

    // Always redirect after CUDing data
    res.redirect(`venues/${venue._id}`, );  // redirecting to individual venue page
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('venues/new', { 
      title: 'Add a new myFav venue', 
      errorMsg: '' });
  }
}
