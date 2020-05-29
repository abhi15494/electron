const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win, diamensionwindow, framelesswindow;
let parentWindow, childWindow;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow() {
    // By Default Electron specify the width: 800px and height: 600px;
    // win = new BrowserWindow({
    //     webPreferences: {
    //         nodeIntegration: true
    //     }
    // });
    // diamensionwindow = new BrowserWindow({
    //     width: 400,
    //     height: 400,
    //     maxWidth: 600, //To limit the width
    //     maxHeight: 600, //To limit the height
    // })

    // framelesswindow = new BrowserWindow({
    //     backgroundColor: '#FF0000', // To setup background color
    //     frame: false
    // })
    // win.setFullScreen(true);

    // win.loadURL(url.format({
    //     pathname: path.join(__dirname, '/index.html'),
    //     protocol: 'file',
    //     slashes: true
    // }))

    // win.on('closed', () => {
    //     win = null;
    // })
    // ------------------------PARENT WINDOW----------------------------
    parentWindow = new BrowserWindow({
        title: 'Parent window'
    });
    // To activate full screen from starting
    // parentWindow.setFullScreen(true); 
    // To activate maximum available size not, full screen i.e. F11 from starting
    parentWindow.maximize();
    // ------------------------CHILD WINDOW-----------------------------
    // To Scenario when we need to confirm or take a input before continue, we add that child window
    childWindow = new BrowserWindow({
        show: false, // There is a delay in window untill the page is loaded and rendered. 
        // So to overcome that issue, we need a event ready-to-show and handle the show property there
        title: 'Child window',
        parent: parentWindow,
        modal: true, // Disable child window till the child window completed/closed.
        backgroundColor: '#FF0000'
    });

    childWindow.once('ready-to-show', function () {
        childWindow.show();
    })

    // Load Remote URL in child window
    childWindow.loadURL('https://www.github.com');

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