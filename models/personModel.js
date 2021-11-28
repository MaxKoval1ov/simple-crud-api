const uuid = require('uuid');

let persons = require('../data/person');

const { writeDataToFile } = require('../utils');

const PATH_TO_FILE = './data/persons.json';

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(persons)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const product = persons.find((p) => p.id === id)
        resolve(product)
    })
}

function findByIndex(id) {
    return new Promise((resolve, reject) => {
        const product = persons[id];
        resolve(product)
    })
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {id: uuid.v4(), ...product}
        persons.push(newProduct)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile(PATH_TO_FILE, persons);
        }
        resolve(newProduct)
    })
}

function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = persons.findIndex((p) => p.id === id)
        persons[index] = {id, ...product}
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile(PATH_TO_FILE, persons);
        }
        resolve(persons[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        persons = persons.filter((p) => p.id !== id)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile(PATH_TO_FILE, persons);
        }
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    findByIndex,
    create,
    update,
    remove
}