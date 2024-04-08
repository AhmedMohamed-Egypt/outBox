var path = require('gulp-path');
const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
concat = require("gulp-concat");
prefix = require("gulp-autoprefixer");
var handlebars = require("gulp-compile-handlebars");
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create();
const markdown = require('gulp-markdown');
var sourcemaps = require('gulp-sourcemaps');



gulp.task('mrkdown',()=>{
  return gulp
  	.src('project/hb/services/**/*.md')
    .pipe(markdown())
    .pipe(gulp.dest("project/hb/partials/services-files"))
})
gulp.task("comp-sass", () => {
  return gulp
    .src("project/css/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefix("last 2 versions"))
    .pipe(concat("style.css"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("default", function () {
  var templateData = {
      firstName: "",
      pageName: path.basename,
      mail:"request@obox.systems"
    },
    options = {
      ignorePartials: false,
      partials: {
        
      },
      batch: ["project/hb/partials"],
      helpers: {
        capitals: function (str) {
          return str.toUpperCase();
        },
      },
    };

  return gulp
    .src("project/hb/*.handlebars")
    .pipe(handlebars(templateData, options))
    .pipe(
      rename(function (path) {
      
        return {
          dirname: path.dirname,
          basename: path.basename,
          extname: ".html",
        };
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  
  
  browserSync.init({
    server: {
        baseDir: "./dist/",
        serveStaticOptions: {
          extensions: ["html"]
      },
      
    },
    browser: "chrome",
    
    single:true,
    
    reloadOnRestart: false,
    files:'./dist/about.html'
});
  gulp.watch("project/css/**/*.scss", gulp.series("comp-sass"));
  gulp.watch(["project/hb/**/*.handlebars","project/hb/**/*.html"], gulp.series("default"));
  gulp.watch("project/hb/services/**/*.md", gulp.series("mrkdown"));
},(done)=>{
  
  browserSync.reload();
  done();
  
});
