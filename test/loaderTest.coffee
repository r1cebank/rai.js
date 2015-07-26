_         = require 'lodash'
yaml      = require 'yamljs'
fs        = require 'fs'
path      = require 'path'
# CLI Arguments
argv      = require('yargs')
  .alias('t', 'target')
  .default('t', 'development')
  .argv

# Config Object
config    = yaml.parse fs.readFileSync './targets.yml', 'utf8'
config    = _.extend config.default, config[argv.target]

expect = require('chai').expect
assert = require('chai').assert
should = require('chai').should()

express = require 'express'
app = express()
# server config
serverConfig = clientdbPath: './'

self = { }
self.testVar = 'OOF'

beforeEach (done) ->
  require('../' + path.join config.paths.dest, 'dbloader', 'loader.js')(app, serverConfig, () ->
    self.testVar = '00D'
    done()
  )

describe 'loader', () ->
  it 'should call done', (done) ->
    self.testVar.should.equal '00D'
    done()
