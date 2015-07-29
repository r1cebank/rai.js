shell = require 'gulp-shell'

module.exports = (gulp, config) ->

  gulp.task 'server:doc', ->

    gulp.src ['.'], read: false
      .pipe shell ['docco server/**/*.coffee']
