q = require 'q'

module.exports = ->
  self = { }
  self.buildResponse = (req, res) ->
    deferred = q.defer()
    res.send req.path + " is working."
    return deferred.promise
  return self
