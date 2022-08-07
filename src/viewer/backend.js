const { Windower } = require("../windower");

exports.Viewer = class Viewer {
  w = null;

  constructor(w = Windower.create("viewer")) {
    console.info("Viewer#constructor");
    this.w = w;
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
