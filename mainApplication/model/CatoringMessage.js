//database modules
const db = require('./bd/pool')
//env variables
var dbName = process.env.DB_NAME
module.exports = class CatoringMessage {
    constructor(id){
        this.id = id
        this.userId = null
    }
    set setUserId(userId){
        this.userId = userId
    }
     // =====================================================================
    // INSTANCE METHODS======================================================
    // ======================================================================
    // CRUD =================================================================
    markMessageAsRead(){
        return db.query(`CALL readCatoringMessage(?,?);`, 
                [`${this.userId}`,`${this.id}`])
    }
    deleteMessage(){
        return db.query(`CALL deleteCatoringMessage(?,?);`, 
                [`${this.userId}`,`${this.id}`])
    }
    archiveMessage(){
        return db.query(`CALL archiveCatoringMessage(?,?);`, 
                [`${this.userId}`,`${this.id}`])
    }
     // =====================================================================
    // CLASS METHODS ========================================================
    // ======================================================================
    // CRUD =================================================================
    static fetchAllMessages(){
        return db.query(`CALL catoring_fetchAllMessages();`)
    }
}