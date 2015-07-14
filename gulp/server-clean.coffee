module.exports = (gulp, config) ->

  gulp.task 'server:clean', ->

    clean = require 'del'

    clean(['dist'])
