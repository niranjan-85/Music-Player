function isAuth(req,res,next){
    if(req.isAuthenticated()) return next();
    res.redirect('/users/login')
}

function notAuth(req,res,next){
    if(req.isAuthenticated()){ 
        return res.redirect('/dashboard')
    };
    return next();
}

module.exports = {isAuth,notAuth}