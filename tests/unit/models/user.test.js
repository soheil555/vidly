const jwt = require("jsonwebtoken");
const {User} = require("../../../models/user");
const config = require("config");
const mongoose = require("mongoose");

describe("generate json web token.",()=>{


    it("should return a valid token.",()=>{


        const payload = {
            _id:mongoose.Types.ObjectId().toHexString(),
            isAdmin:true
        };

        const user = new User(payload);

        const token = user.generateJwt();
        const decoded = jwt.verify(token,config.get("jwtPrivateKey"));
        expect(decoded).toMatchObject(payload);


    });

});