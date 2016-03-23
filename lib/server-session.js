var xpush = require('xpush');
var express = require('express');
var exphbs  = require('express-handlebars');

var SessionServer = exports.SessionServer = function (options, cb) {

  if (!options || !options.port) {
    throw new Error('Both `options` and `options.port` are required.');
  }

  var self = this;

  var app = express();

  app.engine('handlebars', exphbs({defaultLayout: 'main'}));
  app.set('view engine', 'handlebars');

  app.get('/', function (req, res) {
    res.render('home');
  });
  
  this.server = xpush.createSessionServer(options, cb, app);
  
  this.server.on('started', function (url, port) {
      console.log(url, port);
  });
};