(function() {
  module.exports = function() {
    var _, self;
    _ = require('lodash');
    self = {};
    self.checkReq = function(req, map) {
      var atKey, val;
      val = true;
      atKey = '';
      _.forIn(map, function(value, key) {
        if (!req[key]) {
          val = false;
          return atKey = key;
        }
      });
      return [val, atKey];
    };
    return self;
  };

}).call(this);
