//Libraries
const express = require("express");
const mongoose = require("mongoose");
const {Genre,validate} = require("../models/genre");

//Mongoose connect to Data Base
mongoose.connect("mongodb://localhost:27017/vidly",{useNewUrlParser:true,useUnifiedTopology:true}).
then(()=>{
    console.log("[+]Connected to DB");
}).
catch((err)=>{
    console.log(`[-]Connection failed: ${err.message}`);
});





const router = express.Router();


router.get("/",async (req,res) => {

        const genres = await Genre.find().select({name:1});
        res.send(genres);

});


router.post("/", async (req,res)=>{

    const data = validate(req.body);
    if(data.error)
        return res.send(data.error.details[0].message).status(400)

    let genre = new Genre(data.value);
    genre = await genre.save();
    return res.send(genre);

});


router.get("/:id",async (req,res) =>{

    const {id} = req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.send("Bad Id.").status(400);
    }

    const genre = await Genre.findById(id);
    if(!genre) return res.send("Not found.").status(404);
    res.send(genre);

});


router.put("/:id",async (req,res) =>{

    const {id} = req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.send("Bad Id.").status(400);
    }


    const data = validate(req.body);
    if(data.error)
        return res.send(data.error.details[0].message).status(400);

    const genre = await Genre.findByIdAndUpdate(id,data.value,{new:true});
    if(!genre) return res.send("Not found.").status(404);
    res.send(genre);

});

router.delete("/:id",async (req,res)=>{

    const {id} = req.params;


    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.send("Bad Id.").status(400);
    }

    const genre = await Genre.findByIdAndRemove(id);
    if(genre)  return res.send(genre);
    return res.send("Not found.").status(404);
    

})



module.exports = router;