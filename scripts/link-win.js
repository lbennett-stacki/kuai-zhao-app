#!/usr/bin/env node

const { existsSync, mkdirSync, copyFileSync } = require("fs");
const { Watcher } = require("./watcher");
const { Pather } = require("./pather");

class Copier {
  static copy(path, root, win) {
    const destination = path.replace(root, win);

    let directory = destination.split("/");
    directory.pop();
    directory = directory.join("/");
    if (!existsSync(directory)) {
      console.info(`Making directory ${directory}...`);
      mkdirSync(directory, { recursive: true });
    }

    const prettyPath = destination.replace(win, "").substr(1);
    console.info(`Copying file ${prettyPath}...`);
    try {
      copyFileSync(path, destination);
    } catch (error) {
      console.error(`Failed to copy ${prettyPath}!`);
      console.error(error.toString());
    }
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
    this.watcher.watch((path) => {
      if (path.includes("/node_modules/")) {
        return;
      }
      Copier.copy(path, this.rootPath, this.winPath);
    });
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

class Main {
  static run() {
    const link = new Link({
      src: "src/**/*",
      root: Pather.resolve(""),
      win: "/home/lb/windows/workspace/personal/kuai-zhao-app",
    });
    link.link();
  }
}

Main.run();
