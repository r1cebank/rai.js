(function() {
  var q;

  q = require('q');

  module.exports = function() {
    var reqChecker, self;
    self = {};
    reqChecker = require('../validator/reqChecker.js')();
    self.buildResponse = function(req, res, cache) {
      var checkResult, deferred, responseConfig;
      deferred = q.defer();
      responseConfig = cache.get(req.path);
      if (responseConfig != null) {
        checkResult = reqChecker.checkReq(req.query, JSON.parse(responseConfig.input_query_map));
        if (!checkResult[0]) {
          res.send({
            error: "Request do not match input_query_map, missing " + checkResult[1]
          });
        } else {
          res.send("Request is correct");
        }
      } else {
        res.send("something happened");
      }
      return deferred.promise;
    };
    return self;
  };

}).call(this);
