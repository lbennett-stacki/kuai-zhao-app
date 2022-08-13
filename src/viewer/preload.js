const { contextBridge, ipcRenderer } = require("electron");
const { Versioner } = require("../versioner");

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

class Preloader {
  static preload() {
    Versioner.create();
    ElectronAPI.create();
  }
}

Preloader.preload();
