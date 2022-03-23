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
        return db.query(`CALL notification_newNotification(${this.cookingDateFk===null ? 'NULL' : parseInt(this.cookingDateFk)},?,?,@notifID);SELECT @notifID as notifID;`, [`${this.message}`,`${this.sentBy}`])
    }
    updateNotificationUserTable(userIds){
        return db.query(`CALL notification_saveNotificationAndUserItWasSentTo(?,?,?,@msgCounter);SELECT @msgCounter as msgCounter;`, [`${this.id}`,`${userIds}`,`${this.sentBy}`])
    }
    increasesNotificationSequencer(){
        return db.query(`CALL notification_increasePayYourOrderNotificationCounterInBulk(?);`,[`${this.cookingDateFk}`])
    }
    increasesNotificationSequencerSpecificOrder(orderId){
        return db.query(`CALL notification_increasePayYourOrderNotificationCounterByOrder(?)`,[`${orderId}`])
    }
     // =====================================================================
    // CLASS METHODS ========================================================
    // ======================================================================
    // CRUD =================================================================
    static adm_GetIdsAndMsgForCrontabCurlRequest(){
        return db.query(`CALL notification_getUserIdsAndMessageForPayYourOrderNotification();`)
    }
}