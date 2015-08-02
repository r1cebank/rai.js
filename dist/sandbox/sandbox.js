(function() {
  module.exports = function(winston) {
    var SBox, checker, errorRegex, fs, q, self;
    self = {};
    q = require('q');
    fs = require('fs');
    checker = require('syntax-error');
    SBox = require('sandbox');
    errorRegex = /(error)/ig;
    self.runScript = function(input, script) {
      var deferred, footer, header, message, sandbox, src;
      deferred = q.defer();
      if (script) {
        sandbox = new SBox();
        header = fs.readFileSync('./fixtures/header.js').toString();
        footer = fs.readFileSync('./fixtures/footer.js').toString();
        message = {
          inputs: input
        };
        src = header + script + footer;
        winston.verbose("the combined script is: \n" + src);
        sandbox.run(src, function(result) {
          if (errorRegex.test(result.result)) {
            return deferred.reject(new Error(result.result));
          } else {
            winston.verbose("result is: " + (JSON.stringify(result)));
            return deferred.resolve(result.console);
          }
        });
        sandbox.postMessage(JSON.stringify(message));
      } else {
        winston.verbose("no script provided, passing data");
        deferred.resolve(input);
      }
      return deferred.promise;
    };
    return self;
  };

}).call(this);
