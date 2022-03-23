//npm modules

//import modules
const Administrator = require(`../../../model/Administrator`)
const Developer = require('../../../model/Developer')
const User = require('../../../model/User')
const CatoringMessage = require('../../../model/CatoringMessage')
//supportFunctions
const sorter = require('../supportFunctions/sorter')
const returnObject = {
    hasErrors: false,
    data: null,
    msg: null}
function returnErroMessage(msg,res){
    returnObject.hasErrors = true
    returnObject.msg = msg
    res.json(returnObject)}
// ======================================================================
// CATORING FUNCTIONS ===================================================
// ======================================================================
// FETCHING ALL MESSAGES ================================================
exports.fetchAllMessages = (req,res,next)=>{
    CatoringMessage.fetchAllMessages()
    .then(([data,meta])=>{
        if(data){
            returnObject.hasErrors = false
            returnObject.data = sorter.sortCatoringMsgs(data[0])
            return res.json(returnObject)   }
        return returnErroMessage(`Could not delete cooking date.`,res)  })
    .catch(err => {
        console.log(err)
        return returnErroMessage(`Could not delete cooking date. ${err}`, res)  })
}
// ======================================================================
// READING MESSAGE ======================================================
exports.readMessage = (req,res,next) => {
    console.log(req.body)
    const catorMsg = new CatoringMessage(req.body.messageId)
    catorMsg.setUserId = req.session.User.id
    catorMsg.markMessageAsRead()
    .then(([data,meta])=>{
        if(data){
            returnObject.hasErrors = false
            returnObject.msg = `Message ${catorMsg.id} was marked as read!`
            return res.json(returnObject)   }
        return returnErroMessage('It was not possible mark this message as read this time.', res)   })
    .catch(err => {
        console.log(err)
        return returnErroMessage(`It was not possible mark this message as read this time. ${err}`,res) })
}
// ======================================================================
// DELETING MESSAGE =====================================================
exports.deleteMessage = (req,res,next) => {
    console.log(req.body)
    const catorMsg = new CatoringMessage(req.body.messageId)
    catorMsg.setUserId = req.session.User.id
    catorMsg.deleteMessage()
    .then(([data,meta])=>{
        if(data){
            returnObject.hasErrors = false
            returnObject.msg = `Message ${catorMsg.id} was deleted!`
            return res.json(returnObject)   }
        return returnErroMessage('It was not possible delete this message this time.',res)  })
    .catch(err => {
        console.log(err)
        return returnErroMessage(`It was not possible delete this message this time. ${err}`,res)   })
}
// ======================================================================
// ARCHIVING MESSAGE ====================================================
exports.archiveMessage = (req,res,next) => {
    console.log(req.body)
    const catorMsg = new CatoringMessage(req.body.messageId)
    catorMsg.setUserId = req.session.User.id
    catorMsg.archiveMessage()
    .then(([data,meta])=>{
        if(data){
            returnObject.hasErrors = false
            returnObject.msg = `Message ${catorMsg.id} was archived!`
            return res.json(returnObject)   }
        return returnErroMessage('It was not possible archive this message this time.',res) })
    .catch(err => {
        console.log(err)
        return returnErroMessage(`It was not possible archive this message this time. ${err}`,res)  })
}