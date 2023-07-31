const Venue = require('../models/venue');
const Ratings = require('../models/ratings');
const User = require('../models/user');

module.exports = {
    edit,
    delete: deleteRating
    // update
};

//edits both the venue and rating
async function edit(req, res) {
    // find the venue that matches the :id params in the URL and user of the current logged in user
    const venue = await Venue.findOne({_id: req.params.id, user: req.user._id,});
    // find the rating document based on the venue and user key/value pairs
    const rating = await Ratings.findOne({venue, user: req.user._id});
    if (!venue) return res.redirect('/venues');
    res.render(`/venues/${venue._id}`, { rating, venue } ); 
};


async function deleteRating(req, res, next) {
  try {
    // find the the venue, the user and the ratings
    let venue = await Venue.findOne({ _id: req.params.id });
    let user = await User.findOne({ _id: req.user._id });
    let rating = await Ratings.findOne({venue: req.params.id, user: req.user._id});

    // if there are any issues with the above, re-direct
    if (!rating || !user || !venue ) return res.redirect('/venues'); 
    
    // updating users
    // user = await User.findOneAndUpdate({ _id: req.user._id }, 
    //     { $pull: { venues: { _id: req.params.id } } },
    //     { new: true });
    // console.log(user);

    user.venues.pull(venue._id);
    user.ratings.pull(rating._id);
    user.save();

    venue.users.pull(user._id);
    venue.ratings.pull(rating._id);
    venue.save();

    // // updating venues
    // venue = await Venue.findOneAndUpdate({ _id: req.params.id }, 
    //     { $pull: { users: { _id: req.user._id } , ratings: { _id: rating._id }}},
    //     { new: true });
    // console.log(venue);

    // delete the rating
    await rating.deleteOne();

    res.redirect('/venues');
    
  } catch (err) {
    return next(err);
  }
}