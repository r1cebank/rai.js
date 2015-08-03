(function() {
  module.exports = function() {
    var q, self;
    q = require('q');
    self = {};
    self.query = function(connection, input, query) {
      var deferred;
      deferred = q.defer();
      console.log(input);
      console.log(query);
      return deferred.promise;
    };
    return self;
  };

}).call(this);
