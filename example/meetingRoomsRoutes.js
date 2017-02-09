var express = require('express')
var router = express.Router()
//Get user APIs
var user = require('../example/APIs/meetingRoomsAPIs.js')


/**
 * Project Routes
 */
router.get('/users', user.list);      //GET /meetingRooms/users
router.post('/users', user.create);   //POST /meetingRooms/users
router.get('/users/:id', user.view);   //GET /meetingRooms/users/0
router.put('/users/:id', user.update); //GET /meetingRooms/users/0 with params (set at user-api.js)
router.delete('/users', user.delete);  //DELETE /meetingRooms/users with params (set at user-api.js)

module.exports = router
