import gulp         from 'gulp';
import util         from 'gulp-util';
import concat       from 'gulp-concat';
import header       from 'gulp-header';
import plumber      from 'gulp-plumber';
import babel        from 'gulp-babel';
import uglify       from 'gulp-uglify';
import addsrc       from 'gulp-add-src';
import autoprefixer from 'gulp-autoprefixer';
import browserSync  from 'browser-sync';
import child        from 'child_process';
import hygienist    from 'hygienist-middleware';
import del          from 'del';
import fs           from 'fs';

const parsed = JSON.parse(fs.readFileSync('./package.json'));
const siteRoot = '_site';
const jekyllLogger = buffer => {
  buffer.toString().split(/\n/).forEach((message) => util.log(`Jekyll: ${message}`));
};
const isWin = /^win/.test(process.platform);

const banner = (
  `/*! toddmotto.com | Todd Motto (c) ${new Date().getFullYear()} */\n`
);

const paths = {
  scripts: '_scripts/*.js',
  libs: [
    'node_modules/linkjuice/dist/linkjuice.js'
  ],
  dist: 'js/'
};

browserSync.create();

gulp.task('clean', fn => del([paths.dist, siteRoot], fn));

gulp.task('scripts', ['clean'], () => {
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(babel())
    .pipe(addsrc.prepend(paths.libs))
    .pipe(concat('bundle.min.js'))
    .pipe(uglify())
    .pipe(header(banner, {
      parsed
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('jekyll', () => {
  const jekyll = child.spawn(isWin ? 'jekyll.bat' : 'jekyll', ['serve', '--watch', '--incremental', '--drafts']);
  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', () => {
  browserSync.init({
    files: [`${siteRoot}/**`],
    port: 4000,
    server: {
      baseDir: siteRoot,
      middleware: hygienist(siteRoot)
    }
  });
});


gulp.task('watch', () => {
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['scripts', 'serve', 'jekyll', 'watch']);
