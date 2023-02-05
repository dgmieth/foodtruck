var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');

passport.use(new GoogleStrategy({
    clientID: process.env[process.env.G_CLIENT_ID],
    clientSecret: process.env[process.env.G_CLIENT_SECRET],
    callbackURL: 'https://www.example.com/oauth2/redirect/google'},
  function(issuer, profile, cb){

  }
  ,()=>{console.log('verifying function')})
  )