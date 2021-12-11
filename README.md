# P7_saumureau_thibaud

## Version used
Node: v10.0.0
Sequelize: v6.2.0

## Add TOKEN

Create a file .env in the root project. In this file, you need to add a variable for your Token variable

```
TOKENPASS=<your token here>
```

## Start the API

Install external dependencies:
```
$ npm install
```
Download sequelize-cli :
```
$ npm i sequelize-cli
```
and create Database in local
```
$ sequelize db:create groupomaniaDB_development
```
Don't forget to import the ```groupomaniadb_development.sql``` file for the data DB

Start the server:
```
$ nodemon server
```

API should be available at http://localhost:3000/

## Start the web server

For the front-end folder, click here and follow the instructions.
https://github.com/ThibaudS-web/P7_ThibS_frontend

