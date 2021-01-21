const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category: String
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;