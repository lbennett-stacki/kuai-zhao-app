const { desktopCapturer, ipcMain } = require("electron");
const { Windower } = require("../../utils/windower");
const { CapturerDatabase } = require("./db");

exports.Capturer = class Capturer {
  w = null;
  db = null;

  constructor(db = new CapturerDatabase(), w = null) {
    console.info("Capturer#constructor");
    this.w = w;
    this.db = db;
  }

  async init() {
    console.info("Capturer#init");
    await this.db.init();

    this.w =
      this.w ||
      Windower.create("capturer", {
        transparent: true,
        alwaysOnTop: true,
        ...this.db.get("window.plot"),
      });

    this.initWindowListeners();
    this.initIcpListeners();
  }

  initWindowListeners() {
    this.w.on("resized", async () => {
      await this.db.set("window.plot", this.w.getPlot());
    });
    this.w.on("moved", async () => {
      await this.db.set("window.plot", this.w.getPlot());
    });
  }

  initIcpListeners() {
    ipcMain.on("SNIPPED", () => this.show());
    ipcMain.on("SNIP", () => this.capture());
  }

  capture(screen = "screen:0:0") {
    console.info("Capturer#capture");
    this.hide();

    desktopCapturer.getSources({ types: ["screen"] }).then(async (sources) => {
      for (const source of sources) {
        if (source.id === screen) {
          this.w.send("SET_SOURCE", {
            source: source.id,
            plot: this.w.getPlot(),
          });
          return;
        }
      }
    });
  }

  hide() {
    console.info("Capturer#hide");
    this.w.hide();
  }

  show() {
    console.info("Capturer#show");
    this.w.show();
  }
};
