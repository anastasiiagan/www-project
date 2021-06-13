const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3
    },
    email: {
        type: String,
        require: true,
        min: 6
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 1024
    },
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);