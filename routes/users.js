const express = require("express");
const _ = require("loadsh");
const bcrypt = require("bcrypt");
const {User,validate} = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();


router.get("/",async (req,res) => {

    const users = await User.find();
    res.send(users);

});


router.post("/",async (req,res) => {

    const error = validate(req.body);
    if(error) return res.send(error.details[0].message).status(400);

    let user = await User.findOne({email:req.body.email});
    if(user) return res.send("User with this email exists.").status(400);

    
    user = new User(_.pick(req.body,['name','email','password']));

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password,salt);


    user.save();

    const token = user.generateJwt();


    res.set("auth-token",token).send(_.pick(user,['name','email','_id']));
});




module.exports = router;