const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 1234
        },
        Editor: Number,
        Admin: Number
    },
    refreshToken: String
});

const User = mongoose.model('User', userSchema);

module.exports = User