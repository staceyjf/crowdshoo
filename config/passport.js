const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').
OAuth2Strategy; 

const User = require('../models/user');

/* 
passport.use() method to plug-in an instance of the OAuth strategy and provide a verify callback function that will be called whenever a user has logged in using OAuth. 
passport.serializeUser() method to provide a callback that Passport will call after the verify callback.
passport.deserializeUser() method to provide a callback that Passport will call for every request when a user is logged in.
*/

passport.use(new GoogleStrategy(
    { // Configuration object
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK    // this is how it knows to get back in touch with us
    },
    async function(accessToken, refreshToken, profile, cb) { // verify cb
        try { 
            let user = await User.findOne({ googleId: profile.id }); // returns google id
            if (user) return cb(null, user); // we need to provide null to indicate to passport that there is no err
            // we have a new user via OAuth
            user = await User.create({ // we are updating 'user' with the verified user details
                name: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value, 
                avatar: profile.photos[0].value  
            }); 
            return cb(null, user);
        } catch (err) {
            return cb(err); // error first signature - lets express know we have an error
        }
    }
));

passport.serializeUser(function(user, cb) { // adds user._id to the session used to track the user
    cb(null, user._id);
});

passport.deserializeUser( async function(userId, cb) {
    cb(null, await User.findById(userId)); // find the user document in the database based on the provided _id. 
    //This deserialized user object will be available in the req.user property on all subsequent requests, 
})