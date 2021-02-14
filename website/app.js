/* Global Variables */
const weatherURL = 'https://api.openweathermap.org/data/2.5/' // API from OPEN WEATHER MAP
const weatherKey = '2f3f900cab8237550ad9903e90afa5d7'; // my KEY from from OPEN WEATHER MAP
const nZip = document.getElementById('nzip').Value;
let feelings = document.getElementById('answer').Value;
let theDate = document.getElementById('theDate').innerHTML;
let theTemp = document.getElementById('theTemp').innerHTML;
let theContent = document.getElementById('theContent').innerHTML;
let listener = document.getElementById('generate');
let pices3 = {temperature: data.main.temp, date: today, answer: feelings};
let link = weatherURL + 'weather?zip=' + nZip + '&appid=' + weatherKey;
let today = newDate(); // Create a new date instance dynamically with JS
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//start code
//Create an event listener
listener.addEventListener('click', getAction);
function getAction (x) {
    getInformation(weatherURL, nZip, weatherKey)
    .then((data)=> {  
        postData('/addInformayion', pices3);
        getUI();
      })
}; 

// //GET request to the OpenWeatherMap API.    
const getInformation = async (weatherURL, nZip, weatherKey) => {
    //1-
    const res = await fetch(link);
    //2- call back API
    try {
        // Transform into JSON
        const allData = await response.json()
    }catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

// Async POST
const postTheData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log("error", error);
    }
}

//update UI
const getUI = async () => {
    const request = await fatch('/all')
    try {
        const allData = await request.JSON()
        console.log(allData);
        theDate = allData[0].date;
        theTemp = allData[0].temperature;
        theContent = allData[0].answer;
    } catch (error) {
        console.log("error", error);
    }
}