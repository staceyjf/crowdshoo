const Venue = require('../models/venue');
const Ratings = require('../models/ratings');
const User = require('../models/user');

module.exports = {
    edit,
    delete: removeVenue_myFav
    // update
};

// View a form for editing a rating & myFav Cat of venues (restrict to user who submitted the rating)
async function edit(req, res) {
    // find the venue that matches the :id params in the URL and user of the current logged in user
    const venue = await Venue.findById(req.params.id).populate('users').populate('ratings');
    
  console.log("---------venue-------------");
  console.log('');
  console.log(venue);

    // loop through ratings to match logged user with userId of rating
    for (const rating of venue.ratings) {
      console.log("---------rating Id-------------");
      console.log('');
      console.log(rating._id);
      if (user._id.toString() === rndUserIds.toString()) {
        ratingToEdit = rating;
        break;
      }
    }

    if (!venue) return res.redirect('/venues');
    
    res.render(`/venues/${venue._id}`,
    venue,
    ratingToEdit
     ); 
};

/* started as deleteReview and now afraid to move*/
async function removeVenue_myFav(req, res, next) {
  try {
    // find the the venue, the user and the ratings
    let venue = await Venue.findOne({ _id: req.params.id });
    let user = await User.findOne({ _id: req.user._id });
    let rating = await Ratings.findOne({venue: req.params.id, user: req.user._id});

    // if there are any issues with the above, re-direct
    if (!rating || !user || !venue ) return res.redirect('/venues'); 
  
    // remove said venue and rating from user collection 
    user.venues.pull(venue._id);
    user.ratings.pull(rating._id);
    user.save();

    // remove said user and rating from venue collection 
    venue.users.pull(user._id);
    venue.ratings.pull(rating._id);
    venue.save();

    // delete the rating
    await rating.deleteOne();
    res.redirect('/venues');

  } catch (err) {
    return next(err);
  }
}