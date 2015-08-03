# mongodb query module
#

module.exports = () ->
  # q
  q = require 'q'
  self = { }
  self.query = (connection, input, query) ->
    deferred = q.defer()
    console.log input
    console.log query
    return deferred.promise
  return self
