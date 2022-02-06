//npm modules

//import modules

// ======================================================================
// DATETIME FORMATTER ===================================================
// ======================================================================
module.exports = (date) => {
    if(date===null){
        return ''
    }
    if(date.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,'ig')){
        return date
    }
    return date.toISOString().replace(/T/,' ').replace(/\..+/, '')
}