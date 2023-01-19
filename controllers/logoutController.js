const User = require('../model/User');

const handleLogout = async (req,res) => {
    const cookies = req.cookies
    const refreshToken = cookies?.jwt
    
    // check jwt is available in req.cookies
    if (!refreshToken) return res.sendStatus(204) // no content
    
    // is refresh token in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24*60*60*1000 })
        return res.sendStatus(204) // No content
    }

    // delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    
    res.clearCookie('jwt', { httpOnly: true, maxAge: 24*60*60*1000 })
    res.sendStatus(204);
}

module.exports = handleLogout