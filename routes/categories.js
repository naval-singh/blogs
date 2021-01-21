const express = require('express');
const Category = require('../models/categoryModel');
const router = express.Router();

// NEW ROUTER - shows the new form to add category
router.get('/categories/new', function(req, res){
    res.render('categories/new');
});

// CREATE ROUTER - to create new category
router.post('/categories', function(req, res){
    Category.create(req.body, function(err, addedCategory){
        if(err){
            console.log(err);
        } else {
            console.log(addedCategory);
            res.redirect("back");
        }
    });
});

// DESTROY ROUTER - to delete selected category

module.exports = router;