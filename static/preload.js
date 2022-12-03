const { contextBridge, ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);

    if (element) {
      element.innerText = text;
    }
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }

  // test
  console.log(document.head.querySelector('meta[name="description"]').content);
});

contextBridge.exposeInMainWorld("global", {
  maybe: () => {
    return "hello world!"
  },
  lomiarch: (val) => ipcRenderer.invoke("getLoMiArch", val),
  context: () => ipcRenderer.invoke("show-context-menu")
});
