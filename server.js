//*************************  Setup empty JS object to act as endpoint for all routes***********************/
let projectData = {};
/************************ ***********************/

/************************ Require Express to run server and routes ***********************/ 
const express = require('express');
/************************ ***********************/
/********************* Listen Port **************/
const port = 8000;
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

/******************* Setup Server *************/ 
app.listen(port, () => {
    console.log(`Server Running On: http://localhost:${port}`);
});



/************************************ Require Express to run server and routes & Get All Data *************/ 

app.get('/getAll', (req, res) => {
    res.send(projectData).status(200).end();
});



/************************* Post Data By The: http://localhost:4800/postData ********************/
app.post('/postData', (req, res) => {
    //Post Data Now
    projectData={
        temp:req.body.temp,
        date:req.body.date,
        content:req.body.content
    };
    res.send(projectData).status(404).end();
});