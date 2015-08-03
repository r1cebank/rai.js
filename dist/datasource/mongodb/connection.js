(function() {
  module.exports = function() {
    var mongo, q, self;
    q = require('q');
    mongo = require('mongodb').MongoClient;
    self = {};
    self.connect = function(url) {
      var deferred;
      deferred = q.defer();
      mongo.connect(url, function(error, db) {
        if (error) {
          return deferred.reject(new Error(error));
        } else {
          return deferred.resolve(db);
        }
      });
      return deferred.promise;
    };
    return self;
  };

}).call(this);
