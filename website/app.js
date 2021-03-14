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
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()
/************************** ************************/
/**************Fetch Data from OpenWeather **************/ 

    const fetchWeather = async (baseURL, zipIn, apiKey) => {
        try {
          const request = await fetch(
            `${baseURL}?zip=${zipIn},us&units=metric&APPID=${apiKey}`,
          )
          const result = await request.json()
          //destructuring of the result 
          const {
            main: {temp},
          } = result
          return temp
        } catch (e) {
          throw e
        }
      }


/************************** ************************/

/************** POST Request to store date, temp and user input **************/ 

    const saveData = async (path, data) => {
        try {
          await fetch(path, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
        } catch (e) {
          throw e
        }
      }
/**************Event listener**************/
doGenerate.addEventListener('click', () => {
    fetchWeather(theUrl, zipIn.value, theKey)
      .then(daytemp => {
        return {dayDate: newDate, daytemp, boxContent: whatFeel.value}
      })
      .then(data => {
        saveData('/api/projectdata', data)
        return data
      })
      .then(({daytemp, dayDate, boxContent}) => updateUI(daytemp, dayDate, boxContent))
      .catch(e => {
         //error handling 
        console.error(e)
      })
  })
/************************** ************************/
/**************Update UI dynamically**************/

const updateUI = async (temperature, newDate, whatFeel) => {
    dayDate.innerText = newDate
    daytemp.innerText = `${temperature} deg`
    boxContent.innerText = whatFeel
}
/************************** ************************/




