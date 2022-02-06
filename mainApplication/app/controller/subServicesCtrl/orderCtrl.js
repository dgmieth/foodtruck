//npm modules

//import modules
const Administrator = require(`../../../model/Administrator`)
const Developer = require('../../../model/Developer')
const User = require('../../../model/User')
const Order = require('../../../model/Order')
//supportFunctions
const datetimeFormatter = require('../supportFunctions/datetimeFormatter')
const invitationCodeGenerator = require('../supportFunctions/invitationCodeGenerator')
const sorter = require('../supportFunctions/sorter')
const sendNotification = require(`../supportFunctions/sendNotification`)
const returnObject = {
    hasErros: false,
    data: null,
    msg: null
}
// ======================================================================
// CTRL FUNCTIONS =======================================================
// ======================================================================
// COOKING DATES -> ALL COOKING DATES ===================================
exports.fetchOrdersForActiveFinishedCookingDates = (req,res,next) => {
    console.log('fetchOrdersForActiveFinishedCookingDates -> ')
    function returnErroMessage(msg){
        returnObject.hasErros = true
        returnObject.msg = msg
        res.json(returnObject)}
    Order.fetchOrdersForActiveFinishedCookingDates()
    .then(([data1,meta1])=>{
        if(!data1){
            return returnErroMessage(`Something went wrong while trying to retrieve orders from database.`)
        }else {
            const data = sorter.sortOrdersForActiveFinishedCookingDates(data1[0])
            if(!data){
                return returnErroMessage(`Could not sort data from database`)
            }else {
                returnObject.hasErros = false
                returnObject.data = data
                res.json(returnObject)}}})
    .catch(err=>{
        console.log(err)
        return returnErroMessage(`Something went wrong while trying to retrieve orders from database. ${err}`)})
}
//delete order in database
exports.deleteOrder = (req,res,next) => {
    console.log('deleteOrder -> ')
    console.log(req.body)
    function returnErroMessage(msg){
        returnObject.hasErros = true
        returnObject.msg = msg
        res.json(returnObject)}
    const order = new Order(req.body.orderId,req.session.User.id)
    order.deleteOrder()
    .then(([delOrder,delOrderM])=>{
        if(delOrder[1][0].returnCode===-2){
            return returnErroMessage(`This order has already been deleted.`)}
        if(delOrder[1][0].returnCode===-3){
            return returnErroMessage(`This order has already been paid. You cannot deleted.`)}
        Order.fetchOrdersForActiveFinishedCookingDates()
        .then(([orders,meta1])=>{
            if(!orders){
                return returnErroMessage(`Something went wrong while trying to retrieve orders from database.`)
            }else {
                const data = sorter.sortOrdersForActiveFinishedCookingDates(orders[0])
                if(!data){
                    return returnErroMessage(`Could not sort data from database`)
                }else {
                    returnObject.hasErros = false
                    returnObject.data = data
                    res.json(returnObject)}}})
        .catch(err=>{
            console.log(err)
            return returnErroMessage(`Something went wrong while trying to retrieve orders from database. ${err}`)})})
    .catch(err=>{
        console.log(err)
        return returnErroMessage(`Order could not be deleted. ${err}`)})
}
//deliver order
exports.deliverOrder = (req,res,next) => {
    console.log('deliverOrder -> ')
    console.log(req.body)
    function returnErroMessage(msg){
        returnObject.hasErros = true
        returnObject.msg = msg
        res.json(returnObject)}
    const order = new Order(req.body.orderId,req.session.User.id)
    order.deliverOrder()
    .then(([data,meta])=>{
        if(!data){
            return returnErroMessage(`Order could not be delivered.`)}
        Order.fetchOrdersForActiveFinishedCookingDates()
        .then(([data1,meta1])=>{
            if(!data1){
                return returnErroMessage(`Something went wrong while trying to retrieve orders from database`)
            }else {
                const data = sorter.sortOrdersForActiveFinishedCookingDates(data1[0])
                if(!data){
                    return returnErroMessage(`Could not sort data from database`)
                }else {
                    returnObject.hasErros = false
                    returnObject.data = data
                    res.json(returnObject)}}})
        .catch(err=>{
            console.log(err)
            return returnErroMessage(`Something went wrong while trying to retrieve orders from database. ${err}`)})})
    .catch(err=>{
        console.log(err)
        return returnErroMessage(`Order could not be delivered. ${err}`)})
}
//reimburse order
exports.reimburse = (req,res,next) =>{
    console.log('reimburse -> ')
    console.log(req.body)
    function returnErroMessage(msg){
        returnObject.hasErros = true
        returnObject.msg = msg
        res.json(returnObject)}
    const order = new Order(req.body.orderId,req.session.User.id)
    order.reimburseOrder()
    .then(([reimbOrder,reimbOrderMeta])=>{
        if(reimbOrder){
            returnObject.hasErros = false
            returnObject.msg = 'Order reimbursed'
            res.json(returnObject)
        }
        return returnErroMessage(`Order could not be reimbursed. ${err}`)})
    .catch(err=>{
        console.log('reimburedOrder -> ',err)
        return returnErroMessage(`Order could not be reimbursed. ${err}`)})
}