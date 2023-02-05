// ======================================================================
// ROOT PAGE ============================================================
// ======================================================================
//render login page
exports.renderLoginPage = (req,res,next) => {
    res.render('login', { pageTitle: `Log-In` })
}
// ======================================================================
// ADMINISTRATIVE PAGES =================================================
// ======================================================================
//administrative login page
exports.renderAdmiLogin = (req,res,next)=> {
    res.render('admLogin',{ pageTitle: `Administrative Log-In`})
} 
exports.admDashboard = (req,res,next) => {
    var devMode = false
    var DNS = ''
    if(process.env.NODE_ENV===`prod`){
        DNS = process.env.KUNGFU_DNS_PROD
    }else {
        devMode = true
        DNS = process.env.KUNGFU_DNS_DEV
    }
    console.log(devMode)
    res.render('admDashboard',{ pageTitle: `Administrative Log-In`, DNS:DNS, devMode:devMode })
}
// ======================================================================
// DEVELOPER PAGES ======================================================
// ======================================================================
//developer login page
exports.renderDeveloperLogin = (req,res,next)=> {
    res.render('developerLogin',{ pageTitle: `Developer Log-In` })
} 
//developer dashboard page
exports.developerDashboard = (req,res,next)=> {
    res.render('developerDashboard', {pageTitle: 'Developer dashboard'})
} 
// ======================================================================
// PRIVACY POLICY =======================================================
// ======================================================================
// privacy policy
exports.privacyPolicy = (req,res,next) => {
    console.log(req.url.substring(1))
    var name = ''
    if(req.url.substring(1)===`app`){
        name = `Mobile app privacy policy`
    }else{
        name = `Webpage privacy policy`
    }
    res.render('privacyPolicyPage', {pageTitle: name})
}
// ======================================================================
// PRIVACY POLICY =======================================================
// ======================================================================
// privacy policy
exports.homePage = (req,res,next)=>{
    res.render('homePage',{ pageTitle: `Developer Log-In` })
}

