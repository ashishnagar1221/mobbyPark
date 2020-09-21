module.exports = {
    ensureAuth: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.send({'error_msg':'Please log in to view this resource'});
        res.redirect('/users/login');
    }
}