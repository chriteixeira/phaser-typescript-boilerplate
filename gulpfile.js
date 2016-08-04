var gulp = require('gulp');
var ts = require('gulp-typescript');
var typescript = require('typescript');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var paths = {
	browsersync: {
		basedir: '.'
	},
	tscripts: {
		src: ['src/**/*.ts'],
		dest: 'build'
	},
	htmlfiles: {
		src: ['*.html']
	}
};

gulp.task('default', ['serve']);

gulp.task('compile-ts', function(){
    var tsProject = ts.createProject('tsconfig.json', {
		typescript: typescript
	});
    return gulp.src('./src/**/*.ts')
            .pipe(ts(tsProject))
            .pipe(sourcemaps.write('../maps', { includeContent: false, sourceRoot: '/scripts/src' }))
            .pipe(gulp.dest('./build'))
            .pipe(reload({stream:true}));
});

gulp.task('watch', function() {
	gulp.watch('./src/**/*.ts', ['compile-ts']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: paths.browsersync.basedir
        }
    });
});

gulp.task('serve', ['browser-sync'], function() {

	// watch html files - do a complete reload for all browsers
    gulp.watch(paths.htmlfiles.src).on('change', browserSync.reload);

    // Watch .ts files - inject changes
    gulp.watch(paths.tscripts.src, ['compile-ts']);
});