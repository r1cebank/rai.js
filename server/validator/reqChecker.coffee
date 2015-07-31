## req checker
#
#  uses the map and user input array to check validity of the request
#
##

module.exports = ->
  # lodash
  _ = require 'lodash'
  # set module to empty object
  self = { }
  # check request query using inputmap
  # more data OK, less NO
  self.checkReq = (req, map) ->
    val = true
    atKey = ''
    # checking if all key specified in map matches the input
    _.forIn map, (value, key) ->
      if !req[key]
        val = false
        atKey = key
    return [val, atKey]
  return self
