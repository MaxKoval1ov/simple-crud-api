const Person = require('../models/personModel')

const { getPostData } = require('../utils')

async function getPersons(req, res) {
    try {
        const persons = await Person.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(persons))
    } catch (error) {
        console.log(error)
    }
}

async function getPerson(req, res, id) {
    try {
        const personById = await Person.findById(id);
        const personByIndex = await Person.findByIndex(id);

        if(!personById && !personByIndex) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Person with id: ${id} Not Found` }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(personById || personByIndex));
        }
    } catch (error) {
        console.log(error)
    }
}

async function createPerson(req, res) {
    try {
        let body = await getPostData(req)
        try{
            body = JSON.parse(body);
        }
        catch{
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Wrong JSON format` }));
            return
        }

        const { name, secName, age, hobbies } = body;

        if(!age || !hobbies || ! name){
            res.writeHead(400, { 'Content-Type': 'application/json' })
            return res.end({message:"Name, age, hobbies are required!"});  
        }

        const person = { name, secName, age, hobbies }

        const newPerson = await Person.create(person);

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newPerson))  

    } catch (error) {
        console.log(error)
    }
}

async function updatePerson(req, res, id) {
    try {
        const person = await Person.findById(id);

        if(!person) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Person Not Found' }))
        } else {
            let body = await getPostData(req)
            try{
                body = JSON.parse(body)
            }
            catch{
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `Wrong JSON format` }));
                return
            }

            const { name, secName, age, hobbies } = JSON.parse(body)

            const PersonData = {
                name: name || person.name,
                secName: secName || person.secName,
                age: age || person.age,
                hobbies: hobbies || person.hobbies
            }

            const updPerson = await Person.update(id, PersonData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updPerson)) 
        }
 

    } catch (error) {
        console.log(error)
    }
}


async function deletePerson(req, res, id) {
    try {
        const person = await Person.findById(id)

        if(!person) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Person with id: ${id} Not Found` }))
        } else {
            await Person.remove(id)
            res.writeHead(204, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Person ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getPersons,
    getPerson,
    createPerson,
    updatePerson,
    deletePerson
}