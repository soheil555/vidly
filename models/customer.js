const Joi = require("joi")
const mongoose = require("mongoose");

//Mongoose Schema & model
const customerSchema = new mongoose.Schema({

    isGold:{
        type:Boolean,
        default:false
    },
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20
    },
    phone:{
        type:String,
        required:true,
        minlength:8,
        maxlength:40
    }

});

const Customer = mongoose.model("Customer",customerSchema);



//Joi Schema
const customerSchemaJoi = Joi.object({
    isGold:Joi.boolean().default(false),
    name:Joi.string().min(3).max(20).required(),
    phone:Joi.string().min(8).max(40).required()
});


const customerSchemaJoiUpdate = Joi.object({
    isGold:Joi.boolean(),
    name:Joi.string().min(3).max(20),
    phone:Joi.string().min(8).max(40)
});


function validateCustomer(customer,action="create"){

    if(action == "create")
        return customerSchemaJoi.validate(customer);
    else if(action == "update")
        return customerSchemaJoiUpdate.validate(customer);

}


exports.validate = validateCustomer;
exports.Customer = Customer;