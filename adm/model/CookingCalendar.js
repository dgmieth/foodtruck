//database modules
const db = require('./bd/pool')
console.log(process.env.DB_NAME)
//env variables
var dbName = process.env.DB_NAME
module.exports = class CookingCalendar {
    constructor(id, userId = null, mealsForThis = null) {
        this.id = id
        this.userId = userId
        this.mealsForThis = mealsForThis
    }
     // =====================================================================
    // INSTANCE METHODS =====================================================
    // ======================================================================
    // CRUD =================================================================
    fetchById(){   
        return db.query(`CALL foodtruck_cd_fetchCookingEventById(?);`,[`${this.id}`])
    }
    setCookingCapacity(){
        return db.query(`CALL foodtruck_cd_setCookingCapacityForCookingDateEvent(?,?,?,@returnCode);SELECT @returnCode as returnCode;`,
        [`${this.id}`,`${this.mealsForThis}`,`${this.userId}`])
    }
    initiateDelivery(){
        return db.query(`CALL foodtruck_cd_initiateDelivery(?, ?, @returnCode);SELECT @returnCode as returnCode;`,[`${this.id}`,`${this.userId}`])
    }
     // =====================================================================
    // CLASS METHODS ========================================================
    // ======================================================================
    // CRUD =================================================================
    static fetchAllData(){
        return db.query(`CALL foodtruck_cd_fetchAllCookingDates();`)
    }
    // update a specifica cooking calendar date -> must send json object
    static updateCookingDate(jsonObject){
        console.log(jsonObject)
        return db.query(`CALL foodtruck_cd_updateCookingDate(?,@returnCode);SELECT @returnCode;`,[`${jsonObject}`])
    }
    // create a new cookinga calendar date
    static newCookingDate(userId,cookingDate,currentTimeStamp){
        return db.query(`CALL foodtruck_cd_newCookingDate(?,?,@returnCode);SELECT @returnCode;`,
                    [`${userId}`,`${cookingDate}`,])
    }
    //delete a cooking calendar date
    static deleteCoookingDate(userId,cookingDate){
        return db.query(`CALL foodtruck_cd_deleteCookingDate(?,?,@returnCode);SELECT @returnCode as returnCode;`,
                    [`${userId}`,`${cookingDate}`])
    }
    //open cooking calendar date to orders
    static openToOrders(userId,cookingDate){
        return db.query(`CALL foodtruck_cd_openToOrders(?,?,@returnCode);SELECT @returnCode;`,
                    [`${userId}`,`${cookingDate}`])
    }
    //open cooking calendar date to orders
    static closeToOrders(userId,cookingDate){
        return db.query(`CALL foodtruck_cd_closeToOrders(?,?,@returnCode);SELECT @returnCode;`,
                    [`${userId}`,`${cookingDate}`])
    }
    /*get user ids to send notification*/
    static getUserIdsForNotification(cookingDateId,all_paid){
        return db.query(`CALL notification_getUserIdsForManualNotifications(?, ?, @returnCode);SELECT @returnCode as returnCode;`, [`${cookingDateId}`,`${all_paid}`])
    }
    
 }