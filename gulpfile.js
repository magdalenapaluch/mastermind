// Add our dependencies
var gulp = require('gulp');
var concat = require('gulp-concat'); // Gulp File concatenation plugin
var open = require('gulp-open'); // Gulp browser opening plugin
var connect = require('gulp-connect'); // Gulp Web server runner plugin
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
const babel = require('gulp-babel');

// Configuration
var configuration = {
	paths: {
		src: {
			html: './src/*.html',
			css: [
				'./src/styles/style.scss'
			],
			js: './src/*.js'
		},
		dist: './dist'
	},
	localServer: {
		port: 8001,
		url: 'http://localhost:8001/'
	}
};

// Gulp task to copy HTML files to output directory
gulp.task('html', function () {
	return gulp.src(configuration.paths.src.html)
		.pipe(gulp.dest(configuration.paths.dist))
		.pipe(connect.reload());
});


// JavaScript Concat and Uglify
gulp.task('javascript', gulp.series(function () {
	return gulp.src(
			[
				'./node_modules/jquery/dist/jquery.min.js',
				configuration.paths.src.js
			]
		)
		.pipe(concat('main.min.js'))
		.pipe(babel({
			presets: [
				['@babel/env', {
					modules: false
				}]
			]
		}))
		.pipe(gulp.dest('dist/js'))

		// Uglify
		// .pipe(uglify())
		.pipe(gulp.dest('dist/js'))

		// Notify
		.pipe(notify({
			title: 'Gulp Task Completed',
			message: 'JavaScript has been compiled'
		}))

		// LiveReload
		.pipe(connect.reload());
}));

// SASS Compile and Autoprefixer
gulp.task('style', gulp.series(function () {
	return gulp.src(configuration.paths.src.css)
		// .pipe(plumber({errorHandle: onError}))
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		// .on('error', onError)
		.pipe(concat('site.css'))
		.pipe(gulp.dest(configuration.paths.dist + '/css'))
		// .pipe(gulp.dest('../'))

		// Autoprefixer
		// .pipe(autoprefixer({
		// 	browsers: ['last 5 versions'],
		// 	cascade: false
		// }))
		// .pipe(gulp.dest('../'))

		// Notify
		.pipe(notify({
			title: 'Gulp Task Completed',
			message: 'Styles have been compiled'
		}))

		// LiveReload
		.pipe(connect.reload());
}));

// Gulp task to create a web server
gulp.task('connect', function () {
	return connect.server({
		root: 'dist',
		port: configuration.localServer.port,
		livereload: true
	});
});

// Gulp task to open the default web browser
gulp.task('open', function () {
	return gulp.src('dist/index.html')
		.pipe(open({
			uri: configuration.localServer.url
		}));
});

// Watch the file system and reload the website automatically
gulp.task('watch', function () {
	// livereload.listen();
	gulp.watch(configuration.paths.src.html, gulp.series(['html']));
	gulp.watch(configuration.paths.src.css, gulp.series(['style']));
	gulp.watch(configuration.paths.src.js, gulp.series(['javascript']));
	connect.reload();
});

// Gulp default task
gulp.task('default', gulp.parallel('html', 'style', 'javascript', 'connect', 'open', 'watch'));