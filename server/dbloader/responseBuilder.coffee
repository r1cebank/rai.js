# q promise library
q = require 'q'

module.exports = ->
  # setting current module to empty object
  self = { }
  reqChecker = require('../validator/reqChecker.js')()

  self.buildResponse = (req, res, cache) ->
    deferred = q.defer()
    responseConfig = cache.get req.path
    # path is cached
    if responseConfig?
      # check inputmap
      checkResult =
        reqChecker.checkReq req.query, JSON.parse(responseConfig.input_query_map)
      if !checkResult[0]
        res.send
          error: "Request do not match input_query_map, missing #{checkResult[1]}"
      else
        res.send "Request is correct"
    else
      res.send "something happened"
    # res.send req.path + " is working."
    return deferred.promise
  return self
