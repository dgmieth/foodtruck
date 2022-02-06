//database modules
const db = require('./bd/pool')
//env variables
var dbName = process.env.DB_NAME
module.exports = class Notification {
    constructor(cookingDateFk,message,sentBy){
        this.id = null
        this.cookingDateFk = cookingDateFk,
        this.message = message,
        this.sentBy = sentBy
    }
    set setId(id) {
        this.id = id
    }
    set setCookingDate(cd){
        this.cookingDateFk = cd
    }
    // =====================================================================
    // INSTANCE METHODS======================================================
    // ======================================================================
    // CRUD =================================================================
    saveNewNotification(){
        return db.query(`CALL createNewNotification(${this.cookingDateFk===null ? 'NULL' : parseInt(this.cookingDateFk)},?,?,@notifID);SELECT @notifID as notifID;`, [`${this.message}`,`${this.sentBy}`])
    }
    updateNotificationUserTable(userIds){
        return db.query(`CALL updateNotificationUser(?,?,?,@msgCounter);SELECT @msgCounter as msgCounter;`, [`${this.id}`,`${userIds}`,`${this.sentBy}`])
    }
    increasesNotificationSequencer(){
        return db.query(`CALL adm_IncreasesNotificationSequencer(?);`,[`${this.cookingDateFk}`])
    }
    increasesNotificationSequencerSpecificOrder(orderId){
        return db.query(`CALL adm_IncreasesNotificationSequencerSpecificOrder(?)`,[`${orderId}`])
    }
     // =====================================================================
    // CLASS METHODS ========================================================
    // ======================================================================
    // CRUD =================================================================
    static adm_GetIdsAndMsgForCrontabCurlRequest(){
        return db.query(`CALL adm_GetIdsAndMsgForCrontabCurlRequest();`)
    }
}