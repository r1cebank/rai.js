(function() {
  var q;

  q = require('q');

  module.exports = function(winston) {
    var inputMapper, reqChecker, self;
    self = {};
    reqChecker = require('../validator/reqChecker.js')();
    inputMapper = require('../mapper/inputMapper.js')();
    self.buildResponse = function(req, res, cache) {
      var checkResult, deferred, inputMap, input_query_map, responseConfig;
      deferred = q.defer();
      responseConfig = cache.get(req.path);
      input_query_map = JSON.parse(responseConfig.input_query_map);
      if (responseConfig != null) {
        checkResult = reqChecker.checkReq(req.query, input_query_map);
        if (!checkResult[0]) {
          res.send({
            error: "Request do not match input_query_map, missing " + checkResult[1]
          });
        } else {
          inputMap = inputMapper.mapInput(input_query_map, req.query);
          winston.info("Inputmap is: " + (JSON.stringify(inputMap)));
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
