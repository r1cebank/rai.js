(function() {
  var q;

  q = require('q');

  module.exports = function() {
    var self;
    self = {};
    self.buildResponse = function(req, res, cache) {
      var deferred, responseConfig;
      deferred = q.defer();
      responseConfig = cache.get(req.path);
      if (responseConfig != null) {
        res.send(responseConfig);
      } else {
        res.send("something is not right here");
      }
      return deferred.promise;
    };
    return self;
  };

}).call(this);
