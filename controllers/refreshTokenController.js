const User = require('../model/User');

const jwt = require('jsonwebtoken')

const handleRefreshToken = async (req,res) => {
    const cookies = req.cookies
    const refreshToken = cookies?.jwt
    
    // check cookie jwt is available
    if (!refreshToken) return res.sendStatus(401)
    
    // check that user with this refreshToken is available
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403)

    const roles = Object.values(foundUser.roles)
    
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403)

            const accessToken = jwt.sign(
                {
                    "userInfo": { 
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '2m' }
            )

            res.json({ accessToken })
        }
    )
    
}

module.exports = handleRefreshToken