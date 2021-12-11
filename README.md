# P7_saumureau_thibaud
## Clone the project 
```
git clone https://github.com/ThibaudS-web/P7_saumureau_thibaud.git
```
## Version used
Node: v10.0.0
Sequelize: v6.2.0

## Add JWT secret

Create a file .env in the root project. In this file, you need to add the key which will be used in jsonwebtoken generation.

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
Look for the database settings on the config.json file from config folder.
```
{
  "development": {
    "username": "root", 
    "password": null,
    "database": "<your_database_name>",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```
and create Database in local
```
$ sequelize db:create
```

Start the server, models will be synchronized:
```
$ nodemon server
```

API should be available at http://localhost:3000/

## Start the web server

For the front-end folder, click here and follow the instructions.
https://github.com/ThibaudS-web/P7_ThibS_frontend

