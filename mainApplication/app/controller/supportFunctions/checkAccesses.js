//npm modules

//import modules

// ======================================================================
// CHECK ACCESSES FOR USER ==============================================
// ======================================================================
exports.checkUserAccess = (accessesArray,req)=>{
    var hasAccess = false
	console.log(req.session)
    accessesArray.split(',').some(access => {
        if(req.session.accesses.includes(access)){
            hasAccess = true
        }
    })
    return hasAccess
}
