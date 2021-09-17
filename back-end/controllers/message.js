const jwt = require('jsonwebtoken')
var models  = require('../models')



//Create a message
exports.createMessage = (req, res, next) => {
    //body request
    
    const title = req.body.title
    const content = req.body.content    
    const userId =  req.body.userId

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

//Modify the user message 

exports.modfifyMessageUser =  (req, res, next) => {
    const userId =  req.body.userId

    models.Message.findOne(
        {
            where: {id: req.params.id}
        }
    )
    .then((message) => {
        if(userId == message.userId) {
            
            try {
                models.Message.update(
                    {  
                        content: req.body.content,
                    },
                    {where: {id: req.params.id}}             
                )
                .then((message) => res.status(201).json({ message, message : 'Message updated ! ' }))
                .catch((error) => res.status(400).json({ error: error }))
                
            } catch (error) {
                res.status(500).json({ error })
            }
        } else {
            return res.status(401).json({ message: 'You can\'t modify this message, userId not match !' })
        }

    })
    .catch((error) => res.status(404).json({ error: error }))
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
