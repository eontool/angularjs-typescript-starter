let gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    babelify = require('babelify'),
    pump = require('pump');

const vendors = ['angular', 'jquery'];

gulp.task('build:vendor', () => {
    const b = browserify({
        debug: false
    });
    vendors.forEach(lib => {
        b.require(lib);
    });
    b.bundle()
        .pipe(source('vendor.js'))
        .pipe(gulp.dest('./public/js/'))
});

gulp.task('build:app', () => {
    return browserify('./build/app.js')
        .transform("babelify", { presets: ["es2015"] })
        .external(vendors)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('compress:vendor', ['build:vendor'], (cb) => {
    pump([
        gulp.src('./public/js/vendor.js'),
        uglify(),
        rename({ suffix: '.min' }),
        gulp.dest('./public/js/min/')
    ],
        cb
    );
});

gulp.task('compress:app', ['build:app'], (cb) => {
    pump([
        gulp.src('./public/js/app.js'),
        uglify(),
        rename({ suffix: '.min' }),
        gulp.dest('./public/js/min/')
    ],
        cb
    )
        .pipe(connect.reload());
});

gulp.task('html', () => {
    gulp.src('./public/index.html')
        .pipe(connect.reload());
});

gulp.task('watch', () => {
    gulp.watch(['./public/index.html'], ['html']);
    gulp.watch(['./build/**/*.js'], ['compress:app']);
});

gulp.task('connect', () => {
    connect.server({
        root: './public',
        livereload: true
    });
});

gulp.task('default', ['compress:vendor', 'compress:app', 'watch', 'connect']);