module.exports = (gulp, config) ->

  gulp.task 'server:watch', ->

    lint       = require 'gulp-coffeelint'
    plumber    = require 'gulp-plumber'
    watch      = require 'gulp-watch'

    gulp.src ['server/**/*.coffee'], base: './server'

      # Watch
      .pipe watch 'server/**/*.coffee', verbose: no

      # Lint
      .pipe plumber()
      .pipe lint()
      .pipe lint.reporter()
