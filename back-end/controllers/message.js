const jwt = require('jsonwebtoken')
var models = require('../models')
const fs = require('fs')

//Create a message
exports.createMessage = (req, res, next) => {
    //body request

    const title = req.body.title
    const content = req.body.content
    const userId = req.body.userId
    const attachment = `${req.protocol}://${req.get('host')}/images-mess/${req.file.filename}`

    const newMessage = {
        userId: userId,
        title: title,
        content: content,
        attachment: attachment
    }
    try {
        models.Message.create(newMessage)
            .then((newMessage) => res.status(201).json({ newMessage, message: 'Message created !' }))
            .catch((error) => res.status(400).json({ error }))
    } catch (error) {
        res.status(500).json({ error })
    }
}

//Modify the user message 

exports.modifyMessageUser = (req, res, next) => {
    const userId = req.body.userId
    const content = req.body.content

    models.Message.findOne(
        {
            where: { id: req.params.id }
        }
    )
        .then((message) => {
            if (userId == message.userId) {
                try {
                    models.Message.update(
                        {
                            content: content
                        },
                        { where: { id: req.params.id } }
                    )
                        .then((messageUpdated) => res.status(201).json({ messageUpdated, message: 'Message updated ! ' }))
                        .catch((error) => res.status(400).json({ error: error }))

                } catch (error) {
                    res.status(500).json({ error })
                }
            } else {
                res.status(401).json({ message: 'You can\'t modify this message, userId not match !' })
            }

        })
        .catch((error) => res.status(404).json({ error: error }))
}

//delete message

exports.deleteMessage = (req, res, next) => {
    const userId = req.body.userId
    try {
        models.Message.findOne({
            where: { id: req.params.id }
        })
            .then((message) => {
                if (userId == message.userId) {
                    const filename = message.attachment.split('/images-mess/')[1]
                    fs.unlink(`images-mess/${filename}`, () => {
                        models.Message.destroy({
                            where: { id: req.params.id }
                        })
                            .then(() => res.status(200).json({ message: 'Message Deleted !' }))
                            .catch((error) => res.status(400).json({ error }))
                    })
                } else {
                    res.status(401).json({ message: 'You can\'t delete this message, userId not match !' })
                }
            })
            .catch((error) => res.status(404).json({ error }))
    } catch (error) {
        res.status(500).json({ error })
    }
}

//Find all Messages
exports.getAllMessages = (req, res, next) => {

    try {
        models.Message.findAll()
            .then((messages) => res.status(200).json({ messages }))
            .catch((error) => res.status(400).json({ error }))
    } catch (error) {
        res.status(500).json({ error })
    }
}
