# q promise library
q = require 'q'

module.exports = (winston) ->
  # setting current module to empty object
  self = { }
  reqChecker = require('../validator/reqChecker.js')()
  inputMapper = require('../mapper/inputMapper.js')()

  self.buildResponse = (req, res, cache) ->
    deferred = q.defer()
    responseConfig = cache.get req.path
    input_query_map = JSON.parse(responseConfig.input_query_map)
    # path is cached
    if responseConfig?
      # check inputmap
      checkResult =
        reqChecker.checkReq req.query, input_query_map
      if !checkResult[0]
        res.send
          error: "Request do not match input_query_map, missing #{checkResult[1]}"
      else
        inputMap = inputMapper.mapInput input_query_map, req.query
        winston.info "Inputmap is: #{JSON.stringify(inputMap)}"
        res.send "Request is correct"
    else
      res.send "something happened"
    # res.send req.path + " is working."
    return deferred.promise
  return self
