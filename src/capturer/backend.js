const { desktopCapturer } = require("electron");
const { Windower } = require("../windower");

exports.Capturer = class Capturer {
  w = null;

  constructor(w = Windower.create("capturer", { transparent: true })) {
    console.info("Capturer#constructor");
    this.w = w;
  }

  capture(screen = "screen:0:0") {
    console.info("Capturer#capture");
    this.hide();

    desktopCapturer.getSources({ types: ["screen"] }).then(async (sources) => {
      for (const source of sources) {
        console.log("Capturer#capture", "source", source);
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
