const express = require('express');
const Blog = require('../models/blogModel');
const Comment = require('../models/commentModel');
const middlewareObject = require('../middlewares');
const Category = require('../models/categoryModel');
const router = express.Router();

// ================== //
//    BLOG ROUTERS    //
// ================== //

// INDEX ROUTER - to show all the blogs
router.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            Category.find({}, function(err, categories){
                res.render('blogs/index', {blogs: blogs, categories: categories, findCategory: "All"});
            });
        }
    });
});

// NEW ROUTER - shows the new form to create a blog
router.get('/blogs/new', middlewareObject.isLoggedIn, function(req, res){
    res.render('blogs/new');
});

// CREATE ROUTER - to create the new blog
router.post('/blogs', middlewareObject.isLoggedIn, function(req, res){
    Blog.create(req.body, function(err, blog){
        if(err){
            console.log(err);
        } else {
            blog.author.id = req.user._id;
            blog.author.name = req.user.username;
            blog.save();
            req.flash("success", "A new Blog added !!!");
            res.redirect('/blogs');
        }
    });
});

// FIND ROUTER - find the blogs on the basis of given category
router.get('/blogs/find', function(req,res){
    Blog.find({category: req.query.value}, function(err, foundBlogs){
        if(err){
            console.log(err);
            res.redirect('/blogs');
        } else {
            Category.find({}, function(err, categories){
                res.render('blogs/index', {blogs: foundBlogs, categories: categories, findCategory: req.query.value});
            });
        }
    });
});

// SHOW ROUTER - to show an individual blog
router.get('/blogs/:id', function(req, res){
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
        if(err){
            console.log(err);
        } else {
            Category.find({}, function(err, categories){
                res.render('blogs/show', {blog: foundBlog, categories: categories});
            });
        }
    });
});

// EDIT ROUTER - to shows the edit form
router.get('/blogs/:id/edit', middlewareObject.checkBlogOwnership, function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
        } else {
            res.render('blogs/edit', {blog: foundBlog});
        }
    });
});

// UPDATE ROUTER - to update the data of existing blog into the database
router.put('/blogs/:id', middlewareObject.checkBlogOwnership, function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body, function(err){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Blog updated !!!");
            res.redirect('/blogs/'+req.params.id);
        }
    });
});

// DESTROY ROUTER - to delete selected blog
router.delete('/blogs/:id', middlewareObject.checkBlogOwnership, function(req, res){
    Blog.findByIdAndDelete(req.params.id, function(err, deletedBlog){
        if(err){
            console.log(err);
        } else {
            deletedBlog.comments.forEach(function(commentId){
                Comment.findByIdAndRemove(commentId, function(err){});
            });
            req.flash("success", "Blog deleted !!!");
            res.redirect('/blogs');
        }
    });
});

module.exports = router;