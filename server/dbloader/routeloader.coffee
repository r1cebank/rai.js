
module.exports = (winston) ->
  self = { }
  # queries
  queries = require '../config/queries.json'
  # dbloader
  loader = require('./dbloader.js')(queries)
  # response builder
  resBuilder = require('./responseBuilder.js')(winston)
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
          winston.verbose "[#{filename}]: #{JSON.stringify(route)}"
          if routeRegex.test route.path
            winston.info "[#{filename}]: path #{route.path} is valid!"
            # path builder
            apiPath = "/" + info.name + route.path
            # local cache
            self.pathCache.set apiPath, route
            # test request type
            if route.request_type is "get"
              winston.info "[#{filename}]: setting new get route #{apiPath}"
              app.get apiPath, (req, res) ->
                # middleware function builder start here
                resBuilder.buildResponse req, res, self.pathCache
                .done()
                # middleware function ends here
          else
            winston.error "#{route.path} failed regex test."
            throw new Error "[#{filename}]: Route failed regex test."
      .catch (err) ->
        winston.error "[#{filename}]: caught error from promise."
        winston.error err
        deferred.reject new Error err
      .finally () ->
        if deferred.promise.inspect().state is 'rejected'
          winston.verbose "[#{filename}]: rejecting master promise."
        else
          winston.verbose "[#{filename}]: resolving master promise."
          deferred.resolve()
      .done()
    else
      deferred.reject new Error("file is not sqlite")
    return deferred.promise
  return self
