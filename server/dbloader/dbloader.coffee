
module.exports = (queries) ->
  self = { }
  # q promise library
  q = require 'q'

  self.getRoutes = (db) ->
    deferred = q.defer()
    db.all queries.getRoutes, (err, rows) ->
      if err
        deferred.reject new Error error
      else
        deferred.resolve(rows)
    return deferred.promise
  self.getApplicationInfo = (db) ->
    deferred = q.defer()
    db.all queries.getInfo, (err, rows) ->
      if err
        deferred.reject new Error console.error
      else
        deferred.resolve(rows)
    return deferred.promise
  return self
