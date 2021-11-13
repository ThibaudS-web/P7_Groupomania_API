const jwt = require('jsonwebtoken')
//Middleware to require user authentication
module.exports = (req, res, next) => {
    console.log('req.body :', req.body)
    try {
        const token = req.headers.authorization.split(' ')[1]
        try {
            const decodedToken = jwt.verify(token, `${process.env.TOKENPASS}`) //In params, the token and the secret key
            res.locals.userId = decodedToken.userId
            next()
        } catch (err) {
            console.log(err)
            throw 'User ID not valid !'
        }
    } catch (error) {
        
        res.status(401).json({ error: error | 'Request unauthenticated !' })
    }
}

