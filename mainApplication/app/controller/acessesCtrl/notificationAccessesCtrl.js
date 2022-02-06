//import modules

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
exports.sendNotification = (req,res,next) => {
    console.log(process.env.NOTIFICATION_SEND.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.NOTIFICATION_SEND,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to send notification"
        return res.status(401).json(returnObject)
    }
}
//send notif to all
exports.sendNotifToAll = (req,res,next)=>{
    console.log(process.env.SEND_NOTIF_TO_ALL.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.SEND_NOTIF_TO_ALL,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to send notification to all or to all paid"
        return res.status(401).json(returnObject)
    }
}
