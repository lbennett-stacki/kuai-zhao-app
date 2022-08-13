const { contextBridge, ipcRenderer } = require("electron");
const { Versioner } = require("../versioner");
const axios = require("axios");

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
    data.append("snap", blob, `kuai-zhao_snap_${new Date().toISOString()}`);

    axios.post("http://localhost:3001/snaps", data);
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
