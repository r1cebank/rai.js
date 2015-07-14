path = require 'path'

module.exports = (gulp, config) ->

  gulp.task 'client', ->
    gulp.src ['client/**'], base: './client'
      .pipe gulp.dest path.join config.paths.dest, 'views'
