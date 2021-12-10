var models = require('../models')

exports.createComment = (req, res, next) => {
    const content = req.body.content
    const userId = res.locals.userId
    const messageId = req.body.messageId

    const newComment = {
        userId: userId,
        messageId: messageId,
        content: content
    }

    try {
        models.Comment.create(newComment, {
            include: [{
                model: models.User,
                attributes: ['username', 'picture', 'isAdmin']
            }]
        })
            .then(newJoinComment => res.status(201).json(newJoinComment))
            .catch((error) => res.status(400).json({ error }))
    } catch (error) {
        res.status(500).json({ error })
    }
}

exports.modifyComment = (req, res, next) => {
    const content = req.body.content
    const userId = res.locals.userId

    models.Comment.findOne(
        {
            where: { id: req.params.id }
        }
    )
        .then(foundComment => {
            if (userId == foundComment.userId) {
                try {
                    models.Comment.update(
                        {
                            content: content
                        },
                        { where: { id: req.params.id } }
                    )
                        .then(updatedComment => res.status(201).json(updatedComment))
                        .catch((error) => res.status(400).json({ error: error }))
                } catch (error) {
                    res.status(500).json({ error })
                }
            } else {
                res.status(401).json({ message: 'You can\'t modify this Comment!' })
            }
        })
        .catch((error) => res.status(404).json({ error: error }))
}

exports.deleteComment = (req, res, next) => {
    const userId = res.locals.userId

    try {
        models.Comment.findOne(
            {
                where: { id: req.params.id }
            }
        )
            .then(foundComment => {
                if (foundComment.userId == userId) {
                    models.Comment.destroy(
                        {
                            where: { id: req.params.id }
                        }
                    )
                        .then(() => res.status(200).json({ message: 'Comment Deleted !' }))
                        .catch((error) => res.status(400).json({ error }))
                } else {
                    res.status(401).json({ message: 'You can\'t delete this comment!' })
                }

            })
            .catch(error => res.status(404).json({ error }))
    } catch (error) {
        res.status(500).json({ error })
    }
}

exports.getAllComment = (req, res, next) => {
    try {
        models.Comment.findAll()
            .then(comments => res.status(200).json({ comments }))
            .catch(error => res.status(400).json({ error }))
    } catch (error) {
        res.status(500).json({ error })
    }
}