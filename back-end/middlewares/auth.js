const jwt = require('jsonwebtoken')

//Middleware to require user authentication
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        try {
            const decodedToken = jwt.verify(token, `${process.env.TOKENPASS}`) //In params, the token and the secret key
            req.body.userId = decodedToken.userId
            next()
        } catch (e) {
            throw 'User ID not valid !'
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Request unauthenticated !' })
    }
}

