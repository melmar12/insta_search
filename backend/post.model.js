
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema({
    username: {
        type: String
    },
    location: {
        type: String
    },
    hashtags: [{
        type: String
    }]
});

module.exports = mongoose.model('Post', Post);