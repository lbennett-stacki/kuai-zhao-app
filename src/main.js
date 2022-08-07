const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { Capturer } = require("./capturer/backend");
const { Viewer } = require("./viewer/backend");

require("electron-reload")(path.resolve(__dirname, ".."), {
  electron: path.resolve(__dirname, "..", "node_modules", ".bin", "electron"),
  hardResetMethod: "exit",
});

const create = () => {
  console.log("main#create");

  setTimeout(() => {
    const capturer = new Capturer();
    const viewer = new Viewer();
    viewer.hide();

    // TODO CHANGE PATTERN, MOVE OUT
    //
    ipcMain.on("SNIPPED", (_, data) => {
      console.log("SNIPPED DATA", data.length);
      capturer.show();
      viewer.show();
    });

    ipcMain.on("SNIP", () => {
      capturer.capture();
    });
    //
    // TODO END
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
