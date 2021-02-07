//Libraries
require("express-async-errors");
const mongoose = require("mongoose");
const express = require('express');
const Joi = require("joi");
const config = require('config');

if(!config.get("jwtPrivateKey")){
    console.error("[-]Can't find vidly_jwtPrivateKey variable exiting...");
    process.exit(1);
}


// TODO : how one import effect other files
Joi.objectId = require("joi-objectid")(Joi);


mongoose.connect("mongodb://localhost:27017/vidly",{useNewUrlParser:true,useUnifiedTopology:true}).
then(()=>{
    console.log("[+]Connected to DB.");
}).catch(err => {
    console.log(`[-]Connected to DB failed ${err.message}`);
});


//Route files
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const users = require("./routes/users");
const rentals = require("./routes/rentals");
const auth = require("./routes/auth");


//Middlewares
const error = require("./middleware/error");


//Enviroment Variables
const port = config.get("PORT");

const app = express();
app.use(express.json());


//TODO : status codes are all wrong.

app.use("/api/genres",genres);
app.use("/api/customers",customers);
app.use("/api/movies",movies);
app.use("/api/rentals",rentals);
app.use("/api/users",users);
app.use("/api/auth",auth);

app.use(error);

app.listen(port,()=>{
    console.log(`[+]Started at port ${port}`)
});