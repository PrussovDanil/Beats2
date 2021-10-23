const { src, dest, task, series, parallel} = require("gulp");
var rm = require( 'gulp-rm' )
var sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const { watch } = require("browser-sync");
const browserSync = require('browser-sync').create();
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const pxToRem = require('gulp-px2rem-converter');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const uglify = require('gulp-uglify');
const reload = browserSync.reload;


const { DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS} = require('./gulp.config');

 
task('copy:html',()=> {
   return src(`${SRC_PATH}/*.html`)
   .pipe(dest(DIST_PATH))
   .pipe(reload({stream:true}))
});

task( "clean", () => {
  return src( `${DIST_PATH}/**/*`, { read: false })
    .pipe( rm() );
});

const styles = [
  'node_modules/normalize.css/normalize.css',
  'src/css/main.scss'
 ];

task('styles',()=> {
  return src(styles)
  .pipe(gulpif(env === "dev",sourcemaps.init()))
  .pipe(concat('main.min.scss'))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  // .pipe(px2rem())
  .pipe(pxToRem())
  .pipe(gulpif(env === "dev",autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  })))
  .pipe(gulpif(env === "prod",gcmq()))
  .pipe(gulpif(env === "prod",cleanCSS()))///min
  .pipe(gulpif(env === "dev",sourcemaps.write()))
  .pipe(dest(DIST_PATH));
});

task("video", () => {
  return src(`${SRC_PATH}/video/videoplayback.mp4`)
      .pipe(dest(`${DIST_PATH}/video`))
      .pipe(reload({stream: true}));
});

task("images", () => {
  return src(`${SRC_PATH}/img/*.*`)
      .pipe(dest(`${DIST_PATH}/img/`))
      .pipe(reload({stream: true}));
});

task("icon", () => {
  return src(`${SRC_PATH}/icon/*.*`)
      .pipe(dest(`${DIST_PATH}/icon/`))
      .pipe(reload({stream: true}));
});


task("js", () => {
  return src(`${SRC_PATH}/js/*.js`)
      .pipe(gulpif(env === "dev",sourcemaps.init()))
      .pipe(concat('main.min.js'))
      .pipe(gulpif(env === "dev",uglify()))
      .pipe(gulpif(env === "dev",sourcemaps.write()))
      .pipe(dest(`${DIST_PATH}/js/`))
      
});


task('server', () => {
  browserSync.init({
     server: {
         baseDir: "./dist"
     },
     open:false
 });
});
 

watch('./`${SRC_PATH}/css/**/*.scss', series("styles"));
watch('./`${SRC_PATH}/*.html', series("copy:html"));
watch('./`${SRC_PATH}/js/*.js', series("js"));


task('default',
 series('clean', parallel('copy:html','styles',"icon","images","video","js"),'server'));