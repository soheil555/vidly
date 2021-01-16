//Libraries
const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");


//Mongoose connect to Data Base
mongoose.connect("mongodb://localhost:27017/vidly",{useNewUrlParser:true,useUnifiedTopology:true}).
then(()=>{
    console.log("[+]Connected to DB");
}).
catch((err)=>{
    console.log(`[-]Connection failed: ${err.message}`);
});


//Mongoose Schema & model
const genreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:20,
    }
});

const Genre = mongoose.model('Genre',genreSchema);


//Joi Schema
const genreSchemaJoi = Joi.object({
    name: Joi.string().
    min(5).
    max(20).
    required()
})




const router = express.Router();


router.get("/",async (req,res) => {

        const genres = await Genre.find().select({name:1});
        res.send(genres);

});

router.get("/:id",async (req,res) =>{

    const {id} = req.params;
    const genre = await Genre.findById(id);
    if(!genre) return res.send("Not found.").status(404);
    res.send(genre);

});


router.post("/", async (req,res)=>{

    const data = validateGenre(req.body);
    if(data.error)
        return res.send(data.error.details[0].message).status(400)
    

    const genre = new Genre(data.value);
    genre = await genre.save();
    return res.send(genre);

});

router.put("/:id",async (req,res) =>{

    const {id} = req.params;


    const data = validateGenre(req.body);
    if(data.error)
        return res.send(data.error.details[0].message).status(400);

    const genre = await Genre.findByIdAndUpdate(id,data.value,{new:true});
    if(!genre) return res.send("Not found.").status(404);
    res.send(genre);

});

router.delete("/:id",async (req,res)=>{

    const {id} = req.params;

    const genre = await Genre.findByIdAndRemove(id);
    if(genre)  return res.send(genre);
    return res.send("Not found.").status(404);
    

})



function validateGenre(genre) {

    return genreSchemaJoi.validate(genre);

}


module.exports = router;