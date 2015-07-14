# Main build script
_         = require 'lodash'
fs        = require 'fs'
gulp      = require 'gulp'
load      = require 'require-dir'
yaml      = require 'yamljs'

# Enable coffee-script compiler
coffee    = require 'coffee-script/register'

# CLI Arguments
argv      = require('yargs')
  .alias('t', 'target')
  .default('t', 'development')
  .argv

# Config Object
config    = yaml.parse fs.readFileSync './targets.yml', 'utf8'
config    = _.extend config.default, config[argv.target]

# Load tasks
register(gulp, config) for name, register of load('gulp')
