const config = require("config");
const jwt = require("jsonwebtoken");



module.exports = function (req,res,next){


    const token = req.header('auth-token');
    if(!token)  return res.send("No authentication key provided.").status(401);



    try{
        const decoded = jwt.verify(token,config.get("jwtPrivateKey"));
        req.user = decoded;
        next();

    }
    catch(exp){
        res.send("Invalid authentication key.").status(400);
    }



};