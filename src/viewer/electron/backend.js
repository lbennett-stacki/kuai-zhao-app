const { ipcMain } = require("electron");
const { Windower } = require("../../utils/windower");

exports.Viewer = class Viewer {
  w = null;

  constructor(w = Windower.create("viewer")) {
    console.info("Viewer#constructor");
    this.w = w;
  }

  init() {
    console.info("Viewer#init");
    // this.hide();

    ipcMain.on("SNIPPED", (_, data) => {
      if (data.length > 0) {
        this.show();
      }
    });
  }

  hide() {
    console.info("Viewer#hide");
    this.w.hide();
  }

  show() {
    console.info("Viewer#show");
    this.w.show();
  }
};
