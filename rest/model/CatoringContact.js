//customed modules 
const db = require('./db/pool')
module.exports = class CatoringContact{
    constructor(){
    }
//=======================================================================================================
//INSTANCE METHODS ======================================================================================
//=======================================================================================================

//=======================================================================================================
//CLASS METHODS =========================================================================================
//=======================================================================================================
    static newContact(dataObject){
        const newJson = JSON.stringify(dataObject)
        console.log(newJson)
        return db.query(`CALL catoring_saveNewMessage('${newJson}',@returnCode);SELECT @returnCode;`)
    }
    
}