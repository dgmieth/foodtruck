//database modules
const db = require('./bd/pool')
//env variables
const finishedStatus = parseInt(process.env.DB_COOKING_DATE_FINISHED_ORDER_STATUS)
var dbName = process.env.DB_NAME
module.exports = class Order {
    constructor(id,userId) {
        this.id = id
        this.userId = userId
        this.reimburseTip = null
    }
    set setReimburseTip(value){
        this.reimburseTip = value
    }
     // =====================================================================
    // INSTANCE METHODS =====================================================
    // ======================================================================
    // CRUD =================================================================
    deleteOrder(){
        return db.query(`CALL foodtruck_order_deleteOrder(?,?,@returnCode);SELECT @returnCode as returnCode;`,
        [`${this.id}`,`${this.userId}`])
    }
    deliverOrder(){
        return db.query(`CALL foodtruck_order_deliverOrder(?,?);`,
        [`${this.id}`,`${this.userId}`])
    }
    reimburseOrder(){
        return db.query(`CALL foodtruck_payment_reimburseOrder(?,?,?,?);`,[`${this.id}`,`${parseInt(process.env.DB_ORDER_REIMBURSEMENT_STATUS)}`,`${this.userId}`,`${this.reimburseTip}`])
    }
     // =====================================================================
    // CLASS METHODS ========================================================
    // ======================================================================
    // CRUD =================================================================
    static fetchOrdersForActiveFinishedCookingDates(){
        return db.query(`CALL foodtruck_order_fetchAll();`,[`${finishedStatus}`])
    }
}