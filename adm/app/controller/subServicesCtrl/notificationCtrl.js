//npm modules
const cron = require('node-cron')
//import modules
const { count } = require('console')
const e = require('express')
const { userInfo } = require('os')
const Notification = require('../../../model/Notification')
const CookingCalendar = require('../../../model/CookingCalendar')
//supportFunctions
const sendNotification = require(`../supportFunctions/sendNotification`)
//return object
var returnObject = {
    hasErrors: true,
    data: null,
    msg: null   }
function returnErroMessage(msg,res){
    returnObject.hasErrors = true
    returnObject.msg = msg
    res.json(returnObject)  }
// ======================================================================
// CATORING FUNCTIONS ===================================================
// ======================================================================
// FETCHING ALL MESSAGES ================================================
exports.sendNotification = (req,res,next)=>{   
    if(!req.body.userId||!req.body.messageToUser||req.body.messageToUser===``){
        returnObject.msg = `You must inform the userId and the message to send to the user`
        return res.json(returnObject)
    }
    var idArray = [`${req.body.userId}`]
    var notif = new Notification(null,req.body.messageToUser,req.session.User.id)
    notif.saveNewNotification()
    .then(([newNotif, newNotifMeta])=>{
        notif.setId = parseInt(newNotif[1][0].notifID)
        sendNotification.sendNotification({ids: idArray, msg: req.body.messageToUser})
        .then(response => {
            console.log(response)
            if(response.data.recipients===0){
                return returnErroMessage(`This user hasn't logged in recently, so the notification system cannot find its device id`,res)
            }else{
                notif.updateNotificationUserTable(idArray)
                .then(([updatedReturn, updatedReturnMeta])=>{
                    const counter = updatedReturn[1][0].msgCounter
                    returnObject.hasErrors = false
                    returnObject.msg = `${counter} message sent successfully`
                    return res.json(returnObject)})
                .catch(err => {        
                    console.log('error-> ', err)
                    return returnErroMessage(`Message(s) sent successfully, but it was not possible to relate notification and users in the database. ${err}`,res)  })  }   })
        .catch(err => {        
            console.log('error-> ', err)
            return returnErroMessage(`The attempt to send a notification to this user failed with server message: ${err}`,res)  })  })
    .catch(err => {
        console.log(err)
        return returnErroMessage(`The attempt to create the notification to the database failed with server error message: ${err}`,res)     })
}
//send notification to all subscribed users to a cooking date
exports.sendNotifToAll = (req,res,next)=>{
    console.log(req.body)
    function returnErroMessage(msg){
        returnObject.hasErrors = true
        returnObject.msg = msg
        res.json(returnObject)}
    const cd = new CookingCalendar(req.body.cookingDateId,req.session.User.id,0)
    cd.fetchById()
    .then(([dataCd, cdInfoMeta])=>{
        const cdInfo = dataCd[0]
        if(cdInfo){
            var idsForOrders = process.env.CD_SUBSCRIBED
            if(cdInfo.length>0){    if(cdInfo[0].cookingDate_status_id>=8){ idsForOrders = proces.env.CD_PAID   }  }

            var msg =  req.body.msgToUser
            sendNotification.sendNotif(req,res,next,parseInt(req.body.cookingDateId),msg,idsForOrders,process.env.CD_NOTIFY_ALL)

            // CookingCalendar.getUserIdsForNotification(req.body.cookingDateId,idsForOrders)
            // .then(([notifArray,notifArrayMeta])=>{
            //     if(notifArray[0].length>0){
            //         var ids = []
            //         notifArray[0].forEach(id =>{
            //             ids.push(`${id.userId}`)})
            //         const notif = new Notification(req.body.cookingDateId,req.body.msgToUser,req.session.User.id)
            //         notif.saveNewNotification()
            //         .then(([newNotif, newNotifMedta])=>{
            //             notif.setId = parseInt(newNotif[1][0].notifID)
            //             if(newNotif){
            //                 sendNotification.sendNotification({ids:ids, msg:notif.message})
            //                 .then(notifReturn=>{
            //                     notif.updateNotificationUserTable(ids)
            //                     if(notifReturn){
            //                         returnObject.msg = `Messages sent`
            //                         return res.json(returnObject)
            //                     }else{
            //                         returnObject.msg = `Messages sent, but messages could not be saved to database`
            //                         return res.json(returnObject)}})
            //                 .catch(err => {
            //                     console.log('sendNotification->',err)
            //                     return returnErroMessage(`Notifications sent, but message could not be saved to database`)})
            //             }else{
            //                 returnObject.msg = `Notifications could not be created.`
            //                 return res.json(returnObject)}})
            //         .catch(err =>{
            //             console.log('saveNewNotification -> ',err)
            //             return returnErroMessage(`Notifications could not be created`)})
            //     }else {
            //         returnObject.msg = `User information could not be retrieved. No notifications were sent.`
            //         return res.json(returnObject)}})
            // .catch(err=> {
            //     console.log('getUserIdsForNotificaiton->',err)
            //     return returnErroMessage(`User information could not be retrieved. No notifications were sent.`)})
        }else{
            return returnErroMessage(`Cooking date information could not be retrieved. No notifications were sent.`, res)}})
    .catch(err => {
        console.log('fetchById -->',err)
        return returnErroMessage(`Cooking date information could not be retrieved. No notifications were sent.`, res)})
}
// =====================================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================
//cron schedule
// =====================================================================================
//first notification is sent at 8:15am
cron.schedule('0 15 8 * * *', () => {
    console.log('')
    sendCronNotif(`notifNumber_08:15`)
}, {
scheduled: true,
timezone: "America/New_York"
});
//first notification is sent at 2:15pm
cron.schedule('0 15 14 * * *', () => {
    sendCronNotif(`notifNumber_14:15`)
}, {
scheduled: true,
timezone: "America/New_York"
});
//first notification is sent at 6:15pm
cron.schedule('0 15 18 * * *', () => {
    sendCronNotif(`notifNumber_18:15`)
}, {
scheduled: true,
timezone: "America/New_York"
});

