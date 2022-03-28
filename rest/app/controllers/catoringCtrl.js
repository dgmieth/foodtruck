//npm modules
const jwt = require(`jsonwebtoken`)
//customed modules
const db = require('../../model/db/pool')
const io = require('./supportFunctions/socketIO')
//customed classes
const CatoringContact = require('../../model/CatoringContact')
const returnResJsonObj = require('./supportFunctions/returnResJsonObj')
//controller functions
const validator = require('./supportFunctions/validator')
//env variables
const noError = parseInt(process.env.NO_ERROR)
const newCateringContact = parseInt(process.env.NEW_CATORING_CONTACT)
const cateringError = parseInt(process.env.CATERING_ERROR)
//SAVE REQUEST ==============================================================
exports.saveContact = (req,res,next)=>{
    // console.log(req.headers)
    req.body.orderDescription = req.body.orderDescription.replace(/'/ig,'`').replace(/\t|\n|\n|\r/gm,'')
    if(!validator.validateEmailAddress(req.body.email)){
        return res.json(returnResJsonObj.resJsonOjbect(true,`Voce deve informar um e-mail valido.`,cateringError))      }
    CatoringContact.newContact(req.body)
    .then(([data,meta])=> {
        if(data){
            io.emit(`${process.env.CATERING}`,{msg: "new catering message"})
            return res.json(returnResJsonObj.resJsonOjbect(false,`Sua mensagem foi recebida pelo projeto foodtruck. Espere nosso retorno.`,noError))   
        }else{
            return res.json(returnResJsonObj.resJsonOjbect(true,`Nao foi possivel enviar sua mensagem nesse momento. Por favor, tente mais tarde.`,cateringError))   }   })
    .catch(err => {
        console.log(err)
        return res.json(returnResJsonObj.resJsonOjbect(true,`Nao foi possivel enviar sua mensagem nesse momento. Por favor, tente mais tarde.`,cateringError))   })
}