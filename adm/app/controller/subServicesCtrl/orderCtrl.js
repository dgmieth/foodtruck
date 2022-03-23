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
    msg: null   }
function returnErroMessage(msg,res){
    returnObject.hasErrors = true
    returnObject.msg = msg
    res.json(returnObject)  }
// ======================================================================
// CTRL FUNCTIONS =======================================================
// ======================================================================
// COOKING DATES -> ALL COOKING DATES ===================================
exports.fetchOrdersForActiveFinishedCookingDates = (req,res,next) => {
    console.log('fetchOrdersForActiveFinishedCookingDates -> ')
    Order.fetchOrdersForActiveFinishedCookingDates()
    .then(([data1,meta1])=>{
        // console.log(data1)
        if(!data1){
            return returnErroMessage(`Something went wrong while trying to retrieve orders from database.`,res)
        }else {
            const data = sorter.sortOrdersForActiveFinishedCookingDates(data1[0])
            if(!data){
                return returnErroMessage(`Could not sort data from database`,res)
            }else {
                returnObject.hasErros = false
                returnObject.data = data
                res.json(returnObject)} }   })
    .catch(err=>{
        console.log(err)
        return returnErroMessage(`Something went wrong while trying to retrieve orders from database. ${err}`,res)  })
}
//delete order in database
exports.deleteOrder = (req,res,next) => {
    console.log('deleteOrder -> ')
    console.log(req.body)
    const order = new Order(req.body.orderId,req.session.User.id)
    order.deleteOrder()
    .then(([delOrder,delOrderM])=>{
        console.log(delOrder[1][0])
        if(delOrder[1][0].returnCode===-2){
            return returnErroMessage(`This order has already been deleted.`,res)    }
        if(delOrder[1][0].returnCode===-3){
            return returnErroMessage(`This order has already been paid. You cannot deleted.`,res)   }
        if(delOrder[1][0].returnCode===-4){
            return returnErroMessage(`This order cannot be updated on this screen anymore. You'll be redirected to the calendar`,res)   }
        Order.fetchOrdersForActiveFinishedCookingDates()
        .then(([orders,meta1])=>{
            if(!orders){
                return returnErroMessage(`Something went wrong while trying to retrieve orders from database.`,res)
            }else{
                const data = sorter.sortOrdersForActiveFinishedCookingDates(orders[0])
                if(!data){
                    return returnErroMessage(`Could not sort data from database`,res)
                }else {
                    returnObject.hasErros = false
                    returnObject.data = data
                    res.json(returnObject)  }   }   })
        .catch(err=>{
            console.log(err)
            return returnErroMessage(`Something went wrong while trying to retrieve orders from database. ${err}`,res)  })  })
    .catch(err=>{
        console.log(err)
        return returnErroMessage(`Order could not be deleted. ${err}`,res)  })
}
//deliver order
exports.deliverOrder = (req,res,next) => {
    console.log('deliverOrder -> ')
    console.log(req.body)
    const order = new Order(req.body.orderId,req.session.User.id)
    order.deliverOrder()
    .then(([data,meta])=>{
        if(!data){
            return returnErroMessage(`Order could not be delivered.`,res)   }
        Order.fetchOrdersForActiveFinishedCookingDates()
        .then(([data1,meta1])=>{
            if(!data1){
                return returnErroMessage(`Something went wrong while trying to retrieve orders from database`,res)
            }else {
                const data = sorter.sortOrdersForActiveFinishedCookingDates(data1[0])
                if(!data){
                    return returnErroMessage(`Could not sort data from database`,res)
                }else {
                    returnObject.hasErros = false
                    returnObject.data = data
                    res.json(returnObject)  }   }   })
        .catch(err=>{
            console.log(err)
            return returnErroMessage(`Something went wrong while trying to retrieve orders from database. ${err}`,res)  })  })
    .catch(err=>{
        console.log(err)
        return returnErroMessage(`Order could not be delivered. ${err}`,res)    })
}
//reimburse order
exports.reimburse = (req,res,next) =>{
    console.log('reimburse -> ')
    console.log(req.body)
    const order = new Order(req.body.orderId,req.session.User.id)
    order.setReimburseTip = req.body.reimburseTip
    order.reimburseOrder()
    .then(([reimbOrder,reimbOrderMeta])=>{
        console.log(reimbOrder)
        if(reimbOrder){
            returnObject.hasErros = false
            returnObject.msg = 'Order reimbursed'
            res.json(returnObject)  
        }else{
        return returnErroMessage(`Order could not be reimbursed.`,res)  }  })
    .catch(err=>{
        console.log('reimburedOrder -> ',err)
        return returnErroMessage(`Order could not be reimbursed. ${err}`,res)   })
}