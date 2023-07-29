const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const venueSchema = new Schema({
    venueName: String,
    latitude: Number, // Latitude value
    longitude: Number, // Longitude value
    address: String,
    footTraffic: Number,
    venuePhoto: String,
    workingHours: Number,
    phoneNumber: Number,
    reservations: String,
    myFavCategory: String,
    // user: [{ type: Schema.Types.ObjectId, ref: 'User' }], // should this be an array? will i only access one or multiple?
    user: {
        type: Schema.Types.ObjectId, // need this to confirm a 'review' is assigned to the user.  
        // better than using username etc to dot his 
        ref: 'User',
      },
    ratings: [{ type: Schema.Types.ObjectId, ref: 'Ratings' }]
  }, {
    timestamps: true
  });

module.exports = mongoose.model('Venue', venueSchema);