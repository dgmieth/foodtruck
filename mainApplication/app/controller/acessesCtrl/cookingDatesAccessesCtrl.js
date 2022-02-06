//import modules
const Administrator = require(`../../../model/Administrator`)
const Developer = require(`../../../model/Developer`)
//custom functions
const checkAccesses = require('../supportFunctions/checkAccesses')
//custom return object
var returnObject = {
    hasErrors: true,
    data: null,
    msg: null
}
// ========================================================================================
// COOKING DATES ==========================================================================
// ========================================================================================
//fetch data
exports.allCookingCalendar = (req,res,next) => {
    console.log(process.env.COOKINGCALENDAR_FETCH_DATA.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.COOKINGCALENDAR_FETCH_DATA,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to fetch all cooking dates"
        return res.status(401).json(returnObject)
    }
}
//update CookingCalendarDate
exports.updateCookingCalendarDate = (req,res,next)=>{
    console.log(process.env.UPDATE_COOKING_CALENDAR_DATE.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.UPDATE_COOKING_CALENDAR_DATE,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to update cooking dates"
        return res.status(401).json(returnObject)
    }
}
//create newCookingDate
exports.newCookingDate = (req,res,next) => {
    console.log(process.env.CREATE_NEW_COOKING_CALENDAR_DATE.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.CREATE_NEW_COOKING_CALENDAR_DATE,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to create new cooking dates"
        return res.status(401).json(returnObject)
    }
}
//delete cooking calendar date
exports.deleteCookingCalendarDate = (req,res,next)=>{
    console.log(process.env.DELETE_COOKING_CALENDAR_DATE.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.DELETE_COOKING_CALENDAR_DATE,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to delete cooking dates"
        return res.status(401).json(returnObject)
    }
}
//open cooking calendar date to orders
exports.openToOrders = (req,res,next) =>{
    console.log(process.env.OPEN_TO_ORDERS_COOKING_CALENDAR_DATE.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.OPEN_TO_ORDERS_COOKING_CALENDAR_DATE,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to open cooking dates to orders"
        return res.status(401).json(returnObject)
    }
}
//close cooking calendar date to orders
exports.closeToOrders = (req,res,next) => {
    console.log(process.env.CLOSE_TO_ORDERS_COOKING_CALENDAR_DATE.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.CLOSE_TO_ORDERS_COOKING_CALENDAR_DATE,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to close cooking dates to orders"
        return res.status(401).json(returnObject)
    }
}
//choose how many meals will be cooked and send alert to the needed amount of users
exports.firstAlert = (req,res,next) => {
    console.log(process.env.COOKING_CALENDAR_COOKING_CAPACITY.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.COOKING_CALENDAR_COOKING_CAPACITY,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to set cooking capacity"
        return res.status(401).json(returnObject)
    }
}
//send alert to users to pickup their orders
exports.secondAlert = (req,res,next) => {
    console.log(process.env.COOKING_CALENDAR_START_DELIVERY.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.COOKING_CALENDAR_START_DELIVERY,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to open cooking dates to delivery"
        return res.status(401).json(returnObject)
    }
}