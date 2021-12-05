var models = require('../models')
const fs = require('fs')

//Create a message
exports.createMessage = (req, res, next) => {
    //body request

    const title = req.body.title
    const content = req.body.content
    const userId = res.locals.userId

    const newMessage = req.file ? {
        userId: userId,
        title: title,
        content: content,
        attachment: `${req.protocol}://${req.get('host')}/images-mess/${req.file.filename}`
    } : {
        userId: userId,
        title: title,
        content: content,
        attachment: null
    }

    try {
        models.Message.create(newMessage, {
            include: [{
                model: models.User,
                attributes: ['username', 'picture']
            }]
        })
            .then((newMessageJoinUser) => res.status(201).json(newMessageJoinUser))
            .catch((error) => res.status(400).json({ error }))
    } catch (error) {
        res.status(500).json({ error })
    }
}

//Modify the user message 
exports.modifyMessageUser = (req, res, next) => {
    const userId = res.locals.userId
    const content = req.body.content

    models.Message.findOne(
        {
            where: { id: req.params.id }
        }
    )
        .then((foundMessage) => {
            if (userId == foundMessage.userId) {
                try {
                    models.Message.update(
                        {
                            content: content
                        },
                        { where: { id: req.params.id } }
                    )
                        .then((messageUpdated) => res.status(201).json(messageUpdated))
                        .catch((error) => res.status(400).json({ error: error }))

                } catch (error) {
                    res.status(500).json({ error })
                }
            } else {
                res.status(401).json({ message: 'You can\'t modify this message!' })
            }
        })
        .catch((error) => res.status(404).json({ error: error }))
}

//delete message
exports.deleteMessage = (req, res, next) => {
    const userId = res.locals.userId
    try {
        models.User.findOne({
            attributes: ['isAdmin'],
            where: { id: userId }
        })
            .then(currentUser => {
                models.Message.findOne({
                    where: { id: req.params.id }
                })
                    .then((foundMessage) => {
                        const filename = foundMessage.attachment ?
                            foundMessage.attachment.split('/images-mess/')[1]
                            :
                            null
                        if (userId == foundMessage.userId || currentUser.isAdmin && filename !== null) {
                            fs.unlink(`images-mess/${filename}`, () => {
                                models.Message.destroy({
                                    where: { id: req.params.id }
                                })
                                    .then(() => res.status(200).json({ message: 'Message Deleted !' }))
                                    .catch((error) => res.status(400).json({ error }))
                            })
                        } else if (userId == foundMessage.userId || currentUser.isAdmin && filename === null) {
                            models.Message.destroy({
                                where: { id: req.params.id }
                            })
                                .then(() => res.status(200).json({ message: 'Message Deleted !' }))
                                .catch((error) => res.status(400).json({ error }))
                        } else {
                            res.status(401).json({ message: 'You can\'t delete this message!' })
                        }
                    })
            })
            .catch(error => res.status(404).json({ error }))
    } catch (error) {
        res.status(500).json({ error })
    }
}

exports.getAllMessages = (req, res, next) => {
    try {
        models.Message.findAll({
            include: [
                {
                    model: models.User,
                    attributes: ['username', 'picture'],
                },
                {
                    model: models.Comment,
                    attributes: ['content', 'id', 'userId', 'createdAt'],
                    include: [{
                        model: models.User,
                        attributes: ['username', 'picture', 'isAdmin']
                    }],
                },
            ],
            order: [
                ['createdAt', 'DESC'],
                ['Comments', 'createdAt', 'ASC']
            ]
        })
            .then(messages => res.status(200).json({ messages }))
            .catch(error => res.status(400).json({ error }))
    } catch (error) {
        res.status(500).json({ error })
    }
}

