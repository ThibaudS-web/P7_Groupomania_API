const jwt = require('jsonwebtoken')
var models  = require('../models')



exports.createMessage = (req, res, next) => {

    //body request
    
    const title = req.body.title
    const content = req.body.content        
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.decode(token)
    const userId = decodedToken.userId

    const newMessage = {
        userId: userId,
        title: title, 
        content: content,
    }

    models.Message.create(newMessage)
    .then(() => res.status(201).json({ message: 'Message created !'}))
    .catch((error) => res.status(400).json({ error }))
    
}



exports.getAllMessages = async  (req, res, next) => {

    const messages = await models.Message.findAll()
    const readAllMessage = messages.every(messages => messages instanceof Message)
    res.status(200).json({readAllMessage})


}
// // Find all users
// const users = await User.findAll();
// console.log(users.every(user => user instanceof User)); // true
// console.log("All users:", JSON.stringify(users, null, 2));