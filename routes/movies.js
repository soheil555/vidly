const express = require("express");
const mongoose = require("mongoose");
const {Movie,validate} = require("../models/movie");
const {Genre} = require("../models/genre");


mongoose.connect("mongodb://localhost:27017/vidly",{useNewUrlParser:true,useUnifiedTopology:true}).
then(() =>{
    console.log("[+]Connected to DB");
}).
catch((err)=>{
    console.log("[-]Connection failed:",err.message);
});


const router = express.Router();


router.get("/",async (req,res)=>{

    const movies = await Movie.find();
    res.send(movies);

});

router.get("/:id",async (req,res)=>{

    const {id} = req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/))
        return res.send("Bad Id.").status(400);

    const movie = await Movie.findById(id);
    if(!movie) return res.send("Not Found.").status(404);

    res.send(movie);

});

router.post("/",async (req,res)=>{

    const data = validate(req.body);
    if(data.error) return res.send(data.error.details[0].message).status(400);

    
    const genre = await Genre.findById(genreId);
    if(!genre) return res.send("Genre Not Found.").status(404);

    const movie = new Movie({
        title:data.value.title,
        genre:{
            _id : genre._id,
            name : genre.name
        },
        numberInStock:data.value.numberInStock,
        dailyRentalRate:data.value.dailyRentalRate
    });

    movie.save();

    res.send(movie);

});

router.put("/:id",async (req,res) => {

    const {id} = req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.send("Bad Id.").status(400);
    }

    const data = validate(req.body,"update");
    if(data.error)
        return res.send(data.error.details[0].message).status(400);

    const genreId = data.value.genreId;

    if(!genreId.match(/^[0-9a-fA-F]{24}$/)){
        return res.send("Bad Genre Id.").status(400);
    }

    const genre = await Genre.findById(genreId);
    if(!genre) return res.send("Genre Not Found.").status(404);
    

    const movie = await Movie.findByIdAndUpdate(id,{
        title:data.value.title,
        genre:{
            _id : genre._id,
            name : genre.name
        },
        numberInStock : data.value.numberInStock,
        dailyRentalRate: data.value.dailyRentalRate

    },{new:true});

    if(!movie) return res.send("Not found.").status(404);
    
    res.send(movie);

});


router.delete("/:id",async (req,res) =>{


    const {id} = req.params;


    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.send("Bad Id.").status(400);
    }

    const movie = await Movie.findByIdAndRemove(id);
    if(!movie) return res.send("Not found.").status(404);
    
    res.send(movie);

});


module.exports = router;