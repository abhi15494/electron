const { shell } = require('electron');
const btn = document.getElementById('openBtn');

btn.addEventListener('click', function (event) {
    // Folder will open with selected file
    shell.showItemInFolder('D:\\fonts\\OFL.txt');

    // Folder will open selected file
    shell.openItem('D:\\fonts\\OFL.txt');

    // Folder will open external link in browser (default)
    shell.openExternal('https://www.example.com');
})