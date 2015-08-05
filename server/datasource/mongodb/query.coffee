# mongodb query module
#

module.exports = () ->
  # q
  q = require 'q'
  # log
  winston = require 'winston'
  winston.cli()
  winston.level = 'verbose'
  self = { }
  queryRegex = require './query.json'
  self.query = (db, input, map, query, collection) ->
    deferred = q.defer()
    # regex match type
    typeRegex = new RegExp(queryRegex.query.type)
    type = typeRegex.exec(query)[1]
    winston.verbose "query type is: #{type}"
    query = query.replace(typeRegex.exec(query)[0],'').trim()
    map = map.outputs
    input = input[0]
    # test
    paramRegex = new RegExp(queryRegex.query.param)
    valueRegex = new RegExp(queryRegex.query.value)
    # loop to replace keys
    loop
      match = paramRegex.exec(query)[1]
      match0 = paramRegex.exec(query)[0]
      key = map[match]
      query = query.replace(match0, key)
      break if !paramRegex.test(query)
    # loop to replace values
    console.log input
    loop
      match = valueRegex.exec(query)[1]
      match0 = valueRegex.exec(query)[0]
      key = input[map[match]]
      query = query.replace(match0, key)
      break if !valueRegex.test(query)
    query = JSON.parse(query)
    winston.verbose "query built: #{JSON.stringify(query)}"
    # getting the correct collection
    collection = db.collection(collection)
    collection[type](query).toArray (error, result) ->
      if error
        deferred.reject new Error error
      else
        deferred.resolve result
      # db.close()
      winston.error "server connection is never closed"
    return deferred.promise

  return self
