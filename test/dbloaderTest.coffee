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
winston.level = 'error'

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
queries = require('../' + path.join config.paths.dest, 'config', './queries.json')

describe 'dbloader', () ->
  dbloader = require('../' + path.join config.paths.dest, 'dbloader', './dbloader.js')(queries)
  it 'should load routes', () ->
    db = new sqlite.Database path.join serverConfig.clientdbPath, 'test.sqlite3'
    promise = dbloader.getRoutes db
    return promise.should.be.fulfilled
  it 'should fail if no info table', () ->
    db = new sqlite.Database path.join serverConfig.clientdbPath, 'test-no-info.sqlite3'
    promise = dbloader.getApplicationInfo db
    return promise.should.be.rejected
  it 'should not load other file', () ->
    db = new sqlite.Database path.join serverConfig.clientdbPath, 'test.tmp'
    promise = dbloader.getRoutes db
    return promise.should.be.rejected
