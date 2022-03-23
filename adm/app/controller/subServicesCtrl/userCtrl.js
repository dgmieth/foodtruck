//npm modules

//import modules
const Administrator = require(`../../../model/Administrator`)
const Developer = require('../../../model/Developer')
const User = require('../../../model/User')
//supportFunctions
const datetimeFormatter = require('../supportFunctions/datetimeFormatter')
const invitationCodeGenerator = require('../supportFunctions/invitationCodeGenerator')
// ======================================================================
// CTRL FUNCTIONS =======================================================
// ======================================================================
// USER -> ALL USERS ====================================================
exports.allUsers = (req,res,next) => {
    User.fetchAllUsers(req)
    .then(([data0,meta0])=>{
        const returnObject = {
            hasErros: false,
            data: [sortUserInfo(data0[0]),data0[1],data0[2]]    }
        res.json(returnObject)  })
    .catch(err => {
        console.log(err)
        const returnObject = {
            hasErros: true,
            msg: `Not possible to fetch users from database`,
            error: err  }
        res.json(returnObject)  })
}
// ======================================================================
// USER -> SAVE EDITED USER INFO ========================================
exports.editedUserInfo = (req,res,next) => {
    console.log(req.body)
    const returnObject = {
        hasErros: true,
        data: null,
        msg: 'The original information wasn\'t changed!'
    }
    const user = new User(req.body.userId)
    user.fetchById()
    .then(([data,meta])=>{
        var hasChanges = false
        if(data.length > 0){
            user.setEmail = data[0].email
            user.setPhoneNumber = data[0].phoneNumber
            user.setName = data[0].name
            data.forEach(reg => {
                if(reg.socialMedia===process.env.FACEBOOK){ user.setSocialMediaFacebook = reg.socialMediaName   }
                if(reg.socialMedia===process.env.INSTAGRAM){    user.setSocialMediaInstagram = reg.socialMediaName  }   })
            if(user.name!==req.body.name){
                hasChanges = true
                user.setName = req.body.name    }
            if(user.phoneNumber!==req.body.phoneNumber){
                hasChanges = true
                user.setPhoneNumber = req.body.phoneNumber  }
            if(user.socialMediaFacebook!==req.body.socialMedia_Facebook){
                hasChanges = true
                user.socialMediaFacebook = req.body.socialMedia_Facebook    }
            if(user.socialMediaInstagram!==req.body.socialMedia_Instagram){
                hasChanges = true
                user.socialMediaInstagram = req.body.socialMedia_Instagram  }
            if(hasChanges){
                user.updateInformation()
                .then(([data1,meta1])=>{
                    if(data1.affectedRows>=1){
                        const adm = new Administrator(null,req.session.User.id,null)
                        adm.logUpdateUserInfo(user.id)
                        returnObject.hasErros=false
                        returnObject.msg='User information altered successfully'
                        res.json(returnObject)    
                    }else{
                        returnObject.msg = `Something went wrong! Try again later`
                        res.json(returnObject)  }   })
                .catch(err=>{
                    returnObject.msg = `Data could not be saved!`
                    res.json(returnObject)  })
            }else{
                returnObject.msg = 'There were no changes in the user information!'
                res.json(returnObject)  }
        }else{
            returnObject.msg = 'No user found!'
            res.json(returnObject)  }   })
    .catch(err => {
        returnObject.msg = err
        res.json(returnObject)  })   
}
// ======================================================================
// USER -> DELETE USER BY ID ============================================
exports.deleteUserById = (req,res,next) => {
    console.log(req.body)
    const returnObject = {
        hasErros: true,
        data: null,
        msg: 'The system could not delete the user. Please try again later.'
    }
    const adm = new Administrator(null,req.session.User.id,null)
    const userId = parseInt(req.body.userId)
    adm.deleteUserById(userId)
    .then(([rAnswer,meta0])=>{
        var validate = rAnswer[1][0].returnCode
        if(validate===-2){
            returnObject.hasErros = true
            returnObject.msg = `Not possible to delete user right now. He/she have opened (paid) orders that have not been delivered or reimbursed. Please go to orders and deliver/reimburse them. Them try again.`
            return res.json(returnObject)   }
        var data0 = rAnswer[0]
        if(data0){
            //adm.logDeleteUserById(userId)
            returnObject.hasErros = false
            returnObject.msg = 'User was succesfully deleted.'
            res.json(returnObject)
        }else{
            res.json(returnObject)  }   })
    .catch(err => {
        console.log(err)
        returnObject.msg = err
        res.json(returnObject)  }) 
}
// ======================================================================
// USER -> GENERATE INVITATION CODE =====================================
exports.invitationCode = (req,res,next) =>{
    const returnObject = {
        hasErros: true,
        data: null,
        msg: 'There is an active user for this e-mail address!'
    }
    const email = req.body.email
    console.log(req.body)
    User.user(email)
    .then(([data,meta])=>{
        console.log(data)
        if(data[0].length > 0){
            res.json(returnObject)
            return 
        }else {
            User.fetchActiveCodeByEmail(email)
            .then(([data0,meta0])=>{
                console.log(data0)
                returnObject.hasErros = false
                returnObject.msg  = 'Code generated succesfully'
                if(data0[0].length > 0) {
                    returnObject.data = {
                        email: email,
                        code: data0[0][0].code
                    }
                    res.json(returnObject)
                }else{
                    code = invitationCodeGenerator(email.length)
                    const adm = new Administrator(null,req.session.User.id, null)
                    adm.saveNewInvitationCode(email,code)
                    .then(([data2,meta2])=>{
                        if(data2){
                            adm.logNewInvitationCode()
                            returnObject.data = {
                                email: email,
                                code: code
                            }
                            res.json(returnObject)
                        }else{
                            returnObject.hasErros = false
                            returnObject.msg  = 'Invitation code could not be saved!'
                            res.json(returnObject)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        returnObject.hasErros = false
                            returnObject.msg  = `Invitation code could not be saved! ${err}`
                            res.json(returnObject)
                    })
                }
            })
        }
    })
    .catch(err => {
        console.log(err)
        returnObject.msg = err
        res.json(returnObject)
    }) 
}
//update user accesses to database
exports.updateUserAccesses = (req,res,next)=>{
    console.log(req.body)
    const returnObject = {
        hasErros: false,
        data: null,
        msg: null
    }
    function returnErroMessage(msg){
        returnObject.msg = msg
        res.json(returnObject)
    }
    User.updateUserAccesses(JSON.stringify(req.body),req.session.User.id)
    .then(([data1,meta1])=>{
        if(!data1){
            return returnErroMessage(`Something went wrong while trying to update user accesses.`)
        }else {
            returnObject.hasErros = false
            res.json(returnObject)
        }
    })
    .catch(err=>{
        console.log(err)
        return returnErroMessage(`Something went wrong while trying to update user accesses. ${err}`)
    })
}
/*
================================================================================
                SORTING DATA
================================================================================
*/
function sortUserInfo(user){
    var userId=0
    var data = []
    user.forEach(u=>{
        if(userId!==u.id){
            userId = u.id
            const filterArray = user.filter(regF => {if(regF.id===userId){return true}})
            const socialMedia = []
            filterArray.forEach(regD => {
                socialMedia.push({
                    socialMedia_id: regD.socialMedia_id,
                    socialMedia: regD.socialMedia,
                    socialMediaName: regD.socialMediaName === null ? '' : regD.socialMediaName
                })
            })
            data.push({
                id: u.id,
                name: u.name === null ? '' : u.name,
                email: u.email,
                activeUser: u.activeUser,
                phoneNumber: u.phoneNumber,
                APPLICATION_address: u.APPLICATION_address,
                createdBy: u.createdBy,
                createdIn: datetimeFormatter(u.createdIn),
                lastLogIn: datetimeFormatter(u.lastLogInOn),
                mobileOS: u.mobileOS === null ? '' : u.mobileOS,
                excluded: u.excluded,
                excludedBy: u.excludedBy === null ? '' : u.excludedBy,
                excludedIn: datetimeFormatter(u.excludedIn),
                createdByName: u.createdByName,
                excludedByName: u.excludedByName === null ? '' : u.excludedByName,
                socialMedia: socialMedia
            })
        }
    })
    return data
}