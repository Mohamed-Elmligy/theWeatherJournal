/* Global Variables */
/************** get HTML values **************/
const zipIn = document.getElementById('zip')
const whatFeel = document.getElementById('feelings')
/************************** ************************/
/************** get HTML element to listen click events **************/
const doGenerate = document.getElementById('generate')
/************************** ************************/
/************** HTML update dynamically **************/
const dayDate = document.getElementById('date')
const daytemp = document.getElementById('temp')
const boxContent = document.getElementById('content')
/************************** ************************/
/************** OpenWeatherApi conf **************/
const theUrl = 'https://api.openweathermap.org/data/2.5/weather'
const theKey = '2f3f900cab8237550ad9903e90afa5d7'
/************************** ************************/
/************** Create a date dynamically with js **************/
let d = new Date()
let newDate = d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
/************************** ************************/
/**************get Data from OpenWeather **************/

const getWeather = async (baseURL, zipIn, apiKey) => {
  try {
    const request = await fetch(
      `${baseURL}?zip=${zipIn},us&units=metric&APPID=${apiKey}`,
    )
    const result = await request.json()
    //destructuring of the result 
    const {
      main: {
        temp
      },
    } = result
    return temp
  } catch (e) {
    throw e
  }
}


/************************** ************************/

/************** POST Request to store date, temp and user input **************/

const postAllData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      temp: data.temp,
      date: data.date,
      content: data.content
    })
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};
/**************Event listener**************/
doGenerate.addEventListener('click', () => {
  getWeather(theUrl, zipIn.value, theKey)
    .then(daytemp => {
      return {
        dayDate: newDate,
        daytemp,
        boxContent: whatFeel.value
      }
    })
    .then(data => {
      postAllData('/api/projectdata', data)
      return data
    })
    .then(({
      daytemp,
      dayDate,
      boxContent
    }) => updateUI(daytemp, dayDate, boxContent))
    .catch(e => {
      //error handling 
      console.error(e)
    })
})
/************************** ************************/
/**************Update UI dynamically**************/
const updateUI = async (temperature, newDate, whatFeel) => {
  dayDate.innerHTML = newDate
  daytemp.innerHTML = `${temperature} Dgree K`
  boxContent.innerHTML = whatFeel
  const response = await fetch('/all');
  try {
    const allData = await response.json();
    // render the response received from allData.
  } catch (error) {

  }
}
/************************** ************************/