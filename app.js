//Libraries
const mongoose = require("mongoose");
const express = require('express');
const Joi = require("joi");

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

//Enviroment Variables
const port = process.env.PORT || 3000

const app = express();
app.use(express.json());

app.use("/api/genres",genres);
app.use("/api/customers",customers);
app.use("/api/movies",movies);
app.use("/api/rentals",rentals);
app.use("/api/users",users);

app.listen(port,()=>{
    console.log(`[+]Started at port ${port}`)
});