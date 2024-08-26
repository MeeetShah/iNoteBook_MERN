const jwt = require('jsonwebtoken')
const JWT_SECRET = "Meetshahnaamtosunahihoga"


const fetchuser = (req, res, next) => {
    // get user from JWT token

    const token = req.header('auth-token') 
    if(!token){
        res.status(401).send({error:'access using valid auth token'})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).send({error:'access using valid auth token'})
    }

}

module.exports = fetchuser
