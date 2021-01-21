const express = require('express');
const Category = require('../models/categoryModel');
const router = express.Router();

// fetch categories from database
router.get('/fetchCategories', function(req, res){
    Category.find({}, function(err, result){
        if(err){
            return res.status(500).json();
        } else {
            return res.status(200).json(result);
        }
    });
});

module.exports = router;