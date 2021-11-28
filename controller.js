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
            // get the Person
            let Person = data.find((Person) => Person.id === parseInt(id));
            if (Person) {
                // return the Person
                resolve(Person);
            } else {
                // return an error
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

    // updating a Person
    async updatePerson(id) {
        return new Promise((resolve, reject) => {
            // get the Person.
            let Person = data.find((Person) => Person.id === parseInt(id));
            // if no Person, return an error
            if (!Person) {
                reject(`No Person with id ${id} found`);
            }
            //else, update it by setting completed to true
            Person["completed"] = true;
            // return the updated Person
            resolve(Person);
        });
    }

    // deleting a Person
    async deletePerson(id) {
        return new Promise((resolve, reject) => {
            // get the Person
            let Person = data.find((Person) => Person.id === parseInt(id));
            // if no Person, return an error
            if (!Person) {
                reject(`No Person with id ${id} found`);
            }
            // else, return a success message
            resolve(`Person deleted successfully`);
        });
    }
}
module.exports = Controller;