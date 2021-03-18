/* Global Variables */
/************** get HTML values **************/
const zipIn = document.getElementById('zip')
const whatFeel = document.getElementById('feelings')
/************************** ************************/

/************** HTML update dynamically **************/
const dayDate = document.getElementById('date')
const daytemp = document.getElementById('temp')
const boxContent = document.getElementById('content')
/************************** ************************/

/************** OpenWeatherApi conf **************/
const theUrl = 'http://localhost:3000/'
const theKey = '&appid=2f3f900cab8237550ad9903e90afa5d7&units=imperial'
const urlWeather = 'http://api.openweathermap.org/data/2.5/forecast?zip='
/************************** ************************/
/************** Create a date dynamically with js **************/
let d = new Date()
let newDate = d.toLocaleString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
});
/************************** ************************/

/************************** Event function to existing HTML DOM element ************************/
const generate = document.getElementById('generate');
generate.addEventListener('click', doGen);
/*************** Post The Data To API ************************/
function doGen() {
  let data = {
    addZipCode: zipIn.value,
    content: whatFeel.value,
    date: newDate
  };

  /***************** Post The Data To Api For Get Zip Code ************************/
  getWeatherInformation(data.addZipCode).then(getZipInfo => {
    data.temp = getZipInfo.list[0].main.temp;
    postServer(data);
  })
};
/**************************** Get Zip Code Information From Api ************************/
const getWeatherInformation = async (addZipCode) => {
  const all = `${urlWeather}${addZipCode}${theKey}`
  return await (await fetch(`${all}`)).json()
}
/************************************* ************************/

/************************ Post Data To Server For Saving  ************************/
const postServer = async (data) => {
  let response = await fetch(`${theUrl}postData`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  try {
    response.json().then(data => {
        UI();
    })
  } catch (error) {
    console.log('e')
  }
}
/****************************** Update TheUI ************************/
const UI = async () => {
  let response = await fetch(`${theUrl}getAll`);
  try {
    response.json().then(data => {
      dayDate.innerHTML = `The Date Now is: ${data.date}`;
      daytemp.innerHTML = `The Temprture Now is: ${data.temp} K & ${data.temp-273} C`;
      boxContent.innerHTML = `My Feelings Now is: ${data.content}`;
    })
  } catch (error) {
    console.log('e')
  }
}
/***************************** *********************************/