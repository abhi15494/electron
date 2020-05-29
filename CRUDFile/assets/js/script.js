const { } = require('electron');
const fs = require('fs');
const path = require('path');
const $filename = document.getElementById('filename');
const $content = document.getElementById('content');
const $CreateBtn = document.getElementById('CreateBtn');
const $ReadBtn = document.getElementById('ReadBtn');
const $DeleteBtn = document.getElementById('DeleteBtn');


let pathname = path.join(__dirname, '../../files');
$CreateBtn.addEventListener('click', function () {
    let file = path.join(pathname, $filename.value);
    let content = $content.value;

    fs.writeFile(file, content, (err) => {
        if (err) console.error('[ERROR]: Can\'t create file.', err)
        else console.log('[SUCCESS]: File created.')
    });
});

$ReadBtn.addEventListener('click', function () {
    let file = path.join(pathname, $filename.value);
    fs.readFile(file, (err, content) => {
        if (err) console.error('[ERROR]: Can\'t read file.', err)
        else {
            $content.value = content;
            console.log('[SUCCESS]: File read successfully.')
        }
    });
});

$DeleteBtn.addEventListener('click', function () {
    let file = path.join(pathname, $filename.value);
    fs.unlink(file, (err, content) => {
        if (err) console.error('[ERROR]: Can\'t delete file.', err)
        else {
            console.log('[SUCCESS]: File deleted successfully.')
        }
    });
});