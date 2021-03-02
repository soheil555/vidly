const config = require("config");
const jwt = require("jsonwebtoken");



module.exports = function (req,res,next){


    const token = req.header('auth-token');
    if(!token)  return res.status(401).send("No authentication key provided.");



    try{
        const decoded = jwt.verify(token,config.get("jwtPrivateKey"));
        req.user = decoded;
        next();

    }
    catch(exp){
        res.status(400).send("Invalid authentication key.");
    }



};