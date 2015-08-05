# mongodb datasource connectioin
#

module.exports = () ->
  q = require 'q'
  mongo = require('mongodb').MongoClient
  self = { }
  self.connect = (url) ->
    deferred = q.defer()
    mongo.connect url, (error, db) ->
      if error
        deferred.reject new Error error
      else
        deferred.resolve db
    return deferred.promise
  self.buildConnection = (db) ->
    deferred = q.defer()
    deferred.resolve db
    return deferred.promise
  return self
