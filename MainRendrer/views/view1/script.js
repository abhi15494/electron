console.log('Render 1');

const {BrowserWindow} = require('electron').remote;
const path = require('path');
const url = require('url');

const btn = document.getElementById('newWindowButton');

btn.addEventListener('click', function() {
     let winthree = new BrowserWindow({
         webPreferences: {
             nodeIntegration: true
         }
     })

     winthree.loadURL(url.format({
         pathname: path.join(__dirname + '/../../views/view3/index.html'),
         protocol: 'file',
         slashes: true
     }))

})