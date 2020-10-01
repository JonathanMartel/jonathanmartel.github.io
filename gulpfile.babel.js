import gulp         from 'gulp';
import gutil         from 'gulp-util';
import concat       from 'gulp-concat';
import header       from 'gulp-header';
import plumber      from 'gulp-plumber';
import babel        from 'gulp-babel';
import uglify       from 'gulp-uglify';
import addsrc       from 'gulp-add-src';
import sass         from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import browserSync  from 'browser-sync';
import child        from 'child_process';
import hygienist    from 'hygienist-middleware';
import del          from 'del';
import fs           from 'fs';
import spawn        from 'cross-spawn';
import runSequence  from 'gulp4-run-sequence';

// const parsed = JSON.parse(fs.readFileSync('./package.json'));
// const siteRoot = '_site';

browserSync.create();

const jekyllLogger = buffer => {
   buffer.toString().split(/\n/).forEach((message) => gutil.log(`Jekyll: ${message}`));
};
const isWin = /^win/.test(process.platform);
const paths = {
  scssFiles : '_css/**/*.?(s)css',
  cssDist: 'css',
  siteDir : '_site',
  scripts: {
    src : '_scripts/*.js',
    libs : [
           'node_modules/linkjuice/dist/linkjuice.js'
         ],
    dist: 'js/'
  },
  jekyllDir: './',
}




const banner = (
   `/*! test ${new Date().getFullYear()} */\n`
 );

// const paths = {
//   scripts: '_scripts/*.js',
//   libs: [
//     'node_modules/linkjuice/dist/linkjuice.js'
//   ],
//   dist: 'js/'
// };

// browserSync.create();

// gulp.task('clean', fn => del([paths.dist, siteRoot, ""], fn));

// gulp.task('css', () => {
//   gulp.src(cssFiles)
//     .pipe(sass())
//     .pipe(concat('main.css'))
//     .pipe(gulp.dest('css'));
// });


// gulp.task('scripts', gulp.series('clean', () => {
//   return gulp.src(paths.scripts)
//     .pipe(plumber())
//     .pipe(babel())
//     .pipe(addsrc.prepend(paths.libs))
//     .pipe(concat('bundle.min.js'))
//     .pipe(uglify())
//     .pipe(header(banner, {
//       parsed
//     }))
//     .pipe(gulp.dest(paths.dist));
// }));

// gulp.task('jekyll', () => {
//   //const jekyll = child.spawn(isWin ? 'jekyll.bat' : 'jekyll', ['serve', '--watch', '--incremental', '--drafts']);
//   const jekyll = child.spawn(isWin ? 'jekyll.bat' : 'jekyll', ['serve', '--watch', '--drafts']);
//   jekyll.stdout.on('data', jekyllLogger);
//   jekyll.stderr.on('data', jekyllLogger);
// });

// gulp.task('serve', () => {
//   browserSync.init({
//     files: [`${siteRoot}/**`],
//     port: 4000,
//     server: {
//       baseDir: siteRoot,
//       middleware: hygienist(siteRoot)
//     }
//   });
// });


// gulp.task('watch', gulp.series(() => {
//   gulp.watch(paths.scripts, gulp.series('scripts'));
//   gulp.watch(cssFiles, gulp.series('css'));
// }));

// //gulp.task('default', gulp.series(gulp.parallel('scripts', 'css', 'serve', 'jekyll', 'watch')));
// //gulp.task('default', gulp.series(gulp.parallel('scripts', 'css', 'serve', 'jekyll')));

// Static Server + watching files
// WARNING: passing anything besides hard-coded literal paths with globs doesn't
//          seem to work with the gulp.watch()


// Uses Sass compiler to process styles, adds vendor prefixes, minifies,
// and then outputs file to appropriate location(s)
/*gulp.task('build:styles', () => {
  gulp.src(paths.scssFiles)
    .pipe(sass())
    style: 'compressed',
    trace: true // outputs better errors
  }).pipe(concat('main.css'))
  .pipe(gulp.dest('css'));
    //.pipe(browserSync.stream())
});*/

gulp.task('build:clean', fn => del([paths.siteDir, paths.cssDist, ""], fn));

gulp.task('build:styles', () => {
  return gulp.src(paths.scssFiles)
      .pipe(sass({
        style: 'compressed',
        trace: true // outputs better errors
      }).on('error', sass.logError))
      .pipe(gulp.dest('./css/'));
});


gulp.task('build:scripts', () => {
    return gulp.src(paths.scripts.src)
      .pipe(plumber())
      .pipe(babel())
      .pipe(addsrc.prepend(paths.scripts.libs))
      .pipe(concat('bundle.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(paths.scripts.dist));
  });

gulp.task('build:jekyll', () => {
  //const jekyll = child.spawn(isWin ? 'jekyll.bat' : 'jekyll', ['serve', '--watch', '--incremental', '--drafts']);
  //const jekyll = child.spawn(isWin ? 'jekyll.bat' : 'jekyll', ['--watch', '--drafts']);
  //const jekyll = child.spawn(isWin ? 'jekyll.bat' : 'jekyll', ['serve', '--watch', '--incremental', '--drafts']);
  //jekyll.stdout.on('data', jekyllLogger);
  //jekyll.stderr.on('data', jekyllLogger);
  return spawn('jekyll.bat', ['build','--drafts', '--incremental'], {stdio: 'inherit'});
});

gulp.task('build', function(cb) {
  runSequence(['build:scripts', 'build:styles'],
              'build:jekyll',
              cb);
});

gulp.task('build:watch',gulp.series( ['build']), function(cb) {
  //browserSync.reload();
  cb();
});

// Static Server + watching files
// WARNING: passing anything besides hard-coded literal paths with globs doesn't
//          seem to work with the gulp.watch()
gulp.task('serve', function(cb) {

  browserSync.init({
    files: [`${paths.siteDir}/**`],
    port: 4000,
    server:  {
             baseDir: paths.siteDir,
             middleware: hygienist(paths.siteDir)
    },
    ghostMode: false, // do not mirror clicks, reloads, etc. (performance optimization)
    logFileChanges: true,
    open: false       // do not open the browser (annoying)
  });

  // Watch site settings
  gulp.watch(['_config.yml', '!_site/**/*.*'], gulp.series(['build:watch']));

  // Watch app .scss files, changes are piped to browserSync
  gulp.watch(['_sass/**/*.scss','!_site/**/*.*'], gulp.series(['build:watch']));

  // Watch app .js files
  gulp.watch(['_scripts/**/*.js', '!_site/**/*.*'], gulp.series(['build:watch']));

  // Watch Jekyll posts
  gulp.watch(['_posts/**/*.+(md|markdown|MD)', '!_site/**/*.*'], gulp.series(['build:watch']));

  // Watch Jekyll drafts if --drafts flag was passed
  
  gulp.watch(['_drafts/*.+(md|markdown|MD)','!_site/**/*.*'], gulp.series(['build:watch']));
  

  // Watch Jekyll html files
  gulp.watch(['**/*.html', '!_site/**/*.*'], gulp.series(['build:watch']));
  
  gulp.watch(['./**/*.+(md|markdown|MD)','!_site/**/*.*'], gulp.series(['build:watch']));

  // Watch Jekyll data files
  gulp.watch(['_data/**.*+(yml|yaml|csv|json)', '!_site/**/*.*'], gulp.series(['build:watch']));
  cb();
});



gulp.task('default', gulp.series(['build:clean','build','serve']));