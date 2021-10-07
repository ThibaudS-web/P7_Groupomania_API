//import bcrypt for hashing password in database 
const bcrypt = require('bcrypt');

const  fs  = require('fs');
const jwt = require('jsonwebtoken');

//Import user model
var models  = require('../models')

//Controller for the POST sign up 
exports.signup = async (req, res, next) => {

    //Body request
    let email    = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    //REGEX for mail
    const EMAIL_REGEX = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g')
    let emailTest = EMAIL_REGEX.test(email)
    //REGEX for password # Min char : 6 / Max char : 12 / Min 1 lowercase / Min 1 uppercase / Min 1 number / Min 1 special char #
    const PASSWORD_REGEX = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,12}$')
    let passwordTest = PASSWORD_REGEX.test(password)

    //Return an error if password, email or username is an empty field
    if(password == undefined || email == undefined || username == undefined) {
        return res.status(400).json({ error: 'required fields : password, email, username' })   
    }

    //Return an error if the username length is not between 3 and 12 characters
    if(username.length <= 2 || username.length >= 13) {
        return res.status(400).json({ error: "username length should be between 3 and 12 characters"})
    }

    //Testing email regexp
    if(!emailTest) {
        return res.status(400).json({ error : "Invalid email !"})
    }

    //Testing password regexp
    if(!passwordTest) {
        return res.status(400).json({ error : "Invalid password : The password should be between 4 and 8 characters and must be include one number at least"}) //add MaJ
    }

    //Searching in database if email user already exist
    const userExist = await models.User.findOne({
        attributes: ['email'],
          where: { email: email }
    })

    //Return an error if user email exist in database else create new user
    if(!userExist) {
        //Create newUser in database with bcrypt for hashing the password
        bcrypt.hash(password, 10) 
        .then(hash => {
            const newUser = {
                email: email, 
                username: username, 
                password: hash 
            }
            models.User.create(newUser)
        })
        .then(() => res.status(201).json({message :'User created !'}))
        .catch(error => res.status(500).json({ error }))
        
    } else {
        return res.status(409).json({ error : "User already exist !"})
    }
}

exports.login = async (req, res, next) => {

    //Body request
    let email    = req.body.email
    let password = req.body.password

    //Return an error if password, email or username is an empty field
    if(password == undefined || email == undefined) {
        return res.status(400).json({ error: 'required fields : password, email' })   
    }
    
    const user = await models.User.findOne({
        where: {email: email}
    })

    if(user) {
        bcrypt.compare(password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ message:'Wrong credentials !'})
            }
            const tokenUser = {
                userId: user.id,
                token: jwt.sign(
                    { userId: user.id },
                    `${process.env.TOKENPASS}`,
                    { expiresIn: '24h'}                            
                )
            }
            res.status(200).json(tokenUser)    
        })
    } else {
        return res.status(401).json({ message:'User not found !'})
    }
}


exports.findOneProfil = (req, res, next) => {

    const userId = req.params.id

    models.User.findOne({
        attributes: ['id', 'bio', 'username', 'picture'],
        where: { id: userId }
    })
    .then((profil) => res.status(200).json({ profil }))
    .catch((error) => res.status(404).json({ error }))
}

exports.modifyProfil = (req, res, next) => {
    const userId = req.body.userId
    let bio = req.body.bio
    let username = req.body.username


    const profilObject = req.file ? 
    {   
        bio: bio,
        username: username,
        picture: `${req.protocol}://${req.get('host')}/images-prof/${req.file.filename}`

    } : {
        bio: bio,
        username: username
    }

    if(req.file) {
        models.User.findOne({
            attributes: ['id', 'bio', 'username', 'picture'],
            where: { id: userId }
        })
        .then((profil) => {
            if (userId == profil.id) {      
                const filename = profil.picture.split('/images-prof/')[1]         
                    fs.unlink(`images-prof/${filename}`, () => {
                        
                        models.User.update(
                            {
                                ...profilObject
                            },
                            {where: {id: userId}}   
                        )
                        .then((profilObject) => res.status(201).json({profilObject, message: 'Profil was updated !' }))
                        .catch((error) => res.status(400).json({ error }))
                        })
            } else {
                return res.status(401).json({ message: 'You can\'t update this profil, userId not match !' })
            }
        })
        .catch((error) => res.status(400).json({ error }))
    } else {
        models.User.update(
            {
                ...profilObject
            },
            {where: {id: userId}}   
        )
        .then((profil) => res.status(201).json({profil, message: 'Profil was updated !' }))
        .catch((error) => res.status(400).json({ error }))
    }
}

//validation data node 