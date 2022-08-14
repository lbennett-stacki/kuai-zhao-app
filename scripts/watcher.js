const chokidar = require("chokidar");
const { Pather } = require("./pather");

exports.Watcher = class Watcher {
  srcPath = null;
  watcher = null;

  constructor(srcPath) {
    this.srcPath = srcPath;
  }

  watch(callback) {
    this.watcher = chokidar.watch(this.watchPaths, {
      persistent: true,
    });

    this.watcher
      .on("add", (path) => callback(path))
      .on("change", (path) => callback(path))
      .on("unlink", (path) => callback(path));
  }

  get watchPaths() {
    return [
      this.srcPath,
      "package.json",
      "yarn.lock",
      "index.html",
      "scripts",
      "dbdata",
    ].map((path) => Pather.resolve(path));
  }

  close() {
    return this.watcher.close();
  }
};
