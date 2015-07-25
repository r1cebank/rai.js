(function() {
  var q;

  q = require('q');

  module.exports = function() {
    var self;
    self = {};
    self.buildResponse = function(req, res) {
      var deferred;
      deferred = q.defer();
      res.send(req.path + " is working.");
      return deferred.promise;
    };
    return self;
  };

}).call(this);
