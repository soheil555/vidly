const request = require("supertest");
let server;
const {Genre} = require("../../../models/genre");
const {User} = require("../../../models/user");


describe("authentication middleware",()=>{

    beforeEach(() =>{

        server = require("../../../app");

    });

    afterEach(() =>{

        server.close();
        Genre.collection.deleteMany({});
        User.collection.deleteMany({});


    });

    let token;
    const genre = {};

    const exec = function(){

        return request(server).post("/api/genres").set("auth-token",token).send(genre);

    };

    it("should return 401 if no auth-token is provided.",async ()=>{

            token = "";

            const response = await exec();
            expect(response.status).toBe(401);

    });

    it("should return 400 if token is invalid.",async ()=>{

        token = "1234";
        const response = await exec();
        expect(response.status).toBe(400);

    });

    it("should return 200 if everything is okey.",async ()=> {

        genre.name = "genre1";
        token = new User().generateJwt();

        const response = await exec();

        expect(response.status).toBe(200);
        
    });


});