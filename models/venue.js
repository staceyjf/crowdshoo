const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const venueSchema = new Schema({
    venueName: {
      type: String,
      required: true, // The name is required
    },
    latitude: Number, // Latitude value
    longitude: Number, // Longitude value
    address: String,
    footTraffic: Number,
    venuePhoto: String,
    workingHours: Number,
    phoneNumber: Number,
    reservations: String,
    myFavCategory: {
      type: String,
      required: true, // The name is required
    },
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    ratings: [{ type: Schema.Types.ObjectId, ref: 'Ratings' }]
  }, {
    timestamps: true
  });

module.exports = mongoose.model('Venue', venueSchema);