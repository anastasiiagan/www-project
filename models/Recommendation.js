const mongoose = require('mongoose');

const recommendSchema = mongoose.Schema({
    link: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,
        min: 6
    },
    category: {
        type: String,
        default: "all"
    },
    data: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Recommendation', recommendSchema);