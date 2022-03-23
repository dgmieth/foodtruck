//npm modules
const axios = require('axios')
//import modules
const CookingCalendar = require('../../../model/CookingCalendar')
const Notification = require('../../../model/Notification')
//supportFunctions
const sorter = require('../supportFunctions/sorter')
const sendNotification = require('../supportFunctions/sendNotification')
//other variables
const dbErrorReturnCode = parseInt(process.env.DB_ERROR_RETURN_CODE_STATUS)
//return object
const returnObject = {
    hasErrors: false,
    data: null,
    msg: null}
function returnErroMessage(msg,res){
    returnObject.hasErrors = true
    returnObject.msg = msg
    res.json(returnObject)}
// ======================================================================
// CTRL FUNCTIONS =======================================================
// ======================================================================
// COOKING DATES -> ALL COOKING DATES ===================================
exports.allCookingCalendar = (req,res,next) => {
    CookingCalendar.fetchAllData()
    .then(([data,meta])=> {
        if(data){
            returnObject.hasErrors = false
            returnObject.msg = null
            returnObject.data = {
                cookingCalendarStatus: data[0],
                cookigCalendar: sorter.sortCookingDates(data[1])        }
            return res.json(returnObject)       }
        returnObject.mgs = 'No information returned from the database.'
        return res.json(returnObject)})
    .catch(err => {
        console.log(err)
        return returnErroMessage(`Not possible to retrieve information from database. ${err}`,res)      })
}
// COOKING DATE -> UPDATE A COOKING DATE ================================
exports.updateCookingCalendarDate = (req,res,next)=>{
    console.log(req.body)
    const addressString = `${req.body.ccdStreet.replace(/\W/g,'+').toLowerCase()},${req.body.cctCity.toLowerCase()},${req.body.ccdState.toLowerCase()}`
    axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_KEY}&location=${addressString}`)
    .then(response => {
        var latitude = '', longitude = ''
        if(response.data.results.length > 0){
            if(response.data.results[0].locations.length >0){
                latitude = response.data.results[0].locations[0].latLng.lat
                longitude = response.data.results[0].locations[0].latLng.lng    }   }
        let cd = new CookingCalendar(parseInt(req.body.cookingDateId))
        cd.fetchById()
        .then(([dataCd,meta])=>{
            const data = dataCd[0]
            if(data){
                var date = ''
                if(data.length>0){
                    date = data[0].cookingDate.split(' ')[0]}
                CookingCalendar.updateCookingDate(jsonObjectForUpdateCookingDate(req,data,latitude,longitude))
                .then(([data1,meta1])=>{
                    console.log(data1)
                    if(data1[2][0]['@returnCode']===-2){
                        return returnErroMessage(`Cooking date is not updatable anylonger.`,res)    }
                    if(data1[2][0]['@returnCode']===-3){
                        return returnErroMessage(`Server: you must include at least one dish that is not First come First served.`,res) }
                    if(data1[0][0].cdStatus<=3){
                        returnObject.mgs = 'Cooking event updated.'
                        returnObject.data = 'Cooking event updated.'
                        return res.json(returnObject)
                    }
                    if(data1){
                        returnObject.hasErrors = false
                        returnObject.data = data1
                        const notifMsg = `The menu and/or address of ${date === '' ? 'a' : 'the'} KungfuBBQ event ${date===''? '' : 'on ' + date} changed! Please check it out.`
                        sendNotification.sendNotif(req,res,next,parseInt(req.body.cookingDateId),notifMsg,'subscribed','update')
                    }else {
                        return returnErroMessage(`It was not possible to udpate this cooking date`,res) }   })
                .catch(err => {
                    console.log('updateCookingDate->',err)
                    return returnErroMessage(`It was not possible to udpate this cooking date. ${err}`,res)     })
            }else{
                return returnErroMessage(`It could not retrives cooking date information from the database.`,res)   }   })
        .catch(err => {
            console.log('fetchById->', err)
            return returnErroMessage(`It could not retrieve cooking date information from the database. ${err}`,res)    })  })
    .catch(err => {
        console.log('axioRequest->',err)
        return returnErroMessage(`Could not save data to database. ${err}`,res)     })
}
// COOKING DATE -> CREATE NEW COOKING DATE ==============================
exports.newCookingDate = (req,res,next) => {
    console.log(req.body)
    console.log(new Date().getHours())
    CookingCalendar.newCookingDate(parseInt(req.session.User.id),req.body.newDate,req.body.now)
    .then(([data1,meta1])=>{
        if(data1[1][0]['@returnCode']===0){
            returnObject.hasErrors = false
            returnObject.data = data1
            return res.json(returnObject)
        }else if(data1[1][0]['@returnCode']===-1) {
            return returnErroMessage(`There is already a cooking date event on ${req.body.newDate.split(' ')[0]}`,res)
        }else if(data1[1][0]['@returnCode']===-2) {
            return returnErroMessage(`Selected date for cooking date happens before than now. Not possible to create event in the past.`,res)   }   })
    .catch(err => {
        console.log(err)
        return returnErroMessage(`Could not save data to database. ${err}`,res)     })
}
// COOKING DATE -> DELETE A COOKING DATE ================================
exports.deleteCookingCalendarDate = (req,res,next) => {
    CookingCalendar.deleteCoookingDate(parseInt(req.session.User.id),parseInt(req.body.cookingDate))
    .then(([data1,meta1])=>{
        console.log(data1)
        if(data1[1][0]['returnCode']===-2){
            return returnErroMessage(`Cooking date has active/paid/not delivered orders that must be reimbursed/delivered before deleting it.`,res) }
        if(data1){
            returnObject.hasErrors = false
            returnObject.data = data1
            return res.json(returnObject)}
        return returnErroMessage(`Could not delete cooking date.`,res)  })
    .catch(err => {
        console.log(err)
        return returnErroMessage(`Could not delete cooking date. ${err}`,res)   })
}
// COOKING DATE -> OPEN TO ORDERS ======================================
exports.openToOrders = (req,res,next) => {
    CookingCalendar.openToOrders(parseInt(req.session.User.id),parseInt(req.body.cookingDate))
    .then(([data1,meta1])=>{
        console.log(data1)
        if(data1[0]){
            if((data1[2][0])['@returnCode']===-2){   
                return returnErroMessage(`Could not open to orders this cooking calendar date.`,res)    }
                if((data1[2][0])['@returnCode']===-3){   
                    return returnErroMessage(`Cooking date does not have at least ONE dish not 'First come first served.`,res)    }
            var notifMsg = `Hey!!! The ${data1[0][0].cookingDate} event is open to orders. Check it out on the app's Calendar!`
            return sendNotification.sendNotif(req,res,next,parseInt(req.body.cookingDate),notifMsg,process.env.CD_ALL,process.env.CD_OPEN_TO_ORDERS)    }
        return returnErroMessage(`Could not open to orders this cooking calendar date.`,res)    })
    .catch(err => {
        console.log(err)
        return returnErroMessage(`Could not open to orders this cooking calendar date. ${err}`,res) })
}
// COOKING DATE -> OPEN TO ORDERS ======================================
exports.closeToOrders = (req,res,next) => {
    CookingCalendar.closeToOrders(parseInt(req.session.User.id),parseInt(req.body.cookingDate))
    .then(([data1,meta1])=>{
        if(data1){
            if((data1[1][0])['@returnCode']===dbErrorReturnCode){   return returnErroMessage(`Could not close to orders this cooking calendar date.`,res)   }
            returnObject.hasErrors = false
            returnObject.data = data1
            return res.json(returnObject)}
        return returnErroMessage(`Could not close to orders this cooking calendar date.`,res)   })
    .catch(err => {
        console.log(err)
        return returnErroMessage(`Could not close to orders this cooking calendar date. ${err}`,res)    })
}
// COOKING DATE -> FIRST ALERT ======================================
//choose how many meals will be cooked and send alert to the needed amount of users
exports.setCookingCapacity = (req,res,next) => {
    console.log('setCookingCapacity -> ',req.body)
    const cd = new CookingCalendar(req.body.cookingDateId,req.session.User.id,req.body.numberMeals)
    cd.setCookingCapacity()
    .then(([data,meta])=>{
        const validate = data[1][0].returnCode
        if(validate===-2){
            return returnErroMessage(`Not possible to set cooking capacity. Cooking event must have at least one NOT first come first served dish.`,res)    }
        if(data){
            cd.fetchById()
            .then(([dataCd, cdInfoMeta])=>{
                const cdInfo = dataCd[0]
                if(cdInfo){
                    var msg =`Congrats! You made to kungfuBBQ list on ${cdInfo[0].cookingDate.split(' ')[0]}. You now have 24 hours to prepay your order and guaratee your meals! Please check it out.`
                    sendNotification.sendNotif(req,res,next,parseInt(req.body.cookingDateId),msg,process.env.CD_SORTED,process.env.CD_FIRST_ALERT)
                }else{
                    return returnErroMessage(`Cooking date updated, but no notifications were sent. Not possible to retrieve cooking date information from database`,res)   }})
            .catch(err => {
                console.log('fetchById -->',err)
                return returnErroMessage(`Cooking date updated, but no notifications were sent. Not possible to retrieve cooking date information from database`,res)   })
        }else{
            return returnErroMessage(`Cooking date was not updated! No notifications sent.`,res)    }   })
    .catch(err => {
        console.log('updateCookingDate->',err)
        return returnErroMessage(`Cooking date was not updated! No notifications sent.`,res)    })
}
// COOKING DATE -> SECOND ALERT ======================================
//send alert to users to pickup their orders
exports.initiateDelivery = (req,res,next) => {
    console.log('initiateDelivery')
    // returnObject.msg= `Not possible to update the number of meals right now!`
    const cd = new CookingCalendar(req.body.cookingDateId,req.session.User.id,req.body.numberMeals)
    cd.initiateDelivery()
    .then(([opened,openedMeta])=>{
        const validate = opened[1][0].returnCode
        if(validate===-2){
        return returnErroMessage(`This order is not in a status that allows initiating delivery.`,res)    }
        if(validate===-3){
            return returnErroMessage(`Not possible to set cooking capacity. Cooking event must have at least one NOT first come first served dish.`,res)    }
        if(opened){
            cd.fetchById()
            .then(([dataCd, cdInfoMeta])=>{
                const cdInfo = dataCd[0]
                if(cdInfo){
                    var msg =`Your order is ready. Please come pick it up.`
                    sendNotification.sendNotif(req,res,next,parseInt(req.body.cookingDateId),msg,process.env.CD_PAID,process.env.CD_PAID)
                }else{
                    return returnErroMessage(`Cooking date updated, but no notifications were sent. Not possible to retrieve cooking date information from database`,res)   }   })
                // if(cdInfo){
                    // CookingCalendar.getUserIdsForNotification(req.body.cookingDateId,process.env.CD_PAID)
                    // .then(([notifArray,notifArrayMeta])=>{
                    //     if(notifArray[0].length>0){
                    //         var ids = []
                    //         notifArray[0].forEach(id =>{ids.push(`${id.userId}`)})
                    //         const notif = new Notification(req.body.cookingDateId,`Your order is ready. Please come pick it up.`,req.session.User.id)
                    //         notif.saveNewNotification()
                    //         .then(([newNotif, newNotifMedta])=>{
                    //             notif.setId = parseInt(newNotif[1][0].notifID)
                    //             if(newNotif){
                    //                 sendNotification.sendNotification({ids:ids, msg:notif.message})
                    //                 .then(notifReturn=>{
                    //                     notif.updateNotificationUserTable(ids)
                    //                     //notif.increasesNotificationSequencer()
                    //                     if(notifReturn){
                    //                         returnObject.data = `Cooking date updated, and notifications were sent`
                    //                         return res.json(returnObject)
                    //                     }else{
                    //                         returnObject.data = `Cooking date updated, and notifications were NOT sent`
                    //                         return res.json(returnObject)}})
                    //                 .catch(err => {
                    //                     console.log('sendNotification->',err)
                    //                     return returnErroMessage(`Cooking date updated, and notifications were NOT sent`)})
                    //             }else{
                    //                 returnObject.data = `Cooking date updated. It was not possible to create a notification. Not notifications sent`
                    //                 return res.json(returnObject)}})
                    //         .catch(err =>{
                    //             console.log('saveNewNotification -> ',err)
                    //             return returnErroMessage(`Cooking date updated. It was not possible to create a notification. Not notifications sent`)})
                    //     }else {
                    //         returnObject.data = `Cooking date updated.`
                    //         return res.json(returnObject)}})
                    // .catch(err=> {
                    //     console.log('getUserIdsForNotificaiton->',err)
                    //     return returnErroMessage(`Cooking date updated. But there was a problem while trying to evaluate the need for notifications`)})
                // }else{
                //     return returnErroMessage(`Cooking date updated, but no notifications were sent. Not possible to retrieve cooking date information from database`)}})
            .catch(err => {
                console.log('fetchById -->',err)
                return returnErroMessage(`Cooking date updated, but no notifications were sent. Not possible to retrieve cooking date information from database`,res)   })
        }else{
            return returnErroMessage(`Not possible to open this cooking date to delivery.`,res) }   })
    .catch(err => {
        console.log('initiateDelivery->',err)
        return returnErroMessage(`Not possible to open this cooking date to delivery.`,res) })
}
/*
    ==========================================================================================================================
                            CODE REFACTORING ----> SUPPORT FUNCTIONS
    ==========================================================================================================================
*/
function jsonObjectForUpdateCookingDate(req,data,latitude,longitude){
    var cdDishes = []
    var includeDishes = []
    var excludeDishes = []
    data.forEach(reg => {   cdDishes.push(reg.dish_id)  })
    req.body.dishes.some(dish => {  if(!cdDishes.includes(dish)){   includeDishes.push(dish)    }   })
    cdDishes.some(dish => {     if(!req.body.dishes.includes(dish)){    if(dish!==null){    excludeDishes.push(dish)    }   }   })
    return JSON.stringify({
        ccdStreet: req.body.ccdStreet,
        ccdComplement: req.body.ccdComplement === null ||req.body.ccdComplement === '' ? '' : req.body.ccdComplement ,
        cctCity: req.body.cctCity,
        ccdState: req.body.ccdState,
        ccdCountry: req.body.ccdCountry  === null ||req.body.ccdCountry === '' ? '' : req.body.ccdCountry,
        ccdZipcode: req.body.ccdZipcode  === null ||req.body.ccdZipcode === '' ? '' : req.body.ccdZipcode,
        includeDishes: includeDishes,
        excludeDishes: excludeDishes,
        cookingDateId: req.body.cookingDateId,
        lat: latitude,
        lng: longitude,
        userId: parseInt(req.session.User.id)   })
}



