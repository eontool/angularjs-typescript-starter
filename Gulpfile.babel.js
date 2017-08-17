import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import concat from 'gulp-concat';
import concatCss from 'gulp-concat-css';
import connect from 'gulp-connect';
import del from 'del';
import dotenv from 'dotenv';
import gulp from 'gulp';
import inject from 'gulp-inject';
import open from 'gulp-open';
import pump from 'pump';
import rename from 'gulp-rename';
import reporter from 'cucumber-html-reporter';
import series from 'stream-series';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps'
import { Linter } from 'tslint';
import templateCache from 'gulp-angular-templatecache'
import tslintGulp from 'gulp-tslint';
import typescript from 'gulp-typescript';
import uglify from 'gulp-uglify';

const protractor = require(`gulp-protractor`).protractor;

dotenv.config();

gulp.task(`clean`, () => {

  return del([ `./compiled`, `./coverage`, `./public` ]);

});

gulp.task(`tslint`, () => {

  const program = Linter.createProgram(`./tsconfig.json`);
  return gulp.src(`app/source/**/*.ts`)
    .pipe(tslintGulp({
      configuration: `tslint.json`,
      formatter: `verbose`,
      program: program,
    }))
    .pipe(tslintGulp.report({
      emitError: false,
    }));

});

gulp.task(`index`, () => {

  return gulp.src(`app/source/index.html`)
    .pipe(gulp.dest(`public/`))
    .pipe(connect.reload());

});

/**
 * Bundle all html files into a module
 */
gulp.task(`templates`, () => {

  return gulp
    .src([
      `app/source/components/**/*.template.html`
    ])
    .pipe(templateCache(
      `templates.js`, {
        module: `templates`,
        standalone: true,
        moduleSystem: `IIFE`
      }
    ))
    .pipe(gulp.dest(`./public/js/`))
    .pipe(connect.reload());

});


gulp.task(`build:app`, () => {

  const DEV = true;
  const external = [
    `angular`,
    `jquery`
  ];
  return browserify({
    entries: `./compiled/source/app.js`,
    debug: DEV,
    ignore: external
  })
    .external(external)
    .bundle()
    .pipe(source(`app.js`))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: DEV
    }))
    .pipe(sourcemaps.write({
      includeContent: DEV,
    }))
    .pipe(gulp.dest(`./public/js/`))
    .pipe(connect.reload());

});

gulp.task(`run`, () => {

  connect.server({
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
    debug: true,
    root: [ `./public/` ],
    livereload: true
  });
  const options = {
    uri: process.env.SERVER_HOST + `:` + process.env.SERVER_PORT,
    app: process.env.OS_BROWSER_PATH
  };
  return gulp.src(`./`)
    .pipe(open(options));

});

gulp.task(`protractor`, () => {

  return gulp.src([ `./app/test/e2e/tmp/features/*.feature` ])
    .pipe(protractor({
      configFile: `./app/test/e2e/tmp/protractor.config.js`,
      args: [],
    }));

});

gulp.task(`build:vendor`, () => {

  return gulp.src([
    `node_modules/jquery/dist/jquery.js`,
    `node_modules/angular/angular.js`,
    `node_modules/angular-sanitize/angular-sanitize.js`,
    `node_modules/tether/dist/js/tether.js`,
    `node_modules/bootstrap/dist/js/bootstrap.js`,
  ])
    .pipe(concat(`vendor.js`))
    .pipe(gulp.dest(`./public/js/`));

});

gulp.task(`compress:vendor`, () => {

  return pump([
    gulp.src(`./public/js/vendor.js`),
    uglify(),
    rename({
      suffix: `.min`
    }),
    gulp.dest(`./public/js/`)
  ])
    .pipe(connect.reload());

});

gulp.task(`compress:app`, () => {

  return pump([
    gulp.src(`./public/js/app.js`),
    uglify(),
    rename({
      suffix: `.min`
    }),
    gulp.dest(`./public/js/`)
  ])
    .pipe(connect.reload());

});

gulp.task(`inject`, () => {

  const target = gulp.src(`./app/source/index.html`);
  const vendor = gulp.src([ `./public/js/vendor.js` ], {
    read: false
  });
  const app = gulp.src([ `./public/js/app.js` ], {
    read: false
  });
  const templates = gulp.src([ `./public/js/templates.js` ], {
    read: false
  });
  return target.pipe(inject(series(vendor, app, templates), {
    removeTags: true,
    relative: false,
    addRootSlash: false,
    ignorePath: `/public/`,
  }))
    .pipe(gulp.dest(`./public/`));

});

gulp.task(`watch`, () => {

  gulp.watch(`./app/source/index.html`, gulp.series([ `index`, `inject` ]));
  gulp.watch(`./app/source/**/*.template.html`, gulp.series(`templates`));
  gulp.watch(`./app/source/**/*.ts`, gulp.series(`tslint`, `compile`, `build:app`));

});

gulp.task(`compile`, () => {

  const tsProject = typescript.createProject(`tsconfig.json`, {
    inlineSourceMap:true
  });
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(buffer())
    .pipe(sourcemaps.write({
      sourceRoot: `/app/source`,
    }))
    .pipe(gulp.dest(`compiled`));

});

gulp.task(`css:vendor`, () => {

  return gulp.src([
    `node_modules/bootstrap/dist/css/bootstrap.css`,
    `node_modules/tether/dist/css/tether.css`,
  ])
    .pipe(concatCss(`vendor.css`))
    .pipe(gulp.dest(`./public/css/`));

});

gulp.task(`css:app`, () => {

  return gulp.src([
    `./app/source/assets/css/**/*.css`
  ])
    .pipe(concatCss(`app.css`))
    .pipe(gulp.dest(`./public/css/`));

});

gulp.task(`build:all`, gulp.series([
  `build:vendor`,
  `build:app`,
  `templates`,
]));

gulp.task(`compress:all`, gulp.series([
  `compress:vendor`,
  `compress:app`,
]));

gulp.task(`default`, gulp.series([
  `clean`,
  `tslint`,
  `compile`,
  `build:all`,
  `inject`,
  `compress:all`,
  `css:vendor`,
  `css:app`,
  `run`,
  `watch`
]));

gulp.task(`reports`, () => {


  const options = {
    brandTitle:`e2e Report`,
    theme: `bootstrap`,
    jsonFile: `./reports/e2e/results.json`,
    output: `./reports/e2e/results.html`,
    reportSuiteAsScenarios: true,
    launchReport: true,
    storeScreenshots: false,
    metadata: {
      "App Version": `0.0.1`,
      "Test Environment": `Development`,
      "Browser": `Chrome  56.0.2924.`,
      "Platform": `OSX`,
      "Parallel": `Scenarios`,
      "Executed": `Remote`
    }
  };

  return reporter.generate(options);

});
