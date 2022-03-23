//node modules
const path = require('path')
const http = require('http')
const https = require('https')
//npm modules
const express = require('express')
const session = require('express-session')
var MySQLStore = require('express-mysql-session')(session)
const cookieParser = require('cookie-parser')
require('dotenv').config({path: path.join(__dirname,'../.env')})
//customed modules
const db = require(`../model/bd/pool`)
const notify = require('./controller/supportFunctions/sendNotification.js')
//express app creation
const app = express()
//customized session store
var sessionStore = new MySQLStore({
	charset: 'utf8mb4_bin',
    endConnectionOnClose: true,
    expiration: 3600000,
    clearExpired: true,
    checkExpirationInterval: 900000
    },db)
//express app configuration
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'../view/views'))
app.use(express.static(path.join(__dirname,'../view/public')))
app.use(express.static(path.join(__dirname,'../node_modules')));
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser())
app.use((req,res,next)=>{
    console.log(req.session)
    next()
})
app.use(session({
    secret: 'kungfuBBW_adminWEBAPP_20210528_221310',
    name:'appKungfuAdmin',
    resave: false,
    maxAge: 10000,
    cookie: { 
        //secure: true,
    }, 
    saveUninitialized: false,
    store: sessionStore ,
}))
//import routers
const pageRouter = require('./router/pageRouter')
const servicesRouter = require('./router/servicesRouter')
const authRouter = require('./router/authRouter')
//app router configuration
app.use('/privacypolicy',pageRouter)
app.use('/auth',authRouter)
app.use('/services',servicesRouter)
app.use(pageRouter)

//check developer settings 
//other variables
const httpPort = parseInt(process.env.PROD_DOOR)
//server creation
http.createServer(app).listen(httpPort)
