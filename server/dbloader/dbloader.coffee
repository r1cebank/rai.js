
module.exports = (queries) ->
  # setting self as empty object
  self = { }
  # q promise library
  q = require 'q'

  # get routes from db (returns promise)
  self.getRoutes = (db) ->
    # create a deferred promise
    deferred = q.defer()
    # run query to get routes
    db.all queries.getRoutes, (error, rows) ->
      if error
        # reject promise
        deferred.reject new Error error
      else
        # resolve promise
        deferred.resolve(rows)
    # return the promise fron deferred
    return deferred.promise
  # get application info from db (returns promise)
  self.getApplicationInfo = (db) ->
    # create a deferred promise
    deferred = q.defer()
    # run query to get routes
    db.all queries.getInfo, (error, rows) ->
      if error
        # reject promise
        deferred.reject new Error error
      else
        # resolve promise
        deferred.resolve(rows)
    # return the promise fron deferred
    return deferred.promise
  # return the module
  return self
