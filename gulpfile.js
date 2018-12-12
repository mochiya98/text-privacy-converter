const uglifyes = require("uglify-es");
const merge = require("merge-stream");
const { highlight } = require("highlight.js");
const packageJSON = require("./package.json");

const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify/composer")(uglifyes, console);
const ejs = require("gulp-ejs");
const purify = require("gulp-purifycss");
const cssnano = require("gulp-cssnano");
const concat = require("gulp-concat");
const htmlmin = require("gulp-htmlmin");

const build_umd = () =>
  gulp
    .src("src/!(*.spec).{js,mjs}")
    .pipe(
      babel({
        presets: ["@babel/env"],
        plugins: ["babel-plugin-transform-modules-iife"]
      })
    )
    .pipe(uglify({ toplevel: true }))
    .pipe(gulp.dest("dist/umd"));

const build_esm = () =>
  gulp
    .src("src/!(*.spec).{js,mjs}")
    .pipe(uglify({ toplevel: true }))
    .pipe(gulp.dest("dist/esm"));

const build_dts = () =>
  gulp
    .src("src/*.d.ts")
    //.pipe(uglify())
    .pipe(gulp.dest("dist"));

const copy2docs = () =>
  gulp
    .src("dist/umd/*.{js,mjs}")
    .pipe(gulp.dest("docs/js/text-privacy-converter"));

const build_docs_js = () =>
  gulp
    .src("docs_src/**/*.js")
    .pipe(babel())
    .pipe(uglify({ toplevel: true, output: { comments: /^!/ } }))
    .pipe(gulp.dest("docs"));

const build_docs_ejs = () =>
  gulp
    .src("docs_src/**/*.ejs")
    .pipe(ejs({ highlight, package: packageJSON }, {}, { ext: ".html" }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("docs"));
const build_docs_css = () =>
  gulp
    .src("docs_src/css/**/*.css")
    .pipe(purify(["./docs/**/*.html"]))
    .pipe(concat("bundle.css"))
    .pipe(cssnano())
    .pipe(gulp.dest("docs/css"));

gulp.task("build_umd", build_umd);
gulp.task("build_esm", build_esm);
gulp.task("build_dts", build_dts);
gulp.task("build", () => merge([build_umd(), build_esm(), build_dts()]));
gulp.task("build_docs", cb => {
  merge([copy2docs(), build_docs_js(), build_docs_ejs()]).on("finish", () => {
    build_docs_css().on("end", () => cb());
  });
});
