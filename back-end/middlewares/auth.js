const jwt = require('jsonwebtoken')

//Middleware to require user authentication
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, `${process.env.TOKENPASS}`) //In params, the token and the secret key
        const userId = decodedToken.userId
        if(req.body.userId && req.body.userId !== userId){
            throw 'User ID not valid !'
        } else {
            next()
        }
    } catch ( error ) {
        res.status(401).json({ error: error | 'Request unauthenticated !'})
    }
}