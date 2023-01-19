const jwt = require('jsonwebtoken')

const verifyJWT = (req,res,next) => {
    const authHeader = req.headers['authorization']
    // if token doesnot exist, send unauthorized status
    if (!authHeader) return res.sendStatus(401);
    // get token from bearer
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403)
            req.user=decoded.userInfo.username,
            req.roles=decoded.userInfo.roles
            next()
        }
    )
    

}

module.exports = verifyJWT