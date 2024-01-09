/* ==========================================================================
   Section comment block
   ========================================================================== */


/* Sub-section comment block
   ========================================================================== */

/**
 * Short description using Doxygen-style comment format
 *
 * The first sentence of the long description starts here and continues on this
 * line for a while finally concluding here at the end of this paragraph.
 *
 * The long description is ideal for more detailed explanations and
 * documentation. It can include example HTML, URLs, or any other information
 * that is deemed necessary or useful.
 *
 * @tag This is a tag named 'tag'
 *
 * TODO: This is a todo statement that describes an astomic task to be completed
 *   at a later date. It wraps after 80 characters and following lines are
 *   indented by 2 spaces.
 */


/* Basic comment */

// .bandeau-footer-body2021v2
var classParent = '.noel_article_2023';

const {
    series,
    src,
    dest,
    watch
} = require('gulp');

/* ==========================================================================
   PLUGING
   ========================================================================== */

/* PLUGIN FOR ALL 
   ========================================================================== */

/* for rename file in /dist */

// https://www.npmjs.com/package/gulp-rename
const rename = require('gulp-rename');
// https://www.npmjs.com/package/gulp-strip-comments
const strip = require('gulp-strip-comments');
// https://www.npmjs.com/package/gulp-file-include#include-options---type-json
const fileinclude = require('gulp-file-include');

/* PLUGIN FOR JS
   ========================================================================== */

/* babel for ES6 JS */
// https://www.npmjs.com/package/gulp-babel
const babel = require('gulp-babel');
/* mimify JS */
// https://www.npmjs.com/package/gulp-uglify
const uglify = require('gulp-uglify');
/* @Import  js file */
// https://www.npmjs.com/package/gulp-include
const include = require('gulp-include');


/* PLUGIN FOR HTML
   ========================================================================== */

/* remove HTML no necesary*/
// https://www.npmjs.com/package/gulp-remove-html
const gulpRemoveHtml = require('gulp-remove-html');
/* inject CSS in HTML */
// https://www.npmjs.com/package/gulp-style-inject
const styleInject = require('gulp-style-inject');
/* Inject JS in HTML */
// https://www.npmjs.com/package/gulp-inject-in-html
const injectJS = require('gulp-inject-in-html');

// https://www.npmjs.com/package/gulp-strip-comments
const htmlmin = require('htmlmin');



/* PLUGIN FOR CSS
   ========================================================================== */
/* can use SCSS */
// https://www.npmjs.com/package/gulp-sass
// https://www.npmjs.com/package/sass
const sass = require('gulp-sass')(require('sass'));
/* Import other file SCSS In master file (main.scss)*/
//https://www.npmjs.com/package/gulp-sass-glob
const sassGlob = require('gulp-sass-glob');
/* mimify CSS*/
//https://www.npmjs.com/package/gulp-csso
const csso = require('gulp-csso');
/*prefixer for every browser*/
// https://www.npmjs.com/package/gulp-autoprefixer
const autoprefixer = require('gulp-autoprefixer');

// https://www.npmjs.com/package/gulp-purgecss
const purgecss = require('gulp-purgecss'); // Remove Unused CSS from Styles
// https://www.npmjs.com/package/gulp-clean-css
const cleanCSS = require('gulp-clean-css'); //To Minify CSS files

const clean = require('gulp-clean');
const gulp = require('gulp');

function cleanFolder(cb) {
    return src('dist/html', {
            allowEmpty: true
        })
        .pipe(clean());
    cb()
}

// https://www.npmjs.com/package/gulp-group-css-media-queries
const gcmq = require('gulp-group-css-media-queries');

// https://www.npmjs.com/package/gulp-postcss
const postcss = require("gulp-postcss");

// https://www.npmjs.com/package/postcss-parent-selector
const parentSelector = require("postcss-parent-selector");

// https://www.npmjs.com/package/gulp-debug
var debug = require('gulp-debug');

/* ==========================================================================
   TASK
   ========================================================================== */

/* TASK FOR JS
   ========================================================================== */
function javascript(cb) {
    return src('src/js/main.js')
        .pipe(include())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(strip())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('dist/js/'))
    cb()
}

/* TASK FOR CSS
   ========================================================================== */
function scss(cb) {
    var processors = [
        parentSelector({
            selector: classParent
        })
    ];
    return src('src/scss/main.scss')
        .pipe(sassGlob())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gcmq())
        .pipe(postcss(processors))
        .pipe(autoprefixer())
        .pipe(csso({
            sourceMap: true,
            debug: true
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('dist/css/'))
    cb()
}

/* TASK FOR HTML
   ========================================================================== */
function html(cb) {
    return src('src/html/**/*.prod.html')
        .pipe(gulpRemoveHtml())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(injectJS())
        .pipe(rename({
            dirname: "",
            extname: '.min.html'
        }))
        .pipe(dest('dist/html'))
    cb()
}

/* TASK FOR Inject CSS
   ========================================================================== */
function injectCSS(cb) {
    return src('dist/html/*.prod.min.html')
        .pipe(styleInject())
        .pipe(strip())
        /* Commenter ici pour compresser le html*/
        // .pipe(htmlmin({
        //     collapseWhitespace: true
        // }))
        /* fin */
        .pipe(dest('dist/html'))
    cb()
}

/* TASK FOR PURGE
   ========================================================================== */
function purge(cb) {
    return src('dist/css/main.min.css')
        .pipe(debug())
        .pipe(
            purgecss({
                content: ['dist/html/*.prod.min.html']
            })
        )
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(dest('dist/css/'))
    cb()
}

/* ==========================================================================
   GULP PROD
   ========================================================================== */

exports.prod = function() {
    // watch change in scss file and execute compilation
    watch('src/scss/**/*.scss', series(cleanFolder, javascript, scss, html, purge, injectCSS))
        // watch change in html file and execute compilation
    watch('src/html/**/*.html', series(cleanFolder, javascript, scss, html, purge, injectCSS))
        // watcj change un js file and execute compilation
    watch('src/js/**/*.js', series(cleanFolder, javascript, scss, html, purge, injectCSS))
}