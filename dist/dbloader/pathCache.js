(function() {
  module.exports = function() {
    var nodecache, q, self;
    self = {};
    nodecache = require('node-cache');
    self.cache = new nodecache({
      useClones: true
    });
    q = require('q');
    self.storePath = function(key, path) {
      var deferred;
      deferred = q.defer();
      self.cache.set(key, path, function(err, success) {
        if (!err && success) {
          return deferred.resolve(success);
        } else {
          return deferred.reject(new Error(err));
        }
      });
      return deferred.promise;
    };
    self.getPath = function(key) {
      var deferred;
      deferred = q.defer();
      self.cache.get(key, function(err, value) {
        if (!err) {
          if (value != null) {
            return deferred.resolve(value);
          } else {
            return deferred.reject(new Error('path not found'));
          }
        } else {
          return deferred.reject(new Error(err));
        }
      });
      return deferred.promise;
    };
    return self;
  };

}).call(this);
