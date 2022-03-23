
//import modules
const Administrator = require(`../../../model/Administrator`)
const Developer = require(`../../../model/Developer`)
//custom functions
const destroySession = require('../supportFunctions/destroySession')
const checkAccesses = require('../supportFunctions/checkAccesses')
//custom return object
var returnObject = {
    hasErrors: true,
    data: null,
    msg: null
}
// ========================================================================================
// ORDER ==================================================================================
// ========================================================================================
//fetch orders
exports.fetchOrdersForActiveFinishedCookingDates = (req,res,next) => {
    console.log(process.env.ORDER_FETCH_ORDERS.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.ORDER_FETCH_ORDERS,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to fetch orders"
        return res.status(401).json(returnObject)
    }
}
//delete order
exports.deleteOrder = (req,res,next) => {
    console.log(process.env.ORDER_DELETE_ORDER.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.ORDER_DELETE_ORDER,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to delete orders"
        return res.status(401).json(returnObject)
    }
}
//delivere order 
exports.deliverOrder = (req,res,next) => {
    console.log(process.env.ORDER_DELIVER_ORDER.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.ORDER_DELIVER_ORDER,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to deliver orders"
        return res.status(401).json(returnObject)
    }
}