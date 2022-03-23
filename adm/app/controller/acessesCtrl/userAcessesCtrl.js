
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
// USERS ==================================================================================
// ========================================================================================
//view activeUsers 
exports.viewActiveUsers = (req,res,next) => {
    console.log(process.env.USER_VIEW_ACTIVE_USERS.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.USER_VIEW_ACTIVE_USERS,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to fetch users"
        return res.status(401).json(returnObject)
    }
}
//edit user information 
exports.editUserInformation = (req,res,next) => {
    console.log(process.env.USER_EDIT_USER_INFORMATION.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.USER_EDIT_USER_INFORMATION,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to edit users"
        return res.status(401).json(returnObject)
    }
}
//delete user 
exports.deleteUser = (req,res,next) => {
    console.log(process.env.USER_DELETE_USER.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.USER_DELETE_USER,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to delete users"
        return res.status(401).json(returnObject)
    }
}
//generate invitation code
exports.invitationCode = (req,res,next)=>{
    console.log(process.env.USER_GENERATE_INVITATION_CODE.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.USER_GENERATE_INVITATION_CODE,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to create invitation code"
        return res.status(401).json(returnObject)
    }
}
//update user accesses to database
exports.updateUserAccesses = (req,res,next) => {
    console.log(process.env.USER_UPDATE_USER_ACCESSES.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.USER_UPDATE_USER_ACCESSES,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        console.log(`==========================================`)
        returnObject.msg = "User does not have permission to update user accesses"
        return res.status(401).json(returnObject)
    }
}