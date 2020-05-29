const { ipcRenderer } = require('electron');

const AsyncBtn = document.getElementById('openErrorAsync');
const SyncBtn = document.getElementById('openErrorSync');

const errorTextAsync = document.getElementById('errorTextAsync');

// SYNC BEHAVIOUR OF IPC
SyncBtn.addEventListener('click', function () {
    console.log('[SYNC MESSAGE]: 1');
    const reply = ipcRenderer.sendSync('sync-message');
    console.log('[SYNC RESULT]: ', reply);

    console.log('[SYNC MESSAGE]: 2');
});

// ASYNC BEHAVIOUR OF IPC
AsyncBtn.addEventListener('click', function () {
    // Between R -> M
    // Event used to make a communication channel:'open-error', than can be anything
    console.log('[ASYNC MESSAGE]: 1');
    ipcRenderer.send('async-open');
    console.log('[ASYNC MESSAGE]: 2');
});

// Between M -> R
// Event used to make a communication channel:'error-dialog-opened'
// It have the returned args form M process
ipcRenderer.on('async-opened', function (event, args) {
    console.log(event, args);
    errorTextAsync.textContent = args;
})

console.log('From Index.js');