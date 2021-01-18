
const mongoose = require("mongoose");
const Joi = require("joi");

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

function validateGenre(genre) {

    return genreSchemaJoi.validate(genre);

}


exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;
