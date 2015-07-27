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
sqlite = require('sqlite3').verbose()
shortid = require 'shortid'

# express app
express = require 'express'
app = express()

serverConfig = clientdbPath: './test'

describe 'routeloader', () ->
  routeloader = require('../' + path.join config.paths.dest, 'dbloader', './routeloader.js')()
  it 'should load sqlite2', () ->
    routeloader.loadRouteForFile app, serverConfig, 'test.sqlite3'
    .catch (e) ->
      should.not.exist(e)
    .done()
  it 'should not load other file', () ->
    db = new sqlite.Database 'database.tmp'
    routeloader.loadRouteForFile app, serverConfig, 'database.tmp'
    .catch (e) ->
      expect(e).to.be.a('Error')
    .then () ->
      fs.unlinkSync 'database.tmp'
    .done()
