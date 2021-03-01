const express = require('express');
const config = require('config');



//TODO : status codes are all wrong.


const app = express();
app.use(express.json());


require("./startup/logging")();
require("./startup/validation")();
require("./startup/db")();
require("./startup/routes")(app);


const port = config.get("PORT");

const server =app.listen(port,()=>{
    console.log(`[+]Started at port ${port}`)
});


module.exports = server;