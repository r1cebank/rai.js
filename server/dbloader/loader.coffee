# filesystem
fs = require 'fs'
# log
winston = require 'winston'
winston.cli()
# q
q = require 'q'


routeloader = require('./routeloader.js')()

module.exports = (app, config, done) ->
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
