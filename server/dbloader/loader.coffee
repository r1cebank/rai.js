# filesystem
fs = require 'fs'
# q
q = require 'q'

module.exports = (app, cache, config, winston, done) ->
  routeloader = require('./routeloader.js')(winston)
  winston.info "scanning clientdb directory..."
  filenames = fs.readdirSync config.clientdbPath
  q.allSettled filenames.map (filename) ->
    return routeloader.loadRouteForFile app, cache, config, filename
  .then () ->
    done()
  .done()
