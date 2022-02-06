//database modules
const db = require('./bd/pool')
console.log(process.env.DB_NAME)
//env variables
var dbName = process.env.DB_NAME
module.exports = class CookingCalendar {
    constructor(id, userId = null, mealsForThis = null, ) {
        this.id = id
        this.userId = userId
        this.mealsForThis = mealsForThis
    }
     // =====================================================================
    // INSTANCE METHODS =====================================================
    // ======================================================================
    // CRUD =================================================================
    fetchById(){   
        return db.query(`SELECT
                        cd.*,
                        di.dish_id,
                        di.name,
                        di.description
                    FROM cookingDates cd 
                    LEFT JOIN (SELECT 
                                    md.menu_id, 
                                    d.id as dish_id, 
                                    d.name, d.ingredients, d.description 
                                FROM menu_dish md 
                                LEFT JOIN dish d ON d.id = md.dish_id 
                                WHERE  md.excluded = 0 AND d.excluded =0
                                ) di ON di.menu_id = cd.menu_id
                    WHERE cd.id = ?;`,[`${this.id}`])
    }
    updateMealsForThisCookingDate(){
        return db.query(`CALL updateMealsForThisAndMealsOnList(?,?,?);`,
        [`${this.id}`,`${this.mealsForThis}`,`${this.userId}`])
    }
    openToDelivery(){
        return db.query(`CALL adm_SecondAlertDeliveryAlert(?, ?, @returnCode);`,[`${this.id}`,`${this.userId}`])
    }
     // =====================================================================
    // CLASS METHODS ========================================================
    // ======================================================================
    // CRUD =================================================================
    static fetchAllData(){
        return db.query(`CALL adm_FetchCookingDates();`)
    }
    // update a specifica cooking calendar date -> must send json object
    static updateCookingDate(jsonObject){
        console.log(jsonObject)
        return db.query(`CALL updateCookingDate(?,@returnCode);SELECT @returnCode;`,[`${jsonObject}`])
    }
    // create a new cookinga calendar date
    static newCookingDate(userId,cookingDate){
        return db.query(`CALL createNewCookingDate(?,?,@returnCode);SELECT @returnCode;`,
                    [`${userId}`,`${cookingDate}`])
    }
    //delete a cooking calendar date
    static deleteCoookingDate(userId,cookingDate){
        return db.query(`CALL deleteCookingDate(?,?,@returnCode);SELECT @returnCode as returnCode;`,
                    [`${userId}`,`${cookingDate}`])
    }
    //open cooking calendar date to orders
    static openToOrders(userId,cookingDate){
        return db.query(`CALL openToOrders(?,?,@returnCode);SELECT @returnCode;`,
                    [`${userId}`,`${cookingDate}`])
    }
    //open cooking calendar date to orders
    static closeToOrders(userId,cookingDate){
        return db.query(`CALL closeToOrders(?,?,@returnCode);SELECT @returnCode;`,
                    [`${userId}`,`${cookingDate}`])
    }
    /*get user ids to send notification*/
    static getUserIdsForNotification(cookingDateId,all_paid){
        return db.query(`CALL adm_getUserIdsForNotification(?, ?, @returnCode);SELECT @returnCode as returnCode;`, [`${cookingDateId}`,`${all_paid}`])
    }
    
 }