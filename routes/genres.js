//Libraries
const express = require("express");
const {Genre,validate} = require("../models/genre");
const authRequired = require("../middleware/authRequired");
const isAdmin = require("../middleware/isAdmin");
const isIdValid = require("../middleware/isIdValid");


const router = express.Router();


router.get("/",async (req,res) => {

    const genres = await Genre.find().select({name:1});
    res.send(genres);

});


router.post("/",authRequired,async (req,res)=>{

    const data = validate(req.body);
    if(data.error)
        return res.status(400).send(data.error.details[0].message);

    let genre = new Genre(data.value);
    genre = await genre.save();
    return res.send(genre);

});


router.get("/:id",isIdValid,async (req,res) =>{

    const {id} = req.params;

    const genre = await Genre.findById(id);
    if(!genre) return res.status(404).send("Not found.");
    res.send(genre);

});


router.put("/:id",[authRequired,isIdValid],async (req,res) =>{


    const {id} = req.params;

    const data = validate(req.body);
    if(data.error)
        return res.send(data.error.details[0].message).status(400);

    const genre = await Genre.findByIdAndUpdate(id,data.value,{new:true});
    if(!genre) return res.send("Not found.").status(404);
    res.send(genre);

});

router.delete("/:id",[authRequired,isAdmin,isIdValid],async (req,res)=>{

    const {id} = req.params;

    const genre = await Genre.findByIdAndRemove(id);
    if(!genre) return res.send("Not found.").status(404);

    res.send(genre);    

})



module.exports = router;