const request = require('request');

const $quote = document.getElementById('quote');
const myrequest = () => request('https://randomuser.me/api/', function (err, res, body) {
    const { results } = JSON.parse(body);
    let randomdata = results[0];
    $quote.innerHTML = `
        <h2>${randomdata.name.first} ${randomdata.name.last}</h2>
        <p>${randomdata.email}<br />${randomdata.gender}</p>
    `;
    randomdata.rendered;
    setTimeout(() => {
        myrequest();
    }, 2500);
})
myrequest();
