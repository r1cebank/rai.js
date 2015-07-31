## input mapper
#
#  used the input map provided by the user db and
#  create the adjusted input mapped with db
#  data source is input script
#
##
module.exports = ->
  # lodash
  _ = require 'lodash'
  self = { }
  # map input using the inputmap
  self.mapInput = (map, input) ->
    mappedInput = { }
    _.forIn map, (value, key) ->
      mappedInput[value] = input[key]
    return mappedInput
  return self
