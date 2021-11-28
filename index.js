const http = require('http');
const url = require('url');

const fileHelper = require('./helpers/fileHelper.js');


fileHelper.createDatabase();
const data = fileHelper.fileRead();

const data = fileHelper.fileRead();

let persons = JSON.parse(data);
let lastindex = projects.length === 0 ? 0 : projects[projects.length - 1].id;

const sendResponse = (res, status, data) => {
    res.writeHead(status, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data, null, 2));
};