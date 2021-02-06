const express = require("express");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const {Rental,validate} = require("../models/rental");
const {Customer} = require("../models/customer");
const {Movie} = require("../models/movie");
const authRequired = require("../middleware/authRequired");

Fawn.init(mongoose);

const router = express.Router();


router.get("/",async (req,res) =>{

    const rentals = await Rental.find().sort("-dateOut");
    res.send(rentals);

});

router.post("/",authRequired,async (req,res) =>{

    const data = validate(req.body);
    if(data.error) return res.send(data.error.details[0].message).status(400);

    const customerId = data.value.customerId;
    const movieId = data.value.movieId;      
    

    const customer =await Customer.findById(customerId);
    if(!customer)
        return res.send("Customer Not Found.").status(404);
    
    const movie =await Movie.findById(movieId);
    if(!movie)
        return res.send("Movie Not Found.").status(404);

    const rental = new Rental({

        customer:{
            _id : customer._id,
            name : customer.name,
            phone : customer.phone
        },

        movie:{

            _id : movie._id,
            title: movie.title,
            dailyRentalRate : movie.dailyRentalRate

        }

    });

    try{

    const task = Fawn.Task();

    //TODO : add ability to validate on update
    
    //TODO : change transaction method

    task.save("rentals",rental)
    .update("movies",{_id:movie._id},
    {
        $inc:{
            numberInStock : -1
            }
    }).run();


    res.send(rental);

}
catch(err){
    console.log(err);
    res.send("Internal Error happend.").status(500);
}


});

module.exports = router;