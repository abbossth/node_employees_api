const User = require('../model/User');

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const handleAuth = async (req,res) => {
    const { username, password } = req.body
    
    // check form data is available
    if (!username || !password) return res.status(400).json({ msg: 'Username and Password are required!' })

    // check that user with this username is available
    const foundUser = await User.findOne({ username }).exec();
    if (!foundUser) return await res.status(404).json({ msg: `User ${username} does not exist!`})
    // check if the password is correct
    const match = await bcrypt.compare(password, foundUser.password)
    if (match) {
        // roles
        const roles = Object.values(foundUser.roles)
        console.log(roles);
        // create JWTs
        const accessToken = jwt.sign(
            { 
                "userInfo": { 
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '2m' }
        )

        const refreshToken = jwt.sign(
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
    
        // add user refreshToken to db
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(foundUser);

        // send refresh token to cookies jwt
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000 })
        
        // send accessToken in response
        res.json({ accessToken, result:{...result} })
    } else {
        // otherwise
        return res.sendStatus(401) // unauthorized
    }
}

module.exports = handleAuth