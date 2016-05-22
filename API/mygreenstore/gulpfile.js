var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function() {
	nodemon({
		script: 'backend/app.js',
		ext: '*.js *.json',
		env: { 'ready': false } ,
		ignore: ['node_modules', 'frontend/libs'],
		delay: 500,
	});
});

gulp.task('default', ['nodemon']);
