const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow() {
    // By Default Electron specify the width: 800px and height: 600px;
    win = new BrowserWindow({
        width: 500,
        height: 150,
        frame: false,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // win.maximize(true);
    // win.webContents.openDevTools();

    win.loadURL(url.format({
        pathname: path.join(__dirname, '/index.html'),
        protocol: 'file',
        slashes: true
    }))

    win.on('closed', () => {
        win = null;
    })
    
    win.once('ready-to-show', () => win.show());
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
})