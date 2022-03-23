//npm modules
const express = require('express')
//creation of router
const pageRouter = express.Router()
//import controller
const pageCtrl = require('../controller/pageCtrl')
const authCtrl = require('../controller/authCtrl')
// ======================================================================
// AUTH PAGES ===========================================================
// ======================================================================
pageRouter.get('/login/admLogin', authCtrl.isAdministratorLoggedRedirect, pageCtrl.renderAdmiLogin)
pageRouter.get('/login/developerLogin', authCtrl.isDeveloperLoggedRedirect, pageCtrl.renderDeveloperLogin)
pageRouter.get('/login', pageCtrl.renderLoginPage)
// ======================================================================
// ADMINISTRATIVE PAGE ==================================================
// ======================================================================
pageRouter.get('/admDashboard', authCtrl.isAuth, authCtrl.admPlatformAccess, pageCtrl.admDashboard)
// ======================================================================
// DEVELOPER PAGE =======================================================
// ======================================================================
pageRouter.get('/developerDashboard', authCtrl.isAuth, pageCtrl.developerDashboard)
// ======================================================================
// PRIVACY POLICY =======================================================
// ======================================================================
pageRouter.get('/app', pageCtrl.privacyPolicy)
pageRouter.get('/web', pageCtrl.privacyPolicy)
// ======================================================================
// ROOT PAGE ============================================================
// ======================================================================
pageRouter.get('/', pageCtrl.homePage)

//exporting router
module.exports = pageRouter