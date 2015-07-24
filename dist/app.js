(function() {
  var PORT, app, db, express, q, routeRegex, server, sqlite, winston;

  sqlite = require('sqlite3').verbose();

  db = new sqlite.Database('./clientdb/testApp.sqlite2');

  express = require('express');

  app = express();

  PORT = 8000;

  q = require('q');

  winston = require('winston');

  winston.cli();

  routeRegex = /^(\/[A-Za-z]+)$/;

  db.all("select * from routes", function(err, rows) {
    var i, len, results, row;
    results = [];
    for (i = 0, len = rows.length; i < len; i++) {
      row = rows[i];
      if (routeRegex.test(row.path)) {
        winston.info("path " + row.path + " is valid!");
        if (row.request_type === "get") {
          winston.info("setting new get route " + row.path);
          results.push(app.get(row.path, function(req, res) {
            return res.send(row.path + " is working!");
          }));
        } else {
          results.push(void 0);
        }
      } else {
        results.push(winston.error("path " + row.path + " is not valid :("));
      }
    }
    return results;
  });

  server = app.listen(PORT, function() {
    var host, port;
    host = server.address().address;
    port = server.address().port;
    return winston.info("server is up at http://" + host + ":" + port);
  });

}).call(this);
