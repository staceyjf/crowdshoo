const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'crowdShoo' });
});

/* GET /auth/google */
router.get('/auth/google', passport.authenticate( // user will be presented the consent screen if they haven’t previously consented.
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
    successRedirect: '/', // CHANGE THIS WHEN I'VE CREATED A PAGE FOR THE MAP
    failureRedirect: '/'
  }
))

/* GET /logout */
// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/venues');
  });
});

module.exports = router;
