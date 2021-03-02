const mongoose = require("mongoose");
const request = require("supertest");
const {Genre} = require("../../../models/genre");
const {User} = require("../../../models/user");
let server;

describe("GET requests.",()=>{

    beforeEach(()=>{
        server = require("../../../app");

    });
    afterEach(()=>{
        server.close();
        Genre.collection.deleteMany({});
        User.collection.deleteMany({});
    });

    describe("GET /api/genres",()=>{


        it("should return all genres.",async ()=>{

            const testGenres = [
                {"name":"genre1"},
                {"name":"genre2"}
            ];

            Genre.collection.insertMany(testGenres);


            const response =await request(server).get("/api/genres");
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
            expect(response.body.some(genre => genre.name == "genre1")).toBeTruthy();
            expect(response.body.some(genre => genre.name == "genre2")).toBeTruthy();

        });

    });


    describe("GET /api/genres/:id",()=>{

        it("should should return poper genre if id is valid and genre is available.",async ()=>{

            const genreId = mongoose.Types.ObjectId().toHexString();

            const testGenre = {"name":"genre1",_id:genreId};

            Genre.create(testGenre);

            const response = await request(server).get(`/api/genres/${genreId}`);
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(testGenre);

        });

        it("should return 400 status code if id is invalid.",async ()=>{

            const response = await request(server).get("/api/genres/badid");
            expect(response.status).toBe(400);

        });

        it("should return 404 is id is valid but genre with given id is not available.",async()=>{

            const randomId = mongoose.Types.ObjectId().toHexString();
            const response = await request(server).get(`/api/genres/${randomId}`);

            expect(response.status).toBe(404);

        });


    });


    describe("POST /api/genre",()=>{


        let token;
        const genre = {};


        const exec = () =>{

            return request(server).post("/api/genres").send(genre).set("auth-token",token);

        }




        beforeEach(()=>{

            token = new User().generateJwt();
            genre.name = "genre1";

        });




        it("should return 401 if user is not authenticated.",async ()=>{

           token = "";

           const response = await exec();

           expect(response.status).toBe(401);

        });

        it("should return 400 if genre length is less than 5.",async ()=>{

            genre.name = "1234";

            const response = await exec();

            expect(response.status).toBe(400);

        });


        it("should return 400 if genre length is more than 50.",async ()=>{

            genre.name = Array(52).join("a");

            const response = await exec();

            expect(response.status).toBe(400);

        });

        it("should save the genre in data base if it is okey.",async ()=>{

            exec();

            const selectedGenre = await Genre.find({"name":"genre1"});

            expect(selectedGenre).not.toBeNull();

        });

        it("should return created genre if everything is okey.",async ()=>{
            
            const response = await exec();

            expect(response.body).toHaveProperty("_id");
            expect(response.body).toHaveProperty("name","genre1");

        });


    });



});