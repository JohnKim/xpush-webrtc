var xpush    = require('xpush');

var express  = require('express');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var exphbs   = require('express-handlebars');
//var session  = require('express-session');
var bodyParser = require('body-parser');

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var SessionServer = exports.SessionServer = function (options, cb) {

  if (!options || !options.port) {
    throw new Error('Both `options` and `options.port` are required.');
  }
  
  if (!options.facebook) {
    throw new Error('`options.facebook` is required.');
  }
  
  var tokenSecret  = 'DEFAULT-XPUSH-SECRET';
  var tokenExpired = 600;
  
  if( options.token ){
      tokenSecret = options.token.secret;
      tokenExpired = options.token.expired;
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
    clientID      : options.facebook.app_id,      // FACEBOOK_APP_ID
    clientSecret  : options.facebook.app_secret,  // FACEBOOK_APP_SECRET
    callbackURL   : options.facebook.callback,
    profileFields: ['id', 'displayName', 'photos', 'email']
  }, function(accessToken, refreshToken, profile, cb) {
      
      var user = {
            "id":       profile.id,
            "name":     profile.displayName,
            "email":    (profile.emails[0].value || '').toLowerCase(),
            "token":    accessToken
        };
        
      var rtn = {"user": user };  
      rtn["token"] = jwt.sign({ id: profile.id }, tokenSecret, { expiresIn: tokenExpired });
      
      console.log(rtn);
      return cb(null, rtn);
    //User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //  return cb(err, user);
    //});
  }));
  
  //===============EXPRESS=================
  
  var app = express();
  app.engine('handlebars', exphbs({defaultLayout: 'main'}));
  app.set('view engine', 'handlebars');
  
  app.use(express.static('public'));
  app.use(bodyParser.json());
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  
  function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  };
  
  function isLoggedIn(req, res, next) {
      
    var token  = fromHeaderOrQuerystring(req);
    console.log(token);
    jwt.verify(token,tokenSecret,function(err,payload){

        if(err){
            return res.json(403,'invalid token');
        };

        req.user = payload;

        next();
    })

    //res.redirect('/signin');
  }

  app.get('/', isLoggedIn, function (req, res) {
    res.render('home');
  });
  
  app.get('/signin', function (req, res) {
    res.render('signin');
  });
  
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { session: false, failureRedirect: '/signin' }), 
    function(req, res) {
      res.json(req.user);
  });
  
  app.get("/logout", function(req, res) {
    req.logout();
    res.send("logout success!");
  });
  
  //=============== Start XPUSH Session Server =================
  
  this.server = xpush.createSessionServer(options, cb, app);
  
  this.server.on('started', function (url, port) {
      console.log(url, port);
  });
  
};