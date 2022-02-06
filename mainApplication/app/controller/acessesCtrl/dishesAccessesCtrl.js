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
// DISH ===================================================================================
// ========================================================================================
//fetch orders
exports.fetchAllDishes = (req,res,next) => {
    console.log(process.env.DISH_FETCH_ALL_DISHES.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.DISH_FETCH_ALL_DISHES,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to fetch all dishes"
        return res.status(401).json(returnObject)
    }
}
//fetch orders
exports.newDish = (req,res,next) => {
    console.log(process.env.DISH_NEW_DISH.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.DISH_NEW_DISH,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to create new dishes"
        return res.status(401).json(returnObject)
    }
}
//edit dish information
exports.editDish = (req,res,next) => {
    console.log(process.env.DISH_EDIT_DISH.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.DISH_EDIT_DISH,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to edit dishes"
        return res.status(401).json(returnObject)
    }
}
//delete dish from database
exports.deleteDish = (req,res,next) => {
    console.log(process.env.DISH_DELETE_DISH.split(','))
    console.log(req.session.accesses)
    if(checkAccesses.checkUserAccess(process.env.DISH_DELETE_DISH,req)){
        console.log('1-> hasAccess')
        next()
    }else{
        returnObject.msg = "User does not have permission to delete dishes"
        return res.status(401).json(returnObject)
    }
}