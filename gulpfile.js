/*a gulp file that is tacking all the files from folder css and concatinating them to one file main.css */
/* 
install commands before running!!!

npm install gulp -g
npm install gulp --save-dev
npm install gulp-concat --save-dev
npm install --save-dev gulp-uglyfly
npm install --save gulp-uglifycss
npm install -g browser-sync
npm install browser-sync --save-dev
npm install gulp-sass --save-dev

*/


/* declering variabels */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglifycss = require('gulp-uglifycss');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var sass = require('gulp-sass');
var watchSass = require("gulp-watch-sass")

/*concat and uglyfy css and js--------------- */

gulp.task('all', function() {
     gulp.src('*.css')
     .pipe(concat('main.css'))
     .pipe(uglifycss())
     .pipe(gulp.dest(''));

     gulp.src('*.js')
     .pipe(concat('main.js'))
     .pipe(uglifycss())
         .pipe(gulp.dest(''));
});



/*concat and uglyfy css------------------- */

gulp.task('css', function() {
    gulp.src('*.css')
     .pipe(concat('main.css'))
        .pipe(uglifycss())

        .pipe(gulp.dest(''));
});

/*concat and uglyfy JS--------------------- */

gulp.task('js', function() {
    gulp.src('*.js')
     .pipe(concat('main.js'))
        .pipe(uglifycss())
         .pipe(gulp.dest(''));
});

/*creating-a-local-web-server--------------------- */
/*basedir is the place of the index file */
/*after running browser-sync the browser will open and 
if you will direct to the correct index file your web will 
run http://localhost:3000/index1.html the correct index name*/

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(["*.html","dist/css/style.css","dist/js/sctipt.js"]).on("change", reload);
});

/*func-that-will-take-scss-files-and-convert-to-css-- */

gulp.task('sass', function () {
  gulp.src('*.scss')
  .pipe(sass())
    .pipe(gulp.dest('./css'));
});

/*-func-that is tacking all scss concat ugly and unify to on css-*/

gulp.task('to-sass', function () {
  gulp.src('*.scss')
  .pipe(sass())
     .pipe(concat('style.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('.'));

    
});

/*-tacking scss from folder scss concat ugly and unify to on css-*/

gulp.task('sass-2-css', function () {
  gulp.src('./comp/scss/*.scss')
  .pipe(sass())
  .pipe(concat('style.css'))
  .pipe(uglifycss())
  .pipe(gulp.dest('dist/css'));
  
});

/*concat and uglyfy JS--------------------- */

gulp.task('unify-js', function() {
    gulp.src('./comp/js/*.js')
    .pipe(concat('sctipt.js'))
    .pipe(uglifycss())
    .pipe(gulp.dest('dist/js'));
});

/*----a watch task that is watching folder-./comp/scss/*.scss for changes
and when we have a change calling task sass-2-css and converting to css
--------------*/
gulp.task("css-watch", function() {
  gulp.watch(["./comp/scss/*.scss"],["sass-2-css"]);
});

/*----a watch task that is watching folder-./comp/js/*.js.scss for changes
and when we have a change calling task unify-js and converting to css
--------------*/
gulp.task("js-watch", function() {
  gulp.watch(["./comp/js/*.js"],["unify-js"]);
});




