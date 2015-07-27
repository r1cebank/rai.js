(function() {
  var fs, q;

  fs = require('fs');

  q = require('q');

  module.exports = function(app, config, winston, done) {
    var filenames, routeloader;
    routeloader = require('./routeloader.js')(winston);
    winston.info("scanning clientdb directory...");
    filenames = fs.readdirSync(config.clientdbPath);
    return q.allSettled(filenames.map(function(filename) {
      return routeloader.loadRouteForFile(app, config, filename);
    })).then(function() {
      return done();
    })["catch"](function(e) {
      winston.error(e);
      return done();
    }).done();
  };

}).call(this);
