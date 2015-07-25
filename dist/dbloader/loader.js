(function() {
  var fileRegex, fs, loader, path, sqlite, winston;

  fs = require('fs');

  path = require('path');

  sqlite = require('sqlite3').verbose();

  winston = require('winston');

  winston.cli();

  loader = require('./dbloader.js')();

  fileRegex = /^.*\.(sqlite|sqlite2|sqlite3)$/;

  module.exports = function(app, config, done) {
    var filenames;
    winston.info("scanning clientdb directory...");
    filenames = fs.readdirSync(config.clientdbPath);
    filenames.map(function(filename) {
      var db, promise;
      if (fileRegex.test(filename)) {
        winston.info("loading " + filename);
        db = new sqlite.Database(path.join(config.clientdbPath, filename));
        promise = loader.getRoutes(db);
        promise.then(function(rows) {
          return console.log(rows);
        }).done();
        return console.log(promise);
      }
    });
    winston.info("cleaning up...");
    return done();
  };

}).call(this);
