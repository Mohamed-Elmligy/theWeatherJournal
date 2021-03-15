//*************************  Setup empty JS object to act as endpoint for all routes***********************/
let projectData = {};
/************************ ***********************/

/************************ Require Express to run server and routes ***********************/ 
const express = require('express');
/************************ ***********************/

/************************ Dependencies ***********************/
const bodyParser = require('body-parser');
/************************ ***********************/

/************************ Start up an instance of app ***********************/
const app = express();
/************************ ***********************/

/********************************************* Middleware*********************************************/
/************************ configuring express to use body-parser as middle-ware. ***********************/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/************************ ***********************/

/************************ Cors for cross ***********************/
const cors = require('cors');
app.use(cors());
/************************ ***********************/

/************************ the main project folder ***********************/
app.use(express.static('website'));
/************************ ***********************/

/************************ Post Route ***********************/
app.post('/addWeatherData', addWeatherData)
let projDataTemp = projectData.temperature;
let projData = projectData.date;
let projDataResp = projectData.user_response;
let reqBodyTemp = request.body.temperature;
let reqBodyData = request.body.date;
let reqBodyRes = request.body.user_response;
function addWeatherData(request, response) {
  projDataTemp = reqBodyTemp;
  projData= reqBodyData;
  projDataResp = reqBodyRes;
    response.end();
    console.log(projectData)
}
/************************ ***********************/

/************************ Callback function to complete GET '/all'***********************/ 
app.get('/all', getTheInfo);

function getTheInfo(req, res) {
  res.send(projectData);
}
/************************ ***********************/

/********************** Setup Server ***********************/
const port = 8000;
const theHostname = 'localhost';
const server = http.createServer(app);
server.listen(port, theHostname, () => console.log(`Server running on http://${TheHostname}:${port}`));
/************************ ***********************/