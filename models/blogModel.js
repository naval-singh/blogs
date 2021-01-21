const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: String,
    image: String,
    content: String,
    category: String,
    created: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        name: String
    }
});

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;