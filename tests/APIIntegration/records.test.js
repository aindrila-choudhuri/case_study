const request = require('supertest');
const app = require("./../../app");
const {connectDB} = require("./../../database/connection");

describe("Test the record route", () => {
    beforeAll((done) => {
        connectDB().then(() =>{ 
            done();
        })
        .catch(err => done(err));
    });

    afterAll((done) => {
        closeDB().then(() => done())
        .catch(err => done(err));
    });

    test("Should get filtered record", done => {
      request(app)
        .post("/records")
        .send(
            { 
                "startDate": "2016-02-28", 
                "endDate": "2019-03-02", 
                "minCount": 2700, 
                "maxCount": 2800 
            } 
        )
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body.code).toBe(0);
          expect(response.body.message).toBe('Success');
          expect(response.body.records).toBeInstanceOf(Array);
          done();
        });
    });

    test("Should throw validation error", done => {
        request(app)
          .post("/records")
          .send(
              { 
                  "startDate": "2016-02-28", 
                  "endDate": "20191-03-02", 
                  "minCount": 2700, 
                  "maxCount": 2800 
              } 
          )
          .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body.code).toBe(1);
            expect(response.body.message[0]).toBe('Must be a valid end date');
            expect(response.body.records).toBeInstanceOf(Array);
            done();
          });
      });
  });

