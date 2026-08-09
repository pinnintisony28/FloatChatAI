const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 80,        // small floating button size
    height: 80,
    alwaysOnTop: true,  // floats above all apps
    frame: false,       // removes title bar
    transparent: true,  // allows background transparency
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL('http://localhost:5173'); // your React dev server
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
