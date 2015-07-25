path = require 'path'

module.exports = (gulp, config) ->

  gulp.task 'server:fixtures', ->
    gulp.src ['fixtures/**'], base: './fixtures'
      .pipe gulp.dest path.join config.paths.dest, 'fixtures'
