# uses cluster to fork 1 monitor process
cluster = require 'cluster'
# cluster hub for inner process events
hub = require 'clusterhub'
# filesystem
fs = require 'fs'
# express rest api
express = require 'express'
bodyParser = require 'body-parser'
app = express()

# used body parser
app.use bodyParser.urlencoded extended: false
app.use bodyParser.json()
PORT = 8000

# express middleware
errorface = require 'errorface'

# log
winston = require 'winston'
winston.cli()
winston.level = 'verbose'

# server config
config = require './config/serverConfig.json'

# server cache
serverCache = require './cache/cache.js'
cache = new serverCache()

# use middlewares

reloadData = (data) ->
  # recieved event from slave
  # removed listener to avoid conflict
  hub.removeAllListeners('event')
  winston.info "got message from slave."
  winston.info "clearing servercache"
  # clear all servercache
  cache.clearAll()
  if data.event is 'reload'
    winston.info "reloading clientdb"
    winston.error "data reload not tested."
    app._router.stack = app._router.stack.filter (obj) ->
      return obj.route == undefined
    console.log app._router.stack
    require('./dbloader/loader.js')(app, cache, config, winston, ->
      # using api_table to output api table
      require('./fixtures/api_table.js')(app._router.stack, 'express')
      hub.on 'event', reloadData
    )
  else
    winston.verbose "ignoring action"

# set up routes

if !cluster.isMaster
  # startup sequence
  require('./dbloader/loader.js')(app, cache, config, winston, ->
    app.use errorface.errorHandler() #using errorface middleware to handle error
    # create the server and output ports
    server = app.listen PORT, ->
      host = server.address().address
      port = server.address().port
      winston.info "server is up at http://#{host}:#{port}"
      # using api_table to output api table
      require('./fixtures/api_table.js')(app._router.stack, 'express')
    )
  hub.on 'event', reloadData
else
  # start database watcher
  winston.info "starting master process."
  cpuCount = require('os').cpus().length
  for i in [1..cpuCount]
    cluster.fork()
  winston.info "slave online"
  winston.info "watching clientdb folder: #{config.clientdbPath}"
  fs.watch config.clientdbPath, (event, filename) ->
    winston.verbose "fs event: #{event}"
    if filename
      winston.verbose "filename: #{filename}"
    else
      winston.verbose "no filename provided."
    winston.verbose "sending message to master.."
    hub.emit 'event', event: 'reload'
# cluster exit reporting
cluster.on 'exit', (worker, code, signal) ->
  winston.error "worker #{worker.process.pid} died"
  winston.info "reviving worker"
  cluster.fork()
