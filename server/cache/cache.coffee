# cache
# defines the cache for a server instance
#

# declare cache constructor
class Cache
  hashmap = require 'hashmap'
  nodecache = require 'node-cache'

  constructor: ->
    @pathCache = new hashmap()
    @dbConnectionCache = new nodecache(useClones: false)

  clearAll: ->
    @pathCache.clear()
    @dbConnectionCache.flushAll()



module.exports = Cache
