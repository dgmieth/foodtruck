//npm modules
const express = require('express')
//creation of router
const authRouter = express.Router()
//import controller
const authCtrl = require('../controller/authCtrl')
// ======================================================================
// ADMINISTRATIVE ROUTES ================================================
// ======================================================================
authRouter.post('/loginAdministrator',  authCtrl.loginAdministrator)
authRouter.get('/fetchJWToken', authCtrl.isAuth, authCtrl.fetchJWToken)
// ======================================================================
// DEVELOPER ROUTES =====================================================
// ======================================================================
authRouter.post('/loginDeveloper',  authCtrl.loginDeveloper)
authRouter.get('/logoutDeveloper', authCtrl.logOutDeveloper)

//exporting router
module.exports = authRouter











