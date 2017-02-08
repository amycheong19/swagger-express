var express = require('express')
var router = express.Router()
var user = require('../example/routes/user-api-routes.js')


/**
 * Project APIs.
 */
//////////MEETING-ROOMS/////////////
var meetingRoomsBaseURL = ''
router.get('/users', user.list);
router.post('/users', user.create);
router.get('/user/:id', user.view);
router.put('/users/:id', user.update);
router.delete('/users', user.delete);

module.exports = router
