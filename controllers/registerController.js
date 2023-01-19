const User = require('../model/User');

const bcrypt = require('bcrypt')

const handleRegister = async (req,res) => {
    const { username, password } = req.body

    // check for form data is available
    if (!username || !password) return res.status(400).json({ msg: `Username and Password are required!` })
    
    // check for duplicate usernames in db
    const duplicate = await User.findOne({ username: username }).exec();
    // console.log(duplicate);
    if (duplicate) return res.status(409).json({ msg: `Username ${username} is already taken!` })
    
    try {
        // bcrypt and hash
        const hashedPassword = await bcrypt.hash(password, 10)
        
        //store new user
        const newUser = User.create({
            "username": username,
            "password": hashedPassword
        })
        res.status(201).json({ success: `New user(${username}) is created!` })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = handleRegister