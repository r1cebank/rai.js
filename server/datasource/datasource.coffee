# datasource
# defines the datasource for a API instance
#

# declare datasource constructor
class DataSource
  constructor: (db_type, db_url) ->
    @datasource = require('../config/datasource.json').datasource[db_type]
    @type = db_type
    @url = db_url
    @ds_connection = require(@datasource.connection)()
    @ds_query = require(@datasource.query)()
    @connection = @ds_connection.connect @url
    # check valid db_type

  query: (input, output_map, query, collection) ->
    return @connection.then (db) =>
      return @ds_query.query db, input, output_map, query, collection



module.exports = DataSource
