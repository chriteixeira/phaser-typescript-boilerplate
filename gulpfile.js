var gulp = require('gulp');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var typescript = require('typescript');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

const SOURCE_FOLDER = './src';
const BUILD_FOLDER = './build';
const ASSETS_FOLDER = './assets';
const PHASER_PATH = './node_modules/phaser/build/phaser.js';

// Clear the build folder
gulp.task('clean', function(){
    gulp.src(BUILD_FOLDER, {force: true})
        .pipe(clean());
});

// Copy all the assets to the build folder
gulp.task('copyAssets', function(){
    gulp.src(ASSETS_FOLDER+'/**/*.*').pipe(
        gulp.dest(BUILD_FOLDER));
});

// Copy phaser dependencies to the build folder
gulp.task('copyPhaser', function(){
    gulp.src(PHASER_PATH).pipe(
        gulp.dest(BUILD_FOLDER+'/js'));
});

// Compile the typescript files under the source folders. The compilation will be based on the tsconfig.json
gulp.task('compile', function () {
    var tsProject = ts.createProject('tsconfig.json', {
        typescript: typescript
    });
    return gulp.src(SOURCE_FOLDER+'/**/*.ts')
        .pipe(ts(tsProject))
        .pipe(sourcemaps.write('../maps', { includeContent: false, sourceRoot: '/scripts/src' }))
        .pipe(gulp.dest(BUILD_FOLDER+'/js'))
        .pipe(reload({ stream: true }));
});

// Watch for TS changes and compile it again
gulp.task('watch-ts',['compile'], function () {
    browserSync.reload();
});

//Watch for assets cahnges and copy it again to the build folder
gulp.task('watch-assets',['copyAssets'], function () {
    browserSync.reload();
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: BUILD_FOLDER+'/'
        }
    });
    gulp.watch(SOURCE_FOLDER+'/**/*.ts', ['watch-ts']);
    gulp.watch(ASSETS_FOLDER+'/**/*.*', ['watch-assets']);
});

gulp.task('copy', ['copyPhaser','copyAssets']);
gulp.task('build', ['copy','compile']);
