//database modules
const db = require('./bd/pool')
var dbName = process.env.DB_NAME
module.exports = class Developer {
    constructor(email,id,password) {
        this.email = email
        this.id = id
        this.password = password
    }
    // ======================================================================
    // INSTANCE METHODS =====================================================
    // ======================================================================
    // CRUD =================================================================
    save(savingType){
         switch (savingType) {
            case 'password':
                return db.query(`CALL dev_updatePassword(?,?)`, [`${this.password}`, `${this.id}`])
            default:
                break;
        }
    }
    // LOGS =================================================================
    pageLogin(){
        return db.query(`CALL db_registerLog(10, 1, NULL, NULL,?,CURRENT_TIMESTAMP());`, [`${this.id}`])
    }
    // ======================================================================
    // CLASS METHODS ========================================================
    // ======================================================================
    static fetchByEmail(email){
        return db.query(`CALL dev_fetchUserByEmail(?);`, [`${email}`])
    }
    static openDevelopingHours() {
        return db.query(`CALL dev_getWorkedHoursControl();`)
    }
    static returnAllDevelopmentRegisters(){
        return db.query(`CALL dev_getWorkedHours();`)
    }
    static inserStartDeveloping(){
        return db.query(`CALL dev_startWork();`)
    }
    static updateOpenDeveloping(text){
        return db.query(`CALL dev_endWork(?)`, [`${text}`])
    }
    static getMinutesWorked(){
        return db.query(`CALL dev_genWorkTotalTime();`)
    }
}