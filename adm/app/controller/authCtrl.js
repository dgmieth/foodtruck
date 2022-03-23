//npm modules
const bcrypt = require('bcrypt')
const axios = require('axios')
//import modules
const Administrator = require(`../../model/Administrator`)
const Developer = require(`../../model/Developer`)
//custom functions
const destroySession = require('./supportFunctions/destroySession')
const checkAccesses = require('./supportFunctions/checkAccesses')
// ======================================================================
// IS AUTH FUNCTION =====================================================
// ======================================================================
exports.isAuth = (req,res,next) => {
    console.log(`========================================><=================================`)
    console.log(`SESSION CHECKING`)
    if(new Date(req.session.expireTime)<=new Date()||req.session.expireTime===undefined){
        console.log(req.session._expires)
        console.log(req.session)
        console.log(`----------------------------------><-----------------------------------`)
        console.log(`SESSION expired`)
        destroySession(req,res,next)
    }else{
        console.log(req.session)
        console.log(`----------------------------------><-----------------------------------`)
        console.log(`SESSION exists`)
        next()
    }
}
//user has ADM_platformAccess
exports.admPlatformAccess = (req,res,next) => {
	console.log(process.env.ADM_PLATFORM_ACCESS.split(','))
    console.log(req.session.accesses)
	console.log(process.env.ADM_PLATFORM_ACCESS)
    if(checkAccesses.checkUserAccess(process.env.ADM_PLATFORM_ACCESS,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        console.log('2-> noAccess')
        return res.status(401).json({error: 'User has not access!'})
    }
}
//check if admin user is logged to skip the login page
exports.isAdministratorLoggedRedirect = (req,res,next) =>{
    if(req.session.logged && req.session.typeAdm){
        res.redirect('/admDashboard')
    }else{
        next()
    }
}
//check if dev user is logged to skip the login page
exports.isDeveloperLoggedRedirect = (req,res,next) =>{
    if(req.session.logged && req.session.typeDev){
        res.redirect('/developerDashboard')
    }else{
        next()
    }
}
// ======================================================================
// DEVELOPER ============================================================
// ======================================================================
// LOGIN ================================================================
exports.loginDeveloper = (req,res,next)=> {
    Developer.fetchByEmail(req.body.email)
    .then(([data,meta])=> {
        console.log(data)
        bcrypt.compare(req.body.password,data[0][0].password)
        .then(result => {
            console.log(result)
            if(result){
                const developer = new Developer(data[0][0].email,data[0][0].id,data[0][0].password)
                req.session.User = developer
                req.session.typeDev = true
                req.session.logged = true
                req.session.expireTime = (new Date()).setMilliseconds(3600000)
                console.log(developer)
                developer.pageLogin()
                res.status(200).send({redirect:'/developerDashboard'})
            }else{
                res.status(401).json({error: 'Password could not be validate!'})
            }
        })  
        .catch(err => {
            console.log(err)
            res.status(401).json({error: 'Incorrect user/password!'})
        })
    })
    .catch(err => {
        console.log(err)
        res.status(401).json({error: 'No user found.'})
    })
}
exports.logOutDeveloper = (req,res,next) => {
    destroySession(req,res,next)
}
// ======================================================================
// ADMINISTRATOR ========================================================
// ======================================================================
// LOGIN ================================================================
exports.loginAdministrator = (req,res,next)=> {
    Administrator.fetchByEmail(req.body.email)
    .then(([data,meta])=> {
        console.log(data)
        if(data[0].length===0){
            return res.status(401).json({error: 'User does not have access or User does not exist!'})
        }
        bcrypt.compare(req.body.password,data[0][0].password)
        .then(result => {
            if(result){
                const administrator = new Administrator(data[0][0].email,data[0][0].id,data[0][0].password)
                administrator.selectAccess()
                .then(([data1,meta1])=>{
                    console.log(data1)
                    var accessArray = []
                    data1[0].forEach(reg => {
                        accessArray.push(reg.name)
                    })
                    administrator.setAccesses = accessArray
                    var hasAccess = false
                    process.env.ADM_PLATFORM_ACCESS.split(',').some(access => {
                        if(administrator.accesses.includes(access)){hasAccess = true}})
                    if(!hasAccess){return res.status(401).json({error: 'User has not access!'})}
                    req.session.User = administrator
                    req.session.accesses = administrator.accesses
                    req.session.typeAdm = true
                    req.session.logged = true
                    req.session.expireTime = (new Date()).setMilliseconds(86400000)
                    administrator.pageLogin()
                    res.status(200).send({redirect:'/admDashboard'})
                })
                .catch(err=>{
                    console.log(err)
                })
            }else{
                res.status(401).json({error: 'Password could not be validate!'})
            }
        })  
        .catch(err => {
            console.log(err)
            res.status(401).json({error: 'Incorrect user/password!'})
        })
    })
    .catch(err => {
        console.log(err)
        res.status(401).json({error: 'No user found.'})
    })
}
exports.fetchJWToken = (req,res,next)=> {
    console.log('fetchJWToken')
    const returnObject = {
        hasErros: true,
        data: null,
        msg: 'Could not find valid token. Please log out and log in again.'
    }
    if(req.session.apiAccessToken===null||req.session.apiAccessToken==='undefined'){
        return res.json(returnObject)
    }
    console.log(req.session.apiAccessToken)
    returnObject.hasErros = false
    returnObject.msg = null
    returnObject.data = req.session.apiAccessToken
    console.log(returnObject)
    res.json(returnObject)
}
// ======================================================================
// COMMON FUNCTIONS =====================================================
// ======================================================================
