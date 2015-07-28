(function() {
  module.exports = function(queries) {
    var q, self;
    self = {};
    q = require('q');
    self.getRoutes = function(db) {
      var deferred;
      deferred = q.defer();
      db.all(queries.getRoutes, function(error, rows) {
        if (error) {
          return deferred.reject(new Error(error));
        } else {
          return deferred.resolve(rows);
        }
      });
      return deferred.promise;
    };
    self.getApplicationInfo = function(db) {
      var deferred;
      deferred = q.defer();
      db.all(queries.getInfo, function(error, rows) {
        if (error) {
          return deferred.reject(new Error(error));
        } else {
          return deferred.resolve(rows);
        }
      });
      return deferred.promise;
    };
    return self;
  };

}).call(this);
