//npm modules

//customed modules
const db = require('../../model/db/pool')
//customed classes
const User = require('../../model/User')
const SocialMedia = require('../../model/SocialMedia')
const Order = require('../../model/Order')
const Payment = require('../../model/Payment')
//custom functions
const io = require('./supportFunctions/socketIO')
const returnResJsonObj = require('./supportFunctions/returnResJsonObj')
const payment = require('./supportFunctions/payment')
var validator = require('./supportFunctions/validator')
//env variables
const cantCreateOrder = parseInt(process.env.DB_NEW_ORDER_COULDNT_CREATE)
const orderError = parseInt(process.env.ORDER_ERROR)
const noError = parseInt(process.env.NO_ERROR)
const paymentError = parseInt(process.env.PAYMENT_ERROR)
//controller functions
//CREATE NEW ORDER =============================================================
// new order  ------------------------------------------------------------------
// -----------------------------------------------------------------------------
exports.newOrder = (req,res,next) => {
    console.log(req.body)
    if(!req.body.email||!req.body.id||!req.body.cookingDate_id||!req.body.dish_id||!req.body.dish_qtty||!req.body.extras_id||!req.body.extras_qtty){
        return res.json(returnResJsonObj.resJsonOjbect(true,`{invalidFormat: true,neededFields: {email: 'string',id: 'integer',cookingDate_id: 'integer',dish_id: ['integer','integer'],dish_qtty: ['integer','integer'],extras_id: ['integer','integer'],extras_qtty: ['integer','integer']}}`,orderError))    }
    Order.newOrder(req.body)
    .then(([data,meta])=>{
        // console.log(data)
        if(data.length>1){
            var validate = data[1][0]['@returnCode']
            if((validate===-2)){
                return res.json(returnResJsonObj.resJsonOjbect(true,`Nao foi possivel criar o seu pedido. Este evento nao ocorrera mais ou nao esta recebendo pedidos no momento.`,validate))  }
            if((validate===-3)){
                return res.json(returnResJsonObj.resJsonOjbect(true,`Nao foi possivel criar seu pedido, porque ja existe um pedido para este usuario.`,validate))  }
            if((validate===-4)){
                return res.json(returnResJsonObj.resJsonOjbect(true,`Sequencia incorreta dos pratos no evento.`,validate))  }
            if((validate===-5)){
                return res.json(returnResJsonObj.resJsonOjbect(true,`Sequencia incorreta dos pratos no evento.`,validate))  }
            if((validate===-6)){
                return res.json(returnResJsonObj.resJsonOjbect(true,`Usuario nao exsite`,validate))   }
            if((validate===-7)){
                return res.json(returnResJsonObj.resJsonOjbect(true,`Seu pedido nao possui pratos.`,validate))    }
            io.emit(`${process.env.ORDER}`,{orderId: (data[2][0])['@orderIdOut']})
            return res.json(returnResJsonObj.resJsonOjbect(false,`Pedido criado!`,noError))
        }else {
            return res.json(returnResJsonObj.resJsonOjbect(true,`Nao foi possivel criar o seu pedido. Se o problema persistir, contate o Projeto Foodtruck.`,orderError))   }   })
    .catch(err => {
        console.log(err)
        return res.json(returnResJsonObj.resJsonOjbect(true,`Nao foi possivel criar o seu pedido. Se o problema persistir, contate o Projeto Foodtruck.`,orderError))   })
}
// delete order  ---------------------------------------------------------------
// -----------------------------------------------------------------------------
exports.deleteOrder = (req,res,next) => {
    console.log('/api/order/deleteOrder -> ')
    console.log(req.body)
    if(!req.body.order_id||!req.body.id||!req.body.email){
        return res.json(returnResJsonObj.resJsonOjbect(true,`{invalidFormat: true,neededFields: {order_id: 'integer',id: 'integer', email: 'string'}}`,orderError)) }
    const order = new Order(parseInt(req.body.order_id))
    order.setUser = parseInt(req.body.id)
    order.deleteOrder()
    .then(([orderData,orderMeta])=> {
        console.log('orderData is->',orderData)
        var validate = parseInt(orderData[1][0]['returnCode'])
        console.log('validate is->',validate)
        if(validate===-2){
            return res.json(returnResJsonObj.resJsonOjbect(true,`Este pedido ja estava excluido.`, validate))  }
        if(validate===-3){
            return res.json(returnResJsonObj.resJsonOjbect(true,`Este pedido nao pode ser deletado, pois ja foi pago.`, validate))    }
        if(validate===-4){
            return res.json(returnResJsonObj.resJsonOjbect(true,`Este pedido nao pode sofrer mais alteracoes.`, validate)) }
        if(validate===-5){
            return res.json(returnResJsonObj.resJsonOjbect(true,`Usuario nao exsite`, validate)) }
        var data = orderData[0]
        if(data){
            io.emit(`${process.env.ORDER}`,{orderId: parseInt(req.body.order_id)})
            return res.json(returnResJsonObj.resJsonOjbect(false,`Pedido deletado.`, noError))
        }else{
            return res.json(returnResJsonObj.resJsonOjbect(true,`Nao foi possivel deletar o seu pedido. Se o problema persistir, contate o Projeto Foodtruck.`, orderError))   }   })
    .catch(err => {
        console.log('deleteOrder error ->',err)
        return res.json(returnResJsonObj.resJsonOjbect(true,`Nao foi possivel deletar o seu pedido. Se o problema persistir, contate o Projeto Foodtruck. ${err}`, orderError))   })
}
// update order  ---------------------------------------------------------------
// -----------------------------------------------------------------------------
exports.updateOrder = (req,res,next) => {
    console.log(req.body)
    var validationObject = {}
    if(!req.body.order_id||!req.body.id||!req.body.new_qtty||!req.body.email){
        return res.json(returnResJsonObj.resJsonOjbect(true,`{invalidFormat: true,neededFields: {order_id: 'integer',id: 'integer',email:'string',new_qtty: 'integer'}}`,orderError))
    }
    const order = new Order(parseInt(req.body.order_id))
    order.setUser = parseInt(req.body.id)
    order.setQtty = parseInt(req.body.new_qtty)
    order.updateOrder()
    .then(([orderData,orderMeta])=>{
        var validate = parseInt(orderData[1][0]['returnCode'])
        if(validate===-2){
            return res.json(returnResJsonObj.resJsonOjbect(true,`Nao foi possivel atualizar o seu pedido. Este evento nao ocorrera mais ou nao esta permitindo atualizacoes no momento.`, validate))    }
        if(validate===-3){
            return res.json(returnResJsonObj.resJsonOjbect(true,`Seu pedido nao pode ser atualizado, pois ele foi excluido.`, validate))    }
        if(validate===-4){
            return res.json(returnResJsonObj.resJsonOjbect(true,`Seu pedido nao pode ser atualizado, pois este evento nao permite alteracoes aos pedidos no momento`, validate))   }
        if(validate===-5){
            return res.json(returnResJsonObj.resJsonOjbect(true,`Seu pedido nao pode ser atualizado, pois ja foi pago.`, validate))    }
        if(validate===-6){
            return res.json(returnResJsonObj.resJsonOjbect(true,`Existe algo errado no seu pedido. Contate Project Foodtruck`, validate))   }
        if(validate===-7){
            return res.json(returnResJsonObj.resJsonOjbect(true,`Usuario nao existe`, validate))   }
        var data = orderData[0]
        if(data){
            io.emit(`${process.env.ORDER}`,{orderId: parseInt(req.body.order_id)})
            return res.json(returnResJsonObj.resJsonOjbect(false,`Pedido atualizado!`, noError))
        }else{
            return res.json(returnResJsonObj.resJsonOjbect(true,`Nao foi possivel atualizar o seu pedido. Se o problema persistir, contate o Projeto Foodtruck.`, orderError))}})
    .catch(err => {
        console.log(err)
        return res.json(returnResJsonObj.resJsonOjbect(true,`Nao foi possivel atualizar o seu pedido. Se o problema persistir, contate o Projeto Foodtruck.`, orderError))})
}
// delete made to list order  --------------------------------------------------
// -----------------------------------------------------------------------------
exports.cancelMadeToListOrder = (req,res,next) => {
    console.log(req.body)
    if(!req.body.order_id||!req.body.id||!req.body.cookingDate_id){
        return res.json(returnResJsonObj.resJsonOjbect(true,`{invalidFormat: true,neededFields: {order_id: 'integer',id: 'integer',cookingDate_id:'integer'}}`,orderError))
    }
    const order = new Order(parseInt(req.body.order_id))
    order.setUser = parseInt(req.body.id)
    order.setCookingDateId = parseInt(req.body.cookingDate_id)
    order.deleteMadeToListOrder()
    .then(([orderData,orderMeta])=>{
        var validate = parseInt(orderData[1][0]['returnCode'])
        if(validate===-2){
            return res.json(returnResJsonObj.resJsonOjbect(true,`The attempt to delete order failed because it has been previously deleted.`, validate))
        }
        if(validate===-3){
            return res.json(returnResJsonObj.resJsonOjbect(true,`The attempt to delete order failed because it has been paid already.`, validate))
        }
        if(validate===-4){
            return res.json(returnResJsonObj.resJsonOjbect(true,`The attempt to delete order failed because it is in the waiting list.`, validate))
        }
        if(validate===-5){
            return res.json(returnResJsonObj.resJsonOjbect(true,`This cooking date does not accept order updates anymore.`, validate))
        }
        var data = orderData[0]
        if(data){
            io.emit(`${process.env.ORDER}`,{orderId: parseInt(req.body.order_id)})
            return res.json(returnResJsonObj.resJsonOjbect(false,`Order successfully deleted`, noError))
        }
        return res.json(returnResJsonObj.resJsonOjbect(true,`It was not possible to delete the order right now! No data returned from database`, orderError))})
    .catch(err => {
        console.log(err)
        return res.json(returnResJsonObj.resJsonOjbect(true,`It was not possible to delete the order right now! No data returned from database. Server error: ${err}`, orderError))})
}
// pay  order  -----------------------------------------------------------------
// -----------------------------------------------------------------------------
exports.payOrder = (req,res,next) => {
    console.log(req.body)
    if(!req.body.order_id||!req.body.email||!req.body.id||!req.body.cookingDate_id||!req.body.cardCode||!req.body.cardNumber||!req.body.expirationDate){
        return res.json(returnResJsonObj.resJsonOjbect(true,`{invalidFormat: true,neededFields: {order_id: 'integer',id: 'integer',email: 'string',cookingDate_id:'integer',cardCode: 'string',cardNumber: 'string',expirationDate: 'string',tip:'integer'(optional)}}`,orderError))     }
    console.log('afterValidation')
    var tip = !req.body.tip ? 0 : parseFloat(parseFloat(req.body.tip).toFixed(2))
    console.log('tips is -> ',tip)
    User.fetchByEmail(req.body.email)
    .then(([userData,userMeta])=>{
        console.log(userData)
        var user = userData[0]
        // var hasZero = parseInt(req.body.expirationDate.split('-')[1]) <= 9 ? '0':''
        if(user){
            var dataObject = {
                cardNumber: parseInt(req.body.cardNumber),
                expirationDate: `${req.body.expirationDate.split('-')[1]}${req.body.expirationDate.split('-')[0].substring(2,4)}`,
                cardCode: req.body.cardCode,
                orderId: `${req.body.order_id}`,
                email: req.body.email,
                tip: tip = tip === '' || tip === undefined || tip === null ? 0 : parseFloat(tip),
                userName: user[0].name === null || user[0].name === '' ? '' : user[0].name  }
            console.log('user ---> ',dataObject)
            Order.getDishes(parseInt(req.body.order_id))
            .then(([order,orderM])=>{
                console.log('order from getDishes is -> ',order)
                if(order){
                    dataObject.dish = order[0]
                    var amount = tip
                    order[0].forEach(price =>{  amount = amount + parseFloat(price.dishPrice)*price.dishQtty     })
                    dataObject.totalAmount = parseFloat(parseFloat(amount).toFixed(2))
                    console.log(dataObject.totalAmount)
                    Order.validateOrder(parseInt(req.body.order_id))
                    .then(([isPayableData,isPayableMeta])=>{
                        var validate = parseInt(isPayableData[1][0]['returnCode'])
                        if(validate===-2){
                            return res.json(returnResJsonObj.resJsonOjbect(true,`The attempt to pay order failed because it has been previously deleted.`, validate))   }
                        if(validate===-3){
                            return res.json(returnResJsonObj.resJsonOjbect(true,`The attempt to pay order failed because this cooking date won't take place anymore.`, validate))   }
                        if(validate===-4){
                            return res.json(returnResJsonObj.resJsonOjbect(true,`The attempt to pay order failed because it has been previously paid.`, validate))  }
                        if(validate===-5){
                            return res.json(returnResJsonObj.resJsonOjbect(true,`The attempt to pay order failed because it did not made to this cooking date list.`, validate))    }
                        if(validate===-6){
                            return res.json(returnResJsonObj.resJsonOjbect(true,`The attempt to pay order failed because this order is still wainting for dropped out orders.`, validate))  }
                        if(validate===-7){
                            return res.json(returnResJsonObj.resJsonOjbect(true,`This cooking date isn't accepting payment yet.`, validate))    }
                        if(validate===-8){
                            return res.json(returnResJsonObj.resJsonOjbect(true,`Something is wrong with your order. Please contact kungfuBBQ.`, validate))    }
                        if(validate===-9){
                            return res.json(returnResJsonObj.resJsonOjbect(true,`User does not exist.`, validate))    }   
                        payment.chargeCreditCard(dataObject,(cb)=> {        
                            console.log(cb)
                            cb.user_id = user[0].id
                            cb.order_id = req.body.order_id
                            cb.cookingDate_id = req.body.cookingDate_id
                            cb.amount = amount
                            cb.tip = tip === '' || tip === undefined || tip === null ? 0 : parseFloat(tip)
                            Payment.payOrder(JSON.stringify(cb))
                            .then(([payment,paymentM])=>{
                                console.log(payment)
                                if(cb.error === 1){
                                    return res.json(returnResJsonObj.resJsonOjbect(true,`Not possible to pay order. Please try again later. Error message: ${cb.errorDescription===undefined ? cb.messageDescription : cb.errorDescription}`, paymentError))
                                }else{
                                    if(payment){
                                        io.emit(`${process.env.ORDER}`,{orderId: parseInt(req.body.order_id)})
                                        return res.json(returnResJsonObj.resJsonOjbect(false,`Order successfully paid`, noError))
                                    }else{
                                return res.json(returnResJsonObj.resJsonOjbect(true,`Order successfully paid, but it was not possible to save it on the databse`, paymentError))    }   }   })
                            .catch(err => {
                                console.log('notPossibleToPayOrder->',err)
                                return res.json(returnResJsonObj.resJsonOjbect(true,`Order could not be paid. Try again later`, paymentError))  })  }) 
                             })
                    .catch(err => {
                        console.log('validateOrder -> ',err)
                        return res.json(returnResJsonObj.resJsonOjbect(true,`The attempt to pay order failed, because it was not possible to validate order status at this time.`, paymentError))   })
                }else{
                    return res.json(returnResJsonObj.resJsonOjbect(true,`Not possible to pay order. Please try again later.`, paymentError))    }   })
            .catch(err => {
                console.log('notPOssibleToGetDishes->',err)
                return res.json(returnResJsonObj.resJsonOjbect(true,`Not possible to pay order. Please try again later.`, paymentError))    
            })
        }else {
            return res.json(returnResJsonObj.resJsonOjbect(true,`Not possible to pay order. Please try again later.`, paymentError))    }   })
    .catch(err => {
        console.log('notPossibleToFechUser-> ',err)
        return res.json(returnResJsonObj.resJsonOjbect(true,`Not possible to pay order. Please try again later. Server message: ${err}`, paymentError)) })
}
// pay  at pick up  ------------------------------------------------------------
// -----------------------------------------------------------------------------
exports.payAtPickup = (req,res,next) => {
    console.log(req.body)
    if(!req.body.order_id||!req.body.email||!req.body.id||!req.body.cookingDate_id){
        return res.json(returnResJsonObj.resJsonOjbect(true,`{invalidFormat: true,neededFields: {order_id: 'integer',id: 'integer',email: 'string'}}`,orderError))     }
    Order.validateOrder(parseInt(req.body.order_id))
    .then(([isPayableData,isPayableMeta])=>{
        var validate = parseInt(isPayableData[1][0]['returnCode'])
        if(validate===-2){
            return res.json(returnResJsonObj.resJsonOjbect(true,`The attempt to pay order failed because it has been previously deleted.`, validate))   }
        if(validate===-3){
            return res.json(returnResJsonObj.resJsonOjbect(true,`The attempt to pay order failed because this cooking date won't take place anymore.`, validate))   }
        if(validate===-4){
            return res.json(returnResJsonObj.resJsonOjbect(true,`The attempt to pay order failed because it has been previously paid.`, validate))  }
        if(validate===-5){
            return res.json(returnResJsonObj.resJsonOjbect(true,`The attempt to pay order failed because it did not made to this cooking date list.`, validate))    }
        if(validate===-6){
            return res.json(returnResJsonObj.resJsonOjbect(true,`The attempt to pay order failed because this order is still wainting for dropped out orders.`, validate))  }
        if(validate===-7){
            return res.json(returnResJsonObj.resJsonOjbect(true,`This cooking date isn't accepting payment yet.`, validate))    }
        if(validate===-8){
            return res.json(returnResJsonObj.resJsonOjbect(true,`Something is wrong with your order. Please contact kungfuBBQ.`, validate))    }
        if(validate===-9){
            return res.json(returnResJsonObj.resJsonOjbect(true,`User does not exist.`, validate))    }    
        Payment.payAtPickup(parseInt(req.body.order_id),parseInt(req.body.id),parseInt(req.body.cookingDate_id))
        .then(([data,meta])=>{
            if(data){
                io.emit(`${process.env.ORDER}`,{orderId: parseInt(req.body.order_id)})
                return res.json(returnResJsonObj.resJsonOjbect(false,`You have confirmed your order and it must be paid at pick up.`, noError))
            }else{
                return res.json(returnResJsonObj.resJsonOjbect(true,`Order could not be confirmed. Try again later`, paymentError))     }   })
        .catch(err=> {
            console.log('payAtPickup->',err)
            return res.json(returnResJsonObj.resJsonOjbect(true,`Order could not be confirmed. Try again later`, paymentError))     })  })
    .catch(err => {
        console.log('validateOrder -> ',err)
        return res.json(returnResJsonObj.resJsonOjbect(true,`The attempt to confirm order failed, because it was not possible to validate order status at this time.`, paymentError))   })
}
