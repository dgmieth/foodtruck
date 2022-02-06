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
const returnObject = {
    hasErrors: true,
    data: null,
    msg: null
}
// ======================================================================
// CTRL FUNCTIONS =======================================================
// ======================================================================
// FETCH ALL DISHES  ====================================================
exports.fetchAllDishes = (req,res,next) => {
    console.log('fetchAllDishes -> ')
    function returnErroMessage(msg){
        returnObject.hasErrors = true
        returnObject.msg = msg
        res.json(returnObject) }
    Dish.fetchAll()
    .then(([data,meta])=> {
        if(data){
            returnObject.hasErrors = false
            returnObject.data = sorter.sortAllDishes(data)
            res.json(returnObject)
        }else{
            return returnErroMessage('Nothing found in database')}})
    .catch(err => {
        console.log(err)
        return returnErroMessage(`Nothing found in database. ${err}`)})
}
// FETCH ALL DISHES  ====================================================
exports.newDish = (req,res,next) => {
    console.log(req.body)
    function returnErroMessage(msg){
        returnObject.hasErrors = true
        returnObject.msg = msg
        res.json(returnObject)}
    const dish = new Dish(req.body.dishName,req.body.dishPrice,req.body.dishDescription,req.body.dishIngredients,req.session.User.id)
    dish.newDish()
    .then(([data,meta])=> {
        if(data){
            fetchAllDishes()
            .then(value => {
                return res.json(value)})
        }else{
            return returnErroMessage('Not possible to create dish at this time!')}})
    .catch(err => {
        console.log(err)
        return returnErroMessage(`Not possible to create dish at this time! ${err}`)})
}
//edit dish information
exports.editDish = (req,res,next) => {
    console.log('editDish')
    console.log(req.body)
    function returnErroMessage(msg){
        returnObject.hasErrors = true
        returnObject.msg = msg
        res.json(returnObject)}
    const dish = new Dish(null,req.body.dishPrice,req.body.dishDescription,req.body.dishIngredients,null)
    dish.setId = req.body.dishId
    dish.setUpdatedBy = req.session.User.id
    dish.updateDish()
    .then(([data,meta])=>{
        if(data){
            fetchAllDishes()
            .then(value => {
                return res.json(value)})
            .catch(err=>{
                return returnErroMessage('Not possible to retrieve dishes information from database!')})
        }else{
            return returnErroMessage('Not possible to edit dish at this time!')}})
    .catch(err => {
        console.log(err)
        return returnErroMessage(`Not possible to edit dish at this time! ${err}`)})
}
//delete dish from database
exports.deleteDish = (req,res,next) => {
    console.log('deleteDish')
    console.log(req.body)
    function returnErroMessage(msg){
        returnObject.hasErrors = true
        returnObject.msg = msg
        res.json(returnObject)}
    const dish = new Dish(null,null,null,null,null)
    dish.setId = req.body.dishId
    dish.setUpdatedBy = req.session.User.id
    dish.deleteDish()
    .then(([dishRe,meta])=>{
        console.log(dishRe)
        if(dishRe[1][0]['returnCode']===-2){
            return returnErroMessage('This dish cannot be deleted because it is in use in one or more active cooking date events')}
        var data = dishRe[0]
        if(data){
            fetchAllDishes()
            .then(value => {
                return res.json(value)})
        }else{
            return returnErroMessage('Not possible to edit dish at this time!')} })
    .catch(err => {
        console.log(err)
        return returnErroMessage(`Not possible to edit dish at this time! ${err}`)})
}
//COMMONG FUNCTIONS
function fetchAllDishes(){
    return new Promise((resolve,reject)=> {
        Dish.fetchAll()
        .then(([data,meta])=> {
            if(data){
                returnObject.hasErrors = false
                returnObject.data = data
            }else{
                returnObject.msg = 'Nothing found in database'}
            resolve(returnObject)})
        .catch(err => {
            console.log(err)
            returnObject.msg = `Nothing found in database. ${err}`
            reject(returnObject)})})
}