//function to send cron notification
function sendCronNotif(cronScheduler,req,res,next){
    console.log(cronScheduler)
    var counter = 0
    Notification.adm_GetIdsAndMsgForCrontabCurlRequest()
    .then(([idsMsgs,idsMsgsMeta])=>{
        if(idsMsgs[0].length===0){  return console.log({noMessages:`no messages to be sent`})   }
        idsMsgs[0].forEach(info=>{
            var notif = new Notification(null,info.msg,3)
            notif.saveNewNotification()
            .then(([newNotif, newNotifMeta])=>{
                notif.setId = parseInt(newNotif[1][0].notifID)
                sendNotification.sendNotification({ids: [`${info.user_id}`], msg: info.msg})
                .then(response => {
                    notif.updateNotificationUserTable([`${info.user_id}`])
                    .then(([updatedReturn, updatedReturnMeta])=>{
                        notif.setCookingDate = info.cookingDates_id
                        notif.increasesNotificationSequencerSpecificOrder(info.order_id)
                        .then(([increased, increasedMeta])=>{
                            counter += 1
                            if(counter === idsMsgs[0].length){  return console.log({success:`all messages sent (${counter})`})
                            }else{  return console.log({noMessages:`no messages to be sent`})   }   })
                        .catch(err => {
                            console.log('notificationIncreaser->',err)})    })
                    .catch(err => {        
                        console.log('updateNotificationuserTable-> ', err)  })  })
                .catch(err => {        
                    console.log('sendNotif-> ', err)    })  })
            .catch(err => {        
                console.log('saveNotif-> ', err)    })  })  })
    .catch(err=>{
        console.log('adm_GetIdsAndMsgForCrontabCurlRequest->',err)
        return ({error:'nothing was sent'}) })
}