//Libraries
const mongoose = require("mongoose");
const Joi = require("joi");
const {genreSchema} = require("./genre");

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:100
    },
    genre:{
        type:genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true,
        minlength:5,
        maxlength:100
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        minlength:5,
        maxlength:100
    }
});


const movieSchemaJoi =new Joi.object({

        title:Joi.string().required().min(5).max(100),
        genreId:Joi.string().required().min(24).max(24),
        numberInStock:Joi.number().required().min(0).max(100),
        dailyRentalRate:Joi.number().required().min(0).max(100)

})


function validateMovie(movie) {

    return movieSchemaJoi.validate(movie);
    
}


const Movie = mongoose.model("Movie",movieSchema);


module.exports.Movie = Movie;
module.exports.validate = validateMovie;