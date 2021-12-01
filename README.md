# Simple CRUD API

## For run this CRUD API application:

- make sure that the computer has Node.js LTS version 16.13.0

```bash
$ node -v
```

- copy all application files to local disk
- install the packages form package.json:

```bash
$ npm i
```

- by default, the application listening port is 3000
- if you want to set port for app, rename file `.env.example` to `.env` and assign the desired value to the `PORT` variable

- if you want start application with non-empty DB, rename file `.env.example` to `.env` and assign `true` to the `WITHDATA` variable

- run the application in development-mode (with nodemon):

```bash
$ npm run start:dev
```

- run the application in production-mode (bundling with webpack):

```bash
$ npm run start:prod
```

- run test of the application:

```bash
$ npm run test

- run test:coverage for starting jest:coverage test:

```bash
$ npm run test:coverage
```

API path `http://localhost:{PORT}/person`:

- **GET** `/person` or `/person/${personId}` should return all persons or person with corresponding `personId`
- **POST** `/person` is used to create record about new person and store it in database
- **PUT** `/person/${personId}` is used to update record about existing person
- **DELETE** `/person/${personId}` is used to delete record about existing person from database
