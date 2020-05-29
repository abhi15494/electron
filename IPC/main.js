// IPC: Inter Process Communication
// Native Process can access Native Desktop API via Main process
// So we need two properties.
// ipcMain & ipcRenderer
// For security purpose, ipcMain will access the Native API and communicate the Renderer process via channel events.
// There are two types of IPC: Syncronous & Asyncronous
// >>> Syncronous IPC -> Block process in Middle while executing and completing it's task
// >>> Asyncronous IPC -> Don't stop or distrub process in Middle while executing


const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const url = require('url');

let win;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
function createWindow() {
    win = new BrowserWindow({
        title: 'IPC process',
        // frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/index.html'),
        protocol: 'file',
        slashes: true
    }))

    win.webContents.openDevTools();

    win.maximize()

    win.on('closed', () => {
        win = null;
    })
}
// Event communication between Main and Render process
// open-error is the channel from R -> M
// error-dialog-opened is channel form M -> R with content text
ipcMain.on('async-open', function (event) {
    dialog.showErrorBox('An error message', 'Error message content!');

    // Between M -> R
    event.sender.send('async-opened', 'MAIN_PROCESS_OPENED_DIALOG_BOX');
});

ipcMain.on('sync-message', function (event) {
    setTimeout(() => {
        event.returnValue = 'SYNC_REPLY_DONE_BUDDY';
    }, 100);
})

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