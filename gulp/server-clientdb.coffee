path = require 'path'

module.exports = (gulp, config) ->

  gulp.task 'server:clientdb', ->
    gulp.src ['database/**'], base: './database'
      .pipe gulp.dest path.join config.paths.dest, 'clientdb'
