
module.exports = (queries) ->
  self = { }
  # q promise library
  q = require 'q'

  self.getRoutes = (db) ->
    deferred = q.defer()
    db.all queries.getRoutes, (error, rows) ->
      if error
        deferred.reject new Error error
      else
        deferred.resolve(rows)
    return deferred.promise
  self.getApplicationInfo = (db) ->
    deferred = q.defer()
    db.all queries.getInfo, (error, rows) ->
      if error
        deferred.reject new Error error
      else
        deferred.resolve(rows)
    return deferred.promise
  return self
