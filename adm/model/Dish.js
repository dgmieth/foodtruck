//database modules
const db = require('./bd/pool')
//env variables
var dbName = process.env.DB_NAME
module.exports = class Dish {
    constructor(name,price,description,ingredients,createdBy,fifo) {
        this.id = null
        this.name = name
        this.price = parseFloat(price)
        this.description = description === null ? '-999999' : description 
        this.ingredients = ingredients === null ? '-999999' :  ingredients
        this.createdBy = createdBy
        this.updatedBy = null
        this.fifo = fifo
    }
    set setId(id) {
        this.id = id
    }
    set setUpdatedBy(user){
        this.updatedBy =user
    }
     // =====================================================================
    // INSTANCE METHODS =====================================================
    // ======================================================================
    // CRUD =================================================================
    newDish(){
        return db.query(`CALL foodtruck_dish_createNewDish(?,?,?,?,?,?)`,                                         
        [`${this.name}`,`${this.price}`,`${this.ingredients}`,`${this.description}`,`${this.createdBy}`,`${this.fifo}`])
    }
    updateDish(){
        return db.query(`CALL foodtruck_dish_updateDish(?,?,?,?,?)`,                                         
        [`${this.id}`,`${this.price}`,`${this.ingredients}`,`${this.description}`,`${this.updatedBy}`])
    }
    deleteDish(){
        return db.query(`CALL foodtruck_dish_deleteDish(?,?,@returnCode);SELECT @returnCode as returnCode;`,                                         
        [`${this.id}`,`${this.updatedBy}`])
    }
     // =====================================================================
    // CLASS METHODS ========================================================
    // ======================================================================
    // CRUD =================================================================
    static fetchAll(){
        return db.query(`CALL foodtruck_dish_fetchAllDishesByAscendingOrder();`)
    }
}