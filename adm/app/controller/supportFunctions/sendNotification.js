//npm modules
const axios = require('axios')
//modules
const Notification = require('../../../model/Notification')
const CookingCalendar = require('../../../model/CookingCalendar')
const Send = require('./sendNotification.js')//main function
//commong objects

exports.sendNotification = (data) => {
    const apiId = process.env.OSIGNAL_APP_ID 
    const apiKey = process.env.OSIGNAL_API_KEY
    console.log('sendNotif fucntion ->',data)
    return axios({
        method: 'post',
        headers: { 
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Basic ${apiKey}`
        },
        url: `https://onesignal.com:443/api/v1/notifications`,
        data:{
            app_id: `${apiId}`,
            contents: {"en": data.msg},
            channel_for_external_user_ids: "push",
            include_external_user_ids: data.ids
        }})
}

//send notification with msg 
exports.sendNotif = (req,res,next,cdId,notifMsg,notifType,cookingDateAction)=>{
    console.log('sendNotif')
    var returnObject = {
        hasErrors: false,
        data: null,
        msg: null}
    function returnErroMessage(msg){
        console.log('retunrErroMessage function called')
        returnObject.hasErrors = true
        returnObject.msg = msg
        res.json(returnObject)}
    var actionMsg = cookingDateAction === process.env.CD_UPDATE ? 'Cooking date updated' :
                    cookingDateAction === process.env.CD_NOTIFY_ALL ? 'Success' : 'Cooking date is open to orders'
    CookingCalendar.getUserIdsForNotification(cdId,notifType)
    .then(([notifArray,notifArrayMeta])=>{
        if(notifArray[0].length>0){
            var ids = []
            notifArray[0].forEach(id =>{    ids.push(`${id.userId}`)    })
            const notif = new Notification(cdId,notifMsg,req.session.User.id)
            notif.saveNewNotification()
            .then(([newNotif, newNotifMedta])=>{
                notif.setId = parseInt(newNotif[1][0].notifID)
                if(newNotif){
                    Send.sendNotification({ids:ids, msg:notif.message})
                    .then(notifReturn=>{
                        notif.updateNotificationUserTable(ids)
                        if(cookingDateAction===process.env.CD_FIRST_ALERT){     notif.increasesNotificationSequencer()  }
                        if(notifReturn.data.recipients>0){
                            returnObject.data = `${actionMsg}. Notifications were sent`
                            return res.json(returnObject)
                        }else{
                            returnObject.data = `${actionMsg}. Notifications were NOT sent`
                            return res.json(returnObject)   }  })
                    .catch(err => {
                        console.log('sendNotification->',err)
                        return returnErroMessage(`${actionMsg}. Notifications were NOT sent`)})
                }else{
                    returnObject.data = `${actionMsg}. It was not possible to create a notification. No notifications sent`
                    return res.json(returnObject)   }   })
            .catch(err =>{
                console.log('saveNewNotification -> ',err)
                return returnErroMessage(`${actionMsg}. It was not possible to create a notification. No notifications sent`)})
        }else {
            returnObject.data = `${actionMsg}. No users to notify.`
            return res.json(returnObject)   }   })
    .catch(err=> {
        console.log('getUserIdsForNotificaiton->',err)
        return returnErroMessage(`${actionMsg}. But there was a problem while trying to evaluate the need for notifications`)   })
}
