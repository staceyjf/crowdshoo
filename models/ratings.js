const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema ({
    topTip: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    username: String,
    userAvatar: String,
    // venue: [{ type: Schema.Types.ObjectId, ref: 'Venue' }], //do i need to access lots of venues or just one
    venue: {
        type: Schema.Types.ObjectId, // need this to confirm a 'review' is assigned to the user.  
        // better than using username etc to dot his 
        ref: 'Venue',
      },
})

module.exports = ('Ratings', ratingSchema);