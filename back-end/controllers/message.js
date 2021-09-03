const jwt = require('jsonwebtoken')
var models  = require('../models')



//Create a message
exports.createMessage = (req, res, next) => {
    //body request
    
    const title = req.body.title
    const content = req.body.content    
    const userId =  req.body.userId
    // const token = req.headers.authorization.split(' ')[1]
    // const decodedToken = jwt.decode(token)
    // const userId = decodedToken.userId

    const newMessage = {
        userId: userId,
        title: title, 
        content: content,
    }

    try {
        models.Message.create(newMessage)
        .then(() => res.status(201).json({ message: 'Message created !'}))
        .catch((error) => res.status(400).json({ error }))
    } catch (error) {
        res.status(500).json({ error })
    }
}


//Find all Messages
exports.getAllMessages =   (req, res, next) => {
    
        try{
            models.Message.findAll()
            .then((messages) => res.status(200).json({ messages }))
            .catch((error) => res.status(400).json({ error }))
        } catch (error) {
            res.status(500).json({ error })
        }
}
