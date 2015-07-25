(function() {
  var q;

  q = require('q');

  module.exports = function() {
    var self;
    self = {};
    self.getRoutes = function(db) {
      var deferred;
      deferred = q.defer();
      db.all("select * from routes", function(err, rows) {
        if (err) {
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
