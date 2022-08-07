#!/usr/bin/env node

const { resolve } = require("path");
const { copyFileSync } = require("fs");
const chokidar = require("chokidar");

class Pather {
  static resolve(path) {
    return resolve(__dirname, "..", path);
  }
}

class Watcher {
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
    return [this.srcPath, "package.json", "yarn.lock", "index.html"].map(
      (path) => Pather.resolve(path)
    );
  }

  close() {
    return this.watcher.close();
  }
}

class Copier {
  static copy(path, root, win) {
    const destination = path.replace(root, win);
    console.info(`Copying file ${path} to ${win}...`);
    copyFileSync(path, destination);
  }
}

class Link {
  watcher = null;
  srcPath = null;
  rootPath = null;
  winPath = null;

  constructor(paths = {}) {
    const { src, root, win } = paths;
    this.srcPath = src;
    this.rootPath = root;
    this.winPath = win;
  }

  link() {
    this.captureInterupt();
    this.watcher = new Watcher(this.srcPath);
    this.watcher.watch((path) =>
      Copier.copy(path, this.rootPath, this.winPath)
    );
  }

  captureInterupt() {
    process.on("SIGINT", () => {
      this.exit();
    });
  }

  exit() {
    console.info("Exiting...");
    this.watcher.close().then(() => console.info("Watcher closed."));
  }
}

new Link({
  src: "src/**/*",
  root: Pather.resolve(""),
  win: "/home/lb/windows/workspace/personal/kuai-zhao-app",
}).link();
