var express = require('express')
var router = express.Router()
var user = require('./user-api')

/**
 * Project APIs.
 */
//////////MEETING-ROOMS/////////////
var meetingRoomsBaseURL = ''
router.get('/users', user.list);
router.get('/user/:id', user.view);
router.get('/user/:id/view', user.view);
router.put('/user/:id/edit', user.update);
router.delete('/users', user.delete);

module.exports = router
