const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    text: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        name: String
    }
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;