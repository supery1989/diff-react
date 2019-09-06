var gulp = require('gulp')
var babel = require('gulp-babel')
var replace = require('gulp-replace')
var scss = require('gulp-sass')
var copy = require('gulp-copy')
var del = require('del')

var jsRule = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          "browsers": ["last 2 versions", "ie >= 7"]
        }
      },
    ],
    [
      "@babel/preset-react",
    ],
    [
      "@babel/preset-typescript",
    ]
  ],
  plugins: [
    require("@babel/plugin-syntax-dynamic-import"),
    [require("@babel/plugin-proposal-decorators"), { "legacy": true }],
    [require("@babel/plugin-proposal-class-properties"), { "loose": false }],
  ]
}

gulp.task('compline_js', function(){
  return gulp.src('../components/**/*.tsx')
    .pipe(babel(jsRule))
    .pipe(replace(/.scss/gi,'.css'))
    .pipe(gulp.dest('../dest/components'))
})

gulp.task('compline_js2', function(){
  return gulp.src('../libs/**/*.tsx')
    .pipe(babel(jsRule))
    .pipe(replace(/.scss/gi,'.css'))
    .pipe(gulp.dest('../dest/libs'))
})

gulp.task('compline_js3', function(){
  return gulp.src('../index.tsx')
    .pipe(babel(jsRule))
    .pipe(replace(/.scss/gi,'.css'))
    .pipe(gulp.dest('../dest'))
})

gulp.task('compline_css', function() {
  return gulp.src('../components/**/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('../dest/components'))
})

gulp.task('compline_css2', function() {
  return gulp.src('../libs/**/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('../dest/libs'))
})

gulp.task('copy', function() {
  return gulp.src('../components/icon/font/**')
    .pipe(copy('../dest/components'))
})

gulp.task('copy_doc', function() {
  return gulp.src('npm/**')
    .pipe(gulp.dest('../dest/'))
})

gulp.task('clean', function(cbf) {
  del(['../dest'], { force: true }, cbf)
})

// gulp.task('default', ['copy_doc'])
gulp.task('default', ['clean', 'compline_js', 'compline_js2', 'compline_js3', 'compline_css', 'compline_css2', 'copy', 'copy_doc'])