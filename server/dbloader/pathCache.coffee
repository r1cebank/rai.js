
module.exports = ->
  self = { }
  # cache
  nodecache = require 'node-cache'
  self.cache = new nodecache(useClones: true)
  # q
  q = require 'q'

  self.storePath = (key , path) ->
    deferred = q.defer()
    self.cache.set key, path, (err, success) ->
      if !err && success
        deferred.resolve success
      else
        deferred.reject new Error err
    return deferred.promise
  self.getPath = (key) ->
    deferred = q.defer()
    self.cache.get key, (err, value) ->
      if !err
        if value?
          deferred.resolve value
        else
          deferred.reject new Error 'path not found'
      else
        deferred.reject new Error err
    return deferred.promise


  return self
