module.exports = (gulp, config) ->

  gulp.task 'default', ['server', 'client']

  gulp.task 'server', ['server:scripts', 'server:config', 'server:clientdb']

  gulp.task 'clean-all', ['server:clean-all']

  gulp.task 'watch', ['server:watch']

  gulp.task 'clean', ['server:clean']
