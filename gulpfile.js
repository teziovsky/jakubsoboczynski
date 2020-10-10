const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");

exports.default = () =>
  gulp
    .src("dist/css")
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(gulp.dest("dist/css"));
