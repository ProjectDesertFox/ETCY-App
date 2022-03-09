const express = require('express')
const router = express.Router()
const {authentication} = require ('../middlewares/auth')
const userController = require ('../controllers/userController')
const friendListRouter = require('./friendListRouter')
const userNotificationRouter = require('./userNotificationRouter')
const itineraryTransportationRouter = require('./itineraryTransporationsRouter')
const itineraryPlacesRouter = require('./itineraryPlacesRouter')
const groupMemberRouter = require('./groupMemberRouter')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.use('/friendList', friendListRouter)
router.use('/userNotification', userNotificationRouter)
router.use('/itineraryTransportation', itineraryTransportationRouter)
router.use('/itineraryPlaces', itineraryPlacesRouter)
router.use('/groupMember', groupMemberRouter)
module.exports = router