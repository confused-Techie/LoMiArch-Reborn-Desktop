const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const test = require("./src/test.js");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "static", "preload.js"),
      nodeIntegration: true
    }
  });

  win.loadFile("./static/index.html");
}

app.whenReady().then(() => {
  ipcMain.handle("getLoMiArch", (event, val) => {
    console.log("ipcMain request");
    console.log(event);
    const res = test.maybe(val);
    return res;
  });

  ipcMain.handle("show-context-menu", (event) => {
    const template = [
      {
        label: "Menu Item 1",
        click: () => { event.sender.send("context-menu-command", "menu-item-1") }
      },
      { type: "separator" },
      { label: "Menu Item 2", type: "checkbox", checked: true }
    ];

    const menu = Menu.buildFromTemplate(template);
    menu.popup(BrowserWindow.fromWebContents(event.sender));
  })


  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
