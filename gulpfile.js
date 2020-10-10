const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");

exports.default = () =>
  gulp
    .src("./dist/css/*.css")
    .pipe(autoprefixer())
    .pipe(gulp.dest("./dist/css/csss"));
