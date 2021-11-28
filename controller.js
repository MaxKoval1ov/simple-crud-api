// const Persons = require("./data");

// class Controller {
//     // getting all Persons
//     async getPersons() {
//         return new Promise((resolve, _) => resolve(Persons));
//     }

//     // getting a single Person
//     async getPerson(id) {
//         return new Promise((resolve, reject) => {
//             let person = Persons.find((person) => person.id === parseInt(id));
//             if (person) {
//                 resolve(person);
//             } else {
//                 reject(`Person with id ${id} not found `);
//             }
//         });
//     }

//     // creating a Person TODO:make it work
//     async createPerson(person) {
//         return new Promise((resolve, _) => {
//             // create a Person, with random id and Persons sent
//             let newPerson = {
//                 id: Math.floor(4 + Math.random() * 10),
//                 ...person,
//             };

//             // return the new created Person
//             resolve(newPerson);
//         });
//     }

//     async updatePerson(id) {
//         return new Promise((resolve, reject) => {
//             let person = Persons.find((person) => person.id === parseInt(id));
//             if (!person) {
//                 reject(`No Person with id ${id} found`);
//             }
//             person["completed"] = true;
//             resolve(person);
//         });
//     }

//     async deletePerson(id) {
//         return new Promise((resolve, reject) => {
//             let person = Persons.find((person) => person.id === parseInt(id));
//             if (!person) {
//                 reject(`No Person with id ${id} found`);
//             }
//             resolve(`Person deleted successfully`);
//         });
//     }

// }
// module.exports = Controller;