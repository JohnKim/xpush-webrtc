var xpush = require('xpush');
var express = require('express');
var exphbs  = require('express-handlebars');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var SessionServer = exports.SessionServer = function (options, cb) {

  if (!options || !options.port) {
    throw new Error('Both `options` and `options.port` are required.');
  }
  
  if (!options.facebook) {
    throw new Error('`options.facebook` is required.');
  }

  var self = this;
  
  //===============PASSPORT=================

  // Passport session setup.
  passport.serializeUser(function(user, done) {
    console.log("serializing " + user.username);
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    console.log("deserializing " + obj);
    done(null, obj);
  });
  
  passport.use(new FacebookStrategy({
    clientID: options.facebook.app_id,          // FACEBOOK_APP_ID
    clientSecret: options.facebook.app_secret,  // FACEBOOK_APP_SECRET
    callbackURL: options.facebook.callback
  }, function(accessToken, refreshToken, profile, cb) {
      console.log(accessToken, refreshToken, profile)
      return cb(null, profile);
    //User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //  return cb(err, user);
    //});
  }));
  
  //===============EXPRESS=================
  
  var app = express();
  app.use(express.static('public'));

  app.engine('handlebars', exphbs({defaultLayout: 'main'}));
  app.set('view engine', 'handlebars');

  app.get('/', function (req, res) {
    res.render('home');
  });
  
  app.get('/signin', function (req, res) {
    res.render('signin');
  });
  
  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
  
  //=============== Start XPUSH Session Server =================
  
  this.server = xpush.createSessionServer(options, cb, app);
  
  this.server.on('started', function (url, port) {
      console.log(url, port);
  });
  
};