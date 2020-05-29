const { BrowserWindow, app } = require('electron');
const path = require('path');
const url = require('url');

let win1;
let win2;
// Application have only one MAIN_PROCESS
// MAIN_PROCESS may have multiple Multiple RENDERER_PROCESS
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'; 

function createWindow() {
    win1 = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    })
    win2 = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    })

    win1.loadURL(url.format({
        pathname: path.join(__dirname, './views/view1/index.html'),
        protocol: 'file',
        slashes: true
    }))
    win2.loadURL(url.format({
        pathname: path.join(__dirname, './views/view2/index.html'),
        protocol: 'file',
        slashes: true
    }))

    win1.webContents.openDevTools();
    win2.webContents.openDevTools();

    win1.on('closed', () => win = null);
    win2.on('closed', () => win = null);
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
})
app.on('activate', ()=> {
    if(win===null) {
        createWindow();
    }
})