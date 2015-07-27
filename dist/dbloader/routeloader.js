(function() {
  module.exports = function(winston) {
    var fileRegex, hashmap, loader, path, q, queries, resBuilder, routeRegex, self, sqlite;
    self = {};
    queries = require('../config/queries.json');
    loader = require('./dbloader.js')(queries);
    resBuilder = require('./responseBuilder.js')();
    sqlite = require('sqlite3').verbose();
    q = require('q');
    path = require('path');
    fileRegex = /^.*\.(sqlite|sqlite2|sqlite3)$/;
    routeRegex = /^(\/[A-Za-z]+)$/;
    hashmap = require('hashmap');
    self.pathCache = new hashmap();
    self.loadRouteForFile = function(app, config, filename) {
      var db, deferred, promise;
      deferred = q.defer();
      if (fileRegex.test(filename)) {
        winston.info("loading " + filename);
        db = new sqlite.Database(path.join(config.clientdbPath, filename));
        promise = loader.getApplicationInfo(db);
        promise.then(function(rows) {
          return [rows[0], loader.getRoutes(db)];
        }).spread(function(info, routes) {
          var i, len, results, route;
          results = [];
          for (i = 0, len = routes.length; i < len; i++) {
            route = routes[i];
            if (routeRegex.test(route.path)) {
              winston.info("path " + route.path + " is valid!");
              path = "/" + info.name + route.path;
              self.pathCache.set(path, route);
              if (route.request_type === "get") {
                winston.info("setting new get route " + path);
                results.push(app.get(path, function(req, res) {
                  return resBuilder.buildResponse(req, res, self.pathCache).done();
                }));
              } else {
                results.push(void 0);
              }
            } else {
              results.push(void 0);
            }
          }
          return results;
        })["catch"](function(err) {
          return deferred.reject(new Error(err));
        })["finally"](function() {
          return deferred.resolve();
        }).done();
      } else {
        deferred.reject(new Error("file is not sqlite"));
      }
      return deferred.promise;
    };
    return self;
  };

}).call(this);
