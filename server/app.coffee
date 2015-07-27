# express rest api
express = require 'express'
app = express()
PORT = 8000

# express middleware
errorface = require 'errorface'

# log
winston = require 'winston'
winston.cli()

# server config
config = require './config/serverConfig.json'

# use middlewares



# set up routes

require('./dbloader/loader.js')(app, config, winston, ->
  app.use errorface.errorHandler()
  server = app.listen PORT, ->
    host = server.address().address
    port = server.address().port
    winston.info "server is up at http://#{host}:#{port}"
    require('./fixtures/api_table.js')(app._router.stack, 'express')
  )
