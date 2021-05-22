const {app, BrowserWindow} = require('electron');

let mainWindow = null;

app.on('ready', () => {

  const entryPointURL = `${__dirname}/index.html`;
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
    }
  });
  mainWindow.webContents.loadFile(entryPointURL);
});