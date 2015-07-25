# q promise library
q = require 'q'

module.exports = ->
  self = { }
  self.getRoutes = (db) ->
    deferred = q.defer()
    db.all "select * from routes", (err, rows) ->
      if err
        deferred.reject new Error error
      else
        deferred.resolve(rows)
    return deferred.promise
  return self
