const mongoose = require("mongoose");
const Joi = require("joi");

const rentalSchema = new mongoose.Schema({

    customer:{
        type : new mongoose.Schema({
            name:{
                type:String,
                required:true,
                minlength:5,
                maxlength:50
            },
            isGold:{
                type:Boolean,
                default:false
            },
            phone:{
                type:String,
                required:true,
                minlength:5,
                maxlength:50
            }
        }),
        required:true
    },

    movie:{
        type : new mongoose.Schema({
            title:{
                type:String,
                required:true,
                trim:true,
                minlength:5,
                maxlength:255
            },
            dailyRentalRate : {
                type:Number,
                required:true,
                minlength:0,
                maxlength:255
            }
        }),
        required:true
    },

    dateOut:{
        type : Date,
        required : true,
        default : Date.now
    },

    dateReturned : {
        type:Date
    },

    rentalFee : {
        type:Number,
        min:0
    }
        
});


const Rental = mongoose.model("rental",rentalSchema);


const rentalSchemaJoi = Joi.object({

        customerId : Joi.objectId().required().min(24).max(24),
        movieId : Joi.objectId().required().min(24).max(24)


});


function rentalValidate(rental){

    return rentalSchemaJoi.validate(rental);
}


exports.validate = rentalValidate;
exports.Rental = Rental;