const {User} = require("../models/user");
const express = require("express");
const Joi = require("joi");
const _ = require("loadsh");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require("config");


const router = express.Router();


router.post("/",async (req,res) => {

    const error = validateUser(req.body);
    if(error) return res.send(error.details[0].message).status(400);

    const user = await User.findOne({"email":req.body.email});
    if(!user) return res.send("Invalid Email or Password.").status(400);

    const passIsValid = await bcrypt.compare(req.body.password,user.password);
    if(!passIsValid) return res.send("Invalid Email or Password.").status(400);

    const token = user.generateJwt();
    
    res.send(token);

});


const userSchemaJoi = Joi.object({

    email:Joi.string().email().required().min(5).max(100),
    password:Joi.string().min(5).max(255).required()

});


function validateUser(user){
    return userSchemaJoi.validate(user).error;
}





module.exports = router;