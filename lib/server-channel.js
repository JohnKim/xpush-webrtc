var xpush = require('xpush');


var ChannelServer = exports.ChannelServer = function (options, cb) {

  if (!options || !options.port) {
    throw new Error('Both `options` and `options.port` are required.');
  }
  
  this.server = xpush.createChannelServer(options);
  this.redisClient = this.server.sessionManager.redisClient;
  
};