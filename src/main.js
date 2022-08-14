const { app, BrowserWindow } = require("electron");
const { Capturer } = require("./capturer/electron/backend");
const { Viewer } = require("./viewer/electron/backend");

const create = () => {
  setTimeout(async () => {
    const capturer = new Capturer();
    await capturer.init();

    const viewer = new Viewer();
    viewer.init();
  }, 300);
};

class App {
  run() {
    console.info("App#run");
    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") app.quit();
    });

    app.whenReady().then(() => {
      create();

      app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) create();
      });
    });
  }

  static create() {
    console.info("App.create");
    const app = new App();
    app.run();

    return app;
  }
}

class Main {
  static run() {
    console.info("Main.run");
    App.create();
  }
}

Main.run();
