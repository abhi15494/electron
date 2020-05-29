const electron = require('electron');
const { app, BrowserWindow, Menu, MenuItem, globalShortcut } = electron;
const path = require('path');
const url = require('url');
let win;

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow() {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/index.html'),
        protocol: 'file',
        slashes: true
    }))


    win.on('closed', () => {
        win = null;
    })
}

app.on('ready', function () {
    createWindow();
})

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