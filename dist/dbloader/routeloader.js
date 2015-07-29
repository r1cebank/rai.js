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
          var apiPath, i, len, results, route;
          results = [];
          for (i = 0, len = routes.length; i < len; i++) {
            route = routes[i];
            winston.verbose("[" + filename + "]: " + (JSON.stringify(route)));
            if (routeRegex.test(route.path)) {
              winston.info("[" + filename + "]: path " + route.path + " is valid!");
              apiPath = "/" + info.name + route.path;
              self.pathCache.set(apiPath, route);
              if (route.request_type === "get") {
                winston.info("[" + filename + "]: setting new get route " + apiPath);
                results.push(app.get(apiPath, function(req, res) {
                  return resBuilder.buildResponse(req, res, self.pathCache).done();
                }));
              } else {
                results.push(void 0);
              }
            } else {
              winston.error(route.path + " failed regex test.");
              throw new Error("[" + filename + "]: Route failed regex test.");
            }
          }
          return results;
        })["catch"](function(err) {
          winston.error("[" + filename + "]: caught error from promise.");
          winston.error(err);
          return deferred.reject(new Error(err));
        })["finally"](function() {
          if (deferred.promise.inspect().state === 'rejected') {
            return winston.verbose("[" + filename + "]: rejecting master promise.");
          } else {
            winston.verbose("[" + filename + "]: resolving master promise.");
            return deferred.resolve();
          }
        }).done();
      } else {
        deferred.reject(new Error("file is not sqlite"));
      }
      return deferred.promise;
    };
    return self;
  };

}).call(this);
