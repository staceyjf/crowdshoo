const express = require('express');
const router = express.Router();
const passport = require('passport');
// const fetch = require('node-fetch');
// const { ROOT_URL, token } = require('../config/bestTimeAPI');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   fetch(`${ROOT_URL}/${token}`, {
//   method: 'GET'
//   }).then(res => res.text()).then(function(data) { console.log(data); });
// });

/* GET /auth/google */
// user will be presented the consent screen if they haven’t previously consented.
router.get('/auth/google', passport.authenticate(  
  'google', // passport's google strategy is being used
  {
    scope: ['profile', 'email'],
    prompt: "select_account" 
    /* user to explicitly select an account and enter their credentials for authentication, 
    rather than relying on any previous session information. 
    This will override any Single Sign-On behavior for this authentication request. */
  }
))

/* GET /oauth2callback */
router.get('/oauth2callback', passport.authenticate ( 
  'google',
  {
    successRedirect: '/venues/myFavs', // CHANGE THIS WHEN I'VE CREATED A PAGE FOR THE MAP
    failureRedirect: '/'
  }
))

/* GET /logout - OAuth logout */
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/'); // CHANGE THIS WHEN I'VE CREATED A PAGE FOR THE MAP
  });
});

module.exports = router;