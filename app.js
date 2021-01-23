//Libraries
const express = require('express');
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


//Route files
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");

//Enviroment Variables
const port = process.env.PORT || 3000

const app = express();
app.use(express.json());

app.use("/api/genres",genres);
app.use("/api/customers",customers);
app.use("/api/movies",movies);
app.use("/api/rentals",rentals);

app.listen(port,()=>{
    console.log(`[+]Started at port ${port}`)
});