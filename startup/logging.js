const winston = require("winston");
require("winston-mongodb");


module.exports = function () {

            winston.add(new winston.transports.Console());
            winston.add(new winston.transports.File({"filename":"logfile.log"}));
            winston.add(new winston.transports.MongoDB({db:"mongodb://localhost:27017/vidly"}));



            process.on('uncaughtException',(ex) =>{

                        winston.error(ex.message);
                        process.exit(1);

            });


            process.on('unhandledRejection',(ex) => {

                    throw ex;

            });

    
}