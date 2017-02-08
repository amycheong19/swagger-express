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
    },
    host: 'localhost:3000',
    basePath: '/',
    apis: ['./routes/*'], // Path to the API docs
  };

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
var swaggerSpec = swaggerJSDoc(options);


/**
 * Project APIs.
 */
//////////MEETING-ROOMS/////////////
var meetingRooms =  require('./meetingRoomsPath.js');
app.use('/meeting-rooms', meetingRooms)

//////////NEW PROJECT TEMPLATE/////////////
// Set your routes under ../example/routes folder
// var newProject =  require('./<newProject>.js');
//
// Set your new project baseURL so that your APIs started with : <host>/<baseURL>/...
// app.use('/newProject', <newProjectPaths file>)


/**
 * Server & port setup
 */
 // serve swagger
 app.get('/swagger.json', function(req, res) {
   res.setHeader('Content-Type', 'application/json');
   res.send(swaggerSpec);
 });
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
