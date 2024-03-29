const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function buildStyles() {
  return src("index.scss").pipe(sass()).pipe(dest("src"));
}

function buildProfileStyles() {
  return src("./pages_sass/profile.module.scss")
    .pipe(sass())
    .pipe(dest("src/pages_styles"));
}

function buildChatStyles() {
  return src("./pages_sass/chat.module.scss")
    .pipe(sass())
    .pipe(dest("src/pages_styles"));
}

function buildSettingsStyles() {
  return src("./pages_sass/settings.module.scss")
    .pipe(sass())
    .pipe(dest("src/pages_styles"));
}

function watchTask() {
  watch(
    [
      "index.scss",
      "./pages_sass/profile.module.scss",
      "./pages_sass/chat.module.scss",
      "./pages_sass/settings.module.scss",
    ],
    series(
      buildStyles,
      buildProfileStyles,
      buildChatStyles,
      buildSettingsStyles
    )
  );
}

exports.default = series(
  buildStyles,
  buildProfileStyles,
  buildChatStyles,
  buildSettingsStyles,
  watchTask
);
