const http = require("http");
const Person = require("./controller");
const { getReqData } = require("./utils");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  if (req.url === "/person" && req.method === "GET") {
    const Persons = await new Person().getPersons();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(Persons));
  } else if (req.url.match(/\/person\/([0-9]+)/) && req.method === "GET") {

    console.log("server - req.method === GET", req.method === "GET");
    console.log(
      "server - req.url.match(//person/([0-9]+)/)",
      req.url.match(/\/person\/([0-9]+)/)
    );

    try {
      const id = req.url.split("/")[2];
      console.log(id);
      const person = await new Person().getPerson(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(person));
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error }));
    }
  } else if (req.url.match(/\/person\/([0-9]+)/) && req.method === "DELETE") {
    try {
      // get the id from url
      const id = req.url.split("/")[2];
      // delete Person
      let message = await new Person().deletePerson(id);
      // set the status code and content-type
      res.writeHead(200, { "Content-Type": "application/json" });
      // send the message
      res.end(JSON.stringify({ message }));
    } catch (error) {
      // set the status code and content-type
      res.writeHead(404, { "Content-Type": "application/json" });
      // send the error
      res.end(JSON.stringify({ message: error }));
    }
  }

  // /api/Persons/:id : UPDATE
  else if (req.url.match(/\/person\/([0-9]+)/) && req.method === "PATCH") {
    try {
      // get the id from the url
      const id = req.url.split("/")[2];
      // update Person
      let updated_Person = await new Person().updatePerson(id);
      // set the status code and content-type
      res.writeHead(200, { "Content-Type": "application/json" });
      // send the message
      res.end(JSON.stringify(updated_Person));
    } catch (error) {
      // set the status code and content type
      res.writeHead(404, { "Content-Type": "application/json" });
      // send the error
      res.end(JSON.stringify({ message: error }));
    }
  }

  // /api/Persons/ : POST
  else if (req.url === "/person" && req.method === "POST") {
    // get the data sent along
    let Person_data = await getReqData(req);
    let person = await new Person().createPerson(JSON.parse(Person_data));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(person));
  }

  // No route present
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
