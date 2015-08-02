(function() {
  var PORT, app, cluster, config, errorface, express, fs, hub, winston;

  cluster = require('cluster');

  hub = require('clusterhub');

  fs = require('fs');

  express = require('express');

  app = express();

  PORT = 8000;

  errorface = require('errorface');

  winston = require('winston');

  winston.cli();

  winston.level = 'verbose';

  config = require('./config/serverConfig.json');

  if (cluster.isMaster) {
    require('./dbloader/loader.js')(app, config, winston, function() {
      var server;
      app.use(errorface.errorHandler());
      return server = app.listen(PORT, function() {
        var host, port;
        host = server.address().address;
        port = server.address().port;
        winston.info("server is up at http://" + host + ":" + port);
        require('./fixtures/api_table.js')(app._router.stack, 'express');
        winston.info("starting slave process.");
        return cluster.fork();
      });
    });
    hub.on('event', function(data) {
      return winston.info("got message from slave.");
    });
  } else {
    winston.info("slave online");
    winston.info("watching clientdb folder: " + config.clientdbPath);
    fs.watch(config.clientdbPath, function(event, filename) {
      winston.verbose("fs event: " + event);
      if (filename) {
        winston.verbose("filename: " + filename);
      } else {
        winston.verbose("no filename provided.");
      }
      winston.verbose("sending message to master..");
      return hub.emit('event', {
        event: 'reload'
      });
    });
  }

  cluster.on('exit', function(worker, code, signal) {
    winston.error("worker " + worker.process.pid + " died");
    winston.info("reviving worker");
    return cluster.fork();
  });

}).call(this);
