(function() {
  module.exports = function(queries) {
    var q, self;
    self = {};
    q = require('q');
    self.getRoutes = function(db) {
      var deferred;
      deferred = q.defer();
      db.all(queries.getRoutes, function(err, rows) {
        if (err) {
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
      db.all(queries.getInfo, function(err, rows) {
        if (err) {
          return deferred.reject(new Error(console.error));
        } else {
          return deferred.resolve(rows);
        }
      });
      return deferred.promise;
    };
    return self;
  };

}).call(this);
