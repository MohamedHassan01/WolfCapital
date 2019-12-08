const gulp = require('gulp'),
    concat = require('gulp-concat'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    minify = require('gulp-minify'),
    livereload = require('gulp-livereload');

// Paths
let htmlPath = ['./project/html/*.pug'],
    cssPath = ['./project/css/**/*.scss', './project/css/**/*.css'],
    jsPath = ['./project/js/*.js'];

// HTML
gulp.task('html', () => {
    return gulp.src(htmlPath)
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./dist'))
        .pipe(livereload());
});

// CSS
gulp.task('css', () => {
    return gulp.src(cssPath)
        .pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
        .pipe(prefix('last 2 versions'))
        .pipe(concat('master-min.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(livereload());
});

// JS
gulp.task('js', () => {
    return gulp.src(jsPath)
        .pipe(concat('app.js'))
        .pipe(minify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(livereload());
});

// Watch
gulp.task('watch', () => {
    require('./server');
    livereload.listen();
    gulp.watch('./project/html/**/*.pug', gulp.series('html'));
    gulp.watch(cssPath, gulp.series('css'));
    gulp.watch(jsPath, gulp.series('js'));
});
