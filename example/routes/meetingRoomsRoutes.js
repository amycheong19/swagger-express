var express = require('express')
var router = express.Router()
//Get user APIs
var user = require('../APIs/meetingRoomsAPIs.js')


/**
 * Project Routes
 */
router.get('/users', user.list);      //GET /meetingRooms/users
router.get('/users/:id', user.view);   //GET /meetingRooms/users/0
router.put('/users/:id', user.update); //GET /meetingRooms/users/0 with params (set at user-api.js)
router.delete('/user', user.delete);  //DELETE /meetingRooms/user with params (set at user-api.js)
router.post('/user', user.create);   //POST /meetingRooms/user


module.exports = router
