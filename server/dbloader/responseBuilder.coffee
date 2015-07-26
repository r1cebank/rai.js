q = require 'q'

module.exports = ->
  self = { }
  self.buildResponse = (req, res, cache) ->
    deferred = q.defer()
    responseConfig = cache.get req.path
    # path is cached
    if responseConfig?
      res.send responseConfig
    else
      res.send "something is not right here"
    # res.send req.path + " is working."
    return deferred.promise
  return self
