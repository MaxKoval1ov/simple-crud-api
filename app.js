const http = require("http");
const { validate } = require('uuid');
const {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
} = require("./controllers/personController");

require("dotenv").config();

const server = http.createServer(async (req, res) => {
  try {
    //   throw new Error();
    if (req.url === "/person" && req.method === "GET") {
      getPersons(req, res);
    } else 
    if (req.url.match(/\/person\/([0-9-]*)/) && req.method === "GET") {
      const id = req.url.split("/")[2];
      if (!validate(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Wrong uuid format" }));
      } else getPerson(req, res, id);
    } else 
    if (
      req.url.match(/\/person\/([0-9-]*)/) &&
      req.method === "DELETE"
    ) {
      const id = req.url.split("/")[2];
      if (!validate(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Wrong uuid format" }));
      } else deletePerson(req, res, id);
    } else if (req.url.match(/\/person\/([0-9-]*)/) && req.method === "PUT") {
      const id = req.url.split("/")[2];
      if (!validate(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Wrong uuid format" }));
      } else updatePerson(req, res, id);
    } else if (req.url === "/person" && req.method === "POST") {
      createPerson(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not found" }));
    }
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server Error" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});

module.exports = server;
