//Libraries
const express = require('express');


//Route files
const genres = require("./routes/genres");
const customers = require("./routes/customers");

//Enviroment Variables
const port = process.env.PORT || 3000



const app = express();
app.use(express.json());

app.use("/api/genres",genres);
app.use("/api/customers",customers);

app.listen(port,()=>{
    console.log(`[+]Started at port ${port}`)
});