//Responsible creating window and handle it's events

// Some Important Imports 
const { app, BrowserWindow } = require('electron');
// BrowserWindow is responsible for all UI related part of our application;
// App: Running in Main.js handling any events that are necessary
const path = require('path');
const url = require('url');
// USING Path and Url to generate a path URL to load the index.html file

let win; // Reference of window

//To disable the Electron warnings
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'; 

// Function to create a window
function createWindow() {
    win = new BrowserWindow({
        // To make sure that require() and nodejs functions are working fine in your system
        webPreferences: {
            nodeIntegration: true 
        }
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/index.html'),
        protocol: 'file',
        slashes: true
    }))

    //Open Devtools from the starting
    // win.webContents.openDevTools(); 

    // Event: Closed to garbage collector
    win.on('closed', () => {
        win = null;
    })
}

// Event: When application completed Active
app.on('ready', createWindow);

// Event: Emitted when all the browsers windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// Event: Mac if no window open, and we click on doc icon we need to create browser window again
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
})