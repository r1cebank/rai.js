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
  app.use errorface.errorHandler() #using errorface middleware to handle error
  # create the server and output ports
  server = app.listen PORT, ->
    host = server.address().address
    port = server.address().port
    winston.info "server is up at http://#{host}:#{port}"
    # using api_table to output api table
    require('./fixtures/api_table.js')(app._router.stack, 'express')
  )
