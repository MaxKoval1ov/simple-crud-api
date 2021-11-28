const data = require("./data");

class Controller {
    // getting all Persons
    async getPersons() {
        // return all Persons
        return new Promise((resolve, _) => resolve(data));
    }

    // getting a single Person
    async getPerson(id) {
        return new Promise((resolve, reject) => {
            let person = data.find((person) => person.id === parseInt(id));
            console.log("works");
            if (person) {
                resolve(person);
            } else {
                console.log("Error");
                reject(`Person with id ${id} not found `);
            }
        });
    }

    // creating a Person
    async createPerson(Person) {
        return new Promise((resolve, _) => {
            // create a Person, with random id and data sent
            let newPerson = {
                id: Math.floor(4 + Math.random() * 10),
                ...Person,
            };

            // return the new created Person
            resolve(newPerson);
        });
    }

    async updatePerson(id) {
        return new Promise((resolve, reject) => {
            let person = data.find((person) => person.id === parseInt(id));
            if (!person) {
                reject(`No Person with id ${id} found`);
            }
            person["completed"] = true;
            resolve(person);
        });
    }

    async deletePerson(id) {
        return new Promise((resolve, reject) => {
            let person = data.find((Person) => person.id === parseInt(id));
            if (!person) {
                reject(`No Person with id ${id} found`);
            }
            resolve(`Person deleted successfully`);
        });
    }
}
module.exports = Controller;