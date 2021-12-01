process.env.NODE_ENV = "test";
require("dotenv").config();
const { test, expect, describe } = require("@jest/globals");
const request = require("supertest");
const server = require("../app");
const {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/personController");
let persons = require("../data/person");

describe("First scenario = GET->POST->GET->DELETE", () => {
  const firstPerson = {
    name: "Maks",
    secName: "White",
    age: 19,
    hobbies: ["sport", "programming"],
  };

  const secondPerson = {
    name: "Test",
    secName: "TEST",
    age: 100,
    hobbies: ["Test"],
    id: 111,
  };

  let tempArr = [];
  test("/GET person", (done) => {
    request(server)
      .get("/person")
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe(JSON.stringify([]));
        done();
      });
  });

  test("/POST person", (done) => {
    request(server)
      .post("/person")
      .send(firstPerson)
      .end((err, res) => {
        const result = res.text;
        tempArr.push(JSON.parse(res.text));
        expect(res.statusCode).toBe(201);
        expect(res.text).toEqual(result);
        done();
      });
  });

  test("/GET/:id person", (done) => {
    request(server)
      .get(`/person/${tempArr[0].id}`)
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual(JSON.stringify(tempArr[0]));
        done();
      });
  });

  test("/DELETE/:id person", (done) => {
    request(server)
      .delete(`/person/${tempArr[0].id}`)
      .end((err, res) => {
        expect(res.statusCode).toBe(204);
        done();
      });
  });
});

describe("Second scenario = POST->POST->DELETE->GET", () => {
  const tmpPerson = {
    name: "TMP",
    secName: "TMP",
    age: 200,
    hobbies: ["TMP1", "TMP2"],
  };

  const secondPerson = {
    name: "Test",
    secName: "TEST",
    age: 100,
    hobbies: ["Test"],
  };

  let tempArr = [];

  test("/POST person-2", (done) => {
    request(server)
      .post("/person")
      .send(tmpPerson)
      .end((err, res) => {
        const result = res.text;
        tempArr.push(JSON.parse(res.text));
        console.log(tempArr[0]);
        console.log(result, res.text);
        expect(res.statusCode).toBe(201);
        expect(res.text).toEqual(result);
        done();
      });
  });

  test("/POST person-2", (done) => {
    request(server)
      .post("/person")
      .send(secondPerson)
      .end((err, res) => {
        const result = res.text;
        tempArr.push(JSON.parse(res.text));
        expect(res.statusCode).toBe(201);
        expect(res.text).toEqual(result);
        done();
      });
  });

  test("/DELETE/:id person-2", (done) => {
    request(server)
      .delete(`/person/${tempArr[0].id}`)
      .end((err, res) => {
        expect(res.statusCode).toBe(204);
        done();
      });
  });

  test("/DELETE/:id person", (done) => {
    request(server)
      .delete(`/person/${tempArr[1].id}`)
      .end((err, res) => {
        expect(res.statusCode).toBe(204);
        done();
      });
  });

  test("/GET person-2", (done) => {
    request(server)
      .get("/person")
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe(JSON.stringify([]));
        done();
      });
  });
});

describe("Third scenario - uuid validation", () => {


  let tempArr = [];
  test("/GET person-3", (done) => {
    request(server)
      .get("/person/12")
      .end((err, res) => {
        expect(res.statusCode).toBe(400);
        done();
      });
  });


  test("/PUT/:id person-3", ( done ) => {
    request(server)
      .put(`/person/13`)
      .send(tempArr[0])
      .end((err, res) => {
        expect(res.statusCode).toBe(400);
        done();
      });
  });

  test("/DELETE/:id person-3", ( done ) => {
    request( server )
    .delete( `/person/14` )
    .end( ( err, res ) => {
    expect( res.statusCode ).toBe( 400 );
    done();
    });

  });
});
