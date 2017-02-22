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

  var options = {
    swaggerDefinition: {
      info: {
        title: 'SEED APIs', // Title (required)
        version: '1.0.0', // Version (required)
        description: "<descriptions>"
      },
      host: 'localhost:3000',
      basePath: '/meetingRooms'
    },
    apis: ['./APIs/*'], // Path to the API docs
  };

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
var swaggerSpec = swaggerJSDoc(options);


/**
 * Projects Setup.
 */
//////////MEETING-ROOMS/////////////
var mrRoutes =  require('./routes/meetingRoomsRoutes.js');
app.use('/meetingRooms', mrRoutes)
app.get('/meetingRooms/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
//////////NEW PROJECT TEMPLATE/////////////
// Set your routes under ../example/APIs folder
// var newProject =  require('./<newProject>.js');
//
// Set your new project baseURL so that your APIs started with : <host>/<baseURL>/...
// app.use('/newProject', <newProjectPaths file>)


/**
 * Server & port setup
 two*/
 // serve swagger
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
