# datasource
# defines the datasource for a API instance
#

# declare datasource constructor
class DataSource
  # log
  winston = require 'winston'
  winston.cli()
  winston.level = 'verbose'
  constructor: (db_type, db_url, cache) ->
    @datasource = require('../config/datasource.json').datasource[db_type]
    @type = db_type
    @url = db_url
    @ds_connection = require(@datasource.connection)()
    @ds_query = require(@datasource.query)()
    if cache.dbConnectionCache.get @url
      winston.verbose "connection restored from cache"
      @connection = @ds_connection.buildConnection cache.dbConnectionCache.get @url
    else
      @connection = @ds_connection.connect @url
      cache.dbConnectionCache.set @url, @connection, (error, success) ->
        winston.verbose "server connection cached!"
    # check valid db_type

  query: (input, output_map, query, collection) ->
    return @connection.then (db) =>
      return @ds_query.query db, input, output_map, query, collection



module.exports = DataSource
