//npm modules

//import modules

// ======================================================================
// DESTROY SESSION OBJECT ===============================================
// ======================================================================
module.exports = function destroySessionObject(req,res,next) {
    req.session.destroy((err) => {
        console.log('destroy session called')
        res.clearCookie('connect.sid');
        res.redirect('/')
    })
}