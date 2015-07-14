module.exports = (gulp, config) ->

  gulp.task 'server:scripts', ->

    lint       = require 'gulp-coffeelint'
    coffee     = require 'gulp-coffee'
    gulpif     = require 'gulp-if'
    sourcemaps = require 'gulp-sourcemaps'

    gulp.src ['server/**/*.coffee'], base: './server'

      # Lint
      .pipe lint()
      .pipe lint.reporter()

      # Start by compiling .coffee files
      .pipe sourcemaps.init()
      .pipe coffee()

      # Write out needs minify
      .pipe gulpif config.sourcemaps, sourcemaps.write('./')
      .pipe gulp.dest config.paths.dest
