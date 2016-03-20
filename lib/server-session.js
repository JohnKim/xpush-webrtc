var xpush = require('xpush');

var SessionServer = exports.SessionServer = function (options, cb) {

  if (!options || !options.port) {
    throw new Error('Both `options` and `options.port` are required.');
  }

  var self = this;

  this.server = xpush.createSessionServer(options);
  
  this.server.on('started', function (url, port) {
      
  });
};