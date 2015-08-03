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

  query: (input, query) ->
    @connection.then (result) =>
      @ds_query.query result, input, query # here error
    .done()



module.exports = DataSource
