(function() {
  var fs, q, routeloader, winston;

  fs = require('fs');

  winston = require('winston');

  winston.cli();

  q = require('q');

  routeloader = require('./routeloader.js')();

  module.exports = function(app, config, done) {
    var filenames;
    winston.info("scanning clientdb directory...");
    filenames = fs.readdirSync(config.clientdbPath);
    return q.allSettled(filenames.map(function(filename) {
      return routeloader.loadRouteForFile(app, config, filename);
    })).then(function() {
      return done();
    }).done();
  };

}).call(this);
