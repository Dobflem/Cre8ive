var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

var paths = {
  scripts: ['lib/raphael-2.2.0/*.js', 'src/javascripts/app.js', 'src/javascripts/**/*.js'] 
};

gulp.task('build', function() {

  return gulp.src(paths.scripts)
      .pipe(concat('app.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));

});

gulp.task('default', ['build']);
