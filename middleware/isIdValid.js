const mongoose = require("mongoose");


module.exports = function (req,res,next) {

    const {id} = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(id);
    
    if(!isValid)
        return res.status(400).send("Bad Id.");

    next();

}