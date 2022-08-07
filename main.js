const { app, BrowserWindow } = require("electron");
const path = require("path");

console.info("main");

const createWindow = () => {
  const w = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  w.loadFile("index.html");
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
