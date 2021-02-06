const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        minlength:5,
        maxlength:50,
        required:true
    },
    email:{
        type:String,
        minlength:5,
        maxlength:100,
        unique:true,
        required:true
    },
    password:{
        type:String,
        minlength:5,
        maxlength:1024,
        required:true
    }

});

userSchema.methods.generateJwt = function() {
    
    const token = jwt.sign({id:this._id},config.get("jwtPrivateKey"));
    return token

};



const User = mongoose.model("user",userSchema);


const userSchemaJoi = Joi.object({
    name:Joi.string().min(5).max(50).required(),
    email:Joi.string().min(5).max(100).required().email(),
    password:Joi.string().min(5).max(255).required()
});


function validateUser(user){
    return userSchemaJoi.validate(user).error;
}


exports.User = User;
exports.validate = validateUser;