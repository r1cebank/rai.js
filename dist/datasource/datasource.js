(function() {
  var DataSource;

  DataSource = (function() {
    function DataSource(db_type, db_url) {
      this.datasource = require('../config/datasource.json').datasource[db_type];
      this.type = db_type;
      this.url = db_url;
      this.ds_connection = require(this.datasource.connection)();
      this.ds_query = require(this.datasource.query)();
      this.connection = this.ds_connection.connect(this.url);
    }

    DataSource.prototype.query = function(input, output_map, query, collection) {
      return this.connection.then((function(_this) {
        return function(db) {
          return _this.ds_query.query(db, input, output_map, query, collection);
        };
      })(this));
    };

    return DataSource;

  })();

  module.exports = DataSource;

}).call(this);
