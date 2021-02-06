

module.exports = function(req,res,next){

    const isAdmin = req.user.isAdmin;
    
    if(!isAdmin) return res.send("Access denied").status(403);

    next();
}