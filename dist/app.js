(function() {
  var PORT, app, cluster, config, errorface, express, fs, hub, reloadData, winston;

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

  reloadData = function(data) {
    hub.removeAllListeners('event');
    winston.info("got message from slave.");
    if (data.event === 'reload') {
      winston.info("reloading clientdb");
      winston.error("data reload not tested.");
      app._router.stack = app._router.stack.filter(function(obj) {
        return obj.route === void 0;
      });
      console.log(app._router.stack);
      return require('./dbloader/loader.js')(app, config, winston, function() {
        require('./fixtures/api_table.js')(app._router.stack, 'express');
        return hub.on('event', reloadData);
      });
    } else {
      return winston.verbose("ignoring action");
    }
  };

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
    hub.on('event', reloadData);
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
