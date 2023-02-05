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
// ======================================================================
// CTRL FUNCTIONS =======================================================
// ======================================================================
// COOKING DATES -> ALL COOKING DATES ===================================
exports.allCookingCalendar = (req,res,next) => {
    returnObject.msg = 'No information returned from the database.'
    CookingCalendar.fetchAllData()
    .then(([data,meta])=> {
        if(data){
            returnObject.hasErrors = false
            returnObject.msg = null
            returnObject.data = {
                cookingCalendarStatus: data[0],
                cookigCalendar: sorter.sortCookingDates(data[1])}
            return res.json(returnObject)}
        returnObject.mgs = returnObject.msg
        return res.json(returnObject)})
    .catch(err => {
        console.log(err)
        returnObject.msg = returnObject.msg + err
        res.json(returnObject)})
}
// COOKING DATE -> UPDATE A COOKING DATE ================================
exports.updateCookingCalendarDate = (req,res,next)=>{
    console.log(req.body)
    function returnErroMessage(msg){
        returnObject.hasErrors = true
        returnObject.msg = msg
        res.json(returnObject)}
    const addressString = `${req.body.ccdStreet.replace(/\W/g,'+').toLowerCase()},${req.body.cctCity.toLowerCase()},${req.body.ccdState.toLowerCase()}`
    // console.log(addressString)
    // console.log(`http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_KEY}&location=${addressString}`)
    axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_KEY}&location=${addressString}`)
    .then(response => {
        var latitude = '', longitude = ''
        if(response.data.results.length > 0){
            if(response.data.results[0].locations.length >0){
                latitude = response.data.results[0].locations[0].latLng.lat
                longitude = response.data.results[0].locations[0].latLng.lng}}
        let cd = new CookingCalendar(parseInt(req.body.cookingDateId))
        cd.fetchById()
        .then(([data,meta])=>{
            if(data){
                var date = ''
                if(data.length>0){
                    date = data[0].cookingDate.split(' ')[0]}
                CookingCalendar.updateCookingDate(jsonObjectForUpdateCookingDate(req,data,latitude,longitude))
                .then(([data1,meta1])=>{
                    if(data1[1][0]['@returnCode']===-1){
                        return returnErroMessage(`Cooking date is not updatable anylonger.`)}
                    if(data1){
                        returnObject.hasErrors = false
                        returnObject.data = data1
                        const notifMsg = `The menu and/or address of ${date === '' ? 'a' : 'the'} KungfuBBQ event ${date===''? '' : 'on ' + date} changed! Please check it out.`
                        sendNotification.sendNotif(req,res,next,parseInt(req.body.cookingDateId),notifMsg,'subscribed','update')
                    }else {
                        return returnErroMessage(`It was not possible to udpate this cooking date`)}})
                .catch(err => {
                    console.log('updateCookingDate->',err)
                    return returnErroMessage(`It was not possible to udpate this cooking date. ${err}`)})
            }else{
                return returnErroMessage(`It could not retrives cooking date information from the database.`)}})
        .catch(err => {
            console.log('fetchById->', err)
            return returnErroMessage(`It could not retrieve cooking date information from the database. ${err}`)})})
    .catch(err => {
        console.log('axioRequest->',err)
        return returnErroMessage(`Could not save data to database. ${err}`)})
}
// COOKING DATE -> CREATE NEW COOKING DATE ==============================
exports.newCookingDate = (req,res,next) => {
    console.log(req.body)
    function returnErroMessage(msg){
        returnObject.hasErrors = true
        returnObject.msg = msg
        res.json(returnObject)}
    CookingCalendar.newCookingDate(parseInt(req.session.User.id),req.body.newDate)
    .then(([data1,meta1])=>{
        if(data1[1][0]['@returnCode']===0){
            returnObject.hasErrors = false
            returnObject.data = data1
            return res.json(returnObject)
        }else if(data1[1][0]['@returnCode']===-1) {
            return returnErroMessage(`There is already a cooking date event on ${req.body.newDate.split(' ')[0]}`)
        }else if(data1[1][0]['@returnCode']===-2) {
            return returnErroMessage(`Selected date for cooking date happens before than now. Not possible to create event in the past.`)}})
    .catch(err => {
        console.log(err)
        return returnErroMessage(`Could not save data to database. ${err}`)})
}
// COOKING DATE -> DELETE A COOKING DATE ================================
exports.deleteCookingCalendarDate = (req,res,next) => {
    function returnErroMessage(msg){
        returnObject.hasErrors = true
        returnObject.msg = msg
        res.json(returnObject)}
    CookingCalendar.deleteCoookingDate(parseInt(req.session.User.id),parseInt(req.body.cookingDate))
    .then(([data1,meta1])=>{
        console.log(data1)
        if(data1[1][0]['returnCode']===-2){
            return returnErroMessage(`Cooking date has active/paid/not delivered orders that must be reimbursed/delivered before deleting it.`)}
        if(data1){
            returnObject.hasErrors = false
            returnObject.data = data1
            return res.json(returnObject)}
        return returnErroMessage(`Could not delete cooking date.`)})
    .catch(err => {
        console.log(err)
        return returnErroMessage(`Could not delete cooking date. ${err}`)})
}
// COOKING DATE -> OPEN TO ORDERS ======================================
exports.openToOrders = (req,res,next) => {
    function returnErroMessage(msg){
        returnObject.hasErrors = true
        returnObject.msg = msg
        res.json(returnObject)}
    CookingCalendar.openToOrders(parseInt(req.session.User.id),parseInt(req.body.cookingDate))
    .then(([data1,meta1])=>{
        console.log(data1)
        if(data1[0]){
            if((data1[2][0])['@returnCode']===dbErrorReturnCode){
                return returnErroMessage(`Could not open to orders this cooking calendar date.`)}
            console.log(1)
            returnObject.hasErrors = false
            returnObject.data = data1
            var notifMsg = `Hey!!! The ${data1[0][0].cookingDate} event is open to orders. Check it out on the app's Calendar!`
            return sendNotification.sendNotif(req,res,next,parseInt(req.body.cookingDate),notifMsg,'all','openToOrders')}
            console.log(2)
        return returnErroMessage(`Could not open to orders this cooking calendar date.`)})
    .catch(err => {
        console.log('openToOrders-> ',err)
        return returnErroMessage(`Could not open to orders this cooking calendar date. ${err}`)})
}
// COOKING DATE -> OPEN TO ORDERS ======================================
exports.closeToOrders = (req,res,next) => {
    function returnErroMessage(msg){
        returnObject.hasErrors = true
        returnObject.msg = msg
        res.json(returnObject)}
    CookingCalendar.closeToOrders(parseInt(req.session.User.id),parseInt(req.body.cookingDate))
    .then(([data1,meta1])=>{
        if(data1){
            if((data1[1][0])['@returnCode']===dbErrorReturnCode){
                return returnErroMessage(`Could not close to orders this cooking calendar date.`)}
            returnObject.hasErrors = false
            returnObject.data = data1
            return res.json(returnObject)}
        return returnErroMessage(`Could not close to orders this cooking calendar date.`)})
    .catch(err => {
        console.log(err)
        return returnErroMessage(`Could not close to orders this cooking calendar date. ${err}`)})
}
// COOKING DATE -> FIRST ALERT ======================================
//choose how many meals will be cooked and send alert to the needed amount of users
exports.firstAlert = (req,res,next) => {
    console.log('firstAlert -> ',req.body)
    returnObject.msg= `Not possible to update the number of meals right now!`
    function returnErroMessage(msg){
        returnObject.hasErrors = true
        returnObject.msg = msg
        res.json(returnObject)}
    const cd = new CookingCalendar(req.body.cookingDateId,req.session.User.id,req.body.numberMeals)
    cd.updateMealsForThisCookingDate()
    .then(([data,meta])=>{
        console.log(`data is ----->`,data)
        if(data){
            cd.fetchById()
            .then(([cdInfo, cdInfoMeta])=>{
                if(cdInfo){
                    var msg =`Congrats! You made to kungfuBBQ list on ${cdInfo[0].cookingDate.split(' ')[0]}. You now have 24 hours to prepay your order and guaratee your meals! Please check it out.`
                    sendNotification.sendNotif(req,res,next,parseInt(req.body.cookingDateId),msg,'sorted')
                    // CookingCalendar.getUserIdsForNotification(req.body.cookingDateId,'sorted')
                    // .then(([notifArray,notifArrayMeta])=>{
                    //     if(notifArray[0].length>0){
                    //         var ids = []
                    //         notifArray[0].forEach(id =>{
                    //             ids.push(`${id.userId}`)})
                    //         const notif = new Notification(req.body.cookingDateId,`Congrats! You made to kungfuBBQ list on ${cdInfo[0].cookingDate.split(' ')[0]}. You now have 24 hours to prepay your order and guaratee your meals! Please check it out.`,req.session.User.id)
                    //         notif.saveNewNotification()
                    //         .then(([newNotif, newNotifMedta])=>{
                    //             notif.setId = parseInt(newNotif[1][0].notifID)
                    //             if(newNotif){
                    //                 sendNotification.sendNotification({ids:ids, msg:notif.message})
                    //                 .then(notifReturn=>{
                    //                     if(notifReturn){
                    //                         notif.increasesNotificationSequencer()
                    //                         .then(([increaser,increaserMeta])=>{
                    //                             returnObject.data = `Cooking date updated, and notifications were sent`
                    //                             return res.json(returnObject)
                    //                         })
                    //                         .catch(err=>{
                    //                             console.log('increaseNotificationSequencier -> ',err)
                    //                             return returnErroMessage(`Cooking date updated, notifications were sent. Minor error saving logs to database`)
                    //                         })
                    //                     }else{
                    //                         returnObject.data = `Cooking date updated, and notifications were NOT sent`
                    //                         return res.json(returnObject)
                    //                     }
                    //                 })
                    //                 .catch(err => {
                    //                     console.log('sendNotification->',err)
                    //                     return returnErroMessage(`Cooking date updated, and notifications were NOT sent`)
                    //                 })
                    //             }else{
                    //                 returnObject.data = `Cooking date updated. It was not possible to create a notification. Not notifications sent`
                    //                 return res.json(returnObject)
                    //             }
                    //         })
                    //         .catch(err =>{
                    //             console.log('saveNewNotification -> ',err)
                    //             return returnErroMessage(`Cooking date updated. It was not possible to create a notification. Not notifications sent`)
                    //         })
                    //     }else {
                    //         returnObject.data = `Cooking date updated.`
                    //         return res.json(returnObject)
                    //     }
                    // })
                    // .catch(err=> {
                    //     console.log('getUserIdsForNotificaiton->',err)
                    //     return returnErroMessage(`Cooking date updated. But there was a problem while trying to evaluate the need for notifications`)
                    // })
                }else{
                    return returnErroMessage(`Cooking date updated, but no notifications were sent. Not possible to retrieve cooking date information from database`)
                }
            })
            .catch(err => {
                console.log('fetchById -->',err)
                return returnErroMessage(`Cooking date updated, but no notifications were sent. Not possible to retrieve cooking date information from database`)
            })
        }else{
            return returnErroMessage(`Cooking date was not updated! No notifications sent.`)
        }
    })
    .catch(err => {
        console.log('updateCookingDate->',err)
        return returnErroMessage(`Cooking date was not updated! No notifications sent.`)
    })
    /*
    received { numberMeals: INT }
        1- set this value to cookingDates.mealsForThis
        2- there will be a procedure that will be executed from oldest to newest orders changing its status (in orders_list) to 3 and decresing from {numberMeals} the amount of meals that current order has. It will run untill the { numerMeals } reaches 0 or there are no more orders for that cookingDate. In the former case, those orders will have its status changed to 4.
        --------------------
        until here, code in nodejs. From down here code in mysql and script with curl for notifications
        --------------------
        3- The users whose orders are in status 3, will have 24 hours to acknowledge and confirm they still want their order. If they confirmf, these orders will move to status 5 else they will move to status 11. If they dont want it anymore, their order will be marked with status 6, and a new acknowledge request will be sent to some order in the pool of orders marked with 4. This procedure will run untill 48 hours before the cooking calendar date
        4- Every 24 hours, a procedure will run, and move those orders marked with 3 (see point 3 above) to 11. With the amount of meals that these orders status 11 freed, the procedure will send a new user acknowledge request to other orders in the pool of orders status 4. This procedure will run from the firstAlert until 48 hours before the cooking date.
        5- 24 hours before the cooking calendar date, all orders in the pool of orders marked with 4, will be moved to status 7.
        6- 24 hours before the cooking calendar date, all orders marked with 3, will be moved to status 7.
        7- 24 hours before the cooking calendar date, all orders marked with 5, will be moved to status 8.
    */
    //res.json({success: 'firstAlert'})
}
//send alert to users to pickup their orders
exports.secondAlert = (req,res,next) => {
    console.log('secondAlert')
    console.log(req.body)
    const returnObject = {
        hasErrors: false,
        data: null,
        msg: `Not possible to update the number of meals right now!`
    }
    function returnErroMessage(msg){
        returnObject.hasErrors = true
        returnObject.msg = msg
        res.json(returnObject)}
    const cd = new CookingCalendar(req.body.cookingDateId,req.session.User.id,req.body.numberMeals)
    cd.openToDelivery()
    .then(([opened,openedMeta])=>{
        if(opened){
            cd.fetchById()
            .then(([cdInfo, cdInfoMeta])=>{
                if(cdInfo){
                    CookingCalendar.getUserIdsForNotification(req.body.cookingDateId,'paid')
                    .then(([notifArray,notifArrayMeta])=>{
                        if(notifArray[0].length>0){
                            var ids = []
                            notifArray[0].forEach(id =>{
                                ids.push(`${id.userId}`)})
                            const notif = new Notification(req.body.cookingDateId,`Your order is ready. Please come pick it up.`,req.session.User.id)
                            notif.saveNewNotification()
                            .then(([newNotif, newNotifMedta])=>{
                                notif.setId = parseInt(newNotif[1][0].notifID)
                                if(newNotif){
                                    sendNotification.sendNotification({ids:ids, msg:notif.message})
                                    .then(notifReturn=>{
                                        notif.updateNotificationUserTable(ids)
                                        notif.increasesNotificationSequencer()
                                        if(notifReturn){
                                            returnObject.data = `Cooking date updated, and notifications were sent`
                                            return res.json(returnObject)
                                        }else{
                                            returnObject.data = `Cooking date updated, and notifications were NOT sent`
                                            return res.json(returnObject)}})
                                    .catch(err => {
                                        console.log('sendNotification->',err)
                                        return returnErroMessage(`Cooking date updated, and notifications were NOT sent`)})
                                }else{
                                    returnObject.data = `Cooking date updated. It was not possible to create a notification. Not notifications sent`
                                    return res.json(returnObject)}})
                            .catch(err =>{
                                console.log('saveNewNotification -> ',err)
                                return returnErroMessage(`Cooking date updated. It was not possible to create a notification. Not notifications sent`)})
                        }else {
                            returnObject.data = `Cooking date updated.`
                            return res.json(returnObject)}})
                    .catch(err=> {
                        console.log('getUserIdsForNotificaiton->',err)
                        return returnErroMessage(`Cooking date updated. But there was a problem while trying to evaluate the need for notifications`)})
                }else{
                    return returnErroMessage(`Cooking date updated, but no notifications were sent. Not possible to retrieve cooking date information from database`)}})
            .catch(err => {
                console.log('fetchById -->',err)
                return returnErroMessage(`Cooking date updated, but no notifications were sent. Not possible to retrieve cooking date information from database`)})
        }else{
            return returnErroMessage(`Not possible to open this cooking date to delivery.`)}})
    .catch(err => {
        console.log('openToDelivery->',err)
        return returnErroMessage(`Not possible to open this cooking date to delivery.`)})
    /*
    1- sends notifications to users
    2- changes orders status from 8 to 9
    3- changes cooking calendar date status from 7 to 8
    */
    //res.json({success: 'secondAlert'})
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
    data.forEach(reg => {
        cdDishes.push(reg.dish_id)
    })
    req.body.dishes.some(dish => {
        if(!cdDishes.includes(dish)){
            includeDishes.push(dish)
        }
    })
    cdDishes.some(dish => {
        if(!req.body.dishes.includes(dish)){
            console.log(dish)
            if(dish!==null){
                excludeDishes.push(dish)
            }
        }
    })
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
        userId: parseInt(req.session.User.id)
    })
}



