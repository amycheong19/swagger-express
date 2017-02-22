/**
 * Config
 */
var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , http = require('http')
  , path = require('path')
  , swagger = require('../')

  var swaggerJSDoc = require('swagger-jsdoc');

// Added header for CORS
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


/**
 * Projects Setup.
 */
//////////MEETING-ROOMS/////////////
//styling for swagger UI
app.use('/meetingRooms', express.static(path.join(__dirname, '/public')));

var mrRoutes =  require('./routes/meetingRoomsRoutes.js');
app.use('/meetingRooms', mrRoutes)

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
var mrOptions = {
  swaggerDefinition: {
    info: {
      title: 'Meeting Rooms APIs', // Title (required)
      version: '1.0.0', // Version (required)
      description: "<descriptions>"
    },
    host: 'localhost:3000',
    basePath: '/meetingRooms',
    schemes: ['http']
  },
  apis: ['./APIs/*'], // Path to the API docs
};
var mrSwaggerSpec = swaggerJSDoc(mrOptions);
app.get('/meetingRooms/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(mrSwaggerSpec);
});

app.get('/meetingRooms/index.html', function(req, res) {
  res.sendFile("index.html");
});

//////////NEW PROJECT TEMPLATE/////////////
// Set your routes under ../example/APIs folder
// var newProject =  require('./<newProject>.js');
//
// Set your new project baseURL so that your APIs started with : <host>/<baseURL>/...
// app.use('/newProject', <newProjectPaths file>)


/**
 * Server & port setup */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
