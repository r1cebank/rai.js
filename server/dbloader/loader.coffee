# filesystem
fs = require 'fs'
# q
q = require 'q'

module.exports = (app, config, winston, done) ->
  routeloader = require('./routeloader.js')(winston)
  winston.info "scanning clientdb directory..."
  filenames = fs.readdirSync config.clientdbPath
  q.allSettled filenames.map (filename) ->
    return routeloader.loadRouteForFile app, config, filename
  .then () ->
    done()
  .catch (e) ->
    winston.error e
    done()
  .done()
