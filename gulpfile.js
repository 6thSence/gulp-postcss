const assets = require('postcss-assets');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const reporter = require('postcss-browser-reporter');
const nested = require('postcss-nested');
const short = require('postcss-short');
const stylelint = require('stylelint');

const rulesStyles = require('./stylelintrc.json');

gulp.task('styles', function() {
    const processors = [
        nested,
        assets,
        short,
        stylelint(rulesStyles),
        autoprefixer,
        reporter({
            selector: 'body:before'
        })
    ];

    return gulp.src('./css/**/*.css')
        .pipe(postcss(processors))
        .pipe(concat('bundle.min.css'))
        .pipe(gulp.dest('./public'));
});

gulp.task('watch', function() {
    gulp.watch('./css/**/*.css', function() {
        gulp.run('styles');
    })
});

gulp.task('default', ['styles', 'watch']);
