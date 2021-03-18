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
const theUrl = 'http://localhost:8000/'
const theKey = '&appid=2f3f900cab8237550ad9903e90afa5d7&units=imperial'
/************************** ************************/

/**************************** help fun to find error **********************/
const findError = (error) => console.error('Some ErrorHas Been => ', error);
/**************************** ************************************/

/************** Create a date dynamically with js **************/
let d = new Date()
let newDate = d.toLocaleString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
});
/************************** ************************/

/************************** Event function to existing HTML DOM element ************************/
document.getElementById('generate').addEventListener('click', doGenerate);

/*************** Post The Data To API ************************/
function doGenerate() {
  let data = {
    zipCode: zipIn.value,
    content: whatFeel.value,
    date: newDate
  };

  /***************** Post The Data To Api For Get Zip Code ************************/
  getWeatherInformation(data.zipCode).then(zipInfo => {
    if (zipInfo.cod != 200) //Return And Show Alert If City Is Not Found
      return alert(zipInfo.message)
    data.temp = zipInfo.list[0].main.temp; //Now Post Data To Server For Saving And Display In Holder Section
    postServer(data);
  }).catch(findError);
};


/**************************** Get Zip Code Information From Api ************************/
const getWeatherInformation = async (zipCode) => {
  return await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${theKey}`)).json()
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
    if (!response.ok) {
      alert('Process Not Successfuly');
      return;
    }

    response.json().then(data => {
      if (response.ok)
        updateTheUI(); //Update UI Now
      else
        alert('Process Not Successfuly');
    }).catch(findError);

  } catch (error) {
    findError(error);
  }
}

/****************************** Update TheUI ************************/
const updateTheUI = async () => {
  let response = await fetch(`${theUrl}getAll`);
  try {
    response.json().then(data => {
      dayDate.innerHTML = `Date Is: ${data.date}`;
      daytemp.innerHTML = `Temp Is: ${data.temp} K & ${data.temp-273} C`;
      boxContent.innerHTML = `My Feelings Is: ${data.content}`;
    }).catch(findError);
  } catch (error) {
    findError(error);
  }
}
/***************************** *********************************/