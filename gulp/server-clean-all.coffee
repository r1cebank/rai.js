module.exports = (gulp, config) ->

  gulp.task 'server:clean-all', ->

    del = require 'del'

    del(['dist', 'node_modules'])
