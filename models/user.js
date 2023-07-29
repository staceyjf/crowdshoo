const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    googleId: {
      type: String, 
      required: true
    },
    email: String,
    avatar: String // URL to the img
  }, {
    timestamps: true
  });

module.exports = mongoose.model('User', userSchema);
// The first argument is the singular name of the collection your model is for - it will be used to interact with the MongoDB collection that stores user documents. 
// The second argument is the schema that defines the structure of the documents in the collection.