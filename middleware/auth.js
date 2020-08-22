const jwt = require('jsonwebtoken')
const config = require('config')

//Middleware is a fnction that has access to req and res cycle
module.exports = function (req, res, next) {

    //Get token from header
    const token = req.header('x-auth-token') //send token

    //Check if token exists
    if(!token){
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))

        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
 
}
