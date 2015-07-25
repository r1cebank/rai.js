# filesystem
fs = require 'fs'
path = require 'path'
# local database
sqlite = require('sqlite3').verbose()
# log
winston = require 'winston'
winston.cli()

# dbloader
loader = require('./dbloader.js')()

# sqlite regex
fileRegex = /^.*\.(sqlite|sqlite2|sqlite3)$/

module.exports = (app, config, done) ->
  winston.info "scanning clientdb directory..."
  filenames = fs.readdirSync config.clientdbPath
  filenames.map (filename) ->
    if fileRegex.test filename
      winston.info "loading #{filename}"
      db = new sqlite.Database path.join config.clientdbPath, filename
      promise = loader.getRoutes db
      promise.then (rows) ->
        console.log rows
      .done()
      console.log promise
  winston.info "cleaning up..."
  done()
# # local database
# sqlite = require('sqlite3').verbose()
# db = new sqlite.Database('./clientdb/testApp.sqlite3')
#
# # promises
# q = require 'q'
# # log
# winston = require 'winston'
# winston.cli()
#
# # regex for routes
#
# routeRegex = /^(\/[A-Za-z]+)$/
#
# db.all "select * from routes", (err, rows) ->
#   for row in rows
#     if routeRegex.test row.path
#       winston.info "path #{row.path} is valid!"
#       if row.request_type is "get"
#         winston.info "setting new get route #{row.path}"
#         app.get row.path, (req, res) ->
#           # middleware function builder start here
#           res.send "#{row.path} is working!"
#           # middleware function ends here
#       # register routes
#     else
#       winston.error "path #{row.path} is not valid :("
