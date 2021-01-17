//Libraries
const express = require("express");
const mongoose = require("mongoose");
const {Customer,validate} = require("../models/customer");


//Mongoose connect to Data Base
mongoose.connect("mongodb://localhost:27017/vidly",{useNewUrlParser:true,useUnifiedTopology:true}).
then(()=>{
    console.log("[+]connected to DB");
}).
catch((err)=>{
    console.log(`[-]Connection failed: ${err.message}`);
});



const router = express.Router();


router.get("/",async (req,res)=>{

    const customers = await Customer.find();
    return res.send(customers);

});


router.post("/",async (req,res) =>{

    const data = validate(req.body);
    if(data.error)
        return res.send(data.error.details[0].message).status(400);

    
    //WHAT if isgold isn't presented 
    let customer = new Customer(data.value);

    customer = await customer.save();
    return res.send(customer);

});

router.put("/:id",async (req,res)=>{

    const {id} = req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.send("Bad Id.").status(400);
    }

    const data = validate(req.body,"update");
    if(data.error)
        return res.send(data.error.details[0].message).status(400);

    const customer = await Customer.findByIdAndUpdate(id,data.value,{new:true});

    if(!customer) return res.send("Not found.").status(404);
    
    res.send(customer);

});

router.get("/:id",async (req,res) =>{

    const {id} = req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.send("Bad Id.").status(400);
    }

    const customer = await Customer.findById(id)
    if(!customer) return res.send("Not found.").status(404);

    res.send(customer);

})

router.delete("/:id",async (req,res) => {

    const {id} = req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.send("Bad Id.").status(400);
    }

    const customer = await Customer.findByIdAndRemove(id);
    if(!customer) return res.send("Not found.").status(404);

    res.send(customer);


});



module.exports = router;