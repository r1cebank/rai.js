path = require 'path'

module.exports = (gulp, config) ->

  gulp.task 'server:clientdb', ->
    gulp.src ['clientdb/**'], base: './clientdb'
      .pipe gulp.dest path.join config.paths.dest, 'clientdb'
