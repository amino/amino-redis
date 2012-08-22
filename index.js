var redis = require('haredis')
  , hydration = require('hydration')

exports.attach = function (options) {
  var amino = this
    , client

  if (typeof options === 'string') {
    var split = options.split(':');
    options = {host: split[0], port: split[1]};
  }
  else if (typeof options === 'number') {
    options = {port: options};
  }
  else {
    options || (options = {host: 'localhost', port: 6379});
  }

  if (options.nodes) {
    // haredis node list
    client = redis.createClient(options.nodes, options);
  }
  else {
    client = redis.createClient(options.port, options.host, options);
  }

  client.on('error', amino.emit.bind(amino, 'error'));

  client.on('message', function (channel, packet) {

  });

  this.publish = function () {
    var args = Array.prototype.slice.call(arguments)
      , ev = args.shift()

    args = hydration.dehydrate(args);

  };
};