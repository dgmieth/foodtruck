
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
// CATORING ===============================================================================
// ========================================================================================
//get all messages
exports.fetchReadMessages = (req,res,next) => {
    console.log(process.env.CATORING_FETCH_READ_MESSAGES.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.CATORING_FETCH_READ_MESSAGES,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to fetch all catering messages"
        return res.status(401).json(returnObject)
    }
}
// //readMessage
// exports.readMessage = (req,res,next) => {
//     console.log(process.env.CATORING_READ_MESSAGE.split(','))
//     console.log(req.session.accesses)
//     if(checkAccesses.checkUserAccess(process.env.CATORING_READ_MESSAGE,req)){
//         console.log('1-> hasAccess')
//         next()
//     }else{
//         returnObject.msg = "User does not have permission to read catering messages"
//         return res.status(401).json(returnObject)
//     }
// }
//deleteMessage
exports.deleteMessage = (req,res,next) => {
    console.log(process.env.CATORING_DELETE_MESSAGE.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.CATORING_DELETE_MESSAGE,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to delete catering messages"
        return res.status(401).json(returnObject)
    }
}
//archiveMessage
exports.archiveMessage = (req,res,next) => {
    console.log(process.env.CATORING_ARCHIVE_MESSAGE.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.CATORING_ARCHIVE_MESSAGE,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to archive catering messages"
        return res.status(401).json(returnObject)
    }
}