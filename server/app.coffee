# local database
sqlite = require('sqlite3').verbose()
db = new sqlite.Database('./clientdb/testApp.sqlite2')

# express rest api
express = require 'express'
app = express()
PORT = 8000

# promises
q = require 'q'

# log
winston = require 'winston'
winston.cli()

# regex for routes

routeRegex = /^(\/[A-Za-z]+)$/

db.all "select * from routes", (err, rows) ->
  for row in rows
    if routeRegex.test row.path
      winston.info "path #{row.path} is valid!"
      if row.request_type is "get"
        winston.info "setting new get route #{row.path}"
        app.get row.path, (req, res) ->
          res.send "#{row.path} is working!"
      # register routes
    else
      winston.error "path #{row.path} is not valid :("


server = app.listen PORT, ->
  host = server.address().address
  port = server.address().port

  winston.info "server is up at http://#{host}:#{port}"
