/**
 * Config
 */
var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , http = require('http')
  , path = require('path')
  , swagger = require('../')
  , expressListRoutes   = require('express-list-routes')
  , meetingRooms =  require('./meetingRoomsPath.js');

/**
 * Project APIs.
 */
//////////MEETING-ROOMS/////////////
app.use('/meeting-rooms', meetingRooms)

//////////NEW PROJECT/////////////
// app.use('/newProject', <newProjectPaths file>)

/**
 * Server & port setup
 */
if (!module.parent) {
  app.listen(8000);
  console.log('Express started on port 8000');
}


//TODO: app.configure is deprecated - need to update to express4
// Error handling
