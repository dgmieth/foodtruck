//database modules
const db = require('./bd/pool')
//support funcionts
var dbName = process.env.DB_NAME
const checkAccesses = require('../app/controller/supportFunctions/checkAccesses')
module.exports = class User {
    constructor(id) {
        this.id = parseInt(id)
        this.email = null
        this.name = null
        this.phoneNumber = null
        this.socialMediaFacebook = null
        this.socialMediaInstagram = null
    }
    set setEmail(email){
        this.email = email
    }
    set setName(name){
        this.name = name
    }
    set setPhoneNumber(phoneNumber){
        this.phoneNumber = phoneNumber
    }
    set setSocialMediaFacebook(socialMediaFacebook){
        this.socialMediaFacebook = socialMediaFacebook
    }
    set setSocialMediaInstagram(socialMediaInstagram){
        this.socialMediaInstagram = socialMediaInstagram
    }
    // ======================================================================
    // INSTANCE METHODS =====================================================
    // ======================================================================
    fetchById(){
        return db.query(`CALL user_fetchById(?)`, [`${this.id}`])
    }
    updateInformation(){
        const name = this.name === '' ? `` : `${this.name}`
        const phoneNumber = this.phoneNumber === '' ? `''` : `${this.phoneNumber}`
        const socialMediaFacebook = this.socialMediaFacebook === '' ? `` : `${this.socialMediaFacebook}`
        const socialMediaInstagram = this.socialMediaInstagram === '' ? `` : `${this.socialMediaInstagram}`
        return db.query(`CALL user_updateInformation(?,?,?,?,?,?,?)
                        `, [`${this.id}`,`${process.env.FACEBOOK}`,`${process.env.INSTAGRAM}`,
                        `${socialMediaFacebook}`,`${socialMediaInstagram}`,
                        `${phoneNumber}`,`${name}`])
    }
    // CRUD =================================================================
     // ======================================================================
    // CLASS METHODS ========================================================
    // ======================================================================
    // static fetchById(userId){
    //     return db.query(`CALL user_fetchById_static(?);`, [`${userId}`])
    // }
    static fetchActiveCodeByEmail(email){
        return db.query(`CALL user_fetchActiveCodeByEmail_static(?);`, [`${email}`])
    }
    static fectchUserByEmail_invitationCode(email){
        return db.query(`SELECT DISTINCT 
                            t.*
                        FROM ${dbName}.\`user\` t
                        WHERE t.excluded = 0 AND t.email = ?;`, [`${email}`])
    }
    static user(email){
        return db.query(`CALL user_fetchUserByEmail(?);`, [`${email}`])
    }
    static fetchAllUsers(sessionReqObject){
        var hasFullAcces = checkAccesses.checkUserAccess(process.env.ADM_FULL_ACCESS,sessionReqObject)
        return db.query(`CALL adm_FetchAllUsers(?);`, [`${hasFullAcces ? 1 : 3}`])
    }
    static updateUserAccesses(jsonObj,createdUpdateBy){
        return db.query(`CALL updateAccesses(?,?)`,[`${jsonObj}`,`${createdUpdateBy}`])
    }
}