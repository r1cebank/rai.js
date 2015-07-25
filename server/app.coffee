# express rest api
express = require 'express'
app = express()
PORT = 8000

# log
winston = require 'winston'
winston.cli()

# server config
config = require './config/serverConfig.json'

# set up routes

require('./dbloader/loader.js')(app, config, ->
  server = app.listen PORT, ->
    host = server.address().address
    port = server.address().port

    winston.info "server is up at http://#{host}:#{port}"
  )
