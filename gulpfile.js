const { src, dest, watch, parallel, series } = require('gulp')

const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const browserSync = require('browser-sync').create()
const clean = require('gulp-clean')


function styles() {
    return src('app/css/style.css')
        .pipe(concat('style.min.css'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src('app/js/main.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function browsersync(){
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    })
}

function watching() {
    watch(['app/css/style.css'], styles)
    watch(['app/js/main.js'], scripts)
    watch(['app/*.html']).on('change', browserSync.reload)
}

function cleaning() {
    return src('dist', {allowEmpty: true})
    .pipe(clean())
}

function building() {
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/index.html'
    ], {base: 'app'})
    .pipe(dest('./dist'))
}

exports.styles = styles
exports.scripts = scripts
exports.browsersync = browsersync
exports.watching = watching
exports.build = series(cleaning, building)

exports.default = parallel(styles, scripts, browsersync, watching)
