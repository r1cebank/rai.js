
module.exports = (winston) ->
  self = { }
  # queries
  queries = require '../config/queries.json'
  # dbloader
  loader = require('./dbloader.js')(queries)
  # response builder
  resBuilder = require('./responseBuilder.js')()
  # local database
  sqlite = require('sqlite3').verbose()
  # q
  q = require 'q'
  # filesystem
  path = require 'path'
  # sqlite regex
  fileRegex = /^.*\.(sqlite|sqlite2|sqlite3)$/
  # regex for routes
  routeRegex = /^(\/[A-Za-z]+)$/

  # path cache
  hashmap = require 'hashmap'
  self.pathCache = new hashmap()

  self.loadRouteForFile = (app, config, filename) ->
    deferred = q.defer()
    if fileRegex.test filename
      winston.info "loading #{filename}"
      # reading the first database
      db = new sqlite.Database path.join config.clientdbPath, filename
      # first promise
      promise = loader.getApplicationInfo db
      promise.then (rows) ->
        return [rows[0], loader.getRoutes db]
      .spread (info, routes) ->
        # now you have all the info
        for route in routes
          if routeRegex.test route.path
            winston.info "path #{route.path} is valid!"
            # path builder
            path = "/" + info.name + route.path
            # local cache
            self.pathCache.set path, route
            #cachePromise = pathCache.storePath path, route
            # test request type
            if route.request_type is "get"
              winston.info "setting new get route #{path}"
              app.get path, (req, res) ->
                # middleware function builder start here
                resBuilder.buildResponse req, res, self.pathCache
                .done()
                # middleware function ends here
      .catch (err) ->
        deferred.reject new Error err
      .finally () ->
        deferred.resolve()
      .done()
    else
      deferred.reject new Error("file is not sqlite")
    return deferred.promise
  return self
