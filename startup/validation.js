const winston = require("winston");
const Joi = require("joi");
const config = require("config");

module.exports = function(){


    if(!config.get("jwtPrivateKey")){
        winston.error("[-]Can't find vidly_jwtPrivateKey variable exiting...");
        process.exit(1);
    }
    
    Joi.objectId = require("joi-objectid")(Joi);

}