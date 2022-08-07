const { contextBridge, ipcRenderer } = require("electron");
const axios = require("axios");

class Versioner {
  register() {
    window.addEventListener("DOMContentLoaded", () => {
      const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
      };

      for (const dependency of ["chrome", "node", "electron"]) {
        replaceText(`${dependency}-version`, process.versions[dependency]);
      }
    });
  }

  static create() {
    const versioner = new Versioner();
    versioner.register();

    return versioner;
  }
}

class ElectronAPI {
  register() {
    contextBridge.exposeInMainWorld("electronAPI", {
      snip: () => ipcRenderer.send("SNIP"),
    });
  }

  static create() {
    const api = new ElectronAPI();
    api.register();

    return api;
  }
}

class Snipper {
  register() {
    ipcRenderer.on("SET_SOURCE", async (_, { source, plot }) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: "desktop",
              chromeMediaSourceId: source,
            },
          },
        });
        this.captureStream(stream, plot);
      } catch (error) {
        this.handleStreamError(error);
      }
    });
  }

  captureStream(stream, plot) {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    video.srcObject = stream;
    video.onloadedmetadata = () => video.play();

    video.onplay = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      let ctx = canvas.getContext("2d");
      ctx.drawImage(
        video,
        plot.x, // x
        plot.y, // y
        plot.width, // width
        plot.height, // height
        0, // new x
        0, // new y
        plot.width, // new width
        plot.height // new height
      );

      let image = canvas.toDataURL("image/jpeg");
      canvas.toBlob((blob) => {
        this.uploadFile(blob);
      });

      video.remove();
      canvas.remove();

      ipcRenderer.send("SNIPPED", image);
    };

    document.body.appendChild(video);
  }

  uploadFile(blob) {
    const data = new FormData();
    data.append("snap", blob, `snap_${Date.now().toLocaleString()}`);

    axios.post("http://localhost:3001/snap", data);
  }

  handleStreamError(error) {
    console.error("handle stream error", error);
  }

  static create() {
    const snipper = new Snipper();
    snipper.register();

    return snipper;
  }
}

class Preloader {
  static preload() {
    Versioner.create();
    Snipper.create();
    ElectronAPI.create();
  }
}

Preloader.preload();
