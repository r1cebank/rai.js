
module.exports = (winston) ->
  self = { }
  # q
  q = require 'q'
  # filesystem
  fs = require 'fs'
  # first create a syntax checker
  checker = require 'syntax-error'
  # sandbox module
  SBox = require 'sandbox'
  # error regex
  errorRegex = /(error)/ig

  self.runScript = (input, script) ->
    # get a promise deferred
    deferred = q.defer()
    # create a sandbox instance
    sandbox = new SBox()
    # combine source to create a new source file
    header = fs.readFileSync('./fixtures/header.js').toString()
    footer = fs.readFileSync('./fixtures/footer.js').toString()
    message =
      inputs: input
    src = header + script + footer
    winston.verbose "the combined script is: \n#{src}"
    sandbox.run src, (result) ->
      if errorRegex.test result.result
        deferred.reject new Error result.result
      else
        winston.verbose "result is: #{JSON.stringify(result)}"
        deferred.resolve result.console
    # sending inputs to sandbox
    sandbox.postMessage JSON.stringify(message)
    # return the promise
    return deferred.promise

  return self
