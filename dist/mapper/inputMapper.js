(function() {
  module.exports = function() {
    var _, self;
    _ = require('lodash');
    self = {};
    self.mapInput = function(map, input) {
      var mappedInput;
      mappedInput = {};
      _.forIn(map, function(value, key) {
        return mappedInput[value] = input[key];
      });
      return mappedInput;
    };
    return self;
  };

}).call(this);
