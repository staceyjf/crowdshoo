const Venue = require('../models/venue');
const Ratings = require('../models/ratings');
const User = require('../models/user');

module.exports = {
  update,
  delete: removeVenue_myFav
};

// View a form for editing a rating & myFav Cat of venues (restrict to user who submitted the rating)
async function update(req, res) {
  try {
    const updatedRating = await Ratings.findOneAndUpdate(
      {venue: req.params.id, user: req.user._id},
      // update object with updated properties
      req.body,
      // options object {new: true} returns updated doc
      {new: true}
    ).populate('venue');

    console.log('---------hello-------')
    console.log(updatedRating.venue._id);
    const venueId = updatedRating.venue._id 


    return res.redirect(`/venues/${ venueId }`);
  } catch (err) {
    console.log(err.message);
    return res.redirect(`/venues/${ venueId }`);
  }
}

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