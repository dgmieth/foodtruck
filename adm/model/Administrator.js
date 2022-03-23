//database modules
const db = require('./bd/pool')
//env variables
var dbName = process.env.DB_NAME
module.exports = class Administrator {
    constructor(email,id,password) {
        this.email = email
        this.id = id
        this.password = password
        this.accesses = []
        this.apiAccessToken = null
    }
    set setAccesses(accesses){
        this.accesses = accesses
    }
    set setApiAccessToken(token){
        console.log(token)
        this.apiAccessToken = token
    }
    // ======================================================================
    // INSTANCE METHODS =====================================================
    // ======================================================================
    // CRUD =================================================================
    save(savingType, callback){
        switch (savingType) {
            case 'password':
                db.query(`CALL dev_updatePassword(?,?);`, [`${this.password}`, `${this.id}`])
                .then(([data,meta])=> {
                    callback(null,{success:'Password updated'})
                })
                .catch(err => {
                    console.log 
                    callback({error:err},null)
                })
                break;
        
            default:
                break;
        }
    }
    selectAccess(){
        return db.query(`CALL access_fetchAll(?)`, [`${this.id}`])
    }
    deleteUserById(userId){
        return db.query(`CALL user_deleteUser(?, ?, @returnCode);SELECT @returnCode as returnCode;`,[`${userId}`,`${this.id}`])
    }
    saveNewInvitationCode(email,code){
        return db.query(`CALL invitationCode_newCode(?,?,?);`,[`${code}`,`${email}`,`${this.id}`])
    }
    // LOGS =================================================================
    pageLogin(){
        return db.query(`CALL db_registerLog(10, 1, NULL, NULL,?,CURRENT_TIMESTAMP());`, [`${this.id}`])
    }
    logUpdateUserInfo(userID){
        return db.query(`CALL db_registerLog(3, 1, ?, NULL,?,CURRENT_TIMESTAMP());
                        CALL db_registerLog(3, 2, ?, NULL,?,CURRENT_TIMESTAMP());
                        `, [`${userID}`,`${this.id}`,`${userID}`,`${this.id}`])
    }
    // logDeleteUserById(userID){
    //     return db.query(`
    //                     CALL db_registerLog(11, 1, ?, NULL,?,CURRENT_TIMESTAMP());
    //                     CALL db_registerLog(11, 2, ?, NULL,?,CURRENT_TIMESTAMP());
    //                     CALL db_registerLog(11, 3, ?, NULL,?,CURRENT_TIMESTAMP());`,
    //                     [`${userID}`,`${this.id}`,
    //                     `${userID}`,`${this.id}`,
    //                     `${userID}`,`${this.id}`])
    // }
    logNewInvitationCode(){
        return db.query(`CALL db_registerLog(12, 4, NULL, NULL,?,CURRENT_TIMESTAMP());`, [`${this.id}`])
    }
    // ======================================================================
    // CLASS METHODS ========================================================
    // ======================================================================
    static fetchByEmail(email){
        return db.query(`CALL admin_fetchUserByEmail(?);`, [`${email}`])
    }
    
}

