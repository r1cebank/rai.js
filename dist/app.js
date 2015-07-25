(function() {
  var PORT, app, config, express, winston;

  express = require('express');

  app = express();

  PORT = 8000;

  winston = require('winston');

  winston.cli();

  config = require('./config/serverConfig.json');

  require('./dbloader/loader.js')(app, config, function() {
    var server;
    return server = app.listen(PORT, function() {
      var host, port;
      host = server.address().address;
      port = server.address().port;
      return winston.info("server is up at http://" + host + ":" + port);
    });
  });

}).call(this);
