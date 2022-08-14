const { join } = require("path");
const { BrowserWindow } = require("electron");

exports.Windower = class Windower {
  w = null;
  type = null;

  constructor(type, options = { webPreferences: {} }) {
    this.type = type;
    this.w = new BrowserWindow({
      frame: false,
      fullscreen: false,
      ...options,
      webPreferences: {
        preload: join(__dirname, "../", type, "electron/preload.js"),
        ...(options.webPreferences ? options.webPreferences : {}),
      },
    });
  }

  register() {
    this.w.loadFile(join(__dirname, "../", this.type, "ui/dist/index.html"));
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

  on(...args) {
    this.w.on(...args);
  }

  static create(type = "capturer", options = {}) {
    const windower = new Windower(type, options);
    windower.register();

    return windower;
  }
};
