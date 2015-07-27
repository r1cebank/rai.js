(function() {
  var PORT, app, config, errorface, express, winston;

  express = require('express');

  app = express();

  PORT = 8000;

  errorface = require('errorface');

  winston = require('winston');

  winston.cli();

  config = require('./config/serverConfig.json');

  require('./dbloader/loader.js')(app, config, winston, function() {
    var server;
    app.use(errorface.errorHandler());
    return server = app.listen(PORT, function() {
      var host, port;
      host = server.address().address;
      port = server.address().port;
      winston.info("server is up at http://" + host + ":" + port);
      return require('./fixtures/api_table.js')(app._router.stack, 'express');
    });
  });

}).call(this);
