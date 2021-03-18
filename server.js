//*************************  Setup empty JS object to act as endpoint for all routes***********************/
let projectData = {};
/************************ ***********************/
/************************ Require Express to run server and routes ***********************/ 
const express = require('express');
/************************ ***********************/
/********************* Listen Port **************/
const addPort = 3000;
/************************ Dependencies ***********************/
const bodyParser = require('body-parser');
/************************ ***********************/

/************************ Start up an instance of app ***********************/
const app = express();
/************************ ***********************/

/********************************************* Middleware*********************************************/
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

/******************* Setup Server *************/ 
const serverRun =() => {
    console.log(`Server is Running On: http://localhost:${addPort}`);
} 
app.listen(addPort,serverRun);
/************************************ Require Express to run server and routes & Get All Data *************/ 
const getWeatherInformation = (req, res) => {
    res.send(projectData)
};
app.get('/getAll', getWeatherInformation);
/************************* Post Data  ********************/
const postWeatherData = (req,res)=> {
    const reqTemp = req.body.temp;
    const reqDate = req.body.date;
    const reqContent = req.body.content;
    projectData={
        temp:reqTemp,
        date:reqDate,
        content:reqContent
    };
    res.send(projectData);
}
app.post('/postData', postWeatherData);
