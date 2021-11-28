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
  id:100
};


describe("Persons", () => {
  let tempArr = [];
  // beforeEach(() => {
  //   server.listen(process.env.PORT || 5000, (err) => {
  //     if (err) {
  //       process.stderr.write("Something went wrong", "utf8");

  //       process.exit(1);
  //     } else {
  //       console.log(`Server running on port ${process.env.PORT}}` );
  //     }
  //   });
  //   });
  //   afterEach(() => {
  //     httpServer.close();
  //   });

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

  test("/PUT/:id person", ( done ) => {
    request(server)
      .put(`/person/${tempArr[0].id}`)
      .send(tempArr[0])
      .end((err, res) => {
        tempArr[0].name = secondPerson.name;
        tempArr[0].age = secondPerson.age;
        tempArr[0].secName = secondPerson.age;
        tempArr[0].hobbies = secondPerson.hobbies;
        tempArr[0].id = secondPerson.id;

        expect(res.statusCode).toBe(200);
        expect(JSON.stringify(secondPerson)).toEqual(
          JSON.stringify(tempArr[0])
        );
        done();
      });
  });

  test("/DELETE/:id person", () => {
    request( server )
    .delete( `/person/${tempArr[0].id}` )
    .end( ( err, res ) => {
    expect( res.statusCode ).toBe( 204 );
    done();
    });

  });
});
