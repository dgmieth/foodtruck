//npm modules
const bcrypt = require('bcrypt')
//import modules
const Administrator = require(`../../model/Administrator`)
const Developer = require('../../model/Developer')
//subServicesCtrls
const userCtrl = require('./subServicesCtrl/userCtrl')
const cookingCalendarCtrl = require('./subServicesCtrl/cookingCalendarCtrl')
const orderCtrl = require(`./subServicesCtrl/orderCtrl`)
const dishesCtrl = require('./subServicesCtrl/dishesCtrl')
const catoringCtrl = require('./subServicesCtrl/catoringCtrl')
const notificationCtrl = require('./subServicesCtrl/notificationCtrl')
// ======================================================================
// DEVELOPER ============================================================
// ======================================================================
// UPDATE PASSWORD ======================================================
exports.updateDeveloper = (req,res,next) => {
    console.log(req.body)
    console.log(req.session.User)
    if(req.body.passwordNewConfirm!==req.body.passwordNew){
        return res.status(401).json({error: `Password and passowrd confirmation don't match`})
    }
    switch (req.body.updateType) {
        case "password":
            bcrypt.compare(req.body.passwordOld,req.session.User.password)
            .then(hashed => {
                if(hashed){
                    bcrypt.compare(req.body.passwordNewConfirm,req.session.User.password)
                    .then(hashed => {
                        if(hashed){
                            res.status(401).json({error: `New password is equal to current password`})
                        }else{
                            bcrypt.hash(req.body.passwordNew,parseInt(process.env.BCRYPT_ROUNDS))
                            .then(hashed => {
                                const developer= new Developer(req.session.User.email, req.session.User.id, req.session.User.password)
                                developer.password = hashed
                                req.session.User = developer
                                developer.save('password')
                                .then(([returnMsg,returnMsgMeta])=>{
                                    res.status(200).json({success:"Password updated"})})
                                .catch(err => {
                                    console.log('savePassowrd -> ',err)
                                    res.status(401).json({error: `Password couldnt be updated`})})})
                            .catch(err => {
                                console.log('brcypt ->'),err
                                res.status(401).json({error: `Password couldnt be encrypted`})})}})
                    .catch(err => {
                        console.log('bcrypt compare inner',err)
                        res.status(401).json({error: 'Password couldnt be decrypted'})})
                }else{
                    res.status(401).json({error: 'Incorrect user/password!'})}})
            .catch(err => {
                console.log('brcypt compare outter',err)
                res.status(401).json({error: 'Password couldnt be decrypted'})})
            break;
        default:
            break;
    }
}
// DEVELOPMENT INFORMATION ==============================================
exports.developingInformation = (req,res,next) => {
    var returnObj = {}
    Developer.openDevelopingHours()
    .then(([data,meta])=> {
        if(data[0][0].contador > 0){
            returnObj.hasOpenedRegister = true
        } else {
            returnObj.hasOpenedRegister = false}
        return Developer.returnAllDevelopmentRegisters()})
    .then(([data1,meta])=> {
        if(data1){
            returnObj.registers = data1[0]
            Developer.getMinutesWorked()
            .then(([data2,meta2])=> {
                totalMinutes = data2[0][0].minutes
                const hours =  parseInt(totalMinutes / 3600)
                var remainder = totalMinutes-(hours*3600)
                const mins = parseInt((remainder)/60)
                remainder = remainder - (mins * 60)
                const secs = remainder
                returnObj.time = {hours: hours, mins: mins,secs: secs}
                res.json(returnObj)})
            .catch(err => {
                console.log('getMinutesWorked',err)
                res.json({error:err})})}})
    .catch(err => {
        res.json({error:err})
        console.log('openDevelopingHours or returnAllDevelopmentRegisters', err)})
}
//updates information about development
exports.postStartEndDeveloping = (req,res,next)=>{
    if(!req.session.typeDev){
        return res.json({error: 'User is not a developer!'})
    }
    if(req.body.postType==='start'){
        Developer.inserStartDeveloping()
        .then(([data,meta])=> {
            if(data){
                res.json({success: 'Work started!'})
            }else {
                res.json({error: 'Operation couldnt be completed!'})}})
        .catch(err => {
            console.log('inserStartDeveloping',err)
            res.json({error: 'Operation couldnt be completed!'})})
    }else if(req.body.postType=='end'){
        Developer.updateOpenDeveloping(req.body.developmentDetails)
        .then(([data,meta])=> {
            if(data){
                res.json({success: 'Work finished!'})
            }else {
                res.json({error: 'Operation couldnt be completed!'})}})
        .catch(err => {
            console.log('updateOpenDeveloping',err)
            res.json({error: 'Operation couldnt be completed!'})})}
}
// ======================================================================
// ADMINISTRATOR ========================================================
// ======================================================================
// USER =================================================================
exports.allUsers = userCtrl.allUsers
exports.editedUserInfo = userCtrl.editedUserInfo
exports.deleteUserById = userCtrl.deleteUserById
exports.invitationCode = userCtrl.invitationCode
exports.updateUserAccesses = userCtrl.updateUserAccesses
// ======================================================================
// COOKING DATES ========================================================
exports.allCookingCalendar = cookingCalendarCtrl.allCookingCalendar
exports.updateCookingCalendarDate = cookingCalendarCtrl.updateCookingCalendarDate
exports.newCookingDate = cookingCalendarCtrl.newCookingDate
exports.deleteCookingCalendarDate = cookingCalendarCtrl.deleteCookingCalendarDate
exports.openToOrders = cookingCalendarCtrl.openToOrders
exports.closeToOrders = cookingCalendarCtrl.closeToOrders
exports.setCookingCapacity = cookingCalendarCtrl.setCookingCapacity
exports.initiateDelivery = cookingCalendarCtrl.initiateDelivery
// ======================================================================
// ORDERS ===============================================================
exports.fetchOrdersForActiveFinishedCookingDates = orderCtrl.fetchOrdersForActiveFinishedCookingDates
exports.deleteOrder = orderCtrl.deleteOrder
exports.deliverOrder = orderCtrl.deliverOrder
exports.reimburse = orderCtrl.reimburse
// ======================================================================
// DISHES ===============================================================
exports.fetchAllDishes = dishesCtrl.fetchAllDishes
exports.newDish = dishesCtrl.newDish
exports.editDish = dishesCtrl.editDish
exports.deleteDish = dishesCtrl.deleteDish
// ======================================================================
// CATORING =============================================================
exports.fetchAllMessages = catoringCtrl.fetchAllMessages
exports.readMessage = catoringCtrl.readMessage
exports.deleteMessage = catoringCtrl.deleteMessage
exports.archiveMessage = catoringCtrl.archiveMessage
// ======================================================================
// NOTIFICATION =========================================================
exports.sendNotification = notificationCtrl.sendNotification
exports.crontabNotification = notificationCtrl.crontabNotification
exports.sendNotifToAll = notificationCtrl.sendNotifToAll
// ======================================================================
// CRONTAB SERVER ROUTES =============================================================
exports.notifyNewUsersOnWaitingList = (req,res,next) => {
    console.log('server request arrived')
    res.json({succes: 'server request arrived'})
}
