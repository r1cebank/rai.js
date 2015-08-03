(function() {
  module.exports = function() {
    var q, queryRegex, self, winston;
    q = require('q');
    winston = require('winston');
    winston.cli();
    winston.level = 'verbose';
    self = {};
    queryRegex = require('./query.json');
    self.query = function(db, input, map, query, collection) {
      var deferred, key, match, match0, paramRegex, type, typeRegex, valueRegex;
      deferred = q.defer();
      typeRegex = new RegExp(queryRegex.query.type);
      type = typeRegex.exec(query)[1];
      winston.verbose("query type is: " + type);
      query = query.replace(typeRegex.exec(query)[0], '').trim();
      map = map.outputs;
      paramRegex = new RegExp(queryRegex.query.param);
      valueRegex = new RegExp(queryRegex.query.value);
      while (true) {
        match = paramRegex.exec(query)[1];
        match0 = paramRegex.exec(query)[0];
        key = map[match];
        query = query.replace(match0, key);
        if (!paramRegex.test(query)) {
          break;
        }
      }
      while (true) {
        match = valueRegex.exec(query)[1];
        match0 = valueRegex.exec(query)[0];
        key = input[0][map[match]];
        query = query.replace(match0, key);
        if (!valueRegex.test(query)) {
          break;
        }
      }
      query = JSON.parse(query);
      winston.verbose("query built: " + (JSON.stringify(query)));
      collection = db.collection(collection);
      collection[type](query).toArray(function(error, result) {
        if (error) {
          return deferred.reject(new Error(error));
        } else {
          return deferred.resolve(result);
        }
      });
      return deferred.promise;
    };
    return self;
  };

}).call(this);
