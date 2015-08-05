# q promise library
q = require 'q'

module.exports = (winston) ->
  # setting current module to empty object
  self = { }
  _ = require 'lodash'
  reqChecker = require('../validator/reqChecker.js')()
  inputMapper = require('../mapper/inputMapper.js')()
  sandbox = require('../sandbox/sandbox.js')(winston)
  Datasource = require '../datasource/datasource.js'

  self.buildResponse = (req, res, cache) ->
    deferred = q.defer()
    responseConfig = cache.get req.path
    input_query_map = JSON.parse(responseConfig.input_query_map)
    pre_query_script = responseConfig.pre_query_script
    url = responseConfig.data_source_url
    type = responseConfig.data_source_type
    query = responseConfig.query
    pre_query_script_output = JSON.parse(responseConfig.pre_query_script_output)
    table_collection = responseConfig.table_collection
    # path is cached
    if responseConfig?
      # check inputmap
      checkResult =
        reqChecker.checkReq _.assign(req.query, req.body), input_query_map
      if !checkResult[0]
        res.send
          error: "Request do not match input_query_map, missing #{checkResult[1]}"
      else
        # map input with inputMap provided in db
        inputMap = inputMapper.mapInput input_query_map, req.query
        winston.verbose "Inputmap is: #{JSON.stringify(inputMap)}"
        # getting a promise from sandbox running pre query script
        pre_query_promise = sandbox.runScript inputMap, pre_query_script
        # create a new datasource
        datasource = new Datasource type, url
        pre_query_promise.then (result) ->
          query_promise = datasource.query result, pre_query_script_output, query, table_collection
          query_promise.then (result) ->
            res.send JSON.stringify result
          .catch (error) ->
            res.send JSON.stringify error
          .done()
    else
      res.send "something happened"
    # res.send req.path + " is working."
    return deferred.promise
  return self
