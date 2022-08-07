const { join } = require("path");
const { BrowserWindow } = require("electron");

exports.Windower = class Windower {
  w = null;
  type = null;
  constructor(type) {
    this.type = type;
    this.w = new BrowserWindow({
      transparent: true,
      frame: false,
      fullscreen: false,
      webPreferences: {
        preload: join(__dirname, type, "preload.js"),
      },
    });
  }

  register() {
    this.w.webContents.openDevTools();
    this.w.loadFile(join(__dirname, this.type, "index.html"));
  }

  send(message, source) {
    return this.w.webContents.send(message, source);
  }

  getPlot() {
    const [x, y] = this.w.getPosition();
    const [width, height] = this.w.getSize();

    return { x, y, width, height };
  }

  hide() {
    this.w.hide();
  }

  show() {
    this.w.show();
  }

  static create(type = "capturer") {
    const windower = new Windower(type);
    windower.register();

    return windower;
  }
};
