path = require 'path'

module.exports = (gulp, config) ->

  gulp.task 'server:config', ->

    gulp.src ['config/**/*.json'], base: './config'
      .pipe gulp.dest path.join config.paths.dest, 'config'
