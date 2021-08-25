//import bcrypt for hashing password in database 
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const user = require('../models/user');

//Import user model
const User = require('../models/user')

//Controller for the POST sign up 

exports.signup = (req, res, next) => {

    let email    = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    if(password == undefined || email == undefined || username == undefined) {
        res.status(400).json({ message: 'required fields : password, email, username' })
        return
    }
    
    const user = new User({
        email: email,
        username: username,
        password: password
    })

    user.save()
    .then(() => res.status(200).json({ message : 'User created !'}))
    .catch((err) => {
        console.log(err)
    })

}