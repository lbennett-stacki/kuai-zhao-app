#!/usr/bin/env node

const spawn = require("cross-spawn-with-kill");
const { Watcher } = require("./watcher");
const { Pather } = require("./pather");
const { debounce } = require("./debounce");

class Build {
  static PROC = null;

  static rebuild(exitCallback) {
    console.info("Build#rebuild");
    Build.build(exitCallback);
  }

  static kill() {
    console.info("Build#kill");
    Build.PROC.kill();
    Build.PROC = null;
  }

  static build(exitCallback) {
    console.info("Build#build");
    if (Build.PROC) {
      Build.kill();
    }

    Build.PROC = spawn("yarn", ["start:dev"]);

    Build.PROC.stdout.on("data", (data) => console.info(data.toString()));
    Build.PROC.stderr.on("data", console.error);
    Build.PROC.on("close", (code) => {
      Build.kill();
      exitCallback();
      throw new Error(`Build exited with code ${code}`);
    });
  }
}

class Dev {
  watcher = null;
  srcPath = null;
  rootPath = null;

  constructor(paths = {}) {
    const { src, root } = paths;
    this.srcPath = src;
    this.rootPath = root;
  }

  dev() {
    const debouncedBuild = debounce(
      (exitCallback) => Build.rebuild(exitCallback),
      1000
    );
    this.watcher = new Watcher(this.srcPath);
    this.watcher.watch((path) => {
      if (path.includes("\\node_modules\\") || path.includes("\\dbdata\\")) {
        return;
      }

      debouncedBuild(() => this.exit());
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
    const dev = new Dev({
      src: "src/**/*",
      root: Pather.resolve(""),
    });
    dev.dev();
  }
}

Main.run();
