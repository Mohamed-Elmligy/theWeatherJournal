// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;
const server = app.listen(port, listening);
 function listening () {
    console.log(`running on localhost: ${port}`);
};
// GET route
app.get('/all', sendTheData);

function sendTheData (req, res) {
  res.send(projectData);
};

//POST ROUTE
app.post('/addinformation', addinformation);

function addinformation  (req, res) {
  newEntry = {
    date: req.body.date,
    temperature: req.body.temperature,
    answer: req.body.answer
  }

  projectData.push(newEntry)
  res.send(projectData)
  console.log(projectData)
}
// POST route
app.post('/add', backFunction, temperature, addDate, answer); //The POST routereceiving three pieces of projectData from the request body

function backFunction  (req, res) {
  res.send('POST received');
}
function temperature  (req, res) {
  projectData.push(req.body);
};
function addDate   (req, res) {
  projectData.push(req.body);
}
function answer  (req,res) {
  projectData.push(req.body);
};

