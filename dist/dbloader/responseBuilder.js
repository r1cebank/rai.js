(function() {
  var q;

  q = require('q');

  module.exports = function(winston) {
    var Datasource, inputMapper, reqChecker, sandbox, self;
    self = {};
    reqChecker = require('../validator/reqChecker.js')();
    inputMapper = require('../mapper/inputMapper.js')();
    sandbox = require('../sandbox/sandbox.js')(winston);
    Datasource = require('../datasource/datasource.js');
    self.buildResponse = function(req, res, cache) {
      var checkResult, datasource, deferred, inputMap, input_query_map, pre_query_promise, pre_query_script, pre_query_script_output, query, responseConfig, table_collection, type, url;
      deferred = q.defer();
      responseConfig = cache.get(req.path);
      input_query_map = JSON.parse(responseConfig.input_query_map);
      pre_query_script = responseConfig.pre_query_script;
      url = responseConfig.data_source_url;
      type = responseConfig.data_source_type;
      query = responseConfig.query;
      pre_query_script_output = JSON.parse(responseConfig.pre_query_script_output);
      table_collection = responseConfig.table_collection;
      if (responseConfig != null) {
        checkResult = reqChecker.checkReq(req.query, input_query_map);
        if (!checkResult[0]) {
          res.send({
            error: "Request do not match input_query_map, missing " + checkResult[1]
          });
        } else {
          inputMap = inputMapper.mapInput(input_query_map, req.query);
          winston.verbose("Inputmap is: " + (JSON.stringify(inputMap)));
          pre_query_promise = sandbox.runScript(inputMap, pre_query_script);
          datasource = new Datasource(type, url);
          pre_query_promise.then(function(result) {
            var query_promise;
            query_promise = datasource.query(result, pre_query_script_output, query, table_collection);
            return query_promise.then(function(result) {
              return res.send(JSON.stringify(result));
            })["catch"](function(error) {
              return res.send(JSON.stringify(error));
            }).done();
          });
        }
      } else {
        res.send("something happened");
      }
      return deferred.promise;
    };
    return self;
  };

}).call(this);
