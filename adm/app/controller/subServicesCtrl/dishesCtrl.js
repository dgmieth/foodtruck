//npm modules

//import modules
const Administrator = require(`../../../model/Administrator`)
const Developer = require('../../../model/Developer')
const User = require('../../../model/User')
const Order = require('../../../model/Order')
const Dish = require('../../../model/Dish')
//supportFunctions
const datetimeFormatter = require('../supportFunctions/datetimeFormatter')
const invitationCodeGenerator = require('../supportFunctions/invitationCodeGenerator')
const sorter = require('../supportFunctions/sorter')
//return object
//return object
const returnObject = {
    hasErrors: false,
    data: null,
    msg: null}
function returnErroMessage(msg,res){
    returnObject.hasErrors = true
    returnObject.msg = msg
    res.json(returnObject)}
// ======================================================================
// CTRL FUNCTIONS =======================================================
// ======================================================================
// FETCH ALL DISHES  ====================================================
exports.fetchAllDishes = (req,res,next) => {
    console.log('fetchAllDishes')
    Dish.fetchAll()
    .then(([data,meta])=> {
        if(data[0]){
            returnObject.hasErrors = false
            returnObject.data = sorter.sortAllDishes(data[0])
            res.json(returnObject)
        }else{
            return returnErroMessage('Nothing found in database',res )  }   })
    .catch(err => {
        console.log(err)
        return returnErroMessage(`Nothing found in database. ${err}`,res )  })
}
// FETCH ALL DISHES  ====================================================
exports.newDish = (req,res,next) => {
    console.log('newDish')
    const dish = new Dish(req.body.dishName,req.body.dishPrice,req.body.dishDescription,req.body.dishIngredients,req.session.User.id,req.body.fifo)
    dish.newDish()
    .then(([data,meta])=> {
        if(data){
            fetchAllDishes(res)
        }else{
            return returnErroMessage('Not possible to create dish at this time!', res)  } })
    .catch(err => {
        console.log(err)
        return returnErroMessage(`Not possible to create dish at this time! ${err}`,res)    })
}
//edit dish information
exports.editDish = (req,res,next) => {
    console.log('editDish')
    const dish = new Dish(null,req.body.dishPrice,req.body.dishDescription,req.body.dishIngredients,null,null)
    dish.setId = req.body.dishId
    dish.setUpdatedBy = req.session.User.id
    dish.updateDish()
    .then(([data,meta])=>{
        if(data){
            fetchAllDishes(res)
        }else{
            return returnErroMessage('Not possible to edit dish at this time!',res) }   })
    .catch(err => {
        console.log(err)
        return returnErroMessage(`Not possible to edit dish at this time! ${err}`,res)  })
}
//delete dish from database
exports.deleteDish = (req,res,next) => {
    console.log('deleteDish')
    const dish = new Dish(null,null,null,null,null)
    dish.setId = req.body.dishId
    dish.setUpdatedBy = req.session.User.id
    dish.deleteDish()
    .then(([dishRe,meta])=>{
        if(dishRe[1][0]['returnCode']===-2){
            return returnErroMessage('This dish cannot be deleted because it is in use in one or more active cooking date events')}
        var data = dishRe[0]
        if(data){
            fetchAllDishes(res)
        }else{
            return returnErroMessage('Not possible to edit dish at this time!',res) }    })
    .catch(err => {
        console.log(err)
        return returnErroMessage(`Not possible to edit dish at this time! ${err}`)})
}
//COMMONG FUNCTIONS
function fetchAllDishes(res){
    Dish.fetchAll()
    .then(([data,meta])=> {
        if(data[0]){
            returnObject.hasErrors = false
            returnObject.data = data[0]
        }else{  returnObject.msg = 'Nothing found in database'  }
        return res.json(returnObject)  })
    .catch(err => {
        console.log(err)
        return returnErroMessage('Not possible to retrieve dishes information from database!',res)  })
}
