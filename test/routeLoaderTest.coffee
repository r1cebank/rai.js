_         = require 'lodash'
yaml      = require 'yamljs'
fs        = require 'fs'
path      = require 'path'
# CLI Arguments
argv      = require('yargs')
  .alias('t', 'target')
  .default('t', 'development')
  .argv
# log
winston = require 'winston'
winston.cli()
winston.level = 'none'

# Config Object
config    = yaml.parse fs.readFileSync './targets.yml', 'utf8'
config    = _.extend config.default, config[argv.target]

chai   = require 'chai'
expect = require('chai').expect
assert = require('chai').assert
should = require('chai').should()
sqlite = require('sqlite3').verbose()
shortid = require 'shortid'
chaiAsPromised = require 'chai-as-promised'

chai.use chaiAsPromised

# express app
express = require 'express'
app = express()

serverConfig = clientdbPath: './test/assets'

serverCache = require('../' + path.join config.paths.dest, 'cache', 'cache.js')
cache = new serverCache()

describe 'routeloader', () ->
  routeloader = { }
  beforeEach () ->
    routeloader = require('../' + path.join config.paths.dest, 'dbloader', './routeloader.js')(winston)
  it 'should load sqlite2', () ->
    promise = routeloader.loadRouteForFile app, serverConfig, 'test.sqlite3'
    return promise.should.be.fufilled
  it 'should not load other file', () ->
    promise = routeloader.loadRouteForFile app, serverConfig, 'test.tmp'
    return promise.should.be.rejected
  it 'invalid path should fail', () ->
    promise = routeloader.loadRouteForFile app, serverConfig, 'test-invalid-path.sqlite3'
    return promise.should.be.rejected
describe 'path cache', () ->
  routeloader = require('../' + path.join config.paths.dest, 'dbloader', './routeloader.js')(winston)
  beforeEach () ->
    promise = routeloader.loadRouteForFile app, cache, serverConfig, 'test.sqlite3'
  it 'should cached the path', () ->
    cache.pathCache.count().should.equal(2)
  it 'path cache should not be correct', () ->
    cache.pathCache.get('/testApp/admin').should.be.a('object')
    cache.pathCache.get('/testApp/users').should.be.a('object')
