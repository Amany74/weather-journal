/* Global Variables */
// Create a new date object of the Date class
let d = new Date();
let newDate = 1 + d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// my personal api key to use in url to get data
let _basicurl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const _apiKey = '&appid=7ddd280e05cda94c62d6a13cff265b1b&units=imperial';

// adding event listener to button with id "generate"
document.querySelector('#generate').addEventListener('click', generateAction);

function generateAction() {
    const newZip = document.getElementById('zip').value;
    const newFeeling = document.getElementById('feelings').value;
    let url = _basicurl + newZip + _apiKey;
    gettingWeather(url)
        .then(function (data) {
            // console.log(data);
            postingData('/add', { date: newDate, temp: data.main.temp, newFeeling});
            updatingTheUi();
        });
}


// getting data from api
const gettingWeather = async (url) => {
    const res = await fetch(url)
    try {
        return await res.json();
    } catch (error) {
        console.log('error', error);
    }
};

// posting data 
const postingData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        return await response.json()
    } catch (e) {
        console.log(e.message);
    }
};

// updating the ui with data fetched from open weather
const updatingTheUi = async () => {
    const request = await fetch('/all');
    try {
        const fetchedData = await request.json();
        console.log(fetchedData);
        document.getElementById('date').innerHTML = fetchedData.date;
        document.getElementById('temp').innerHTML = fetchedData.temperature;
        document.getElementById('content').innerHTML = fetchedData.feeling;
    } catch (e) {
        console.log(e.message);
    }
};
